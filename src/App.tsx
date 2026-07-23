import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { GithubSection } from "@/sections/GithubSection";
import { AskAshu } from "@/sections/AskAshu";
import { YoutubeSection } from "@/sections/YoutubeSection";

function App() {
  useLenis();

  return (
    <div className="grain relative min-h-screen bg-[var(--color-bg)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-bg)]">
        Skip to content
      </a>

      <CursorGlow />
      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GithubSection />
        <YoutubeSection />
        <AskAshu />
      </main>

      <Footer />
    </div>
  );
}

export default App;
