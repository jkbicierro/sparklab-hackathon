"use client";
import {
  Calendar,
  Flag,
  MapPin,
  Megaphone,
  MessageCircle,
  Plus,
  Map,
  Image as Img,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import AvatarSelector from "@/components/ui/randomized-avatar";
import Description from "@/components/description";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useRef,
  useState,
} from "react";

interface Tab {
  key: number;
  icon: React.ReactNode;
  name: string;
  fontclr: string;
  bgclr: string;
}

export default function Feed() {
  const TABS = [
    {
      key: 0,
      icon: <Plus size={18} />,
      name: "Post",
      fontclr: "--post-txt",
      bgclr: "--post-bg",
    },
    {
      key: 1,
      icon: <Flag size={18} />,
      name: "Reports",
      fontclr: "--report-txt",
      bgclr: "--report-bg",
    },
    {
      key: 2,
      icon: <Megaphone size={18} />,
      name: "Announcements",
      fontclr: "--announcement-txt",
      bgclr: "--announcement-bg",
    },
    {
      key: 3,
      icon: <Calendar size={18} />,
      name: "Events",
      fontclr: "--event-txt",
      bgclr: " --event-bg",
    },
    {
      key: 4,
      icon: <MessageCircle size={18} />,
      name: "Feedback",
      fontclr: " --feedback-txt",
      bgclr: "--feedback-bg",
    },
  ];

  return (
    <>
      {/* ACTION BUTTONS */}
      <FloatingActions />
      <div className="mb-2">
        <span className="text-primary text-2xl font-semibold ">Feed</span>
      </div>

      {/* LOCATION */}
      <div className="flex gap-1 p-3 items-center bg-accent text-accent-foreground/40 rounded-full">
        <MapPin size={16} />
        <span>Current Location</span>
      </div>

      <ScrollableTabs TABS={TABS} />

      {/* POSTS */}
      <div className="border rounded-md p-3">
        <div className="flex items-center justify-between  mb-4">
          <div className="flex flex-col  gap-2">
            <div className="flex gap-3 items-center ">
              <AvatarSelector />
              <div className="flex flex-col ">
                <span className="font-medium text-sm">
                  {/* {user?.username} */} User
                </span>
                <span className="text-xs text-zinc-400">
                  {/* {getRelativeTime(meme.createdAt)} */} Recently
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs lg:text-sm text-justify ">
                {/* <Description description={post.description ?? ""} /> */}
                <Description
                  description={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elementum leo eget velit ultricies, in porta libero consectetur. Maecenas placerat rutrum mi nec pulvinar. "
                  }
                />
              </span>
            </div>
            <div className="flex gap-3">
              {/* Location */}
              <div
                className="flex items-center gap-2 p-2 px-3 rounded-full"
                style={{
                  color: `var(--location-txt)`,
                  backgroundColor: `var(--location-bg)`,
                }}
              >
                <MapPin size={16} />
                <span className="text-sm">Naga City</span>
              </div>
              {/* Type */}
              <div
                className="flex items-center gap-2 p-2 px-3 rounded-full"
                style={{
                  color: `var(--location-txt)`,
                  backgroundColor: `var(--location-bg)`,
                }}
              >
                <span className="text-sm">Report</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

function FloatingActions() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const actions = [
    {
      icon: <Map size={20} />,
      label: "Map",
      color: "bg-[#79c67d]",
      route: "/map",
    },
    {
      icon: <Img size={20} />,
      label: "Upload Photo",
      color: "bg-[#2e9dff]",
      route: "/img",
    },
    {
      icon: <Plus size={20} />,
      label: "Write Post",
      color: "bg-[#2e9dff]",
      route: "/post",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              {/* Tooltip */}
              <div className="text-right  absolute w-30 right-17 top-1/2 -translate-y-1/2 font-medium  text-gray-800 text-md  py-1 rounded-md group-hover:opacity-100 transition">
                {action.label}
              </div>

              {/* Action Button */}
              <button
                onClick={() => router.push(`${action.route}`)}
                className={`group w-14 h-14 flex items-center justify-center cursor-pointer hover:opacity-70 transition rounded-full shadow-lg text-white ${action.color}`}
                title={action.label}
              >
                {action.icon}
              </button>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--post-txt)] text-white shadow-lg hover:scale-105 transition"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={26} />
        </motion.div>
      </button>
    </div>
  );
}

function ScrollableTabs({ TABS }: { TABS: Tab[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (!scrollRef.current) return;
    const scrollAmount = 250;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-6 z-10 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scrollable Tabs */}
      <div
        ref={scrollRef}
        className="flex gap-3 py-5 w-full overflow-x-hidden scroll-smooth no-scrollbar px-10"
      >
        {TABS.map(
          (tab: {
            key: Key | null | undefined;
            fontclr: any;
            bgclr: any;
            icon:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactPortal
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            name:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactPortal
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
          }) => (
            <div
              key={tab.key}
              className="font-medium p-3 rounded-full flex items-center gap-3 hover:opacity-80 transition cursor-pointer whitespace-nowrap"
              style={{
                color: `var(${tab.fontclr})`,
                backgroundColor: `var(${tab.bgclr})`,
              }}
            >
              {tab.icon}
              {tab.name}
            </div>
          ),
        )}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-6 z-10 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
