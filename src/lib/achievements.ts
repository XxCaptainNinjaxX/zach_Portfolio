import {
  achievements,
  type Achievement,
  type AchievementType,
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

/** Only the types actually present, so the filter row never offers an empty facet. */
export function usedAchievementTypes(): AchievementType[] {
  const seen = new Set<AchievementType>();
  for (const achievement of byYearDesc()) {
    seen.add(achievement.type);
  }
  return [...seen];
}
