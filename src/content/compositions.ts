/**
 * The catalogue. Adding a composition is appending one object to `compositions`
 * — the index page, the landing carousel, /compositions/<slug>, the sitemap, and
 * the "related works" strip all read from here.
 *
 * ⚠️ VERIFY: every entry below is placeholder with invented titles and dates.
 * The shape is real; the content is not.
 */

export type Instrumentation =
  | "orchestra"
  | "chamber"
  | "choral"
  | "solo"
  | "band"
  | "film";

/** Display labels for the filter row. Keys must stay in sync with Instrumentation. */
export const instrumentationLabels: Record<Instrumentation, string> = {
  orchestra: "Orchestra",
  chamber: "Chamber",
  choral: "Choral",
  solo: "Solo",
  band: "Wind Band",
  film: "Film",
};

export type Composition = {
  /** Permalink segment. Never change once the page has been shared or indexed. */
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  instrumentation: Instrumentation;
  /** Performance duration, conventionally minutes'seconds" — e.g. 12'30" */
  duration?: string;
  /** Orchestral shorthand, e.g. 2.2.2.2 / 4.3.3.1 / timp / str */
  scoring?: string;
  /** One or two sentences. Reused on cards, in the carousel, and as the meta description. */
  blurb: string;
  /** Long-form note. Each string is one paragraph. */
  programNote?: string[];
  /** When absent, a typographic placeholder cover is generated from the title. */
  cover?: { src: string; alt: string; credit?: string };
  audio?: { src: string; label: string }[];
  score?: { src: string; label: string };
  premiere?: {
    ensemble?: string;
    conductor?: string;
    venue?: string;
    date: string;
  };
  /** Exactly one composition may set this. getFeatured() enforces it at build time. */
  featured?: true;
};

export const compositions: Composition[] = [
  {
    slug: "tidewater",
    title: "Tidewater",
    subtitle: "for full orchestra",
    year: 2025,
    instrumentation: "orchestra",
    duration: "14'00\"",
    scoring: "3.2.2.2 / 4.3.3.1 / timp / 2 perc / hp / str",
    blurb:
      "A single arc from stillness to full tide, built on a rising figure that never quite resolves until the final bar.",
    programNote: [
      "Tidewater began as a set of sketches made over a winter spent within sight of the water. The piece takes its shape from the movement it watched: a long, patient gathering, then a withdrawal that leaves the material changed.",
      "The rising figure heard in the low strings at the opening returns in every section of the orchestra before the work ends, each time a little further from where it started.",
    ],
    premiere: {
      ensemble: "Placeholder Symphony Orchestra",
      venue: "Placeholder Hall",
      date: "2025-04-18",
    },
    featured: true,
  },
  {
    slug: "north-light",
    title: "North Light",
    subtitle: "for string orchestra",
    year: 2024,
    instrumentation: "orchestra",
    duration: "9'30\"",
    scoring: "str",
    blurb:
      "Written for string orchestra, a study in cold, high sonority and the slow warming beneath it.",
  },
  {
    slug: "three-elegies",
    title: "Three Elegies",
    subtitle: "for string quartet",
    year: 2024,
    instrumentation: "chamber",
    duration: "16'45\"",
    blurb:
      "Three short movements, each built from the same four-note descent heard at a different speed.",
  },
  {
    slug: "the-still-hour",
    title: "The Still Hour",
    subtitle: "for SATB chorus",
    year: 2023,
    instrumentation: "choral",
    duration: "6'20\"",
    blurb:
      "An unaccompanied setting for mixed chorus, written to sit in the resonance of a large room.",
  },
  {
    slug: "nocturne-for-solo-piano",
    title: "Nocturne",
    subtitle: "for solo piano",
    year: 2023,
    instrumentation: "solo",
    duration: "5'10\"",
    blurb:
      "A quiet piece in one breath, with the pedal held far longer than is comfortable.",
  },
  {
    slug: "ascent",
    title: "Ascent",
    subtitle: "for wind ensemble",
    year: 2022,
    instrumentation: "band",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
  },
];
