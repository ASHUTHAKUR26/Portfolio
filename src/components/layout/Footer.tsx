import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { codingProfiles, profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] py-16">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <p className="mono-eyebrow mb-3">// get in touch</p>
            <h2 className="max-w-md font-display text-3xl font-semibold sm:text-4xl">
              Let's build something worth shipping.
            </h2>
            <a href={`mailto:${profile.email}`} className="mt-5 inline-flex items-center gap-2 text-[var(--color-accent)] transition-colors hover:text-[var(--color-cyan)]">
              <Mail size={16} />
              {profile.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="mono-eyebrow">// coding profiles</p>
            <ul className="flex flex-wrap gap-3">
              {codingProfiles.map((p) => (
                <li key={p.label}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="rounded-full glass px-4 py-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 border-t border-[var(--color-border)] pt-8 sm:relative sm:flex-row">
          <p className="text-center text-xs text-[var(--color-muted)]">
            © {new Date().getFullYear()} {profile.name}. Built with React, Three.js and Framer Motion.
          </p>

          <motion.a href="#top" aria-label="Back to top" whileHover={{ y: -3 }} className="flex h-9 w-9 items-center justify-center rounded-full glass text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] sm:absolute sm:right-0">
            <ArrowUp size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
