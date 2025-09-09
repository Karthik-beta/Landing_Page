import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { ProgressIndicator } from "./ProgressIndicator";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "https://blog.pivotr.in",
    label: "Blog",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
  {
    href: "#contact",
    label: "Contact",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#roi-calculator",
    label: "ROI Calculator",
  },
  {
    href: "https://wellfound.com/company/pivotr",
    label: "Careers",
  },
];

interface CompanionData {
  scrollProgress: number;
  visitedSections: Set<string>;
  currentSection: string;
}

export const Navbar = ({ companion }: { companion?: CompanionData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky border-b top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      {/* Progress indicator at the top */}
      {companion && (
        <ProgressIndicator
          progress={companion.scrollProgress}
          visitedSections={companion.visitedSections}
          currentSection={companion.currentSection}
        />
      )}
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between items-center">
          <NavigationMenuItem className="font-bold flex" key="Logo">
            <a rel="noreferrer noopener" href="/" className="ml-2 font-bold text-4xl flex">
              Pivotr.
            </a>
          </NavigationMenuItem>

          {/* desktop */}
          <NavigationMenuItem key="DesktopNav" className="hidden md:flex justify-center flex-1">
            <nav className="flex gap-4 items-center">
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
              <ModeToggle />
            </nav>
          </NavigationMenuItem>

          {/* mobile */}
          <NavigationMenuItem
            key="MobileMenu"
            className="flex md:hidden justify-end items-center gap-2"
          >
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
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
