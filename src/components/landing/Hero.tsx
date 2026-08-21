import Link from "next/link";
import { Portrait } from "@/components/ui/Portrait";
import { site } from "@/content/site";

/**
 * Portrait plus a short introduction.
 *
 * The intro paragraph comes from the original hand sketch, which shows a block
 * of body copy beside the photo. The AI mockup dropped it and captioned the
 * photo "Professional Photo" instead — a slot label, not content. Treating the
 * sketch as the intent here.
 */
export function Hero() {
  return (
    <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
      <Portrait priority className="w-full max-w-sm" />

      <p className="max-w-sm leading-relaxed text-ink-muted">{site.bioShort}</p>

      <Link
        href="/about"
        className="tracked-caps-tight border-b border-gold pb-1 text-[0.65rem] text-gold transition-opacity hover:opacity-70"
      >
        More about {site.name.split(" ")[0]}
      </Link>
    </div>
  );
}
