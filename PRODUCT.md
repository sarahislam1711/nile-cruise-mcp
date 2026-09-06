# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary customer audiences, weighted equally — both must be first-class from day one.

**International inbound traveler.** US/EU visitor booking an Egypt trip from abroad, frequently first-time. High trust anxiety: cannot verify a boat's real condition, does not know the operators, and prices quoted in EGP are unfamiliar. Needs evidence, not adjectives.

**Egyptian / regional (incl. Gulf) traveler.** Knows the market and often the boats by name. Price-sensitive, needs less hand-holding, and expects Arabic. Arabic and RTL are therefore a real product constraint, not a later localization phase — the type system and layout must carry both scripts.

Shared situation: choosing among ~79 substantially unbranded vessels sold through opaque intermediaries, where the central fear is a boat that photographs well and delivers badly.

Secondary audience: cruise **operators**, who bid into anonymous customer requests. They are not the design's primary subject but their bid submissions are product content.

80% of traffic is expected on mobile.

## Product Purpose

A Nile cruise marketplace where every vessel carries an independently audited quality score, so travelers can compare boats on evidence rather than on self-reported reviews and operator marketing.

Two ways to transact:
- **Path A — Browse & Book:** search and filter listings, open a vessel, book directly.
- **Path B — Anonymous Request:** post requirements (dates, budget, quality floor, amenities) without revealing identity; operators bid; the traveler compares bids, may message operators anonymously, and identity is revealed only on accepting a bid.

Success: a traveler books with confidence about what they are getting, and can articulate why they chose one boat over another.

## Positioning

The independently audited **5-dimension quality score** is the mechanism a competitor cannot truthfully copy without doing the audit work.

Every vessel is scored to 100 points across seven weighted dimensions:

| Dimension | Weight | Covers |
|---|---|---|
| Service | 20% | Staff warmth, responsiveness, housekeeping, restaurant service |
| Cabin & vessel | 20% | Cabin comfort, renovation level, noise, AC, bathroom, ship condition |
| Hygiene | 15% | Cleanliness, bathrooms, linens, public areas, food hygiene |
| Food | 15% | Quality, variety, freshness, presentation, dietary accommodation |
| Amenities | 10% | Pool, sundeck, lounge, gym, entertainment, Wi-Fi |
| Management | 10% | Organisation, maintenance response, consistency, professionalism |
| Cruise experience | 10% | Sailing experience, docking, itinerary execution, crowding and atmosphere |

The weighting is a stated editorial position: crew conduct is worth three times operator paperwork.

Totals fall into observed bands, with real gaps between them reflecting genuine clustering in the rated fleet — the bands describe the data, they are not arbitrary cutoffs:

- Luxury 92.85–98.35
- Deluxe 81.70–90.00
- Superior 77.30–79.90
- Standard 70.60–72.50
- Basic 40.00–59.00

The score serves four purposes: makes vessels comparable on one yardstick; locates *what* differs, not merely which is better; supplies the evidence for a price gap; and provides the shared vocabulary that makes anonymous operator bids comparable to one another.

**Score independence is a product commitment.** Operators must never be able to influence their own score. The moment they can, it stops being evidence.

## Operating Context

- Routes: Aswan–Luxor (most popular), Lake Nasser, Dahabiya (Nile sailboats).
- Durations: 3, 4, or 5 days.
- Pricing is quoted per person per day in EGP, and totals are computed guests × rate × days. Currency clarity matters for the inbound audience.
- Trip purposes that materially change what a traveler wants: honeymoon/romance, family, cultural/historical, relaxation, adventure, group, solo.
- Cabin inventory is per-vessel and per-departure, with real sell-out states.
- Anonymous requests expire (spec example: 13 days remaining on a live request).
- Anonymous operator messaging exists pre-acceptance and closes when a bid is accepted or rejected.

## Capabilities and Constraints

Confirmed functionality: search with quality/price/date/amenity/rating filters; sort and grid/list views; vessel detail with score breakdown, amenities, gallery, guest reviews, per-cabin availability and pricing; 3-step anonymous request wizard; bid comparison; anonymous in-app messaging; bid acceptance with contact reveal; AI assistant with a 6-question preference interview producing ranked recommendations; wishlist, saved searches, price-drop alerts; user account with bookings.

Stack (from spec §11, and matching the existing scaffold): Next.js, React, TypeScript, Tailwind CSS. Named libraries: React Query, Zustand, React Hook Form, date-fns, Framer Motion, Axios, Recharts/Visx. Claude API backs the assistant. Payments via Stripe/Telr; email via SendGrid.

Installed today: Next.js 16.3.4, React 19.2.8, Tailwind CSS v4, TypeScript 5. Framer Motion is **not yet installed**.

Performance targets: page load under 2s on mobile 4G, interactive under 3s, search results render under 1s, lazy-loaded imagery, Core Web Vitals green.

Undecided / not yet specified: recommendation engine implementation (collaborative filtering TBD); Elasticsearch search relevance is future; audit cadence and re-scoring policy; who the independent auditors are.

## Brand Commitments

Product name in use: Nile Cruise MCP. No confirmed logo, wordmark, or brand identity assets exist yet.

The visual direction specified in spec §9 (Inter, #003366 navy, #FF6B35 orange) is **explicitly withdrawn** by the user and is not binding. The user's binding direction is a warm-archaeological luxury register — limestone, papyrus, lapis, oxidized bronze — that must remain elevated and never tip into theme-park Egyptiana.

## Evidence on Hand

The user confirms the rated fleet data is **real and verified**: 79 vessels rated, 4.2/5 average guest rating, 2,340+ guest reviews, and the named operators, vessels, scores, and contact details appearing in the spec. These may be used as genuine trust signals and evidence.

Not on hand: photography of the vessels, cabins, and decks. The interface depends heavily on imagery and none is present in the repository — the user must supply it, and it must not be fabricated or substituted with generic stock passed off as specific vessels.

## Product Principles

1. **Evidence over adjectives.** Every quality claim traces to an audited dimension or a verified review. Nothing is asserted that cannot be shown.
2. **Show what differs, not just what ranks.** The seven dimensions exist so a traveler can act on their own priorities; collapsing them to one number defeats the product.
3. **The score belongs to the platform.** Independence from operators is what makes it worth trusting, and no surface may imply operator influence over it.
4. **Anonymity is a promise with a defined end.** The traveler controls identity reveal, and every screen in Path B must make the current privacy state unambiguous.
5. **Mobile is the real product.** 80% of traffic; a design that only resolves on desktop has failed.

## Accessibility & Inclusion

WCAG 2.1 AA is a stated requirement: 4.5:1 minimum text contrast, labeled form fields, full keyboard navigation, ARIA labels and screen reader support, alt text on all imagery. Minimum 44×44px touch targets, base font ≥16px, and no information conveyed by color alone — quality scores in particular must remain legible without color perception.

Bilingual English/Arabic with RTL layout support is an inclusion requirement arising from the equally-weighted audiences.
