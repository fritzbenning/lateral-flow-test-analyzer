import Image from "next/image";
import LogoImage from "@/assets/images/lateral-flow-test-analyzer-logo.svg";

export function Logo() {
  return (
    <div className="flex flex-1 items-center gap-4">
      <Image src={LogoImage} alt="logo" width={36} height={36} priority />
      <h1 className="flex gap-1 text-md leading-tight">
        <strong className="font-semibold">Lateral Flow Test</strong>
        <span>Analyzer</span>
      </h1>
    </div>
  );
}
