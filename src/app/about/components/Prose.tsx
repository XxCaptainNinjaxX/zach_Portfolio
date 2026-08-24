import styles from "@/app/about/components/Prose.module.css";

type ProseProps = {
  /** One string per paragraph. */
  paragraphs: readonly string[];
  className?: string;
};

/**
 * Long-form body copy at a constrained measure. 65ch is the readability ceiling
 * for continuous prose — past it the eye loses the line on the return sweep.
 */
export function Prose({ paragraphs, className }: ProseProps) {
  return (
    <div className={`${styles.prose} ${className ?? ""}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
