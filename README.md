<!-- Profile README — Recruiter/Client mode -->

<h1 align="center">František Kalášek</h1>

<p align="center">
  Full‑stack engineer • Cloud/DevOps • PWA
</p>

<p align="center">
  <a href="https://topwnz.com"><b>Portfolio</b></a> •
  <a href="mailto:FandaKalasek@icloud.com"><b>Email</b></a> •
  <a href="https://github.com/iPwn666?tab=repositories"><b>Repositories</b></a>
</p>

<p align="center">
  <code>PWA-first</code> <code>Cloud-native</code> <code>Security by default</code> <code>Remote-friendly</code>
</p>

<p align="center">
  Czech Republic • Czech (native) • English (C1)
</p>

---

## Snapshot

I build **cloud‑native web apps** and **Progressive Web Apps (PWA)** that prioritize **performance, reliability, and maintainability**.

**What you can expect from me**
- ⚙️ **End‑to‑end delivery**: design → implementation → deployment → monitoring
- ☁️ **Cloud & DevOps**: architecture, CI/CD, automation, observability
- 🔒 **Security‑conscious**: sensible defaults, least privilege, secure-by-design mindset
- 🧠 **User‑centered thinking** from a healthcare background (clear communication, empathy, quality)

## Performance & Efficiency Wins

- Trim ship cost: budget JS, tree-shake deps, lazy-load heavy routes, and prioritize above-the-fold CSS.
- Kill noisy calls: batch N+1 requests, paginate aggressively, cache at the edge, and debounce UI events.
- Keep the main thread free: offload expensive work to workers/queues and avoid layout thrashing.
- Watch and react: trace slow endpoints, set SLOs, and add alerts for long tasks and layout shifts.

<details>
  <summary><b>Quick debugging checklist for slow code</b></summary>

- Profile where time goes (CPU + waterfall), then fix the top 2 offenders before touching anything else.
- Simplify data flow: prefer streams over large payloads, cap retries, and validate caching headers.
- Reduce re-renders: memoize inputs, flatten prop drilling, and keep components pure where possible.
</details>

---

## What I do

<table>
  <tr>
    <td>

### Product & Web Engineering
- **PWA / Web apps** (offline-first, push, app-shell patterns)
- **Full‑stack development** (APIs, auth, data modeling, integrations)
- **UI engineering** (clean UX, accessible UI, performance budgets)

  </td>
    <td>

### Cloud & DevOps
- **Cloud architecture** (AWS / Azure / GCP), Kubernetes & containerized workloads
- **Infrastructure as Code** (Terraform), repeatable environments
- **CI/CD pipelines**, automated testing & deployments
- **Monitoring & optimization** (reliability, performance, cost awareness)

  </td>
  </tr>
</table>

---

## Selected work

- 🌐 **Portfolio / case studies:** https://topwnz.com

If you want this section to shine on GitHub, the fastest win is to **pin 3–5 repositories** (public) that represent your best work and add them here as “Featured Projects”.

**Template (copy/paste and fill):**
- **Project Name** — one‑line outcome (e.g., “reduced load time by 40%”)
  - Stack: Next.js • TS • Postgres • Docker
  - Role: Solo / Lead / Contributor
  - Links: Demo • Repo • Short write‑up

---

## Toolbox

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" />
  <img alt="React" src="https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-3C873A?logo=nodedotjs&logoColor=fff" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=fff" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-0db7ed?logo=docker&logoColor=fff" />
  <img alt="Kubernetes" src="https://img.shields.io/badge/Kubernetes-326ce5?logo=kubernetes&logoColor=fff" />
  <img alt="Terraform" src="https://img.shields.io/badge/Terraform-623CE4?logo=terraform&logoColor=fff" />
</p>

---

## How I work

- ✅ Clear scope, written assumptions, and transparent tradeoffs
- ✅ Frequent progress updates (short demos > long meetings)
- ✅ Clean code, docs where it matters, and maintainable delivery
- ✅ Pragmatic engineering: build what moves the needle, then harden it

---

<details>
  <summary><b>Open this for a one-minute service menu</b></summary>

- Onboarding sprint: ship a thin slice in week one, with perf budgets baked in.
- Observability drop-in: dashboards + alerts for latency, errors, cold starts, and bundle size drift.
- Frontend hardening: accessibility sweep, UX polish, and render performance fixes.
- Cloud tune-up: IaC review, least-privilege updates, and CI/CD speed-ups.
</details>

---

## Contact

If you’re hiring or want to collaborate, email is best:

- 📩 **Email:** FandaKalasek@icloud.com  
- 🌐 **Portfolio:** https://topwnz.com

---

<details>
  <summary><b>GitHub stats</b></summary>

  <p>
    <img alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=iPwn666&show_icons=true&cache_seconds=86400" />
    <br />
    <img alt="Top Languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=iPwn666&layout=compact&cache_seconds=86400" />
  </p>
</details>

---

## Mini-game: README Runner (tap to jump)

Click or tap inside the track to make the dino jump the cactus. Works in browsers that support inline SVG animations (Chrome, Edge, Firefox).

<svg id="runner-game" viewBox="0 0 600 140" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mini dino runner game">
  <rect width="600" height="140" fill="#0f172a" />
  <rect y="110" width="600" height="4" fill="#38bdf8" />
  <text x="20" y="30" fill="#e2e8f0" font-family="monospace" font-size="14">Click/tap to jump ▸ beat the cactus</text>
  <rect id="runner" x="70" y="70" width="28" height="32" rx="4" fill="#a3e635">
    <animate attributeName="y" dur="0.6s" begin="runner-game.click" restart="always" keyTimes="0;0.35;0.7;1" values="70;18;70;70" calcMode="spline" keySplines="0.33 0.0 0.67 1;0.33 0.0 0.67 1;0 0 1 1" />
  </rect>
  <rect x="96" y="82" width="8" height="6" rx="1" fill="#1a2e05" />
  <rect x="104" y="78" width="6" height="6" rx="1" fill="#1a2e05" />
  <rect id="cactus" x="560" y="74" width="18" height="36" rx="2" fill="#f97316">
    <animate attributeName="x" dur="2.4s" values="560;-40" repeatCount="indefinite" />
  </rect>
  <rect x="0" y="114" width="600" height="10" fill="#e2e8f0" opacity="0.3" />
</svg>
