import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export to out/ — Cloudflare Pages serves it as plain files, there is no Node runtime.
  output: "export",

  // The image optimizer is a server route; a static export has no server to run it,
  // so originals are served as-is.
  images: { unoptimized: true },

  // Emits about/index.html rather than about.html, which any plain file server
  // resolves without rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
