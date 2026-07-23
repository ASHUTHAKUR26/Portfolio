// Thin wrapper over the public GitHub REST API. Runs client-side in the
// visitor's browser (not at build time), so it always reflects live data
// and uses the visitor's own unauthenticated rate limit (60 req/hr/IP —
// plenty for a portfolio page making 2 requests per visit).

export type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  company: string | null;
  location: string | null;
};

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics?: string[];
};

export type GithubData = {
  user: GithubUser;
  topRepos: GithubRepo[];
  languageTotals: { language: string; count: number }[];
};

const API_BASE = "https://api.github.com";

async function githubFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error(
        "GitHub API rate limit reached — try again in a few minutes."
      );
    }
    throw new Error(`GitHub API error (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export async function fetchGithubData(username: string): Promise<GithubData> {
  const [user, repos] = await Promise.all([
    githubFetch<GithubUser>(`/users/${username}`),
    githubFetch<GithubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`),
  ]);

  const ownRepos = repos.filter((r) => !r.fork);

  // No auth token available client-side, so true "pinned" repos (a
  // GraphQL-only concept) aren't accessible. Stars-then-recency is the
  // closest unauthenticated proxy for "repos worth surfacing."
  const topRepos = [...ownRepos]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    })
    .slice(0, 6);

  const languageCounts = new Map<string, number>();
  for (const repo of ownRepos) {
    if (!repo.language) continue;
    languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }
  const languageTotals = Array.from(languageCounts.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return { user, topRepos, languageTotals };
}
