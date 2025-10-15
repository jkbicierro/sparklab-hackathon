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

export default function Home() {
  return (
    <>
      <NavBar />
      <main className=""></main>
    </>
  );
}

function NavBar() {
  return (
    <nav className="px-[300px] fixed top-0 w-full h-[70px] border-b">
      <div className="w-full h-full flex items-center justify-between">
        {/* Logo */}
        <div className="h-[30px] w-[30px] rounded-full bg-blue-500"></div>

        <div className="flex items-center gap-4">
          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Avatar */}
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src="https://github.com/jkbicierro.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
