"use client";

import { Code2, Cloud, Shield, Brain, Rocket } from "lucide-react";
import { highlights, performancePrinciples, siteConfig } from "@/lib/data";

const iconMap = {
  delivery: Rocket,
  cloud: Cloud,
  security: Shield,
  "user-centered": Brain,
} as const;

export function About() {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            I build <span className="text-foreground font-semibold">{siteConfig.professional.specializations[0]}</span> and{" "}
            <span className="text-foreground font-semibold">{siteConfig.professional.specializations[1]}</span> that prioritize
            performance, reliability, and maintainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] || Rocket;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-card gradient-border card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-card gradient-border">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Code2 className="w-7 h-7 text-secondary" />
            Performance & Efficiency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted">
            {performancePrinciples.map((principle, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-accent font-bold">{index + 1}.</span>
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
