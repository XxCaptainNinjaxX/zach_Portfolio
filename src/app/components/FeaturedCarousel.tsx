"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CompositionCover } from "@/components/CompositionCover/CompositionCover";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import {
  compositionTypeLabels,
  type Composition,
} from "@/components/data/data";
import styles from "@/app/components/FeaturedCarousel.module.css";

type FeaturedCarouselProps = {
  compositions: Composition[];
  /** Slug of the work the track should start centred on. */
  initialSlug: string;
};

/**
 * The landing page's coverflow.
 *
 * ⚠️ VERIFY: the carousel appears only in the AI-generated mockup. The original
 * hand sketch shows a single static Featured Work panel. If the carousel was an
 * AI invention, this component and its CSS can be deleted and replaced with the
 * sketch's panel.
 *
 * The scroll track is the source of truth, not React state. Buttons scroll the
 * track; the active index is *derived* from scroll position. That inversion is
 * what buys native touch dragging, momentum, trackpad scrolling, and "focus a
 * card and the browser brings it into view" for free — every one of which a
 * state-and-transform carousel has to reimplement, usually badly.
 *
 * Without JavaScript the track is still a horizontally scrolling list of links.
 * The buttons become inert, which is an acceptable trade for a case where
 * scrolling and swiping both still work.
 */
export function FeaturedCarousel({
  compositions,
  initialSlug,
}: FeaturedCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const initialIndex = Math.max(
    0,
    compositions.findIndex((composition) => composition.slug === initialSlug),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  /** Which card's centre is nearest the track's centre. */
  const readActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackCentre = track.scrollLeft + track.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < track.children.length; index += 1) {
      const card = track.children[index] as HTMLElement;
      const cardCentre = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCentre - trackCentre);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    }

    setActiveIndex(nearestIndex);
  }, []);

  const scrollToIndex = useCallback((index: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    const target =
      card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2;

    track.scrollTo({
      left: target,
      behavior: animate ? "smooth" : "auto",
    });
  }, []);

  // Centre the featured work on mount. Instant, not smooth — a page that
  // animates itself on load reads as a glitch.
  useEffect(() => {
    scrollToIndex(initialIndex, false);
  }, [initialIndex, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    function handleScroll() {
      // Coalesce to one read per frame; scroll fires far more often than that.
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        readActiveIndex();
      });
    }

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [readActiveIndex]);

  function move(delta: number) {
    const next = Math.min(
      compositions.length - 1,
      Math.max(0, activeIndex + delta),
    );
    // Read the preference at click time rather than at mount: the user can
    // change it mid-session, and this costs nothing.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    scrollToIndex(next, !prefersReducedMotion);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    // Arrow keys do nothing by default while focus is on a link inside the
    // track, so intercepting them here does not override native behaviour.
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  }

  const active = compositions[activeIndex];
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === compositions.length - 1;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured compositions"
      className={styles.carousel}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.row}>
        <CarouselButton
          direction="previous"
          disabled={atStart}
          onActivate={() => move(-1)}
        />

        <ul
          ref={trackRef}
          className={styles.track}
        >
          {compositions.map((composition, index) => (
            <li key={composition.slug} className={styles.card}>
              <Link
                href={`/compositions/${composition.slug}`}
                tabIndex={0}
                className={`${styles.cardLink} ${
                  index === activeIndex ? "gold-frame-strong" : "gold-frame"
                }`}
              >
                {/*
                  ⚠️ Duplication trap: this sizes hint pairs with
                  width: min(62vw, 17rem) on .card in the module. Change one,
                  change the other.
                */}
                <CompositionCover
                  composition={composition}
                  sizes="(max-width: 640px) 62vw, 17rem"
                />
                <span className="sr-only">{composition.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <CarouselButton
          direction="next"
          disabled={atEnd}
          onActivate={() => move(1)}
        />
      </div>

      {/*
        Announced on change so a screen reader user learns which work is centred
        after pressing next — the visual centring alone tells them nothing.
      */}
      <div aria-live="polite" className={styles.caption}>
        <p className={`tracked-caps ${styles.title}`}>{active.title}</p>
        <p className={`tracked-caps-tight ${styles.meta}`}>
          {active.year} · {compositionTypeLabels[active.type]}
          {active.duration ? ` · ${active.duration}` : ""}
        </p>
        <p className={styles.blurb}>{active.blurb}</p>
      </div>

      <ol className={styles.dots}>
        {compositions.map((composition, index) => (
          <li key={composition.slug}>
            <button
              type="button"
              onClick={() => {
                const prefersReducedMotion = window.matchMedia(
                  "(prefers-reduced-motion: reduce)",
                ).matches;
                scrollToIndex(index, !prefersReducedMotion);
              }}
              aria-label={`Show ${composition.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`${styles.dot} ${
                index === activeIndex ? styles.dotActive : styles.dotInactive
              }`}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

type CarouselButtonProps = {
  direction: "previous" | "next";
  disabled: boolean;
  onActivate: () => void;
};

function CarouselButton({
  direction,
  disabled,
  onActivate,
}: CarouselButtonProps) {
  return (
    <button
      type="button"
      onClick={onActivate}
      disabled={disabled}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} composition`}
      className={styles.navButton}
    >
      {direction === "previous" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}
