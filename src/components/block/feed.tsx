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
import AvatarSelector from "@/components/ui/randomized-avatar";
import Description from "@/components/description";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Tab {
  key: number;
  icon: React.ReactNode;
  name: string;
  fontclr: string;
  bgclr: string;
  filterType?: string | null;
}

const TabsArray: Tab[] = [
  {
    key: 0,
    icon: <></>,
    name: "All",
    fontclr: "--post-txt",
    bgclr: "--post-bg",
    filterType: null,
  },
  {
    key: 1,
    icon: <Flag size={18} />,
    name: "Reports",
    fontclr: "--report-txt",
    bgclr: "--report-bg",
    filterType: "Report",
  },
  {
    key: 2,
    icon: <Megaphone size={18} />,
    name: "Announcements",
    fontclr: "--announcement-txt",
    bgclr: "--announcement-bg",
    filterType: "Announcement",
  },
  {
    key: 3,
    icon: <Calendar size={18} />,
    name: "Events",
    fontclr: "--event-txt",
    bgclr: " --event-bg",
    filterType: "Event",
  },
  {
    key: 4,
    icon: <MessageCircle size={18} />,
    name: "Feedback",
    fontclr: " --feedback-txt",
    bgclr: "--feedback-bg",
    filterType: "Feedback",
  },
];

export function Feed() {
  type Post = {
    post_id: string;
    user_id: string;
    type: string | null;
    details: string | null;
    longitude: number | null;
    latitude: number | null;
    created_at: string;
  };

  const [activeKey, setActiveKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Post[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const active = TabsArray.find(
      (t) => t.key === activeKey,
    ) as (typeof TabsArray)[0];
    const typeParam = active?.filterType;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const url = typeParam
          ? `/api/posts?type=${encodeURIComponent(typeParam)}`
          : "/api/posts";
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);
        const data = (await res.json()) as { posts: Post[] };
        setItems(data.posts ?? []);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") {
          // ignored
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Failed to load");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [activeKey]);

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

      <ScrollableTabs
        Tabs={TabsArray}
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
      />

      {/* POSTS */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-muted-foreground">No posts found.</div>
        ) : (
          items.map((post) => (
            <div key={post.post_id} className="border rounded-md p-3">
              <div className="flex items-center justify-between  mb-4">
                <div className="flex flex-col  gap-2 w-full">
                  <div className="flex gap-3 items-center ">
                    <AvatarSelector />
                    <div className="flex flex-col ">
                      <span className="font-medium text-sm">User</span>
                      <span className="text-xs text-zinc-400">Recently</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs lg:text-sm text-justify ">
                      <Description description={post.details ?? ""} />
                    </span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {/* Location */}
                    <div
                      className="flex items-center gap-2 p-2 px-3 rounded-full"
                      style={{
                        color: `var(--location-txt)`,
                        backgroundColor: `var(--location-bg)`,
                      }}
                    >
                      <MapPin size={16} />
                      <span className="text-sm">
                        {post.latitude?.toFixed?.(4)},{" "}
                        {post.longitude?.toFixed?.(4)}
                      </span>
                    </div>
                    {/* Type */}
                    {post.type && (
                      <div
                        className="flex items-center gap-2 p-2 px-3 rounded-full"
                        style={{
                          color: `var(--location-txt)`,
                          backgroundColor: `var(--location-bg)`,
                        }}
                      >
                        <span className="text-sm">{post.type}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

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

function ScrollableTabs({
  Tabs,
  activeKey,
  onSelect,
}: {
  Tabs: Tab[];
  activeKey: number;
  onSelect: (key: number) => void;
}) {
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
        className="absolute left-0 top-5 z-10 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scrollable Tabs */}
      <div
        ref={scrollRef}
        className="flex gap-2 py-5 w-full overflow-x-hidden scroll-smooth no-scrollbar px-12"
      >
        {Tabs.map((tab: Tab) => (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className={`font-medium text-sm py-2 px-4 rounded-full flex items-center gap-3 hover:opacity-80 transition cursor-pointer whitespace-nowrap ${
              tab.key === activeKey
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-5 z-10 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
