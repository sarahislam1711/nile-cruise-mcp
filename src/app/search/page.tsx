"use client";

import { useMemo, useState } from "react";
import { FLEET, FLEET_TOTAL, type Vessel } from "@/lib/fleet";
import { Masthead, Record, Foot, SampleNote } from "@/components/chrome";
import { Filters, DEFAULT_FILTERS, type FilterState } from "@/components/filters";

type SortKey = "reading" | "price-asc" | "price-desc" | "rating" | "nights";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "reading", label: "Reading, highest first" },
  { key: "price-asc", label: "Price, lowest first" },
  { key: "price-desc", label: "Price, highest first" },
  { key: "rating", label: "Guest rating" },
  { key: "nights", label: "Length of voyage" },
];

function applyFilters(fleet: Vessel[], f: FilterState): Vessel[] {
  return fleet.filter((v) => {
    if (f.route !== "all" && v.route !== f.route) return false;
    if (f.nights !== null && v.nights !== f.nights) return false;
    if (v.total < f.floor) return false;
    if (v.price > f.priceMax) return false;
    if (v.rating < f.minRating) return false;
    if (f.amenities.length && !f.amenities.every((a) => v.amenities.includes(a)))
      return false;
    return true;
  });
}

function applySort(fleet: Vessel[], key: SortKey): Vessel[] {
  const out = [...fleet];
  switch (key) {
    case "price-asc": return out.sort((a, b) => a.price - b.price);
    case "price-desc": return out.sort((a, b) => b.price - a.price);
    case "rating": return out.sort((a, b) => b.rating - a.rating);
    case "nights": return out.sort((a, b) => a.nights - b.nights);
    default: return out.sort((a, b) => b.total - a.total);
  }
}

export default function SearchPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>("reading");
  const [panelOpen, setPanelOpen] = useState(false);

  const results = useMemo(
    () => applySort(applyFilters(FLEET, filters), sort),
    [filters, sort]
  );

  return (
    <div className="relative flex-1 flex flex-col">
      <Masthead />

      <main className="px-span md:px-reach pb-fathom flex-1">
        <div className="pt-cubit">
          <h1
            className="station__title"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, var(--t-flood))" }}
          >
            The register
          </h1>
          <p className="lede">
            {FLEET_TOTAL} audited vessels, ordered by reading.{" "}
            <strong>Narrow it by what you actually care about.</strong>
          </p>
        </div>

        <div className="mt-fathom grid gap-fathom lg:grid-cols-[18rem_minmax(0,1fr)] items-start">
          {/* Filters — a sidebar on desktop, a panel on phones */}
          <div className="lg:hidden">
            <button
              type="button"
              className="plate plate--quiet w-full"
              onClick={() => setPanelOpen((o) => !o)}
              aria-expanded={panelOpen}
              aria-controls="filter-panel"
            >
              {panelOpen ? "Hide filters" : "Filters"}
              <span className="rubric">
                {results.length} of {FLEET.length}
              </span>
            </button>
          </div>

          <aside
            id="filter-panel"
            className={`${panelOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-foot lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto contain-scroll lg:pe-foot`}
            aria-label="Filters"
          >
            <Filters
              value={filters}
              onChange={setFilters}
              resultCount={results.length}
            />
          </aside>

          <section aria-labelledby="results-heading" className="min-w-0">
            <div
              className="flex items-end justify-between gap-foot pb-finger flex-wrap"
              style={{ borderBottom: "var(--rule-mid) solid var(--rule-ink)" }}
            >
              <h2
                id="results-heading"
                className="flex items-baseline gap-palm"
                style={{
                  fontFamily: "var(--font-record)",
                  fontSize: "var(--t-cubit)",
                  fontWeight: 600,
                  letterSpacing: "var(--tr-cubit)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                <span className="tabular">{results.length}</span>
                <span style={{ fontSize: "var(--t-record)", fontWeight: 500 }}>
                  {results.length === 1 ? "vessel" : "vessels"}
                  {results.length !== FLEET.length && (
                    <span className="text-ink-tertiary"> of {FLEET.length}</span>
                  )}
                </span>
              </h2>
              <div className="flex items-center gap-finger">
                <label htmlFor="sort" className="rubric">Order by</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="px-palm text-fine bg-[var(--paper-sunk)]"
                  style={{
                    minHeight: "var(--touch-min)",
                    border: "var(--rule-thin) solid var(--rule-plain)",
                    borderRadius: "var(--radius-control)",
                  }}
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="py-flood text-center">
                <p
                  className="font-[family-name:var(--font-record)] m-0"
                  style={{ fontSize: "var(--t-record)", fontWeight: 500 }}
                >
                  No vessel in the register meets these terms.
                </p>
                <p className="text-fine text-ink-secondary mt-palm mb-foot max-w-[46ch] mx-auto">
                  Every filter narrows the same 79 readings. Relaxing the
                  quality floor or raising the price ceiling will usually open
                  the register again.
                </p>
                <div className="flex flex-wrap gap-palm justify-center">
                  <button
                    type="button"
                    className="plate plate--primary"
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                  >
                    Clear every filter
                  </button>
                  <a href="/request" className="plate plate--quiet no-underline">
                    Post an anonymous request instead
                  </a>
                </div>
              </div>
            ) : (
              <>
                {results.map((v) => (
                  <Record key={v.slug} vessel={v} />
                ))}
                <SampleNote />

                {/* The register ends on a reckoning, not blank paper. */}
                <div
                  className="mt-cubit pt-foot flex flex-wrap items-end justify-between gap-foot"
                  style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
                >
                  <div>
                    <p className="pull">
                      Nothing here meets your terms exactly?
                    </p>
                    <p className="text-fine text-ink-secondary mt-palm mb-0 max-w-[46ch]">
                      Post your terms instead and let operators bid against the
                      same scale you have just read.
                    </p>
                  </div>
                  <a href="/request" className="plate plate--primary no-underline">
                    Post an anonymous request
                  </a>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <Foot />
    </div>
  );
}
