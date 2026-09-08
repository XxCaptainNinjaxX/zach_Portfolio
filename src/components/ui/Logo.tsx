import Image from "next/image";
import { site } from "@/components/data/site";
import styles from "@/components/ui/Logo.module.css";

/**
 * The circular "Crawford's Symphonies" mark.
 *
 * Both theme variants are rendered and one is hidden in CSS keyed off
 * [data-theme], rather than picking in JS. The attribute is set pre-paint by
 * ThemeScript, so the CSS swap is correct on first paint; reading the theme in
 * JS would force this to be a client component and hydrate as dark before
 * correcting, popping the wrong mark in light mode.
 */

type LogoProps = {
  /** Rendered diameter in pixels. */
  size?: number;
  className?: string;
};

export function Logo({ size = 56, className }: LogoProps) {
  return (
    <span
      className={`${styles.badge} ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/*
        priority on both: the header is above the fold, and next/image's default
        lazy loading waits on hydration, which would pop the mark in late. The
        hidden variant is fetched either way — the accepted cost of the
        flash-free CSS swap, and the optimised output is a few KB.
      */}
      <Image
        src={site.logo.dark}
        alt=""
        width={960}
        height={720}
        sizes="128px"
        priority
        className={`${styles.mark} ${styles.darkMark}`}
      />
      <Image
        src={site.logo.light}
        alt=""
        width={960}
        height={720}
        sizes="128px"
        priority
        className={`${styles.mark} ${styles.lightMark}`}
      />
    </span>
  );
}
