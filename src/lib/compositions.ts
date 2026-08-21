import {
  compositions,
  type Composition,
  type Instrumentation,
} from "@/components/data/data";

/**
 * Derived views over the catalogue. Nothing else should sort, filter, or search
 * `compositions` directly — the raw array is the store, these are the reads.
 */

/**
 * The landing page hero.
 *
 * Throws rather than returning undefined: the featured work is a flag on the
 * catalogue, not a second list, so zero or two matches is a content bug that
 * should fail the build loudly instead of rendering an empty hero.
 */
export function getFeatured(): Composition {
  const flagged = compositions.filter((composition) => composition.featured);

  if (flagged.length !== 1) {
    throw new Error(
      `Expected exactly one composition with \`featured: true\`, found ${flagged.length}. ` +
        `Fix src/content/compositions.ts.`,
    );
  }

  return flagged[0];
}

/** Newest first, ties broken alphabetically so the order is stable across builds. */
export function byYearDesc(): Composition[] {
  return [...compositions].sort((first, second) => {
    if (first.year !== second.year) return second.year - first.year;
    return first.title.localeCompare(second.title);
  });
}

/**
 * Carousel order: featured work first, then the rest newest-first. Puts the
 * highlighted work at the centre of the track without duplicating it.
 */
export function carouselOrder(): Composition[] {
  const featured = getFeatured();
  const rest = byYearDesc().filter(
    (composition) => composition.slug !== featured.slug,
  );

  // Split the remainder around the featured work so it sits mid-track.
  const half = Math.floor(rest.length / 2);
  return [...rest.slice(0, half), featured, ...rest.slice(half)];
}

/** Only the instrumentations actually present in the catalogue, in catalogue order. */
export function usedInstrumentations(): Instrumentation[] {
  const seen = new Set<Instrumentation>();
  for (const composition of byYearDesc()) {
    seen.add(composition.instrumentation);
  }
  return [...seen];
}

export function getBySlug(slug: string): Composition | undefined {
  return compositions.find((composition) => composition.slug === slug);
}

/**
 * Up to `limit` other works, preferring the same instrumentation before falling
 * back to the rest of the catalogue so the strip is never short.
 */
export function getRelated(slug: string, limit = 3): Composition[] {
  const current = getBySlug(slug);
  if (!current) return [];

  const others = byYearDesc().filter(
    (composition) => composition.slug !== slug,
  );
  const sameFamily = others.filter(
    (composition) => composition.instrumentation === current.instrumentation,
  );
  const otherFamilies = others.filter(
    (composition) => composition.instrumentation !== current.instrumentation,
  );

  return [...sameFamily, ...otherFamilies].slice(0, limit);
}

export const allSlugs: string[] = compositions.map(
  (composition) => composition.slug,
);

/** Catalogue filtered to a single instrumentation, newest-first. */
export function byInstrumentation(family: Instrumentation): Composition[] {
  return byYearDesc().filter(
    (composition) => composition.instrumentation === family,
  );
}
