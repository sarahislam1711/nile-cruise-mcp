import Link from "next/link";
import { Assistant } from "./assistant";
import { fmtEGP, FLEET_TOTAL, REVIEW_TOTAL, type Vessel } from "@/lib/fleet";
import { Reading } from "./score";

/* ------------------------------------------------------------
   Running head — the almanac's masthead. One rule, no shadow.
   ------------------------------------------------------------ */
export function Masthead() {
  const nav = [
    { href: "/search", label: "The fleet" },
    { href: "/method", label: "Method" },
    { href: "/request", label: "Post a request" },
    { href: "/bids", label: "My bids" },
    { href: "/account", label: "Ledger" },
  ];

  return (
    <header
      className="px-span md:px-reach pt-foot pb-palm"
      style={{ borderBottom: "var(--rule-hair) solid var(--rule-plain)" }}
    >
      <div className="flex items-baseline justify-between gap-foot flex-wrap">
        <Link
          href="/"
          className="no-underline font-[family-name:var(--font-record)]"
          style={{
            fontSize: "var(--t-body)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: "var(--ink)",
          }}
        >
          Nile Cruise MCP
        </Link>
        <nav aria-label="Primary">
          <ul className="flex list-none m-0 p-0 gap-foot rubric flex-wrap">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="no-underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------
   Section head — a heavy rule and a station-scale heading.
   The almanac's only sectioning device.
   ------------------------------------------------------------ */
export function SectionHead({
  id,
  title,
  aside,
  weight = "heavy",
}: {
  id?: string;
  title: string;
  aside?: React.ReactNode;
  weight?: "heavy" | "mid";
}) {
  return (
    <div
      className="flex items-baseline justify-between gap-foot pb-finger flex-wrap"
      style={{
        borderBottom:
          weight === "heavy"
            ? "var(--rule-mid) solid var(--rule-ink)"
            : "var(--rule-thin) solid var(--rule-plain)",
      }}
    >
      <h2
        id={id}
        style={{ fontSize: "var(--t-station)", fontWeight: 600, margin: 0 }}
      >
        {title}
      </h2>
      {aside ? <span className="rubric">{aside}</span> : null}
    </div>
  );
}

/* ------------------------------------------------------------
   Record row — the fleet's unit. Ruled, never a card.
   The number leads; photography would corroborate.
   ------------------------------------------------------------ */
export function Record({ vessel }: { vessel: Vessel }) {
  const soldout = vessel.state === "soldout";

  return (
    <article
      className="record grid gap-x-foot gap-y-palm py-cubit px-span
                 grid-cols-[auto_1fr] md:grid-cols-[9rem_1fr_auto] items-start"
      data-state={vessel.state}
    >
      <Reading total={vessel.total} band={vessel.band} muted={soldout} />

      <div className="min-w-0">
        <h3
          style={{
            fontSize: "var(--t-record)",
            fontWeight: 500,
            lineHeight: "var(--lh-record)",
            margin: 0,
          }}
        >
          <Link
            href={`/vessel/${vessel.slug}`}
            className="no-underline hover:underline"
          >
            {vessel.name}
          </Link>
        </h3>
        <p className="text-fine text-ink-secondary mt-hair mb-0">
          {vessel.route} &middot; {vessel.nights} nights &middot; {vessel.operator}
        </p>
        <dl className="flex flex-wrap gap-x-foot gap-y-hair mt-finger mb-0 text-micro text-ink-tertiary tabular">
          <div className="flex gap-hair">
            <dt className="sr-only">Built</dt>
            <dd className="m-0">Built {vessel.built}</dd>
          </div>
          <div className="flex gap-hair">
            <dt className="sr-only">Capacity</dt>
            <dd className="m-0">{vessel.capacity} guests</dd>
          </div>
          <div className="flex gap-hair">
            <dt className="sr-only">Guest rating</dt>
            <dd className="m-0">
              {vessel.rating.toFixed(1)} from {vessel.reviews} reviews
            </dd>
          </div>
        </dl>
      </div>

      <div className="col-start-2 md:col-start-auto md:text-right">
        <div className="record__price tabular">
          <span
            className="font-[family-name:var(--font-record)]"
            style={{ fontSize: "var(--t-record)", fontWeight: 500 }}
          >
            {fmtEGP(vessel.price)}
          </span>
          <span className="text-fine text-ink-secondary"> EGP</span>
        </div>
        <div className="text-micro text-ink-tertiary">per person per night</div>
        {soldout ? (
          <p
            className="mt-finger mb-0 text-micro font-semibold"
            style={{ color: "var(--silt)" }}
          >
            No cabins on these dates
          </p>
        ) : (
          <p className="mt-finger mb-0 text-micro" style={{ color: "var(--reed)" }}>
            Cabins available
          </p>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------
   Sample-data note. The aggregate figures are verified; the
   individual records on screen are illustrative while the
   rating pipeline is connected. Said plainly, in the table's
   own language, rather than hidden in a source comment.
   ------------------------------------------------------------ */
export function SampleNote() {
  return (
    <p
      className="text-micro text-ink-tertiary mt-foot pt-palm mb-0"
      style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}
    >
      Fleet totals and the audit method are live. The individual vessel
      records shown here are sample entries used while the rating pipeline is
      connected, and are not bookable.
    </p>
  );
}

/* ------------------------------------------------------------
   Running foot — the almanac's colophon. Closes the page with
   a crest rule rather than trailing off into blank paper.
   ------------------------------------------------------------ */
export function Foot() {
  const year = new Date().getFullYear();

  return (
    <>
      <Assistant />
      <footer
        className="px-span md:px-reach pt-fathom pb-foot mt-auto"
        style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
      >
        {/* The colophon: what this register is, in the register's
            own voice, before the navigation. */}
        <div className="grid gap-fathom lg:grid-cols-[minmax(0,26rem)_1fr] items-start">
          <div>
            <p
              className="font-[family-name:var(--font-record)] m-0"
              style={{
                fontSize: "var(--t-station)",
                fontWeight: 600,
                letterSpacing: "var(--tr-cubit)",
              }}
            >
              Nile Cruise MCP
            </p>
            <p className="text-fine text-ink-secondary mt-palm mb-0 max-w-[38ch]">
              An independent register of Nile cruise vessels, audited across
              five dimensions. We do not own, operate, or sell cabins on any
              boat in it.
            </p>

            {/* The standing figures, small — the footer restates the
                authority the page opened with. */}
            <dl className="flex flex-wrap gap-x-foot gap-y-palm m-0 mt-foot">
              {[
                [String(FLEET_TOTAL), "vessels"],
                [REVIEW_TOTAL.toLocaleString("en-GB"), "reviews read"],
                ["5", "dimensions"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="m-0">
                    <span
                      className="font-[family-name:var(--font-record)] tabular block"
                      style={{
                        fontSize: "var(--t-record)",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      {n}
                    </span>
                    <span className="rubric">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Navigation, grouped by what the visitor is trying to do. */}
          <nav aria-label="Footer" className="grid gap-fathom sm:grid-cols-3">
            {[
              {
                heading: "Read",
                links: [
                  ["/search", "The register"],
                  ["/method", "How the audit works"],
                  ["/vessel/sonesta-sun-goddess", "A worked example"],
                ],
              },
              {
                heading: "Ask",
                links: [
                  ["/request", "Post a request"],
                  ["/bids", "Bids you have received"],
                ],
              },
              {
                heading: "Yours",
                links: [
                  ["/account", "Your ledger"],
                  ["/account", "Watched vessels"],
                  ["/account", "Saved readings"],
                ],
              },
            ].map((group) => (
              <div key={group.heading}>
                <h2
                  className="rubric m-0 pb-finger"
                  style={{ borderBottom: "var(--rule-thin) solid var(--rule-plain)" }}
                >
                  {group.heading}
                </h2>
                <ul className="list-none m-0 mt-palm p-0 grid gap-finger text-fine">
                  {group.links.map(([href, label]) => (
                    <li key={label}>
                      <Link href={href} className="no-underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* The imprint line — the almanac's own closing statement. */}
        <div
          className="mt-flood pt-foot flex flex-wrap items-baseline justify-between gap-foot"
          style={{ borderTop: "var(--rule-mid) solid var(--rule-ink)" }}
        >
          <p className="rubric m-0">
            Readings published {year} &middot; Scores are the platform&rsquo;s
            own and cannot be purchased
          </p>
          <p className="rubric m-0" style={{ color: "var(--ink-quiet)" }}>
            Compiled on the Nile
          </p>
        </div>
      </footer>
    </>
  );
}
