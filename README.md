# Ashu Kr Thakur — Portfolio
# Personal Portfolio

Phases 1–2 of a premium, animated developer portfolio. Built with React 19,
TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Three Fiber and Lenis.

## Adding your photo

The Hero's 3D "code window" was replaced with **your photo, orbited by
rotating 3D rings and particles**. To make it show your actual photo:

1. Drop a square-ish photo (ideally 500x500px+) into `public/profile-photo.jpg`
   (or edit `PHOTO_SRC` in `src/components/ui/OrbitPhoto.tsx` if you'd rather
   use a `.png`).
2. That's it — the component auto-detects it. Until the file exists, it
   shows a clean initials placeholder (`AT`) so the layout never breaks.

## What's included so far

**Phase 1**
- Design system: dark theme, aurora mesh-gradient background, glassmorphism
  surfaces, Geist + Inter type system, all driven by CSS variable tokens in
  `src/index.css`.
- Hero with a procedural 3D "code window" scene, typing role rotation,
  magnetic CTA buttons.
- About with animated stat counters, current stack, quick facts.
- Skills as a draggable 3D skill sphere, mirrored by an accessible list.
- Projects with real data, fuzzy search (Fuse.js), tech filters, tilt cards.

**Phase 2**
- **Experience**: animated timeline (education + work). ⚠️ Placeholder
  content — see below, nothing here was fabricated as fact.
- **Achievements**: certificates / hackathons / awards cards, same category
  of placeholder content.
- **GitHub**: fully live section, fetched client-side from the real GitHub
  REST API on page load (not build-time, not mocked) — avatar, bio, repo
  count, followers, top repos by stars, language breakdown, and a real
  contribution graph image. Includes loading skeleton and an error state
  that falls back to a link to your profile if the API rate-limits.

## Not yet built (planned next phases)

Blog, AI chatbot, voice introduction, command palette (Cmd+K), dark/light
toggle, visitor analytics dashboard, full Contact form with EmailJS.

## Things you need to supply before shipping

- **`src/data/profile.ts` → `experience` and `achievements` arrays are
  placeholders.** Every field says "Add your ___" — replace them with your
  real timeline, certificates, and hackathon results before this goes live.
  I didn't invent fake job history or credentials for you.
- `public/resume.pdf` — the actual resume file (`profile.resumeUrl` points here).
- A real contact email in `src/data/profile.ts` (`profile.email`).
- A real LinkedIn URL in `src/data/profile.ts` (`socials.linkedin`), if wanted.
- Confirm/edit the tech-stack guesses on Health Track System and JobPilot —
  inferred from project names since GitHub's API was rate-limited when built.
- The GitHub section shows repos sorted by stars, not true "pinned" repos —
  pinning is only exposed via GitHub's authenticated GraphQL API, which
  isn't safe to call with a secret token from the browser. If you want true
  pinned repos, that needs a small serverless function holding a token.

## Running it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/
    ui/        reusable primitives (buttons, cards, reveals, effects)
    layout/    navbar, footer
  sections/    one file per page section
  3d/          React Three Fiber scenes, isolated + lazy-loaded
  hooks/       useLenis, useMousePosition, useInView, useGithubData
  services/    github.ts — GitHub REST API client
  data/        profile.ts - single source of truth for all content
```

All content lives in `src/data/profile.ts`. Edit that file to update copy,
projects, skills, experience, achievements, or links across the whole site.

