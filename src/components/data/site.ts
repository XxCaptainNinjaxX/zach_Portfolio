//contains data in about me, contact, and nav bar

export type SocialLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "About Me", href: "/about" },
  { label: "Compositions", href: "/compositions" },
  { label: "Achievements", href: "/achievements" },
];

export const site = {
  name: "Zachary Crawford",
  role: "Orchestral Composer",
  /** Used for absolute URLs in metadata, OG images, and the sitemap. */
  url: "https://zacharycrawford.com",
  email: "zachsmusicalwork@gmail.com",

  //featured pic bio
  bioShort:
    "Zachary Crawford writes orchestral music that moves between the intimate and the immense. " +
    "His work has been performed by ensembles across the country and draws on landscape, weather, and the sea.",
  //about me bio
  bioLong: [
    "Zachary Crawford is a composer and conductor whose orchestral writing moves between the intimate and the immense. His music has been described as patient and weather-driven, built from long lines that accumulate rather than announce themselves.",
    "He studied composition and orchestral conducting, and has since written for symphony orchestra, chamber ensemble, and voice. His catalogue includes several large-scale works alongside a growing body of chamber music.",
    "Alongside composition, he conducts and prepares new work for performance, and has collaborated with ensembles on premieres of his own music and that of other living composers.",
  ],

  // default pic
  portrait: {
    src: null as string | null,
    alt: "Zachary Crawford conducting",
    credit: null as string | null,
  },

  socials: [] as SocialLink[],
  cvPath: null as string | null,

  seo: {
    title: "Zachary Crawford — Orchestral Composer",
    description:
      "Orchestral, chamber, and choral works by composer Zachary Crawford. Catalogue, program notes, and commission inquiries.",
  },
} as const;
