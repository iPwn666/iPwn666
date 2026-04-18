"use client";

import { Smartphone, Server, GitBranch, BarChart3, Lock, Wrench } from "lucide-react";
import { mainServices, quickServices } from "@/lib/data";

const categoryIcons = {
  "web-engineering": Smartphone,
  "cloud-devops": Server,
} as const;

const quickServiceIcons = {
  onboarding: Wrench,
  observability: BarChart3,
  hardening: Lock,
  tuneup: GitBranch,
} as const;

export function Services() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            What I Do
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Comprehensive engineering services from concept to production
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {mainServices.map((service) => {
            const Icon = categoryIcons[service.id as keyof typeof categoryIcons] || Smartphone;
            return (
              <div
                key={service.id}
                className="p-8 rounded-2xl bg-card gradient-border card-hover"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {service.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {service.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground">Quick Services</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickServices.map((service) => {
            const Icon = quickServiceIcons[service.id as keyof typeof quickServiceIcons] || Wrench;
            return (
              <div
                key={service.id}
                className="p-6 rounded-xl bg-card/50 border border-border card-hover text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-secondary/10 mb-4">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
