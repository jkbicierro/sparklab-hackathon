import { useMemo } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";

interface AvatarSelectorProps {
  avatarId?: number;
  className?: string;
}

const avatarMap: Record<number, string> = {
  1: "/icons/male-1.png",
  2: "/icons/male-2.png",
  3: "/icons/male-3.png",
  4: "/icons/female-1.png",
  5: "/icons/female-2.png",
  6: "/icons/female-3.png",
};

export default function AvatarSelector({
  avatarId,
  className,
}: AvatarSelectorProps) {
  const randomAvatarId = useMemo(() => {
    const ids = Object.keys(avatarMap).map(Number);
    const randomIndex = Math.floor(Math.random() * ids.length);
    return ids[randomIndex];
  }, []);

  const src = avatarMap[avatarId ?? randomAvatarId] || "/default.png";

  return (
    <Avatar className={clsx("border ", className)}>
      <AvatarImage src={src} alt={`Avatar ${avatarId ?? randomAvatarId}`} />
    </Avatar>
  );
}
