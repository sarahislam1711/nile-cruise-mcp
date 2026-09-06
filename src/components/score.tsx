import type { CSSProperties } from "react";
import { BANDS, DIMENSIONS, bandOf, type BandKey, type Vessel } from "@/lib/fleet";

/* ------------------------------------------------------------
   Band mark — hue, pattern, and name. Three channels, so a
   score never depends on color perception alone.
   ------------------------------------------------------------ */
export function BandMark({
  band,
  size = "palm",
}: {
  band: BandKey;
  size?: "finger" | "palm";
}) {
  return (
    <span
      className={`band-${band} relative inline-block shrink-0 overflow-hidden ${
        size === "finger" ? "h-finger w-finger" : "h-palm w-palm"
      }`}
      aria-hidden="true"
    />
  );
}

export function BandLabel({ band }: { band: BandKey }) {
  const b = bandOf(band);
  return (
    <span className="inline-flex items-center gap-finger">
      <BandMark band={band} />
      <span className="rubric" style={{ color: "var(--ink-secondary)" }}>
        {b.name}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------
   The reading — the record's anchor numeral, at cubit scale.
   It deliberately outranks the vessel name beside it: the
   audited figure is the thing a competitor cannot copy, so it
   leads and the name follows.
   ------------------------------------------------------------ */
export function Reading({
  total,
  band,
  muted = false,
  scale = "cubit",
}: {
  total: number;
  band: BandKey;
  muted?: boolean;
  scale?: "cubit" | "station";
}) {
  return (
    <div className="flex flex-col">
      <span
        className="font-[family-name:var(--font-record)] tabular leading-none"
        style={{
          fontSize: scale === "cubit" ? "var(--t-cubit)" : "var(--t-station)",
          fontWeight: 600,
          letterSpacing: "var(--tr-cubit)",
          color: muted ? "var(--ink-quiet)" : "var(--ink)",
        }}
      >
        {total.toFixed(2)}
      </span>
      <span className="mt-finger">
        <BandLabel band={band} />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------
   The breakdown — explicit five-dimension bars, for contexts
   where the visitor is actively judging.
   ------------------------------------------------------------ */
export function ScoreBreakdown({
  vessel,
  animate = true,
}: {
  vessel: Vessel;
  animate?: boolean;
}) {
  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">
        Audited quality score breakdown for {vessel.name}, total {vessel.total}{" "}
        out of 100
      </caption>
      <thead>
        <tr>
          <th scope="col" className="rubric text-left pb-finger font-semibold">
            Dimension
          </th>
          <th
            scope="col"
            className="rubric text-left pb-finger font-semibold hidden md:table-cell"
          >
            Reading
          </th>
          <th scope="col" className="rubric text-right pb-finger font-semibold">
            Score
          </th>
        </tr>
      </thead>
      <tbody>
        {DIMENSIONS.map((d, i) => {
          const got = vessel.scores[d.key];
          const ratio = got / d.max;
          const riseStyle = {
            width: `${ratio * 100}%`,
            "--rise-delay": `${140 + i * 90}ms`,
            "--rise-from": 0,
          } as CSSProperties;

          return (
            <tr
              key={d.key}
              className="border-t"
              style={{ borderColor: "var(--rule-quiet)" }}
            >
              <th
                scope="row"
                className="text-left py-palm pr-palm md:pr-foot font-normal align-top"
              >
                <span className="block">{d.label}</span>
                <span className="block text-micro text-ink-tertiary max-w-[34ch] leading-snug">
                  {d.note}
                </span>
                {/* Narrow widths: the bar rides under its own label so the
                    score column is never squeezed off the edge. */}
                <div
                  className="relative h-[0.6rem] mt-finger md:hidden"
                  style={{ background: "var(--paper-sunk)" }}
                  aria-hidden="true"
                >
                  <div
                    className={`band-${vessel.band} absolute inset-y-0 left-0 overflow-hidden ${
                      animate ? "rise" : ""
                    }`}
                    style={riseStyle}
                  />
                </div>
              </th>
              <td className="py-palm align-middle hidden md:table-cell w-[42%]">
                <div
                  className="relative h-[0.6rem] w-full"
                  style={{ background: "var(--paper-sunk)" }}
                  aria-hidden="true"
                >
                  <div
                    className={`band-${vessel.band} absolute inset-y-0 left-0 overflow-hidden ${
                      animate ? "rise" : ""
                    }`}
                    style={riseStyle}
                  />
                  <div
                    className="absolute inset-y-0 right-0 w-px"
                    style={{ background: "var(--rule-plain)" }}
                  />
                </div>
              </td>
              <td className="py-palm pl-palm md:pl-foot text-right align-top md:align-middle tabular whitespace-nowrap">
                <span
                  className="font-[family-name:var(--font-record)]"
                  style={{ fontSize: "var(--t-body)", fontWeight: 600 }}
                >
                  {got}
                </span>
                <span className="text-ink-tertiary text-fine">/{d.max}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr style={{ borderTop: "var(--rule-mid) solid var(--rule-ink)" }}>
          <th scope="row" className="text-left pt-palm rubric font-semibold">
            Total
          </th>
          <td className="hidden md:table-cell" />
          <td className="pt-palm pl-palm md:pl-foot text-right tabular">
            <span
              className="font-[family-name:var(--font-record)]"
              style={{
                fontSize: "var(--t-station)",
                fontWeight: 600,
                letterSpacing: "var(--tr-cubit)",
              }}
            >
              {vessel.total.toFixed(2)}
            </span>
            <span className="text-ink-tertiary text-fine">/100</span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

/* ------------------------------------------------------------
   The band key — what a reading is worth.
   ------------------------------------------------------------ */
export function BandKeyList() {
  return (
    <dl className="m-0 text-fine">
      {BANDS.map((b) => (
        <div
          key={b.key}
          className="flex items-baseline justify-between gap-foot py-palm"
          style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}
        >
          <dt className="flex items-center gap-finger min-w-0">
            <BandMark band={b.key} size="finger" />
            <span>{b.name}</span>
          </dt>
          <dd className="m-0 tabular text-ink-secondary whitespace-nowrap">
            {b.min.toFixed(2)}&ndash;{b.max.toFixed(2)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
