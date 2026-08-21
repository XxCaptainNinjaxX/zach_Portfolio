"use client";

import { useMemo, useState } from "react";
import { CompositionCard } from "@/components/CompositionCard/CompositionCard";
import {
  instrumentationLabels,
  type Composition,
  type Instrumentation,
} from "@/components/data/data";

type CompositionBrowserProps = {
  compositions: Composition[];
  /** Only the instrumentations present in the catalogue, so no facet is ever empty. */
  facets: Instrumentation[];
};

type Filter = Instrumentation | "all";

/**
 * Catalogue grid with an instrumentation filter.
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
    return compositions.filter(
      (composition) => composition.instrumentation === filter,
    );
  }, [compositions, filter]);

  // Only worth a filter row when there is more than one thing to filter by.
  const showFilters = facets.length > 1;

  return (
    <div>
      {showFilters ? (
        <div
          role="group"
          aria-label="Filter by instrumentation"
          className="flex flex-wrap gap-x-6 gap-y-3 border-b border-gold-hairline/30 pb-5"
        >
          <FilterButton
            label="All"
            isActive={filter === "all"}
            onSelect={() => setFilter("all")}
          />
          {facets.map((facet) => (
            <FilterButton
              key={facet}
              label={instrumentationLabels[facet]}
              isActive={filter === facet}
              onSelect={() => setFilter(facet)}
            />
          ))}
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "work" : "works"} shown
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
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
      className={`tracked-caps-tight cursor-pointer border-b-2 pb-1 text-[0.65rem] transition-colors ${
        isActive
          ? "border-gold text-gold"
          : "border-transparent text-ink-muted hover:text-gold"
      }`}
    >
      {label}
    </button>
  );
}
