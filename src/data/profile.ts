// Single source of truth for personal data.
// Edit this file to update content across the entire site.

export const profile = {
  name: "Ashu Kr Thakur",
  initials: "AT",
  role: "Full Stack Developer",
  taglines: ["Full Stack Developer", "AI Enthusiast", "Problem Solver"],
  degree: "B.Tech in Computer Science & Engineering",
  location: "India",
  careerGoal:
    "Become a Software Engineer and build impactful AI-powered products.",
  interests: [
    "AI",
    "Web Development",
    "Full Stack",
    "Open Source",
    "Machine Learning",
    "GitHub",
    "Cloud",
  ],
  email: "tashu3121@gmail.com", // placeholder — replace with real address
  resumeUrl: "/resume.pdf", // placeholder — drop a real PDF at public/resume.pdf
};

export const socials = {
  github: "https://github.com/ASHUTHAKUR26",
  leetcode: "https://leetcode.com/u/AshuThakur_26/",
  gfg: "https://www.geeksforgeeks.org/profile/tashucgss",
  linkedin: "https://www.linkedin.com/in/ashukrthakur26",
  youtube: "https://www.youtube.com/@campuswithashu",
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "live" | "in-progress";
  featured: boolean;
};

export const youtube = {
  channelName: "Campus With Ashu",
  tagline: "Learn smart. Build skills. Grow your career.",
  description:
    "Campus With Ashu is a YouTube channel built for engineering students. I share practical AI tools, coding hacks, study tips, and career guidance — the kind of things that actually help while you're in college, not just theory. The goal is simple: help students learn smarter, pick up real skills, and move their careers forward with confidence.",
  pillars: [
    "AI Tools & Useful Websites",
    "Coding, GitHub & VS Code Hacks",
    "Study Tips & Productivity Tricks",
    "DSA, Skill-Building & Learning Roadmaps",
    "Internship & Placement Preparation",
    "Practical Tech Tutorials for Students",
  ],
};

// Tech-stack tags marked with a trailing "?" style note are best-guess
// placeholders based on the project's nature — confirm/edit before shipping.
export const projects: Project[] = [
  {
    slug: "health-track-system",
    title: "Health Track System",
    description:
      "A health monitoring platform for logging vitals, tracking history, and visualizing trends over time.",
    longDescription:
      "Health Track System helps users record and monitor personal health metrics, keeping a running history so patterns become visible over time instead of getting lost between doctor visits.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://health-track-system-q7fh.vercel.app/",
    status: "live",
    featured: true,
  },
  {
    slug: "jobpilot",
    title: "JobPilot",
    description:
      "A job-search and application platform with authentication, listings, and a streamlined apply flow.",
    longDescription:
      "JobPilot is a job discovery platform built to make searching and applying to roles fast and organized, with secure login and a clean listings experience.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://jobpilot-lemon-three.vercel.app/login",
    status: "live",
    featured: true,
  },
  {
    slug: "ai-interview-coach",
    title: "AI Interview Coach",
    description:
      "An AI-powered mock interview coach that asks role-specific questions and gives feedback on answers.",
    longDescription:
      "AI Interview Coach is in active development — an AI-driven practice tool for interview prep, built around real-time question generation and answer feedback.",
    tech: ["React", "Node.js", "AI / LLM APIs"],
    status: "in-progress",
    featured: true,
  },
];

export type SkillCategory = {
  label: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["JavaScript", "Python", "C++", "Java"],
  },
  {
    label: "Frontend",
    skills: ["HTML", "CSS", "React"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    label: "Tools & Platforms",
    skills: ["Git", "GitHub", "AWS"],
  },
  {
    label: "AI / ML",
    skills: ["Machine Learning", "AI"],
  },
];

export const codingProfiles = [
  { label: "GitHub", url: socials.github, handle: "ASHUTHAKUR26" },
  { label: "LeetCode", url: socials.leetcode, handle: "AshuThakur_26" },
  { label: "GeeksforGeeks", url: socials.gfg, handle: "tashucgss" },
];

export const githubUsername = "ASHUTHAKUR26";

export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: "work" | "education" | "milestone";
  description: string;
  highlights: string[];
};

// PLACEHOLDER DATA — replace every entry below with your real timeline.
// Nothing here was provided, so these are structural examples only;
// shipping this as-is would misrepresent your background.
export const experience: ExperienceItem[] = [
  {
    id: "degree",
    role: "B.Tech, Computer Science & Engineering",
    organization: "Techno Bengal Institute of Technology",
    period: "2022 — 2026",
    type: "education",
    description:
      "Coursework spanning data structures, algorithms, databases, and software engineering — applied alongside self-driven full-stack and AI projects outside the classroom.",
    highlights: [
      "Built and shipped 3 full-stack projects (Health Track System, JobPilot, AI Interview Coach) during the program",
      "Self-taught the MERN stack and core AI/ML concepts alongside coursework",
    ],
  },
  {
    id: "milestone-1",
    role: "Self-taught full-stack development and started building real products",
    organization: "Self-taught",
    period: "2024 — Present",
    type: "milestone",
    description:
      "Learned the MERN stack outside the classroom and moved from tutorials to shipping real, working applications.",
    highlights: [
      "Shipped Health Track System and JobPilot as live, deployed full-stack apps",
      "Currently building AI Interview Coach, exploring LLM-based tools",
    ],
  },
];

export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "certificate" | "hackathon" | "award";
  url?: string;
  description: string;
};

// PLACEHOLDER DATA — replace with your real certificates/hackathons/awards.
export const achievements: Achievement[] = [
  {
    id: "placeholder-cert-1",
    title: "Add certificate/course name",
    issuer: "Add issuing platform (e.g. Coursera, AWS, freeCodeCamp)",
    date: "Add date",
    category: "certificate",
    description: "Add a short line on what the certificate covers.",
  },
  {
    id: "placeholder-hackathon-1",
    title: "Add hackathon name",
    issuer: "Add organizer",
    date: "Add date",
    category: "hackathon",
    description: "Add what you built and the result (finalist, winner, etc).",
  },
];
