"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BIDS, REQUEST, bandOf, fmtEGP, type Bid } from "@/lib/fleet";
import { BandLabel } from "@/components/score";
import { Masthead, Foot } from "@/components/chrome";

type BidSort = "reading" | "price" | "recent";

const travellers = REQUEST.adults + REQUEST.children;
const totalFor = (b: Bid) => b.pricePerNight * travellers * REQUEST.nights;

/* Anonymous thread. The operator cannot see who is asking, and
   the panel says so rather than assuming the visitor remembers. */
function Thread({ bid, onClose }: { bid: Bid; onClose: () => void }) {
  const [messages, setMessages] = useState([
    {
      from: "you" as const,
      body: "Is the anniversary package included if we stay in the standard cabin?",
    },
    {
      from: "operator" as const,
      body: "Yes. Flowers and a dinner on the sun deck are included whichever cabin you take. The suite is extra space and a better view, nothing more.",
    },
  ]);
  const [draft, setDraft] = useState("");

  return (
    <div
      className="mt-foot pt-foot"
      style={{ borderTop: "var(--rule-thin) solid var(--rule-plain)" }}
    >
      <div className="flex items-baseline justify-between gap-palm">
        <h4 className="rubric m-0">
          Anonymous thread &middot; {bid.vesselName}
        </h4>
        <button type="button" className="rubric" onClick={onClose}>
          Close
        </button>
      </div>

      <p className="text-micro mt-finger mb-foot" style={{ color: "var(--reed)" }}>
        The operator sees your questions, not your identity.
      </p>

      <ol className="list-none m-0 p-0 grid gap-palm">
        {messages.map((m, i) => (
          <li
            key={i}
            className="py-palm px-foot"
            style={{
              background:
                m.from === "you" ? "var(--lapis-wash)" : "var(--paper-sunk)",
              borderRadius: "var(--radius-control)",
              maxWidth: "46ch",
              marginInlineStart: m.from === "you" ? "auto" : undefined,
            }}
          >
            <span className="rubric block mb-hair">
              {m.from === "you" ? "You" : bid.operator}
            </span>
            <span className="text-fine">{m.body}</span>
          </li>
        ))}
      </ol>

      <form
        className="mt-foot flex flex-wrap gap-palm items-end"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          setMessages((m) => [...m, { from: "you", body: draft.trim() }]);
          setDraft("");
        }}
      >
        <div className="flex flex-col gap-hair flex-1 min-w-[16rem]">
          <label htmlFor={`msg-${bid.id}`} className="rubric">
            Ask a question
          </label>
          <input
            id={`msg-${bid.id}`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Can you hold these dates for a week?"
            className="px-palm bg-[var(--paper-sunk)] w-full"
            style={{
              minHeight: "var(--touch-min)",
              border: "var(--rule-thin) solid var(--rule-plain)",
              borderRadius: "var(--radius-control)",
            }}
          />
        </div>
        <button type="submit" className="plate plate--quiet" disabled={!draft.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

export default function BidsPage() {
  const [sort, setSort] = useState<BidSort>("reading");
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<Bid | null>(null);
  const [confirming, setConfirming] = useState<Bid | null>(null);

  const bids = useMemo(() => {
    const out = [...BIDS];
    if (sort === "price") return out.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "recent") return out.sort((a, b) => a.respondedHoursAgo - b.respondedHoursAgo);
    return out.sort((a, b) => b.total - a.total);
  }, [sort]);

  const cheapest = Math.min(...BIDS.map((b) => b.pricePerNight));
  const best = Math.max(...BIDS.map((b) => b.total));

  if (accepted) {
    return (
      <div className="relative flex-1 flex flex-col">
        <Masthead />
        <main className="px-span md:px-reach pb-crest flex-1 pt-fathom">
          <p className="rubric" style={{ color: "var(--reed)" }}>Bid accepted</p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, var(--t-flood))",
              fontWeight: 600,
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tr-crest)",
              maxWidth: "20ch",
            }}
          >
            {accepted.operator} has your details.
          </h1>
          <p className="text-lead text-ink-secondary mt-foot max-w-[52ch]">
            Your contact information was shared the moment you accepted, and
            not before. They will be in touch within a day to settle the cabin
            and the deposit.
          </p>
          <dl
            className="mt-fathom grid sm:grid-cols-3 gap-x-fathom m-0 max-w-[52rem] pt-foot"
            style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
          >
            {[
              ["Vessel", accepted.vesselName],
              ["Total", `${fmtEGP(totalFor(accepted))} EGP`],
              ["Reference", `DEAL-2027-00512`],
            ].map(([k, v]) => (
              <div key={k} className="py-palm" style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}>
                <dt className="rubric">{k}</dt>
                <dd className="m-0 text-fine tabular">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-fathom">
            <Link href="/search" className="plate plate--quiet no-underline">
              Back to the register
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
        <div className="pt-fathom">
          <h1 className="station__title" style={{ fontSize: "clamp(2.25rem, 5.5vw, var(--t-flood))" }}>
            Bids against your terms
          </h1>
          <p className="lede">
            Request {REQUEST.reference} &middot; expires in{" "}
            {REQUEST.expiresInDays} days &middot; you are still anonymous
          </p>
        </div>

        {/* The terms being bid against, kept in view */}
        <dl
          className="mt-foot grid sm:grid-cols-3 lg:grid-cols-6 gap-x-foot m-0 pt-palm"
          style={{ borderTop: "var(--rule-thin) solid var(--rule-plain)" }}
        >
          {[
            ["Departure", REQUEST.departure],
            ["Voyage", `${REQUEST.nights} nights`],
            ["Route", REQUEST.route],
            ["Travellers", String(travellers)],
            ["Budget", `${fmtEGP(REQUEST.budgetMin)}–${fmtEGP(REQUEST.budgetMax)}`],
            ["Floor", REQUEST.qualityFloorLabel],
          ].map(([k, v]) => (
            <div key={k} className="py-finger">
              <dt className="rubric">{k}</dt>
              <dd className="m-0 text-fine tabular">{v}</dd>
            </div>
          ))}
        </dl>

        <div
          className="mt-fathom flex items-end justify-between gap-foot flex-wrap pb-finger"
          style={{ borderBottom: "var(--rule-crest) solid var(--rule-ink)" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-record)",
              fontSize: "var(--t-station)",
              fontWeight: 600,
              letterSpacing: "var(--tr-cubit)",
              margin: 0,
            }}
          >
            {BIDS.length} operators replied
          </h2>
          <div className="flex items-center gap-finger">
            <label htmlFor="bidsort" className="rubric">Order by</label>
            <select
              id="bidsort"
              value={sort}
              onChange={(e) => setSort(e.target.value as BidSort)}
              className="px-palm text-fine bg-[var(--paper-sunk)]"
              style={{
                minHeight: "var(--touch-min)",
                border: "var(--rule-thin) solid var(--rule-plain)",
                borderRadius: "var(--radius-control)",
              }}
            >
              <option value="reading">Reading, highest first</option>
              <option value="price">Price, lowest first</option>
              <option value="recent">Most recent</option>
            </select>
          </div>
        </div>

        {bids.map((bid) => {
          const band = bandOf(bid.band);
          const overBudget = bid.pricePerNight > REQUEST.budgetMax;
          return (
            <article
              key={bid.id}
              className="record py-foot px-span"
              data-state={undefined}
            >
              <div className="grid gap-x-foot gap-y-palm grid-cols-[auto_1fr] md:grid-cols-[7.5rem_1fr_auto] items-start">
                <div className="flex flex-col">
                  <span
                    className="font-[family-name:var(--font-record)] tabular leading-none"
                    style={{
                      fontSize: "var(--t-cubit)",
                      fontWeight: 600,
                      letterSpacing: "var(--tr-cubit)",
                    }}
                  >
                    {bid.total.toFixed(2)}
                  </span>
                  <span className="mt-finger">
                    <BandLabel band={bid.band} />
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 style={{ fontSize: "var(--t-record)", fontWeight: 500, margin: 0 }}>
                    <Link href={`/vessel/${bid.vesselSlug}`} className="no-underline hover:underline">
                      {bid.vesselName}
                    </Link>
                  </h3>
                  <p className="text-fine text-ink-secondary mt-hair mb-0">
                    {bid.operator} &middot; replied {bid.respondedHoursAgo}h ago
                  </p>

                  <ul className="list-none m-0 mt-palm p-0 grid gap-hair">
                    {bid.inclusions.map((inc) => (
                      <li key={inc} className="text-fine flex gap-finger">
                        <span aria-hidden="true" style={{ color: "var(--reed)" }}>&mdash;</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  <blockquote
                    className="m-0 mt-foot ps-foot max-w-[54ch]"
                    style={{ borderInlineStart: "var(--rule-thin) solid var(--rule-plain)" }}
                  >
                    <p className="m-0 text-fine text-ink-secondary">{bid.message}</p>
                  </blockquote>
                </div>

                <div className="col-start-2 md:col-start-auto md:text-end">
                  <div className="tabular">
                    <span
                      className="font-[family-name:var(--font-record)]"
                      style={{ fontSize: "var(--t-record)", fontWeight: 500 }}
                    >
                      {fmtEGP(bid.pricePerNight)}
                    </span>
                    <span className="text-fine text-ink-secondary"> EGP</span>
                  </div>
                  <div className="text-micro text-ink-tertiary">
                    per person per night
                  </div>
                  <div className="text-fine tabular mt-finger">
                    {fmtEGP(totalFor(bid))} EGP total
                  </div>

                  {/* State prints itself as content */}
                  <ul className="list-none m-0 mt-finger p-0 text-micro grid gap-hair md:justify-items-end">
                    {bid.pricePerNight === cheapest && (
                      <li style={{ color: "var(--reed)" }}>Lowest bid</li>
                    )}
                    {bid.total === best && (
                      <li style={{ color: "var(--reed)" }}>Highest reading</li>
                    )}
                    {overBudget && (
                      <li style={{ color: "var(--silt)" }}>Above your ceiling</li>
                    )}
                  </ul>

                  <div className="mt-foot flex flex-wrap gap-finger md:justify-end">
                    <button
                      type="button"
                      className="plate plate--quiet"
                      onClick={() =>
                        setOpenThread(openThread === bid.id ? null : bid.id)
                      }
                      aria-expanded={openThread === bid.id}
                    >
                      {openThread === bid.id ? "Hide thread" : "Ask a question"}
                    </button>
                    <button
                      type="button"
                      className="plate plate--primary"
                      onClick={() => setConfirming(bid)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>

              {openThread === bid.id && (
                <Thread bid={bid} onClose={() => setOpenThread(null)} />
              )}
            </article>
          );
        })}

        <p
          className="text-micro text-ink-tertiary mt-foot pt-palm mb-0"
          style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}
        >
          Bids shown here are sample entries used while the operator side is
          connected.
        </p>
      </main>

      {/* Acceptance confirmation — the one place a modal is right,
          because the action reveals identity and cannot be undone. */}
      {confirming && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-span"
          style={{ background: "rgba(28,26,21,0.45)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div
            className="w-full max-w-[34rem] p-foot"
            style={{
              background: "var(--paper-raised)",
              boxShadow: "var(--lift-panel)",
              borderTop: "var(--rule-crest) solid var(--rule-ink)",
            }}
          >
            <h2 id="confirm-title" style={{ fontSize: "var(--t-record)", fontWeight: 600, margin: 0 }}>
              Accepting reveals who you are
            </h2>
            <p className="text-fine text-ink-secondary mt-palm">
              {confirming.operator} will receive your name and contact details
              so they can settle the booking. Until you press accept, they know
              nothing about you.
            </p>
            <dl className="grid grid-cols-2 gap-x-foot m-0 mt-foot">
              <div className="py-finger" style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}>
                <dt className="rubric">Vessel</dt>
                <dd className="m-0 text-fine">{confirming.vesselName}</dd>
              </div>
              <div className="py-finger" style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}>
                <dt className="rubric">Total</dt>
                <dd className="m-0 text-fine tabular">
                  {fmtEGP(totalFor(confirming))} EGP
                </dd>
              </div>
            </dl>
            <div className="mt-foot flex flex-wrap gap-palm justify-end">
              <button
                type="button"
                className="plate plate--quiet"
                onClick={() => setConfirming(null)}
              >
                Not yet
              </button>
              <button
                type="button"
                className="plate plate--primary"
                onClick={() => {
                  setAccepted(confirming);
                  setConfirming(null);
                }}
              >
                Accept and share my details
              </button>
            </div>
          </div>
        </div>
      )}

      <Foot />
    </div>
  );
}
