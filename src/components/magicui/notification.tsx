"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "../ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Flood reported",
    description: "Barangay San Isidro, Makati City",
    time: "15m ago",
    icon: "🌊",
    color: "#1E86FF",
  },
  {
    name: "Road blockage cleared",
    description: "EDSA Southbound near Guadalupe",
    time: "10m ago",
    icon: "🚧",
    color: "#00C9A7",
  },
  {
    name: "Power outage alert",
    description: "Quezon City - Ongoing maintenance",
    time: "5m ago",
    icon: "💡",
    color: "#FFB800",
  },
  {
    name: "Community cleanup event",
    description: "Join us this Saturday at Rizal Park",
    time: "2m ago",
    icon: "🧹",
    color: "#FF3D71",
  },
  {
    name: "Missing pet reported",
    description: "White Labrador last seen in Pasig",
    time: "8m ago",
    icon: "🐶",
    color: "#9C27B0",
  },
  {
    name: "Heavy traffic alert",
    description: "Ortigas Avenue Eastbound",
    time: "12m ago",
    icon: "🚗",
    color: "#FF6B6B",
  },
  {
    name: "Garbage collection delay",
    description: "Barangay Molino III, Bacoor City",
    time: "20m ago",
    icon: "🗑️",
    color: "#6C63FF",
  },
  {
    name: "Health advisory",
    description: "Free vaccination at Barangay Hall",
    time: "25m ago",
    icon: "💉",
    color: "#00C9A7",
  },
  {
    name: "Water service interruption",
    description: "Manila Water maintenance in Marikina",
    time: "30m ago",
    icon: "🚱",
    color: "#1E86FF",
  },
  {
    name: "Community meeting scheduled",
    description: "Discuss road improvement plans",
    time: "35m ago",
    icon: "🗣️",
    color: "#FFB800",
  },
  {
    name: "Lost wallet reported",
    description: "SM North EDSA, recovered by a resident",
    time: "40m ago",
    icon: "👛",
    color: "#FF3D71",
  },
  {
    name: "Tree planting drive",
    description: "Sunday 8 AM at La Mesa Eco Park",
    time: "45m ago",
    icon: "🌱",
    color: "#00C9A7",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-base">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-slate-400">{time}</span>
          </figcaption>
          <p className="text-slate-400">{description}</p>
        </div>
      </div>
    </figure>
  );
};

export function NotificationList({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  );
}
