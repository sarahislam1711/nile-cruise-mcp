/* ============================================================
   FLEET DATA — FRONTEND SAMPLE ONLY

   This module is the single seam between the interface and a
   backend. Every screen reads its data from here.

   When the rating pipeline is connected, replace the FLEET,
   BIDS, and REQUEST constants below with real fetches. The
   exported types are the contract the backend must satisfy;
   nothing else in the app needs to change.

   The vessel names, operators, scores, and prices below are
   illustrative sample records for building and reviewing the
   interface. Do not present them to users as real listings.
   ============================================================ */

export const BANDS = [
  { key: "luxury",   name: "Luxury",   min: 92.85, max: 98.35, count: 13 },
  { key: "deluxe",   name: "Deluxe",   min: 81.7,  max: 90.0,  count: 31 },
  { key: "superior", name: "Superior", min: 77.3,  max: 79.9,  count: 18 },
  { key: "standard", name: "Standard", min: 70.6,  max: 72.5,  count: 11 },
  { key: "basic",    name: "Basic",    min: 40.0,  max: 59.0,  count: 6  },
] as const;

export type BandKey = (typeof BANDS)[number]["key"];

/** Ascending for scale rendering; BANDS itself reads best-first. */
export const BANDS_ASCENDING = [...BANDS].reverse();

export const DIMENSIONS = [
  {
    key: "service",
    label: "Service",
    weight: 20,
    note: "Staff warmth, responsiveness, housekeeping, restaurant service",
  },
  {
    key: "cabin",
    label: "Cabin & vessel",
    weight: 20,
    note: "Cabin comfort, renovation level, noise, AC, bathroom, ship condition",
  },
  {
    key: "hygiene",
    label: "Hygiene",
    weight: 15,
    note: "Cleanliness, bathrooms, linens, public areas, food hygiene",
  },
  {
    key: "food",
    label: "Food",
    weight: 15,
    note: "Quality, variety, freshness, presentation, dietary accommodation",
  },
  {
    key: "amenities",
    label: "Amenities",
    weight: 10,
    note: "Pool, sundeck, lounge, gym, entertainment, Wi-Fi",
  },
  {
    key: "management",
    label: "Management",
    weight: 10,
    note: "Organisation, maintenance response, consistency, professionalism",
  },
  {
    key: "experience",
    label: "Cruise experience",
    weight: 10,
    note: "Sailing experience, docking, itinerary execution, crowding and atmosphere",
  },
] as const;

export type DimKey = (typeof DIMENSIONS)[number]["key"];

export const ROUTES = [
  "Aswan — Luxor",
  "Luxor — Aswan",
  "Esna — Aswan",
  "Lake Nasser circuit",
] as const;

export const AMENITIES = [
  "Swimming pool",
  "Wi-Fi",
  "Air conditioning",
  "Restaurant",
  "Nile-view deck",
  "Live music",
  "Guided tours included",
  "Gym",
  "Balcony cabins",
  "Spa",
  "Room service",
  "Laundry",
] as const;

export const SPECIAL_REQUESTS = [
  "Honeymoon package",
  "Family friendly",
  "Group rates",
  "Vegetarian or vegan meals",
  "Halal certified",
  "Step-free access",
] as const;

export interface Cabin {
  type: string;
  detail: string;
  pricePerNight: number;
  available: number;
}

export interface Review {
  body: string;
  author: string;
  origin: string;
  rating: number;
  verified: boolean;
  helpful: number;
}

export interface Vessel {
  slug: string;
  name: string;
  operator: string;
  operatorRating: number;
  operatorFleet: number;
  route: string;
  nights: number;
  built: number;
  refit?: number;
  capacity: number;
  cabinCount: number;
  band: BandKey;
  total: number;
  scores: Record<DimKey, number>;
  price: number;
  reviews: number;
  rating: number;
  amenities: string[];
  cabins: Cabin[];
  guestReviews: Review[];
  auditedOn: string;
  state?: "soldout";
}

export const FLEET: Vessel[] = [
  {
    slug: "sonesta-sun-goddess",
    name: "Sonesta Sun Goddess",
    operator: "Sonesta Egypt Nile Cruises",
    operatorRating: 4.7,
    operatorFleet: 45,
    route: "Aswan — Luxor",
    nights: 3,
    built: 2010,
    refit: 2021,
    capacity: 80,
    cabinCount: 40,
    band: "luxury",
    total: 93.1,
    scores: { service: 93, cabin: 92, hygiene: 95, food: 95, amenities: 90, management: 90, experience: 96 },
    price: 2950,
    reviews: 342,
    rating: 4.8,
    auditedOn: "2026-11-04",
    amenities: [
      "Swimming pool", "Wi-Fi", "Air conditioning", "Restaurant",
      "Nile-view deck", "Live music", "Guided tours included", "Gym",
      "Room service", "Laundry",
    ],
    cabins: [
      { type: "Standard double", detail: "Twin or double, river window", pricePerNight: 2950, available: 3 },
      { type: "Deluxe suite", detail: "King bed, panoramic Nile view", pricePerNight: 4200, available: 1 },
      { type: "Balcony suite", detail: "Private balcony, upper deck", pricePerNight: 5500, available: 0 },
    ],
    guestReviews: [
      {
        body: "Exceptional cruise. The crew were attentive without hovering, the food was genuinely good rather than merely plentiful, and the sun deck at dawn is worth the trip on its own.",
        author: "Jennifer M.", origin: "United States", rating: 5, verified: true, helpful: 142,
      },
      {
        body: "Beautiful boat and the dining was a highlight, but the Wi-Fi dropped constantly between Kom Ombo and Edfu. Everything else was perfect for our honeymoon.",
        author: "Ahmed & Sara", origin: "Egypt", rating: 4, verified: true, helpful: 87,
      },
    ],
  },
  {
    slug: "dahabiya-meroe",
    name: "Dahabiya Meroë",
    operator: "Nile Dahabiya Collection",
    operatorRating: 4.9,
    operatorFleet: 4,
    route: "Esna — Aswan",
    nights: 5,
    built: 2018,
    capacity: 8,
    cabinCount: 4,
    band: "luxury",
    total: 96.5,
    scores: { service: 97, cabin: 96, hygiene: 100, food: 100, amenities: 90, management: 90, experience: 99 },
    price: 6500,
    reviews: 74,
    rating: 4.9,
    auditedOn: "2026-10-18",
    amenities: [
      "Wi-Fi", "Air conditioning", "Restaurant", "Nile-view deck",
      "Guided tours included", "Balcony cabins", "Room service",
    ],
    cabins: [
      { type: "Lower deck cabin", detail: "Double, river-level windows", pricePerNight: 6500, available: 2 },
      { type: "Upper deck suite", detail: "King bed, private terrace", pricePerNight: 8400, available: 1 },
    ],
    guestReviews: [
      {
        body: "Eight guests, four crew, no engine noise for most of the day. This is what the Nile was before the floating hotels. The cooking is done on board from what is bought that morning.",
        author: "Claire D.", origin: "France", rating: 5, verified: true, helpful: 61,
      },
    ],
  },
  {
    slug: "movenpick-royal-lotus",
    name: "Movenpick Royal Lotus",
    operator: "Movenpick Nile Cruises",
    operatorRating: 4.5,
    operatorFleet: 12,
    route: "Luxor — Aswan",
    nights: 4,
    built: 2008,
    refit: 2019,
    capacity: 108,
    cabinCount: 54,
    band: "deluxe",
    total: 88.3,
    scores: { service: 87, cabin: 88, hygiene: 90, food: 90, amenities: 85, management: 90, experience: 88 },
    price: 4200,
    reviews: 218,
    rating: 4.5,
    auditedOn: "2026-09-27",
    amenities: [
      "Swimming pool", "Wi-Fi", "Air conditioning", "Restaurant",
      "Nile-view deck", "Live music", "Gym", "Spa", "Laundry",
    ],
    cabins: [
      { type: "Standard double", detail: "Twin or double, picture window", pricePerNight: 4200, available: 6 },
      { type: "Junior suite", detail: "Sitting area, Nile view", pricePerNight: 5600, available: 2 },
    ],
    guestReviews: [
      {
        body: "Solid, well-run boat. The pool deck gets crowded at midday but the service never slipped. Good value for a four-night itinerary.",
        author: "Michael R.", origin: "United Kingdom", rating: 4, verified: true, helpful: 54,
      },
    ],
  },
  {
    slug: "nile-dreams",
    name: "Nile Dreams",
    operator: "Nile Dreams Cruises",
    operatorRating: 4.3,
    operatorFleet: 3,
    route: "Aswan — Luxor",
    nights: 3,
    built: 2004,
    capacity: 62,
    cabinCount: 31,
    band: "superior",
    total: 78.9,
    scores: { service: 77, cabin: 78, hygiene: 80, food: 80, amenities: 80, management: 80, experience: 79 },
    price: 2800,
    reviews: 156,
    rating: 4.4,
    auditedOn: "2026-10-02",
    amenities: [
      "Wi-Fi", "Air conditioning", "Restaurant", "Nile-view deck",
      "Guided tours included",
    ],
    cabins: [
      { type: "Standard double", detail: "Twin beds, river window", pricePerNight: 2800, available: 8 },
    ],
    guestReviews: [
      {
        body: "Family-run and it shows in the best way. The boat is not new and the cabins are plain, but the crew looked after our children and the tours were well organised.",
        author: "Yasmin H.", origin: "Egypt", rating: 4, verified: true, helpful: 39,
      },
    ],
  },
  {
    slug: "lake-nasser-kalabsha",
    name: "Lake Nasser Kalabsha",
    operator: "Nasser Voyages",
    operatorRating: 4.0,
    operatorFleet: 2,
    route: "Lake Nasser circuit",
    nights: 4,
    built: 1998,
    capacity: 130,
    cabinCount: 65,
    band: "standard",
    total: 71.1,
    scores: { service: 70, cabin: 70, hygiene: 70, food: 70, amenities: 75, management: 70, experience: 76 },
    price: 2400,
    reviews: 89,
    rating: 4.0,
    auditedOn: "2026-08-15",
    state: "soldout",
    amenities: [
      "Swimming pool", "Air conditioning", "Restaurant", "Nile-view deck",
    ],
    cabins: [
      { type: "Standard double", detail: "Twin beds, lake view", pricePerNight: 2400, available: 0 },
    ],
    guestReviews: [
      {
        body: "The Lake Nasser temples are the reason to come and the itinerary covers them properly. The boat itself is dated and the food was repetitive by day three.",
        author: "Peter L.", origin: "Germany", rating: 3, verified: true, helpful: 28,
      },
    ],
  },
];

export const FLEET_TOTAL = 79;
export const REVIEW_TOTAL = 2340;
export const FLEET_AVERAGE_RATING = 4.2;

export const bandOf = (key: BandKey) => BANDS.find((b) => b.key === key)!;

/* ------------------------------------------------------------
   "Best for" labels.

   Derived from the audited dimensions, never assigned by an
   operator — the same independence that makes the score worth
   reading. A traveller learns more from "best food, quietest"
   than from 84 against 81, and two vessels three points apart
   are not meaningfully different on the total alone.

   Each rule states the evidence it reads, so a label can always
   be traced back to a measurement.
   ------------------------------------------------------------ */

export interface BestFor {
  label: string;
  /** The measurement this label was derived from. */
  because: string;
}

export function bestForOf(v: Vessel): BestFor[] {
  const out: BestFor[] = [];
  const s = v.scores;

  if (s.food >= 92)
    out.push({ label: "Best food", because: `Food scores ${s.food}` });

  if (v.capacity <= 20)
    out.push({ label: "Quietest", because: `Only ${v.capacity} guests aboard` });

  if (s.cabin >= 92)
    out.push({ label: "Best cabins", because: `Cabin and vessel scores ${s.cabin}` });

  if (s.service >= 90 && v.rating >= 4.6)
    out.push({
      label: "First-time visitors",
      because: `Service ${s.service} with a ${v.rating.toFixed(1)} guest rating`,
    });

  if (v.amenities.includes("Swimming pool") && v.capacity >= 60)
    out.push({ label: "Families", because: "Pool and deck space for a full boat" });

  if (v.capacity <= 40 && s.experience >= 90)
    out.push({
      label: "Couples",
      because: `A small boat scoring ${s.experience} on the sailing itself`,
    });

  if (v.total >= 92 && v.price >= 5000)
    out.push({ label: "Luxury travellers", because: "Top band, priced accordingly" });

  /* Value is points per thousand EGP: the reading you get for what
     you pay, which is the comparison a price-led traveller makes. */
  if (v.total / (v.price / 1000) >= 28)
    out.push({
      label: "Best value",
      because: `${v.total.toFixed(1)} points at ${fmtEGP(v.price)} EGP`,
    });

  if (v.built <= 2008 && s.cabin >= 75)
    out.push({
      label: "Traditional character",
      because: `Built ${v.built} and still scoring ${s.cabin} on condition`,
    });

  if (v.built >= 2015)
    out.push({ label: "Contemporary", because: `Built ${v.built}` });

  return out;
}

export const vesselBySlug = (slug: string) =>
  FLEET.find((v) => v.slug === slug);

export const fmtEGP = (n: number) =>
  new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 }).format(n);

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

/* ---------- Anonymous request & bids (Path B sample state) ---------- */

export interface Bid {
  id: string;
  vesselSlug: string;
  vesselName: string;
  band: BandKey;
  total: number;
  pricePerNight: number;
  inclusions: string[];
  message: string;
  operator: string;
  respondedHoursAgo: number;
}

export const REQUEST = {
  reference: "REQ-2027-00123",
  departure: "2027-03-15",
  nights: 3,
  route: "Aswan — Luxor",
  adults: 2,
  children: 0,
  budgetMin: 3000,
  budgetMax: 5000,
  qualityFloor: 81.7,
  qualityFloorLabel: "Deluxe and above",
  expiresInDays: 13,
  notes: "First time on the Nile, celebrating an anniversary. Flexible on dates by a few days.",
};

export const BIDS: Bid[] = [
  {
    id: "BID-0417",
    vesselSlug: "sonesta-sun-goddess",
    vesselName: "Sonesta Sun Goddess",
    band: "luxury",
    total: 93.45,
    pricePerNight: 4200,
    inclusions: [
      "Cabin upgraded to Deluxe suite",
      "Airport transfers both ways",
      "One guided temple tour",
      "Anniversary amenities in cabin",
    ],
    message:
      "We have hosted anniversary trips for twenty years. The Deluxe suite on the upper deck is the quietest cabin on the boat and it is yours at the standard rate for these dates.",
    operator: "Sonesta Egypt Nile Cruises",
    respondedHoursAgo: 4,
  },
  {
    id: "BID-0419",
    vesselSlug: "movenpick-royal-lotus",
    vesselName: "Movenpick Royal Lotus",
    band: "deluxe",
    total: 88.2,
    pricePerNight: 3500,
    inclusions: [
      "Standard double, no upgrade",
      "Airport transfers both ways",
      "Two guided tours",
      "Vegetarian menu on request",
    ],
    message:
      "We can hold two tours and transfers inside your budget. The boat sails Luxor to Aswan, which is the reverse of your stated route — say the word if that does not suit.",
    operator: "Movenpick Nile Cruises",
    respondedHoursAgo: 11,
  },
  {
    id: "BID-0423",
    vesselSlug: "dahabiya-meroe",
    vesselName: "Dahabiya Meroë",
    band: "luxury",
    total: 96.1,
    pricePerNight: 6500,
    inclusions: [
      "Upper deck suite with private terrace",
      "All meals cooked to order on board",
      "Private guide for the whole voyage",
      "Anniversary dinner on the sandbank",
    ],
    message:
      "Eight guests total, so the boat is effectively private. This is above your stated ceiling and we are bidding anyway, because five nights under sail is a different trip from three under engine.",
    operator: "Nile Dahabiya Collection",
    respondedHoursAgo: 26,
  },
];

/* ------------------------------------------------------------
   Vessel positions on the graduated measure.

   One tick per audited vessel — 79 in total — distributed
   inside each band's observed range. Deterministic, so the
   scale is identical on server and client and never shifts
   between renders. Replace with real per-vessel totals from
   the rating pipeline; the shape is simply number[].
   ------------------------------------------------------------ */
export const VESSEL_POSITIONS: number[] = (() => {
  const out: number[] = [];
  for (const b of BANDS) {
    for (let i = 0; i < b.count; i++) {
      // Even distribution across the band, offset off the edges.
      const t = (i + 0.5) / b.count;
      out.push(Number((b.min + (b.max - b.min) * t).toFixed(2)));
    }
  }
  return out.sort((a, z) => a - z);
})();

/* ------------------------------------------------------------
   Account state — sample. Replace with the session's real
   bookings, wishlist, and saved searches once auth exists.
   ------------------------------------------------------------ */

export interface Booking {
  reference: string;
  vesselSlug: string;
  vesselName: string;
  band: BandKey;
  total: number;
  departure: string;
  nights: number;
  cabin: string;
  guests: number;
  paid: number;
  status: "confirmed" | "awaiting-deposit" | "completed";
  operator: string;
}

export interface SavedSearch {
  id: string;
  label: string;
  route: string;
  nights: number | null;
  floor: number;
  budgetMax: number;
  matches: number;
  alerting: boolean;
}

export interface WishlistEntry {
  vesselSlug: string;
  savedOn: string;
  priceWhenSaved: number;
}

export const BOOKINGS: Booking[] = [
  {
    reference: "BOOK-2027-00512",
    vesselSlug: "sonesta-sun-goddess",
    vesselName: "Sonesta Sun Goddess",
    band: "luxury",
    total: 93.45,
    departure: "2027-03-15",
    nights: 3,
    cabin: "Deluxe suite",
    guests: 2,
    paid: 25200,
    status: "confirmed",
    operator: "Sonesta Egypt Nile Cruises",
  },
  {
    reference: "BOOK-2027-00488",
    vesselSlug: "movenpick-royal-lotus",
    vesselName: "Movenpick Royal Lotus",
    band: "deluxe",
    total: 88.2,
    departure: "2027-06-02",
    nights: 4,
    cabin: "Standard double",
    guests: 2,
    paid: 8400,
    status: "awaiting-deposit",
    operator: "Movenpick Nile Cruises",
  },
];

export const WISHLIST: WishlistEntry[] = [
  { vesselSlug: "dahabiya-meroe", savedOn: "2026-12-02", priceWhenSaved: 6900 },
  { vesselSlug: "nile-dreams", savedOn: "2026-11-19", priceWhenSaved: 2800 },
  { vesselSlug: "lake-nasser-kalabsha", savedOn: "2026-10-30", priceWhenSaved: 2400 },
];

export const SAVED_SEARCHES: SavedSearch[] = [
  {
    id: "SRCH-01",
    label: "Aswan to Luxor, Deluxe and above",
    route: "Aswan — Luxor",
    nights: 3,
    floor: 81.7,
    budgetMax: 5000,
    matches: 14,
    alerting: true,
  },
  {
    id: "SRCH-02",
    label: "Dahabiyas, any length",
    route: "Esna — Aswan",
    nights: null,
    floor: 92.85,
    budgetMax: 9000,
    matches: 4,
    alerting: false,
  },
];
