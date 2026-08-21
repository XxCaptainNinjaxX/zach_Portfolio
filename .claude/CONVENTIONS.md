# CONVENTIONS — target structure

Derived from the my-portfolio audit, translated to Next.js 15 App Router.
This is the spec phases 2 and 3 build against. Where the portfolio's actual
practice was flagged as drift or an anti-pattern in its own audit, this file
takes the corrected version, not the observed one.

**Precedence:** this file wins over anything observed in either codebase.
Conflicts get surfaced out loud, not silently resolved.

---

## 1. Routing — non-negotiable, framework-imposed

Next 15 App Router. `src/app` is the routing root and does not move or get
renamed. `src/pages` is reserved by the Pages Router — creating it produces
hybrid mode and a duplicate-`/` error.

Route folder names ARE the URL segment. They are lowercase, always, and this
overrides the PascalCase folder rule in §2.

```
src/app/
  page.tsx              → /
  about/page.tsx        → /about
  compositions/page.tsx → /compositions
  achievements/page.tsx → /achievements
```

`page.tsx` is a required filename. It cannot be `Home.tsx`.

**Entry pattern** — keeps portfolio naming while satisfying the framework:
`page.tsx` is thin. It exports `metadata` and renders one named component.

```tsx
// src/app/compositions/page.tsx
import type { Metadata } from "next";
import Compositions from "./components/Compositions";

export const metadata: Metadata = { title: "Compositions" };

export default function Page() {
  return <Compositions />;
}
```

The real page component is `Compositions.tsx` — PascalCase, named for the
page, exactly as the portfolio does it. `page.tsx` is a routing adapter, not
a component.

---

## 2. Naming

| Thing                | Rule                                             | Example                        |
| -------------------- | ------------------------------------------------ | ------------------------------ |
| Route folders        | lowercase (URL segment — §1 overrides)           | `compositions/`                |
| Component folders    | PascalCase                                       | `Card/`, `SiteHeader/`         |
| Component files      | PascalCase, matches the exported function        | `Card/Card.tsx`                |
| CSS Modules          | matches its component                            | `Card.module.css`              |
| Data file            | lowercase                                        | `components/data/data.ts`      |
| Exported data consts | camelCase plural nouns                           | `compositions`, `achievements` |
| Props interfaces     | `<Name>Props` — PascalCase, plural, **always**   | `CardProps`                    |
| CSS class names      | camelCase (Modules require valid JS identifiers) | `.cardImage`                   |

Two corrections to observed portfolio practice:

- **Props naming.** The portfolio has `cardProp`, `HeaderProp`, `HeaderProps`,
  and `ModalProps` coexisting. One rule now: `<Name>Props`.
- **CSS class casing.** The portfolio uses kebab-case (`.course-image`). CSS
  Modules access classes as `styles.courseImage`, and kebab-case forces
  `styles["course-image"]`. camelCase throughout.

`components/data/` is lowercase by explicit decision, not drift. It holds data,
not a component.

---

## 3. Page anatomy

Each route folder contains its page component, its subcomponents, its
stylesheet, and its hooks if any.

```
src/app/compositions/
  components/
    Compositions.tsx          ← the page component; composes the rest
    Compositions.module.css
    CompositionBrowser.tsx
    CompositionBrowser.module.css
    CompositionCard.tsx
    CompositionCard.module.css
  hooks/                      ← only if the page has any
  page.tsx                    ← metadata + renders <Compositions />
```

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

```
src/components/
  SiteHeader/
  SiteFooter/
  MenuDrawer/
  ThemeToggle/
  ThemeScript/
  data/data.ts
  ui/            ← Divider, ExternalLink, Prose, SectionHeading, etc.
```

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

Three layers, and the layer is decided by consumer count:

| Layer         | File                           | Owns                                                                    |
| ------------- | ------------------------------ | ----------------------------------------------------------------------- |
| Global        | `src/app/globals.css`          | resets, `:root` tokens, base type, theme attribute rules                |
| Shared-subset | `src/app/subpage.module.css`   | page title, grid layouts, intro block — imported by the non-home routes |
| Local         | `X.module.css` next to `X.tsx` | that component only                                                     |

`subpage.module.css` is the direct port of `SubPage.css` — `/about`,
`/compositions`, `/achievements` share a page-title style, grid layouts, and
an intro paragraph block, exactly as the portfolio's four non-Home pages do.

**Only `globals.css` may declare `:root`.** The portfolio copy-pastes the
same `--mainColor` block into four separate files; §8 calls this the top item
worth dropping. One declaration, imported once in `layout.tsx`.

---

## 6. Design tokens

The portfolio has no token layer — every spacing, radius, and breakpoint
value is a per-file one-off, and its audit calls this "the one convention
actively worth _not_ repeating." Since Tailwind is being removed and its
scale goes with it, tokens get built rather than ported.

Declared once, in `globals.css`, under `:root`:

- **Color** — semantic names, not literal ones. `--color-bg`,
  `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`,
  `--color-border`. Semantic naming is what makes the dark/light swap a
  single override block instead of a find-and-replace.
- **Spacing** — one scale, ~6 steps. `--space-1` … `--space-6`.
- **Type** — `--text-sm` … `--text-3xl`, plus `--font-sans` / `--font-serif`.
- **Radius** — 3 steps max. `--radius-sm`, `--radius-md`, `--radius-lg`.
- **Layout** — `--content-width`, `--header-height`.

**Breakpoints are NOT custom properties.** `@media (min-width: var(--bp-md))`
does not work — media query conditions are evaluated before custom properties
resolve, and it fails silently rather than erroring. Breakpoints are a
documented constant list, written literally at each use site:

```
640px   /* sm */
900px   /* md */
1100px  /* lg */
```

Three values, used verbatim. No fourth without a stated reason.

**Theme:** dark is the default. `globals.css` declares dark values in
`:root` and overrides light under a single `[data-theme="light"]` block.
The existing `ThemeScript` mechanism stays exactly as-is — do not rewrite it
during the Tailwind removal; it exists to prevent flash-of-wrong-theme and it
is load-bearing.

---

## 7. Data layer

One file: `src/components/data/data.ts`. Types plus arrays. No functions, no
sorting, no filtering, no throws.

Two corrections to observed portfolio practice, both from its own §8:

- **Every array is typed.** The portfolio declares no interface for its data
  entries, so a missing `desc` or a typo'd key compiles silently. Here,
  `Composition` and `Achievement` are declared and exported, and every array
  is annotated.
- **Preview subsets are derived, never duplicated.** The portfolio hand-copies
  Home-page previews (`projectsHome`, `musicianHome`) as literal duplicates of
  the full arrays — edit one, the other goes stale. Any home-page subset here
  is a `.slice()` or `.filter()` in `src/lib/`, not a second array.

`src/lib/compositions.ts` and `src/lib/achievements.ts` stay. They hold the
derived views — `getFeatured()`, `carouselOrder()`, `groupedByYear()`,
`byType()`, `getRelated()`. This is a capability the portfolio doesn't have
and it is not getting flattened away.

**Access rule:** nothing outside `src/lib/` imports the raw arrays.
Components read through lib functions. The portfolio's direct
`import { currentCourse }` + `.map()` in the page is the pattern being
replaced, not copied.

---

## 8. Composition

```
src/app/layout.tsx
  <html data-theme>
    <ThemeScript />          ← runs pre-paint, sets the attribute
    <body>
      <SiteHeader />         ← persists across routes
      <MenuDrawer />
      <main>{children}</main>  ← only this swaps
      <SiteFooter />
```

`layout.tsx` is the App Router equivalent of the portfolio's `App.tsx`:
chrome mounted as a sibling of the routed content, so nav state survives
navigation. Portfolio needed `<ScrollToTop />` as a route-change effect
component; App Router scrolls to top on navigation by default, so it's not
ported.

No route-level `lazy()` — static export, everything is prerendered.
Add `src/app/not-found.tsx`; the portfolio has no 404 and unmatched paths
render an empty `<main>`.

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
