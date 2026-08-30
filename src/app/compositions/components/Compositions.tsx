import { CompositionBrowser } from "@/app/compositions/components/CompositionBrowser";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { catalogueOrder, compositionTypeOrder } from "@/lib/compositions";
import subpageStyles from "@/app/subpage.module.css";
import styles from "@/app/compositions/components/Compositions.module.css";

export function Compositions() {
  const catalogue = catalogueOrder();

  return (
    <div className={subpageStyles.pageShell}>
      <div className={styles.column}>
        <SectionHeading as="h1" eyebrow="Catalogue">
          Compositions
        </SectionHeading>

        <div className={styles.browser}>
          <CompositionBrowser
            compositions={catalogue}
            facets={compositionTypeOrder}
          />
        </div>
      </div>
    </div>
  );
}
