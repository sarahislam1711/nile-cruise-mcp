"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AMENITIES, BANDS, ROUTES, SPECIAL_REQUESTS, fmtEGP } from "@/lib/fleet";
import { Masthead, Foot } from "@/components/chrome";

const STEPS = [
  { n: 1, title: "When and where" },
  { n: 2, title: "Budget and standard" },
  { n: 3, title: "What matters on board" },
] as const;

const field = {
  minHeight: "var(--touch-min)",
  border: "var(--rule-thin) solid var(--rule-plain)",
  borderRadius: "var(--radius-control)",
} as const;

interface Draft {
  departure: string;
  nights: number;
  flexible: boolean;
  route: string;
  adults: number;
  children: number;
  budgetMin: number;
  budgetMax: number;
  floor: number;
  specials: string[];
  amenities: string[];
  notes: string;
  understood: boolean;
}

const EMPTY: Draft = {
  departure: "2027-03-15",
  nights: 3,
  flexible: true,
  route: "Aswan — Luxor",
  adults: 2,
  children: 0,
  budgetMin: 3000,
  budgetMax: 5000,
  floor: 81.7,
  specials: [],
  amenities: [],
  notes: "",
  understood: false,
};

/* The graduated measure, reused as a budget instrument: the
   traveler sets their own floor on the same scale they read. */
function QualityFloorPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="grid gap-finger">
      <label className="flex items-center gap-finger cursor-pointer">
        <input
          type="radio"
          name="floor"
          checked={value === 40}
          onChange={() => onChange(40)}
          className="accent-[var(--lapis)]"
        />
        <span className="text-fine">
          Any reading &mdash; show me everything
        </span>
      </label>
      {BANDS.map((b) => (
        <label key={b.key} className="flex items-center gap-finger cursor-pointer">
          <input
            type="radio"
            name="floor"
            checked={value === b.min}
            onChange={() => onChange(b.min)}
            className="accent-[var(--lapis)]"
          />
          <span
            className={`band-${b.key} relative inline-block h-finger w-finger shrink-0 overflow-hidden`}
            aria-hidden="true"
          />
          <span className="text-fine">
            {b.name} and above
            <span className="text-ink-tertiary tabular"> &mdash; {b.min.toFixed(2)} minimum</span>
          </span>
        </label>
      ))}
    </div>
  );
}

export default function RequestPage() {
  const [step, setStep] = useState(1);
  const [d, setD] = useState<Draft>(EMPTY);
  const [posted, setPosted] = useState(false);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setD((prev) => ({ ...prev, [k]: v }));

  const toggle = (k: "specials" | "amenities", v: string) =>
    setD((prev) => ({
      ...prev,
      [k]: prev[k].includes(v)
        ? prev[k].filter((x) => x !== v)
        : [...prev[k], v],
    }));

  const travellers = d.adults + d.children;
  const estimate = useMemo(
    () => ({
      low: d.budgetMin * travellers * d.nights,
      high: d.budgetMax * travellers * d.nights,
    }),
    [d.budgetMin, d.budgetMax, travellers, d.nights]
  );

  const canAdvance =
    step === 1
      ? d.adults >= 1 && d.nights >= 3
      : step === 2
        ? d.budgetMax >= d.budgetMin
        : d.understood;

  if (posted) {
    return (
      <div className="relative flex-1 flex flex-col">
        <Masthead />
        <main className="px-span md:px-reach pb-crest flex-1 pt-fathom">
          <p className="rubric" style={{ color: "var(--reed)" }}>
            Request posted
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, var(--t-flood))",
              fontWeight: 600,
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tr-crest)",
              maxWidth: "18ch",
            }}
          >
            Your terms are on the water.
          </h1>
          <p className="text-lead text-ink-secondary mt-foot max-w-[52ch]">
            Operators matching your reading can see the request and bid against
            it. They cannot see who you are, and will not until you accept.
          </p>

          <dl
            className="mt-fathom grid sm:grid-cols-2 lg:grid-cols-3 gap-x-fathom gap-y-0 m-0 max-w-[56rem] pt-foot"
            style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
          >
            {[
              ["Reference", "REQ-2027-00124"],
              ["Departure", `${d.departure}${d.flexible ? " (flexible)" : ""}`],
              ["Voyage", `${d.nights} nights · ${d.route}`],
              ["Travellers", `${d.adults} adults${d.children ? `, ${d.children} children` : ""}`],
              ["Budget", `${fmtEGP(d.budgetMin)}–${fmtEGP(d.budgetMax)} EGP per person per night`],
              ["Quality floor", d.floor === 40 ? "Any reading" : `${d.floor.toFixed(2)} minimum`],
            ].map(([k, v]) => (
              <div key={k} className="py-palm" style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}>
                <dt className="rubric">{k}</dt>
                <dd className="m-0 text-fine tabular">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-fathom flex flex-wrap gap-palm">
            <Link href="/request/REQ-2027-00124" className="plate plate--primary no-underline">
              Watch for bids
            </Link>
            <Link href="/search" className="plate plate--quiet no-underline">
              Keep reading the register
            </Link>
          </div>
        </main>
        <Foot />
      </div>
    );
  }

  return (
    <div className="relative flex-1 flex flex-col">
      <Masthead />

      <main className="px-span md:px-reach pb-crest flex-1">
        <div className="pt-fathom max-w-[46rem]">
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, var(--t-station))",
              fontWeight: 600,
              lineHeight: "var(--lh-record)",
              margin: 0,
            }}
          >
            State your terms
          </h1>
          <p className="text-fine text-ink-secondary mt-hair mb-0">
            Operators bid against the same scale you read. Nothing identifying
            you is shared until you accept a bid.
          </p>
        </div>

        {/* Progress, drawn as gradations on the measure */}
        <div className="mt-fathom max-w-[46rem]">
          <ol className="flex list-none m-0 p-0 gap-hair" aria-label="Progress">
            {STEPS.map((s) => (
              <li key={s.n} className="flex-1">
                <span className="sr-only">
                  Step {s.n} of 3: {s.title}
                  {s.n === step ? " (current)" : ""}
                </span>
                <span
                  className="block h-palm"
                  aria-hidden="true"
                  style={{
                    background:
                      s.n < step
                        ? "var(--lapis)"
                        : s.n === step
                          ? "var(--lapis-bright)"
                          : "var(--paper-sunk)",
                    borderTop: "var(--rule-hair) solid var(--rule-plain)",
                  }}
                />
                <span
                  className="rubric block mt-finger"
                  aria-hidden="true"
                  style={{ color: s.n === step ? "var(--ink)" : undefined }}
                >
                  {s.title}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <form
          className="mt-fathom max-w-[46rem]"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 3) setStep(step + 1);
            else if (d.understood) setPosted(true);
          }}
        >
          {/* ---------------- Step 1 ---------------- */}
          {step === 1 && (
            <div
              className="pt-foot"
              style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
            >
              <h2 style={{ fontSize: "var(--t-record)", fontWeight: 600, margin: 0 }}>
                When and where
              </h2>

              <div className="mt-foot flex flex-wrap items-end gap-foot">
                <div className="flex flex-col gap-hair">
                  <label htmlFor="departure" className="rubric">Departure</label>
                  <input
                    id="departure" type="date" value={d.departure}
                    onChange={(e) => set("departure", e.target.value)}
                    className="tabular px-palm bg-[var(--paper-sunk)]" style={field}
                  />
                </div>
                <div className="flex flex-col gap-hair">
                  <label htmlFor="nights" className="rubric">Nights</label>
                  <select
                    id="nights" value={d.nights}
                    onChange={(e) => set("nights", Number(e.target.value))}
                    className="px-palm bg-[var(--paper-sunk)]" style={field}
                  >
                    {[3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-finger cursor-pointer" style={{ minHeight: "var(--touch-min)" }}>
                  <input
                    type="checkbox" checked={d.flexible}
                    onChange={(e) => set("flexible", e.target.checked)}
                    className="accent-[var(--lapis)]"
                  />
                  <span className="text-fine">Dates are flexible</span>
                </label>
              </div>

              <fieldset className="m-0 p-0 mt-fathom" style={{ border: 0 }}>
                <legend className="rubric p-0 mb-palm">Route</legend>
                <div className="grid gap-finger">
                  {ROUTES.map((r) => (
                    <label key={r} className="flex items-center gap-finger cursor-pointer">
                      <input
                        type="radio" name="route" checked={d.route === r}
                        onChange={() => set("route", r)}
                        className="accent-[var(--lapis)]"
                      />
                      <span className="text-fine">{r}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-fathom flex flex-wrap items-end gap-foot">
                <div className="flex flex-col gap-hair">
                  <label htmlFor="adults" className="rubric">Adults</label>
                  <input
                    id="adults" type="number" min={1} max={8} value={d.adults}
                    onChange={(e) => set("adults", Math.max(1, Number(e.target.value) || 1))}
                    className="tabular px-palm w-[5.5rem] bg-[var(--paper-sunk)]" style={field}
                  />
                </div>
                <div className="flex flex-col gap-hair">
                  <label htmlFor="children" className="rubric">Children under 12</label>
                  <input
                    id="children" type="number" min={0} max={5} value={d.children}
                    onChange={(e) => set("children", Math.max(0, Number(e.target.value) || 0))}
                    className="tabular px-palm w-[5.5rem] bg-[var(--paper-sunk)]" style={field}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ---------------- Step 2 ---------------- */}
          {step === 2 && (
            <div
              className="pt-foot"
              style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
            >
              <h2 style={{ fontSize: "var(--t-record)", fontWeight: 600, margin: 0 }}>
                Budget and standard
              </h2>

              <div className="mt-foot grid gap-foot sm:grid-cols-2 max-w-[34rem]">
                <div className="flex flex-col gap-hair">
                  <label htmlFor="bmin" className="rubric">Lowest, per person per night</label>
                  <input
                    id="bmin" type="number" min={1500} max={10000} step={100} value={d.budgetMin}
                    onChange={(e) => set("budgetMin", Number(e.target.value) || 1500)}
                    className="tabular px-palm bg-[var(--paper-sunk)]" style={field}
                  />
                </div>
                <div className="flex flex-col gap-hair">
                  <label htmlFor="bmax" className="rubric">Highest, per person per night</label>
                  <input
                    id="bmax" type="number" min={1500} max={12000} step={100} value={d.budgetMax}
                    onChange={(e) => set("budgetMax", Number(e.target.value) || 1500)}
                    className="tabular px-palm bg-[var(--paper-sunk)]" style={field}
                  />
                </div>
              </div>

              {/* The reckoning, computed as they type */}
              <div
                className="mt-foot pt-palm flex flex-wrap items-baseline justify-between gap-palm max-w-[34rem]"
                style={{ borderTop: "var(--rule-mid) solid var(--rule-ink)" }}
              >
                <span className="rubric">
                  {travellers} {travellers === 1 ? "traveller" : "travellers"} &middot;{" "}
                  {d.nights} nights
                </span>
                <span className="tabular">
                  <span
                    className="font-[family-name:var(--font-record)]"
                    style={{ fontSize: "var(--t-record)", fontWeight: 600 }}
                  >
                    {fmtEGP(estimate.low)}&ndash;{fmtEGP(estimate.high)}
                  </span>
                  <span className="text-fine text-ink-secondary"> EGP in total</span>
                </span>
              </div>
              {d.budgetMax < d.budgetMin && (
                <p className="text-fine mt-palm mb-0" style={{ color: "var(--silt)" }}>
                  The highest figure is below the lowest. Raise it before
                  continuing.
                </p>
              )}

              <fieldset className="m-0 p-0 mt-fathom" style={{ border: 0 }}>
                <legend className="rubric p-0 mb-palm">Lowest reading you will consider</legend>
                <QualityFloorPicker value={d.floor} onChange={(v) => set("floor", v)} />
              </fieldset>

              <fieldset className="m-0 p-0 mt-fathom" style={{ border: 0 }}>
                <legend className="rubric p-0 mb-palm">Anything particular</legend>
                <div className="grid gap-finger sm:grid-cols-2">
                  {SPECIAL_REQUESTS.map((s) => (
                    <label key={s} className="flex items-center gap-finger cursor-pointer">
                      <input
                        type="checkbox" checked={d.specials.includes(s)}
                        onChange={() => toggle("specials", s)}
                        className="accent-[var(--lapis)]"
                      />
                      <span className="text-fine">{s}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {/* ---------------- Step 3 ---------------- */}
          {step === 3 && (
            <div
              className="pt-foot"
              style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
            >
              <h2 style={{ fontSize: "var(--t-record)", fontWeight: 600, margin: 0 }}>
                What matters on board
              </h2>
              <p className="text-fine text-ink-secondary mt-hair mb-0">
                Pick as many as you like. Operators see these and bid to meet
                them.
              </p>

              <fieldset className="m-0 p-0 mt-foot" style={{ border: 0 }}>
                <legend className="sr-only">Amenities</legend>
                <div className="grid gap-finger sm:grid-cols-2">
                  {AMENITIES.map((a) => (
                    <label key={a} className="flex items-center gap-finger cursor-pointer">
                      <input
                        type="checkbox" checked={d.amenities.includes(a)}
                        onChange={() => toggle("amenities", a)}
                        className="accent-[var(--lapis)]"
                      />
                      <span className="text-fine">{a}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-fathom flex flex-col gap-hair">
                <label htmlFor="notes" className="rubric">
                  Anything operators should know
                </label>
                <textarea
                  id="notes" rows={4} value={d.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="First time on the Nile, celebrating an anniversary, flexible on dates."
                  className="px-palm py-palm bg-[var(--paper-sunk)] max-w-[42rem]"
                  style={{
                    border: "var(--rule-thin) solid var(--rule-plain)",
                    borderRadius: "var(--radius-control)",
                    resize: "vertical",
                  }}
                />
                <span className="text-micro text-ink-tertiary">
                  Do not include your name, telephone number, or email. The
                  request stays anonymous.
                </span>
              </div>

              <label
                className="flex items-start gap-finger cursor-pointer mt-fathom max-w-[46ch]"
                style={{ minHeight: "var(--touch-min)" }}
              >
                <input
                  type="checkbox" checked={d.understood}
                  onChange={(e) => set("understood", e.target.checked)}
                  className="accent-[var(--lapis)] mt-hair"
                />
                <span className="text-fine">
                  I understand the request is anonymous, and that my contact
                  details are shared only when I accept a bid.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div
            className="mt-fathom pt-foot flex flex-wrap items-center justify-between gap-palm"
            style={{ borderTop: "var(--rule-mid) solid var(--rule-ink)" }}
          >
            <button
              type="button"
              className="plate plate--quiet"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </button>
            <span className="rubric tabular">Step {step} of 3</span>
            <button type="submit" className="plate plate--primary" disabled={!canAdvance}>
              {step === 3 ? "Post the request" : "Continue"}
            </button>
          </div>
        </form>
      </main>

      <Foot />
    </div>
  );
}
