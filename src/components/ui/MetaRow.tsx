import type { ReactNode } from "react";

export type MetaEntry = {
  label: string;
  value: ReactNode;
};

type MetaRowProps = {
  entries: MetaEntry[];
  className?: string;
};

/**
 * Label/value pairs for work metadata — year, duration, scoring, premiere.
 * A description list rather than a table: these are term/definition pairs, and
 * <dl> gives screen readers that relationship for free.
 *
 * Entries with an empty value are dropped by the caller, not here, so the
 * component stays a pure renderer.
 */
export function MetaRow({ entries, className }: MetaRowProps) {
  if (entries.length === 0) return null;

  return (
    <dl className={`space-y-3 ${className ?? ""}`}>
      {entries.map((entry) => (
        <div key={entry.label} className="grid grid-cols-[7rem_1fr] gap-4">
          <dt className="tracked-caps-tight pt-0.5 text-[0.65rem] text-gold">
            {entry.label}
          </dt>
          <dd className="text-sm text-ink-muted">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}
