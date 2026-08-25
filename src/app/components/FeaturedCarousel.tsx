"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

// Single-step travel takes this long; longer jumps multiply it, capped
// below. Beyond SATURATION_STEPS the trip is compressed to stay under the
// cap, and that is also where the velocity blur reaches its peak.
const STEP_BASE_DURATION_MS = 320;
const TOTAL_DURATION_CAP_MS = 1000;
const MAX_BLUR_PX = 6;
const SATURATION_STEPS = Math.ceil(TOTAL_DURATION_CAP_MS / STEP_BASE_DURATION_MS);

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

/** Steps and direction along the shorter side of the ring. */
function shortestPath(current: number, target: number, length: number) {
  const forwardSteps = wrapIndex(target - current, length);
  const backwardSteps = wrapIndex(current - target, length);
  return forwardSteps <= backwardSteps
    ? { direction: 1 as const, steps: forwardSteps }
    : { direction: -1 as const, steps: backwardSteps };
}

function stepDurationFor(totalSteps: number) {
  const total = Math.min(STEP_BASE_DURATION_MS * totalSteps, TOTAL_DURATION_CAP_MS);
  return total / totalSteps;
}

function blurPeakFor(totalSteps: number) {
  if (totalSteps <= 1) return 0;
  const ratio = Math.min(1, (totalSteps - 1) / (SATURATION_STEPS - 1));
  return MAX_BLUR_PX * ratio;
}

/**
 * The landing page's coverflow.
 *
 * `activeIndex` is the source of truth — three cards render at a time
 * (the active work centred, one rotated neighbour on each side) and are
 * recomputed from it. Clicking a flanking card re-centres it rather than
 * navigating; only the centred card is a real link.
 *
 * Multi-step jumps (a dot click that skips several works) travel through
 * every intermediate index one step at a time rather than cutting straight
 * to the target, always along the shorter side of the ring. Each step is a
 * plain activeIndex change with a CSS transition doing the visual work; a
 * setTimeout chain paces the steps. If the target changes mid-travel the
 * in-flight step finishes (no visual snap) and the next tick recomputes
 * its path from wherever the strip lands, so the new target always wins.
 */
export function FeaturedCarousel({
  compositions,
  initialSlug,
}: FeaturedCarouselProps) {
  const initialIndex = Math.max(
    0,
    compositions.findIndex((composition) => composition.slug === initialSlug),
  );

  const activeIndexRef = useRef(initialIndex);
  const targetIndexRef = useRef(initialIndex);
  const legTotalStepsRef = useRef(0);
  const legStepRef = useRef(0);
  const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndexState] = useState(initialIndex);
  const [stepDurationMs, setStepDurationMs] = useState(STEP_BASE_DURATION_MS);
  const [travelBlurPx, setTravelBlurPx] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);

  useEffect(() => {
    return () => {
      if (stepTimerRef.current !== null) {
        clearTimeout(stepTimerRef.current);
      }
    };
  }, []);

  function setActiveIndex(nextIndex: number) {
    activeIndexRef.current = nextIndex;
    setActiveIndexState(nextIndex);
  }

  function runNextStep() {
    const length = compositions.length;
    const current = activeIndexRef.current;
    const { direction, steps } = shortestPath(current, targetIndexRef.current, length);

    if (steps === 0) {
      stepTimerRef.current = null;
      legTotalStepsRef.current = 0;
      legStepRef.current = 0;
      setIsTraveling(false);
      setTravelBlurPx(0);
      return;
    }

    // A fresh leg starts on the first step, and again whenever the
    // remaining distance doesn't match what continuing the current leg
    // would predict — that mismatch means the target changed mid-travel.
    const expectedRemaining = legTotalStepsRef.current - legStepRef.current;
    if (legTotalStepsRef.current === 0 || steps !== expectedRemaining) {
      legTotalStepsRef.current = steps;
      legStepRef.current = 0;
    }
    legStepRef.current += 1;

    const duration = stepDurationFor(legTotalStepsRef.current);
    const peak = blurPeakFor(legTotalStepsRef.current);
    const progress = legStepRef.current / legTotalStepsRef.current;
    const triangle = progress <= 0.5 ? progress * 2 : (1 - progress) * 2;

    setIsTraveling(true);
    setStepDurationMs(duration);
    setTravelBlurPx(peak * triangle);
    setActiveIndex(wrapIndex(current + direction, length));

    stepTimerRef.current = setTimeout(runNextStep, duration);
  }

  function travelTo(target: number) {
    const length = compositions.length;
    targetIndexRef.current = wrapIndex(target, length);

    // Already travelling: just update the target. The scheduled step
    // finishes on its own timer and picks up the new target on its next
    // tick — that's what supersedes the stale one, not a restart here.
    if (stepTimerRef.current !== null) return;

    runNextStep();
  }

  function move(delta: number) {
    travelTo(activeIndexRef.current + delta);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    // Arrow keys do nothing by default while focus is on a link or button
    // inside the stage, so intercepting them here does not override native
    // behaviour.
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  }

  const active = compositions[activeIndex];

  const totalCompositions = compositions.length;
  // Below 3 works there's no room for two distinct neighbours to wrap to,
  // so the ring collapses back to clamped edges rather than duplicating a
  // card into both flanking slots.
  const canWrap = totalCompositions > 2;
  const offsets = canWrap
    ? [-1, 0, 1]
    : [-1, 0, 1].filter(
        (offset) => activeIndex + offset >= 0 && activeIndex + offset < totalCompositions,
      );
  const visibleCards = offsets.map((offset) => {
    const index = canWrap
      ? wrapIndex(activeIndex + offset, totalCompositions)
      : activeIndex + offset;
    return { composition: compositions[index], index, offset };
  });

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
          disabled={totalCompositions <= 1}
          onActivate={() => move(-1)}
        />

        <div
          className={styles.stage}
          style={
            {
              "--step-duration": `${stepDurationMs}ms`,
              "--travel-blur": `${travelBlurPx}px`,
              willChange: isTraveling ? "filter" : undefined,
            } as React.CSSProperties
          }
        >
          {visibleCards.map(({ composition, index, offset }) => {
            const isCenter = offset === 0;
            const positionClass = isCenter
              ? styles.cardCenter
              : offset < 0
                ? styles.cardLeft
                : styles.cardRight;

            /*
              ⚠️ Duplication trap: this sizes hint pairs with the
              --card-width custom property on .stage in the module. Change
              one, change the other.
            */
            const cover = (
              <CompositionCover
                composition={composition}
                sizes="(max-width: 640px) 62vw, 17rem"
              />
            );

            return (
              <div
                key={composition.slug}
                className={`${styles.card} ${positionClass}`}
                style={{ willChange: isTraveling ? "transform" : undefined }}
              >
                {isCenter ? (
                  <Link
                    href={`/compositions/${composition.slug}`}
                    tabIndex={0}
                    className={`${styles.cardLink} gold-frame-strong`}
                  >
                    {cover}
                    <span className="sr-only">{composition.title}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => travelTo(index)}
                    aria-label={`Show ${offset < 0 ? "previous" : "next"} work: ${composition.title}`}
                    className={`${styles.cardLink} gold-frame`}
                  >
                    {cover}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <CarouselButton
          direction="next"
          disabled={totalCompositions <= 1}
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
              onClick={() => travelTo(index)}
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
