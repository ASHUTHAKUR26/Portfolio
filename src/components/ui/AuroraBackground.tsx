import { motion } from "framer-motion";

/**
 * Slow-drifting mesh-gradient blobs in the brief's accent colors.
 * Pure CSS/SVG — no canvas cost — so it can sit behind the R3F
 * scene without competing for frame budget.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -top-1/4 left-1/4 h-[42rem] w-[42rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 40%, transparent) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-0 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-purple) 38%, transparent) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -50, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-cyan) 32%, transparent) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* grid overlay for structure/texture over the soft blobs */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
