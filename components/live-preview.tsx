"use client";

import useSWR from "swr";
import {
  Github,
  Star,
  GitFork,
  Users,
  Code,
  ExternalLink,
  RefreshCw,
  Clock,
  Activity,
} from "lucide-react";

interface GitHubData {
  user: {
    login: string;
    name: string;
    avatar_url: string;
    html_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    location: string;
    blog: string;
  };
  repos: {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    topics: string[];
    updated_at: string;
    pushed_at: string;
    homepage: string | null;
  }[];
  stats: {
    totalStars: number;
    totalForks: number;
    totalRepos: number;
    followers: number;
    languages: string[];
  };
  lastUpdated: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Python: "bg-green-500",
  Rust: "bg-orange-500",
  Go: "bg-cyan-500",
  HTML: "bg-red-500",
  CSS: "bg-purple-500",
  Shell: "bg-gray-500",
  Swift: "bg-orange-400",
  Kotlin: "bg-violet-500",
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-background" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted">{label}</p>
      </div>
    </div>
  );
}

function RepoCard({
  repo,
}: {
  repo: GitHubData["repos"][0];
}) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-background/50 border border-border card-hover group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {repo.name}
        </h4>
        <ExternalLink className="w-4 h-4 text-muted flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {repo.description && (
        <p className="text-sm text-muted mb-3 line-clamp-2">{repo.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {repo.language && (
            <div className="flex items-center gap-1">
              <span
                className={`w-3 h-3 rounded-full ${
                  languageColors[repo.language] || "bg-gray-400"
                }`}
              />
              <span className="text-xs text-muted">{repo.language}</span>
            </div>
          )}
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted">
              <Star className="w-3 h-3" />
              {repo.stargazers_count}
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted">
              <GitFork className="w-3 h-3" />
              {repo.forks_count}
            </div>
          )}
        </div>
        <span className="text-xs text-muted">{formatTimeAgo(repo.pushed_at)}</span>
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-card rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-card rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function LivePreview() {
  const { data, error, isLoading, mutate } = useSWR<GitHubData>(
    "/api/github",
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: false,
    }
  );

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              Live Preview
            </h2>
            <p className="text-lg text-muted">Real-time GitHub activity and projects</p>
          </div>

          <div className="flex items-center gap-4">
            {data?.lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <Clock className="w-4 h-4" />
                <span>Updated {formatTimeAgo(data.lastUpdated)}</span>
              </div>
            )}
            <button
              onClick={() => mutate()}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border card-hover text-sm disabled:opacity-50"
              aria-label="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-red-400">Failed to load live data. Please try again later.</p>
          </div>
        )}

        {isLoading && <LoadingSkeleton />}

        {data && !error && (
          <div className="space-y-8">
            {/* Live Stats */}
            <div className="p-6 rounded-2xl bg-card gradient-border">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Live Statistics</h3>
                <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={Code}
                  label="Repositories"
                  value={data.stats.totalRepos}
                  color="bg-primary"
                />
                <StatCard
                  icon={Star}
                  label="Total Stars"
                  value={data.stats.totalStars}
                  color="bg-yellow-500"
                />
                <StatCard
                  icon={GitFork}
                  label="Total Forks"
                  value={data.stats.totalForks}
                  color="bg-secondary"
                />
                <StatCard
                  icon={Users}
                  label="Followers"
                  value={data.stats.followers}
                  color="bg-accent"
                />
              </div>

              {data.stats.languages.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted mb-3">Languages Used</p>
                  <div className="flex flex-wrap gap-2">
                    {data.stats.languages.map((lang) => (
                      <span
                        key={lang}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/50 border border-border text-sm"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            languageColors[lang] || "bg-gray-400"
                          }`}
                        />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recent Projects */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Recent Projects</h3>
                </div>
                <a
                  href={data.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View all
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.repos.slice(0, 6).map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>

            {/* Profile Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={data.user.avatar_url}
                  alt={data.user.name || data.user.login}
                  className="w-20 h-20 rounded-full border-2 border-primary/30"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-foreground">
                    {data.user.name || data.user.login}
                  </h3>
                  <p className="text-muted">@{data.user.login}</p>
                  {data.user.bio && (
                    <p className="text-sm text-muted mt-2">{data.user.bio}</p>
                  )}
                </div>
                <a
                  href={data.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-opacity"
                >
                  <Github className="w-5 h-5" />
                  Follow on GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
