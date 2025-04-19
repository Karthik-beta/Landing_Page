import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
// import { LogoIcon } from "./Icons";
// import { LogoIconDark, LogoIconLight } from "./Icons";
// import { useTheme } from "@/components/theme-provider";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  // {
  //   href: "#testimonials",
  //   label: "Testimonials",
  // },
  // {
  //   href: "#pricing",
  //   label: "Pricing",
  // },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const { theme } = useTheme();

  // const logoIcon = 
  //   theme === "dark" ? <LogoIconDark /> : <LogoIconLight />;

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex" key="Logo">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-4xl flex"
            >
              {/* {logoIcon} */}
              {/* <LogoIcon /> */}
              Pivotr.
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          {/* <span className="flex md:hidden">
            <ModeToggle />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2" aria-label="Toggle navigation menu">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Pivotr.
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                   <a
                    rel="noreferrer noopener"
                    href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </a> 
                </nav>
              </SheetContent>
            </Sheet>
          </span> */}
          <NavigationMenuItem key="MobileMenu">
            <div className="flex md:hidden">
              <ModeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="px-2" aria-label="Toggle navigation menu">
                  <Menu className="h-5 w-5" onClick={() => setIsOpen(true)}>
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle className="font-bold text-xl">Pivotr.</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col items-center gap-2 mt-4">
                    {routeList.map(({ href, label }) => (
                      <a
                        key={label}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        {label}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </NavigationMenuItem>

          {/* desktop */}
          {/* <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav> */}
          <NavigationMenuItem key="DesktopNav">
            <nav className="hidden md:flex gap-2">
              {routeList.map((route, i) => (
                <a
                  key={i}
                  href={route.href}
                  className={`text-[17px] ${buttonVariants({ variant: "ghost" })}`}
                  rel="noreferrer noopener"
                >
                  {route.label}
                </a>
              ))}
            </nav>
          </NavigationMenuItem>

          <NavigationMenuItem key="DesktopActions">
            <div className="hidden md:flex gap-2">
              <ModeToggle />
            </div>
          </NavigationMenuItem>

          {/* <div className="hidden md:flex gap-2">
            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa/shadcn-landing-page.git"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Github
            </a>

            <ModeToggle />
          </div> */}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
