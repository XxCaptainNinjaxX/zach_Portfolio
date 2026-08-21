import { FeaturedCarousel } from "@/components/landing/FeaturedCarousel";
import { Hero } from "@/components/landing/Hero";
import { Flourish } from "@/components/ui/Flourish";
import { carouselOrder, getFeatured } from "@/lib/compositions";

export default function LandingPage() {
  const featured = getFeatured();
  const carousel = carouselOrder();

  return (
    <div className="px-5 py-12 sm:px-8 lg:py-20">
      {/*
        Three columns on desktop matching the mockup — portrait, flourish,
        carousel — collapsing to a single centred stack below `lg`. The page
        scrolls rather than locking to one screen: a fixed-height hero breaks at
        1366x768 and at any zoom above 125%.
      */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,8rem)_minmax(0,1fr)] lg:gap-8 xl:gap-14">
        <Hero />

        <div className="flex justify-center lg:h-104">
          <Flourish className="h-40 lg:h-full" />
        </div>

        <div className="min-w-0">
          <FeaturedCarousel
            compositions={carousel}
            initialSlug={featured.slug}
          />
        </div>
      </div>
    </div>
  );
}
