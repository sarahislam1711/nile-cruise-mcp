"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* Fixed bottom navigation, phones only. Four destinations, each
   a full touch target, labelled in words rather than glyphs —
   the register's own voice, and no icon set to go stale. */
const ITEMS = [
  { href: "/", label: "Almanac" },
  { href: "/search", label: "Register" },
  { href: "/request", label: "Request" },
  { href: "/bids", label: "Bids" },
];

export function MobileNav() {
  const path = usePathname();

  return (
    <nav
      aria-label="Sections"
      className="md:hidden fixed inset-x-0 bottom-0 z-30"
      style={{
        background: "var(--paper-raised)",
        borderTop: "var(--rule-mid) solid var(--rule-ink)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="list-none m-0 p-0 grid grid-cols-4">
        {ITEMS.map((it) => {
          const active =
            it.href === "/" ? path === "/" : path.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                className="no-underline flex items-center justify-center text-center"
                style={{
                  minHeight: "var(--touch-min)",
                  padding: "var(--m-palm) var(--m-hair)",
                  fontSize: "var(--t-micro)",
                  fontWeight: 600,
                  letterSpacing: "var(--tr-label)",
                  textTransform: "uppercase",
                  color: active ? "var(--paper)" : "var(--ink-secondary)",
                  background: active ? "var(--lapis)" : "transparent",
                }}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
