# Zachary Crawford — Orchestral Composer Portfolio: Build Plan

> **Status:** phases 0–7 are built against the recommended defaults. Phase 8 (a11y/perf audit) and
> phase 9 (hosting decision) are outstanding, and every content string in `src/content/` is
> placeholder pending answers to the STEP 3 questions. See the README for what to edit.

## Context

The repo is a bare `create-next-app` scaffold (Next 16.3.1, React 19.2.8, Tailwind v4, TypeScript,
App Router). Nothing has been built. We have one AI-generated mockup of the landing page in three
viewports and the original hand sketch it came from. Four inner pages (About Me, Compositions,
Achievements, Contact) are named by the nav but undesigned.

Goal: ship a static, no-CMS portfolio for an orchestral composer where content lives in-repo as
typed data, adding a composition is a one-file edit, and the visual system from the mockup (deep
navy, gold accents, thin gold frames, display serif, treble-clef flourish motif) carries across
all five pages. It ships, then it gets prettier.

Everything below assumes the recommended defaults from STEP 3 of the chat response.

---

## 1. Stack — confirmed, with three amendments

**Confirmed:** Next.js 16 App Router + TypeScript + Tailwind v4. Right call, and specifically:

- Every page is static content known at build time. App Router prerenders all five routes to HTML
  at build with zero server work. Nothing here needs a server.
- Tailwind v4 is CSS-first: theme tokens are declared in `globals.css` via `@theme`, no
  `tailwind.config.js`. This matters for our theming approach (§4) — one token set, two value sets,
  no `dark:` prefix sprayed across every component.
- TypeScript is what makes "content as typed data" actually safe. A missing `year` on a composition
  becomes a build error, not a blank space on the live site.

**Amendment 1 — stay static-export-compatible, decide the host later.** Do not use Server Actions,
Route Handlers, `cookies()`, `headers()`, or middleware/proxy. None of them are needed. This keeps
`output: 'export'` available as a one-line escape hatch, which is the whole leverage in the Vercel
licensing question (§9). Cost of this constraint: the contact page uses a `mailto:` link rather than
a posted form. That is the right call anyway — no backend, no spam filtering, no deliverability
problem, and commission inquiries arrive by email regardless.

**Amendment 2 — no carousel library.** Embla/Swiper/Keen are 15–40kB to solve a problem CSS
scroll-snap solves natively with better touch, keyboard, and screen-reader behavior. See §6.

**Amendment 3 — no `next-themes`.** It's ~2kB and mostly wraps the inline-script trick, but Next 16
has a documented dev-mode gotcha (React Strict Mode's remount wipes attributes on `<html>`) that we
have to handle in our own code anyway. Writing ~30 lines ourselves means we can explain every line
of it. See §4.

**Rejected:** MDX for compositions as the primary store (§2), a headless CMS (closed by you),
Framer Motion (CSS handles everything here; revisit only if the flourish gets a real animation).

### Next 16 specifics that will bite if ignored

Verified against `node_modules/next/dist/docs/`:

- `params` in `page.tsx`/`generateMetadata` are **Promises**. `/compositions/[slug]` must
  `await props.params`. Use the generated `PageProps<'/compositions/[slug]'>` helper.
- `next lint` is removed; `next build` no longer lints. The scaffold's `"lint": "eslint"` is already
  correct. Lint runs as its own step in CI.
- `images.qualities` now defaults to `[75]` only. If we pass any other `quality`, it must be listed
  in `next.config.ts` or it gets silently coerced.
- `scroll-behavior: smooth` is no longer overridden during navigation. If we set it globally, add
  `data-scroll-behavior="smooth"` to `<html>` so route changes still jump instantly instead of
  smooth-scrolling the whole page height.
- Turbopack is the default bundler. No config needed.

---

## 2. Content data shape

Plain TypeScript modules under `src/content/`, imported directly by Server Components. No fs reads,
no parsing, no `contentlayer`. Type errors surface at build.

### `src/content/compositions.ts`

```ts
export type Instrumentation =
  | 'orchestra' | 'chamber' | 'choral' | 'solo' | 'band' | 'film';

export type Composition = {
  slug: string;              // permalink: /compositions/<slug>. Never change once published.
  title: string;
  subtitle?: string;         // sketch shows a [Subtitle] slot under the featured card
  year: number;
  instrumentation: Instrumentation;
  duration?: string;         // "12'30\""
  scoring?: string;          // "2.2.2.2 / 4.3.3.1 / timp / str"
  blurb: string;             // 1–2 sentences. Card + carousel + meta description.
  programNote?: string;      // long-form; plain string or paragraphs
  cover?: { src: string; alt: string; credit?: string };
  audio?: { src: string; label: string }[];
  score?: { src: string; label: string };
  premiere?: { ensemble?: string; conductor?: string; venue?: string; date: string };
  featured?: true;           // exactly one composition may set this
};

export const compositions: Composition[] = [ /* … */ ];
```

### `src/content/achievements.ts`

```ts
export type AchievementKind =
  | 'award' | 'commission' | 'premiere' | 'residency' | 'performance' | 'press';

export type Achievement = {
  id: string;
  year: number;
  kind: AchievementKind;
  title: string;
  organization?: string;
  detail?: string;
  href?: string;             // external link, opens in new tab
  compositionSlug?: string;  // cross-link into the catalog
};
```

### `src/content/site.ts`

Name, tagline, email, phone (if we keep the header phone icon), social links, SEO defaults, and the
About-page prose. One file for everything that isn't a list.

### `src/lib/compositions.ts` — derived selectors, single source of truth

```ts
export function getFeatured(): Composition   // throws at build if not exactly one `featured: true`
export function byYearDesc(): Composition[]
export function byInstrumentation(): Map<Instrumentation, Composition[]>
export function getBySlug(slug: string): Composition | undefined
export const allSlugs: string[]              // feeds generateStaticParams + sitemap
```

`getFeatured()` throwing is deliberate. The featured work is not a second list to keep in sync — it
is a flag on the catalog, and a build that has zero or two featured works should fail loudly rather
than render an empty hero.

### Adding a composition (the one-file edit)

1. Append an object to the `compositions` array in `src/content/compositions.ts`.
2. Drop cover art at `public/compositions/<slug>.jpg` (1:1, ≥1200px).

That's it. The catalog page, the carousel, `/compositions/<slug>`, the sitemap, and the "Related
works" links all pick it up. Promoting it to featured is moving one `featured: true` line.

### Why not MDX

MDX buys formatted long-form prose and costs a toolchain (`@next/mdx` + 3 packages), a
`pageExtensions` change, and per-file frontmatter that isn't type-checked without extra work. For
one-to-two-sentence blurbs and structured metadata, TS wins on every axis — especially "one-file,
low-ceremony edit," which MDX actively fights (one file per work, plus a loader).

If program notes later need real formatting: add `src/content/notes/<slug>.mdx`, wire `@next/mdx`,
and have the detail page render it when present. **Additive, not a rewrite** — which is why the
`programNote` field is optional from day one.

---

## 3. Component inventory

**Shell — shared by all five pages** (`src/components/shell/`)

| Component | Notes |
|---|---|
| `PageFrame` | The inset thin gold border enclosing the viewport. Pure CSS, no JS. |
| `SiteHeader` | Logo badge, wordmark + role, contact icons, `ThemeToggle`, mobile menu button. |
| `RailNav` | Desktop vertical right-edge nav, rotated tracked caps, active state from `usePathname`. |
| `MobileNav` | Full-screen overlay panel — the mockup's unresolved gap (§ Assumptions). |
| `ThemeToggle` | Client. The only interactive chrome. |
| `ThemeScript` | Server-rendered blocking inline script. See §4. |
| `SiteFooter` | **New** — the mockup has none. Copyright, email, socials. |

**UI primitives — shared** (`src/components/ui/`)

`GoldFrame` (the double-hairline frame, wraps images and cards), `Flourish` (inline SVG motif,
`currentColor`, decorative `aria-hidden`), `SectionHeading` (tracked caps + gold rule), `Prose`
(typography wrapper for bio/program notes), `MetaRow` (label/value pairs — year, duration, scoring),
`ExternalLink`.

**Landing only** (`src/components/landing/`)

`Hero` (photo + intro copy), `FeaturedCarousel` (client), `CarouselCard`, `FeaturedMeta`.

**Compositions** (`src/components/compositions/`)

`CompositionCard` (**shared** — used by the carousel, the index grid, and "Related works"),
`CompositionGrid`, `FilterBar` (client, only if we ship filtering), `AudioPlayer` (client, only if
audio exists), `ScoreLink`.

**Achievements / About / Contact**

`AchievementTimeline` + `AchievementItem` + `YearMarker`; `Portrait`, `CVDownload`; `ContactCard`,
`CopyEmailButton` (client), `SocialLinks`.

Everything is a Server Component unless listed as client. The complete client-JS surface is:
`ThemeToggle`, `MobileNav`, `FeaturedCarousel`, `CopyEmailButton`, and optionally `AudioPlayer` and
`FilterBar`. Nothing else ships JavaScript.

---

## 4. Theming

### The failure mode, named

**Flash of incorrect theme (FOIT/"theme flash").** Every page is prerendered to static HTML at build
time. That HTML is identical for everyone, so it must hard-code one theme — dark, our default. A
visitor who previously chose light mode gets navy HTML from the CDN, sees it painted, and only then
does JavaScript read `localStorage` and repaint white. On a fast connection it's a blink; on a slow
one it's a second of the wrong site.

Three tempting non-fixes, all wrong:

- **`useEffect`** — runs after hydration *and* after paint. Guarantees the flash rather than fixing it.
- **`useLayoutEffect`** — runs before paint but after hydration. Fixes the hydration→paint gap, not
  the HTML-arrives→React-loads gap. On slow connections the browser paints long before React exists.
- **Reading a cookie in the root layout via `cookies()`** — correct on the server, but it opts every
  route out of static prerendering. We'd trade a 200ms flash for a permanently dynamic site.

### The fix

A **blocking inline `<script>` in `<head>`**, rendered from the root layout via
`dangerouslySetInnerHTML`. The browser executes it synchronously while parsing the HTML — before the
first paint, before React loads, before any element is rendered. It reads `localStorage.theme` and
sets `data-theme` on `<html>`. By the time the browser paints anything, the attribute is correct.

```tsx
// src/app/layout.tsx (shape, not final code)
<html lang="en" data-theme="dark" suppressHydrationWarning data-scroll-behavior="smooth">
  <head>
    <script dangerouslySetInnerHTML={{ __html:
      `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`
    }} />
  </head>
```

Four details that are each load-bearing:

1. **`suppressHydrationWarning` on `<html>`.** The script mutates the DOM before React hydrates, so
   React finds an attribute the server didn't send. Without this, React treats it as a hydration
   error and re-renders the subtree from scratch — which throws away the correction and causes the
   exact flash we're preventing. With it, the DOM wins.
2. **`try/catch`.** `localStorage` throws in Safari private mode and under some cookie blockers. An
   uncaught throw in a blocking head script kills the rest of the parse.
3. **A `useLayoutEffect` re-apply inside `ThemeToggle`.** Documented Next 16 behavior: React Strict
   Mode remounts once in development and, on that remount, resets `<html>`/`<head>`/`<body>` to only
   the attributes it manages from JSX — wiping the one our script set. This is a no-op in production
   but without it dev is confusingly broken and someone "fixes" it wrongly.
4. **`color-scheme: dark | light`** on the token blocks, so native scrollbars, form controls, and the
   browser's own canvas match. Plus `<meta name="theme-color">` per scheme for mobile browser chrome.

**Storage: `localStorage`, not a cookie.** A cookie's only advantage is server readability, which we
just established we don't want. `localStorage` is one less thing sent on every request.

**Default: hard dark.** First visit is always dark, regardless of `prefers-color-scheme`. The design
is authored dark; light is a courtesy mode. A two-state toggle matching the mockup, not a three-state
system/light/dark cycle.

### Token architecture

`globals.css` only:

```css
@import "tailwindcss";

:root {                          /* dark — the default, no attribute needed */
  color-scheme: dark;
  --surface: #0b1a3a;  --surface-raised: #10224a;
  --ink: #f2f4f8;      --ink-muted: #a8b2c6;
  --gold: #c9a227;     --gold-hairline: #8a6f1e;
}
[data-theme="light"] {
  color-scheme: light;
  --surface: #f4f6fa;  --surface-raised: #ffffff;
  --ink: #0b1a3a;      --ink-muted: #4a5568;
  --gold: #8a6a12;     /* darkened — see contrast note */
  --gold-hairline: #b8952f;
}
@theme inline {
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-gold: var(--gold);
  /* … */
}
```

The `@theme inline` indirection is the whole point: it generates `bg-surface`, `text-ink`,
`border-gold` etc. as utilities that resolve through a CSS variable. One class per element, correct
in both themes, zero `dark:` variants in component code. Swapping the palette later touches one file.

**Contrast risk, flagged now:** the mockup's gold (~`#C9A227`) reads beautifully on navy (~8:1) and
**fails WCAG AA badly on the light-mode near-white background** (~2.4:1). Light mode therefore needs
a materially darker gold for anything that carries meaning — body text, links, nav labels. Hairline
borders and the decorative flourish are exempt (non-text). This is why `--gold` and `--gold-hairline`
are separate tokens rather than one value with opacity.

---

## 5. Composition carousel

### Interaction model

A horizontally scroll-snapping track is the **source of truth**, not React state.

```
<div class="track">   overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding:center
  <a class="card">    scroll-snap-align:center     ← each card is a real link to /compositions/<slug>
```

- Prev/Next are real `<button>`s calling `scrollIntoView()` on the neighboring card.
- Active index is *derived* from an `IntersectionObserver` on the track — used only to update the
  title/blurb below and the dot indicators, never to position anything.
- The coverflow depth (side cards scaled down, dimmed, slightly rotated) comes from CSS
  scroll-driven animations (`animation-timeline: view(x)`). Where unsupported, the cards render as a
  flat, evenly-sized scrolling row — degraded, still correct, still usable.
- **No autoplay.** Ever. It's an accessibility liability and this is a five-item catalog, not a
  billboard.

Why this over an index-state + `transform` implementation: touch drag, momentum, trackpad scrolling,
scroll anchoring, and "focus a card and the browser scrolls it into view" all come free from the
browser. The transform approach means reimplementing every one of them, badly.

### Keyboard

- Cards are `<a>` elements, so Tab reaches every one in DOM order and Enter opens it. Focusing an
  off-screen card scrolls it into view automatically — no focus trap, no `aria-hidden` on focusable
  content (the single most common carousel a11y bug).
- ←/→ on the focused track moves one card.
- Prev/Next buttons are real buttons with `aria-label`s and a `disabled` state at the ends.
- Wrapper carries `role="group"` + `aria-roledescription="carousel"` +
  `aria-label="Featured compositions"`. The title/blurb region below is `aria-live="polite"` so the
  change is announced when the active card changes.

### Reduced motion

`@media (prefers-reduced-motion: reduce)`: scroll-driven depth animations off (flat row),
`scrollIntoView` uses `behavior: 'auto'` instead of `'smooth'`, all transitions ≤ 0ms.

### Mobile / no-JS

Mobile: same track, one card centered with the neighbours peeking at the edges, snap unchanged.
Chevrons stay (smaller) plus dot indicators — the mockup drops them, but on a touch device with no
visible affordance most users never discover the track scrolls. With JS disabled: a plain horizontal
scrolling row of links. Fully functional. This is the strongest argument for the scroll-snap
approach — the transform version renders one card and nothing else.

---

## 6. File structure

```
src/
  app/
    layout.tsx                    # PageFrame + header + rail + footer + ThemeScript
    page.tsx                      # landing
    globals.css                   # tokens + @theme + base
    about/page.tsx
    compositions/page.tsx
    compositions/[slug]/page.tsx  # generateStaticParams + generateMetadata (await params!)
    achievements/page.tsx
    contact/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
    icon.svg                      # from the ZC mark
    opengraph-image.tsx
  components/
    shell/     PageFrame  SiteHeader  RailNav  MobileNav  ThemeToggle  ThemeScript  SiteFooter
    ui/        GoldFrame  Flourish  SectionHeading  Prose  MetaRow  ExternalLink
    landing/   Hero  FeaturedCarousel  CarouselCard  FeaturedMeta
    compositions/  CompositionCard  CompositionGrid  FilterBar  AudioPlayer  ScoreLink
    achievements/  AchievementTimeline  AchievementItem
    contact/   ContactCard  CopyEmailButton  SocialLinks
  content/
    site.ts  compositions.ts  achievements.ts
  lib/
    compositions.ts   # selectors
    theme.ts          # storage key, script source, toggle logic
public/
  brand/     logo.svg  flourish.svg
  media/     portrait.jpg
  compositions/  <slug>.jpg
  audio/     <slug>.mp3        # only if audio is in scope — see §9
  cv.pdf
```

---

## 7. Build phases

Each phase is verifiable on its own and unblocks the next. Do not start N+1 until N verifies.

**0 — Clear the scaffold.** Commit the untracked scaffold as a baseline first. Delete
`public/*.svg`, the demo `page.tsx` body, the Geist fonts, the scaffold `globals.css`. Set real
`metadata` in the root layout. Add `.gitignore` entries for `.next`, `out`, `node_modules`.
*Verify:* `npm run build` succeeds, `/` renders a blank framed page.

**1 — Tokens + theming + shell.** `globals.css` tokens, `PageFrame`, `SiteHeader`, `ThemeScript`,
`ThemeToggle`, `RailNav`, `MobileNav`, `SiteFooter`, fonts via `next/font`.
*Verify:* toggle switches; **set light, hard-refresh with DevTools throttled to Slow 3G — no navy
flash**; toggle survives a client-side nav between two stub routes; no hydration warning in console;
`data-theme` still applied after a dev-mode Strict Mode remount.

**2 — Content layer.** Types, selectors, 5–6 placeholder compositions and ~8 achievements. Real
structure, obviously-fake strings.
*Verify:* `npx tsc --noEmit` clean; `getFeatured()` throws when the flag is removed.

**3 — Landing, static.** Hero photo frame, intro copy, flourish placeholder, featured work as a
plain static card. No carousel yet.
*Verify:* side-by-side against the mockup at 1440px and 390px, both themes. Rail nav collapses
correctly at the breakpoint.

**4 — Carousel.** Replace the static featured card.
*Verify:* the full matrix — mouse, touch (real device), keyboard-only, screen reader, JS disabled,
`prefers-reduced-motion: reduce`, and a browser without scroll-driven animation support.

**5 — Inner pages,** in this order: compositions index → `[slug]` detail → achievements → about →
contact. Detail page first among the two composition routes so the card component settles before
it's reused in three places.
*Verify:* every nav item and every card links somewhere real; no 404s; `generateStaticParams`
produces one page per slug in the build output.

**6 — Real assets.** Swap in logo, flourish, portrait, cover art (§8). Set `sizes` and `priority`
correctly on `next/image`.
*Verify:* Lighthouse performance ≥ 95 on the landing page; no CLS from images.

**7 — Metadata + SEO.** Per-page `generateMetadata`, OG images, `sitemap.ts`, `robots.ts`,
`not-found.tsx`, JSON-LD (`Person` + `MusicComposition`).
*Verify:* OG preview renders in a debugger; sitemap lists all routes including every slug.

**8 — A11y + polish.** axe clean, visible gold focus rings on navy *and* on white, contrast audit of
every gold-on-light pairing, `prefers-reduced-motion` honored everywhere, real `alt` text.
*Verify:* keyboard-only walk of all five pages in both themes; axe reports zero violations.

**9 — Hosting decision, then deploy.** See §9.

---

## 8. Assets needed — exact formats

Nothing below is assumed to exist. Each blocks the phase noted.

| Asset | Format | Blocks |
|---|---|---|
| ZC logo mark | **SVG**, square viewBox, paths not text, no embedded raster, single color so it can inherit `currentColor`. Plus one 512×512 PNG for icons. | 6, 7 |
| Flourish motif | **SVG**, transparent, tall viewBox (~1:3), **strokes not filled outlines** — strokes can be recolored per theme and animated with `stroke-dasharray` later. | 6 |
| Portrait | Original JPEG, ≥2000px long edge, unretouched. Plus photographer credit + web-use permission. | 6 |
| Cover art, per composition | JPEG/WebP, **1:1**, ≥1200px, consistent treatment across the set. | 6 |
| Audio | MP3 128–192 kbps. **Confirm recording rights** — performer/ensemble rights are separate from the composer's. | 5 (only if in scope) |
| Scores | PDF (watermark if perusal-only) + a first-page JPEG thumbnail. | 5 (only if in scope) |
| Display font | If a licensed brand face exists: `.woff2` + a license permitting web embedding. Otherwise default to **Cormorant Garamond** (display) + **Inter** (UI/body) via `next/font/google`, self-hosted at build, no request to Google at runtime. Cinzel is the alternative if the wordmark should read more engraved/Trajan. | 1 |
| CV | PDF | 5 |

Until each arrives: a CSS-drawn monogram for the logo, a hand-drawn placeholder SVG for the
flourish, and neutral navy gradient cards with the title set in the display face for cover art.
Every one is a file swap, no code change.

---

## 9. Deployment: the Vercel Hobby problem

**Where this lands: genuinely on the wrong side of the line, probably.** Vercel's Hobby tier is
restricted to non-commercial use, and their guidance treats "promoting a business or professional
services" as commercial. A composer's portfolio whose contact page solicits commissions is
advertising professional services. It is not a blog. I would not ship it on Hobby and hope.

Verify current terms and pricing before choosing — the numbers below move.

| Option | Fit | Cost of switching |
|---|---|---|
| **Vercel Pro** | Zero friction, everything works, first-party Next support | ~$20/user/mo. Just money. |
| **Cloudflare Pages/Workers** | Free tier permits commercial use | Needs `@opennextjs/cloudflare`; a real adapter and a real support surface. |
| **Netlify** | Free tier permits commercial use, official Next runtime | Low, but another runtime to debug. |
| **`output: 'export'` → any static host** (Cloudflare Pages, GitHub Pages, S3+CloudFront) | Cheapest, most portable, most durable | One config line **because of Amendment 1**. Loses `next/image` optimization (`images.unoptimized: true` + pre-sized assets) and any server feature. |

**Recommendation:** build under the Amendment 1 constraint so the static-export door stays open,
then at phase 9 pick between Vercel Pro (pay $20/mo, keep image optimization, zero migration work)
and static export on Cloudflare Pages (free, commercial-safe, costs a morning of image tuning).
Deferring costs nothing *only because* we never take a server dependency. That's the point of the
constraint.

**Also decide before deploy:** custom domain and registrar, whether analytics is wanted (if so,
prefer a cookieless one — no consent banner), and whether `robots.txt` should allow AI crawlers.

---

## 10. Hardest-to-reverse decisions

Ranked by cost of being wrong.

1. **URL shape for compositions.** `/compositions/<slug>` flat vs
   `/compositions/<category>/<slug>`. Once a link is shared or indexed, changing it means
   permanent redirects — which a static export cannot serve without host-specific config.
   *Default: flat, with category as a filter facet on the index.* Reversible only with pain.
2. **Slug scheme.** `symphony-no-1` vs `symphony-no-1-2024`. Same permanence problem. *Default:
   title-derived, no year* — a work's year doesn't change but a title-only slug reads better and
   survives a re-dating.
3. **Committing audio to git.** A few MB is fine. 200MB of MP3s is in the history forever and every
   future clone pays for it; removing it requires rewriting history. *Default: no audio in v1.* If
   audio ships, cap the repo contribution at ~25MB and host anything larger externally.
4. **Hosting + domain.** DNS, terms, and email forwarding all follow from it. Deferred to phase 9 by
   design (§9).
5. **The theming token architecture.** Every component references these token names. Renaming
   `--surface` to `--bg` in month three is a find-and-replace across the whole codebase. Worth 20
   minutes of naming care in phase 1.
6. **Light-mode gold.** Fixing the contrast failure after the site is built means re-auditing every
   gold element. Settle both gold tokens in phase 1, against real text, with a contrast checker.
7. **TS data vs MDX.** Listed last deliberately: it *looks* like the big architectural fork and
   isn't. The `programNote` field is optional from day one specifically so MDX can be added later as
   a per-work opt-in without touching the other 95% of the content layer.

---

## 11. Assumptions this plan is built on

These are the STEP 3 defaults, taken as answered. Each is cheap to change **now** and expensive
later.

- **Mobile nav** (the mockup's explicit gap — it shows no nav at all on mobile): a hamburger button
  in the header opens a **full-screen overlay panel** with the four items stacked in the same
  tracked-caps treatment, navy scrim, gold hairline, close button, focus trapped while open, Esc to
  close, body scroll locked. Chosen over a bottom tab bar (reads as an app, off-brand) and a
  horizontal scrolling strip (four long labels don't fit at 390px). Breakpoint: rail below `lg`
  → overlay.
- **The landing page scrolls.** It's a hero section plus the featured carousel, not a locked
  single-screen. A fixed-height hero breaks on short laptop viewports and any zoom above 125%.
- **The rail nav links to five real routes**, not to anchors on one long page — your framing
  ("none of those pages are designed") settles this.
- **No compositions dropdown in the nav**, despite the `Compositions ˅` caret in the hand sketch.
  Category becomes a filter on the index page instead. A hover dropdown is a mobile and keyboard
  liability for four-to-six categories.
- **The hand sketch's intro text block** (next to the portrait, dropped by the AI render) is real
  design intent and comes back: a 2–3 sentence intro beside the photo, with a link to About.
- **No audio, no score PDFs in v1.** Both are additive (`audio`/`score` are optional fields).
- **Contact = `mailto:` + copy-to-clipboard**, no posted form.
- **"Crawford Symphonies"** (circled in the sketch) is treated as decorative label text on the
  flourish, not a separate brand entity or route.
- **The header phone icon is dropped**, kept only if a real published number exists.
- **A footer is added.** The mockup has none; the page needs a terminal edge and a copyright line.

---

## 12. Verification, end to end

Run before calling it done:

```bash
npx tsc --noEmit          # types clean
npm run lint              # eslint flat config (next build no longer lints in v16)
npm run build             # all 5 routes + every /compositions/<slug> prerendered as static
npm start                 # serve the production build
```

Then, manually against `npm start`:

1. **Theme flash** — set light, DevTools → Network → Slow 3G, hard refresh. Zero navy frames. Repeat
   on an inner page. This is the one bug that only appears in a throttled production build.
2. **Keyboard-only** — Tab through all five pages in both themes. Visible focus ring everywhere,
   logical order, carousel reachable and operable, mobile overlay traps and releases focus correctly.
3. **No-JS** — disable JavaScript. All five pages render, all links work, the carousel is a
   horizontally scrolling row.
4. **Reduced motion** — enable at OS level. No smooth scroll, no depth animation, no transitions.
5. **Responsive** — 390 / 768 / 1024 / 1440 / 1920. Rail→overlay swap is clean at the breakpoint.
6. **Content edit loop** — add a composition per §2, confirm it appears on the index, gets its own
   page, lands in the sitemap, and that flipping `featured` moves the landing-page hero.
7. **axe DevTools** — zero violations on all five pages, both themes.
8. **Lighthouse** — performance ≥ 95, accessibility 100 on the landing page.
