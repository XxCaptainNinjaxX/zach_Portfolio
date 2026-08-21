/**
 * Awards, commissions, premieres, residencies, and press.
 *
 * ⚠️ VERIFY: this is the largest guess in the project. The real contents of
 * "Achievements" were never specified — see PLAN.md STEP 3 question 12. The
 * `kind` field is the hedge: the same data survives whether this turns out to be
 * six career highlights or forty mixed entries, and only the presentation changes.
 */

export type AchievementKind =
  | "award"
  | "commission"
  | "premiere"
  | "residency"
  | "performance"
  | "press";

/** Display labels for the filter row. Keys must stay in sync with AchievementKind. */
export const achievementKindLabels: Record<AchievementKind, string> = {
  award: "Awards",
  commission: "Commissions",
  premiere: "Premieres",
  residency: "Residencies",
  performance: "Performances",
  press: "Press",
};

export type Achievement = {
  id: string;
  year: number;
  kind: AchievementKind;
  title: string;
  organization?: string;
  detail?: string;
  /** External link. Rendered with rel="noopener noreferrer" and a new-tab hint. */
  href?: string;
  /** Cross-link into the catalogue. Must match a Composition.slug. */
  compositionSlug?: string;
};

export const achievements: Achievement[] = [
  {
    id: "premiere-tidewater",
    year: 2025,
    kind: "premiere",
    title: "Premiere of Tidewater",
    organization: "Placeholder Symphony Orchestra",
    detail: "Placeholder Hall — first performance of the complete work.",
    compositionSlug: "tidewater",
  },
  {
    id: "commission-tidewater",
    year: 2024,
    kind: "commission",
    title: "Orchestral commission",
    organization: "Placeholder Symphony Orchestra",
    detail: "Commissioned to write a large-scale work for the 2025 season.",
    compositionSlug: "tidewater",
  },
  {
    id: "award-emerging-composer",
    year: 2024,
    kind: "award",
    title: "Emerging Composer Prize",
    organization: "Placeholder Foundation",
  },
  {
    id: "residency-2024",
    year: 2024,
    kind: "residency",
    title: "Composer in residence",
    organization: "Placeholder Arts Center",
    detail: "A season-long residency including two new commissions.",
  },
  {
    id: "premiere-three-elegies",
    year: 2024,
    kind: "premiere",
    title: "Premiere of Three Elegies",
    organization: "Placeholder Quartet",
    compositionSlug: "three-elegies",
  },
  {
    id: "performance-still-hour",
    year: 2023,
    kind: "performance",
    title: "The Still Hour performed on tour",
    organization: "Placeholder Chamber Choir",
    compositionSlug: "the-still-hour",
  },
  {
    id: "award-choral-competition",
    year: 2023,
    kind: "award",
    title: "First prize, choral composition competition",
    organization: "Placeholder Choral Society",
    compositionSlug: "the-still-hour",
  },
  {
    id: "press-review-2022",
    year: 2022,
    kind: "press",
    title: "Featured in a review of new orchestral writing",
    organization: "Placeholder Review",
  },
];
