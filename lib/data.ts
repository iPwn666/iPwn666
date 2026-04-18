// Centralized data configuration - Single source of truth for all site data
// Update this file to synchronize data across all components

export const siteConfig = {
  // Personal Information
  name: "Frantisek Kalasek",
  nickname: "Fanda",
  brand: "TopBot PwnZ",
  tagline: "Bridge the gap, create the world.",
  
  // Contact Information
  contact: {
    email: "FandaKalasek@icloud.com",
    phone: "+420 722 426 195",
    phoneRaw: "+420722426195",
  },
  
  // Location
  location: {
    address: "Javorek 54",
    postalCode: "59203",
    city: "Javorek",
    country: "Czech Republic",
    countryCode: "CZ",
    displayShort: "Czech Republic",
    displayFull: "Javorek 54, 59203 Javorek, Czech Republic",
    languages: ["Czech (native)", "English (C1)"],
  },
  
  // Business Information (from Czech Trade Register)
  business: {
    ico: "23628588",
    legalForm: "Self-employed Individual (OSVČ)",
    established: "August 21, 2025",
    registeredAddress: "Dankovice 9, 592 03, Czech Republic",
    registration: "Ministry of Industry and Trade (MPO)",
    status: "Active",
  },
  
  // Social Links
  social: {
    github: {
      url: "https://github.com/iPwn666",
      username: "iPwn666",
    },
    website: {
      url: "https://topwnz.com",
      name: "topwnz.com",
    },
  },
  
  // Professional Info
  professional: {
    title: "Full-Stack Developer",
    specializations: [
      "Cloud-native web apps",
      "Progressive Web Apps (PWA)",
      "DevOps & CI/CD",
      "Performance optimization",
    ],
    workStyle: [
      "Clear scope, written assumptions, transparent tradeoffs",
      "Frequent progress updates (short demos > long meetings)",
      "Clean code, docs where it matters",
      "Pragmatic engineering: build what moves the needle",
    ],
    badges: ["PWA-first", "Cloud-native", "Security by default", "Remote-friendly"],
  },
} as const;

// Main Services
export const mainServices = [
  {
    id: "web-engineering",
    category: "Product & Web Engineering",
    items: [
      "PWA / Web apps (offline-first, push, app-shell patterns)",
      "Full-stack development (APIs, auth, data modeling, integrations)",
      "UI engineering (clean UX, accessible UI, performance budgets)",
    ],
  },
  {
    id: "cloud-devops",
    category: "Cloud & DevOps",
    items: [
      "Cloud architecture (AWS / Azure / GCP), Kubernetes & containerized workloads",
      "Infrastructure as Code (Terraform), repeatable environments",
      "CI/CD pipelines, automated testing & deployments",
      "Monitoring & optimization (reliability, performance, cost awareness)",
    ],
  },
] as const;

// Quick Services
export const quickServices = [
  {
    id: "onboarding",
    title: "Onboarding Sprint",
    description: "Ship a thin slice in week one, with perf budgets baked in",
  },
  {
    id: "observability",
    title: "Observability Drop-in",
    description: "Dashboards + alerts for latency, errors, cold starts, and bundle size drift",
  },
  {
    id: "hardening",
    title: "Frontend Hardening",
    description: "Accessibility sweep, UX polish, and render performance fixes",
  },
  {
    id: "tuneup",
    title: "Cloud Tune-up",
    description: "IaC review, least-privilege updates, and CI/CD speed-ups",
  },
] as const;

// Technologies with colors
export const technologies = [
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#3C873A" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#0db7ed" },
  { name: "Kubernetes", color: "#326ce5" },
  { name: "Terraform", color: "#623CE4" },
  { name: "AWS", color: "#FF9900" },
  { name: "Azure", color: "#0089D6" },
  { name: "GCP", color: "#4285F4" },
] as const;

// Highlights/About section
export const highlights = [
  {
    id: "delivery",
    title: "End-to-end delivery",
    description: "Design to implementation to deployment to monitoring",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Architecture, CI/CD, automation, observability",
  },
  {
    id: "security",
    title: "Security-conscious",
    description: "Sensible defaults, least privilege, secure-by-design",
  },
  {
    id: "user-centered",
    title: "User-centered thinking",
    description: "Healthcare background brings clear communication and empathy",
  },
] as const;

// Performance principles
export const performancePrinciples = [
  "Budget JS, tree-shake deps, lazy-load heavy routes, prioritize above-the-fold CSS",
  "Batch N+1 requests, paginate aggressively, cache at the edge, debounce UI events",
  "Offload expensive work to workers/queues, avoid layout thrashing",
  "Trace slow endpoints, set SLOs, add alerts for long tasks and layout shifts",
] as const;

// Business details for display
export const businessDetails = [
  {
    id: "ico",
    label: "ICO (Business ID)",
    value: siteConfig.business.ico,
  },
  {
    id: "legal",
    label: "Legal Form",
    value: siteConfig.business.legalForm,
  },
  {
    id: "established",
    label: "Established",
    value: siteConfig.business.established,
  },
  {
    id: "address",
    label: "Registered Address",
    value: siteConfig.business.registeredAddress,
  },
  {
    id: "registration",
    label: "Registration",
    value: siteConfig.business.registration,
  },
] as const;

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig;
export type MainService = typeof mainServices[number];
export type QuickService = typeof quickServices[number];
export type Technology = typeof technologies[number];
export type Highlight = typeof highlights[number];
export type BusinessDetail = typeof businessDetails[number];
