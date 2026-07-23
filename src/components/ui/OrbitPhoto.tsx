import { useState } from "react";
import { OrbitRings } from "@/components/ui/OrbitRings";
import { profile } from "@/data/profile";

/**
 * Drop your photo at public/profile-photo.jpg (or .png) — this looks
 * for it automatically. Until then it shows a clean initials placeholder
 * so the layout never breaks.
 */
const PHOTO_SRC = "/profile-photo.png";

export function OrbitPhoto() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <OrbitRings />

      {/* Photo — centered by the exact same box as the rings above */}
      
      <div className="relative z-10 h-[46%] w-[46%] min-h-[160px] min-w-[160px] translate-y-4">
        <div
          aria-hidden
          className="absolute -inset-3 rounded-full opacity-70 blur-xl"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-accent), var(--color-purple), var(--color-cyan), var(--color-accent))",
          }}
        />
        <div className="glass-strong relative h-full w-full overflow-hidden rounded-full border-2 border-[var(--color-accent)]/30">
          {photoFailed ? (
            <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg-secondary)] font-display text-4xl font-bold text-[var(--color-ink)]">
              {profile.initials}
            </div>
          ) : (
            <img
              src={PHOTO_SRC}
              alt={profile.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: "60% 8%" }}
              onError={() => setPhotoFailed(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}