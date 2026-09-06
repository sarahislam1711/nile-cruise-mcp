import type { CSSProperties } from "react";
import Link from "next/link";
import {
  BANDS,
  BANDS_ASCENDING,
  FLEET,
  FLEET_TOTAL,
  REVIEW_TOTAL,
  FLEET_AVERAGE_RATING,
  VESSEL_POSITIONS,
} from "@/lib/fleet";
import { BandMark, ScoreBreakdown, BandKeyList } from "@/components/score";
import { Masthead, SectionHead, Record, Foot, SampleNote } from "@/components/chrome";

/* ---------- The graduated measure: the fleet on one scale ----------
   Proportioned by vessel count, not score range: the reader needs to
   know where the fleet actually sits, and range-proportioning would
   give Basic 40% of the width to hold six boats. Each band prints its
   own range as its reading, and every audited vessel gets a tick. */
export function FleetMeasure() {
  const FLOOR = 40;
  const CEIL = 100;

  // Each band occupies width proportional to its count; a vessel's
  // tick sits at its position inside its own band's segment.
  const offsets: Record<string, { start: number; width: number }> = {};
  let cursor = 0;
  for (const b of BANDS_ASCENDING) {
    const width = (b.count / FLEET_TOTAL) * 100;
    offsets[b.key] = { start: cursor, width };
    cursor += width;
  }

  const tickAt = (score: number) => {
    const band = BANDS.find((b) => score >= b.min && score <= b.max);
    if (!band) return null;
    const seg = offsets[band.key];
    const t = (score - band.min) / (band.max - band.min || 1);
    return seg.start + seg.width * t;
  };

  return (
    <section aria-labelledby="measure-heading" className="mt-cubit">
      <h2 id="measure-heading" className="sr-only">
        The audited fleet, distributed across five quality bands
      </h2>

      <div
        className="measure relative flex h-cubit md:h-fathom"
        role="img"
        aria-label={BANDS.map(
          (b) => `${b.name}, ${b.count} vessels, ${b.min} to ${b.max}`
        ).join("; ")}
      >
        {BANDS_ASCENDING.map((b, i) => (
          <div
            key={b.key}
            className={`band-${b.key} relative overflow-hidden rise`}
            style={
              {
                flex: `${b.count} 1 0%`,
                "--rise-delay": `${i * 70}ms`,
                "--rise-from": 0,
              } as CSSProperties
            }
          >
            <span
              className="absolute bottom-hair left-finger md:left-palm text-paper font-[family-name:var(--font-record)] tabular leading-none"
              style={{ fontSize: "var(--t-fine)", fontWeight: 600 }}
              aria-hidden="true"
            >
              {b.count}
            </span>
          </div>
        ))}

        {/* Gradations at the pitch of the scale */}
        <div
          className="measure__gradations"
          style={{ "--tick-pitch": "1.6667%" } as CSSProperties}
          aria-hidden="true"
        />

        {/* One tick per audited vessel — the fleet itself */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {VESSEL_POSITIONS.map((score, i) => {
            const left = tickAt(score);
            if (left === null) return null;
            return (
              <span
                key={`${score}-${i}`}
                className="vessel-tick"
                style={{ left: `${left}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* The datum */}
      <div className="flex justify-between mt-hair tabular text-micro text-ink-tertiary">
        <span>{FLOOR}</span>
        <span aria-hidden="true">
          {FLEET_TOTAL} vessels, each marked
        </span>
        <span>{CEIL}</span>
      </div>

      {/* Stations, read beneath the scale. Wraps rather than colliding. */}
      <ol className="grid list-none p-0 mt-foot mb-0 gap-x-foot gap-y-palm grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {BANDS.map((b) => (
          <li key={b.key} className="flex items-start gap-finger min-w-0">
            <span className="mt-hair">
              <BandMark band={b.key} />
            </span>
            <span className="min-w-0">
              <span className="rubric block">{b.name}</span>
              <span className="block text-fine text-ink-secondary tabular">
                {b.count} vessels &middot; {b.min.toFixed(2)}&ndash;
                {b.max.toFixed(2)}
              </span>
            </span>
          </li>
        ))}
      </ol>

      {/* The attestation: the trust claim as a ruled colophon, because
          in this world a figure is the argument and a paragraph is not. */}
      <section className="attest" aria-labelledby="attest-heading">
        <h2 id="attest-heading" className="sr-only">
          How this register is compiled
        </h2>

        <dl className="attest__figures">
          <div className="attest__figure">
            <dt className="sr-only">Vessels audited</dt>
            <dd className="m-0">
              <span className="attest__n">{FLEET_TOTAL}</span>
              <span className="attest__label">
                vessels audited in person, not by questionnaire
              </span>
            </dd>
          </div>

          <div className="attest__figure">
            <dt className="sr-only">Guest reviews read</dt>
            <dd className="m-0">
              <span className="attest__n">
                {REVIEW_TOTAL.toLocaleString("en-GB")}
              </span>
              <span className="attest__label">
                guest reviews read as evidence alongside each inspection
              </span>
            </dd>
          </div>

          <div className="attest__figure">
            <dt className="sr-only">Average guest rating</dt>
            <dd className="m-0">
              <span className="attest__n">
                {FLEET_AVERAGE_RATING.toFixed(1)}
                <span className="attest__unit">of 5</span>
              </span>
              <span className="attest__label">
                the fleet&rsquo;s average guest rating, which does not set the
                score
              </span>
            </dd>
          </div>
        </dl>

        <ul className="attest__refusals">
          <li><span>Operators do not submit their own scores</span></li>
          <li><span>No operator sees an audit before it is published</span></li>
          <li><span>No ranking or placement has ever been for sale</span></li>
        </ul>
      </section>
    </section>
  );
}

export default function Home() {
  const lead = FLEET[0];

  return (
    <div className="relative flex-1">
      <Masthead />

      <main className="px-span md:px-reach pb-fathom">
        {/* The opening: the measure leads, a photograph corroborates.
            The plate renders only when /public/hero.jpg exists. */}
        <section className="hero">
          <div
            className="hero__plate"
            style={{ ["--hero-plate" as string]: "url('/hero.jpg')" }}
            aria-hidden="true"
          />
          <h1
            style={{
              fontSize: "clamp(2.5rem, 7vw, var(--t-flood))",
              fontWeight: 600,
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tr-crest)",
              maxWidth: "16ch",
            }}
          >
            Seventy-nine vessels, measured.
          </h1>
          <p
            className="mt-foot text-lead text-ink-secondary"
            style={{ maxWidth: "52ch" }}
          >
            The Nile has been gauged and published every year for five thousand
            years. This is the fleet&rsquo;s reckoning: every boat audited
            across five dimensions, set on one scale, so you can see what
            separates them.
          </p>

          <FleetMeasure />
        </section>

        {/* The search instrument — one ruled line, action at its terminus */}
        <section aria-labelledby="search-heading" className="station station--minor">
          <h2 id="search-heading" className="station__title mb-foot">
            Set your reading
          </h2>
          <form
            action="/search"
            className="flex flex-wrap items-end gap-foot w-full"
          >
            <div className="flex flex-col gap-hair">
              <label htmlFor="depart" className="rubric">Departure</label>
              <input
                id="depart" name="depart" type="date" defaultValue="2027-03-15"
                className="tabular px-palm bg-[var(--paper-sunk)]"
                style={{
                  minHeight: "var(--touch-min)",
                  border: "var(--rule-thin) solid var(--rule-plain)",
                  borderRadius: "var(--radius-control)",
                }}
              />
            </div>
            <div className="flex flex-col gap-hair">
              <label htmlFor="nights" className="rubric">Nights</label>
              <select
                id="nights" name="nights" defaultValue="3"
                className="px-palm bg-[var(--paper-sunk)]"
                style={{
                  minHeight: "var(--touch-min)",
                  border: "var(--rule-thin) solid var(--rule-plain)",
                  borderRadius: "var(--radius-control)",
                }}
              >
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="flex flex-col gap-hair">
              <label htmlFor="guests" className="rubric">Guests</label>
              <input
                id="guests" name="guests" type="number" min={1} max={8} defaultValue={2}
                className="tabular px-palm w-[5.5rem] bg-[var(--paper-sunk)]"
                style={{
                  minHeight: "var(--touch-min)",
                  border: "var(--rule-thin) solid var(--rule-plain)",
                  borderRadius: "var(--radius-control)",
                }}
              />
            </div>
            <div className="flex flex-col gap-hair flex-1 min-w-[16rem]">
              <label htmlFor="floor" className="rubric">Quality floor</label>
              <select
                id="floor" name="floor" defaultValue="81.7"
                className="tabular px-palm w-full bg-[var(--paper-sunk)]"
                style={{
                  minHeight: "var(--touch-min)",
                  border: "var(--rule-thin) solid var(--rule-plain)",
                  borderRadius: "var(--radius-control)",
                }}
              >
                <option value="40">Any reading</option>
                <option value="70.6">Standard and above &mdash; 70.60</option>
                <option value="77.3">Superior and above &mdash; 77.30</option>
                <option value="81.7">Deluxe and above &mdash; 81.70</option>
                <option value="92.85">Luxury only &mdash; 92.85</option>
              </select>
            </div>
            {/* The action sits at the line's right terminus. */}
            <button type="submit" className="plate plate--primary ms-auto">
              Read the fleet
            </button>
          </form>
        </section>

        {/* The fleet, as ruled records */}
        <section id="fleet" aria-labelledby="fleet-heading" className="station">
          <div className="station__gradations" aria-hidden="true" />
          <div className="flex items-end justify-between gap-foot flex-wrap">
            <div>
              <span className="station__plate" aria-hidden="true">I</span>
              <h2 id="fleet-heading" className="station__title mt-palm">
                The fleet, in order of reading
              </h2>
            </div>
            <span className="rubric">5 of {FLEET_TOTAL} shown</span>
          </div>
          <p className="station__standfirst">
            Every row is one audited vessel. The reading leads because it is
            the only figure here that no operator can influence.
          </p>
          <div className="mt-foot" />
          {FLEET.map((v) => (
            <Record key={v.slug} vessel={v} />
          ))}
          <SampleNote />
          <p className="mt-foot">
            <Link href="/search" className="plate plate--quiet no-underline">
              Open the full register
            </Link>
          </p>
        </section>

        {/* The breakdown — explicit bars where the visitor judges */}
        <section
          id="method"
          aria-labelledby="breakdown-heading"
          className="station"
        >
          <div className="station__gradations" aria-hidden="true" />
          <span className="station__plate" aria-hidden="true">II</span>
          <h2 id="breakdown-heading" className="station__title mt-palm">
            What a reading is made of
          </h2>
          <p className="station__standfirst">
            Five dimensions, weighted to a hundred points. This is{" "}
            {lead.name}, audited on the {lead.route} run.
          </p>
          <div className="mt-foot" />

          <div className="grid gap-fathom lg:grid-cols-[minmax(0,42rem)_minmax(0,22rem)] items-start">
            <ScoreBreakdown vessel={lead} />

            <aside
              className="pt-foot lg:pt-0 lg:ps-fathom"
              style={{ borderTop: "var(--rule-thin) solid var(--rule-quiet)" }}
            >
              <h3 className="rubric mb-palm">Why the weights differ</h3>
              <p className="pull">
                A crew&rsquo;s conduct is worth three times an
                operator&rsquo;s paperwork.
              </p>
              <p className="marginal">
                Service carries thirty points and management ten. That is a
                judgement rather than a neutral fact, and it is published so
                you can disagree with it.
              </p>

              <h3 className="rubric mb-palm mt-fathom">What a reading is worth</h3>
              <BandKeyList />
              <p className="text-micro text-ink-tertiary mt-palm mb-0">
                Gaps between bands are real clusters in the fleet, not rounded
                cut-offs.
              </p>
            </aside>
          </div>
        </section>

        {/* Anonymous request — the second path */}
        <section
          id="request"
          aria-labelledby="request-heading"
          className="station"
        >
          <div className="station__gradations" aria-hidden="true" />
          <span className="station__plate" aria-hidden="true">III</span>
          <h2 id="request-heading" className="station__title mt-palm">
            Or make them come to you
          </h2>
          <p className="station__standfirst">
            Post your terms without naming yourself, and operators bid against
            the same scale you have just read.
          </p>

          <ul className="noted">
            <li>
              <strong>You stay anonymous</strong>
              Operators see your dates, budget, and quality floor. They do not
              see you.
            </li>
            <li>
              <strong>Bids are comparable</strong>
              Every bid carries its vessel&rsquo;s audited reading, so a lower
              price and a lower standard cannot be confused.
            </li>
            <li>
              <strong>You choose when it ends</strong>
              Your contact details are shared at the moment you accept, and
              never before.
            </li>
          </ul>

          <div className="mt-fathom flex flex-wrap gap-palm">
            <Link href="/request" className="plate plate--primary no-underline">
              Post an anonymous request
            </Link>
            <Link href="/method" className="plate plate--quiet no-underline">
              How the audit works
            </Link>
          </div>
        </section>
      </main>

      <Foot />
    </div>
  );
}
