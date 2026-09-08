import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export to out/ — the host serves files over FTP, there is no Node runtime.
  output: "export",

  // Site is served from a subfolder, not the domain root. next/link, next/image,
  // and router.push all prefix this automatically.
  // ⚠️ This path is duplicated in three other places that cannot import it:
  // image-loader.ts, public/.htaccess, and `site.url` in
  // src/components/data/site.ts. Changing it here means changing all four.
  basePath: "/projects/zach",

  // The image optimizer is a server route; a static export has no server to run it.
  // `unoptimized: true` would serve originals but skips the loader that applies
  // basePath, so images would 404 in the subfolder. The custom loader does both.
  images: { loader: "custom", loaderFile: "./image-loader.ts" },

  // Emits about/index.html rather than about.html, which any plain file server
  // resolves without rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
