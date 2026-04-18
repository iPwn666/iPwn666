"use client";

import { Mail, Phone, MapPin, Github, Globe, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Contact() {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted">
            {`If you're hiring or want to collaborate, let's talk`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-4 p-6 rounded-2xl bg-card gradient-border card-hover group"
            >
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Primary Email</p>
                <p className="font-semibold text-foreground">{siteConfig.contact.email}</p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-4 p-6 rounded-2xl bg-card gradient-border card-hover group"
            >
              <div className="p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Phone</p>
                <p className="font-semibold text-foreground">{siteConfig.contact.phone}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border">
              <div className="p-3 rounded-xl bg-accent/10">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Location</p>
                <p className="font-semibold text-foreground">{siteConfig.location.displayShort}</p>
                <p className="text-sm text-muted">{siteConfig.location.languages.join(" / ")}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <a
              href={siteConfig.social.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border card-hover group"
            >
              <Github className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
              <div>
                <p className="font-semibold text-foreground">GitHub</p>
                <p className="text-sm text-muted">@{siteConfig.social.github.username}</p>
              </div>
            </a>

            <a
              href={siteConfig.social.website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border card-hover group"
            >
              <Globe className="w-8 h-8 text-foreground group-hover:text-secondary transition-colors" />
              <div>
                <p className="font-semibold text-foreground">Portfolio</p>
                <p className="text-sm text-muted">{siteConfig.social.website.name}</p>
              </div>
            </a>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <p className="font-semibold text-foreground">How I Work</p>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                {siteConfig.professional.workStyle.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
