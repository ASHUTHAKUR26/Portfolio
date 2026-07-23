import { Star, GitFork, ExternalLink, Users, BookMarked, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { useGithubData } from "@/hooks/useGithubData";
import { githubUsername, socials } from "@/data/profile";

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
};

export function GithubSection() {
  const state = useGithubData(githubUsername);

  return (
    <section id="github" className="relative py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="github"
          title="Live from GitHub."
          description="Pulled directly from the GitHub API on page load — this is my real, current activity, not a snapshot."
        />

        <div className="mt-16">
          {state.status === "loading" && <GithubSkeleton />}

          {state.status === "error" && (
            <div className="glass flex flex-col items-center gap-4 rounded-3xl p-12 text-center">
              <AlertCircle className="text-[var(--color-purple)]" size={28} />
              <p className="text-[var(--color-muted)]">{state.message}</p>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:text-[var(--color-cyan)]"
              >
                View profile on GitHub <ExternalLink size={15} />
              </a>
            </div>
          )}

          {state.status === "success" && (
            <div className="flex flex-col gap-6">
              {/* Profile summary + stat cards */}
              <Reveal>
                <div className="glass grid grid-cols-1 gap-8 rounded-3xl p-8 sm:grid-cols-[auto_1fr] sm:items-center">
                  <img
                    src={state.data.user.avatar_url}
                    alt={`${state.data.user.name ?? githubUsername}'s GitHub avatar`}
                    width={88}
                    height={88}
                    loading="lazy"
                    className="h-22 w-22 rounded-2xl border border-[var(--color-border)]"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-semibold">
                        {state.data.user.name ?? state.data.user.login}
                      </h3>
                      <a
                        href={state.data.user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] hover:text-[var(--color-cyan)]"
                      >
                        <GithubIcon size={14} /> @{state.data.user.login}
                      </a>
                    </div>
                    {state.data.user.bio && (
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        {state.data.user.bio}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-6">
                      <Stat icon={BookMarked} value={state.data.user.public_repos} label="Repositories" />
                      <Stat icon={Users} value={state.data.user.followers} label="Followers" />
                      <Stat
                        icon={Star}
                        value={state.data.topRepos.reduce((sum, r) => sum + r.stargazers_count, 0)}
                        label="Stars (top repos)"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Contribution graph */}
              <Reveal delay={0.06}>
                <div className="glass overflow-x-auto rounded-3xl p-8">
                  <p className="mono-eyebrow mb-5">// contribution activity</p>
                  <img
                    src={`https://ghchart.rshah.org/38bdf8/${githubUsername}`}
                    alt={`${githubUsername}'s GitHub contribution graph`}
                    loading="lazy"
                    className="min-w-[640px] w-full"
                  />
                </div>
              </Reveal>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.55fr]">
                {/* Top repos */}
                <Reveal delay={0.1}>
                  <div className="glass h-full rounded-3xl p-8">
                    <p className="mono-eyebrow mb-5">// top repositories</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {state.data.topRepos.map((repo) => (
                        <a
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group rounded-2xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-accent)]/40"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
                              {repo.name}
                            </p>
                            <ExternalLink
                              size={13}
                              className="shrink-0 text-[var(--color-muted)]"
                            />
                          </div>
                          {repo.description && (
                            <p className="mt-1.5 line-clamp-2 text-xs text-[var(--color-muted)]">
                              {repo.description}
                            </p>
                          )}
                          <div className="mt-3 flex items-center gap-4 text-xs text-[var(--color-muted)]">
                            {repo.language && (
                              <span className="inline-flex items-center gap-1.5">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{
                                    background: LANGUAGE_COLORS[repo.language] ?? "#94a3b8",
                                  }}
                                />
                                {repo.language}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                              <Star size={12} /> {repo.stargazers_count}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <GitFork size={12} /> {repo.forks_count}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Language breakdown */}
                <Reveal delay={0.14}>
                  <div className="glass h-full rounded-3xl p-8">
                    <p className="mono-eyebrow mb-5">// languages</p>
                    <div className="flex flex-col gap-3">
                      {state.data.languageTotals.map((lang) => {
                        const max = state.data.languageTotals[0]?.count ?? 1;
                        const pct = Math.max((lang.count / max) * 100, 8);
                        return (
                          <div key={lang.language}>
                            <div className="mb-1.5 flex items-center justify-between text-xs">
                              <span className="text-[var(--color-ink)]">{lang.language}</span>
                              <span className="text-[var(--color-muted)]">{lang.count}</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${pct}%`,
                                  background: LANGUAGE_COLORS[lang.language] ?? "var(--color-accent)",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                      {state.data.languageTotals.length === 0 && (
                        <p className="text-sm text-[var(--color-muted)]">
                          No language data available yet.
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Star;
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={15} className="text-[var(--color-accent)]" />
      <span className="font-display font-semibold text-[var(--color-ink)]">{value}</span>
      <span className="text-xs text-[var(--color-muted)]">{label}</span>
    </div>
  );
}

function GithubSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass h-32 animate-pulse rounded-3xl" />
      <div className="glass h-48 animate-pulse rounded-3xl" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.55fr]">
        <div className="glass h-64 animate-pulse rounded-3xl" />
        <div className="glass h-64 animate-pulse rounded-3xl" />
      </div>
    </div>
  );
}
