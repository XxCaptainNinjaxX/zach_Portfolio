import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompositionCard } from "@/components/compositions/CompositionCard";
import { CompositionCover } from "@/components/compositions/CompositionCover";
import { Divider } from "@/components/ui/Divider";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { MetaRow, type MetaEntry } from "@/components/ui/MetaRow";
import { instrumentationLabels } from "@/components/data/data";
import { getByCompositionSlug } from "@/lib/achievements";
import { allSlugs, getBySlug, getRelated } from "@/lib/compositions";

type CompositionPageProps = {
  // Next 16: params is a Promise. Synchronous access was removed in this major.
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CompositionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const composition = getBySlug(slug);

  if (!composition) return {};

  return {
    title: composition.title,
    description: composition.blurb,
    openGraph: {
      title: composition.title,
      description: composition.blurb,
      url: `/compositions/${composition.slug}`,
    },
  };
}

/**
 * Fixed locale and time zone rather than the visitor's.
 *
 * A premiere date is a fact about an event, not a moment to localise, and
 * formatting it with the runtime's locale would render differently on the server
 * than in the browser — a hydration mismatch. Pinning both makes it deterministic.
 */
const premiereDateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function CompositionPage({
  params,
}: CompositionPageProps) {
  const { slug } = await params;
  const composition = getBySlug(slug);

  if (!composition) notFound();

  const related = getRelated(slug);
  const linkedAchievements = getByCompositionSlug(slug);

  const meta: MetaEntry[] = [
    { label: "Year", value: composition.year },
    {
      label: "Scoring",
      value:
        composition.scoring ??
        instrumentationLabels[composition.instrumentation],
    },
  ];

  if (composition.duration) {
    meta.push({ label: "Duration", value: composition.duration });
  }

  if (composition.premiere) {
    const { ensemble, conductor, venue, date } = composition.premiere;
    meta.push({
      label: "Premiere",
      value: (
        <>
          <time dateTime={date}>
            {premiereDateFormat.format(new Date(date))}
          </time>
          {ensemble ? <br /> : null}
          {ensemble}
          {conductor ? ` · ${conductor}` : ""}
          {venue ? <br /> : null}
          {venue}
        </>
      ),
    });
  }

  return (
    <div className="px-5 py-12 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/compositions"
          className="tracked-caps-tight text-[0.65rem] text-ink-muted transition-colors hover:text-gold"
        >
          ← All compositions
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="gold-frame relative aspect-square w-full overflow-hidden">
              <CompositionCover
                composition={composition}
                sizes="(max-width: 1024px) 80vw, 22rem"
              />
            </div>

            <MetaRow entries={meta} className="mt-8" />
          </div>

          <div>
            <h1 className="tracked-caps font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              {composition.title}
            </h1>

            {composition.subtitle ? (
              <p className="mt-3 font-display text-lg font-light text-ink-muted">
                {composition.subtitle}
              </p>
            ) : null}

            <p className="mt-8 max-w-[60ch] leading-relaxed text-ink-muted">
              {composition.blurb}
            </p>

            {composition.programNote ? (
              <section className="mt-12">
                <h2 className="tracked-caps font-display text-sm text-gold">
                  Program note
                </h2>
                <div className="mt-5 max-w-[65ch] space-y-5">
                  {composition.programNote.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="leading-relaxed text-ink-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ) : null}

            {composition.audio && composition.audio.length > 0 ? (
              <section className="mt-12">
                <h2 className="tracked-caps font-display text-sm text-gold">
                  Listen
                </h2>
                <ul className="mt-5 space-y-4">
                  {composition.audio.map((track) => (
                    <li key={track.src}>
                      <p className="mb-2 text-sm text-ink-muted">
                        {track.label}
                      </p>
                      {/* Native controls: no custom player, no client JS, keyboard-accessible by default. */}
                      <audio controls preload="none" src={track.src} className="w-full max-w-md">
                        Your browser does not support audio playback.
                      </audio>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {composition.score ? (
              <section className="mt-12">
                <h2 className="tracked-caps font-display text-sm text-gold">
                  Score
                </h2>
                <p className="mt-4">
                  <ExternalLink
                    href={composition.score.src}
                    className="text-sm text-ink-muted"
                  >
                    {composition.score.label}
                  </ExternalLink>
                </p>
              </section>
            ) : null}

            {linkedAchievements.length > 0 ? (
              <section className="mt-12">
                <h2 className="tracked-caps font-display text-sm text-gold">
                  Recognition
                </h2>
                <ul className="mt-5 space-y-2">
                  {linkedAchievements.map((achievement) => (
                    <li key={achievement.id} className="text-sm text-ink-muted">
                      {achievement.year} — {achievement.title}
                      {achievement.organization
                        ? `, ${achievement.organization}`
                        : ""}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

        {related.length > 0 ? (
          <>
            <Divider className="mt-20" />
            <section className="mt-12">
              <h2 className="tracked-caps font-display text-sm text-gold">
                Other works
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((other) => (
                  <li key={other.slug}>
                    <CompositionCard composition={other} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
