import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievementTypeLabels } from "@/components/data/data";
import { groupedByYear } from "@/lib/achievements";
import subpageStyles from "@/app/subpage.module.css";
import styles from "@/app/achievements/components/Achievements.module.css";

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
                {entries.map((achievement) => (
                  <li key={achievement.id} className={styles.entry}>
                    <span aria-hidden="true" className={styles.marker} />

                    <p className={`tracked-caps-tight ${styles.type}`}>
                      {achievementTypeLabels[achievement.type]} ·{" "}
                      {achievement.month}
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
                      <p className={styles.detail}>{achievement.detail}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
