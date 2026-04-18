"use client";

import { Logo } from "./logo";
import { Github, Globe, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Logo size="small" />
            <div>
              <p className="font-semibold text-foreground">Frantisek Kalasek</p>
              <p className="text-sm text-muted">TopBot PwnZ&trade;</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/iPwn666"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted hover:text-foreground transition-colors" />
            </a>
            <a
              href="https://topwnz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="w-5 h-5 text-muted hover:text-foreground transition-colors" />
            </a>
            <a
              href="mailto:FandaKalasek@icloud.com"
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-muted hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>&copy; {currentYear} Frantisek Kalasek. All rights reserved.</p>
          <p>ICO: 23628588 | Czech Republic</p>
        </div>
      </div>
    </footer>
  );
}
