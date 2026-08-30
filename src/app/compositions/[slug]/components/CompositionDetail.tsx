import Link from "next/link";
import {
  MetaRow,
  type MetaEntry,
} from "@/app/compositions/[slug]/components/MetaRow";
import { CompositionCard } from "@/components/CompositionCard/CompositionCard";
import { CompositionCover } from "@/components/CompositionCover/CompositionCover";
import { Divider } from "@/components/ui/Divider";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { compositionTypeLabels, type Composition } from "@/components/data/data";
import { getRelated } from "@/lib/compositions";
import { EscapeToCompositions } from "@/app/compositions/[slug]/components/EscapeToCompositions";
import subpageStyles from "@/app/subpage.module.css";
import styles from "@/app/compositions/[slug]/components/CompositionDetail.module.css";

type CompositionDetailProps = {
  composition: Composition;
};

export function CompositionDetail({ composition }: CompositionDetailProps) {
  const { slug } = composition;
  const related = getRelated(slug);

  const meta: MetaEntry[] = [
    { label: "Year", value: composition.year },
    {
      label: "Scoring",
      value: composition.scoring ?? compositionTypeLabels[composition.type],
    },
  ];

  if (composition.duration) {
    meta.push({ label: "Duration", value: composition.duration });
  }

  return (
    <div className={subpageStyles.pageShell}>
      <EscapeToCompositions />
      <div className={styles.column}>
        <Link
          href="/compositions"
          className={`tracked-caps-tight ${styles.backLink}`}
        >
          ← All compositions
        </Link>

        <div className={styles.grid}>
          <div>
            <div className={`gold-frame ${styles.cover}`}>
              <CompositionCover
                composition={composition}
                sizes="(max-width: 1024px) 80vw, 22rem"
              />
            </div>

            <MetaRow entries={meta} className={styles.meta} />
          </div>

          <div>
            <h1 className={`tracked-caps ${styles.title}`}>
              {composition.title}
            </h1>

            {composition.subtitle ? (
              <p className={styles.subtitle}>{composition.subtitle}</p>
            ) : null}

            <p className={styles.blurb}>{composition.blurb}</p>

            {composition.description ? (
              <section className={styles.section}>
                <h2 className={`tracked-caps ${styles.sectionHeading}`}>
                  Program note
                </h2>
                <div className={styles.descriptionBody}>
                  {composition.description.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className={styles.descriptionParagraph}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ) : null}

            {composition.audio && composition.audio.length > 0 ? (
              <section className={styles.section}>
                <h2 className={`tracked-caps ${styles.sectionHeading}`}>
                  Listen
                </h2>
                <ul className={styles.trackList}>
                  {composition.audio.map((track) => (
                    <li key={track.src}>
                      <p className={styles.trackLabel}>{track.label}</p>
                      {/* Native controls: no custom player, no client JS, keyboard-accessible by default. */}
                      <audio controls preload="none" src={track.src} className={styles.audio}>
                        Your browser does not support audio playback.
                      </audio>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {composition.youtube ? (
              <section className={styles.section}>
                <h2 className={`tracked-caps ${styles.sectionHeading}`}>
                  Watch
                </h2>
                <p className={styles.watchParagraph}>
                  <ExternalLink
                    href={composition.youtube.src}
                    className={styles.watchLink}
                  >
                    {composition.youtube.label}
                  </ExternalLink>
                </p>
              </section>
            ) : null}

            {composition.score ? (
              <section className={styles.section}>
                <h2 className={`tracked-caps ${styles.sectionHeading}`}>
                  Score
                </h2>
                <p className={styles.scoreParagraph}>
                  <ExternalLink
                    href={composition.score.src}
                    className={styles.scoreLink}
                  >
                    {composition.score.label}
                  </ExternalLink>
                </p>
              </section>
            ) : null}

          </div>
        </div>

        {related.length > 0 ? (
          <>
            <Divider className={styles.divider} />
            <section className={styles.section}>
              <h2 className={`tracked-caps ${styles.sectionHeading}`}>
                Other works
              </h2>
              <ul className={styles.relatedGrid}>
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
