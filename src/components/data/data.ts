//------- Images -------

// Files under public/images.
export const images = {
  marchingSS: "/images/MarchingSS.png",
  jazzEnsTitles: "/images/jazzEnsTitles.jpg",
  zach: "/images/zach.png",

  s1: "/images/comps/s1.jpg",
  s2: "/images/comps/s2.jpg",
  s3: "/images/comps/s3.jpg",
  s4: "/images/comps/s4.jpg",
  s5: "/images/comps/s5.jpg",
  s6: "/images/comps/s6.jpg",
  s7: "/images/comps/s7.jpg",
  s8: "/images/comps/s8.jpg",
  s9: "/images/comps/s9.jpg",
  s10: "/images/comps/s10.jpg",
  s11: "/images/comps/s11.jpg",
  s12: "/images/comps/s12.jpg",
  s13: "/images/comps/s13.jpg",
  s14: "/images/comps/s14.jpg",
  s15: "/images/comps/s15.jpg",
  s16: "/images/comps/s16.jpg",
  s17: "/images/comps/s17.jpg",
  s18: "/images/comps/s18.jpg",
} as const;

//------- Compositions -------

export type CompositionType = "orchestra" | "chamber" | "solo" | "symphony";

export const compositionTypeLabels: Record<CompositionType, string> = {
  orchestra: "Orchestra",
  chamber: "Chamber",
  solo: "Solo",
  symphony: "Symphony",
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
  landingComp?: true;
  featured?: true;
};

export const compositions: Composition[] = [
  {
    slug: "tidewater",
    title: "Tidewater",
    subtitle: "for full orchestra",
    year: 2025,
    type: "orchestra",
    duration: "14 minutes",
    scoring: "3.2.2.2 / 4.3.3.1 / timp / 2 perc / hp / str",
    blurb:
      "A single arc from stillness to full tide, built on a rising figure that never quite resolves until the final bar.",
    description: [
      "akwndwakjdawdjbawdkjbwadkjbwfjbafkjbawdkjBWJRlawjndjnkjawdjnwjkaw djawkndiaowdnwoawdnwkaldnwaidowadnsawldksnawkldsawndlksnalwndsknawlkdnsanwlkdnslkanwlkdnslkanwdnslknawkndskjrbgjkbriugbriuviusbuibuenmlsudnfwdiwnueaoanfneaoaenfuutjnlkaenvljnefnaowiufneujknkjnkjawnkjawnckjawnckajwcnkajcnkajwcnkajcwnnoiseofijefoijtuikjna, a,xncaiwflamcklai dont knwow aht ia ma writing this is a really long blueb or somethinglawndlkawdlknlkn",
    ],
    image: null,
    audio: [{ src: "/audio/tidewater.mp3", label: "Placeholder recording" }],
    score: { src: "https://www.google.com", label: "Placeholder score (PDF)" },
    youtube: {
      src: "https://www.youtube.com/watch?v=bM6pPmy84oE",
      label: "Placeholder video",
    },
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
    audio: [{ src: "/audio/north-light.mp3", label: "Placeholder recording" }],
    score: { src: "https://www.google.com", label: "Placeholder score (PDF)" },
    youtube: { src: "https://www.google.com", label: "Placeholder video" },
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
    audio: [
      { src: "/audio/three-elegies-i.mp3", label: "I. Placeholder" },
      { src: "/audio/three-elegies-ii.mp3", label: "II. Placeholder" },
      { src: "/audio/three-elegies-iii.mp3", label: "III. Placeholder" },
    ],
    score: { src: "https://www.google.com", label: "Placeholder score (PDF)" },
    youtube: { src: "https://www.google.com", label: "Placeholder video" },
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
    image: images.marchingSS,
    featured: true,
  },
  //-------------------------------------------------------------------

  {
    slug: "EMinor",
    title: "E-Minor",
    subtitle: "for full orchestra",
    year: 2021,
    type: "symphony",
    duration: "1:03:51",
    scoring:
      "Piccolo\n" +
      "Flute 1" +
      "\n" +
      "Flute 2" +
      "\n" +
      "Oboe 1" +
      "\n" +
      "Oboe 2" +
      "\n" +
      "Clarinet 1" +
      "\n" +
      "Clarinet 2" +
      "\n" +
      "Bassoon 1" +
      "\n" +
      "Bassoon 2" +
      "\n" +
      "Horn 1" +
      "\n" +
      "Horn 2" +
      "\n" +
      "Horn 3" +
      "\n" +
      "Horn 4" +
      "\n" +
      "Trumpet in C 1" +
      "\n" +
      "Trumpet in C 2" +
      "\n" +
      "Trombone 1" +
      "\n" +
      "Trombone 2" +
      "\n" +
      "Bass Trombone" +
      "\n" +
      "Tuba" +
      "\n" +
      "Timpani" +
      "\n" +
      "Violin 1" +
      "\n" +
      "Violin 2" +
      "\n" +
      "Viola" +
      "\n" +
      "Violoncello" +
      "\n" +
      "Contrabass",
    blurb: "[PLACEHOLDER]",
    description: [
      "Crawford’s First Symphony was the first piece he ever made officially. After being inspired by seeing his trombone private teacher make music for him to play, he wanted to do the same. At the time, the only classical pieces he knew of were Holst’s “The Planets” and Berlioz’s “Symphonie Fantastique”. He took what he learned and in one year completed his First Symphony not even knowing all of his major or minor scales.",
      "This piece has Amazing Low Brass, Flute, Piccolo, Clarinet, English Horn, Violin, Low Strings, and Trumpet Excerpts.",
      "Fun Fact: He completed the symphony on his birthday just minutes before he went to see his private teacher conduct Dvořák’s “New World Symphony”. It would be the first time he’d ever listen to the piece and would inspire his later works exponentially. The Scherzo Finale of this work also used to be originally in D Major.",
    ],
    image: images.s1,
    youtube: {
      src: "https://www.youtube.com/watch?v=X5vxtj-Clwc",
      label: " Symphony 1 in E Minor, Full Score + Audio",
    },
    purchaseUrl: "https://www.google.com",
    featured: true,
  },
  {
    slug: "one",
    title: "[PLACEHOLDER]",
    subtitle: "for full orchestra",
    year: 0,
    type: "symphony",
    duration: "[PLACEHOLDER]",
    scoring: "[PLACEHOLDER]\n" + "[PLACEHOLDER]",
    blurb: "[PLACEHOLDER]",
    description: ["[PLACEHOLDER]"],
    image: images.s1,
    youtube: {
      src: "[PLACEHOLDER]",
      label: "[PLACEHOLDER]",
    },
    purchaseUrl: "https://www.google.com",
  },
  {
    slug: "two",
    title: "[PLACEHOLDER]",
    subtitle: "for full orchestra",
    year: 0,
    type: "symphony",
    duration: "[PLACEHOLDER]",
    scoring: "[PLACEHOLDER]\n" + "[PLACEHOLDER]",
    blurb: "[PLACEHOLDER]",
    description: ["[PLACEHOLDER]"],
    image: images.s1,
    youtube: {
      src: "[PLACEHOLDER]",
      label: "[PLACEHOLDER]",
    },
    purchaseUrl: "https://www.google.com",
  },
  {
    slug: "three",
    title: "[PLACEHOLDER]",
    subtitle: "for full orchestra",
    year: 0,
    type: "symphony",
    duration: "[PLACEHOLDER]",
    scoring: "[PLACEHOLDER]\n" + "[PLACEHOLDER]",
    blurb: "[PLACEHOLDER]",
    description: ["[PLACEHOLDER]"],
    image: images.s1,
    youtube: {
      src: "[PLACEHOLDER]",
      label: "[PLACEHOLDER]",
    },
    purchaseUrl: "https://www.google.com",
  },
  {
    slug: "four",
    title: "[PLACEHOLDER]",
    subtitle: "for full orchestra",
    year: 0,
    type: "symphony",
    duration: "[PLACEHOLDER]",
    scoring: "[PLACEHOLDER]\n" + "[PLACEHOLDER]",
    blurb: "[PLACEHOLDER]",
    description: ["[PLACEHOLDER]"],
    image: images.s1,
    youtube: {
      src: "[PLACEHOLDER]",
      label: "[PLACEHOLDER]",
    },
    purchaseUrl: "https://www.google.com",
  },
  {
    slug: "five",
    title: "[PLACEHOLDER]",
    subtitle: "for full orchestra",
    year: 0,
    type: "symphony",
    duration: "[PLACEHOLDER]",
    scoring: "[PLACEHOLDER]\n" + "[PLACEHOLDER]",
    blurb: "[PLACEHOLDER]",
    description: ["[PLACEHOLDER]"],
    image: images.s1,
    youtube: {
      src: "[PLACEHOLDER]",
      label: "[PLACEHOLDER]",
    },
    purchaseUrl: "https://www.google.com",
  },
  {
    slug: "six",
    title: "[PLACEHOLDER]",
    subtitle: "for full orchestra",
    year: 0,
    type: "symphony",
    duration: "[PLACEHOLDER]",
    scoring: "[PLACEHOLDER]\n" + "[PLACEHOLDER]",
    blurb: "[PLACEHOLDER]",
    description: ["[PLACEHOLDER]"],
    image: images.s1,
    youtube: {
      src: "[PLACEHOLDER]",
      label: "[PLACEHOLDER]",
    },
    purchaseUrl: "https://www.google.com",
  },
  {
    slug: "seven",
    title: "[PLACEHOLDER]",
    subtitle: "for full orchestra",
    year: 0,
    type: "symphony",
    duration: "[PLACEHOLDER]",
    scoring: "[PLACEHOLDER]\n" + "[PLACEHOLDER]",
    blurb: "[PLACEHOLDER]",
    description: ["[PLACEHOLDER]"],
    image: images.s1,
    youtube: {
      src: "[PLACEHOLDER]",
      label: "[PLACEHOLDER]",
    },
    purchaseUrl: "https://www.google.com",
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
    src: images.marchingSS,
    alt: "Zachary Crawford, photograph one",
  },
  {
    id: "hero-rotation-2",
    src: images.jazzEnsTitles,
    alt: "Zachary Crawford, photograph two",
  },
  {
    id: "hero-rotation-3",
    src: images.zach,
    alt: "Zachary Crawford, photograph three",
  },
];
