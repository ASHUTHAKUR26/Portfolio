import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 flex items-center justify-center">
            <Moon size={17} />
          </motion.span>
        ) : (
          <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 flex items-center justify-center">
            <Sun size={17} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
