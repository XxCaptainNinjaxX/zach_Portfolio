import type { ReactNode } from "react";
import styles from "@/components/ui/SectionHeading.module.css";

type SectionHeadingProps = {
  children: ReactNode;
  /** Rendered element. Pages use h1, sections within a page use h2. */
  as?: "h1" | "h2" | "h3";
  /** Optional line under the heading, e.g. a page subtitle. */
  eyebrow?: string;
  className?: string;
};

/** Tracked caps in the display face, with the gold rule the mockup puts under headings. */
export function SectionHeading({
  children,
  as: Element = "h2",
  eyebrow,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className={`tracked-caps ${styles.eyebrow}`}>{eyebrow}</p>
      ) : null}
      <Element className={`tracked-caps ${styles.heading}`}>{children}</Element>
      <span aria-hidden="true" className={styles.rule} />
    </div>
  );
}
