import { Flourish } from "@/components/ui/Flourish";
import styles from "@/components/ui/Logo.module.css";

/**
 * The circular ZC badge.
 *
 * ⚠️ VERIFY: placeholder. No confirmed logo asset exists. This is a CSS-drawn
 * monogram with the flourish motif behind it, matching the mockup's composition.
 * When a real vector mark arrives, this component's internals are replaced and
 * nothing that consumes it changes.
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
      <Flourish className={styles.flourish} />
      <span
        className={styles.monogram}
        style={{ fontSize: size * 0.42, letterSpacing: "-0.04em" }}
      >
        ZC
      </span>
    </span>
  );
}
