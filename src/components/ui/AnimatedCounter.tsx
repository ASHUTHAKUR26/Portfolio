import { useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

type AnimatedCounterProps = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className = "",
}: AnimatedCounterProps) {
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, to, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
