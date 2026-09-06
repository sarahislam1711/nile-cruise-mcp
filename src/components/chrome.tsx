import Link from "next/link";
import { fmtEGP, type Vessel } from "@/lib/fleet";
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
  return (
    <footer
      className="px-span md:px-reach pt-foot pb-fathom mt-auto"
      style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
    >
      <div className="flex flex-wrap gap-fathom justify-between">
        <div className="max-w-[38ch]">
          <p
            className="font-[family-name:var(--font-record)] m-0"
            style={{ fontSize: "var(--t-body)", fontWeight: 600, letterSpacing: "0.02em" }}
          >
            Nile Cruise MCP
          </p>
          <p className="text-fine text-ink-secondary mt-finger mb-0">
            An independent register of Nile cruise vessels, audited across five
            dimensions. We do not own, operate, or sell cabins on any boat in
            this register.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="list-none m-0 p-0 grid gap-finger text-fine">
            <li><Link href="/search" className="no-underline">The register</Link></li>
            <li><Link href="/method" className="no-underline">Audit method</Link></li>
            <li><Link href="/request" className="no-underline">Post a request</Link></li>
            <li><Link href="/bids" className="no-underline">My bids</Link></li>
            <li><Link href="/account" className="no-underline">Your ledger</Link></li>
          </ul>
        </nav>
      </div>

      <p className="rubric mt-fathom mb-0">
        Readings published {new Date().getFullYear()} &middot; Scores are the
        platform&rsquo;s own and cannot be purchased
      </p>
    </footer>
  );
}
