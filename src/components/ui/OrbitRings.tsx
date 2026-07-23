type RingProps = {
  size: string; // percentage of container, e.g. "88%"
  tilt: number; // degrees
  duration: number; // seconds per rotation
  color: string;
  reverse?: boolean;
};

/**
 * A tilted ring, drawn as a circle rotated in 3D via CSS (rotateX),
 * spinning around its own center. Sized as a % of the shared container,
 * so it can never drift relative to the photo — same box, same center.
 */
function Ring({ size, tilt, duration, color, reverse = false }: RingProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="animate-spin rounded-full"
        style={{
          width: size,
          height: size,
          border: `1.5px solid ${color}`,
          opacity: 0.55,
          boxShadow: `0 0 26px -4px ${color}`,
          transform: `rotateX(${tilt}deg)`,
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationTimingFunction: "linear",
        }}
      />
    </div>
  );
}

type DotProps = {
  orbitSize: string; // percentage of container — defines the orbit radius
  tilt: number; // degrees, should match the ring it belongs to
  duration: number;
  delay?: number;
  reverse?: boolean;
  size?: number; // px
  color: string;
};

/**
 * A small glowing dot that revolves around the container's center on a
 * tilted plane, matching a Ring's orbit. Radius comes from `orbitSize`
 * (a % of the shared container), so — like Ring — it can't drift out of
 * alignment regardless of screen size.
 */
function Dot({
  orbitSize,
  tilt,
  duration,
  delay = 0,
  reverse = false,
  size = 8,
  color,
}: DotProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ transform: `rotateX(${tilt}deg)` }}
    >
      <div
        className="relative animate-spin"
        style={{
          width: orbitSize,
          height: orbitSize,
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationDelay: `${delay}s`,
          animationTimingFunction: "linear",
        }}
      >
        <span
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "100%",
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            background: color,
            boxShadow: `0 0 10px 1px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

const ACCENT = "var(--color-accent)";
const PURPLE = "var(--color-purple)";
const CYAN = "var(--color-cyan)";

/**
 * Three tilted rings + orbiting particles around a shared center point.
 * Pure CSS (no WebGL) — the photo and every ring/dot are centered by the
 * exact same "absolute inset-0 flex items-center justify-center" box, so
 * there is no camera, perspective, or projection math to get out of sync.
 */
export function OrbitRings() {
  return (
    <div className="pointer-events-none absolute inset-0" style={{ perspective: 900 }}>
      <Ring size="88%" tilt={72} duration={16} color={ACCENT} />
      <Ring size="102%" tilt={68} duration={22} color={PURPLE} reverse />
      <Ring size="72%" tilt={78} duration={12} color={CYAN} />

      <Dot orbitSize="88%" tilt={72} duration={16} color={ACCENT} />
      <Dot orbitSize="88%" tilt={72} duration={16} color={ACCENT} delay={-8} />
      <Dot orbitSize="102%" tilt={68} duration={22} color={PURPLE} reverse />
      <Dot orbitSize="102%" tilt={68} duration={22} color={PURPLE} reverse delay={-11} size={6} />
      <Dot orbitSize="72%" tilt={78} duration={12} color={CYAN} size={6} />
    </div>
  );
}