"use client";

import React, { useEffect } from "react";
import Image from "next/image";
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
import { Ads } from "@/lib/model/ads";

interface DrawerState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post | null;
  ad: Ads | null;
  type: string | null;
}

export default function MarkerDrawer({
  open,
  setOpen,
  post,
  ad,
  type,
}: DrawerState) {
  useEffect(() => {
    console.log("Post data:", post);
    console.log("Ad data:", ad);
    console.log("Type:", type);
  }, [post, ad]);

  if (type == "ads") {
    if (!ad) {
      return <div></div>;
    }
    console.log(ad);

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
                <Image
                  src={`https://hucsiehmwkqjkfxwxnfn.supabase.co/storage/v1/object/public/ads/${ad?.image_url}`}
                  alt="Avatar"
                  className="rounded-full"
                  width={30}
                  height={30}
                />
                <div className="flex flex-col">
                  <span>{ad?.business_name}</span>
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
                      if (mo < 12)
                        return `${mo} ${mo === 1 ? "mo" : "mos"} ago`;
                      const y = Math.floor(d / 365);
                      return `${y} ${y === 1 ? "yr" : "yrs"} ago`;
                    })()}
                  </span>
                </div>
              </div>

              {/* Location & Report */}
              <div className="mt-5 space-x-3">
                <Badge>
                  <MapPin /> {ad?.longitude}, {ad?.latitude}
                </Badge>
                <Badge>Advertisement</Badge>
              </div>

              {/* Report Details */}
              <div className="mt-5">
                <h5>Advertisement Details</h5>
                <p className="mt-2 text-slate-400">{ad?.description}</p>

                {/* <div className="mt-5 flex gap-10">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400">Severity</span>
                  <span className="mt-1">High</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400">Type</span>
                  <span className="mt-1">High</span>
                </div>
              </div> */}

                {/*  */}
                <div className="mt-5">
                  <h5 className="mb-3">Click me!</h5>

                  {/* Card */}
                  <div className="flex flex-col gap-1 px-4 py-3 bg-amber-100 text-amber-700 rounded-2xl">
                    <span>Link to business:</span>
                    <span className="text-xs">{ad?.link}</span>
                  </div>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

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
                <MapPin /> {ad?.longitude}, {ad?.latitude}
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
