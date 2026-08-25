"use client";

import { useMemo, useState } from "react";
import { CompositionCard } from "@/components/CompositionCard/CompositionCard";
import {
  compositionTypeLabels,
  type Composition,
  type CompositionType,
} from "@/components/data/data";
import styles from "@/app/compositions/components/CompositionBrowser.module.css";

type CompositionBrowserProps = {
  compositions: Composition[];
  /** Only the types present in the catalogue, so no facet is ever empty. */
  facets: CompositionType[];
};

type Filter = CompositionType | "all";

/**
 * Catalogue grid with a type filter.
 *
 * Filter state is client-side rather than a URL search param on purpose: reading
 * searchParams would make the page dynamic and forfeit static prerendering, and
 * a six-item catalogue does not need shareable filter URLs. Revisit if the
 * catalogue grows past the point where someone would want to link to a facet.
 */
export function CompositionBrowser({
  compositions,
  facets,
}: CompositionBrowserProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return compositions;
    return compositions.filter((composition) => composition.type === filter);
  }, [compositions, filter]);

  // Only worth a filter row when there is more than one thing to filter by.
  const showFilters = facets.length > 1;

  return (
    <div>
      {showFilters ? (
        <div
          role="group"
          aria-label="Filter by type"
          className={styles.filters}
        >
          <FilterButton
            label="All"
            isActive={filter === "all"}
            onSelect={() => setFilter("all")}
          />
          {facets.map((facet) => (
            <FilterButton
              key={facet}
              label={compositionTypeLabels[facet]}
              isActive={filter === facet}
              onSelect={() => setFilter(facet)}
            />
          ))}
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "work" : "works"} shown
      </p>

      <ul className={styles.grid}>
        {visible.map((composition) => (
          <li key={composition.slug}>
            <CompositionCard composition={composition} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type FilterButtonProps = {
  label: string;
  isActive: boolean;
  onSelect: () => void;
};

function FilterButton({ label, isActive, onSelect }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={`tracked-caps-tight ${styles.filterButton} ${
        isActive ? styles.filterButtonActive : styles.filterButtonInactive
      }`}
    >
      {label}
    </button>
  );
}
