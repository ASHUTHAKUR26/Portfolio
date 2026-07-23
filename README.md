# Ashu Kr Thakur — Portfolio

**Live:** [ashu-thakur-portfolio.vercel.app](https://ashu-thakur-portfolio.vercel.app/)

A premium, animated developer portfolio built with React 19, TypeScript,
Vite, Tailwind CSS v4, Framer Motion, and React Three Fiber.

Live sections: Hero, About, Skills, Projects, Experience, GitHub (live data),
YouTube, Ask Ashu (contact form), plus dark/light mode and a mobile nav menu.

## Features

- **Design system** — dark/light theme (toggle in the navbar), aurora
  mesh-gradient background, glassmorphism surfaces, Geist + Inter type
  system, all driven by CSS variable tokens in `src/index.css` so theming
  never touches component code.
- **Hero** — profile photo orbited by tilted, rotating CSS rings and
  particles; typing role rotation; magnetic CTA buttons (LinkedIn, resume
  download, view projects).
- **About** — animated stat counters, current stack, quick facts.
- **Skills** — a draggable 3D skill sphere (React Three Fiber), mirrored by
  an accessible list underneath for keyboard/screen-reader users.
- **Projects** — real project data, fuzzy search (Fuse.js), tech filters,
  tilt/spotlight hover cards.
- **Experience** — animated timeline (education + self-taught milestones).
- **Achievements** — certificate/hackathon/award cards. Currently **not
  rendered** (commented out in `App.tsx`) until there's real data to show —
  see "Turning Achievements back on" below.
- **GitHub** — fully live, fetched client-side from the real GitHub REST API
  on page load: avatar, bio, repo count, followers, top repos by stars,
  language breakdown, and a real contribution graph image. Has a loading
  skeleton and a graceful fallback if the API rate-limits.
- **YouTube** — channel promo section (Campus With Ashu) with a subscribe CTA.
- **Ask Ashu** — real contact form with validation and toast feedback, wired
  to EmailJS so messages land directly in your inbox (see setup below).
- **Dark/Light mode** — toggle persists in `localStorage`, respects OS
  preference on first visit, no flash-of-wrong-theme on load.
- **Mobile menu** — animated hamburger nav for small screens.
- **Custom favicon** — gradient "A" mark (SVG + PNG fallbacks + Apple
  touch icon).

## Setup

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

### 1. Your photo

Drop a square-ish photo (500x500px+) at `public/profile-photo.jpg` (or
`.png` — update `PHOTO_SRC` in `src/components/ui/OrbitPhoto.tsx` to match).
Until it exists, a clean initials placeholder shows instead.

### 2. Your resume

Drop the real PDF at `public/resume.pdf`. The "Download resume" button
downloads it directly (no new tab).

### 3. Contact form (EmailJS)

`src/config/emailjs.ts` needs three real values from
[dashboard.emailjs.com](https://dashboard.emailjs.com):

```ts
export const EMAILJS_SERVICE_ID = "your_service_id";   // Email Services tab
export const EMAILJS_TEMPLATE_ID = "your_template_id"; // Email Templates tab
export const EMAILJS_PUBLIC_KEY = "your_public_key";   // Account → General tab
```

Until these are filled in, the form still validates and works, but shows a
warning instead of sending — it never fails silently.

### 4. Turning Achievements back on

Once you have a real certificate, hackathon, or award to show:

1. Fill in real entries in `src/data/profile.ts` → `export const achievements`.
2. In `src/App.tsx`, uncomment the import and usage:
```tsx
   import { Achievements } from "@/sections/Achievements";
   // ...
   <Achievements />
```
3. Add it to the navbar `NAV_LINKS` in `src/components/layout/Navbar.tsx` if
   you want it in the nav too.

## Content you should double-check

- `src/data/profile.ts` → `experience` has real data, but review it —
  update dates/details as your timeline changes.
- Tech-stack tags on Health Track System and JobPilot were inferred from
  project names (GitHub's API was rate-limited when this was first built) —
  confirm they're accurate.
- The GitHub section shows repos sorted by stars, not true "pinned" repos —
  pinning is only exposed via GitHub's authenticated GraphQL API, which
  isn't safe to call with a secret token from the browser. True pinned repos
  would need a small serverless function holding a token.

## Not yet built

Blog, AI chatbot, voice introduction, command palette (Cmd+K), visitor
analytics dashboard.

## Project structure

All content — name, projects, skills, experience, achievements, social
links — lives in `src/data/profile.ts`. Edit that file to update copy
across the whole site.

## Deployment

Live on [Vercel](https://ashu-thakur-portfolio.vercel.app/), connected to
this GitHub repo — every push to `main` auto-deploys.

To redeploy elsewhere or set up fresh:
1. Push this repo to GitHub.
2. On Vercel: "Add New Project" → import the repo → Deploy.
3. Framework preset: Vite (auto-detected). No extra config needed.