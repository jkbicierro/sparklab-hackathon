import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modetoggle";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import Link from "next/link";
import { NotificationList } from "@/components/magicui/notification";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="px-[150px]">
        <section className="py-[150px]">
          <div className="flex justify-between items-center">
            <div className="w-[450px] space-y-5">
              <h1>Unite Voices. Empower Change.</h1>
              <p className="text-slate-400">
                VibeBayan is a crowdsourced platform where Filipinos can report,
                discuss, and stay informed about public issues — verified,
                localized, and organized.
              </p>
              <div className="space-x-3">
                <Button>Report an Issue</Button>
                <Button variant={"secondary"}>Explore Map</Button>
              </div>
              <small className="text-slate-600">
                Built by the people, for the people.
              </small>
            </div>

            <div className="h-[350px] w-[400px]">
              <NotificationList />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function NavBar() {
  return (
    <>
      <nav className="px-[150px] fixed top-0 w-full h-[70px] border-b">
        <div className="w-full h-full flex items-center justify-between">
          {/* Logo */}
          <Image
            src={"/assets/vibebayan-logo.png"}
            alt="VibeBayan Logo"
            width={700}
            height={700}
            className="w-[40px] h-[40px]"
          />

          <div className="flex items-center gap-5">
            {/* Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                  About VibeBayan
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Avatar */}
            <Button>
              <Link href="/map" className="flex items-center gap-2">
                <Map />
                Report on Map
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </nav>
      <div className="h-[70px]"></div>
    </>
  );
}
