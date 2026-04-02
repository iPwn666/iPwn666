<p align="center">
  <img src="./assets/hero.svg" alt="iPwn666 hero panel" width="100%" />
</p>

<p align="center">
  <a href="https://topwnz.com">
    <img src="https://img.shields.io/badge/site-topwnz.com-14b8a6?style=for-the-badge&labelColor=111827" alt="Website" />
  </a>
  <a href="mailto:FandaKalasek@icloud.com">
    <img src="https://img.shields.io/badge/mail-FandaKalasek@icloud.com-f97316?style=for-the-badge&labelColor=111827" alt="Email" />
  </a>
  <a href="https://ipwn666.github.io/iPwn666/">
    <img src="https://img.shields.io/badge/live-control%20room-38bdf8?style=for-the-badge&labelColor=111827" alt="Live control room" />
  </a>
  <a href="https://github.com/iPwn666/iPwn666/actions/workflows/refresh-profile.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/iPwn666/iPwn666/refresh-profile.yml?branch=main&style=for-the-badge&label=profile%20refresh&labelColor=111827&color=0f766e" alt="Profile refresh" />
  </a>
</p>

<p align="center">
  <a href="#signal-board">Signal Board</a> /
  <a href="#build-lanes">Build Lanes</a> /
  <a href="#live-data-flow">Live Data Flow</a> /
  <a href="#live-control-room">Live Control Room</a> /
  <a href="#event-stream">Event Stream</a> /
  <a href="#working-interface">Working Interface</a>
</p>

<p align="center">
  <code>device tooling</code>
  <code>iOS internals</code>
  <code>NixOS ops</code>
  <code>native automation</code>
  <code>AI-assisted workflows</code>
</p>

## Signal Board

I build things that sit close to the machine: device tooling, operational automation, native experiments, and feedback-heavy interfaces. The profile below is no longer a static intro card; it now carries a small live telemetry layer sourced from the GitHub API and refreshed by Actions.

<p align="center">
  <img src="./assets/live-board.svg" alt="Live signal board for iPwn666" width="100%" />
</p>

## Build Lanes

| Lane | What that means in practice |
| --- | --- |
| Device tooling | Scripts, helpers, and operator-grade flows that remove repetitive manual steps. |
| iOS internals | Reverse-engineering-adjacent exploration, jailbreak ecosystem curiosity, and native debugging workflows. |
| NixOS ops | Reproducible workstation setup, system automation, timers, audits, and controlled rollout habits. |
| Native AI loops | Fast experiments where local tooling, LLMs, and UI feedback stay tightly connected. |

## Live Data Flow

<p align="center">
  <a href="https://ipwn666.github.io/iPwn666/">
    <img src="./assets/live-flow.svg" alt="Live data flow from GitHub APIs into the README and control room" width="100%" />
  </a>
</p>

The generated snapshot that drives the panels above lives in [assets/live-data.json](./assets/live-data.json). The README layer stays image-based, while the linked control room adds a browser-live Prague clock, camera motion, and a Three.js scene fed by the same snapshot data.

## Live Control Room

The profile README itself cannot execute inline JavaScript or Three.js, so the heavy interactive layer lives here instead:

- [Open the live control room](https://ipwn666.github.io/iPwn666/)
- [Source snapshot for the control room](./site/data/live-data.json)
- [Primary contact](mailto:FandaKalasek@icloud.com)

## Event Stream

<p align="center">
  <img src="./assets/event-stream.svg" alt="Recent public GitHub event stream" width="100%" />
</p>

## Working Interface

<details open>
  <summary><strong>How I prefer to build</strong></summary>

  <br />

  - Short loops beat heroic rewrites.
  - Instrumentation comes before guesswork.
  - Good tooling should remove friction, not just move it around.
  - I like interfaces that feel alive: status, motion, progress, and meaningful signal density.
</details>

<details>
  <summary><strong>Stack I reach for</strong></summary>

  <br />

  | Surface | Tools |
  | --- | --- |
  | Frontend | `React`, `Next.js`, `TypeScript`, `Expo`, `Tailwind CSS` |
  | Native and systems | `Swift`, `Objective-C`, `Bash`, `Nix`, `Node.js` |
  | Infra and delivery | `Docker`, `GitHub Actions`, `PostgreSQL`, `Redis`, `AWS` |
  | Observability | logs, dashboards, tiny control panels, and scripts that tell the truth fast |
</details>

<details>
  <summary><strong>What changed in this repo</strong></summary>

  <br />

  - Replaced the generic README with a profile that better matches the actual work.
  - Added generated SVG panels with live GitHub-derived telemetry and a real timestamped data-flow panel.
  - Added a Three.js-powered control room published through GitHub Pages.
  - Added an hourly GitHub Actions refresh loop so the snapshot keeps moving without manual edits.
</details>

## GitHub Pulse

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=iPwn666&show_icons=true&hide_border=true&bg_color=00000000&title_color=0f766e&icon_color=f97316&text_color=334155&ring_color=0f766e" height="180" alt="GitHub stats" />
</p>

<p align="center">
  <a href="https://topwnz.com"><strong>topwnz.com</strong></a>
  /
  <a href="mailto:FandaKalasek@icloud.com"><strong>mail</strong></a>
  /
  <a href="https://ipwn666.github.io/iPwn666/"><strong>control room</strong></a>
  /
  <a href="https://github.com/iPwn666"><strong>github</strong></a>
</p>

<p align="center">
  <sub>Profile assets are generated from live GitHub data, committed back into the repo, and mirrored into a browser-interactive control room.</sub>
</p>
