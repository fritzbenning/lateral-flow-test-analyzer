import Image from "next/image";
import Logo from "@/assets/images/lateral-flow-test-analyzer-logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CircleHelp,
  MessageCircleQuestion,
  Scan,
  Settings,
} from "lucide-react";

export function Header() {
  return (
    <header className="w-full rounded-xl border border-slate-150 bg-card text-card-foreground shadow-sm flex items-center justify-between pl-3 py-3 pr-4">
      <div className="flex gap-4 items-center flex-1">
        <Image src={Logo} alt="logo" width={36} height={36} />
        <h1 className="text-md leading-tight flex gap-1">
          <strong className="font-semibold">Lateral Flow Test</strong>Analyzer
        </h1>
      </div>
      <nav className="flex gap-2 items-center">
        <Link href="/">
          <Button variant="ghost" className="flex gap-2">
            <Scan width="18" height="18" /> Scan images
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="flex gap-2">
            <CircleHelp width="18" height="18" /> How it works
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="flex gap-2">
            <Settings width="18" height="18" /> Settings
          </Button>
        </Link>
      </nav>
    </header>
  );
}
