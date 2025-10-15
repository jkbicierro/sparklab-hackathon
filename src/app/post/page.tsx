"use client";
import { Button } from "@/components/ui/button";
import AvatarSelector from "@/components/ui/randomized-avatar";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Image as Img, Moon, Sun, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LocationPicker from "@/components/ui/locationPicker";

export default function PostPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUserId(data.user.id);
          console.log(data.user.id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [supabase]);

  console.log("test: ", userId);

  // Form states
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const [desc, setDesc] = useState("");

  const [long, setLong] = useState<number>();
  const [lat, setLat] = useState<number>();

  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  // Location Select

  // File handler
  function HandleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFiles(Array.from(files));
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }

  // Publish action
  async function ButtonAction() {
    if (isSubmitting) return;
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      toast.error("You must be signed in to post.");
      return;
    }

    const currentUserId = data.user.id;
    // Validation (strict subtopic required)
    if (!location) {
      toast.warning("Please select a subtopic.");
      return;
    }
    // if (!files || files.length === 0) {
    //   toast.warning("No files selected.");
    //   return;
    // }

    if (!desc) {
      toast.warning("No description. Please add a description.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          details: desc,
          longitude: location.lng.toFixed(5),
          latitude: location.lat.toFixed(5),
          // image_url: filePath,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(
          <span>
            Reported Successfully
            {/* <Link
                href="/memes/profile"
                className="underline hover:text-primary"
              >
                View Meme
              </Link> */}
          </span>,
        );
        // Reset form

        setDesc("");

        setFiles(undefined);
        setFiles(undefined);
        setFilePreview(undefined);
      } else {
        toast.error(data.error || "Failed to create meme. Please try again.");
      }
      // for (const file of files) {
      //   // const fileExt = file.name.split(".").pop();
      //   // const fileName = `${uuidv4()}.${fileExt}`;
      //   // const filePath = `${fileName}`;

      //   // const { error: uploadError } = await supabase.storage
      //   //   .from("memes")
      //   //   .upload(filePath, file, { cacheControl: "3600", upsert: false });

      //   // if (uploadError) {
      //   //   console.error("Upload error:", uploadError.message);
      //   //   toast.error("Failed to upload image. Please try again.");
      //   //   return;
      //   // }

      // }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="z-99 fixed bottom-0 h-full w-full lg:h-dvh  bg-background p-3 flex flex-col  overflow-y-scroll items-center">
        <span className="text-xl mb-[40px] font-semibold text-primary">
          Report
        </span>
        <div className="space-y-[16px] l">
          <div className="flex gap-3 items-center">
            <AvatarSelector />
            <div className="flex flex-col ">
              <span className="font-medium text-sm">Anon</span>
              <span className="text-xs text-zinc-400">To all</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <LocationPicker onChange={setLocation} />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm">Do you have a photo?</span>

            <Input
              id="picture"
              type="file"
              className="hidden"
              onChange={HandleFiles}
            />
            {filePreview ? (
              <div className="flex justify-between items-center">
                <img
                  alt="Preview"
                  className=" h-[140px] w-[140px] object-cover rounded-lg"
                  src={filePreview}
                />
                <label
                  htmlFor="picture"
                  className="cursor-pointer h-full items-center justify-between flex  rounded-lg  border-[#c4c4c4]  border-[1px] border-dashed p-[15px] hover:bg-zinc-50 transition"
                >
                  <span className="text-sm text-zinc-400">Change photo</span>
                </label>
              </div>
            ) : (
              <>
                {/* Clickable upload box */}
                <label
                  htmlFor="picture"
                  className="cursor-pointer h-full w-full flex flex-col justify-center items-center border-[#c4c4c4] rounded-[8px] border-[1px] border-dashed p-[15px] hover:bg-zinc-50 transition"
                >
                  <Img className="text-zinc-400" size={16} />
                  <span className="text-sm text-zinc-400">Attach photo</span>
                </label>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm">What happened?</span>
            <Textarea
              className="text-sm"
              placeholder="Type your message here."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-xs">
            <span className="font-semibold mr-[2px]">Warning:</span> Submitting
            false reports may lead to repercussions.
          </div>
          <Button
            onClick={ButtonAction}
            className="w-full bg-[#D7F1FF] h-[45px] p-[10px] text-[#2E9DFF]"
            disabled={!userId || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
