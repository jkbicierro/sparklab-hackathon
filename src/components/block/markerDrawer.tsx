import React from "react";
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

export default function MarkerDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="flex flex-col items-center pb-[150px] px-[20px]">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>

          {/*  */}
          <div>
            {/* User Profile */}
            <div className="flex items-center gap-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span>Romar Castro</span>
                <span className="text-xs text-slate-400">23m ago</span>
              </div>
            </div>

            {/* Location & Report */}
            <div className="mt-5 space-x-3">
              <Badge>
                <MapPin /> Pacol, Naga City
              </Badge>
              <Badge variant={"destructive"}>
                <Flag />
                Report
              </Badge>
            </div>

            {/* Report Details */}
            <div className="mt-5">
              <h5>Report Details</h5>
              <p className="text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur elementum leo eget velit ultricies, in porta libero
                consectetur. Maecenas placerat rutrum mi nec pulvinar.
              </p>

              <div className="mt-5 flex gap-10">
                <div className="flex flex-col">
                  <span className="text-slate-400">Severity</span>
                  <span>High</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400">Type</span>
                  <span>High</span>
                </div>
              </div>

              {/*  */}
              <div className="mt-5">
                <h5 className="mb-3">Report Status</h5>

                {/* Card */}
                <div className="flex flex-col gap-1 px-4 py-3 bg-amber-100 text-amber-700 rounded-2xl">
                  <span>Pending</span>
                  <span className="text-xs">June 10, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
