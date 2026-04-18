"use client";

import { Building2, FileText, Calendar, MapPin, Hash } from "lucide-react";
import { businessDetails, siteConfig } from "@/lib/data";

const iconMap = {
  ico: Hash,
  legal: Building2,
  established: Calendar,
  address: MapPin,
  registration: FileText,
} as const;

export function BusinessInfo() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Business Information
          </h2>
          <p className="text-lg text-muted">
            Official registration details for {siteConfig.location.country}
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-card gradient-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessDetails.map((detail) => {
              const Icon = iconMap[detail.id as keyof typeof iconMap] || Hash;
              return (
                <div
                  key={detail.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background/50"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">{detail.label}</p>
                    <p className="font-semibold text-foreground">{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
            <p className="text-sm text-muted">
              <span className="font-semibold text-secondary">Note:</span> Registered as a freelance professional in the Czech Trade Register (Živnostenský rejstřík). All services are provided under Czech business regulations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
