"use client";

import { technologies, siteConfig } from "@/lib/data";

export function TechStack() {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Toolbox
          </h2>
          <p className="text-lg text-muted">
            Technologies I work with daily
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="px-6 py-3 rounded-full bg-card border border-border card-hover flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              <span className="font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4 p-4 rounded-2xl bg-card/50 border border-border">
            {siteConfig.professional.badges.map((badge, index) => {
              const colors = [
                "bg-primary/10 text-primary",
                "bg-secondary/10 text-secondary",
                "bg-accent/10 text-accent",
                "bg-primary/10 text-primary",
              ];
              return (
                <span
                  key={badge}
                  className={`px-4 py-2 rounded-lg font-mono text-sm ${colors[index % colors.length]}`}
                >
                  {badge}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
