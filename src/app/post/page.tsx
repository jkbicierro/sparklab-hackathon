/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import AvatarSelector from "@/components/ui/randomized-avatar";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Image as Img, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LocationPicker from "@/components/ui/locationPicker";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useFileStore } from "@/store/useFileStore";

export default function PostPage() {
  const supabase = createClient();
  const { file, preview, clear } = useFileStore();
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUserId(data.user.id);
          console.log(data.user.id);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [supabase, router]);

  // Form states
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const [desc, setDesc] = useState("");

  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (file && preview) {
      setFiles([file]);
      setFilePreview(preview);
    }
  }, [file, preview]);

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
    if (!files || files.length === 0) {
      toast.warning("No files selected.");
      return;
    }

    if (!desc) {
      toast.warning("No description. Please add a description.");
      return;
    }

    setIsSubmitting(true);

    try {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("posts")
          .upload(filePath, file, { cacheControl: "3600", upsert: false });

        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          toast.error("Failed to upload image. Please try again.");
          return;
        }

        console.log("Supabase user:", currentUserId, error);
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userId,
            details: desc,
            longitude: location.lng.toFixed(5),
            latitude: location.lat.toFixed(5),
            image_url: filePath,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success(<span>Reported Successfully</span>);

          router.push("/map");

          // Reset form
          setDesc("");
          setFiles(undefined);
          setFiles(undefined);
          setFilePreview(undefined);
        } else {
          toast.error(data.error || "Failed to create meme. Please try again.");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex justify-center ">
        <div className="z-99 fixed bottom-0 h-full w-full lg:h-dvh bg-background flex flex-col overflow-y-scroll  p-3 lg:overflow-y-hidden lg:p-20 lg:w-1/2 animate-in fade-in-0 duration-800 ">
          <div className="flex">
            <div
              onClick={() => router.push("/map")}
              className=" text-primary bg-primary/10 p-3 px-5 rounded-full flex items-center gap-1 hover:bg-primary/30 transition cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span className="text-sm">Back</span>
            </div>
          </div>

          <span className="text-xl my-[20px]  font-semibold text-primary">
            Report
          </span>
          <div className="space-y-[16px]">
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
              <span className="font-semibold mr-[2px]">Warning:</span>{" "}
              Submitting false reports may lead to repercussions.
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
      </div>
    </>
  );
}
