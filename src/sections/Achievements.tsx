import { Award, Trophy, GraduationCap as CertIcon, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { achievements, type Achievement } from "@/data/profile";

const CATEGORY_META: Record<
  Achievement["category"],
  { icon: typeof Trophy; label: string; color: string }
> = {
  certificate: { icon: CertIcon, label: "Certificate", color: "var(--color-accent)" },
  hackathon: { icon: Trophy, label: "Hackathon", color: "var(--color-purple)" },
  award: { icon: Award, label: "Award", color: "var(--color-cyan)" },
};

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="achievements"
          title="Certificates, hackathons and recognition."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => {
            const meta = CATEGORY_META[item.category];
            const Icon = meta.icon;
            return (
              <Reveal key={item.id} delay={i * 0.07}>
                <div className="glass group flex h-full flex-col gap-4 rounded-2xl p-6 transition-colors hover:border-[var(--color-accent)]/40">
                  <div className="flex items-start justify-between">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ background: `color-mix(in oklab, ${meta.color} 18%, transparent)` }}
                    >
                      <Icon size={16} style={{ color: meta.color }} />
                    </span>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${item.title}`}
                        className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>

                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wide" style={{ color: meta.color }}>
                      {meta.label}
                    </p>
                    <h3 className="mt-1.5 font-display text-base font-semibold text-[var(--color-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{item.issuer}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.description}
                  </p>

                  <span className="mt-auto text-xs text-[var(--color-muted)]">{item.date}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
