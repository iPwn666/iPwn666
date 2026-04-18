"use client";

import { siteConfig } from "@/lib/data";

export function Logo({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { width: 60, height: 60, fontSize: "text-xl" },
    default: { width: 120, height: 120, fontSize: "text-3xl" },
    large: { width: 180, height: 180, fontSize: "text-5xl" },
  };

  const { width, height } = sizes[size];

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-float"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c026d3" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        {/* F letter - stylized script */}
        <path
          d="M40 160 Q50 80 80 50 Q100 35 110 45 Q115 50 105 60 Q90 75 85 100 Q82 115 90 115 L120 115 Q130 115 125 125 Q120 135 110 135 L85 135 Q80 135 78 150 Q76 165 70 170 Q60 180 50 175 Q40 170 40 160"
          fill="url(#logoGradient)"
        />
        {/* K letter - stylized script */}
        <path
          d="M100 160 Q105 80 115 50 Q120 40 130 45 Q140 50 135 65 Q130 85 128 110 L160 70 Q170 55 180 60 Q190 68 180 80 L150 115 L185 155 Q195 170 180 175 Q168 178 160 165 L130 125 Q125 140 120 155 Q115 170 105 170 Q95 168 100 160"
          fill="url(#logoGradient)"
        />
      </svg>
    </div>
  );
}

export function LogoWithText({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <Logo size="large" />
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.3em] text-foreground uppercase">
          {siteConfig.name.replace(" ", " ")}
        </h1>
        <p className="text-lg md:text-xl text-muted mt-2 tracking-widest">
          {siteConfig.brand}&trade;
        </p>
      </div>
    </div>
  );
}
