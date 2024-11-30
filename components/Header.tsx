"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CircleHelp, Menu, Scan } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/Drawer";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Scan, text: "Scan images" },
    { href: "/about", icon: CircleHelp, text: "How it works" },
  ];

  const NavItems = () => (
    <>
      {navItems.map(({ href, icon: Icon, text }) => (
        <Link href={href} key={href} className="w-full">
          <Button
            variant={pathname === href ? "secondary" : "ghost"}
            className={`flex w-full gap-2 ${pathname === href ? "bg-red-50 text-red-500 hover:bg-red-50" : ""}`}
          >
            <Icon width="18" height="18" />
            {text}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <header className="border-slate-150 flex w-full items-center justify-between rounded-xl border bg-card py-3 pl-3 pr-4 text-card-foreground shadow-sm">
      <Logo />
      <nav className="hidden items-center gap-2 sm:flex">
        <NavItems />
      </nav>

      <Drawer>
        <DrawerTrigger asChild className="sm:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col gap-2 p-4">
            <NavItems />
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
