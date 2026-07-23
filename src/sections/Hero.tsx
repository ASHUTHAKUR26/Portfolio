import { motion, type Variants } from "framer-motion";
import { Download, ArrowRight, ChevronDown } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { Typewriter } from "@/components/ui/Typewriter";
import { OrbitPhoto } from "@/components/ui/OrbitPhoto";
import { profile, socials } from "@/data/profile";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <AuroraBackground />

          <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 flex flex-col gap-7">
          <motion.span variants={item} className="mono-eyebrow">
            // available for full-time opportunities
          </motion.span>

          <motion.h1 variants={item} className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            I'm{" "}
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div variants={item} className="font-mono text-xl sm:text-2xl text-[var(--color-accent)] h-8">
            <Typewriter words={profile.taglines} />
          </motion.div>

          <motion.p variants={item} className="max-w-lg text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {profile.degree}. I build full-stack products end to end and I'm focused on {profile.careerGoal.toLowerCase()}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-2">
            {socials.linkedin && (
              <MagneticButton href={socials.linkedin} variant="primary">
                <LinkedinIcon size={16} />
                Connect on LinkedIn
              </MagneticButton>
            )}
            <MagneticButton href={profile.resumeUrl} download="Ashu-Kr-Thakur-Resume.pdf" variant="secondary">
              <Download size={16} />
              Download resume
            </MagneticButton>
            <MagneticButton href="#projects" variant="ghost">
              View projects
              <ArrowRight size={16} />
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="relative h-[380px] sm:h-[460px] lg:h-[560px]">
          <OrbitPhoto />
        </div>
      </div>

      <motion.a href="#about" aria-label="Scroll to About section" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-muted)]" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
