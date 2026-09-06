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
  const weightTotal = DIMENSIONS.reduce((n, d) => n + d.max, 0);

  return (
    <div className="relative flex-1 flex flex-col">
      <Masthead />

      <main className="px-span md:px-reach pb-crest flex-1">
        <div className="pt-fathom">
          <h1
            style={{
              fontSize: "clamp(2.5rem, 7vw, var(--t-flood))",
              fontWeight: 600,
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tr-crest)",
              maxWidth: "18ch",
              margin: 0,
            }}
          >
            How a vessel is measured.
          </h1>
          <p className="mt-foot text-lead text-ink-secondary" style={{ maxWidth: "54ch" }}>
            Star ratings compress a whole voyage into one number chosen by
            whoever felt like writing a review. This register does the opposite:
            it takes the voyage apart, scores each part on the same yardstick,
            and publishes the working.
          </p>
        </div>

        {/* The five dimensions and their weights */}
        <section
          aria-labelledby="dimensions"
          className="mt-fathom pt-foot"
          style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
        >
          <h2 id="dimensions" style={{ fontSize: "var(--t-station)", fontWeight: 600 }}>
            Five dimensions, {weightTotal} points
          </h2>

          <table className="w-full border-collapse mt-foot max-w-[52rem]">
            <caption className="sr-only">
              The five audited dimensions and their maximum scores
            </caption>
            <thead>
              <tr>
                <th scope="col" className="rubric text-start pb-finger">Dimension</th>
                <th scope="col" className="rubric text-start pb-finger hidden sm:table-cell">
                  What the auditor examines
                </th>
                <th scope="col" className="rubric text-end pb-finger">Weight</th>
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((d) => (
                <tr key={d.key} style={{ borderTop: "var(--rule-thin) solid var(--rule-quiet)" }}>
                  <th scope="row" className="text-start py-foot pe-foot font-normal align-top">
                    <span
                      className="font-[family-name:var(--font-record)] block"
                      style={{ fontSize: "var(--t-record)", fontWeight: 500 }}
                    >
                      {d.label}
                    </span>
                    <span className="block text-fine text-ink-secondary sm:hidden mt-hair">
                      {d.note}
                    </span>
                  </th>
                  <td className="py-foot pe-foot align-top text-fine text-ink-secondary hidden sm:table-cell">
                    {d.note}
                  </td>
                  <td className="py-foot text-end align-top tabular whitespace-nowrap">
                    <span
                      className="font-[family-name:var(--font-record)]"
                      style={{ fontSize: "var(--t-record)", fontWeight: 600 }}
                    >
                      {d.max}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "var(--rule-mid) solid var(--rule-ink)" }}>
                <th scope="row" className="text-start pt-palm rubric">Total</th>
                <td className="hidden sm:table-cell" />
                <td className="pt-palm text-end tabular">
                  <span
                    className="font-[family-name:var(--font-record)]"
                    style={{ fontSize: "var(--t-station)", fontWeight: 600 }}
                  >
                    {weightTotal}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>

          <p className="mt-foot text-ink-secondary max-w-[58ch]">
            Service is worth thirty and management ten. That is a judgement, not
            a neutral fact: it says the crew&rsquo;s conduct matters three times
            more than an operator&rsquo;s paperwork. The weights are published
            precisely so you can disagree with them and read the dimensions
            yourself.
          </p>
        </section>

        {/* The bands */}
        <section
          aria-labelledby="bands"
          className="mt-fathom pt-foot"
          style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
        >
          <h2 id="bands" style={{ fontSize: "var(--t-station)", fontWeight: 600 }}>
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
        <section
          aria-labelledby="independence"
          className="mt-fathom pt-foot"
          style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
        >
          <h2 id="independence" style={{ fontSize: "var(--t-station)", fontWeight: 600 }}>
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
          className="mt-fathom pt-foot"
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
