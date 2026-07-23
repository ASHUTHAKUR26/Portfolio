import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import type { Project } from "@/data/profile";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });

  // Glow position follows cursor for the "spotlight" border effect
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const background = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(400px circle at ${gx}% ${gy}%, color-mix(in oklab, var(--color-accent) 18%, transparent), transparent 70%)`
  );

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateYRaw.set((px - 0.5) * 10);
    rotateXRaw.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleMouseLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl glass p-px"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      <div className="relative flex h-full flex-col justify-between gap-6 rounded-3xl p-7">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs font-mono text-[var(--color-cyan)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              <GithubIcon size={16} /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-cyan)]"
            >
              Live demo <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "in-progress") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-purple)]/15 px-2.5 py-1 text-[11px] font-medium text-[var(--color-purple)]">
        <Clock size={11} /> In progress
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-cyan)]/15 px-2.5 py-1 text-[11px] font-medium text-[var(--color-cyan)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" /> Live
    </span>
  );
}
