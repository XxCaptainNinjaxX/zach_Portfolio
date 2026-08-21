import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievementKindLabels } from "@/content/achievements";
import { groupedByYear } from "@/lib/achievements";
import { getBySlug } from "@/lib/compositions";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards, commissions, premieres, and residencies, listed by year.",
};

/**
 * ⚠️ VERIFY: the contents of this page were never specified — see PLAN.md
 * question 12. A reverse-chronological timeline is the hedge that works whether
 * this list stays at eight entries or grows to forty. If it turns out to be six
 * career highlights, a plain honours list would read better than a spine.
 */
export default function AchievementsPage() {
  const years = groupedByYear();

  return (
    <div className="px-5 py-12 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading as="h1" eyebrow="Selected">
          Achievements
        </SectionHeading>

        <div className="mt-14 space-y-12">
          {[...years.entries()].map(([year, entries]) => (
            <section key={year} aria-labelledby={`year-${year}`}>
              <h2
                id={`year-${year}`}
                className="tracked-caps font-display text-sm text-gold"
              >
                {year}
              </h2>

              {/* The gold spine of the timeline. */}
              <ul className="mt-5 space-y-8 border-l border-gold-hairline/50 pl-6 sm:pl-8">
                {entries.map((achievement) => {
                  const related = achievement.compositionSlug
                    ? getBySlug(achievement.compositionSlug)
                    : undefined;

                  return (
                    <li key={achievement.id} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[1.85rem] top-2 size-1.5 rotate-45 border border-gold bg-surface sm:-left-[2.35rem]"
                      />

                      <p className="tracked-caps-tight text-[0.6rem] text-gold">
                        {achievementKindLabels[achievement.kind]}
                      </p>

                      <h3 className="mt-2 font-display text-lg leading-tight font-light text-ink">
                        {achievement.href ? (
                          <ExternalLink href={achievement.href}>
                            {achievement.title}
                          </ExternalLink>
                        ) : (
                          achievement.title
                        )}
                      </h3>

                      {achievement.organization ? (
                        <p className="mt-1 text-sm text-ink-muted">
                          {achievement.organization}
                        </p>
                      ) : null}

                      {achievement.detail ? (
                        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink-muted">
                          {achievement.detail}
                        </p>
                      ) : null}

                      {related ? (
                        <Link
                          href={`/compositions/${related.slug}`}
                          className="tracked-caps-tight mt-3 inline-block border-b border-gold-hairline pb-0.5 text-[0.6rem] text-ink-muted transition-colors hover:text-gold"
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
