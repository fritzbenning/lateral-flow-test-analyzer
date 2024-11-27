"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CircleHelp, Scan } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Scan, text: "Scan images" },
    { href: "/about", icon: CircleHelp, text: "How it works" },
  ];

  return (
    <header className="border-slate-150 flex w-full items-center justify-between rounded-xl border bg-card py-3 pl-3 pr-4 text-card-foreground shadow-sm">
      <Logo />
      <nav className="flex items-center gap-2">
        {navItems.map(({ href, icon: Icon, text }) => (
          <Link href={href} key={href}>
            <Button
              variant={pathname === href ? "secondary" : "ghost"}
              className="flex gap-2"
            >
              <Icon width="18" height="18" />
              {text}
            </Button>
          </Link>
        ))}
      </nav>
    </header>
  );
}
