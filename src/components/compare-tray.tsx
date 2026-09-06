"use client";

import Link from "next/link";
import { vesselBySlug } from "@/lib/fleet";
import { useCompare, MAX_HELD } from "./compare-context";

/* The tray: what you are currently holding against each other.
   It appears only when something is held, so it never occupies the
   foot of a page nobody is comparing on. Two is the minimum a
   comparison can be made from, so it says so until then. */
export function CompareTray() {
  const { held, remove, clear } = useCompare();
  if (held.length === 0) return null;

  const ready = held.length >= 2;

  return (
    <div
      className="sticky bottom-0 z-30 px-span md:px-reach py-palm md:bottom-0"
      style={{
        background: "var(--paper-raised)",
        borderTop: "var(--rule-crest) solid var(--rule-ink)",
        boxShadow: "var(--lift-panel)",
      }}
      role="region"
      aria-label="Vessels held for comparison"
    >
      <div className="flex flex-wrap items-center gap-foot justify-between">
        <div className="flex flex-wrap items-center gap-palm min-w-0">
          <span className="rubric shrink-0">
            <span className="tabular">{held.length}</span> of {MAX_HELD} held
          </span>

          <ul className="flex flex-wrap gap-finger list-none m-0 p-0 min-w-0">
            {held.map((slug) => {
              const v = vesselBySlug(slug);
              if (!v) return null;
              return (
                <li key={slug}>
                  <button
                    type="button"
                    onClick={() => remove(slug)}
                    className="flex items-center gap-finger ps-palm pe-finger text-fine"
                    style={{
                      minHeight: "var(--touch-min)",
                      border: "var(--rule-thin) solid var(--rule-plain)",
                      borderRadius: "var(--radius-control)",
                      background: "var(--paper)",
                    }}
                    aria-label={`Remove ${v.name} from comparison`}
                  >
                    <span
                      className="font-[family-name:var(--font-record)] tabular"
                      style={{ fontWeight: 600 }}
                    >
                      {v.total.toFixed(2)}
                    </span>
                    <span className="max-w-[14ch] truncate">{v.name}</span>
                    <span
                      aria-hidden="true"
                      style={{ color: "var(--ink-tertiary)", fontSize: "var(--t-record)", lineHeight: 1 }}
                    >
                      &times;
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-palm shrink-0">
          <button type="button" onClick={clear} className="rubric">
            Clear
          </button>
          {ready ? (
            <Link
              href="/compare"
              className="plate plate--primary no-underline whitespace-nowrap"
            >
              Compare {held.length}
            </Link>
          ) : (
            <span className="text-fine text-ink-tertiary">
              Hold one more to compare
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* The control that puts a vessel in the tray. Used on records and on
   the vessel page, so it reads the same in both. */
export function HoldButton({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const { isHeld, toggle, full } = useCompare();
  const held = isHeld(slug);
  const blocked = full && !held;

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={held}
      disabled={blocked}
      title={
        blocked ? `Holding the maximum of ${MAX_HELD} already` : undefined
      }
      className={compact ? "rubric" : "plate plate--quiet"}
      style={
        compact
          ? {
              minHeight: "var(--touch-min)",
              color: held ? "var(--lapis)" : "var(--ink-tertiary)",
              opacity: blocked ? 0.45 : 1,
            }
          : {
              background: held ? "var(--lapis)" : "transparent",
              color: held ? "var(--paper)" : "var(--ink)",
              borderColor: held ? "var(--lapis)" : "var(--rule-plain)",
            }
      }
    >
      {held ? "Held" : blocked ? "Tray full" : "Hold to compare"}
    </button>
  );
}
