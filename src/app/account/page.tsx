"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BOOKINGS,
  SAVED_SEARCHES,
  WISHLIST,
  bandOf,
  fmtDate,
  fmtEGP,
  vesselBySlug,
  type Booking,
} from "@/lib/fleet";
import { BandLabel } from "@/components/score";
import { Masthead, Foot } from "@/components/chrome";

const STATUS: Record<Booking["status"], { label: string; tone: string }> = {
  confirmed: { label: "Confirmed", tone: "var(--reed)" },
  "awaiting-deposit": { label: "Deposit due", tone: "var(--silt)" },
  completed: { label: "Sailed", tone: "var(--ink-tertiary)" },
};

type Tab = "voyages" | "wishlist" | "searches";

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("voyages");
  const [wish, setWish] = useState(WISHLIST);
  const [searches, setSearches] = useState(SAVED_SEARCHES);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "voyages", label: "Voyages", count: BOOKINGS.length },
    { key: "wishlist", label: "Watching", count: wish.length },
    { key: "searches", label: "Saved readings", count: searches.length },
  ];

  return (
    <div className="relative flex-1 flex flex-col">
      <Masthead />

      <main className="px-span md:px-reach pb-crest flex-1">
        <div className="pt-fathom">
          <h1
            className="station__title"
            style={{ fontSize: "clamp(2rem, 5vw, var(--t-flood))" }}
          >
            Your ledger
          </h1>
          <p className="lede">
            Voyages booked, vessels you are watching, and the readings you have
            saved.
          </p>
        </div>

        {/* Tabs, ruled as a register index rather than pills */}
        <div
          className="mt-fathom flex gap-0 flex-wrap"
          role="tablist"
          aria-label="Account sections"
          style={{ borderBottom: "var(--rule-crest) solid var(--rule-ink)" }}
        >
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className="px-foot text-start"
                style={{
                  minHeight: "var(--touch-min)",
                  background: active ? "var(--ink)" : "transparent",
                  color: active ? "var(--paper)" : "var(--ink-secondary)",
                  fontFamily: "var(--font-record)",
                  fontSize: "var(--t-record)",
                  fontWeight: active ? 600 : 500,
                  border: 0,
                  borderTopLeftRadius: "var(--radius-control)",
                  borderTopRightRadius: "var(--radius-control)",
                }}
              >
                {t.label}{" "}
                <span className="tabular text-fine opacity-70">{t.count}</span>
              </button>
            );
          })}
        </div>

        {/* ---------------- Voyages ---------------- */}
        {tab === "voyages" && (
          <section aria-label="Booked voyages">
            {BOOKINGS.map((b) => {
              const st = STATUS[b.status];
              return (
                <article key={b.reference} className="record py-cubit px-span">
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
                        {b.total.toFixed(2)}
                      </span>
                      <span className="mt-finger">
                        <BandLabel band={b.band} />
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h2
                        style={{
                          fontSize: "var(--t-record)",
                          fontWeight: 500,
                          lineHeight: "var(--lh-record)",
                          margin: 0,
                        }}
                      >
                        <Link
                          href={`/vessel/${b.vesselSlug}`}
                          className="no-underline hover:underline"
                        >
                          {b.vesselName}
                        </Link>
                      </h2>
                      <p className="text-fine text-ink-secondary mt-hair mb-0">
                        {fmtDate(b.departure)} &middot; {b.nights} nights &middot;{" "}
                        {b.cabin}
                      </p>
                      <dl className="flex flex-wrap gap-x-foot gap-y-hair mt-finger mb-0 text-micro text-ink-tertiary tabular">
                        <div className="flex gap-hair">
                          <dt className="sr-only">Reference</dt>
                          <dd className="m-0">{b.reference}</dd>
                        </div>
                        <div className="flex gap-hair">
                          <dt className="sr-only">Guests</dt>
                          <dd className="m-0">{b.guests} guests</dd>
                        </div>
                        <div className="flex gap-hair">
                          <dt className="sr-only">Operator</dt>
                          <dd className="m-0">{b.operator}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="col-start-2 md:col-start-auto md:text-end">
                      <div className="tabular">
                        <span
                          className="font-[family-name:var(--font-record)]"
                          style={{ fontSize: "var(--t-record)", fontWeight: 500 }}
                        >
                          {fmtEGP(b.paid)}
                        </span>
                        <span className="text-fine text-ink-secondary"> EGP</span>
                      </div>
                      <div className="text-micro text-ink-tertiary">
                        {b.status === "awaiting-deposit" ? "deposit paid" : "paid in full"}
                      </div>
                      <p
                        className="text-micro font-semibold mt-finger mb-0"
                        style={{ color: st.tone }}
                      >
                        {st.label}
                      </p>
                      <div className="mt-foot flex flex-wrap gap-finger md:justify-end">
                        <button type="button" className="plate plate--quiet">
                          Itinerary
                        </button>
                        {b.status === "awaiting-deposit" && (
                          <button type="button" className="plate plate--primary">
                            Pay deposit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* ---------------- Wishlist ---------------- */}
        {tab === "wishlist" && (
          <section aria-label="Vessels you are watching">
            {wish.length === 0 ? (
              <div className="py-flood text-center">
                <p className="pull mx-auto">Nothing on watch yet.</p>
                <p className="text-fine text-ink-secondary mt-palm mb-foot max-w-[46ch] mx-auto">
                  Saving a vessel keeps its reading and its price in view, and
                  tells you when either one moves.
                </p>
                <Link href="/search" className="plate plate--primary no-underline">
                  Read the register
                </Link>
              </div>
            ) : (
              wish.map((w) => {
                const v = vesselBySlug(w.vesselSlug);
                if (!v) return null;
                const delta = v.price - w.priceWhenSaved;
                return (
                  <article key={w.vesselSlug} className="record py-cubit px-span">
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
                          {v.total.toFixed(2)}
                        </span>
                        <span className="mt-finger">
                          <BandLabel band={v.band} />
                        </span>
                      </div>

                      <div className="min-w-0">
                        <h2 style={{ fontSize: "var(--t-record)", fontWeight: 500, margin: 0 }}>
                          <Link href={`/vessel/${v.slug}`} className="no-underline hover:underline">
                            {v.name}
                          </Link>
                        </h2>
                        <p className="text-fine text-ink-secondary mt-hair mb-0">
                          {v.route} &middot; {v.nights} nights
                        </p>
                        <p className="text-micro text-ink-tertiary mt-finger mb-0 tabular">
                          Watching since {fmtDate(w.savedOn)}
                        </p>
                      </div>

                      <div className="col-start-2 md:col-start-auto md:text-end">
                        <div className="tabular">
                          <span
                            className="font-[family-name:var(--font-record)]"
                            style={{ fontSize: "var(--t-record)", fontWeight: 500 }}
                          >
                            {fmtEGP(v.price)}
                          </span>
                          <span className="text-fine text-ink-secondary"> EGP</span>
                        </div>
                        {/* Price movement, printed as content */}
                        {delta !== 0 && (
                          <p
                            className="text-micro mt-finger mb-0 tabular font-semibold"
                            style={{ color: delta < 0 ? "var(--reed)" : "var(--silt)" }}
                          >
                            {delta < 0 ? "Down " : "Up "}
                            {fmtEGP(Math.abs(delta))} since you saved it
                          </p>
                        )}
                        <div className="mt-foot flex flex-wrap gap-finger md:justify-end">
                          <button
                            type="button"
                            className="plate plate--quiet"
                            onClick={() =>
                              setWish((prev) =>
                                prev.filter((x) => x.vesselSlug !== w.vesselSlug)
                              )
                            }
                          >
                            Stop watching
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        )}

        {/* ---------------- Saved searches ---------------- */}
        {tab === "searches" && (
          <section aria-label="Saved readings">
            {searches.map((s) => {
              const band = s.floor === 40 ? null : bandOf(
                s.floor >= 92.85 ? "luxury" : s.floor >= 81.7 ? "deluxe" :
                s.floor >= 77.3 ? "superior" : s.floor >= 70.6 ? "standard" : "basic"
              );
              return (
                <article key={s.id} className="record py-cubit px-span">
                  <div className="grid gap-x-foot gap-y-palm md:grid-cols-[1fr_auto] items-start">
                    <div className="min-w-0">
                      <h2 style={{ fontSize: "var(--t-record)", fontWeight: 500, margin: 0 }}>
                        {s.label}
                      </h2>
                      <dl className="flex flex-wrap gap-x-foot gap-y-hair mt-palm mb-0 text-fine text-ink-secondary tabular">
                        <div className="flex gap-hair">
                          <dt className="sr-only">Route</dt>
                          <dd className="m-0">{s.route}</dd>
                        </div>
                        <div className="flex gap-hair">
                          <dt className="sr-only">Nights</dt>
                          <dd className="m-0">
                            {s.nights ? `${s.nights} nights` : "Any length"}
                          </dd>
                        </div>
                        <div className="flex gap-hair">
                          <dt className="sr-only">Quality floor</dt>
                          <dd className="m-0">
                            {band ? `${band.name} and above` : "Any reading"}
                          </dd>
                        </div>
                        <div className="flex gap-hair">
                          <dt className="sr-only">Ceiling</dt>
                          <dd className="m-0">up to {fmtEGP(s.budgetMax)} EGP</dd>
                        </div>
                      </dl>
                      <p className="text-micro text-ink-tertiary mt-finger mb-0 tabular">
                        {s.matches} vessels match today
                      </p>
                    </div>

                    <div className="md:text-end">
                      <label className="flex items-center gap-finger cursor-pointer md:justify-end">
                        <input
                          type="checkbox"
                          checked={s.alerting}
                          onChange={() =>
                            setSearches((prev) =>
                              prev.map((x) =>
                                x.id === s.id ? { ...x, alerting: !x.alerting } : x
                              )
                            )
                          }
                          className="accent-[var(--lapis)]"
                        />
                        <span className="text-fine">Email me changes</span>
                      </label>
                      <div className="mt-foot flex flex-wrap gap-finger md:justify-end">
                        <Link href="/search" className="plate plate--primary no-underline">
                          Run it
                        </Link>
                        <button
                          type="button"
                          className="plate plate--quiet"
                          onClick={() =>
                            setSearches((prev) => prev.filter((x) => x.id !== s.id))
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {searches.length === 0 && (
              <div className="py-flood text-center">
                <p className="pull mx-auto">No saved readings.</p>
                <p className="text-fine text-ink-secondary mt-palm mb-foot max-w-[46ch] mx-auto">
                  Saving a set of filters lets you run it again in one press,
                  and be told when a new vessel meets it.
                </p>
                <Link href="/search" className="plate plate--primary no-underline">
                  Read the register
                </Link>
              </div>
            )}
          </section>
        )}

        <p
          className="text-micro text-ink-tertiary mt-fathom pt-palm mb-0"
          style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}
        >
          Bookings, watched vessels, and saved readings shown here are sample
          entries used while accounts are connected.
        </p>
      </main>

      <Foot />
    </div>
  );
}
