"use client";

import { LogoWithText } from "./logo";
import { Mail, Phone, MapPin, Github, Globe } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto text-center">
        <LogoWithText />
        
        <p className="text-xl md:text-2xl italic text-muted-foreground mt-4">
          &ldquo;{siteConfig.tagline}&rdquo;
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full gradient-border bg-card card-hover text-foreground"
          >
            <Phone className="w-5 h-5 text-primary" />
            <span>{siteConfig.contact.phone}</span>
          </a>
          
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full gradient-border bg-card card-hover text-foreground"
          >
            <Mail className="w-5 h-5 text-secondary" />
            <span>{siteConfig.contact.email}</span>
          </a>
        </div>
        
        <div className="flex items-center gap-2 text-muted">
          <MapPin className="w-5 h-5 text-accent" />
          <span>{siteConfig.location.displayFull}</span>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <a
            href={siteConfig.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card gradient-border card-hover"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6 text-foreground" />
          </a>
          <a
            href={siteConfig.social.website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card gradient-border card-hover"
            aria-label="Portfolio Website"
          >
            <Globe className="w-6 h-6 text-foreground" />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted animate-bounce">
        <span className="text-sm">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
