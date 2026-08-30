"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Flourish } from "@/components/ui/Flourish";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import type { FeaturedImage } from "@/components/data/data";
import styles from "@/app/components/FeaturedImageRotator.module.css";

const ROTATION_INTERVAL_MS = 4000;

type FeaturedImageRotatorProps = {
  images: FeaturedImage[];
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Crossfades through `images` every 3s, with manual prev/next arrows.
 * Renders index 0 on the server and on first client render so hydration
 * matches; the interval only ever runs client-side, after mount. Clicking
 * an arrow restarts the 3s countdown rather than letting the next
 * already-scheduled tick fire early.
 */
export function FeaturedImageRotator({
  images,
  sizes = "(max-width: 1024px) 80vw, 24rem",
  priority = false,
  className,
}: FeaturedImageRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalIdRef = useRef<number | null>(null);

  const restartTimer = useCallback(() => {
    if (intervalIdRef.current !== null) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (images.length < 2) return;

    // Always rotates regardless of prefers-reduced-motion — only the fade
    // itself is skipped, via globals.css's global transition-duration clamp.
    intervalIdRef.current = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, ROTATION_INTERVAL_MS);
  }, [images.length]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (intervalIdRef.current !== null) {
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [restartTimer]);

  function showImage(index: number) {
    setActiveIndex(index);
    restartTimer();
  }

  function handlePrevious() {
    showImage((activeIndex - 1 + images.length) % images.length);
  }

  function handleNext() {
    showImage((activeIndex + 1) % images.length);
  }

  if (images.length === 0) return null;

  return (
    <div className={`${styles.row} ${className ?? ""}`}>
      {images.length > 1 ? (
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous photo"
          className={styles.navButton}
        >
          <ChevronLeftIcon />
        </button>
      ) : null}

      <div className={`gold-frame ${styles.frame}`}>
        {images.map((image, index) => (
          <div
            key={image.id}
            aria-hidden={index === activeIndex ? undefined : true}
            className={`${styles.layer} ${
              index === activeIndex ? styles.layerActive : styles.layerInactive
            }`}
          >
            {image.src ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                priority={priority && index === 0}
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
        ))}
      </div>

      {images.length > 1 ? (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photo"
          className={styles.navButton}
        >
          <ChevronRightIcon />
        </button>
      ) : null}
    </div>
  );
}
