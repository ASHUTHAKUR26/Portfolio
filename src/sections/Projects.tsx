import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/profile";

const ALL_TECH = Array.from(new Set(projects.flatMap((p) => p.tech))).sort();

const fuse = new Fuse(projects, {
  keys: ["title", "description", "tech"],
  threshold: 0.35,
});

export function Projects() {
  const [query, setQuery] = useState("");
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const results = useMemo(() => {
    let list = query.trim() ? fuse.search(query).map((r) => r.item) : projects;
    if (activeTech) {
      list = list.filter((p) => p.tech.includes(activeTech));
    }
    return list;
  }, [query, activeTech]);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="container-page">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="projects"
            title="Things I've built and shipped."
            description="A mix of live products and work in progress — each one solving a real, specific problem."
          />

          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="w-full rounded-full glass py-2.5 pl-10 pr-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none transition-colors focus-visible:border-[var(--color-accent)]"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
          <FilterChip
            label="All"
            active={activeTech === null}
            onClick={() => setActiveTech(null)}
          />
          {ALL_TECH.map((tech) => (
            <FilterChip
              key={tech}
              label={tech}
              active={activeTech === tech}
              onClick={() => setActiveTech(tech === activeTech ? null : tech)}
            />
          ))}
        </div>

        {/* <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-16 text-center text-sm text-[var(--color-muted)]">
            No projects match "{query}". Try a different search or clear the filter.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
        active
          ? "bg-[var(--color-accent)] text-[var(--color-bg)] font-medium"
          : "glass text-[var(--color-muted)] hover:text-[var(--color-ink)]"
      }`}
    >
      {label}
    </button>
  );
}
