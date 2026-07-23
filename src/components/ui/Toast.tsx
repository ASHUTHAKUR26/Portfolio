import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export type ToastState = { type: "success" | "error"; message: string } | null;

export function Toast({ toast }: { toast: ToastState }) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong pointer-events-auto flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl"
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={20} className="shrink-0 text-[var(--color-cyan)]" />
            ) : (
              <XCircle size={20} className="shrink-0 text-[var(--color-purple)]" />
            )}
            <p className="text-sm text-[var(--color-ink)]">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}