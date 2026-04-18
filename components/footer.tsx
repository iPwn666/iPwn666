"use client";

import { Logo } from "./logo";
import { Github, Globe, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Logo size="small" />
            <div>
              <p className="font-semibold text-foreground">{siteConfig.name}</p>
              <p className="text-sm text-muted">{siteConfig.brand}&trade;</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.social.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted hover:text-foreground transition-colors" />
            </a>
            <a
              href={siteConfig.social.website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="w-5 h-5 text-muted hover:text-foreground transition-colors" />
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-muted hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p>ICO: {siteConfig.business.ico} | {siteConfig.location.country}</p>
        </div>
      </div>
    </footer>
  );
}
