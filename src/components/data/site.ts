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
    "Zachary Crawford (2009 - Present) is an inspiring young composer, conductor, " +
    "and multi-instrumentalist who has composed more than 60 works by the age of 17, " +
    "including more than twenty symphonies.",
  //about me bio
  bioLong: [
    "Zachary Crawford (2009 - Present) is an inspiring young composer, conductor, and multi-instrumentalist. He has composed more than 60 works by the age of 17 including more than twenty symphonies, some reaching over an hour long.",
    "Crawford can play over 30 instruments, his main being the trombone since he was 7 years old. He dreams of standing on the podium of a fantastic orchestra with a baton premiering his music live.",
    "His most known works is his music he wrote emotionally through personal struggles in his childhood life. Since he was only twelve years old, Crawford is a dedicated composer and conductor aiming for a spot as a maestro in his generation of musicians.",
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
