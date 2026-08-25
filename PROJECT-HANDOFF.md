# PROJECT HANDOFF — Zach Crawford composer portfolio

Two independent documents in one file:

- **Part 1 — Valuation.** Pricing analysis. Written 2026-08-25. Not needed to
  work on the code; skip to Part 2 if you're here to write software.
- **Part 2 — Architecture.** The map of what exists and where. This is what a
  new session should read first.

Conduct rules live in `.claude/CLAUDE.md` and are **not** repeated here. Read
that file — it overrides patterns you see in the code.

---
---

# PART 1 — VALUATION

## Measured scope (2026-08-25)

| Metric | Value |
| --- | --- |
| Source files | 70 (35 `.tsx`, 27 `.css`, 8 `.ts`) |
| Lines of source | ~5,050 |
| Routes | 5 + 404 (10 pre-rendered pages) |
| Design tokens | 56, in a 389-line `globals.css` |
| Runtime dependencies | **3** — `next`, `react`, `react-dom` |
| Build timeline | 2026-08-20 → 2026-08-25, 22 commits |
| Developer time | ~20–30 hours, design + development |

## What raises the value

- **Custom coverflow carousel.** Shortest-path ring wrap, velocity blur ramped
  over a multi-step trip, mid-travel interrupt resolution against the in-flight
  index. Most developers reach for Swiper.js here. This is hand-built and the
  interrupt handling is genuinely non-trivial.
- **Zero UI dependencies.** No Tailwind, no component library, no animation
  library. Every component, icon, and transition is hand-written. This is a real
  differentiator to a technical reviewer.
- **Theme system.** Dark/light via the View Transitions API, `localStorage`
  persistence, and an inline `<script>` that sets the attribute before first
  paint to prevent FOUC.
- **Accessibility is real, not decorative.** 11 distinct `aria-*` attributes in
  use, a focus trap in the drawer, `aria-live` announcements on carousel change,
  `prefers-reduced-motion` handling, and `@media (hover: hover)` guards in 13
  stylesheets.
- **Complete SEO surface.** Derived sitemap (reads the same source as the nav,
  so new content appears without a second edit), robots, generated OG image,
  metadata templates.
- **Typed data layer with build-fail guards.** `getLandingComp()` throws at
  build time if the content invariant is violated, rather than rendering wrong.

## What caps the value

- **No CMS. Content is hardcoded in `src/components/data/data.ts`.** The client
  cannot change a single word without a developer. This is the single largest
  constraint on both price and long-term client relationship.
- **Brochure site.** No backend, no auth, no forms, no e-commerce. Five static
  pages.
- **Low-budget market.** Composer/musician portfolios compete against
  Squarespace and Bandzoogle templates at $16–50/month. Buyers in this category
  are frequently individuals, not funded organizations.
- **Placeholder content throughout.** Real copy, real photography, and real
  audio are all still outstanding as of this writing.

## Price bands

Estimates for the US freelance market, 2026. Regional rates vary widely.

| Scenario | Range | Target |
| --- | --- | --- |
| Second project, first time charging | $500 – $1,200 | **$800** |
| Beginner developer | $750 – $1,500 | **$1,000** |
| Senior developer | $4,000 – $8,000 | **$5,500** |
| **Actual fair value for this developer** | **$1,000 – $1,800** | **$1,200 – $1,500** |

### Reasoning

**Second project / first time charging — $800.** At this stage the testimonial
and the portfolio piece are worth more than the invoice. But pricing below ~$400
signals the work is worthless and attracts clients who will treat it that way.
$800 ÷ 25 hours ≈ $32/hour.

**Beginner developer — $750–1,500.** Substantially the same band. The variable
is not skill, it is confidence in delivering the quote without discounting
preemptively.

**Senior developer — $4,000–8,000.** A senior scopes this at 15–20 hours rather
than 25, and bills $150–250/hour. They would also refuse to ship without a CMS —
and would quote that separately rather than absorbing the support burden.

**Actual fair value — $1,200–1,500.** The code quality is above beginner level
in ways a technical reviewer notices immediately (the carousel, the theme
system, the a11y work). What is missing is market leverage: a small portfolio,
one internship, second paid engagement. $1,250 = 25 hours × $50/hour, which is a
defensible junior-freelance rate.

## Commercial notes

1. **The CMS gap is the main leverage point.** Every content change is currently
   a support request. Either attach a retainer ($75–150/month) or quote the CMS
   as an explicit phase 2 ($800–2,000). Absorbing content edits indefinitely is
   how a $1,200 project silently becomes a $600 one.
2. **Scope creep is already happening.** A single session on 2026-08-25 added
   five features. Under a fixed-price agreement that time was unbilled. Bill
   hourly on early engagements, or include a written change-order clause.
3. **Qualify the buyer.** A student composer may genuinely top out below $1,000.
   An established composer with a commissioning budget is under market at
   $1,500.
4. **Deposit up front.** 50% before work, 50% on delivery, is standard and not
   worth negotiating away.

---
---

# PART 2 — ARCHITECTURE

## Stack

Next.js 16.3.1 (App Router, Turbopack) · React 19.2.8 · TypeScript strict ·
CSS Modules + CSS custom properties.

**Three runtime dependencies total** — `next`, `react`, `react-dom`. This is
deliberate. No Tailwind, no UI kit, no animation library, no icon package.
Adding a dependency requires explicit approval per `.claude/CLAUDE.md`.

Scripts (these are the only ones that exist — do not invent others):

```
npm run dev     # next dev
npm run build   # next build
npm run start   # next start
npm run lint    # eslint
```

## Routes

| Route | Rendering | Entry component |
| --- | --- | --- |
| `/` | Static | `src/app/components/Home.tsx` |
| `/about` | Static | `src/app/about/components/About.tsx` |
| `/achievements` | Static | `src/app/achievements/components/Achievements.tsx` |
| `/compositions` | Static | `src/app/compositions/components/Compositions.tsx` |
| `/compositions/[slug]` | SSG, 10 paths | `src/app/compositions/[slug]/components/CompositionDetail.tsx` |
| 404 | Static | `src/app/not-found.tsx` |

Also generated: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg`.

## Directory conventions

Component placement follows one rule:

- **`src/app/**/components/`** — route-local. Used by exactly one route.
- **`src/components/<Name>/`** — shared across routes. Each in its own folder
  with a co-located `.module.css`.
- **`src/components/ui/`** — small shared primitives (`Divider`,
  `ExternalLink`, `Flourish`, `Logo`, `Portrait`, `SectionHeading`, `icons`).
- **`src/components/data/`** — the content source of truth.
- **`src/lib/`** — derived reads over the data. Pure functions, no JSX.

## Data layer — the source of truth

**`src/components/data/data.ts`** holds all catalogue content. Nothing else may
sort, filter, or search it directly; that is what `src/lib/` is for.

**`src/components/data/site.ts`** holds site identity, nav items, and SEO
strings.

### `images` constant

```ts
export const images = {
  marchingSS: "/images/MarchingSS.png",
  jazzEnsTitles: "/images/jazzEnsTitles.jpg",
  zach: "/images/zach.png",
} as const;
```

Files live in `public/images/` and are referenced by **string path**, never by
static import. This was decided deliberately: `public/` serves plain strings, so
a `null` placeholder state is expressible and no bundler-aware import is needed.
Static imports would return `StaticImageData`, which cannot be `null`, and whose
main benefit — automatic dimensions — is unused because dimensions are
hard-coded.

**To add a photo:** drop the file in `public/images/`, add one line to `images`,
reference it as `images.yourKey`.

### `Composition`

```ts
type Composition = {
  slug: string;             // route key — feeds getBySlug, allSlugs, generateStaticParams
  title: string;
  subtitle?: string;
  year: number;
  type: CompositionType;    // "orchestra" | "chamber" | "solo"
  duration?: string;
  scoring?: string;         // free-text ensemble detail, e.g. "3.2.2.2 / 4.3.3.1 / timp"
  blurb: string;
  description?: string[];   // paragraphs; renders as "Program note"
  image: string | null;     // required key; null renders the typographic placeholder
  audio?: { src: string; label: string }[];
  score?: { src: string; label: string };
  youtube?: { src: string; label: string };
  purchaseUrl?: string;
  landingComp?: true;       // see below
  featured?: true;          // see below
};
```

### ⚠️ `landingComp` vs `featured` — read this before touching either

These were swapped on 2026-08-25 and the names are counter-intuitive:

- **`landingComp`** — the single hero work, centred when the carousel loads.
  `getLandingComp()` **throws at build time** unless exactly one composition
  carries it. This is a deliberate content guard, not a bug.
- **`featured`** — carousel membership. Any number of works may carry it.
  `carouselOrder()` builds the strip from these, then places the `landingComp`
  work at centre.

A work should generally carry both if it is the hero. Currently `tidewater`
does.

### ⚠️ Three-way `featured` naming collision

`Composition.featured`, the `FeaturedCarousel` component, and the
`featuredImages` array are **three unrelated concepts**. `featuredImages` feeds
the home-page portrait rotator and has nothing to do with compositions. This
collision is known and documented, not accidental.

### `Achievement`

Standalone entity. **No reference to compositions** — there is deliberately no
`compositionSlug` field and no `getByCompositionSlug` function.

```ts
type Achievement = {
  id: string;
  year: number;
  type: AchievementType;  // "award" | "performance"
  title: string;
  organization?: string;
  detail?: string;
  href?: string;
};
```

## `src/lib/` — derived reads

**`compositions.ts`**
- `getLandingComp()` — hero work. **Throws unless exactly one match.**
- `carouselOrder()` — `featured` works, newest-first, split around the
  `landingComp` so it sits mid-track.
- `byYearDesc()` — newest first, ties broken alphabetically for build stability.
- `byType(family)`, `usedCompositionTypes()`, `getBySlug(slug)`,
  `getRelated(slug, limit = 3)`, `allSlugs`.

**`achievements.ts`** — equivalent derived reads over `achievements`.

**`featuredImages.ts`** — `getFeaturedImages()`. Unlike `getLandingComp()`, an
empty array is a **valid** state here and does not throw.

**`theme.ts`** — theme constants, `localStorage` read/write, the FOUC-prevention
inline script source, and the View Transitions wipe.

## Notable components

**`FeaturedCarousel.tsx`** (`src/app/components/`) — the landing coverflow, and
the most complex file in the project.
- `activeIndex` is the single source of truth. Exactly three cards render
  (centre + one flank per side); cards beyond that are not in the DOM.
- Multi-step jumps travel through every intermediate index one step at a time,
  always along the **shorter side of the ring**. Per-step 320ms, whole trip
  capped at 1000ms, compressed beyond ~3 steps.
- **Known side effect:** with shortest-path wrap, travel direction does not
  always match which side of the dot strip was clicked.
- Velocity blur is on the **stage wrapper**, not per card — `filter: blur()` on
  a simultaneously-transforming element causes compositor flicker, so blur and
  transform must share one element. `will-change` is set only while travel is in
  flight.
- Flanking cards are `<button>` (they step the carousel); only the centre card
  is a real `<Link>`.
- Interrupts supersede the in-flight target without queueing or snapping.

**`FeaturedImageRotator.tsx`** (`src/app/components/`) — home portrait rotator.
Advances every 3000ms, wraps, crossfades ~400ms. **No arrows, no dots, no click
targets, no swipe** — timer only, by explicit request. Reduced motion disables
autoplay entirely and pins index 0.

**`CompositionCover.tsx`** (`src/components/CompositionCover/`) — renders either
a `next/image` or, when `image` is `null`, a generated typographic placeholder.
There is **no blur-up placeholder anywhere in this codebase**; see Known Gaps.

**`MenuDrawer.tsx`** (`src/components/MenuDrawer/`) — mobile nav. Focus trap
including the external trigger, `Escape` to close, `inert` when closed so it
ships out of the a11y tree from the server with nothing to fix on hydration.

**`EscapeToCompositions.tsx`** (`src/app/compositions/[slug]/components/`) —
minimal client island; `Escape` navigates to `/compositions`. Exists so
`CompositionDetail` can stay a server component.

## Styling system

- `src/app/globals.css` — 56 custom properties: colour, spacing scale, type
  scale, easing. Light/dark via `[data-theme]`.
- Utility classes defined globally: `tracked-caps`, `tracked-caps-tight`,
  `gold-frame`, `gold-frame-strong`, `surface-glow`, `sr-only`.
- `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)` — the standard curve.
  `--ease-overshoot` is a **bounce** curve; do not use it for fades.
- **All hover rules must be wrapped in `@media (hover: hover)`.** This is a
  repo-wide convention, applied in 13 stylesheets.
- Transform-composition trap: carousel cards carry
  `translate/translateX/scale/rotateY` chains. Any hover rule must **restate the
  full chain** — a bare `transform: translateY(-5px)` silently cancels the
  rotation and flattens the card.

## Known gaps — reported, not fixed

Per `.claude/CLAUDE.md`, these are surfaced rather than silently repaired.

1. **Four junk entries in `data.ts`:** slugs `test`, `test1`, `test2`, `test3`.
   They generate four real SSG pages. `test3` carries `featured: true` and
   therefore appears in the live carousel. Deleting them is safe but is a
   destructive edit and needs explicit approval.
2. **Blurred cover art — unresolved and undiagnosed.** Reported as compositions
   cover art staying permanently blurred. An audit found **no blur mechanism in
   the codebase at all**: no `placeholder="blur"`, no CSS `filter` on covers, and
   `MarchingSS.png` is 968×576, comfortably above its rendered size. The
   originally proposed fix — preloading all images before first paint — was
   rejected as worse than the symptom (multi-second white screen on cold load).
   **Needs a concrete reproduction: which route, which composition, which
   viewport.**
3. **Placeholder media paths.** `tidewater`, `north-light`, and `three-elegies`
   carry `audio` paths under `/audio/` that **do not exist** — the native player
   renders but will not play. Their `score`, `youtube`, and all `purchaseUrl`
   values point at `google.com`. All are intentional visual placeholders.
4. **No real content.** No photography for any composition (`image: null`
   across the catalogue), placeholder achievement text, and `tidewater`'s
   `description` is keyboard mash.
5. **`FeaturedCarousel` inline easing literal.** Duplicates `--ease-standard`
   as a hardcoded `cubic-bezier`. Left alone deliberately — retro-fitting it
   would bury an unrelated change in a feature diff.
6. **Duplication trap, live:** `--card-width` in `FeaturedCarousel.module.css`
   pairs with the `sizes` prop in `FeaturedCarousel.tsx`. Changing one requires
   changing the other. Both carry a warning comment.

## State as of 2026-08-25

Build passes. Lint passes. Uncommitted work is present in the tree — **version
control is the owner's; do not commit, stage, or branch.**

Most recent completed work: carousel membership flag, `Escape`-to-back on detail
pages, YouTube and Purchase fields, hover lift on carousel cards, and the
`images` path constant.
