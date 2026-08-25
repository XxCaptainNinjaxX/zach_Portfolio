"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Flourish } from "@/components/ui/Flourish";
import type { FeaturedImage } from "@/components/data/data";
import styles from "@/app/components/FeaturedImageRotator.module.css";

const ROTATION_INTERVAL_MS = 3000;

type FeaturedImageRotatorProps = {
  images: FeaturedImage[];
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Crossfades through `images` every 3s, display-only. Renders index 0 on the
 * server and on first client render so hydration matches; the interval only
 * ever runs client-side, after mount.
 */
export function FeaturedImageRotator({
  images,
  sizes = "(max-width: 1024px) 80vw, 24rem",
  priority = false,
  className,
}: FeaturedImageRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className={`gold-frame ${styles.frame} ${className ?? ""}`}>
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
  );
}
