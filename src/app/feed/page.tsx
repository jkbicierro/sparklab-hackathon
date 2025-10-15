import {
  Calendar,
  Flag,
  MapPin,
  Megaphone,
  MessageCircle,
  Plus,
} from "lucide-react";
import Image from "next/image";
import AvatarSelector from "@/components/ui/randomized-avatar";
import Description from "@/components/description";

export default function Feed() {
  const TABS = [
    {
      key: 0,
      icon: <Plus />,
      name: "Post",
      fontclr: "--post-txt",
      bgclr: "--post-bg",
    },
    {
      key: 1,
      icon: <Flag />,
      name: "Reports",
      fontclr: "--report-txt",
      bgclr: "--report-bg",
    },
    {
      key: 2,
      icon: <Megaphone />,
      name: "Announcements",
      fontclr: "--announcement-txt",
      bgclr: "--announcement-bg",
    },
    {
      key: 3,
      icon: <Calendar />,
      name: "Events",
      fontclr: "--event-txt",
      bgclr: " --event-bg",
    },
    {
      key: 4,
      icon: <MessageCircle />,
      name: "Feedback",
      fontclr: " --feedback-txt",
      bgclr: "--feedback-bg",
    },
  ];

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="absolute  m-5">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full absolute bottom-30 right-0"
          style={{
            color: `var(--feedback-bg)`,
            backgroundColor: `var(--feedback-txt)`,
          }}
        >
          {/* <Map /> */}
        </div>
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full absolute bottom-0 right-0"
          style={{
            color: `var(--post-bg)`,
            backgroundColor: `var(--post-txt)`,
          }}
        >
          <Plus />
        </div>
      </div>
      <div className="mb-2">
        <span className="text-primary text-2xl font-semibold ">Feed</span>
      </div>

      {/* LOCATION */}
      <div className="flex gap-1 p-3 items-center bg-accent text-accent-foreground/40 rounded-full">
        <MapPin size={16} />
        <span>Current Location</span>
      </div>
      {/* TABS */}
      <div className="flex gap-3 py-5 w-full lg:overflow-x-scroll">
        {TABS.map((tab) => (
          <div
            key={tab.key}
            className={`font-medium p-3 rounded-full flex gap-3 hover:opacity-80 transition cursor-pointer `}
            style={{
              color: `var(${tab.fontclr})`,
              backgroundColor: `var(${tab.bgclr})`,
            }}
          >
            {tab.icon}
            {tab.name}
          </div>
        ))}
      </div>

      {/* POSTS */}
      <div className="border rounded-md p-3">
        <div className="flex items-center justify-between  mb-4">
          <div className="flex flex-col  gap-2">
            <div className="flex gap-3 items-center ">
              <AvatarSelector />
              <div className="flex flex-col  ">
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
