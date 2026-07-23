import { lazy, Suspense } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SceneErrorBoundary } from "@/components/ui/SceneErrorBoundary";
import { skillCategories } from "@/data/profile";

const SkillSphereScene = lazy(() =>
  import("@/3d/SkillSphereScene").then((m) => ({ default: m.SkillSphereScene }))
);

const allSkills = skillCategories.flatMap((c) => c.skills);

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="skills"
          title="A toolkit built for shipping full-stack products."
          description="Drag to rotate the sphere, or scan the list — same data, two ways to explore it."
        />

        {/* <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center"> */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* 3D sphere — decorative/interactive, mirrored by the list below for a11y */}
          <Reveal>
            <div
              className="relative h-[380px] rounded-3xl glass sm:h-[440px]"
              aria-hidden="true"
            >
              <SceneErrorBoundary
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-[var(--color-muted)]">
                    3D view unavailable — see the list alongside.
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="h-full w-full animate-pulse rounded-3xl bg-[var(--color-bg-secondary)]/40" />
                  }
                >
                  <SkillSphereScene skills={allSkills} />
                </Suspense>
              </SceneErrorBoundary>
            </div>
          </Reveal>

          {/* Accessible categorized list */}
          <div className="flex flex-col gap-6">
            {skillCategories.map((category, i) => (
              <Reveal key={category.label} delay={i * 0.06}>
                <div className="glass rounded-2xl p-6">
                  <p className="mono-eyebrow mb-4">// {category.label.toLowerCase()}</p>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
