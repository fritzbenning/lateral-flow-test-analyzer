import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeProps {
  children: ReactNode;
  keyName: string;
  className?: string;
}

export function Fade({ children, keyName, className }: FadeProps) {
  return (
    <motion.div
      key={keyName}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
