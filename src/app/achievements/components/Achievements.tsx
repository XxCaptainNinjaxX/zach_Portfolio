import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievementKindLabels } from "@/components/data/data";
import { groupedByYear } from "@/lib/achievements";
import { getBySlug } from "@/lib/compositions";
import subpageStyles from "@/app/subpage.module.css";
import styles from "@/app/achievements/components/Achievements.module.css";

/**
 * ⚠️ VERIFY: the contents of this page were never specified — see PLAN.md
 * question 12. A reverse-chronological timeline is the hedge that works whether
 * this list stays at eight entries or grows to forty. If it turns out to be six
 * career highlights, a plain honours list would read better than a spine.
 */
export function Achievements() {
  const years = groupedByYear();

  return (
    <div className={subpageStyles.pageShell}>
      <div className={styles.column}>
        <SectionHeading as="h1" eyebrow="Selected">
          Achievements
        </SectionHeading>

        <div className={styles.timeline}>
          {[...years.entries()].map(([year, entries]) => (
            <section key={year} aria-labelledby={`year-${year}`}>
              <h2
                id={`year-${year}`}
                className={`tracked-caps ${styles.year}`}
              >
                {year}
              </h2>

              {/* The gold spine of the timeline. */}
              <ul className={styles.entries}>
                {entries.map((achievement) => {
                  const related = achievement.compositionSlug
                    ? getBySlug(achievement.compositionSlug)
                    : undefined;

                  return (
                    <li key={achievement.id} className={styles.entry}>
                      <span aria-hidden="true" className={styles.marker} />

                      <p className={`tracked-caps-tight ${styles.kind}`}>
                        {achievementKindLabels[achievement.kind]}
                      </p>

                      <h3 className={styles.title}>
                        {achievement.href ? (
                          <ExternalLink href={achievement.href}>
                            {achievement.title}
                          </ExternalLink>
                        ) : (
                          achievement.title
                        )}
                      </h3>

                      {achievement.organization ? (
                        <p className={styles.organization}>
                          {achievement.organization}
                        </p>
                      ) : null}

                      {achievement.detail ? (
                        <p className={styles.detail}>
                          {achievement.detail}
                        </p>
                      ) : null}

                      {related ? (
                        <Link
                          href={`/compositions/${related.slug}`}
                          className={`tracked-caps-tight ${styles.relatedLink}`}
                        >
                          {related.title}
                        </Link>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
