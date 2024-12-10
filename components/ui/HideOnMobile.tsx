import { ReactNode } from "react";

interface HideOnMobileProps {
  children: ReactNode;
  className?: string;
}

export function HideOnMobile({ children, className = "" }: HideOnMobileProps) {
  return <div className={`hidden md:block ${className}`}>{children}</div>;
}
