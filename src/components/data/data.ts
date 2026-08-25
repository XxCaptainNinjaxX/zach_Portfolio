//------- Compositions -------

export type CompositionType = "orchestra" | "chamber" | "solo";

export const compositionTypeLabels: Record<CompositionType, string> = {
  orchestra: "Orchestra",
  chamber: "Chamber",
  solo: "Solo",
};

export type Composition = {
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  type: CompositionType;
  duration?: string;
  scoring?: string;
  blurb: string;
  description?: string[];
  image: string | null;
  audio?: { src: string; label: string }[];
  score?: { src: string; label: string };
  youtube?: { src: string; label: string };
  purchaseUrl?: string;
  /** The single work centered as the landing-page hero on load. */
  landingComp?: true;
  /** Whether this work appears in the landing page's featured carousel. */
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
    image: null,
    purchaseUrl: "https://www.google.com",
    landingComp: true,
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
    image: null,
    purchaseUrl: "https://www.google.com",
    featured: true,
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
    image: null,
    purchaseUrl: "https://www.google.com",
    featured: true,
  },
  {
    slug: "the-still-hour",
    title: "The Still Hour",
    subtitle: "for SATB chorus",
    year: 2023,
    type: "chamber",
    duration: "6'20\"",
    blurb:
      "An unaccompanied setting for mixed chorus, written to sit in the resonance of a large room.",
    image: null,
    purchaseUrl: "https://www.google.com",
    featured: true,
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
    image: null,
    purchaseUrl: "https://www.google.com",
    featured: true,
  },
  {
    slug: "ascent",
    title: "Ascent",
    subtitle: "for wind ensemble",
    year: 2022,
    type: "orchestra",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: null,
    purchaseUrl: "https://www.google.com",
    featured: true,
  },
  //----------

  {
    slug: "test1",
    title: "test",
    subtitle: "test",
    year: 2022,
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: null,
  },
  {
    slug: "test",
    title: "test",
    subtitle: "test",
    year: 2022,
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: null,
  },
  {
    slug: "test2",
    title: "test",
    subtitle: "test",
    year: 2022,
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: null,
  },
  {
    slug: "test3",
    title: "test",
    subtitle: "test",
    year: 2022,
    type: "solo",
    duration: "11'00\"",
    blurb:
      "Written for wind ensemble, a continuous climb through six key areas without a single full cadence.",
    image: "/images/MarchingSS.png",
    featured: true,
  },
];

//------- Achievements -------

export type AchievementType = "award" | "performance";
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
    type: "performance",
    title: "Featured in a review of new orchestral writing",
    organization: "Placeholder Review",
  },
];

//------- Featured images -------

export type FeaturedImage = {
  id: string;
  src: string | null;
  alt: string;
};

export const featuredImages: FeaturedImage[] = [
  {
    id: "hero-rotation-1",
    src: "/images/MarchingSS.png",
    alt: "Zachary Crawford, photograph one",
  },
  {
    id: "hero-rotation-2",
    src: "/images/jazzEnsTitles.jpg",
    alt: "Zachary Crawford, photograph two",
  },
  {
    id: "hero-rotation-3",
    src: "/images/zach.png",
    alt: "Zachary Crawford, photograph three",
  },
];
