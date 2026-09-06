"use client";

import { useState } from "react";
import Link from "next/link";
import { FLEET, fmtEGP, type Vessel } from "@/lib/fleet";
import { BandLabel } from "@/components/score";

/* ============================================================
   The assistant — a six-question interview, then a ranked
   reading. Frontend only: the ranking below is a transparent
   scoring function over the sample fleet, not a model call.

   When the Claude-backed assistant is connected, replace
   `recommend()` with the API call. The question set and the
   result shape are the contract.
   ============================================================ */

type Answers = {
  budget: "value" | "mid" | "comfort" | "luxury" | null;
  priorities: string[];
  purpose: string | null;
  amenities: string[];
  nights: number | null;
};

const EMPTY: Answers = {
  budget: null,
  priorities: [],
  purpose: null,
  amenities: [],
  nights: null,
};

const BUDGETS = [
  { key: "value", label: "Value", range: "2,000–3,000 EGP", note: "Simple comfort, friendly crew" },
  { key: "mid", label: "Mid-range", range: "3,000–4,500 EGP", note: "Private bathroom, tours, variety" },
  { key: "comfort", label: "Comfort", range: "4,500–6,000 EGP", note: "Suite or balcony, better dining" },
  { key: "luxury", label: "Top of the register", range: "6,000+ EGP", note: "Small boat, gourmet, private guide" },
] as const;

const PRIORITIES = [
  "Food and dining",
  "Cabin comfort",
  "Guided tours",
  "Quiet and space",
  "Entertainment",
  "Value for money",
  "Service",
] as const;

const PURPOSES = [
  "Honeymoon or anniversary",
  "Family trip",
  "History and temples",
  "Rest and quiet",
  "Travelling alone",
] as const;

const WANTS = [
  "Swimming pool",
  "Wi-Fi",
  "Nile-view deck",
  "Guided tours included",
  "Balcony cabins",
  "Gym",
  "Spa",
] as const;

const BUDGET_CEILING: Record<string, number> = {
  value: 3000, mid: 4500, comfort: 6000, luxury: 99000,
};

/* A transparent ranking, so the reasons shown are the real ones. */
function recommend(a: Answers): { vessel: Vessel; why: string[] }[] {
  const ceiling = a.budget ? BUDGET_CEILING[a.budget] : 99000;

  return FLEET.map((v) => {
    const why: string[] = [];
    let score = v.total;

    if (v.price <= ceiling) {
      score += 6;
      why.push("Inside your budget");
    } else {
      score -= 14;
    }

    if (a.priorities.includes("Food and dining") && v.scores.food >= 19) {
      score += 5; why.push(`Food scores ${v.scores.food} of 20`);
    }
    if (a.priorities.includes("Service") && v.scores.service >= 27) {
      score += 5; why.push(`Service scores ${v.scores.service} of 30`);
    }
    if (a.priorities.includes("Cabin comfort") && v.scores.amenities >= 18) {
      score += 4; why.push(`Amenities score ${v.scores.amenities} of 20`);
    }
    if (a.priorities.includes("Quiet and space") && v.capacity <= 20) {
      score += 6; why.push(`Only ${v.capacity} guests on board`);
    }
    if (a.priorities.includes("Value for money")) {
      score += (10000 - v.price) / 500;
      why.push("Strong reading for the price");
    }
    if (a.purpose === "Family trip" && v.amenities.includes("Swimming pool")) {
      score += 3; why.push("Pool on board");
    }
    if (a.purpose === "Honeymoon or anniversary" && v.capacity <= 90) {
      score += 2;
    }
    if (a.nights && v.nights === a.nights) {
      score += 3; why.push(`${v.nights}-night voyage`);
    }

    const matched = a.amenities.filter((x) => v.amenities.includes(x));
    score += matched.length * 2;
    if (matched.length) why.push(`Has ${matched.slice(0, 2).join(" and ").toLowerCase()}`);

    if (v.state === "soldout") score -= 40;

    return { vessel: v, score, why: why.slice(0, 3) };
  })
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map(({ vessel, why }) => ({ vessel, why }));
}

function Chip({
  active, onClick, children,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="text-fine px-foot text-start"
      style={{
        minHeight: "var(--touch-min)",
        border: `var(--rule-thin) solid ${active ? "var(--lapis)" : "var(--rule-plain)"}`,
        borderRadius: "var(--radius-control)",
        background: active ? "var(--lapis)" : "transparent",
        color: active ? "var(--paper)" : "var(--ink)",
      }}
    >
      {children}
    </button>
  );
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);

  const toggle = (k: "priorities" | "amenities", v: string) =>
    setA((p) => ({
      ...p,
      [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v],
    }));

  const results = step === 5 ? recommend(a) : [];

  return (
    <>
      {/* The call. Pinned, out of the way of the mobile nav. */}
      {/* The call rides in the footer's own row rather than taking a
          band of its own: a plate in the register's voice, primary
          weight, since it is the one thing on the page that answers a
          reader who does not know how to read it. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="plate plate--primary shrink-0"
          style={{ paddingInline: "var(--m-foot)" }}
        >
          <span
            className="font-[family-name:var(--font-record)]"
            style={{
              fontSize: "var(--t-record)",
              fontWeight: 600,
              letterSpacing: "var(--tr-cubit)",
              lineHeight: 1.1,
            }}
          >
            Five questions
          </span>
          <span
            aria-hidden="true"
            style={{ color: "var(--paper)", opacity: 0.7, fontSize: "var(--t-record)" }}
          >
            &rarr;
          </span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(28,26,21,0.35)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Reading assistant"
        >
          <div
            className="w-full sm:max-w-[30rem] h-full overflow-y-auto contain-scroll p-foot"
            style={{
              background: "var(--paper-raised)",
              boxShadow: "var(--lift-panel)",
              borderInlineStart: "var(--rule-crest) solid var(--rule-ink)",
            }}
          >
            <div className="flex items-baseline justify-between gap-palm">
              <h2 style={{ fontSize: "var(--t-record)", fontWeight: 600, margin: 0 }}>
                Finding your reading
              </h2>
              <button type="button" className="rubric" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            {step < 5 && (
              <p className="rubric tabular mt-palm mb-foot">
                Question {step + 1} of 5
              </p>
            )}

            {/* 1 — budget */}
            {step === 0 && (
              <section>
                <h3 className="text-lead m-0">
                  What are you willing to spend, per person per night?
                </h3>
                <div className="grid gap-finger mt-foot">
                  {BUDGETS.map((b) => (
                    <Chip
                      key={b.key}
                      active={a.budget === b.key}
                      onClick={() => setA((p) => ({ ...p, budget: b.key }))}
                    >
                      <span className="block font-semibold">{b.label}</span>
                      <span className="block text-micro tabular opacity-80">
                        {b.range} &middot; {b.note}
                      </span>
                    </Chip>
                  ))}
                </div>
              </section>
            )}

            {/* 2 — priorities */}
            {step === 1 && (
              <section>
                <h3 className="text-lead m-0">What matters most on board?</h3>
                <p className="text-fine text-ink-secondary mt-hair">Pick as many as apply.</p>
                <div className="grid gap-finger mt-foot">
                  {PRIORITIES.map((p) => (
                    <Chip key={p} active={a.priorities.includes(p)} onClick={() => toggle("priorities", p)}>
                      {p}
                    </Chip>
                  ))}
                </div>
              </section>
            )}

            {/* 3 — purpose */}
            {step === 2 && (
              <section>
                <h3 className="text-lead m-0">What is the trip for?</h3>
                <div className="grid gap-finger mt-foot">
                  {PURPOSES.map((p) => (
                    <Chip key={p} active={a.purpose === p} onClick={() => setA((x) => ({ ...x, purpose: p }))}>
                      {p}
                    </Chip>
                  ))}
                </div>
              </section>
            )}

            {/* 4 — amenities */}
            {step === 3 && (
              <section>
                <h3 className="text-lead m-0">Anything you would not travel without?</h3>
                <div className="grid gap-finger mt-foot">
                  {WANTS.map((w) => (
                    <Chip key={w} active={a.amenities.includes(w)} onClick={() => toggle("amenities", w)}>
                      {w}
                    </Chip>
                  ))}
                </div>
              </section>
            )}

            {/* 5 — length */}
            {step === 4 && (
              <section>
                <h3 className="text-lead m-0">How long do you want to be on the water?</h3>
                <div className="grid gap-finger mt-foot">
                  {[3, 4, 5].map((n) => (
                    <Chip key={n} active={a.nights === n} onClick={() => setA((p) => ({ ...p, nights: n }))}>
                      {n} nights
                    </Chip>
                  ))}
                  <Chip active={a.nights === null && step === 4} onClick={() => setA((p) => ({ ...p, nights: null }))}>
                    No preference
                  </Chip>
                </div>
              </section>
            )}

            {/* Results */}
            {step === 5 && (
              <section>
                <h3 className="text-lead m-0">Three readings for you</h3>
                <p className="text-fine text-ink-secondary mt-hair mb-foot">
                  Ranked against your answers. The reasons below are the actual
                  scores that decided the order.
                </p>

                {results.map(({ vessel, why }, i) => (
                  <article
                    key={vessel.slug}
                    className="py-foot"
                    style={{ borderTop: "var(--rule-thin) solid var(--rule-quiet)" }}
                  >
                    <div className="flex items-baseline justify-between gap-palm">
                      <span className="rubric">
                        {i === 0 ? "Closest match" : i === 1 ? "Also worth reading" : "One to compare"}
                      </span>
                      <span
                        className="font-[family-name:var(--font-record)] tabular"
                        style={{ fontSize: "var(--t-record)", fontWeight: 600 }}
                      >
                        {vessel.total.toFixed(2)}
                      </span>
                    </div>
                    <h4 style={{ fontSize: "var(--t-record)", fontWeight: 500, margin: "0.25rem 0 0" }}>
                      <Link href={`/vessel/${vessel.slug}`} className="no-underline hover:underline">
                        {vessel.name}
                      </Link>
                    </h4>
                    <p className="text-fine text-ink-secondary mt-hair mb-palm">
                      {vessel.route} &middot; {vessel.nights} nights &middot;{" "}
                      {fmtEGP(vessel.price)} EGP
                    </p>
                    <span><BandLabel band={vessel.band} /></span>
                    <ul className="list-none m-0 mt-palm p-0 grid gap-hair">
                      {why.map((w) => (
                        <li key={w} className="text-fine flex gap-finger">
                          <span aria-hidden="true" style={{ color: "var(--reed)" }}>&mdash;</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}

                <p className="text-micro text-ink-tertiary mt-foot">
                  Ranked here by a published scoring rule over the register.
                  Sample entries while the assistant is connected.
                </p>
              </section>
            )}

            {/* Navigation */}
            <div
              className="mt-fathom pt-foot flex items-center justify-between gap-palm"
              style={{ borderTop: "var(--rule-mid) solid var(--rule-ink)" }}
            >
              <button
                type="button"
                className="plate plate--quiet"
                onClick={() => (step === 0 ? setOpen(false) : setStep(step - 1))}
              >
                {step === 0 ? "Cancel" : "Back"}
              </button>
              {step < 5 ? (
                <button
                  type="button"
                  className="plate plate--primary"
                  onClick={() => setStep(step + 1)}
                >
                  {step === 4 ? "Show me" : "Next"}
                </button>
              ) : (
                <button
                  type="button"
                  className="plate plate--quiet"
                  onClick={() => { setA(EMPTY); setStep(0); }}
                >
                  Start again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
