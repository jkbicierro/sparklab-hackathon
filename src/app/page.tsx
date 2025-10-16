import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import Link from "next/link";
import { NotificationList } from "@/components/magicui/notification";

export default function Home() {
  return (
    <>
      <NavBar />

      <main className="px-[150px]">
        <section className="py-[100px] lg:py-[150px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="w-[350px] lg:w-[450px] space-y-5 text-center lg:text-start">
              <h1>
                Unite <span className="text-primary">Voices.</span> Empower{" "}
                <span className="text-primary">Change.</span>
              </h1>
              <p className="text-slate-400">
                VibeBayan is a crowdsourced platform where Filipinos can report,
                discuss, and stay informed about public issues — verified,
                localized, and organized.
              </p>
              <div className="space-x-2">
                <Button asChild>
                  <Link href={"/post"}>Report an Issue</Link>
                </Button>
                <Button variant={"secondary"} asChild>
                  <Link href={"/map"}>Explore Map</Link>
                </Button>
              </div>
              <small className="text-slate-400">
                Built by the people, for the people.
              </small>
            </div>

            <div className="h-[350px] w-[350px] lg:w-[400px]">
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
      <nav className="px-[20px] lg:px-[150px] fixed top-0 w-full h-[70px] border-b z-[999] bg-background">
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
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Avatar */}
            <Button asChild>
              <Link href="/map" className="flex items-center gap-2">
                <Map />
                Report on Map
              </Link>
            </Button>
          </div>
        </div>
      </nav>
      <div className="h-[70px]"></div>
    </>
  );
}
