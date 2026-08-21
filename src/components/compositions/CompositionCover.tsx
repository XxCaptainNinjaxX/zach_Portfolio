import Image from "next/image";
import { Flourish } from "@/components/ui/Flourish";
import {
  instrumentationLabels,
  type Composition,
} from "@/content/compositions";

type CompositionCoverProps = {
  composition: Composition;
  /** Responsive sizes hint for next/image. Ignored by the placeholder branch. */
  sizes?: string;
  className?: string;
};

/**
 * Cover art for a work.
 *
 * ⚠️ VERIFY: no cover art has been supplied for any composition, so every work
 * currently renders the generated typographic placeholder below. Dropping a file
 * at public/compositions/<slug>.jpg and adding a `cover` field switches an entry
 * to the real image with no code change.
 *
 * The parent must establish the box; this fills it.
 */
export function CompositionCover({
  composition,
  sizes = "(max-width: 640px) 80vw, 320px",
  className,
}: CompositionCoverProps) {
  if (composition.cover) {
    return (
      <Image
        src={composition.cover.src}
        alt={composition.cover.alt}
        fill
        sizes={sizes}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <span
      className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-surface-sunken px-5 text-center ${className ?? ""}`}
    >
      <Flourish className="absolute inset-y-0 left-1/2 h-full -translate-x-1/2 text-gold opacity-15" />
      <span className="relative font-display text-xl leading-tight font-light text-ink">
        {composition.title}
      </span>
      <span className="tracked-caps relative mt-3 text-[0.6rem] text-gold">
        {composition.year} · {instrumentationLabels[composition.instrumentation]}
      </span>
    </span>
  );
}
