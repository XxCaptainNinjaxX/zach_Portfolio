import Image from "next/image";
import { Flourish } from "@/components/ui/Flourish";
import { site } from "@/components/data/site";

type PortraitProps = {
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  /** Set on the largest above-the-fold instance to skip lazy loading. */
  priority?: boolean;
  className?: string;
};

/**
 * The professional photo in its gold double frame.
 *
 * ⚠️ VERIFY: no confirmed photo asset. While site.portrait.src is null this
 * renders a labelled placeholder rather than a broken image, so the layout is
 * reviewable before the real file exists. Setting the path in content/site.ts
 * switches it over with no code change.
 */
export function Portrait({
  sizes = "(max-width: 1024px) 80vw, 28rem",
  priority = false,
  className,
}: PortraitProps) {
  return (
    <figure className={className}>
      <div className="gold-frame relative aspect-square w-full overflow-hidden">
        {site.portrait.src ? (
          <Image
            src={site.portrait.src}
            alt={site.portrait.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-sunken">
            <Flourish className="absolute inset-y-0 left-1/2 h-full -translate-x-1/2 text-gold opacity-15" />
            <p className="tracked-caps relative text-[0.6rem] text-gold">
              Photograph pending
            </p>
          </div>
        )}
      </div>

      {site.portrait.credit ? (
        <figcaption className="mt-3 text-[0.65rem] text-ink-muted">
          Photograph by {site.portrait.credit}
        </figcaption>
      ) : null}
    </figure>
  );
}
