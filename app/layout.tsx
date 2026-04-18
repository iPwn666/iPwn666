import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frantisek Kalasek | TopBot PwnZ - Full-Stack Engineer",
  description: "Full-stack engineer specializing in cloud-native web apps, PWAs, and DevOps. Bridge the gap, create the world.",
  keywords: ["Full-stack", "Developer", "PWA", "Cloud", "DevOps", "TypeScript", "React", "Next.js"],
  authors: [{ name: "Frantisek Kalasek" }],
  openGraph: {
    title: "Frantisek Kalasek | TopBot PwnZ",
    description: "Full-stack engineer specializing in cloud-native web apps, PWAs, and DevOps.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frantisek Kalasek | TopBot PwnZ",
    description: "Full-stack engineer specializing in cloud-native web apps, PWAs, and DevOps.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
