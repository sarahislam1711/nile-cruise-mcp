---
name: Nile Cruise MCP
description: An independent register of 79 Nile cruise vessels, reckoned on one graduated measure and published as a table of record.
colors:
  paper: "#F4EFE4"
  paper-raised: "#FAF7F0"
  paper-sunk: "#EAE3D3"
  paper-edge: "#DED5C1"
  ink: "#1C1A15"
  ink-secondary: "#4A4437"
  ink-tertiary: "#6E6553"
  ink-quiet: "#8C8371"
  lapis: "#1B3A5C"
  lapis-bright: "#2C5C8F"
  lapis-wash: "#E3E9F0"
  bronze: "#8A6A3B"
  bronze-deep: "#5E4726"
  bronze-wash: "#EFE7D6"
  reed: "#3F5D4E"
  reed-wash: "#E4EBE5"
  silt: "#8C2F22"
  silt-wash: "#F5E4E0"
  rule-plain: "#C8BCA2"
  band-luxury: "#1B3A5C"
  band-deluxe: "#3F5D4E"
  band-superior: "#7A5C2E"
  band-standard: "#6E5B33"
  band-basic: "#5E5241"
  selection-bg: "#D9E2EC"
typography:
  display:
    fontFamily: "Zilla Slab, ui-serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Zilla Slab, ui-serif, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  reading:
    fontFamily: "Zilla Slab, ui-serif, Georgia, serif"
    fontSize: "2.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum 1, lnum 1"
  title:
    fontFamily: "Zilla Slab, ui-serif, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
  lead:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  fine:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.09em"
  arabic-display:
    fontFamily: "Noto Kufi Arabic, Zilla Slab, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
  arabic-body:
    fontFamily: "Noto Naskh Arabic, Public Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
rounded:
  none: "0"
  control: "3px"
  pill: "999px"
spacing:
  hair: "0.25rem"
  finger: "0.5rem"
  palm: "0.75rem"
  span: "1rem"
  foot: "1.5rem"
  cubit: "2rem"
  fathom: "3rem"
  reach: "4rem"
  flood: "6rem"
components:
  plate-primary:
    backgroundColor: "{colors.lapis}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  plate-primary-hover:
    backgroundColor: "{colors.lapis-bright}"
    textColor: "{colors.paper}"
  plate-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  plate-quiet-hover:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
  field:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 0.75rem"
    height: "2.75rem"
  record:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem 1rem"
  record-hover:
    backgroundColor: "{colors.paper-raised}"
  record-focus:
    backgroundColor: "{colors.lapis-wash}"
  rubric:
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.label}"
  nav-item-active:
    backgroundColor: "{colors.lapis}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    height: "2.75rem"
---

# Design System: Nile Cruise MCP

## Overview

**Creative North Star: "The Flood Almanac"**

The Nile was measured and published every year for five thousand years. A nilometer graded the flood in cubits, and that number set taxes, planting, and survival. The measurement was the product, and it was set as a ruled table. This system reckons 79 vessels on one graduated measure and publishes them the same way: the audited number leads, and photography corroborates. That inversion is the whole thesis — the booking-aggregator arrangement, where a photo grid leads and the score is a badge pinned to a corner, is the confirmed anti-reference.

The surface is laid almanac paper: a warm ground with a real tooth, painted directly onto the body as chain lines, laid lines, and a faint fibre mottle, all held under 4% opacity so text contrast is untouched. On top of that ground, hierarchy is carried entirely by ruled lines and by the size of numerals. There is no card anywhere in this build. A vessel is a ruled row, a section is a heavy rule with a heading sitting on it, and a page closes on a six-pixel crest rule rather than trailing off into blank paper. Depth is declared once, by rule weight; the two shadow tokens exist only for the two things that genuinely float above the page.

The palette is restrained by construction. Paper and ink do almost all the work; lapis is the single action accent and is spent on every link, every primary control, every focus ring and nothing else; oxidized bronze is structure and never signals; reed green marks verified facts and silt red marks problems. Density is high and unapologetic — this is a document to be read in daylight, often on a phone outdoors, and possibly printed or screenshotted for a travelling companion, not an atmosphere to sit inside.

**Key Characteristics:**
- Laid-paper ground with a painted tooth; ink and rules carry all hierarchy
- One action accent (lapis) and nothing else that reads as clickable
- Records are ruled rows, never cards
- Numerals at cubit scale (44px) set the visual hierarchy of the register
- Five rule weights from hairline to crest replace shadow-based elevation
- Every quality band carries three channels: name, fill pattern, hue
- Spacing named for nilometer gradations on a 4px base
- One authored motion moment: the flood rise
- RTL and Arabic are structural, not retrofitted

## Colors

A warm paper-and-ink document palette with exactly one action color, one structural metal, and two semantic signals.

### Primary
- **Lapis** (`{colors.lapis}`): The sole action color. Every link, every primary control fill, every focus ring outline, the active mobile-nav cell, and the skip link. It clears 9.7:1 on paper. **Lapis Bright** (`{colors.lapis-bright}`) is its only hover state (5.4:1); **Lapis Wash** (`{colors.lapis-wash}`) is the selected-row and focus-within ground for records and cabin rows.

### Secondary
- **Oxidized Bronze** (`{colors.bronze}`): Structure only. It is the strong rule color, the scrollbar thumb, and the tint inside the paper's fibre mottle. **Bronze Deep** (`{colors.bronze-deep}`) is the scrollbar hover and the darker chain-line tint. Bronze never becomes a button, a link, or a status.

### Tertiary
- **Reed Green** (`{colors.reed}`, 7.2:1): Verified facts only — cabins available, audit confirmations, the leading dash on an assistant's reason list.
- **Silt Red** (`{colors.silt}`, 7.9:1): Problems only — sold out, expired, errors, and the strike-through rule across a sold-out price.

Note: the direction contract named reed green as `#5E7A6B`. The build ships `#3F5D4E`, darkened to clear AA on paper. The build is correct; the contract value is superseded.

### Neutral
- **Almanac Paper** (`{colors.paper}`): The page ground, carried on the body along with the laid texture.
- **Raised Paper** (`{colors.paper-raised}`): Lifted record rows on hover, the fixed mobile nav bar, the assistant panel.
- **Sunk Paper** (`{colors.paper-sunk}`): Wells — every input and select fill, the empty track behind a score bar, the scrollbar track.
- **Deckle** (`{colors.paper-edge}`): The default border color for every element, and the quiet hairline rule.
- **Plain Rule** (`{colors.rule-plain}`): The mid-weight rule and the border on quiet controls and fields.
- **Ink** (`{colors.ink}`, 13.9:1): All body and heading text, and the heaviest rules.
- **Ink Secondary** (`{colors.ink-secondary}`, 7.6:1): Supporting prose, route and operator lines, band names.
- **Ink Tertiary** (`{colors.ink-tertiary}`, 4.6:1): Rubrics, captions, metadata, placeholders. This is the floor for text.
- **Ink Quiet** (`{colors.ink-quiet}`, 3.2:1): Large text and rules only — a muted sold-out reading, a struck price.

### Band Stations
Five stations on the graduated measure, each a background that carries paper-colored text: **Luxury** (`{colors.band-luxury}`, 10.14:1), **Deluxe** (`{colors.band-deluxe}`, 6.34:1), **Superior** (`{colors.band-superior}`, 5.39:1), **Standard** (`{colors.band-standard}`, 5.71:1), **Basic** (`{colors.band-basic}`, 6.64:1).

### Named Rules

**The One Accent Rule.** Lapis is the only color in this system that means "you can act on this." Bronze is structure, reed is verification, silt is failure. If a new element needs to look interactive, it takes lapis; if it needs to look important but is not interactive, it takes rule weight or type scale instead. Nothing else may be promoted to an accent.

**The Measured Band Rule.** The five band colors were darkened after a contrast audit so paper-colored text clears 4.5:1 on every band. The measured ratios are recorded above. Do not lighten a band color without re-measuring paper-on-band and recording the new figure.

**The Three Channel Rule.** A quality band is never communicated by hue alone. Every band carries a written name, a distinct CSS fill pattern, and a hue. Luxury is solid (the top band needs no texture), Deluxe is a dense fine rule, Superior is diagonal, Standard is a wide rule, and Basic is the sparsest cross-hatch. Any new band or score category must ship all three channels.

## Typography

**Display Font:** Zilla Slab (with ui-serif, Georgia, serif)
**Body Font:** Public Sans (with ui-sans-serif, system-ui, sans-serif)
**Arabic Display:** Noto Kufi Arabic (falling back to Zilla Slab)
**Arabic Body:** Noto Naskh Arabic (falling back to Public Sans)

**Character:** Zilla Slab is a surveyor's slab — it sets numerals with the authority of a measurement rather than the romance of a magazine, and it carries every heading and every score. Public Sans is the civic register workhorse: the voice of a published record, used for body copy, tables, and controls. The Arabic faces are weight-matched companions loaded at the root, not a fallback.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 7vw, 4.5rem)`, 1.05, -0.03em): The single page headline. Capped at a 16ch measure so it breaks as a statement, not a paragraph.
- **Reading** (600, 2.75rem / 44px, 1, -0.02em, tabular): The score numeral on a record. This is the largest thing in the register and the reason the eye lands on the number before the name.
- **Headline** (600, 1.75rem / 28px, 1.2): Section heads and band-station labels, always sitting on a rule.
- **Title** (500, 1.375rem / 22px, 1.2): Vessel names in the register, prices, panel headings.
- **Lead** (400, 1.125rem / 18px, 1.6): The paragraph under the display headline, and assistant questions.
- **Body** (400, 1rem / 16px, 1.6): Default prose. 16px is the floor; nothing is ever set smaller for reading. Paragraphs are capped at 68ch.
- **Fine** (400, 0.8125rem / 13px): Table meta, captions, footer prose, filter option labels.
- **Rubric** (600, 0.6875rem / 11px, 0.09em, uppercase, ink-tertiary): The almanac's small tracked label — column heads, fieldset legends, nav items, the masthead's section links, the colophon line.

A 96px crest step and a 72px flood step exist in the token scale as the display ceiling. The build's largest realized type is the `clamp()` display, which tops out at the flood step.

### Named Rules

**The Number Leads Rule.** On any surface where a vessel is being judged, the audited score is the largest element in its row, set in the record face at cubit scale with tabular lining numerals. The vessel's name is subordinate to its reading. This is the inversion the product exists to make.

**The Tabular Figure Rule.** Every figure in this product is a measurement. Tables, time elements, number inputs, and anything marked `.tabular` or `[data-numeral]` set `tabular-nums lining-nums`. Digits must line up in a column so two readings can be compared by eye.

**The Arabic Tracking Rule.** Arabic never takes Latin tracking. Under `:lang(ar)` and `[dir="rtl"]`, letter-spacing resets to zero, line-height opens to 1.75, and the rubric drops its uppercase transform and tracking in favor of weight 700 — because Arabic has no small caps to imitate.

## Layout

The page is a single column with a generous side rhythm: `1rem` gutters on phones opening to `4rem` from the medium breakpoint. There is no page-wide grid; structure comes from ruled sections stacked at `3rem` intervals, each opening with either a section head or a crest rule.

Spacing is a ten-step measure named for nilometer gradations on a 4px base — hair (4), finger (8), palm (12), span (16), foot (24), cubit (32), fathom (48), reach (64), flood (96), crest (128). Component-internal spacing lives in the hair-to-foot range; sections separate at fathom; page top and bottom padding uses reach and crest.

The register row is a two-column grid on phones (`auto 1fr`, with the price wrapping under the name into column two) and a three-column grid from medium up (`7.5rem 1fr auto`) so the reading, the identity, and the price each hold their own column. The vessel detail and the homepage breakdown use an asymmetric two-column split (`minmax(0,42rem) minmax(0,22rem)`) where the evidence gets the wide column and the interpretation gets the narrow one. Band stations wrap from two columns to three to five as width allows rather than colliding.

Only one breakpoint family is in real use — Tailwind's `sm` (640px), `md` (768px), and `lg` (1024px). `md` is the desktop hinge: it releases the fixed bottom nav, restores the body's bottom padding, opens the gutters, and turns the score breakdown's bar from a full-width strip under its own label into its own table column. Body prose is capped at 68ch; the display headline at 16ch; supporting paragraphs at 52–58ch.

Touch targets have a hard 44px floor, non-negotiable given a majority-mobile audience. Every control, filter chip, range input, and nav cell declares `min-height: 2.75rem`.

**The Two Column Register Rule.** A record never collapses into a stack of unlabeled fragments on narrow screens. The reading stays in column one at full cubit scale, and the price moves under the name rather than being squeezed off the edge.

## Elevation & Depth

This system does not use shadows to express hierarchy. Elevation is declared once, by rule weight. Five weights — hair (0.5px), thin (1px), mid (2px), heavy (3px), crest (6px) — combined with four rule colors (quiet `{colors.paper-edge}`, plain `{colors.rule-plain}`, strong `{colors.bronze}`, ink `{colors.ink}`) carry the entire structural hierarchy of the almanac. A hairline in deckle separates rows in a key list; a thin plain rule separates fieldsets; a 2px ink rule opens a section or closes a filter panel; a 6px ink crest opens a major page division and closes the footer.

Two shadow tokens exist, and they are used only for the two things that genuinely float above the paper: a lifted record row on hover, and an open panel (the assistant's launcher and drawer, and the bids panel). Both are warm-tinted from the ink rather than neutral black.

### Shadow Vocabulary
- **Lifted row** (`box-shadow: 0 1px 2px rgba(28,26,21,0.06), 0 2px 6px rgba(28,26,21,0.05)`): A record row under the cursor, paired with a shift to raised paper. Never at rest.
- **Open panel** (`box-shadow: 0 4px 10px rgba(28,26,21,0.08), 0 12px 32px rgba(28,26,21,0.10)`): The assistant drawer and its fixed launcher, over a `rgba(28,26,21,0.35)` scrim.

### Named Rules

**The Declare Once Rule.** An element's depth is expressed by a rule, or by a shadow, never by both. A bordered box with a drop shadow under it is two claims about the same edge; the almanac makes one. Sections, rows, panels, and tables get rules. Only true overlays get shadows.

**The Flood Rise Rule.** There is one authored motion moment in this system: `flood-rise`, an exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) over 900ms that scales a bar horizontally from its datum, the way water rises against a scale. Score bars stagger by dimension weight so Service (30 points) leads; band segments on the fleet measure stagger at 70ms intervals. Everything else moves at 90–260ms or not at all. The animation always begins from an already-visible datum, so no content depends on motion to be read, and `prefers-reduced-motion: reduce` cancels it entirely along with smooth scrolling.

## Shapes

This world is letterpress. Rows, plates, tables, panels, and band marks are square (0 radius). The only radius in the system is a 3px control radius, applied to buttons, inputs, selects, the filter chips, the skip link, and the focus ring's own corner. A pill radius exists for exactly one thing: the scrollbar thumb.

The recurring signature form is the graduated measure — a horizontal scale with a hairline top rule and a 2px ink bottom rule (the datum), overlaid with drawn gradations: minor ticks at the scale's pitch biting 34% of its depth, major ticks every fifth gradation biting 62%. At page scale it carries the whole fleet as 79 individual one-pixel vessel ticks seated on the datum, each at its own position. At row scale the same idea becomes a score bar in a sunk-paper track. A nilometer's authority is its ticks, so they are drawn rather than suggested.

Band fills are never a flat swatch alone; each carries its pattern overlay as a positioned `::after`, which requires the band element to be `relative` and `overflow-hidden`.

## Components

### Plates (buttons)
Square letterpress plates with the barest control radius.
- **Shape:** Nearly square (3px radius), 44px minimum height, `0.75rem 1.5rem` padding, weight 600, 0.01em tracking.
- **Primary:** Lapis fill, paper text, a 1px lapis border so it holds its own edge on paper. Hovers to lapis bright.
- **Quiet:** Transparent fill, ink text, 1px plain rule border. On hover the fill goes to sunk paper and the border darkens to ink.
- **States:** Active presses down 1px over 90ms. Disabled drops to 0.45 opacity with a not-allowed cursor. Links styled as plates carry `no-underline`.

### Chips (filter toggles)
- **Style:** A visually hidden radio with a labeled span as the control. Unselected is transparent with a plain 1px rule and ink text; selected is a lapis fill with paper text.
- **State:** Focus is forwarded from the hidden input to the visible span as a 2px lapis outline.

### Records (the fleet's unit — signature component)
Records are ruled rows, never cards. A record is an `article` with a single 1px deckle rule along its bottom edge, `1.5rem` vertical and `1rem` horizontal padding, and no background at rest.
- **Composition:** Reading at cubit scale on the leading edge; name, route, and metadata in the center; price and availability on the trailing edge.
- **Hover:** Ground shifts to raised paper and the lifted-row shadow appears, both over 160ms.
- **Focus-within:** Ground shifts to lapis wash, so keyboard position is as legible as pointer position.
- **Sold out:** `data-state="soldout"` mutes the whole row to ink-quiet and strikes the price with a 1px silt rule. State prints itself as content in the table's own language rather than as a badge.

### Fields (inputs, selects, ranges)
- **Style:** Sunk-paper well, 1px plain rule, 3px radius, 44px minimum height, `0.75rem` horizontal padding. Numeric and date fields set tabular figures.
- **Label:** Always a rubric above the field, in the same `0.25rem` stack.
- **Focus:** The global 2px lapis outline at 2px offset. A focus ring is never removed, only re-placed.
- **Placeholder:** ink-tertiary at full opacity (4.6:1) — never a gray wash below AA.
- **Range inputs:** `accent-color` set to lapis so the browser's own control joins the palette.

### Navigation
- **Masthead:** A single hairline plain rule along the bottom, no shadow. Wordmark in the record face at body size with 0.02em tracking; primary nav is a wrapping list of rubrics.
- **Mobile nav:** Fixed to the bottom below `md`, raised paper ground with a 2px ink top rule, four equal cells, safe-area inset honored. The active cell inverts to a lapis fill with paper text. Destinations are labeled in words, never glyphs.
- **Footer:** Opens on a 6px ink crest rule and closes the page rather than letting it trail off.

### Tables
- **Head:** Column heads are rubrics with `text-start` / `text-end` logical alignment.
- **Rows:** Separated by 1px deckle rules; no zebra fill in the shipped tables. Selected cabin rows take a lapis-wash ground.
- **Foot:** A total row separated by a 2px ink rule, with the total set in the record face at station scale.

### Score Breakdown (signature component)
A real `table` with a screen-reader caption stating the total out of 100. Each dimension row carries its label, its explanatory note at micro scale, a bar in a sunk-paper track filled with the vessel's own band pattern, and the score as `n/max`. Below `md` the bar rides under its own label so the score column is never squeezed; from `md` up it takes its own 42%-wide column with a 1px plain rule marking the maximum. Bars carry the flood rise, staggered at 90ms per dimension.

### Panels
The assistant is a fixed drawer entering from the inline end, full width on phones and capped at 30rem from `sm`, over a 35% ink scrim, with the open-panel shadow. Its internal sections separate on quiet rules; its footer sits on a 2px ink rule.

## Do's and Don'ts

### Do:
- **Do** lead with the number. On any surface where vessels are compared, the audited reading is the largest element in the row, set in Zilla Slab at cubit scale (44px) with tabular lining figures.
- **Do** express structure with rule weight. Five weights (0.5px, 1px, 2px, 3px, 6px) and four rule colors carry every hierarchy this system needs.
- **Do** spend lapis on actions and nothing else. Links, primary plates, selected chips, active nav cells, focus rings, range accents.
- **Do** ship all three channels for any score band: written name, fill pattern, hue.
- **Do** use logical properties throughout — `ps`/`pe`, `ms`/`me`, `text-start`/`text-end`, `borderInlineStart`, `inset-x`. RTL is structural here, and the flood rise flips its transform origin under `[dir="rtl"]`.
- **Do** keep every interactive target at or above 44px (`{spacing.hair}`-based padding plus `min-height: 2.75rem`).
- **Do** name spacing by nilometer gradation (hair through crest) rather than t-shirt sizes.
- **Do** print state as content in the table's own language — "No cabins on these dates" in silt, "Cabins available" in reed.
- **Do** honor `prefers-reduced-motion`: the flood rise resolves instantly to its filled state and smooth scrolling is disabled.

### Don't:
- **Don't** put a record in a card. No rounded container, no drop shadow at rest, no bordered box around a vessel. Records are ruled rows; this is a hard rule of the world.
- **Don't** pair a border with a shadow on the same edge. Elevation is declared once.
- **Don't** promote bronze, reed, or silt to an action color. Bronze is structure, reed is verification, silt is failure — none of them are ever a button or a link.
- **Don't** lighten a band color without re-measuring paper-on-band contrast and recording the new ratio.
- **Don't** set reading text below 16px, or place text on ink-quiet (3.2:1) at anything under large size.
- **Don't** lead a surface with a hero photograph. The measure leads; photography corroborates.
- **Don't** apply Latin tracking to Arabic, and don't fake Arabic small caps with `text-transform` — use weight 700 instead.
- **Don't** paint the paper texture as an overlay element. It belongs on the body itself; an overlay lands behind positioned descendants and the grain disappears.
- **Don't** label navigation or state with glyph icons. This build labels every destination in words on purpose.
- **Don't** remove a focus ring. Re-place it if it collides, never delete it.
