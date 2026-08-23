/**
 * The thin gold rule inset from the viewport edge that encloses the whole page
 * in the mockup.
 *
 * Fixed rather than absolute so it behaves as viewport chrome — it stays put
 * while content scrolls, instead of scrolling away with the first screenful.
 * pointer-events-none keeps it from intercepting clicks near the edges.
 *
 * z-20 puts it over page content (z-auto) but under the header (z-30) and the
 * menu drawer inside it, so the rule does not draw across the open panel.
 */
import styles from "@/components/PageFrame/PageFrame.module.css";

export function PageFrame() {
  return <div aria-hidden="true" className={styles.frame} />;
}
