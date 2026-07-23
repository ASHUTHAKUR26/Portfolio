import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/profile";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="experience"
          title="Where I've grown as a developer."
          description="Education and hands-on work, in order."
        />

        <div className="relative mt-16 pl-8 sm:pl-10">
          {/* Vertical line */}
          <div
            aria-hidden
            className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-border)] to-transparent sm:left-[13px]"
          />

          <ol className="flex flex-col gap-12">
            {experience.map((item, i) => {
              const Icon = item.type === "education" ? GraduationCap : Briefcase;
              return (
                <li key={item.id} className="relative">
                  <Reveal delay={i * 0.08}>
                    <span
                      aria-hidden
                      className="absolute -left-8 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-bg)] ring-2 ring-[var(--color-accent)] sm:-left-10 sm:h-6 sm:w-6"
                    >
                      <Icon size={12} className="text-[var(--color-accent)]" />
                    </span>

                    <div className="glass rounded-2xl p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-[var(--color-ink)]">
                          {item.role}
                        </h3>
                        <span className="mono-eyebrow">{item.period}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                        {item.organization}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                        {item.description}
                      </p>
                      {item.highlights.length > 0 && (
                        <ul className="mt-4 flex flex-col gap-1.5">
                          {item.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
