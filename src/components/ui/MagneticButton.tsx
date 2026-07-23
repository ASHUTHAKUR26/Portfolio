import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  as?: "a" | "button";
  ariaLabel?: string;
  download?: string;
};

const variants: Record<string, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-bg)] hover:shadow-[0_0_40px_-8px_var(--color-accent)]",
  secondary: "glass text-[var(--color-ink)] hover:border-[var(--color-accent)]/50",
  ghost: "text-[var(--color-ink)] hover:text-[var(--color-accent)]",
};

/**
 * Button that subtly follows the cursor within its bounds (Apple/Linear
 * style magnetic pull), snapping back on release with a spring.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  download,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedClassName = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium
        transition-colors duration-300 cursor-pointer select-none ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={download ? undefined : href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.96 }}
        className={sharedClassName}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={sharedClassName}
    >
      {children}
    </motion.button>
  );
}
