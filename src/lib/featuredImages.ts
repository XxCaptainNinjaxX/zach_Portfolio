import { featuredImages, type FeaturedImage } from "@/components/data/data";

/**
 * Derived view over the hero's rotating images. See lib/compositions.ts for
 * the same pattern.
 *
 * Unlike getFeatured() in lib/compositions.ts, an empty result here is
 * valid — the rotator has nothing to render rather than a content bug — so
 * this never throws.
 */
export function getFeaturedImages(): FeaturedImage[] {
  return [...featuredImages];
}
