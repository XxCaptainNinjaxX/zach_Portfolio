import Link from "next/link";
import { FeaturedImageRotator } from "@/app/components/FeaturedImageRotator";
import { site } from "@/components/data/site";
import { getFeaturedImages } from "@/lib/featuredImages";
import styles from "@/app/components/Hero.module.css";

/**
 * Rotating photos plus a short introduction.
 *
 * The intro paragraph comes from the original hand sketch, which shows a block
 * of body copy beside the photo. The AI mockup dropped it and captioned the
 * photo "Professional Photo" instead — a slot label, not content. Treating the
 * sketch as the intent here.
 */
export function Hero() {
  const images = getFeaturedImages();

  return (
    <div className={styles.hero}>
      <FeaturedImageRotator
        images={images}
        priority
        className={styles.portrait}
      />

      <p className={styles.bio}>{site.bioShort}</p>

      <Link href="/about" className={`tracked-caps-tight ${styles.aboutLink}`}>
        More about {site.name.split(" ")[0]}
      </Link>
    </div>
  );
}
