import Image from "next/image";
import { Flourish } from "@/components/ui/Flourish";
import { site } from "@/components/data/site";
import styles from "@/components/ui/Portrait.module.css";

type PortraitProps = {
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  /** Set on the largest above-the-fold instance to skip lazy loading. */
  priority?: boolean;
  className?: string;
};

/**
 * The professional photo in its gold double frame.
 *
 * ⚠️ VERIFY: no confirmed photo asset. While site.portrait.src is null this
 * renders a labelled placeholder rather than a broken image, so the layout is
 * reviewable before the real file exists. Setting the path in content/site.ts
 * switches it over with no code change.
 */
export function Portrait({
  sizes = "(max-width: 1024px) 80vw, 28rem",
  priority = false,
  className,
}: PortraitProps) {
  return (
    <figure className={className}>
      <div className={`gold-frame ${styles.frame}`}>
        {site.portrait.src ? (
          <Image
            src={site.portrait.src}
            alt={site.portrait.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <Flourish className={styles.flourish} />
            <p className={`tracked-caps ${styles.label}`}>
              Photograph pending
            </p>
          </div>
        )}
      </div>

      {site.portrait.credit ? (
        <figcaption className={styles.credit}>
          Photograph by {site.portrait.credit}
        </figcaption>
      ) : null}
    </figure>
  );
}
