export function AnimatedLogo() {
  return (
    <a href="#top" aria-label="Back to top" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px]">
      <span aria-hidden className="absolute inset-[-150%] animate-[spin_5s_linear_infinite] opacity-90 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "conic-gradient(from 0deg, var(--color-accent), var(--color-purple), var(--color-cyan), var(--color-accent))" }} />
      <span className="relative z-10 rounded-full bg-[var(--color-bg)] px-4 py-1.5 font-display text-sm font-semibold tracking-tight text-[var(--color-ink)] transition-transform duration-300 group-hover:scale-105">
        Ashu
      </span>
    </a>
  );
}
