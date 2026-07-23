import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/**
 * The eyebrow uses a `// comment` style, deliberately borrowed from
 * source code rather than a generic numbered marker — this content
 * isn't a sequence, so a step-counter would encode a false meaning.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      <Reveal>
        <span className="mono-eyebrow">// {eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-ink)]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
