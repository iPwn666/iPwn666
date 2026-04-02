#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const username = process.env.PROFILE_USERNAME || "iPwn666";
const apiToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(repoRoot, "assets");

const apiHeaders = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${username}-profile-refresh`,
};

if (apiToken) {
  apiHeaders.Authorization = `Bearer ${apiToken}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function truncate(value, maxLength) {
  if (!value) {
    return "";
  }

  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}...` : value;
}

function formatAbsolute(dateValue) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Prague",
  }).format(new Date(dateValue));
}

async function readExistingSnapshot() {
  try {
    const raw = await readFile(path.join(assetsDir, "live-data.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function fetchJson(endpoint) {
  const response = await fetch(`https://api.github.com/${endpoint}`, {
    headers: apiHeaders,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API request failed for ${endpoint}: ${response.status} ${body}`);
  }

  return response.json();
}

function summarizeEvent(event) {
  const repoName = event.repo?.name || "unknown repo";
  const createdAt = event.created_at;
  const absolute = formatAbsolute(createdAt);
  const branch = event.payload?.ref?.replace("refs/heads/", "");
  const commits = event.payload?.commits || [];

  switch (event.type) {
    case "PushEvent":
      return {
        kind: "push",
        accent: "#14b8a6",
        absolute,
        summary: `Push on ${repoName}`,
        detail: commits.length > 0
          ? branch
            ? `${commits.length} commit(s) on ${branch}`
            : `${commits.length} commit(s) published`
          : branch
            ? `activity on ${branch}`
            : "repository activity published",
      };
    case "CreateEvent":
      return {
        kind: "create",
        accent: "#f97316",
        absolute,
        summary: `Created ${event.payload?.ref_type || "resource"} in ${repoName}`,
        detail: branch || "new reference created",
      };
    case "WatchEvent":
      return {
        kind: "star",
        accent: "#facc15",
        absolute,
        summary: `Starred ${repoName}`,
        detail: "public watch event",
      };
    case "IssuesEvent":
      return {
        kind: "issue",
        accent: "#38bdf8",
        absolute,
        summary: `Issue ${event.payload?.action || "activity"} in ${repoName}`,
        detail: truncate(event.payload?.issue?.title || "issue event", 46),
      };
    case "PullRequestEvent":
      return {
        kind: "pr",
        accent: "#a3e635",
        absolute,
        summary: `PR ${event.payload?.action || "activity"} in ${repoName}`,
        detail: truncate(event.payload?.pull_request?.title || "pull request event", 46),
      };
    default:
      return {
        kind: "event",
        accent: "#94a3b8",
        absolute,
        summary: `${event.type.replace(/Event$/, "")} on ${repoName}`,
        detail: "public activity signal",
      };
  }
}

function buildHeroSvg(snapshot) {
  const tags = snapshot.focusTracks
    .map((tag, index) => {
      const x = 64 + index * 224;
      return `
        <g transform="translate(${x} 408)">
          <rect width="192" height="36" rx="18" fill="rgba(15, 23, 42, 0.72)" stroke="rgba(45, 212, 191, 0.20)" />
          <text x="96" y="23" text-anchor="middle" fill="#dbeafe" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14">${escapeXml(tag)}</text>
        </g>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="640" viewBox="0 0 1280 640" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(snapshot.username)} hero panel</title>
  <desc id="desc">Animated profile banner with live profile summary.</desc>
  <defs>
    <linearGradient id="heroBg" x1="0" y1="0" x2="1280" y2="640" gradientUnits="userSpaceOnUse">
      <stop stop-color="#020617" />
      <stop offset="0.55" stop-color="#0f172a" />
      <stop offset="1" stop-color="#13202f" />
    </linearGradient>
    <linearGradient id="heroAccent" x1="132" y1="84" x2="1120" y2="520" gradientUnits="userSpaceOnUse">
      <stop stop-color="#14b8a6" />
      <stop offset="1" stop-color="#f97316" />
    </linearGradient>
    <pattern id="heroGrid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M 42 0 L 0 0 0 42" fill="none" stroke="rgba(148, 163, 184, 0.10)" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="1280" height="640" rx="32" fill="url(#heroBg)" />
  <rect width="1280" height="640" rx="32" fill="url(#heroGrid)" />
  <circle cx="1050" cy="130" r="220" fill="rgba(20, 184, 166, 0.16)" />
  <circle cx="1170" cy="80" r="130" fill="rgba(249, 115, 22, 0.15)" />
  <circle cx="114" cy="108" r="7" fill="#14b8a6">
    <animate attributeName="opacity" values="1;0.35;1" dur="1.8s" repeatCount="indefinite" />
  </circle>
  <text x="132" y="113" fill="#99f6e4" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="24">LIVE PROFILE / ${escapeXml(snapshot.generatedAtPrague)}</text>

  <text x="132" y="214" fill="#f8fafc" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="74" font-weight="700">${escapeXml(snapshot.displayName)}</text>
  <text x="132" y="266" fill="#14b8a6" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="28">@${escapeXml(snapshot.username)}</text>
  <text x="132" y="318" fill="#cbd5e1" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="28">Device tooling / iOS internals / NixOS ops / native AI loops</text>

  <g transform="translate(132 486)">
    <rect width="1016" height="94" rx="22" fill="rgba(15, 23, 42, 0.86)" stroke="rgba(148, 163, 184, 0.16)" />
    <rect x="30" y="26" width="168" height="40" rx="20" fill="rgba(20, 184, 166, 0.14)" />
    <text x="114" y="51" text-anchor="middle" fill="#ccfbf1" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18">${escapeXml(snapshot.location)}</text>
    <rect x="224" y="26" width="188" height="40" rx="20" fill="rgba(249, 115, 22, 0.14)" />
    <text x="318" y="51" text-anchor="middle" fill="#ffedd5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18">${escapeXml(snapshot.company)}</text>
    <rect x="438" y="26" width="178" height="40" rx="20" fill="rgba(56, 189, 248, 0.14)" />
    <text x="527" y="51" text-anchor="middle" fill="#dbeafe" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18">${snapshot.publicRepos} public repo(s)</text>
    <rect x="642" y="26" width="168" height="40" rx="20" fill="rgba(163, 230, 53, 0.14)" />
    <text x="726" y="51" text-anchor="middle" fill="#ecfccb" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18">${snapshot.followers} follower(s)</text>
    <rect x="836" y="26" width="150" height="40" rx="20" fill="rgba(148, 163, 184, 0.16)" />
    <text x="911" y="51" text-anchor="middle" fill="#e2e8f0" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18">since ${escapeXml(snapshot.memberSinceShort)}</text>
  </g>

  ${tags}

  <rect x="56" y="598" width="1168" height="4" rx="2" fill="rgba(20, 184, 166, 0.16)" />
  <rect x="56" y="598" width="232" height="4" rx="2" fill="url(#heroAccent)">
    <animate attributeName="x" values="56;1000;56" dur="8s" repeatCount="indefinite" />
  </rect>
</svg>
`;
}

function buildLiveBoardSvg(snapshot) {
  const cards = [
    ["Company", snapshot.company],
    ["Location", snapshot.location],
    ["Hireable", snapshot.hireable ? "yes" : "no"],
    ["Member since", snapshot.memberSince],
    ["Last repo touch", snapshot.repoUpdatedAtDisplay],
    ["Last public event", snapshot.lastEventAt],
  ];

  const cardMarkup = cards
    .map(([label, value], index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = 64 + col * 382;
      const y = 212 + row * 138;

      return `
        <g transform="translate(${x} ${y})">
          <rect width="334" height="106" rx="20" fill="rgba(15, 23, 42, 0.84)" stroke="rgba(148, 163, 184, 0.15)" />
          <text x="24" y="34" fill="#94a3b8" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="15">${escapeXml(label)}</text>
          <text x="24" y="70" fill="#f8fafc" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="28" font-weight="700">${escapeXml(value)}</text>
        </g>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="520" viewBox="0 0 1280 520" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Live signal board</title>
  <desc id="desc">Live GitHub-derived telemetry for the profile.</desc>
  <defs>
    <linearGradient id="boardBg" x1="0" y1="0" x2="1280" y2="520" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0b1220" />
      <stop offset="1" stop-color="#111827" />
    </linearGradient>
  </defs>

  <rect width="1280" height="520" rx="30" fill="url(#boardBg)" />
  <rect x="48" y="48" width="1184" height="92" rx="24" fill="rgba(15, 23, 42, 0.88)" stroke="rgba(20, 184, 166, 0.18)" />
  <circle cx="88" cy="94" r="8" fill="#14b8a6">
    <animate attributeName="r" values="8;10;8" dur="1.6s" repeatCount="indefinite" />
  </circle>
  <text x="112" y="85" fill="#f8fafc" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="34" font-weight="700">Signal Board</text>
  <text x="112" y="114" fill="#cbd5e1" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="20">Generated from public GitHub data and committed back into the profile repo.</text>

  <text x="1022" y="86" fill="#99f6e4" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="16">snapshot</text>
  <text x="1022" y="114" fill="#f8fafc" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18">${escapeXml(snapshot.generatedAtPrague)}</text>

  ${cardMarkup}

  <g transform="translate(64 116)">
    <rect width="1152" height="10" rx="5" fill="rgba(148, 163, 184, 0.10)" />
    <rect width="312" height="10" rx="5" fill="#14b8a6">
      <animate attributeName="x" values="0;840;0" dur="7.2s" repeatCount="indefinite" />
    </rect>
  </g>
</svg>
`;
}

function buildEventStreamSvg(snapshot) {
  const rows = snapshot.events.length
    ? snapshot.events
        .map((event, index) => {
          const y = 102 + index * 92;
          return `
            <g transform="translate(56 ${y})">
              <rect width="1168" height="72" rx="18" fill="rgba(15, 23, 42, 0.80)" stroke="rgba(148, 163, 184, 0.13)" />
              <circle cx="36" cy="36" r="8" fill="${event.accent}">
                <animate attributeName="opacity" values="1;0.3;1" dur="${1.4 + index * 0.2}s" repeatCount="indefinite" />
              </circle>
              <text x="64" y="31" fill="#f8fafc" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="24" font-weight="700">${escapeXml(event.summary)}</text>
              <text x="64" y="54" fill="#cbd5e1" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="17">${escapeXml(event.detail)}</text>
              <text x="1048" y="43" text-anchor="end" fill="#99f6e4" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14">${escapeXml(event.absolute)}</text>
            </g>
          `;
        })
        .join("")
    : `
        <g transform="translate(56 126)">
          <rect width="1168" height="120" rx="18" fill="rgba(15, 23, 42, 0.80)" stroke="rgba(148, 163, 184, 0.13)" />
          <text x="48" y="64" fill="#f8fafc" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="28" font-weight="700">No recent public events yet</text>
          <text x="48" y="94" fill="#cbd5e1" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="18">The workflow is ready; this panel will populate as the account emits public activity.</text>
        </g>
      `;

  const height = Math.max(340, 130 + snapshot.events.length * 92);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="${height}" viewBox="0 0 1280 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Recent event stream</title>
  <desc id="desc">Recent public GitHub activity for the profile.</desc>
  <rect width="1280" height="${height}" rx="30" fill="#020617" />
  <rect x="48" y="34" width="1184" height="44" rx="22" fill="rgba(15, 23, 42, 0.86)" />
  <text x="76" y="62" fill="#f8fafc" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="28" font-weight="700">Recent Event Stream</text>
  <text x="1198" y="62" text-anchor="end" fill="#94a3b8" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="14">${escapeXml(snapshot.generatedAtPrague)}</text>
  ${rows}
</svg>
`;
}

async function main() {
  const [user, repo, events] = await Promise.all([
    fetchJson(`users/${username}`),
    fetchJson(`repos/${username}/${username}`),
    fetchJson(`users/${username}/events/public?per_page=6`),
  ]);

  const summarizedEvents = Array.isArray(events) ? events.slice(0, 6).map(summarizeEvent) : [];
  const existingSnapshot = await readExistingSnapshot();

  const stableSnapshot = {
    username,
    displayName: user.name || username,
    company: user.company || "independent operator",
    location: user.location || "location undisclosed",
    blog: user.blog || "",
    hireable: Boolean(user.hireable),
    bio: (user.bio || "").trim(),
    publicRepos: user.public_repos || 0,
    followers: user.followers || 0,
    following: user.following || 0,
    memberSince: formatAbsolute(user.created_at),
    memberSinceShort: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Europe/Prague",
    }).format(new Date(user.created_at)),
    repoUpdatedAt: repo.updated_at,
    repoUpdatedAtDisplay: formatAbsolute(repo.updated_at),
    lastEventAt: summarizedEvents[0]?.absolute || "no public events",
    focusTracks: [
      "device tooling",
      "iOS internals",
      "NixOS ops",
      "native AI loops",
    ],
    events: summarizedEvents,
  };

  const existingStableSnapshot = existingSnapshot
    ? {
        username: existingSnapshot.username,
        displayName: existingSnapshot.displayName,
        company: existingSnapshot.company,
        location: existingSnapshot.location,
        blog: existingSnapshot.blog,
        hireable: existingSnapshot.hireable,
        bio: existingSnapshot.bio,
        publicRepos: existingSnapshot.publicRepos,
        followers: existingSnapshot.followers,
        following: existingSnapshot.following,
        memberSince: existingSnapshot.memberSince,
        memberSinceShort: existingSnapshot.memberSinceShort,
        repoUpdatedAt: existingSnapshot.repoUpdatedAt,
        repoUpdatedAtDisplay: existingSnapshot.repoUpdatedAtDisplay,
        lastEventAt: existingSnapshot.lastEventAt,
        focusTracks: existingSnapshot.focusTracks,
        events: existingSnapshot.events,
      }
    : null;

  const dataChanged =
    JSON.stringify(stableSnapshot) !== JSON.stringify(existingStableSnapshot);

  const generatedAt = dataChanged || !existingSnapshot
    ? new Date().toISOString()
    : existingSnapshot.generatedAt;

  const generatedAtPrague = dataChanged || !existingSnapshot
    ? formatAbsolute(generatedAt)
    : existingSnapshot.generatedAtPrague;

  const snapshot = {
    ...stableSnapshot,
    generatedAt,
    generatedAtPrague,
  };

  await mkdir(assetsDir, { recursive: true });

  await Promise.all([
    writeFile(path.join(assetsDir, "live-data.json"), `${JSON.stringify(snapshot, null, 2)}\n`, "utf8"),
    writeFile(path.join(assetsDir, "hero.svg"), buildHeroSvg(snapshot), "utf8"),
    writeFile(path.join(assetsDir, "live-board.svg"), buildLiveBoardSvg(snapshot), "utf8"),
    writeFile(path.join(assetsDir, "event-stream.svg"), buildEventStreamSvg(snapshot), "utf8"),
  ]);

  console.log(`Generated profile assets for ${username} in ${assetsDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
