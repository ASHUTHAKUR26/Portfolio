import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { YoutubeIcon } from "@/components/ui/YoutubeIcon";
import { socials, youtube } from "@/data/profile";

export function YoutubeSection() {
  return (
    <section id="youtube" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading eyebrow="youtube" title="Meet me on YouTube." />

        <Reveal delay={0.08}>
          <div className="glass mt-12 grid grid-cols-1 gap-10 rounded-3xl p-8 sm:p-10 lg:grid-cols-[260px_1fr] lg:items-stretch">
            <div className="flex flex-col items-center justify-center gap-5 text-center lg:h-full lg:px-4">
              <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#FF0000]/10 text-[#FF0000]">
                <YoutubeIcon size={48} />
              </span>
              <div>
                <p className="mono-eyebrow mb-1.5">// {youtube.channelName}</p>
                <p className="font-display text-lg font-semibold text-[var(--color-ink)]">
                  {youtube.tagline}
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-muted)]">{youtube.handle}</p>
              </div>
            </div>

            <div>
              <p className="text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                {youtube.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {youtube.pillars.map((pillar) => (
                  <li key={pillar} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-muted)]">
                    {pillar}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <MagneticButton href={socials.youtube} variant="primary">
                  <YoutubeIcon size={16} />
                  Subscribe on YouTube
                  <ExternalLink size={14} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}