import { Button } from "@/components/ui/button";
import AvatarSelector from "@/components/ui/randomized-avatar";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Image as Img } from "lucide-react";
import { Input } from "@/components/ui/input";

import Image from "next/image";

export default function PostPage() {
  return (
    <>
      <div className="z-99 fixed bottom-0 h-full w-full lg:h-dvh lg:w-[350px] bg-background p-3 flex flex-col">
        <span className="text-xl mb-[40px] font-semibold text-primary">
          Report
        </span>
        <div className="space-y-[16px]">
          <div className="flex gap-3 items-center">
            <AvatarSelector />
            <div className="flex flex-col  ">
              <span className="font-medium text-sm">User</span>
              <span className="text-xs text-zinc-400">To all</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm">Where did it happen?</span>
            <Button
              className="flex flex-row justify-start w-full h-[45px] p-[10px] text-sm"
              variant="outline"
              size="sm"
            >
              <MapPin size={16} />
              Find location
            </Button>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm">What happened?</span>
            <Textarea
              className="text-sm"
              placeholder="Type your message here."
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm">Do you have a photo?</span>

            {/* Hidden file input */}
            <Input
              id="picture"
              type="file"
              className="hidden"
              // onChange={(e) => console.log(e.target.files[0])}
            />

            {/* Clickable upload box */}
            <label
              htmlFor="picture"
              className="cursor-pointer h-full w-full flex flex-col justify-center items-center border-[#c4c4c4] rounded-[8px] border-[1px] border-dashed p-[15px] hover:bg-zinc-50 transition"
            >
              <Img className="text-zinc-400" size={16} />
              <span className="text-sm text-zinc-400">Attach photo</span>
            </label>
          </div>

          <div className="flex flex-col text-xs">
            <span className="font-semibold mr-[2px]">Warning:</span> Submitting
            false reports may lead to repercussions.
          </div>
          <Button className="w-full bg-[#D7F1FF] h-[45px] p-[10px] text-[#2E9DFF]">
            Post
          </Button>
        </div>
      </div>
    </>
  );
}
