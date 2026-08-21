import type { MetadataRoute } from "next";
import { navItems, site } from "@/components/data/site";
import { allSlugs } from "@/lib/compositions";

/**
 * Built from the same sources the nav and catalogue read, so a new page or a new
 * composition appears here without a second edit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, priority: 1 },
    ...navItems.map((item) => ({
      url: `${site.url}${item.href}`,
      lastModified,
      priority: 0.8,
    })),
  ];

  const compositionRoutes: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${site.url}/compositions/${slug}`,
    lastModified,
    priority: 0.6,
  }));

  return [...staticRoutes, ...compositionRoutes];
}
