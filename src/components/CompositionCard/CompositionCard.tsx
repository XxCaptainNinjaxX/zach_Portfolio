import Link from "next/link";
import { CompositionCover } from "@/components/CompositionCover/CompositionCover";
import {
  compositionTypeLabels,
  type Composition,
} from "@/components/data/data";
import styles from "@/components/CompositionCard/CompositionCard.module.css";

type CompositionCardProps = {
  composition: Composition;
  className?: string;
};

/**
 * Shared card for a single work. Used by the catalogue grid, the landing
 * carousel, and the related-works strip — three call sites, one treatment, which
 * is why it lives in its own component rather than being written inline.
 */
export function CompositionCard({
  composition,
  className,
}: CompositionCardProps) {
  return (
    <Link
      href={`/compositions/${composition.slug}`}
      className={`${styles.card} ${className ?? ""}`}
    >
      <span className={`gold-frame ${styles.cover}`}>
        <CompositionCover composition={composition} />
      </span>

      <span className={styles.title}>{composition.title}</span>

      <span className={`tracked-caps-tight ${styles.meta}`}>
        {composition.year} · {compositionTypeLabels[composition.type]}
        {composition.duration ? ` · ${composition.duration}` : ""}
      </span>

      <span className={styles.blurb}>
        {composition.blurb}
      </span>
    </Link>
  );
}
