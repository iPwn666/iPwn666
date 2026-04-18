"use client";

const technologies = [
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
];

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
            <span className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-mono text-sm">
              PWA-first
            </span>
            <span className="px-4 py-2 rounded-lg bg-secondary/10 text-secondary font-mono text-sm">
              Cloud-native
            </span>
            <span className="px-4 py-2 rounded-lg bg-accent/10 text-accent font-mono text-sm">
              Security by default
            </span>
            <span className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-mono text-sm">
              Remote-friendly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
