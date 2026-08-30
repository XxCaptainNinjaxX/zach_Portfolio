import {
  achievements,
  type Achievement,
  type AchievementType,
} from "@/components/data/data";

/** Derived views over the achievements list. See lib/compositions.ts for the same pattern. */

/**
 * Grouped for the timeline: one year marker, then that year's entries.
 *
 * A Map preserves insertion order, so the timeline reads in the order entries
 * are written in data.ts. There is no year sort: `year` is free text that can
 * hold a range, so the running order is curated by hand in the file.
 */
export function groupedByYear(): Map<string, Achievement[]> {
  const groups = new Map<string, Achievement[]>();

  for (const achievement of achievements) {
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
  for (const achievement of achievements) {
    seen.add(achievement.type);
  }
  return [...seen];
}
