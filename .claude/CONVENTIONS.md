# CONVENTIONS — target structure

Derived from the my-portfolio audit, translated to Next.js 15 App Router.
This is the spec the restructure phases build against. Where the portfolio's
actual practice was flagged as drift or an anti-pattern in its own audit, this
file takes the corrected version, not the observed one.

**Precedence:** this file wins over anything observed in either codebase.
Conflicts get surfaced out loud, not silently resolved.

**Status:** phases 1 (data layer) and 2 (structure) are complete and this file
has been corrected against the resulting tree. Phase 3 (Tailwind removal) is
the only phase still pending — §5 and §6 are the sections it builds against.

---

## 1. Routing — non-negotiable, framework-imposed

Next 15 App Router. `src/app` is the routing root and does not move or get
renamed. `src/pages` is reserved by the Pages Router — creating it produces
hybrid mode and a duplicate-`/` error.

Route folder names ARE the URL segment. They are lowercase, always, and this
overrides the PascalCase folder rule in §2.

```
src/app/
  page.tsx                       → /
  about/page.tsx                 → /about
  compositions/page.tsx          → /compositions
  compositions/[slug]/page.tsx   → /compositions/:slug
  achievements/page.tsx          → /achievements
```

`page.tsx` is a required filename. It cannot be `Home.tsx`.

**Entry pattern** — keeps portfolio naming while satisfying the framework:
`page.tsx` is thin. It holds `metadata` / `generateMetadata`,
`generateStaticParams` where applicable, and a default export rendering one
named component.

```tsx
// src/app/compositions/page.tsx
import type { Metadata } from "next";
import { Compositions } from "@/app/compositions/components/Compositions";

export const metadata: Metadata = { title: "Compositions" };

export default function Page() {
  return <Compositions />;
}
```

**Named exports, not default**, for every component — this matches all 20+
existing components in the repo. **`@/` alias, not relative imports**, for
every cross-file import including page → its own components.

The real page component is `Compositions.tsx` — PascalCase, named for the
page, exactly as the portfolio does it. `page.tsx` is a routing adapter, not
a component. `src/app/page.tsx` currently exports no `metadata`; that's fine,
the root layout supplies it.

---

## 2. Naming

| Thing                | Rule                                             | Example                        |
| -------------------- | ------------------------------------------------ | ------------------------------ |
| Route folders        | lowercase (URL segment — §1 overrides)           | `compositions/`                |
| Component folders    | PascalCase                                       | `SiteHeader/`                  |
| Component files      | PascalCase, matches the exported function        | `SiteHeader/SiteHeader.tsx`    |
| CSS Modules          | matches its component                            | `SiteHeader.module.css`        |
| Data files           | lowercase                                        | `components/data/data.ts`      |
| Exported data consts | camelCase plural nouns                           | `compositions`, `achievements` |
| Props interfaces     | `<Name>Props` — PascalCase, plural, **always**   | `CompositionCardProps`         |
| CSS class names      | camelCase (Modules require valid JS identifiers) | `.cardImage`                   |

Two corrections to observed portfolio practice:

- **Props naming.** The portfolio has `cardProp`, `HeaderProp`, `HeaderProps`,
  and `ModalProps` coexisting. One rule now: `<Name>Props`.
- **CSS class casing.** The portfolio uses kebab-case (`.course-image`). CSS
  Modules access classes as `styles.courseImage`, and kebab-case forces
  `styles["course-image"]`. camelCase throughout.

`components/data/` is lowercase by explicit decision, not drift. It holds data,
not a component.

**Folder-per-component applies to `src/components/` only.** Inside a route's
`components/` folder, files sit flat — the route folder is already the
grouping. `src/components/ui/` also stays flat; those are small primitives,
not standalone units.

---

## 3. Page anatomy

Each route folder contains its page component, its subcomponents, its
stylesheets, and its hooks if any.

```
src/app/compositions/
  page.tsx                        ← metadata + renders <Compositions />
  components/
    Compositions.tsx              ← the page component; composes the rest
    Compositions.module.css
    CompositionBrowser.tsx
    CompositionBrowser.module.css
  hooks/                          ← only if the route has any
```

`CompositionCard` and `CompositionCover` are **not** here — both are consumed
by two or more routes and live in `src/components/`. Consumer count decides
placement, not topical similarity.

**This departs from the portfolio deliberately.** The portfolio puts every
page's full markup in one `<Page>.tsx` with zero page-local subcomponents.
That works there because those pages are a header plus a grid of `Card`s. It
does not work here — the coverflow carousel and the filtered composition
browser are real components with their own state, and inlining them produces
a 400-line page file.

Rule: **a component used by exactly one route lives in that route's
`components/` folder.** No exceptions for "might reuse it later" — the
portfolio's `Waves` and `Reveal` sit in `src/components/` while being
imported only by `Home.tsx`, and that reservation never paid off.

---

## 4. Shared components

`src/components/` holds a component only when it meets one of two tests:

1. **Imported by 2+ routes.** Real import statements, not intent.
2. **Mounted by the root layout**, regardless of reuse count — site chrome
   that persists across route changes.

Current membership, post-phase-2:

```
src/components/
  CompositionCard/     ← test 1: /compositions, /compositions/[slug]
  CompositionCover/    ← test 1: /, /compositions, /compositions/[slug]
  MenuDrawer/          ← test 2, via SiteHeader
  PageFrame/           ← test 2
  SiteFooter/          ← test 2
  SiteHeader/          ← test 2
  ThemeScript/         ← test 2
  ThemeToggle/         ← test 2, via SiteHeader
  data/                ← data.ts, site.ts
  ui/                  ← Divider, ExternalLink, Flourish, Logo, Portrait,
                         SectionHeading, icons — flat, no folder-per-file
```

`Prose` is **not** in `ui/` — it is consumed only by `/about` and lives at
`src/app/about/components/Prose.tsx`. Same for `MetaRow`, which is page-local
to `/compositions/[slug]`.

Test 2 is what the portfolio's `App.tsx`-mounted singletons satisfy
(`Header`, `ScrollBlur`, `ScrollToTop`, `Preloader`). In App Router the
equivalent host is `src/app/layout.tsx` — chrome is a sibling of
`{children}`, not a wrapper each page imports. Same pattern, different file.

Anything failing both tests moves to the route folder that uses it.

---

## 5. CSS architecture

**CSS Modules, co-located, one per component.** Not plain global `.css`.

The portfolio uses plain `.css` with global class names and hand-prefixed
collision avoidance. Its own audit §4 records that this has "no build-level
enforcement — it's discipline only," and §8 records the drift it produced.
Next supports Modules natively with zero config. Taking the enforced version.

Two layers that definitely exist, one that's conditional:

| Layer  | File                           | Owns                                                                                                          |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Global | `src/app/globals.css`          | resets, `:root` tokens, `[data-theme]` rules, base type, genuinely global utilities, the theme-transition CSS |
| Local  | `X.module.css` next to `X.tsx` | that component only                                                                                           |

**Conditional shared-subset layer.** The portfolio has `SubPage.css`, shared
by its four non-Home pages for a page title, grid layouts, and an intro block.
Create the equivalent — `src/app/subpage.module.css` — **only if the same rule
genuinely repeats across two or more route page components** during phase 3.
Do not create it speculatively. If it isn't earning its place, three
duplicated declarations are cheaper than a shared file nobody can safely edit.

**Only `globals.css` may declare `:root`.** The portfolio copy-pastes the
same `--mainColor` block into four separate files; §8 calls this the top item
worth dropping. One declaration, imported once in `layout.tsx`.

**Already hand-written CSS in `globals.css` gets ported, not rewritten.**
`.tracked-caps`, `.tracked-caps-tight`, `.gold-frame`, `.gold-frame-strong`,
`.surface-glow`, `.coverflow-track`, `.coverflow-card`, `.scrollbar-none`, and
the theme cross-fade / View Transitions block are plain CSS, not Tailwind
output. Component-specific ones move into that component's module and become
camelCase. Genuinely global ones stay global. Declarations are preserved
byte-for-byte either way.

---

## 6. Design tokens

**The color and font tokens already exist and are not Tailwind's.** They are
custom properties on `:root` in `globals.css`; the `@theme inline` block only
binds them to utility names. Removing Tailwind removes the bindings, not the
properties.

**Keep every one of these, with its exact name and value:**

```
--color-surface          --color-ink            --font-display
--color-surface-raised   --color-ink-muted      --font-sans
--color-surface-sunken   --color-gold           --overlay-scrim
                         --color-gold-hairline
                         --color-gold-strong
```

Do not rename them to a "cleaner" semantic scheme. They are already semantic,
they are already correct, and every one is referenced in the
`[data-theme="light"]` override block — which also stays exactly as written.

**What's actually missing** is everything Tailwind's default scale was
supplying implicitly. These get built during phase 3, declared once in
`globals.css` under the same `:root`:

- **Spacing** — one scale, ~6 steps. `--space-1` … `--space-6`. Derived from
  the `p-`/`m-`/`gap-` classes this repo actually uses, not Tailwind's
  30-step default.
- **Type** — a scale derived from the `text-*` classes actually in use.
- **Radius** — 3 steps max. `--radius-sm`, `--radius-md`, `--radius-lg`.
- **Layout** — `--content-width`, `--header-height`.

Naming pattern for new tokens matches the existing ones: lowercase, hyphenated,
category prefix first.

**Breakpoints are NOT custom properties.** `@media (min-width: var(--bp-md))`
does not work — media query conditions are evaluated before custom properties
resolve, and it fails silently rather than erroring. Breakpoints are a
documented constant list, written literally at each use site.

The set is **derived from the `sm:`/`md:`/`lg:` classes actually in use** and
recorded here once phase 3's token gate establishes it. Three values. No
fourth without a stated reason.

**Theme:** dark is the default; `<html>` is server-rendered with
`data-theme="dark"`. `globals.css` declares dark values in `:root` and
overrides light under a single `[data-theme="light"]` block.

`src/lib/theme.ts` and `src/components/ThemeScript/` are **load-bearing and
off-limits** for their attribute/storage-key mechanics. The inline pre-paint
script prevents flash-of-wrong-theme; the View Transitions circular wipe
depends on the exact attribute name. Phase 3 may change which CSS variables
they read. It may not change how or when they run.

**Exception, reversing the motion guidance above:** the wipe and its CSS
cross-fade fallback deliberately ignore `prefers-reduced-motion` as of a
later decision — they always animate, matching the same choice made for
FeaturedImageRotator, the theme toggle's knob, MenuDrawer, and
FeaturedCarousel. Everything else about how/when they run stays off-limits.

---

## 7. Data layer

`src/components/data/` holds two files:

- `data.ts` — types, unions, label maps, and the two arrays. No functions, no
  sorting, no filtering, no throws.
- `site.ts` — site-level metadata constants.

Field names, unions, and doc comments carried over from `src/content/` verbatim
in phase 1. `Composition` keeps `instrumentation`, `blurb`, `cover`, `featured`.
`Achievement` keeps `kind`, `organization`, `detail`, `href`. Both unions keep
all six members. **No renames.**

Label maps (`instrumentationLabels`, `achievementKindLabels`) live in `data.ts`
next to their unions, not in `lib/` — they're raw mappings, not derived views.

Two corrections to observed portfolio practice, both from its own §8:

- **Every array is typed.** The portfolio declares no interface for its data
  entries, so a missing field or a typo'd key compiles silently.
- **Preview subsets are derived, never duplicated.** The portfolio hand-copies
  Home-page previews as literal duplicates of the full arrays — edit one, the
  other goes stale. Any subset here is a function in `src/lib/`, not a second
  array.

`src/lib/compositions.ts` and `src/lib/achievements.ts` hold the derived
views — `getFeatured()`, `byYearDesc()`, `carouselOrder()`,
`usedInstrumentations()`, `getBySlug()`, `getRelated()`, `allSlugs`,
`byInstrumentation()`, `groupedByYear()`, `usedKinds()`,
`getByCompositionSlug()`. `getFeatured()` throwing when the flagged count
isn't exactly 1 is intentional and stays.

**Access rule:** nothing outside `src/lib/` imports the raw arrays.
Components read through lib functions.

---

## 8. Composition

```
src/app/layout.tsx
  <html data-theme="dark" suppressHydrationWarning>
    <head>
      <ThemeScript />            ← inline, runs pre-paint
    <body>
      <PageFrame>
        <SiteHeader />           ← persists across routes; mounts MenuDrawer
                                   and ThemeToggle as children
        <main>{children}</main>  ← only this swaps
        <SiteFooter />
```

`layout.tsx` is the App Router equivalent of the portfolio's `App.tsx`:
chrome mounted as a sibling of the routed content, so nav state survives
navigation. Portfolio needed `<ScrollToTop />` as a route-change effect
component; App Router scrolls to top on navigation by default, so it's not
ported.

`src/app/not-found.tsx` exists. So do `opengraph-image.tsx`, `robots.ts`, and
`sitemap.ts` — all three are route handlers, not components, and none of them
move.

⚠️ **This is not a static export.** `next.config.ts` is an empty config —
there is no `output: "export"`. Routes are statically pre-rendered under
normal Next output, which is not the same thing. Don't reason about this
project as if it were `next export`.

`opengraph-image.tsx` uses `ImageResponse` (Satori), which does not support
CSS Modules, external stylesheets, or CSS custom properties. It needs inline
style objects with literal values.

---

## 9. Not ported

Listed so nobody helpfully reintroduces them:

- `--mainColor` redeclared across four stylesheets
- Escape-to-close keyboard logic implemented twice in two components
- Hand-duplicated preview arrays
- Untyped data object literals
- Dead code retained in place (`CursorToggle.tsx`, placeholder arrays paired
  with commented-out JSX)
- Ad-hoc per-file breakpoint values
- Mixed props-interface naming
