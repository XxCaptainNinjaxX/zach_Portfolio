import type { ReactNode } from "react";
import styles from "@/app/compositions/[slug]/components/MetaRow.module.css";

export type MetaEntry = {
  label: string;
  value: ReactNode;
};

type MetaRowProps = {
  entries: MetaEntry[];
  className?: string;
};

/**
 * Label/value pairs for work metadata — year, duration, scoring.
 * A description list rather than a table: these are term/definition pairs, and
 * <dl> gives screen readers that relationship for free.
 *
 * Entries with an empty value are dropped by the caller, not here, so the
 * component stays a pure renderer.
 */
export function MetaRow({ entries, className }: MetaRowProps) {
  if (entries.length === 0) return null;

  return (
    <dl className={`${styles.list} ${className ?? ""}`}>
      {entries.map((entry) => (
        <div key={entry.label} className={styles.entry}>
          <dt className={`tracked-caps-tight ${styles.label}`}>
            {entry.label}
          </dt>
          <dd className={styles.value}>{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}
