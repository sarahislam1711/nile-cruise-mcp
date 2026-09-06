"use client";

import { useState } from "react";
import Link from "next/link";
import { BIDS, REQUEST, fmtEGP, fmtDate } from "@/lib/fleet";
import { Masthead, Foot } from "@/components/chrome";

/* §5.5 — a live request. Two states share this screen: waiting,
   and bids received. The waiting state is the one people spend
   the most time in, so it carries the most reassurance. */

export default function RequestStatusPage() {
  // Frontend only: toggling this demonstrates both states without a
  // backend. Replace with the request's real bid count.
  const [demoBids, setDemoBids] = useState(0);
  const waiting = demoBids === 0;

  return (
    <div className="relative flex-1 flex flex-col">
      <Masthead />

      <main className="px-span md:px-reach pb-crest flex-1">
        <div className="pt-fathom">
          <p className="rubric" style={{ color: waiting ? "var(--bronze)" : "var(--reed)" }}>
            {waiting ? "Posted and live" : `${demoBids} bids received`}
          </p>
          <h1
            className="station__title mt-palm"
            style={{ fontSize: "clamp(2rem, 5vw, var(--t-flood))" }}
          >
            {waiting ? "Your terms are on the water." : "Operators have answered."}
          </h1>
          <p className="lede">
            {waiting ? (
              <>
                Request {REQUEST.reference} is visible to every operator whose
                vessels meet your floor.{" "}
                <strong>They can see your terms, not you.</strong>
              </>
            ) : (
              <>
                Each bid carries its vessel&rsquo;s audited reading, so a lower
                price and a lower standard cannot be confused.
              </>
            )}
          </p>
        </div>

        {/* The terms, as a ruled record of what was posted */}
        <section
          aria-labelledby="terms"
          className="station station--minor"
        >
          <h2 id="terms" className="station__title mb-foot">
            What you posted
          </h2>
          <dl className="grid sm:grid-cols-3 lg:grid-cols-4 gap-x-fathom gap-y-0 m-0 max-w-[62rem]">
            {[
              ["Reference", REQUEST.reference],
              ["Departure", fmtDate(REQUEST.departure)],
              ["Voyage", `${REQUEST.nights} nights`],
              ["Route", REQUEST.route],
              ["Travellers", `${REQUEST.adults} adults`],
              ["Budget", `${fmtEGP(REQUEST.budgetMin)}–${fmtEGP(REQUEST.budgetMax)} EGP`],
              ["Quality floor", REQUEST.qualityFloorLabel],
              ["Expires", `in ${REQUEST.expiresInDays} days`],
            ].map(([k, v]) => (
              <div
                key={k}
                className="py-palm"
                style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}
              >
                <dt className="rubric">{k}</dt>
                <dd className="m-0 text-fine tabular">{v}</dd>
              </div>
            ))}
          </dl>

          {REQUEST.notes && (
            <p className="marginal">
              &ldquo;{REQUEST.notes}&rdquo;
            </p>
          )}

          <div className="mt-foot flex flex-wrap gap-palm">
            <Link href="/request" className="plate plate--quiet no-underline">
              Edit the terms
            </Link>
            <button type="button" className="plate plate--quiet">
              Withdraw the request
            </button>
          </div>
        </section>

        {/* Waiting state — the screen people sit in longest */}
        {waiting ? (
          <section aria-labelledby="waiting" className="station">
            <div className="station__gradations" aria-hidden="true" />
            <span className="station__plate" aria-hidden="true">&mdash;</span>
            <h2 id="waiting" className="station__title mt-palm">
              No bids yet
            </h2>
            <p className="station__standfirst">
              Requests posted in the afternoon are usually answered by the
              following morning. Yours has {REQUEST.expiresInDays} days to run.
            </p>

            <ul className="noted">
              <li>
                <strong>You will be emailed</strong>
                Every bid arrives with the vessel&rsquo;s audited reading
                attached, so you can compare before you reply.
              </li>
              <li>
                <strong>Questions stay anonymous</strong>
                You can ask an operator anything before accepting, and they
                still will not know who you are.
              </li>
              <li>
                <strong>Nothing is committed</strong>
                A request is not a booking. You can withdraw it at any point
                before you accept a bid.
              </li>
            </ul>

            <div className="mt-fathom flex flex-wrap gap-palm">
              <Link href="/search" className="plate plate--primary no-underline">
                Read the register while you wait
              </Link>
              {/* Frontend demonstration only */}
              <button
                type="button"
                className="plate plate--quiet"
                onClick={() => setDemoBids(BIDS.length)}
              >
                Preview the bids state
              </button>
            </div>

            <p className="text-micro text-ink-tertiary mt-foot mb-0">
              The preview button exists only while the operator side is
              connected.
            </p>
          </section>
        ) : (
          <section aria-labelledby="arrived" className="station">
            <div className="station__gradations" aria-hidden="true" />
            <span className="station__plate" aria-hidden="true">
              {demoBids}
            </span>
            <h2 id="arrived" className="station__title mt-palm">
              Bids are in
            </h2>
            <p className="station__standfirst">
              {demoBids} operators have answered your terms. Compare them
              against each other and against the register.
            </p>
            <div className="mt-fathom flex flex-wrap gap-palm">
              <Link href="/bids" className="plate plate--primary no-underline">
                Compare the bids
              </Link>
              <button
                type="button"
                className="plate plate--quiet"
                onClick={() => setDemoBids(0)}
              >
                Back to waiting state
              </button>
            </div>
          </section>
        )}
      </main>

      <Foot />
    </div>
  );
}
