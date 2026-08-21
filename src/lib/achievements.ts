import {
  achievements,
  type Achievement,
  type AchievementKind,
} from "@/components/data/data";

/** Derived views over the achievements list. See lib/compositions.ts for the same pattern. */

/** Newest first, ties broken alphabetically so the order is stable across builds. */
export function byYearDesc(): Achievement[] {
  return [...achievements].sort((first, second) => {
    if (first.year !== second.year) return second.year - first.year;
    return first.title.localeCompare(second.title);
  });
}

/**
 * Grouped for the timeline: one year marker, then that year's entries.
 * A Map preserves insertion order, so iterating it yields years newest-first.
 */
export function groupedByYear(): Map<number, Achievement[]> {
  const groups = new Map<number, Achievement[]>();

  for (const achievement of byYearDesc()) {
    const existing = groups.get(achievement.year);
    if (existing) {
      existing.push(achievement);
    } else {
      groups.set(achievement.year, [achievement]);
    }
  }

  return groups;
}

/** Only the kinds actually present, so the filter row never offers an empty facet. */
export function usedKinds(): AchievementKind[] {
  const seen = new Set<AchievementKind>();
  for (const achievement of byYearDesc()) {
    seen.add(achievement.kind);
  }
  return [...seen];
}

export function getByCompositionSlug(slug: string): Achievement[] {
  return byYearDesc().filter(
    (achievement) => achievement.compositionSlug === slug,
  );
}
