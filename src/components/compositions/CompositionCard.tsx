import Link from "next/link";
import { CompositionCover } from "@/components/compositions/CompositionCover";
import {
  instrumentationLabels,
  type Composition,
} from "@/content/compositions";

type CompositionCardProps = {
  composition: Composition;
  className?: string;
};

/**
 * Shared card for a single work. Used by the catalogue grid, the landing
 * carousel, and the related-works strip — three call sites, one treatment, which
 * is why it lives in its own component rather than being written inline.
 */
export function CompositionCard({
  composition,
  className,
}: CompositionCardProps) {
  return (
    <Link
      href={`/compositions/${composition.slug}`}
      className={`group flex flex-col ${className ?? ""}`}
    >
      <span className="gold-frame relative block aspect-square w-full overflow-hidden">
        <CompositionCover composition={composition} />
      </span>

      <span className="mt-5 block font-display text-lg leading-tight font-light text-ink transition-colors group-hover:text-gold">
        {composition.title}
      </span>

      <span className="tracked-caps-tight mt-2 block text-[0.65rem] text-gold">
        {composition.year} · {instrumentationLabels[composition.instrumentation]}
        {composition.duration ? ` · ${composition.duration}` : ""}
      </span>

      <span className="mt-3 block text-sm leading-relaxed text-ink-muted">
        {composition.blurb}
      </span>
    </Link>
  );
}
