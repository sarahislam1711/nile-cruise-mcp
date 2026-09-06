import type { CSSProperties } from "react";
import Link from "next/link";
import { BANDS, DIMENSIONS, FLEET_TOTAL, REVIEW_TOTAL, FLEET_AVERAGE_RATING } from "@/lib/fleet";
import { BandMark } from "@/components/score";
import { Masthead, Foot } from "@/components/chrome";

export const metadata = {
  title: "Audit method — Nile Cruise MCP",
  description:
    "How every vessel in the register is scored across five weighted dimensions, and why operators cannot influence the result.",
};

export default function MethodPage() {
  const weightTotal = DIMENSIONS.reduce((n, d) => n + d.weight, 0);

  return (
    <div className="relative flex-1 flex flex-col">
      <Masthead />

      <main className="px-span md:px-reach pb-fathom flex-1">
        <div className="pt-cubit">
          <h1 className="station__title">
            How a vessel is measured.
          </h1>
          <p className="lede">
            Star ratings compress a whole voyage into one number chosen by
            whoever felt like writing a review. This register does the opposite:
            it takes the voyage apart, scores each part on the same yardstick,
            and publishes the working.
          </p>
        </div>

        {/* The five dimensions and their weights */}
        <section aria-labelledby="dimensions" className="station">
          <div className="station__gradations" aria-hidden="true" />
          <span className="station__plate" aria-hidden="true">I</span>
          <h2 id="dimensions" className="station__title mt-palm">
            Five dimensions, {weightTotal} points
          </h2>

          {/* The weights, drawn at the scale's own pitch: thirty points
              occupies three times the bar that ten does, so the
              weighting is visible rather than merely stated. */}
          <ol className="weights mt-foot max-w-[58rem]">
            {DIMENSIONS.map((d) => (
              <li key={d.key} className="weight">
                <h3 className="weight__name">
                  {d.label}
                  <span className="weight__note">{d.note}</span>
                </h3>
                <div
                  className="weight__bar"
                  role="img"
                  aria-label={`${d.label} carries ${d.weight} of ${weightTotal} points`}
                >
                  <div
                    className="weight__fill rise"
                    style={
                      {
                        "--w": `${d.weight}%`,
                        "--rise-from": 0,
                      } as CSSProperties
                    }
                  />
                </div>
                <span className="weight__n tabular" aria-hidden="true">
                  {d.weight}
                </span>
              </li>
            ))}

            <li className="weight weight--total">
              <h3 className="weight__name">Total</h3>
              <div aria-hidden="true" />
              <span className="weight__n tabular">{weightTotal}</span>
            </li>
          </ol>

          <p className="mt-foot text-ink-secondary max-w-[58ch]">
            Service is worth thirty and management ten. That is a judgement, not
            a neutral fact: it says the crew&rsquo;s conduct matters three times
            more than an operator&rsquo;s paperwork. The weights are published
            precisely so you can disagree with them and read the dimensions
            yourself.
          </p>
        </section>

        {/* The bands */}
        <section aria-labelledby="bands" className="station">
          <div className="station__gradations" aria-hidden="true" />
          <span className="station__plate" aria-hidden="true">II</span>
          <h2 id="bands" className="station__title mt-palm">
            What the bands mean
          </h2>
          <p className="mt-foot text-ink-secondary max-w-[58ch]">
            Totals fall into five bands. The gaps between them are real: no
            vessel in the register scores between 90.00 and 92.85, or between
            72.50 and 77.30. The bands describe how the fleet actually clusters
            rather than dividing it into neat fifths.
          </p>

          <dl className="m-0 mt-foot max-w-[52rem]">
            {BANDS.map((b) => (
              <div
                key={b.key}
                className="grid grid-cols-[auto_1fr_auto] items-baseline gap-foot py-foot"
                style={{ borderTop: "var(--rule-thin) solid var(--rule-quiet)" }}
              >
                <BandMark band={b.key} />
                <dt>
                  <span
                    className="font-[family-name:var(--font-record)]"
                    style={{ fontSize: "var(--t-record)", fontWeight: 500 }}
                  >
                    {b.name}
                  </span>
                  <span className="block text-fine text-ink-secondary tabular">
                    {b.count} of {FLEET_TOTAL} vessels
                  </span>
                </dt>
                <dd className="m-0 tabular text-end whitespace-nowrap">
                  <span
                    className="font-[family-name:var(--font-record)]"
                    style={{ fontSize: "var(--t-record)", fontWeight: 600 }}
                  >
                    {b.min.toFixed(2)}&ndash;{b.max.toFixed(2)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Independence — the actual product claim */}
        <section aria-labelledby="independence" className="station">
          <div className="station__gradations" aria-hidden="true" />
          <span className="station__plate" aria-hidden="true">III</span>
          <h2 id="independence" className="station__title mt-palm">
            Why operators cannot touch it
          </h2>
          <div className="mt-foot grid gap-fathom lg:grid-cols-2 max-w-[64rem]">
            <p className="text-ink-secondary m-0">
              A rating an operator can influence is marketing wearing a
              number&rsquo;s clothes. So operators do not submit their own
              scores, cannot see an audit before it is published, cannot appeal
              a result, and cannot buy a placement or a change. There is no paid
              tier in this register.
            </p>
            <p className="text-ink-secondary m-0">
              Guest reviews inform the audit but never set the score. All{" "}
              {REVIEW_TOTAL.toLocaleString("en-GB")} of them, averaging{" "}
              {FLEET_AVERAGE_RATING.toFixed(1)} of 5, are read as evidence
              alongside the auditor&rsquo;s own inspection. Where the two
              disagree, the inspection is what gets published, and the
              disagreement is worth reading.
            </p>
          </div>
        </section>

        <section
          className="mt-cubit pt-foot"
          style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
        >
          <h2 style={{ fontSize: "var(--t-station)", fontWeight: 600 }}>
            Read the register
          </h2>
          <div className="mt-foot flex flex-wrap gap-palm">
            <Link href="/search" className="plate plate--primary no-underline">
              All {FLEET_TOTAL} vessels
            </Link>
            <Link href="/request" className="plate plate--quiet no-underline">
              Post an anonymous request
            </Link>
          </div>
        </section>
      </main>

      <Foot />
    </div>
  );
}
