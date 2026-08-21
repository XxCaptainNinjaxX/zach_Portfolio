import { Flourish } from "@/components/ui/Flourish";

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
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold bg-surface-sunken ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Flourish className="absolute inset-y-0 left-1/2 h-full -translate-x-1/2 text-gold opacity-40" />
      <span
        className="relative font-display leading-none text-gold"
        style={{ fontSize: size * 0.42, letterSpacing: "-0.04em" }}
      >
        ZC
      </span>
    </span>
  );
}
