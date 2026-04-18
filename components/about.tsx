"use client";

import { Code2, Cloud, Shield, Brain, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Rocket,
    title: "End-to-end delivery",
    description: "Design to implementation to deployment to monitoring",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Architecture, CI/CD, automation, observability",
  },
  {
    icon: Shield,
    title: "Security-conscious",
    description: "Sensible defaults, least privilege, secure-by-design",
  },
  {
    icon: Brain,
    title: "User-centered thinking",
    description: "Healthcare background brings clear communication and empathy",
  },
];

export function About() {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            I build <span className="text-foreground font-semibold">cloud-native web apps</span> and{" "}
            <span className="text-foreground font-semibold">Progressive Web Apps (PWA)</span> that prioritize
            performance, reliability, and maintainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-card gradient-border card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-card gradient-border">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Code2 className="w-7 h-7 text-secondary" />
            Performance & Efficiency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted">
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">1.</span>
              <span>Budget JS, tree-shake deps, lazy-load heavy routes, prioritize above-the-fold CSS</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">2.</span>
              <span>Batch N+1 requests, paginate aggressively, cache at the edge, debounce UI events</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">3.</span>
              <span>Offload expensive work to workers/queues, avoid layout thrashing</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent font-bold">4.</span>
              <span>Trace slow endpoints, set SLOs, add alerts for long tasks and layout shifts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
