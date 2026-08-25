import Image from "next/image";
import { Flourish } from "@/components/ui/Flourish";
import {
  compositionTypeLabels,
  type Composition,
} from "@/components/data/data";
import styles from "@/components/CompositionCover/CompositionCover.module.css";

type CompositionCoverProps = {
  composition: Composition;
  /** Responsive sizes hint for next/image. Ignored by the placeholder branch. */
  sizes?: string;
  className?: string;
};

/**
 * Cover art for a work.
 *
 * ⚠️ VERIFY: no cover art has been supplied for any composition, so every work
 * currently renders the generated typographic placeholder below. Dropping a file
 * at public/compositions/<slug>.jpg and setting the `image` field switches an
 * entry to the real image with no code change.
 *
 * The parent must establish the box; this fills it.
 */
export function CompositionCover({
  composition,
  sizes = "(max-width: 640px) 80vw, 320px",
  className,
}: CompositionCoverProps) {
  if (composition.image) {
    return (
      <Image
        src={composition.image}
        alt={`${composition.title} cover art`}
        fill
        sizes={sizes}
        className={`${styles.image} ${className ?? ""}`}
      />
    );
  }

  return (
    <span className={`${styles.placeholder} ${className ?? ""}`}>
      <Flourish className={styles.flourish} />
      <span className={styles.placeholderTitle}>{composition.title}</span>
      <span className={`tracked-caps ${styles.placeholderMeta}`}>
        {composition.year} · {compositionTypeLabels[composition.type]}
      </span>
    </span>
  );
}
