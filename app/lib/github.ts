/* ── GitHub API utility ── */

export type GitHubRepo = {
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    topics: string[];
    fork: boolean;
};

/** Language → colour mapping for badges */
export const languageColors: Record<string, string> = {
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Java: "#ED8B00",
    Python: "#3776AB",
    Go: "#00ADD8",
    Rust: "#DEA584",
    "C#": "#239120",
    "C++": "#00599C",
    C: "#A8B9CC",
    HTML: "#E34F26",
    CSS: "#1572B6",
    Shell: "#89E051",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    Ruby: "#CC342D",
    PHP: "#777BB4",
    Dart: "#00B4AB",
    PLSQL: "#F80000",
};

const GITHUB_USER = "iamdavisin";
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=owner`;

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
    const res = await fetch(API_URL, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 }, // ISR — re-fetch every hour
    });

    if (!res.ok) {
        console.error("GitHub API error:", res.status, res.statusText);
        return [];
    }

    const repos: GitHubRepo[] = await res.json();

    // Filter out forks and return sorted by most recently updated
    return repos
        .filter((r) => !r.fork)
        .sort(
            (a, b) =>
                new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
}

/** Prettify repo name: "my-cool-repo" → "My Cool Repo" */
export function formatRepoName(name: string): string {
    return name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
