import styles from "@/components/ui/Divider.module.css";

type DividerProps = {
  className?: string;
};

/** Horizontal gold hairline with a centred diamond, used between page sections. */
export function Divider({ className }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.divider} ${className ?? ""}`}
    >
      <span className={styles.line} />
      <span className={styles.diamond} />
      <span className={styles.line} />
    </div>
  );
}
