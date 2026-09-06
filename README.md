# Nile Cruise MCP — customer interface

Frontend for a Nile cruise marketplace where every vessel carries an
independently audited quality score, so travellers compare boats on evidence
rather than on self-reported reviews.

**This repository is the interface only.** There is no backend, no database,
and no authentication. All data is sample data. See
[Connecting a backend](#connecting-a-backend).

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint
```

Requires Node 18+.

## The routes

| Route | What it does |
|---|---|
| `/` | The graduated measure — all 79 vessels on one scale — plus search and the fleet |
| `/search` | The register, with working filters and sorting |
| `/vessel/[slug]` | One vessel: five-dimension score, particulars, cabins, reviews, operator |
| `/method` | How the audit works and why operators cannot influence it |
| `/request` | Three-step anonymous request wizard |
| `/request/[ref]` | A live request: waiting for bids, then bids received |
| `/bids` | Bid comparison, anonymous messaging, acceptance |
| `/account` | Booked voyages, watched vessels, saved searches |

Two global components sit on every page: the reading assistant (a five-question
interview that returns ranked recommendations) and the mobile bottom nav.

Every screen is interactive — filters filter, the wizard steps and validates,
bids sort, totals compute. All of it runs in React state.

## The quality score

Every vessel is scored to 100 points across five weighted dimensions:

| Dimension | Max | Covers |
|---|---|---|
| Service | 30 | Staff friendliness, responsiveness, problem resolution |
| Hygiene | 20 | Cabin cleanliness, deck maintenance, food storage, pest control |
| Food | 20 | Variety, taste, freshness, dietary accommodation |
| Amenities | 20 | Cabin comfort, AC, entertainment, activities, deck space |
| Management | 10 | Company reputation, booking reliability, safety record |

Totals fall into five bands whose ranges reflect real clustering in the fleet —
the gaps between them are genuine, not rounded cut-offs:

Luxury 92.85–98.35 · Deluxe 81.70–90.00 · Superior 77.30–79.90 ·
Standard 70.60–72.50 · Basic 40.00–59.00

## Connecting a backend

[`src/lib/fleet.ts`](src/lib/fleet.ts) is the single seam between the interface
and any backend. Every screen reads its data from that module and nothing else.

To connect real data, replace these exports with fetches:

- `FLEET` — the audited vessels
- `BIDS` / `REQUEST` — anonymous request state
- `BOOKINGS` / `WISHLIST` / `SAVED_SEARCHES` — account state

The exported TypeScript interfaces (`Vessel`, `Bid`, `Booking`, …) are the
contract an API needs to satisfy. Nothing else in the app changes.

Pages that are currently server components with static data will need
`"use client"` and state where they fetch — a small conversion, not a rewrite.

## The design system

Documented in [DESIGN.md](DESIGN.md); product truth in [PRODUCT.md](PRODUCT.md).
Tokens live in [`src/app/globals.css`](src/app/globals.css).

The world is **The Flood Almanac**: the fleet as the river's own almanac, 79
vessels reckoned on one graduated measure and published as a table of record.
The audited number leads and photography corroborates — the inverse of the
booking-aggregator arrangement.

A few rules the code enforces:

- **One accent.** Lapis is the only action colour. Bronze is structure and never
  signals anything.
- **Three channels.** Every quality band carries a name, a fill pattern, *and* a
  hue, so scores survive greyscale and colour-blindness.
- **Measured contrast.** Every ink step and every band colour is measured against
  the paper ground and clears WCAG AA. The ratios are recorded in `globals.css`
  as comments — do not lighten them without re-measuring.
- **Records are rows, never cards.**
- **RTL is structural.** Logical properties throughout, Arabic faces loaded and
  wired. Copy is English-only for now; translation is outstanding.

## What is not built

- Backend, authentication, payments
- Real vessel photography (the interface depends on it and none exists)
- The operator interface — operators cannot currently submit bids, so Path B has
  no counterparty
- Arabic translation
- Transactional email
- Tests

## Stack

Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4 · Zilla Slab, Public
Sans, Noto Kufi/Naskh Arabic via `next/font`.
