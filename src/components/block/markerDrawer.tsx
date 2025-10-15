import React, { useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import { Flag, MapPin } from "lucide-react";
import { Post } from "@/lib/model/post";
import AvatarSelector from "../ui/randomized-avatar";

interface DrawerState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post | null;
}

export default function MarkerDrawer({ open, setOpen, post }: DrawerState) {
  console.log(post);
  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        {/* <DrawerTrigger asChild>{children}</DrawerTrigger> */}
        <DrawerContent className="flex flex-col items-center pb-[150px] px-[20px]">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>

          {/*  */}
          <div>
            {/* User Profile */}
            <div className="flex items-center gap-5">
              <AvatarSelector />

              <div className="flex flex-col">
                <span>Anon</span>
                <span className="text-xs text-slate-400">
                  {(() => {
                    const date = new Date(post?.created_at || "");
                    if (isNaN(date.getTime())) return "";
                    const diff = Date.now() - date.getTime();
                    const s = Math.floor(diff / 1000);
                    if (s < 60) return `${s}s ago`;
                    const m = Math.floor(s / 60);
                    if (m < 60) return `${m} mins ago`;
                    const h = Math.floor(m / 60);
                    if (h < 24) return `${h} ${h === 1 ? "hr" : "hrs"} ago`;
                    const d = Math.floor(h / 24);
                    if (d < 7) return `${d} ${d === 1 ? "day" : "days"} ago`;
                    const w = Math.floor(d / 7);
                    if (w < 5) return `${w} ${w === 1 ? "wk" : "wks"} ago`;
                    const mo = Math.floor(d / 30);
                    if (mo < 12) return `${mo} ${mo === 1 ? "mo" : "mos"} ago`;
                    const y = Math.floor(d / 365);
                    return `${y} ${y === 1 ? "yr" : "yrs"} ago`;
                  })()}
                </span>
              </div>
            </div>

            {/* Location & Report */}
            <div className="mt-5 space-x-3">
              <Badge>
                <MapPin /> {post?.longitude}, {post?.latitude}
              </Badge>
              <Badge
                style={{
                  color: `var(${
                    post?.type === "Report"
                      ? "--report-txt"
                      : post?.type === "Announcement"
                        ? "--announcement-txt"
                        : post?.type === "Event"
                          ? "--event-txt"
                          : post?.type === "Feedback"
                            ? "--feedback-txt"
                            : "--post-txt"
                  })`,
                  backgroundColor: `var(${
                    post?.type === "Report"
                      ? "--report-bg"
                      : post?.type === "Announcement"
                        ? "--announcement-bg"
                        : post?.type === "Event"
                          ? "--event-bg"
                          : post?.type === "Feedback"
                            ? "--feedback-bg"
                            : "--post-bg"
                  })`,
                }}
              >
                {post?.type}
              </Badge>
            </div>

            {/* Report Details */}
            <div className="mt-5">
              <h5>Report Details</h5>
              <p className="mt-2 text-slate-400">{post?.details}</p>

              <div className="mt-5 flex gap-10">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400">Severity</span>
                  <span className="mt-1">High</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400">Type</span>
                  <span className="mt-1">High</span>
                </div>
              </div>

              {/*  */}
              <div className="mt-5">
                <h5 className="mb-3">Report Status</h5>

                {/* Card */}
                <div className="flex flex-col gap-1 px-4 py-3 bg-amber-100 text-amber-700 rounded-2xl">
                  <span>Pending</span>
                  <span className="text-xs">
                    Waiting for admin review and approval
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
