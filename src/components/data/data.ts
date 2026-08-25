//------- Compositions -------

/**
 * The catalogue. Adding a composition is appending one object to `compositions`
 * — the index page, the landing carousel, /compositions/<slug>, the sitemap, and
 * the "related works" strip all read from here.
 *
 * ⚠️ VERIFY: every entry below is placeholder with invented titles and dates.
 * The shape is real; the content is not.
 */

export type CompositionType = "orchestra" | "chamber" | "solo";

/** Display labels for the filter row. Keys must stay in sync with CompositionType. */
export const compositionTypeLabels: Record<CompositionType, string> = {
  orchestra: "Orchestra",
  chamber: "Chamber",
  solo: "Solo",
};

export type Composition = {
  /** Permalink segment. Never change once the page has been shared or indexed. */
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  /** Ensemble category. The exact scoring lives in `scoring`. */
  type: CompositionType;
  /** Performance duration, conventionally minutes'seconds" — e.g. 12'30" */
  duration?: string;
  /** Orchestral shorthand, e.g. 2.2.2.2 / 4.3.3.1 / timp / str */
  scoring?: string;
  /** One or two sentences. Reused on cards, in the carousel, and as the meta description. */
  blurb: string;
  /** Long-form note, one string per paragraph. `blurb` is the short form. */
  description?: string[];
  /** When absent, a typographic placeholder cover is generated from the title. */
  cover?: { src: string; alt: string; credit?: string };
  audio?: { src: string; label: string }[];
  score?: { src: string; label: string };
  /** Exactly one compositio may set this. getFeatured() enforces it at build time. */
  featured?: true;
};

export const compositions: Composition[] = [
  {
    slug: "tidewater",
    title: "Tidewater",
    subtitle: "for full orchestra",
    year: 2025,
    type: "orchestra",
    duration: "14'00\"",
    scoring: "3.2.2.2 / 4.3.3.1 / timp / 2 perc / hp / str",
    blurb:
      "A single arc from stillness to full tide, built on a rising figure that never quite resolves until the final bar.",
    description: [
      "akwndwakjdawdjbawdkjbwadkjbwfjbafkjbawdkjBWJRlawjndjnkjawdjnwjkaw djawkndiaowdnwoawdnwkaldnwaidowadnsawldksnawkldsawndlksnalwndsknawlkdnsanwlkdnslkanwlkdnslkanwdnslknawkndskjrbgjkbriugbriuviusbuibuenmlsudnfwdiwnueaoanfneaoaenfuutjnlkaenvljnefnaowiufneujknkjnkjawnkjawnckjawnckajwcnkajcnkajwcnkajcwnnoiseofijefoijtuikjna, a,xncaiwflamcklai dont knwow aht ia ma writing this is a really long blueb or somethinglawndlkawdlknlkn",
    ],
    featured: true,
  },
  {
    slug: "north-light",
    title: "North Light",
    subtitle: "for string orchestra",
    year: 2024,
    type: "orchestra",
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
    type: "chamber",
    duration: "16'45\"",
    blurb:
      "Three short movements, each built from the same four-note descent heard at a different speed.",
  },
  {
    slug: "the-still-hour",
    title: "The Still Hour",
    subtitle: "for SATB chorus",
    year: 2023,
    // ⚠️ VERIFY: was "choral" before the union narrowed. Chamber is the nearest
    // survivor for an unaccompanied vocal ensemble, not an exact description.
    type: "chamber",
    duration: "6'20\"",
    blurb:
      "An unaccompanied setting for mixed chorus, written to sit in the resonance of a large room.",
  },
  {
    slug: "nocturne-for-solo-piano",
    title: "Nocturne",
    subtitle: "for solo piano",
    year: 2023,
    type: "solo",
    duration: "5'10\"",
    blurb:
      "A quiet piece in one breath, with the pedal held far longer than is comfortable.",
  },
  {
    slug: "ascent",
    title: "Ascent",
    subtitle: "for wind ensemble",
    year: 2022,
    // ⚠️ VERIFY: was "band". A wind ensemble is not an orchestra; this is a
    // forced fit to the narrowed union, kept because the subtitle carries the
    // real scoring.
    type: "orchestra",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
  },
];

//------- Achievements -------

/**
 * Awards and performances.
 *
 * ⚠️ VERIFY: this is the largest guess in the project. The real contents of
 * "Achievements" were never specified — see PLAN.md STEP 3 question 12. The
 * `type` field is the hedge: the same data survives whether this turns out to be
 * six career highlights or forty mixed entries, and only the presentation changes.
 */

export type AchievementType = "award" | "performance";

/** Display labels for the filter row. Keys must stay in sync with AchievementType. */
export const achievementTypeLabels: Record<AchievementType, string> = {
  award: "Awards",
  performance: "Performances",
};

export type Achievement = {
  id: string;
  year: number;
  type: AchievementType;
  title: string;
  organization?: string;
  detail?: string;
  /** External link. Rendered with rel="noopener noreferrer" and a new-tab hint. */
  href?: string;
};

export const achievements: Achievement[] = [
  {
    id: "premiere-tidewater",
    year: 2025,
    type: "performance",
    title: "Premiere of Tidewater",
    organization: "Placeholder Symphony Orchestra",
    detail: "Placeholder Hall — first performance of the complete work.",
  },
  {
    id: "commission-tidewater",
    year: 2024,
    // ⚠️ VERIFY: was "commission". Neither survivor fits a commission; "award"
    // is the closer of the two because both are conferred rather than performed.
    type: "award",
    title: "Orchestral commission",
    organization: "Placeholder Symphony Orchestra",
    detail: "Commissioned to write a large-scale work for the 2025 season.",
  },
  {
    id: "award-emerging-composer",
    year: 2024,
    type: "award",
    title: "Emerging Composer Prize",
    organization: "Placeholder Foundation",
  },
  {
    id: "residency-2024",
    year: 2024,
    // ⚠️ VERIFY: was "residency". Forced fit — a residency is conferred, so it
    // lands under "award" rather than "performance".
    type: "award",
    title: "Composer in residence",
    organization: "Placeholder Arts Center",
    detail: "A season-long residency including two new commissions.",
  },
  {
    id: "premiere-three-elegies",
    year: 2024,
    type: "performance",
    title: "Premiere of Three Elegies",
    organization: "Placeholder Quartet",
  },
  {
    id: "performance-still-hour",
    year: 2023,
    type: "performance",
    title: "The Still Hour performed on tour",
    organization: "Placeholder Chamber Choir",
  },
  {
    id: "award-choral-competition",
    year: 2023,
    type: "award",
    title: "First prize, choral composition competition",
    organization: "Placeholder Choral Society",
  },
  {
    id: "press-review-2022",
    year: 2022,
    // ⚠️ VERIFY: was "press". The worst fit of the five — a review is neither an
    // award nor a performance. Filed under the event it reviews.
    type: "performance",
    title: "Featured in a review of new orchestral writing",
    organization: "Placeholder Review",
  },
];
