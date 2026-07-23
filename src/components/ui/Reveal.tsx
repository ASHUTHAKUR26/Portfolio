import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
};

/**
 * Fades + lifts content into place once it scrolls into view.
 * Used throughout for section reveals so motion stays consistent
 * and isn't hand-rolled per component.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
