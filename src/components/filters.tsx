"use client";

import { useId } from "react";
import { AMENITIES, BANDS, ROUTES } from "@/lib/fleet";

export interface FilterState {
  route: string;
  nights: number | null;
  floor: number;
  priceMax: number;
  amenities: string[];
  minRating: number;
}

export const DEFAULT_FILTERS: FilterState = {
  route: "all",
  nights: null,
  floor: 40,
  priceMax: 10000,
  amenities: [],
  minRating: 0,
};

const controlStyle = {
  minHeight: "var(--touch-min)",
  border: "var(--rule-thin) solid var(--rule-plain)",
  borderRadius: "var(--radius-control)",
} as const;

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      className="m-0 p-0 pt-foot mt-foot"
      style={{ border: 0, borderTop: "var(--rule-thin) solid var(--rule-quiet)" }}
    >
      <legend className="rubric p-0 mb-palm">{legend}</legend>
      {children}
    </fieldset>
  );
}

export function Filters({
  value,
  onChange,
  resultCount,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
}) {
  const uid = useId();
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) =>
    onChange({ ...value, [k]: v });

  const toggleAmenity = (a: string) =>
    set(
      "amenities",
      value.amenities.includes(a)
        ? value.amenities.filter((x) => x !== a)
        : [...value.amenities, a]
    );

  const dirty =
    JSON.stringify(value) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <div>
      <div
        className="flex items-baseline justify-between gap-palm pb-finger"
        style={{ borderBottom: "var(--rule-mid) solid var(--rule-ink)" }}
      >
        <h2 style={{ fontSize: "var(--t-record)", fontWeight: 600, margin: 0 }}>
          Narrow the register
        </h2>
      </div>

      <Fieldset legend="Route">
        <div className="grid gap-finger">
          {["all", ...ROUTES].map((r) => (
            <label key={r} className="flex items-center gap-finger cursor-pointer">
              <input
                type="radio"
                name={`${uid}-route`}
                checked={value.route === r}
                onChange={() => set("route", r)}
                className="accent-[var(--lapis)]"
              />
              <span className="text-fine">
                {r === "all" ? "All routes" : r}
              </span>
            </label>
          ))}
        </div>
      </Fieldset>

      <Fieldset legend="Nights">
        <div className="flex flex-wrap gap-finger">
          {[null, 3, 4, 5].map((n) => (
            <label
              key={String(n)}
              className="cursor-pointer"
              style={{ minHeight: "var(--touch-min)" }}
            >
              <input
                type="radio"
                name={`${uid}-nights`}
                checked={value.nights === n}
                onChange={() => set("nights", n)}
                className="sr-only peer"
              />
              <span
                className="inline-flex items-center justify-center px-foot text-fine tabular
                           peer-focus-visible:outline peer-focus-visible:outline-2
                           peer-focus-visible:outline-[var(--lapis)]"
                style={{
                  minHeight: "var(--touch-min)",
                  border: "var(--rule-thin) solid var(--rule-plain)",
                  borderRadius: "var(--radius-control)",
                  background:
                    value.nights === n ? "var(--lapis)" : "transparent",
                  color: value.nights === n ? "var(--paper)" : "var(--ink)",
                }}
              >
                {n === null ? "Any" : n}
              </span>
            </label>
          ))}
        </div>
      </Fieldset>

      <Fieldset legend="Quality floor">
        <div className="grid gap-finger">
          <label className="flex items-center gap-finger cursor-pointer">
            <input
              type="radio"
              name={`${uid}-floor`}
              checked={value.floor === 40}
              onChange={() => set("floor", 40)}
              className="accent-[var(--lapis)]"
            />
            <span className="text-fine">Any reading</span>
          </label>
          {BANDS.map((b) => (
            <label
              key={b.key}
              className="flex items-center gap-finger cursor-pointer"
            >
              <input
                type="radio"
                name={`${uid}-floor`}
                checked={value.floor === b.min}
                onChange={() => set("floor", b.min)}
                className="accent-[var(--lapis)]"
              />
              <span
                className={`band-${b.key} relative inline-block h-finger w-finger shrink-0 overflow-hidden`}
                aria-hidden="true"
              />
              <span className="text-fine">
                {b.name} and above
                <span className="text-ink-tertiary tabular">
                  {" "}
                  &mdash; {b.min.toFixed(2)}
                </span>
              </span>
            </label>
          ))}
        </div>
      </Fieldset>

      <Fieldset legend="Price ceiling">
        <label htmlFor={`${uid}-price`} className="sr-only">
          Maximum price per person per night in EGP
        </label>
        <input
          id={`${uid}-price`}
          type="range"
          min={1500}
          max={10000}
          step={100}
          value={value.priceMax}
          onChange={(e) => set("priceMax", Number(e.target.value))}
          className="w-full accent-[var(--lapis)]"
          style={{ minHeight: "var(--touch-min)" }}
        />
        <div className="flex justify-between text-micro text-ink-tertiary tabular">
          <span>1,500</span>
          <span
            className="font-[family-name:var(--font-record)]"
            style={{ fontSize: "var(--t-fine)", fontWeight: 600, color: "var(--ink)" }}
          >
            up to {value.priceMax.toLocaleString("en-GB")} EGP
          </span>
          <span>10,000</span>
        </div>
      </Fieldset>

      <Fieldset legend="Guest rating">
        <label htmlFor={`${uid}-rating`} className="sr-only">
          Minimum guest rating
        </label>
        <input
          id={`${uid}-rating`}
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={value.minRating}
          onChange={(e) => set("minRating", Number(e.target.value))}
          className="w-full accent-[var(--lapis)]"
          style={{ minHeight: "var(--touch-min)" }}
        />
        <p className="text-micro text-ink-tertiary tabular m-0">
          {value.minRating === 0
            ? "Any rating"
            : `${value.minRating.toFixed(1)} and above`}
        </p>
      </Fieldset>

      <Fieldset legend="Amenities">
        <div className="grid gap-finger">
          {AMENITIES.map((a) => (
            <label key={a} className="flex items-center gap-finger cursor-pointer">
              <input
                type="checkbox"
                checked={value.amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
                className="accent-[var(--lapis)]"
              />
              <span className="text-fine">{a}</span>
            </label>
          ))}
        </div>
      </Fieldset>

      <div
        className="mt-foot pt-foot flex items-center justify-between gap-palm flex-wrap"
        style={{ borderTop: "var(--rule-mid) solid var(--rule-ink)" }}
      >
        <span className="rubric">
          {resultCount} {resultCount === 1 ? "vessel" : "vessels"}
        </span>
        <button
          type="button"
          className="plate plate--quiet"
          onClick={() => onChange(DEFAULT_FILTERS)}
          disabled={!dirty}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export { controlStyle };
