"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import {
  DIMENSIONS,
  bandOf,
  fmtEGP,
  vesselBySlug,
  type DimKey,
  type Vessel,
} from "@/lib/fleet";
import { BandLabel } from "@/components/score";
import { Masthead, Foot } from "@/components/chrome";
import { useCompare } from "@/components/compare-context";

/* Divergence is judged against the widest gap in this particular
   comparison, not an absolute threshold. Two closely matched vessels
   still have a dimension that separates them most, and that is the
   one the reader wants; dimming every row because the boats are
   similar tells them nothing and looks broken. */

function spread(vessels: Vessel[], key: DimKey) {
  const vals = vessels.map((v) => v.scores[key]);
  return Math.max(...vals) - Math.min(...vals);
}

export default function ComparePage() {
  const { held, remove, clear } = useCompare();
  const vessels = held
    .map((s) => vesselBySlug(s))
    .filter((v): v is Vessel => Boolean(v));

  if (vessels.length < 2) {
    return (
      <div className="relative flex-1 flex flex-col">
        <Masthead />
        <main className="px-span md:px-reach pb-fathom flex-1 pt-cubit">
          <h1 className="station__title">Nothing to set against anything.</h1>
          <p className="lede">
            Hold two or more vessels in the register and they will be measured
            against each other here, dimension by dimension.
          </p>
          <div className="mt-fathom">
            <Link href="/search" className="plate plate--primary no-underline">
              Open the register
            </Link>
          </div>
        </main>
        <Foot />
      </div>
    );
  }

  const cheapest = Math.min(...vessels.map((v) => v.price));
  const best = Math.max(...vessels.map((v) => v.total));

  /* Ordered so the dimensions that separate these vessels are read
     first: a comparison's job is to surface what differs. */
  const ordered = [...DIMENSIONS].sort(
    (a, b) => spread(vessels, b.key) / b.max - spread(vessels, a.key) / a.max
  );
  const widest = Math.max(...DIMENSIONS.map((d) => spread(vessels, d.key)));
  const anyDifference = widest > 0;

  const cols = `minmax(0, 12rem) repeat(${vessels.length}, minmax(0, 1fr))`;

  return (
    <div className="relative flex-1 flex flex-col">
      <Masthead />

      <main className="px-span md:px-reach pb-fathom flex-1">
        <div className="pt-cubit">
          <h1 className="station__title">
            {vessels.length} vessels, measured against each other
          </h1>
          <p className="lede">
            Ordered by what separates them.{" "}
            <strong>
              The dimensions where these boats actually differ are read first.
            </strong>
          </p>
        </div>

        {/* The readings, side by side */}
        <div className="mt-fathom overflow-x-auto">
          <div style={{ minWidth: `${18 + vessels.length * 12}rem` }}>
            {/* Heads */}
            <div
              className="grid gap-foot items-end pb-foot"
              style={{ gridTemplateColumns: cols, borderBottom: "var(--rule-crest) solid var(--rule-ink)" }}
            >
              <span className="rubric">Vessel</span>
              {vessels.map((v) => (
                <div key={v.slug} className="min-w-0">
                  <span
                    className="font-[family-name:var(--font-record)] tabular block leading-none"
                    style={{
                      fontSize: "var(--t-cubit)",
                      fontWeight: 600,
                      letterSpacing: "var(--tr-cubit)",
                      color: v.total === best ? "var(--ink)" : "var(--ink-secondary)",
                    }}
                  >
                    {v.total.toFixed(2)}
                  </span>
                  <span className="mt-finger block">
                    <BandLabel band={v.band} />
                  </span>
                  <h2
                    className="mt-palm mb-0"
                    style={{
                      fontSize: "var(--t-record)",
                      fontWeight: 500,
                      lineHeight: "var(--lh-record)",
                    }}
                  >
                    <Link href={`/vessel/${v.slug}`} className="no-underline hover:underline">
                      {v.name}
                    </Link>
                  </h2>
                  <p className="text-micro text-ink-tertiary mt-hair mb-0">
                    {v.route} &middot; {v.nights} nights
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(v.slug)}
                    className="rubric mt-palm"
                    style={{ minHeight: "var(--touch-min)" }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Dimensions, most divergent first */}
            {ordered.map((d) => {
              const diff = spread(vessels, d.key);
              /* Separating when it accounts for at least half the
                 widest gap on the table. */
              const diverges = anyDifference && diff >= widest * 0.5;
              const top = Math.max(...vessels.map((v) => v.scores[d.key]));

              return (
                <div
                  key={d.key}
                  className="grid gap-foot items-center py-foot"
                  style={{
                    gridTemplateColumns: cols,
                    borderBottom: "var(--rule-thin) solid var(--rule-quiet)",
                    /* Only exact ties recede, and never below readable. */
                    opacity: diff === 0 ? 0.72 : 1,
                  }}
                >
                  <div className="min-w-0">
                    <h3
                      className="m-0"
                      style={{
                        fontFamily: "var(--font-record)",
                        fontSize: "var(--t-record)",
                        fontWeight: 500,
                        letterSpacing: "var(--tr-cubit)",
                      }}
                    >
                      {d.label}
                    </h3>
                    <p className="text-micro text-ink-tertiary m-0 mt-hair">
                      {diff === 0 ? (
                        <>identical</>
                      ) : diverges ? (
                        <span style={{ color: "var(--lapis)", fontWeight: 600 }}>
                          separates them &middot; {diff} apart
                        </span>
                      ) : (
                        <>{diff} apart</>
                      )}
                      <span className="tabular"> &middot; max {d.max}</span>
                    </p>
                  </div>

                  {vessels.map((v) => {
                    const got = v.scores[d.key];
                    const leads = got === top && diverges;
                    return (
                      <div key={v.slug} className="min-w-0">
                        <div className="flex items-baseline gap-finger">
                          <span
                            className="font-[family-name:var(--font-record)] tabular"
                            style={{
                              fontSize: "var(--t-station)",
                              fontWeight: 600,
                              letterSpacing: "var(--tr-cubit)",
                              color: leads ? "var(--ink)" : "var(--ink-secondary)",
                            }}
                          >
                            {got}
                          </span>
                          <span className="text-micro text-ink-tertiary tabular">
                            /{d.max}
                          </span>
                          {leads && (
                            <span
                              className="rubric"
                              style={{ color: "var(--reed)" }}
                            >
                              leads
                            </span>
                          )}
                        </div>
                        <div
                          className="relative mt-finger h-palm"
                          style={{ background: "var(--paper-sunk)" }}
                          aria-hidden="true"
                        >
                          <div
                            className={`band-${v.band} absolute inset-y-0 start-0 overflow-hidden rise`}
                            style={
                              {
                                width: `${(got / d.max) * 100}%`,
                                "--rise-from": 0,
                              } as CSSProperties
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Price */}
            <div
              className="grid gap-foot items-baseline py-foot"
              style={{ gridTemplateColumns: cols, borderBottom: "var(--rule-thin) solid var(--rule-quiet)" }}
            >
              <h3
                className="m-0"
                style={{
                  fontFamily: "var(--font-record)",
                  fontSize: "var(--t-record)",
                  fontWeight: 500,
                  letterSpacing: "var(--tr-cubit)",
                }}
              >
                Price
                <span className="block text-micro text-ink-tertiary" style={{ fontFamily: "var(--font-text)", letterSpacing: 0, fontWeight: 400 }}>
                  per person per night
                </span>
              </h3>
              {vessels.map((v) => (
                <div key={v.slug}>
                  <span
                    className="font-[family-name:var(--font-record)] tabular"
                    style={{ fontSize: "var(--t-station)", fontWeight: 600 }}
                  >
                    {fmtEGP(v.price)}
                  </span>
                  <span className="text-fine text-ink-secondary"> EGP</span>
                  {v.price === cheapest && vessels.length > 1 && (
                    <span className="rubric block mt-hair" style={{ color: "var(--reed)" }}>
                      lowest
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Particulars */}
            {([
              ["Capacity", (v: Vessel) => `${v.capacity} guests`],
              ["Built", (v: Vessel) => String(v.built)],
              ["Guest rating", (v: Vessel) => `${v.rating.toFixed(1)} of 5`],
              ["Operator", (v: Vessel) => v.operator],
            ] as const).map(([label, read]) => (
              <div
                key={label}
                className="grid gap-foot items-baseline py-palm"
                style={{ gridTemplateColumns: cols, borderBottom: "var(--rule-hair) solid var(--rule-quiet)" }}
              >
                <span className="rubric">{label}</span>
                {vessels.map((v) => (
                  <span key={v.slug} className="text-fine tabular">
                    {read(v)}
                  </span>
                ))}
              </div>
            ))}

            {/* Amenities: only where they differ */}
            <div
              className="grid gap-foot items-start py-foot"
              style={{ gridTemplateColumns: cols }}
            >
              <div>
                <h3
                  className="m-0"
                  style={{
                    fontFamily: "var(--font-record)",
                    fontSize: "var(--t-record)",
                    fontWeight: 500,
                    letterSpacing: "var(--tr-cubit)",
                  }}
                >
                  On board
                </h3>
                <p className="text-micro text-ink-tertiary m-0 mt-hair">
                  Only what one has and another does not
                </p>
              </div>
              {vessels.map((v) => {
                const others = vessels.filter((o) => o.slug !== v.slug);
                const unique = v.amenities.filter(
                  (a) => !others.every((o) => o.amenities.includes(a))
                );
                return (
                  <ul key={v.slug} className="list-none m-0 p-0 grid gap-hair">
                    {unique.length ? (
                      unique.map((a) => (
                        <li key={a} className="text-fine flex gap-finger">
                          <span aria-hidden="true" style={{ color: "var(--reed)" }}>
                            &mdash;
                          </span>
                          <span>{a}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-fine text-ink-tertiary">
                        Nothing the others lack
                      </li>
                    )}
                  </ul>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-fathom flex flex-wrap gap-palm">
          <Link href="/search" className="plate plate--quiet no-underline">
            Back to the register
          </Link>
          <button type="button" onClick={clear} className="plate plate--quiet">
            Clear the comparison
          </button>
        </div>
      </main>

      <Foot />
    </div>
  );
}
