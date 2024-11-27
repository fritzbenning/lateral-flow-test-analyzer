import Image from "next/image";
import Logo from "@/assets/images/lateral-flow-test-analyzer-logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleHelp, Scan, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="border-slate-150 flex w-full items-center justify-between rounded-xl border bg-card py-3 pl-3 pr-4 text-card-foreground shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <Image src={Logo} alt="logo" width={36} height={36} />
        <h1 className="flex gap-1 text-md leading-tight">
          <strong className="font-semibold">Lateral Flow Test</strong>Analyzer
        </h1>
      </div>
      <nav className="flex items-center gap-2">
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
