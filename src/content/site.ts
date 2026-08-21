/**
 * Single source of truth for everything about the site that is not a list.
 *
 * ⚠️ VERIFY: every string below is placeholder. Nothing here has been confirmed
 * with Zachary. Replace before launch — see PLAN.md STEP 3 for the open questions.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Nav order is top-to-bottom in the menu drawer.
 *
 * The mockup's fourth item, Contact, is not a route: contact is the mailto link
 * in the header. Adding it back here would produce a dead link in the drawer,
 * the footer, and the sitemap, all of which read this array.
 */
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
  email: "hello@example.com",

  /** Two bio lengths — concert programs need both. Short doubles as the hero intro. */
  bioShort:
    "Zachary Crawford writes orchestral music that moves between the intimate and the immense. " +
    "His work has been performed by ensembles across the country and draws on landscape, weather, and the sea.",

  bioLong: [
    "Zachary Crawford is a composer and conductor whose orchestral writing moves between the intimate and the immense. His music has been described as patient and weather-driven, built from long lines that accumulate rather than announce themselves.",
    "He studied composition and orchestral conducting, and has since written for symphony orchestra, chamber ensemble, and voice. His catalogue includes several large-scale works alongside a growing body of chamber music.",
    "Alongside composition, he conducts and prepares new work for performance, and has collaborated with ensembles on premieres of his own music and that of other living composers.",
  ],

  /**
   * Portrait: no confirmed asset yet. When the real photo lands, drop it at
   * public/media/portrait.jpg and set `src` here — no component changes needed.
   * ⚠️ VERIFY: need the original file (≥2000px long edge) plus photographer credit.
   */
  portrait: {
    src: null as string | null,
    alt: "Zachary Crawford conducting",
    credit: null as string | null,
  },

  /** ⚠️ VERIFY: no confirmed phone number. Header phone icon stays hidden while this is null. */
  phone: null as string | null,

  /** ⚠️ VERIFY: none of these are confirmed live. Empty renders nothing. */
  socials: [] as SocialLink[],

  /** ⚠️ VERIFY: no CV supplied. Contact/About hide the link while this is null. */
  cvPath: null as string | null,

  seo: {
    title: "Zachary Crawford — Orchestral Composer",
    description:
      "Orchestral, chamber, and choral works by composer Zachary Crawford. Catalogue, program notes, and commission inquiries.",
  },
} as const;
