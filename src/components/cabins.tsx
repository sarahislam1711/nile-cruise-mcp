"use client";

import { useState } from "react";
import { fmtEGP, type Vessel } from "@/lib/fleet";

export function CabinTable({ vessel }: { vessel: Vessel }) {
  const [guests, setGuests] = useState(2);
  const [selected, setSelected] = useState<string | null>(
    vessel.cabins.find((c) => c.available > 0)?.type ?? null
  );

  const chosen = vessel.cabins.find((c) => c.type === selected) ?? null;
  const total = chosen ? chosen.pricePerNight * guests * vessel.nights : 0;

  return (
    <div className="mt-foot">
      <div className="flex flex-wrap items-end gap-foot">
        <div className="flex flex-col gap-hair">
          <label htmlFor="cabin-depart" className="rubric">Departure</label>
          <input
            id="cabin-depart"
            type="date"
            defaultValue="2027-03-15"
            className="tabular px-palm bg-[var(--paper-sunk)]"
            style={{
              minHeight: "var(--touch-min)",
              border: "var(--rule-thin) solid var(--rule-plain)",
              borderRadius: "var(--radius-control)",
            }}
          />
        </div>
        <div className="flex flex-col gap-hair">
          <label htmlFor="cabin-guests" className="rubric">Guests</label>
          <input
            id="cabin-guests"
            type="number"
            min={1}
            max={8}
            value={guests}
            onChange={(e) =>
              setGuests(Math.max(1, Math.min(8, Number(e.target.value) || 1)))
            }
            className="tabular px-palm w-[5.5rem] bg-[var(--paper-sunk)]"
            style={{
              minHeight: "var(--touch-min)",
              border: "var(--rule-thin) solid var(--rule-plain)",
              borderRadius: "var(--radius-control)",
            }}
          />
        </div>
      </div>

      <div className="mt-foot overflow-x-auto">
        <table className="w-full border-collapse min-w-[34rem]">
          <caption className="sr-only">
            Cabins available on {vessel.name}, with price per person per night
          </caption>
          <thead>
            <tr>
              <th scope="col" className="rubric text-start pb-finger">Cabin</th>
              <th scope="col" className="rubric text-end pb-finger">Per person, per night</th>
              <th scope="col" className="rubric text-end pb-finger">Remaining</th>
              <th scope="col" className="rubric text-end pb-finger">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {vessel.cabins.map((c) => {
              const soldout = c.available === 0;
              const isSelected = c.type === selected;
              return (
                <tr
                  key={c.type}
                  style={{
                    borderTop: "var(--rule-thin) solid var(--rule-quiet)",
                    background: isSelected ? "var(--lapis-wash)" : undefined,
                    color: soldout ? "var(--ink-quiet)" : undefined,
                  }}
                >
                  <th scope="row" className="text-start py-palm pe-foot font-normal align-top">
                    <span className="block">{c.type}</span>
                    <span className="block text-micro text-ink-tertiary">
                      {c.detail}
                    </span>
                  </th>
                  <td className="py-palm text-end align-top tabular whitespace-nowrap">
                    <span
                      className="font-[family-name:var(--font-record)]"
                      style={{
                        fontSize: "var(--t-body)",
                        fontWeight: 600,
                        textDecoration: soldout ? "line-through" : undefined,
                        textDecorationColor: "var(--silt)",
                      }}
                    >
                      {fmtEGP(c.pricePerNight)}
                    </span>
                    <span className="text-ink-tertiary text-fine"> EGP</span>
                  </td>
                  <td className="py-palm text-end align-top tabular whitespace-nowrap">
                    {soldout ? (
                      <span className="text-micro font-semibold" style={{ color: "var(--silt)" }}>
                        None
                      </span>
                    ) : (
                      <span className="text-fine">{c.available}</span>
                    )}
                  </td>
                  <td className="py-palm text-end align-top">
                    <button
                      type="button"
                      className={`plate ${isSelected ? "plate--primary" : "plate--quiet"}`}
                      disabled={soldout}
                      onClick={() => setSelected(c.type)}
                      aria-pressed={isSelected}
                    >
                      {soldout ? "Sold out" : isSelected ? "Selected" : "Select"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* The reckoning — a computed total, set as a table foot */}
      <div
        className="mt-foot pt-foot flex flex-wrap items-end justify-between gap-foot"
        style={{ borderTop: "var(--rule-mid) solid var(--rule-ink)" }}
      >
        <div>
          <span className="rubric block">
            {chosen
              ? `${chosen.type} · ${guests} ${guests === 1 ? "guest" : "guests"} · ${vessel.nights} nights`
              : "No cabin selected"}
          </span>
          {chosen ? (
            <span className="text-micro text-ink-tertiary tabular">
              {fmtEGP(chosen.pricePerNight)} &times; {guests} &times;{" "}
              {vessel.nights}
            </span>
          ) : (
            <span className="text-micro text-ink-tertiary">
              Choose a cabin to see the total
            </span>
          )}
        </div>

        <div className="text-end">
          <span
            className="font-[family-name:var(--font-record)] tabular leading-none block"
            style={{
              fontSize: "var(--t-cubit)",
              fontWeight: 600,
              letterSpacing: "var(--tr-cubit)",
              color: chosen ? "var(--ink)" : "var(--ink-quiet)",
            }}
          >
            {chosen ? fmtEGP(total) : "—"}
          </span>
          <span className="text-micro text-ink-tertiary">EGP in total</span>
        </div>
      </div>

      <div className="mt-foot flex flex-wrap gap-palm">
        <button type="button" className="plate plate--primary" disabled={!chosen}>
          Reserve this cabin
        </button>
        <a href="/request" className="plate plate--quiet no-underline">
          Ask operators to beat it
        </a>
      </div>
    </div>
  );
}
