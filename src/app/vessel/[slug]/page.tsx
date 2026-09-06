import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FLEET,
  bandOf,
  fmtEGP,
  fmtDate,
  vesselBySlug,
  DIMENSIONS,
} from "@/lib/fleet";
import { ScoreBreakdown, BandLabel, BandKeyList } from "@/components/score";
import { Masthead, SectionHead, Foot, SampleNote } from "@/components/chrome";
import { CabinTable } from "@/components/cabins";
import { HoldButton } from "@/components/compare-tray";

export function generateStaticParams() {
  return FLEET.map((v) => ({ slug: v.slug }));
}

export default async function VesselPage({
  params,
}: PageProps<"/vessel/[slug]">) {
  const { slug } = await params;
  const vessel = vesselBySlug(slug);
  if (!vessel) notFound();

  const band = bandOf(vessel.band);
  const others = FLEET.filter((v) => v.slug !== vessel.slug).slice(0, 3);

  return (
    <div className="relative flex-1 flex flex-col">
      <Masthead />

      <main className="px-span md:px-reach pb-fathom flex-1">
        <nav aria-label="Breadcrumb" className="pt-foot">
          <Link href="/search" className="rubric no-underline">
            &larr; Back to the register
          </Link>
        </nav>

        {/* Header: the reading leads, exactly as on a record */}
        <header className="pt-foot">
          <div className="flex flex-wrap items-end justify-between gap-foot">
            <div className="min-w-0">
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, var(--t-flood))",
                  fontWeight: 600,
                  lineHeight: "var(--lh-tight)",
                  letterSpacing: "var(--tr-crest)",
                  margin: 0,
                  maxWidth: "18ch",
                }}
              >
                {vessel.name}
              </h1>
              <p className="text-lead text-ink-secondary mt-palm mb-0">
                {vessel.route} &middot; {vessel.nights} nights &middot;{" "}
                {vessel.operator}
              </p>
            </div>

            <div className="shrink-0">
              <span
                className="font-[family-name:var(--font-record)] tabular leading-none block"
                style={{
                  fontSize: "var(--t-flood)",
                  fontWeight: 600,
                  letterSpacing: "var(--tr-cubit)",
                }}
              >
                {vessel.total.toFixed(2)}
              </span>
              <span className="mt-finger flex items-center gap-finger">
                <BandLabel band={vessel.band} />
              </span>
            </div>
          </div>

          <p
            className="rubric mt-foot pt-palm mb-0"
            style={{ borderTop: "var(--rule-crest) solid var(--rule-ink)" }}
          >
            Audited {fmtDate(vessel.auditedOn)} &middot; surveyed by the
            platform, not the operator
          </p>
        </header>

        {/* Particulars — a ruled table, not an icon grid */}
        <section aria-labelledby="particulars" className="mt-fathom">
          <SectionHead id="particulars" title="Particulars" weight="mid" />
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-foot gap-y-0 m-0">
            {[
              ["Built", String(vessel.built)],
              ["Refit", vessel.refit ? String(vessel.refit) : "—"],
              ["Capacity", `${vessel.capacity} guests`],
              ["Cabins", String(vessel.cabinCount)],
              ["Route", vessel.route],
              ["Voyage", `${vessel.nights} nights`],
              ["Operator", vessel.operator],
              ["Guest rating", `${vessel.rating.toFixed(1)} of 5`],
            ].map(([k, v]) => (
              <div
                key={k}
                className="py-palm"
                style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}
              >
                <dt className="rubric">{k}</dt>
                <dd className="m-0 tabular text-fine">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* The score — explicit bars, this is where judging happens */}
        <section aria-labelledby="score" className="station">
          <h2 id="score" className="station__title">
            The reading
          </h2>
          <p className="text-fine text-ink-secondary mt-hair mb-foot max-w-[56ch]">
            Seven dimensions, weighted to a hundred. {vessel.name} reads{" "}
            {vessel.total.toFixed(2)}, which places it in {band.name} &mdash;
            the band running {band.min.toFixed(2)} to {band.max.toFixed(2)}.
          </p>

          <div className="grid gap-fathom lg:grid-cols-[minmax(0,42rem)_minmax(0,20rem)] items-start">
            <ScoreBreakdown vessel={vessel} />
            <aside className="pt-foot lg:pt-0 lg:ps-fathom">
              <h3
                className="rubric m-0 pb-finger mb-palm"
                style={{ borderBottom: "var(--rule-thin) solid var(--rule-quiet)" }}
              >
                What each dimension covers
              </h3>
              <dl className="m-0 text-fine">
                {DIMENSIONS.map((d) => (
                  <div key={d.key} className="py-finger">
                    <dt className="font-semibold">
                      {d.label}{" "}
                      <span className="text-ink-tertiary tabular font-normal">
                        weight {d.weight}%
                      </span>
                    </dt>
                    <dd className="m-0 text-ink-secondary text-micro leading-snug">
                      {d.note}
                    </dd>
                  </div>
                ))}
              </dl>
              <h3 className="rubric mb-palm mt-foot">What a reading is worth</h3>
              <BandKeyList />
            </aside>
          </div>
        </section>

        {/* Amenities — a plain ruled list, no icon tiles */}
        <section aria-labelledby="amenities" className="station">
          <h2
            id="amenities"
            style={{ fontSize: "var(--t-station)", fontWeight: 600 }}
          >
            On board
          </h2>
          <ul className="list-none m-0 mt-foot p-0 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {vessel.amenities.map((a) => (
              <li
                key={a}
                className="py-palm pe-foot text-fine"
                style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}
              >
                {a}
              </li>
            ))}
          </ul>
        </section>

        {/* Cabins and pricing — interactive */}
        <section aria-labelledby="cabins" className="station">
          <h2 id="cabins" className="station__title">
            Cabins and price
          </h2>
          <CabinTable vessel={vessel} />
        </section>

        {/* Guest reviews */}
        <section aria-labelledby="reviews" className="station">
          <h2 id="reviews" className="station__title">
            What guests recorded
          </h2>
          <p className="text-fine text-ink-secondary mt-hair mb-foot">
            {vessel.reviews} reviews, averaging {vessel.rating.toFixed(1)} of 5.
            Reviews inform the audit but do not set the score.
          </p>

          {vessel.guestReviews.map((r, i) => (
            <article
              key={i}
              className="py-foot"
              style={{ borderTop: "var(--rule-thin) solid var(--rule-quiet)" }}
            >
              <blockquote className="m-0 max-w-[62ch]">
                <p className="m-0">{r.body}</p>
              </blockquote>
              <footer className="mt-palm flex flex-wrap items-center gap-x-foot gap-y-hair text-micro text-ink-tertiary">
                <span className="text-ink-secondary">{r.author}</span>
                <span>{r.origin}</span>
                <span className="tabular">{r.rating} of 5</span>
                {r.verified ? (
                  <span style={{ color: "var(--reed)" }}>Verified booking</span>
                ) : null}
                <span className="tabular">{r.helpful} found this useful</span>
              </footer>
            </article>
          ))}
        </section>

        {/* Operator */}
        <section aria-labelledby="operator" className="station">
          <h2 id="operator" className="station__title">
            The operator
          </h2>
          <div className="mt-foot grid gap-foot md:grid-cols-[minmax(0,30rem)_auto] items-start">
            <div>
              <p
                className="font-[family-name:var(--font-record)] m-0"
                style={{ fontSize: "var(--t-record)", fontWeight: 500 }}
              >
                {vessel.operator}
              </p>
              <dl className="grid grid-cols-2 gap-x-foot m-0 mt-palm max-w-[26rem]">
                <div className="py-finger" style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}>
                  <dt className="rubric">Company rating</dt>
                  <dd className="m-0 tabular text-fine">
                    {vessel.operatorRating.toFixed(1)} of 5
                  </dd>
                </div>
                <div className="py-finger" style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}>
                  <dt className="rubric">Vessels in register</dt>
                  <dd className="m-0 tabular text-fine">{vessel.operatorFleet}</dd>
                </div>
              </dl>
              <p className="text-fine text-ink-secondary mt-foot mb-0 max-w-[52ch]">
                The operator has no access to this vessel&rsquo;s score and
                cannot submit, appeal, or purchase a change to it.
              </p>
            </div>

            <div className="flex flex-col gap-palm">
              <Link href="/request" className="plate plate--primary no-underline">
                Ask for a better price
              </Link>
              <HoldButton slug={vessel.slug} />
            </div>
          </div>
        </section>

        {/* Neighbouring readings */}
        <section aria-labelledby="nearby" className="station">
          <h2 id="nearby" className="station__title">
            Other readings
          </h2>
          <ul className="list-none m-0 mt-foot p-0">
            {others.map((v) => (
              <li
                key={v.slug}
                className="flex flex-wrap items-baseline justify-between gap-palm py-palm"
                style={{ borderTop: "var(--rule-hair) solid var(--rule-quiet)" }}
              >
                <span className="flex items-baseline gap-foot min-w-0">
                  <span
                    className="font-[family-name:var(--font-record)] tabular"
                    style={{ fontSize: "var(--t-record)", fontWeight: 600 }}
                  >
                    {v.total.toFixed(2)}
                  </span>
                  <Link href={`/vessel/${v.slug}`} className="no-underline hover:underline">
                    {v.name}
                  </Link>
                </span>
                <span className="tabular text-fine text-ink-secondary">
                  {fmtEGP(v.price)} EGP
                </span>
              </li>
            ))}
          </ul>
          <SampleNote />
        </section>
      </main>

      <Foot />
    </div>
  );
}
