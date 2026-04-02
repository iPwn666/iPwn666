#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const username = process.env.PROFILE_USERNAME || "iPwn666";
const contactEmail = process.env.CONTACT_EMAIL || "FandaKalasek@icloud.com";
const apiToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const siteUrl =
  process.env.PROFILE_SITE_URL || `https://${username.toLowerCase()}.github.io/${username}/`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(repoRoot, "assets");
const siteDataDir = path.join(repoRoot, "site", "data");

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

function formatShortDate(dateValue) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Prague",
  }).format(new Date(dateValue));
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
        detail:
          commits.length > 0
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
        detail: truncate(event.payload?.issue?.title || "issue event", 54),
      };
    case "PullRequestEvent":
      return {
        kind: "pr",
        accent: "#a3e635",
        absolute,
        summary: `PR ${event.payload?.action || "activity"} in ${repoName}`,
        detail: truncate(event.payload?.pull_request?.title || "pull request event", 54),
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

function countEventKinds(events) {
  const counts = {
    push: 0,
    create: 0,
    star: 0,
    issue: 0,
    pr: 0,
    event: 0,
  };

  for (const event of events) {
    counts[event.kind] = (counts[event.kind] || 0) + 1;
  }

  return counts;
}

function buildHeroSvg(snapshot) {
  const tags = snapshot.focusTracks
    .map((tag, index) => {
      const x = 78 + index * 230;
      return `
        <g transform="translate(${x} 438)">
          <rect width="200" height="38" rx="19" fill="#09101b" stroke="rgba(45, 212, 191, 0.22)" />
          <text x="100" y="24" text-anchor="middle" fill="#d5fbf5" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="14">${escapeXml(tag)}</text>
        </g>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="640" viewBox="0 0 1280 640" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(snapshot.username)} live profile hero</title>
  <desc id="desc">Profile banner with live snapshot data and contact surface.</desc>
  <defs>
    <linearGradient id="heroBg" x1="0" y1="0" x2="1280" y2="640" gradientUnits="userSpaceOnUse">
      <stop stop-color="#040816" />
      <stop offset="0.52" stop-color="#0a1629" />
      <stop offset="1" stop-color="#132337" />
    </linearGradient>
    <linearGradient id="heroStroke" x1="84" y1="84" x2="1186" y2="544" gradientUnits="userSpaceOnUse">
      <stop stop-color="#14b8a6" />
      <stop offset="0.5" stop-color="#38bdf8" />
      <stop offset="1" stop-color="#f97316" />
    </linearGradient>
    <radialGradient id="heroGlowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1024 148) rotate(149.631) scale(346.854 273.575)">
      <stop stop-color="#14b8a6" stop-opacity="0.28" />
      <stop offset="1" stop-color="#14b8a6" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="heroGlowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1214 98) rotate(145.305) scale(280.446 218.839)">
      <stop stop-color="#f97316" stop-opacity="0.20" />
      <stop offset="1" stop-color="#f97316" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1280" height="640" rx="34" fill="url(#heroBg)" />
  <rect x="22" y="22" width="1236" height="596" rx="28" stroke="url(#heroStroke)" stroke-opacity="0.28" />
  <rect x="48" y="48" width="1184" height="544" rx="26" fill="#050b16" fill-opacity="0.32" />
  <ellipse cx="1024" cy="148" rx="312" ry="244" fill="url(#heroGlowA)" />
  <ellipse cx="1214" cy="98" rx="228" ry="180" fill="url(#heroGlowB)" />

  <g opacity="0.86">
    <path d="M808 162C900 222 1012 236 1146 202" stroke="rgba(56, 189, 248, 0.28)" stroke-width="2" stroke-linecap="round" />
    <path d="M774 216C910 286 1052 308 1188 272" stroke="rgba(20, 184, 166, 0.22)" stroke-width="2" stroke-linecap="round" />
    <path d="M758 274C906 352 1064 378 1200 346" stroke="rgba(249, 115, 22, 0.18)" stroke-width="2" stroke-linecap="round" />
  </g>

  <g transform="translate(78 82)">
    <rect width="212" height="42" rx="21" fill="rgba(8, 14, 24, 0.82)" stroke="rgba(20, 184, 166, 0.28)" />
    <circle cx="28" cy="21" r="7" fill="#14b8a6" />
    <text x="48" y="27" fill="#d6fbf6" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="17">LIVE SNAPSHOT / ${escapeXml(snapshot.generatedAtPrague)}</text>
  </g>

  <text x="78" y="208" fill="#f8fafc" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="88" font-weight="700">${escapeXml(snapshot.displayName)}</text>
  <text x="80" y="264" fill="#41dbc8" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="29">@${escapeXml(snapshot.username)}</text>
  <text x="78" y="324" fill="#d2deef" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="30">Device tooling, jailbreak-adjacent exploration, NixOS ops, and live control surfaces.</text>

  <g transform="translate(78 520)">
    <rect width="1124" height="76" rx="22" fill="#08111d" stroke="rgba(148, 163, 184, 0.14)" />
    <text x="34" y="31" fill="#7dd3fc" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="15">CONTACT</text>
    <text x="34" y="58" fill="#eff6ff" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="24">${escapeXml(snapshot.contactEmail)}</text>
    <text x="418" y="31" fill="#7dd3fc" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="15">CONTROL ROOM</text>
    <text x="418" y="58" fill="#eff6ff" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="24">${escapeXml(snapshot.siteUrl)}</text>
    <text x="922" y="31" fill="#7dd3fc" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="15">LAST EVENT</text>
    <text x="922" y="58" fill="#eff6ff" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="24">${escapeXml(snapshot.lastEventAt)}</text>
  </g>

  ${tags}

  <g transform="translate(916 394)">
    <rect width="240" height="110" rx="28" fill="#07101c" stroke="rgba(249, 115, 22, 0.22)" />
    <text x="26" y="34" fill="#fdba74" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="15">MESH STATUS</text>
    <text x="26" y="68" fill="#fff7ed" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="34" font-weight="700">${snapshot.events.length} active signal(s)</text>
    <text x="26" y="92" fill="#d6deea" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="18">Hourly README refresh plus browser-live clock</text>
  </g>
</svg>
`;
}

function buildLiveBoardSvg(snapshot) {
  const cards = [
    ["Control room", "Three.js ready"],
    ["Contact", snapshot.contactEmail],
    ["Member since", snapshot.memberSince],
    ["Public repos", String(snapshot.publicRepos)],
    ["Last repo touch", snapshot.repoUpdatedAtDisplay],
    ["Last signal", snapshot.lastEventAt],
  ];

  const counts = [
    ["push", snapshot.eventCounts.push],
    ["pr", snapshot.eventCounts.pr],
    ["issue", snapshot.eventCounts.issue],
    ["star", snapshot.eventCounts.star],
    ["create", snapshot.eventCounts.create],
    ["other", snapshot.eventCounts.event],
  ];

  const cardMarkup = cards
    .map(([label, value], index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = 58 + col * 388;
      const y = 186 + row * 126;

      return `
        <g transform="translate(${x} ${y})">
          <rect width="352" height="94" rx="22" fill="#09111d" stroke="rgba(148, 163, 184, 0.15)" />
          <text x="24" y="32" fill="#8ab8d4" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="14">${escapeXml(label)}</text>
          <text x="24" y="66" fill="#f8fafc" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">${escapeXml(value)}</text>
        </g>
      `;
    })
    .join("");

  const countMarkup = counts
    .map(([label, count], index) => {
      const barWidth = 28 + count * 34;
      const y = 462 - index * 46;
      const colors = ["#14b8a6", "#a3e635", "#38bdf8", "#facc15", "#f97316", "#94a3b8"];

      return `
        <g transform="translate(780 ${y})">
          <text x="0" y="16" fill="#a9bed2" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="13">${escapeXml(label.toUpperCase())}</text>
          <rect x="92" y="2" width="250" height="18" rx="9" fill="rgba(148, 163, 184, 0.10)" />
          <rect x="92" y="2" width="${barWidth}" height="18" rx="9" fill="${colors[index]}" />
          <text x="356" y="16" fill="#eff6ff" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="13">${count}</text>
        </g>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="540" viewBox="0 0 1280 540" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Live board</title>
  <desc id="desc">Signal board with current snapshot data and event mix.</desc>
  <defs>
    <linearGradient id="boardBg" x1="0" y1="0" x2="1280" y2="540" gradientUnits="userSpaceOnUse">
      <stop stop-color="#040816" />
      <stop offset="1" stop-color="#111b2d" />
    </linearGradient>
  </defs>
  <rect width="1280" height="540" rx="32" fill="url(#boardBg)" />
  <rect x="34" y="34" width="1212" height="472" rx="28" stroke="rgba(56, 189, 248, 0.18)" />
  <text x="58" y="84" fill="#f8fafc" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="38" font-weight="700">Signal Board</text>
  <text x="58" y="116" fill="#bed1e4" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="19">README snapshot plus a linked browser-live control room.</text>
  <text x="956" y="84" fill="#74f0df" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="16">SYNC ${escapeXml(snapshot.generatedAtPrague)}</text>

  <g transform="translate(58 138)">
    <rect width="668" height="28" rx="14" fill="rgba(148, 163, 184, 0.10)" />
    <rect width="356" height="28" rx="14" fill="#14b8a6" />
    <text x="18" y="19" fill="#04131a" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="13">CONTROL ROOM ONLINE / DATA SNAPSHOT READY</text>
  </g>

  ${cardMarkup}

  <g transform="translate(780 188)">
    <rect width="418" height="244" rx="26" fill="#08111d" stroke="rgba(249, 115, 22, 0.18)" />
    <text x="28" y="40" fill="#fdba74" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="15">EVENT MIX</text>
    <text x="28" y="72" fill="#fff7ed" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">${snapshot.events.length} recent public signal(s)</text>
    ${countMarkup}
  </g>
</svg>
`;
}

function buildFlowSvg(snapshot) {
  const stepY = 168;
  const steps = [
    { x: 64, label: "GitHub APIs", value: "profile + events" },
    { x: 318, label: "refresh-profile", value: "hourly sync" },
    { x: 572, label: "JSON snapshot", value: "assets + site/data" },
    { x: 826, label: "README panels", value: "hero / board / stream" },
    { x: 1080, label: "Three.js room", value: "browser-live mesh" },
  ];

  const stepMarkup = steps
    .map((step, index) => {
      const accent = ["#14b8a6", "#38bdf8", "#f97316", "#a3e635", "#facc15"][index];
      return `
        <g transform="translate(${step.x} ${stepY})">
          <rect width="158" height="110" rx="24" fill="#09101c" stroke="${accent}" stroke-opacity="0.38" />
          <text x="20" y="40" fill="${accent}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="14">${escapeXml(step.label)}</text>
          <text x="20" y="74" fill="#f8fafc" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="23" font-weight="700">${escapeXml(step.value)}</text>
        </g>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="420" viewBox="0 0 1280 420" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Live data flow</title>
  <desc id="desc">Pipeline from GitHub data through generated README assets into the live Three.js control room.</desc>
  <rect width="1280" height="420" rx="32" fill="#050814" />
  <rect x="38" y="34" width="1204" height="352" rx="28" stroke="rgba(56, 189, 248, 0.16)" />
  <text x="64" y="84" fill="#f8fafc" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="38" font-weight="700">Live Data Flow</text>
  <text x="64" y="116" fill="#c5d5e5" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="18">GitHub README stays image-based; the browser-interactive layer lives in the control room.</text>
  <text x="902" y="84" fill="#74f0df" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="16">LAST SYNC ${escapeXml(snapshot.generatedAtPrague)}</text>
  <text x="902" y="112" fill="#fdd5b4" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="16">MAIL ${escapeXml(snapshot.contactEmail)}</text>

  <path d="M222 223H318" stroke="#14b8a6" stroke-width="4" stroke-linecap="round" />
  <path d="M476 223H572" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
  <path d="M730 223H826" stroke="#f97316" stroke-width="4" stroke-linecap="round" />
  <path d="M984 223H1080" stroke="#a3e635" stroke-width="4" stroke-linecap="round" />

  <circle cx="270" cy="223" r="7" fill="#14b8a6" />
  <circle cx="524" cy="223" r="7" fill="#38bdf8" />
  <circle cx="778" cy="223" r="7" fill="#f97316" />
  <circle cx="1032" cy="223" r="7" fill="#a3e635" />

  ${stepMarkup}

  <g transform="translate(64 316)">
    <rect width="1152" height="38" rx="19" fill="#09101c" stroke="rgba(148, 163, 184, 0.14)" />
    <text x="20" y="24" fill="#dbe8f4" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="14">README snapshot refreshes hourly. The control room adds a browser-live Prague clock, interactive camera motion, and client-side telemetry rendering.</text>
  </g>
</svg>
`;
}

function buildEventStreamSvg(snapshot) {
  const rows = snapshot.events.length
    ? snapshot.events
        .map((event, index) => {
          const y = 104 + index * 92;
          return `
            <g transform="translate(56 ${y})">
              <rect width="1168" height="72" rx="20" fill="#09111d" stroke="rgba(148, 163, 184, 0.12)" />
              <circle cx="36" cy="36" r="8" fill="${event.accent}" />
              <text x="64" y="30" fill="#f8fafc" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="24" font-weight="700">${escapeXml(event.summary)}</text>
              <text x="64" y="54" fill="#c9d7e6" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="17">${escapeXml(event.detail)}</text>
              <text x="1050" y="43" text-anchor="end" fill="#87f4e5" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="14">${escapeXml(event.absolute)}</text>
            </g>
          `;
        })
        .join("")
    : `
        <g transform="translate(56 136)">
          <rect width="1168" height="118" rx="20" fill="#09111d" stroke="rgba(148, 163, 184, 0.12)" />
          <text x="40" y="64" fill="#f8fafc" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">No recent public events yet</text>
          <text x="40" y="92" fill="#c9d7e6" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="18">The control room still renders live from the latest snapshot and browser clock.</text>
        </g>
      `;

  const height = Math.max(340, 130 + snapshot.events.length * 92);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="${height}" viewBox="0 0 1280 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Recent event stream</title>
  <desc id="desc">Recent public GitHub activity for iPwn666.</desc>
  <rect width="1280" height="${height}" rx="32" fill="#050814" />
  <text x="56" y="70" fill="#f8fafc" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="34" font-weight="700">Recent Event Stream</text>
  <text x="1188" y="70" text-anchor="end" fill="#9eb2c7" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="15">${escapeXml(snapshot.generatedAtPrague)}</text>
  ${rows}
</svg>
`;
}

function createSnapshot(user, repo, events) {
  const generatedAt = new Date().toISOString();
  const summarizedEvents = Array.isArray(events) ? events.slice(0, 8).map(summarizeEvent) : [];

  return {
    username,
    displayName: user.name || username,
    company: user.company || "independent operator",
    location: user.location || "location undisclosed",
    blog: user.blog || "",
    hireable: Boolean(user.hireable),
    bio: (user.bio || "").trim(),
    contactEmail,
    siteUrl,
    publicRepos: user.public_repos || 0,
    followers: user.followers || 0,
    following: user.following || 0,
    memberSince: formatAbsolute(user.created_at),
    memberSinceShort: formatShortDate(user.created_at),
    repoUpdatedAt: repo.updated_at,
    repoUpdatedAtDisplay: formatAbsolute(repo.updated_at),
    lastEventAt: summarizedEvents[0]?.absolute || "no public events",
    generatedAt,
    generatedAtPrague: formatAbsolute(generatedAt),
    focusTracks: [
      "device tooling",
      "iOS internals",
      "NixOS ops",
      "native AI loops",
    ],
    eventCounts: countEventKinds(summarizedEvents),
    events: summarizedEvents,
  };
}

async function main() {
  const [user, repo, events] = await Promise.all([
    fetchJson(`users/${username}`),
    fetchJson(`repos/${username}/${username}`),
    fetchJson(`users/${username}/events/public?per_page=8`),
  ]);

  const snapshot = createSnapshot(user, repo, events);

  await Promise.all([
    mkdir(assetsDir, { recursive: true }),
    mkdir(siteDataDir, { recursive: true }),
  ]);

  const liveData = `${JSON.stringify(snapshot, null, 2)}\n`;

  await Promise.all([
    writeFile(path.join(assetsDir, "live-data.json"), liveData, "utf8"),
    writeFile(path.join(siteDataDir, "live-data.json"), liveData, "utf8"),
    writeFile(path.join(assetsDir, "hero.svg"), buildHeroSvg(snapshot), "utf8"),
    writeFile(path.join(assetsDir, "live-board.svg"), buildLiveBoardSvg(snapshot), "utf8"),
    writeFile(path.join(assetsDir, "live-flow.svg"), buildFlowSvg(snapshot), "utf8"),
    writeFile(path.join(assetsDir, "event-stream.svg"), buildEventStreamSvg(snapshot), "utf8"),
  ]);

  console.log(`Generated profile assets for ${username}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
