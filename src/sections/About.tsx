import { Code2, GraduationCap, Sparkles, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { profile } from "@/data/profile";

const stats = [
  { label: "Projects shipped", value: 3, suffix: "+" },
  { label: "Core languages", value: 4 },
  { label: "Coding profiles", value: 3 },
];

const currentStack = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JavaScript",
  "Python",
];

const facts = [
  {
    icon: GraduationCap,
    label: "Education",
    value: profile.degree,
  },
  {
    icon: Target,
    label: "Career goal",
    value: profile.careerGoal,
  },
  {
    icon: Code2,
    label: "Focus",
    value: "Full-stack products with an AI-first approach.",
  },
  {
    icon: Sparkles,
    label: "Currently exploring",
    value: "AI-powered developer tools and LLM-backed products.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="about"
          title="Building things end-to-end, from database to pixel."
          description="A full-stack developer who cares as much about a clean API as a smooth interaction — currently focused on where web development and AI meet."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Stats */}
          <Reveal className="lg:col-span-1">
            <div className="glass flex h-full flex-col justify-between gap-8 rounded-3xl p-8">
              <div className="flex flex-col gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-4xl font-bold text-[var(--color-ink)]">
                      <AnimatedCounter to={stat.value} suffix={stat.suffix ?? ""} />
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <p className="mono-eyebrow mb-3">// current stack</p>
                <div className="flex flex-wrap gap-2">
                  {currentStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Facts grid */}
          {/* <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2"> */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {facts.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.08}>
                <div className="glass group h-full rounded-3xl p-8 transition-colors duration-300 hover:border-[var(--color-accent)]/40">
                  <fact.icon
                    size={22}
                    className="text-[var(--color-accent)]"
                    strokeWidth={1.75}
                  />
                  <p className="mono-eyebrow mt-5 mb-2">{fact.label}</p>
                  <p className="text-[var(--color-ink)] leading-relaxed">
                    {fact.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
