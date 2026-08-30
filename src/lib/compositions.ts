import {
  compositions,
  compositionTypeLabels,
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
 * the page. It is the only order in the catalogue: `year` is free text holding
 * ranges like "2021-2023", so there is nothing to sort on, and works are placed
 * by hand rather than flung around by a date. Copied so callers can't mutate
 * the store.
 */
export function catalogueOrder(): Composition[] {
  return [...compositions];
}

/**
 * Carousel order: the rest of the featured works in catalogue order, split so
 * the landing composition sits at the centre of the track without duplicating it.
 *
 * Membership is `featured`, separate from `landingComp` — `landingComp` only
 * decides which single work is the landing-page hero (getLandingComp() above
 * still throws unless exactly one is flagged), while `featured` decides who
 * else rides along with it in the carousel.
 */
export function carouselOrder(): Composition[] {
  const landingComp = getLandingComp();
  const rest = catalogueOrder().filter(
    (composition) =>
      composition.featured && composition.slug !== landingComp.slug,
  );

  // Split the remainder around the landing composition so it sits mid-track.
  const half = Math.floor(rest.length / 2);
  return [...rest.slice(0, half), landingComp, ...rest.slice(half)];
}

/**
 * Every declared type, in the order written in data.ts. Derived from the label
 * map rather than a second list, so a new type reaches the filter row without
 * an edit here. Object.keys widens to string[]; the keys are statically known,
 * so the cast is safe.
 */
export const compositionTypeOrder = Object.keys(
  compositionTypeLabels,
) as CompositionType[];

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

  const others = catalogueOrder().filter(
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

/** Catalogue filtered to a single type, in catalogue order. */
export function byType(family: CompositionType): Composition[] {
  return catalogueOrder().filter((composition) => composition.type === family);
}
