import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { PageFrame } from "@/components/PageFrame/PageFrame";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { ThemeScript } from "@/components/ThemeScript/ThemeScript";
import { site } from "@/components/data/site";
import styles from "@/app/layout.module.css";
import "./globals.css";

/**
 * ⚠️ VERIFY: placeholder typefaces. Cormorant Garamond stands in for the
 * mockup's wide-tracked display face and Inter for UI text. Both are
 * self-hosted at build time by next/font — no runtime request to Google.
 * Swap here if a licensed brand face is supplied.
 */
const displayFont = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute URLs for OG tags and the sitemap are resolved against this.
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  // One entry per scheme so mobile browser chrome matches whichever theme is active.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1a3a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      // Dark is baked into the prerendered HTML; ThemeScript corrects it during
      // parsing for visitors who chose light. suppressHydrationWarning is
      // required — see ThemeScript for why.
      data-theme="dark"
      suppressHydrationWarning
      // Next 16 no longer overrides scroll-behavior during navigation. This
      // attribute restores the instant jump on route change while leaving
      // in-page anchor scrolling smooth.
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable} ${styles.html}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className={`surface-glow ${styles.body}`}>
        <PageFrame />

        <a href="#main" className={`sr-only ${styles.skipLink}`}>
          Skip to content
        </a>

        {/*
          No top padding: SiteHeader supplies its own, so it can stick at the
          true viewport top without leaving a strip for scrolled content to show
          through above it.
        */}
        <div className={styles.content}>
          <SiteHeader />
          <main id="main" className={styles.main}>
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
