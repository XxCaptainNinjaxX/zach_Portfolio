import { FeaturedCarousel } from "@/app/components/FeaturedCarousel";
import { Hero } from "@/app/components/Hero";
import { Flourish } from "@/components/ui/Flourish";
import { carouselOrder, getFeatured } from "@/lib/compositions";
import subpageStyles from "@/app/subpage.module.css";
import styles from "@/app/components/Home.module.css";

export function Home() {
  const featured = getFeatured();
  const carousel = carouselOrder();

  return (
    <div className={subpageStyles.pageShell}>
      {/*
        Three columns on desktop matching the mockup — portrait, flourish,
        carousel — collapsing to a single centred stack below `lg`. The page
        scrolls rather than locking to one screen: a fixed-height hero breaks at
        1366x768 and at any zoom above 125%.
      */}
      <div className={styles.grid}>
        <Hero />

        <div className={styles.flourishColumn}>
          <Flourish className={styles.flourish} />
        </div>

        <div className={styles.carouselColumn}>
          <FeaturedCarousel
            compositions={carousel}
            initialSlug={featured.slug}
          />
        </div>
      </div>
    </div>
  );
}
