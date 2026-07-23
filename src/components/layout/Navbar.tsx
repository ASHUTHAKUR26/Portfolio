import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { socials } from "@/data/profile";
// import { YoutubeSection } from "@/sections/YoutubeSection";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "YouTube", href: "#youtube" },
  { label: "Ask Ashu", href: "#ask-ashu" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="fixed top-0 inset-x-0 z-50">
      <div className="container-page">
        <nav className={`mt-4 flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled || menuOpen ? "glass-strong shadow-lg shadow-black/20" : ""}`}>
          <AnimatedLogo />

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="hidden sm:flex h-9 w-9 items-center justify-center text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
              <GithubIcon size={18} />
            </a>
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hidden sm:flex h-9 w-9 items-center justify-center text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
                <LinkedinIcon size={18} />
              </a>
            )}

            <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} className="flex h-9 w-9 items-center justify-center text-[var(--color-ink)] md:hidden">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -12, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -12, height: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="glass-strong mt-2 overflow-hidden rounded-3xl md:hidden">
              <ul className="flex flex-col divide-y divide-[var(--color-border)] px-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={() => setMenuOpen(false)} className="block px-4 py-4 text-base text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 border-t border-[var(--color-border)] px-6 py-4">
                <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="flex h-10 w-10 items-center justify-center rounded-full glass text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
                  <GithubIcon size={18} />
                </a>
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="flex h-10 w-10 items-center justify-center rounded-full glass text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
                    <LinkedinIcon size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
