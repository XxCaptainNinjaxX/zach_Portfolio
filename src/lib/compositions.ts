import {
  compositions,
  type Composition,
  type CompositionType,
} from "@/components/data/data";

/**
 * Derived views over the catalogue. Nothing else should sort, filter, or search
 * `compositions` directly — the raw array is the store, these are the reads.
 */

/**
 * The landing page hero.
 *
 * Throws rather than returning undefined: the landing composition is a flag
 * on the catalogue, not a second list, so zero or two matches is a content
 * bug that should fail the build loudly instead of rendering an empty hero.
 */
export function getLandingComp(): Composition {
  const flagged = compositions.filter((composition) => composition.landingComp);

  if (flagged.length !== 1) {
    throw new Error(
      `Expected exactly one composition with \`landingComp: true\`, found ${flagged.length}. ` +
        `Fix src/components/data/data.ts.`,
    );
  }

  return flagged[0];
}

/**
 * Catalogue order: exactly the order entries are written in data.ts.
 *
 * The array order is the curated running order — reordering the file reorders
 * the page, and works with no firm year (`year: 0`) sit where they are placed
 * rather than being flung to the bottom by a year sort. Copied so callers can't
 * mutate the store.
 */
export function catalogueOrder(): Composition[] {
  return [...compositions];
}

/** Newest first, ties broken alphabetically so the order is stable across builds. */
export function byYearDesc(): Composition[] {
  return [...compositions].sort((first, second) => {
    if (first.year !== second.year) return second.year - first.year;
    return first.title.localeCompare(second.title);
  });
}

/**
 * Carousel order: the landing composition first, then the rest newest-first.
 * Puts the highlighted work at the centre of the track without duplicating it.
 *
 * Membership is `featured`, separate from `landingComp` — `landingComp` only
 * decides which single work is the landing-page hero (getLandingComp() above
 * still throws unless exactly one is flagged), while `featured` decides who
 * else rides along with it in the carousel.
 */
export function carouselOrder(): Composition[] {
  const landingComp = getLandingComp();
  const rest = byYearDesc().filter(
    (composition) =>
      composition.featured && composition.slug !== landingComp.slug,
  );

  // Split the remainder around the landing composition so it sits mid-track.
  const half = Math.floor(rest.length / 2);
  return [...rest.slice(0, half), landingComp, ...rest.slice(half)];
}

/** Only the types actually present in the catalogue, in catalogue order. */
export function usedCompositionTypes(): CompositionType[] {
  const seen = new Set<CompositionType>();
  for (const composition of catalogueOrder()) {
    seen.add(composition.type);
  }
  return [...seen];
}

export function getBySlug(slug: string): Composition | undefined {
  return compositions.find((composition) => composition.slug === slug);
}

/**
 * Up to `limit` other works, preferring the same type before falling back to the
 * rest of the catalogue so the strip is never short.
 */
export function getRelated(slug: string, limit = 3): Composition[] {
  const current = getBySlug(slug);
  if (!current) return [];

  const others = byYearDesc().filter(
    (composition) => composition.slug !== slug,
  );
  const sameFamily = others.filter(
    (composition) => composition.type === current.type,
  );
  const otherFamilies = others.filter(
    (composition) => composition.type !== current.type,
  );

  return [...sameFamily, ...otherFamilies].slice(0, limit);
}

export const allSlugs: string[] = compositions.map(
  (composition) => composition.slug,
);

const repeatedSlugs = allSlugs.filter(
  (slug, index) => allSlugs.indexOf(slug) !== index,
);

if (repeatedSlugs.length > 0) {
  throw new Error(
    `Duplicate composition slugs: ${[...new Set(repeatedSlugs)].join(", ")}. ` +
      `Every slug must be unique. Fix src/components/data/data.ts.`,
  );
}

/** Catalogue filtered to a single type, newest-first. */
export function byType(family: CompositionType): Composition[] {
  return byYearDesc().filter((composition) => composition.type === family);
}
