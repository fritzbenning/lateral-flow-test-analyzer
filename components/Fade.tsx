import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeProps {
  children: ReactNode;
  key: string;
  className?: string;
  variant?: "fade" | "slideIn";
}

export function Fade({ children, className, variant = "slideIn" }: FadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: variant === "slideIn" ? 20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: variant === "slideIn" ? 20 : 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
