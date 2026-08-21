import { CompositionBrowser } from "@/app/compositions/components/CompositionBrowser";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { byYearDesc, usedInstrumentations } from "@/lib/compositions";

export function Compositions() {
  const catalogue = byYearDesc();

  return (
    <div className="px-5 py-12 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading as="h1" eyebrow="Catalogue">
          Compositions
        </SectionHeading>

        <div className="mt-12">
          <CompositionBrowser
            compositions={catalogue}
            facets={usedInstrumentations()}
          />
        </div>
      </div>
    </div>
  );
}
