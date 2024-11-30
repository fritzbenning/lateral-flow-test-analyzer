import Image from "next/image";
import LogoImage from "@/assets/images/lateral-flow-test-analyzer-logo.svg";

export function Logo() {
  return (
    <div className="flex flex-1 items-center gap-4">
      <Image src={LogoImage} alt="logo" width={34} height={34} priority />
      <h1 className="flex flex-col text-md leading-tight md:flex-row md:gap-1">
        <strong className="font-semibold">Lateral Flow Test</strong>
        <span>Analyzer</span>
      </h1>
    </div>
  );
}
