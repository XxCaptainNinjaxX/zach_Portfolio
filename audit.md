# Codebase Audit — restructure branch

## 1. Routes

| URL path | Defining file | Static / Dynamic |
|---|---|---|
| `/` | [src/app/page.tsx](src/app/page.tsx) | Static (no params, no dynamic APIs) |
| `/about` | [src/app/about/page.tsx](src/app/about/page.tsx) | Static |
| `/achievements` | [src/app/achievements/page.tsx](src/app/achievements/page.tsx) | Static |
| `/compositions` | [src/app/compositions/page.tsx](src/app/compositions/page.tsx) | Static |
| `/compositions/[slug]` | [src/app/compositions/[slug]/page.tsx](src/app/compositions/[slug]/page.tsx) | Dynamic segment, statically **pre-rendered per slug** at build time |
| `/opengraph-image` (per-route OG image) | [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx) | Static (`ImageResponse`, no params) |
| `/robots.txt` | [src/app/robots.ts](src/app/robots.ts) | Static |
| `/sitemap.xml` | [src/app/sitemap.ts](src/app/sitemap.ts) | Static |
| 404 fallback | [src/app/not-found.tsx](src/app/not-found.tsx) | Static |

Root layout ([src/app/layout.tsx](src/app/layout.tsx)) wraps every route above.

**`src/app/compositions/[slug]/page.tsx` exists: YES.**
It exports `generateStaticParams()` ([src/app/compositions/[slug]/page.tsx:18-20](src/app/compositions/[slug]/page.tsx#L18-L20)):
```ts
export function generateStaticParams(): { slug: string }[] {
  return allSlugs.map((slug) => ({ slug }));
}
```
`allSlugs` comes from [src/lib/compositions.ts:89-91](src/lib/compositions.ts#L89-L91), derived from the `compositions` array in [src/content/compositions.ts](src/content/compositions.ts) (currently 6 entries). So all 6 composition detail pages are pre-rendered at build time; nothing is server-rendered on demand.

⚠️ VERIFY — the task description calls this a "static export" project, but no `output: "export"` (or `unoptimized` image flag) was found in [next.config.ts](next.config.ts) (it's an empty config object). Static-export mode is not currently configured; the routes above are statically *pre-rendered* under normal Next.js output, which is not the same as `next export`.

---

## 2. Component inventory

Classification is based on actual `import` statements, traced transitively through intermediate components up to the route files that render them. Root layout ([src/app/layout.tsx](src/app/layout.tsx)) renders on every route, so anything reachable only through it is marked SHARED (all routes).

| File | Directly imported by | Routes it reaches | Class |
|---|---|---|---|
| [shell/PageFrame.tsx](src/components/shell/PageFrame.tsx) | `layout.tsx` | all routes | SHARED |
| [shell/SiteHeader.tsx](src/components/shell/SiteHeader.tsx) | `layout.tsx` | all routes | SHARED |
| [shell/SiteFooter.tsx](src/components/shell/SiteFooter.tsx) | `layout.tsx` | all routes | SHARED |
| [shell/ThemeScript.tsx](src/components/shell/ThemeScript.tsx) | `layout.tsx` | all routes | SHARED |
| [shell/MenuDrawer.tsx](src/components/shell/MenuDrawer.tsx) | `SiteHeader.tsx` | all routes (via SiteHeader → layout) | SHARED |
| [shell/ThemeToggle.tsx](src/components/shell/ThemeToggle.tsx) | `SiteHeader.tsx` | all routes (via SiteHeader → layout) | SHARED |
| [ui/Divider.tsx](src/components/ui/Divider.tsx) | `about/page.tsx`, `MenuDrawer.tsx`, `compositions/[slug]/page.tsx` | `/about`, `/compositions/[slug]`, + all routes via MenuDrawer | SHARED |
| [ui/ExternalLink.tsx](src/components/ui/ExternalLink.tsx) | `SiteFooter.tsx`, `achievements/page.tsx`, `compositions/[slug]/page.tsx` | all routes (via SiteFooter) + `/achievements`, `/compositions/[slug]` | SHARED |
| [ui/Flourish.tsx](src/components/ui/Flourish.tsx) | `Logo.tsx`, `not-found.tsx`, `page.tsx`, `Portrait.tsx`, `CompositionCover.tsx` | all routes (via Logo → SiteHeader) + `/`, `/about`, `/compositions`, `/compositions/[slug]`, 404 | SHARED |
| [ui/Logo.tsx](src/components/ui/Logo.tsx) | `SiteHeader.tsx` | all routes (via SiteHeader → layout) | SHARED |
| [ui/MetaRow.tsx](src/components/ui/MetaRow.tsx) | `compositions/[slug]/page.tsx` | `/compositions/[slug]` only | PAGE-LOCAL |
| [ui/Portrait.tsx](src/components/ui/Portrait.tsx) | `about/page.tsx`, `Hero.tsx` | `/about`, `/` (via Hero) | SHARED |
| [ui/Prose.tsx](src/components/ui/Prose.tsx) | `about/page.tsx` | `/about` only | PAGE-LOCAL |
| [ui/SectionHeading.tsx](src/components/ui/SectionHeading.tsx) | `about/page.tsx`, `achievements/page.tsx`, `compositions/page.tsx` | `/about`, `/achievements`, `/compositions` | SHARED |
| [ui/icons.tsx](src/components/ui/icons.tsx) | `ThemeToggle.tsx`, `SiteHeader.tsx`, `MenuDrawer.tsx`, `FeaturedCarousel.tsx` | all routes (via SiteHeader/ThemeToggle/MenuDrawer) + `/` | SHARED |
| [compositions/CompositionBrowser.tsx](src/components/compositions/CompositionBrowser.tsx) | `compositions/page.tsx` | `/compositions` only | PAGE-LOCAL |
| [compositions/CompositionCard.tsx](src/components/compositions/CompositionCard.tsx) | `CompositionBrowser.tsx`, `compositions/[slug]/page.tsx` | `/compositions` (via Browser), `/compositions/[slug]` | SHARED |
| [compositions/CompositionCover.tsx](src/components/compositions/CompositionCover.tsx) | `CompositionCard.tsx`, `FeaturedCarousel.tsx`, `compositions/[slug]/page.tsx` | `/`, `/compositions`, `/compositions/[slug]` | SHARED |
| [landing/FeaturedCarousel.tsx](src/components/landing/FeaturedCarousel.tsx) | `page.tsx` | `/` only | PAGE-LOCAL |
| [landing/Hero.tsx](src/components/landing/Hero.tsx) | `page.tsx` | `/` only | PAGE-LOCAL |

Total files under `src/components`: 19. PAGE-LOCAL: 5 (`MetaRow`, `Prose`, `CompositionBrowser`, `FeaturedCarousel`, `Hero`). SHARED: 14.

---

## 3. Tailwind surface

- **Config file(s):** No `tailwind.config.js`/`.ts` exists. Tailwind v4 config is done entirely in CSS via `@theme inline` inside [src/app/globals.css](src/app/globals.css#L72-L84). PostCSS plugin config: [postcss.config.mjs](postcss.config.mjs) (`{ plugins: { "@tailwindcss/postcss": {} } }`).
- **Version:** `tailwindcss@4.3.3`, `@tailwindcss/postcss@^4` (installed 4.x) — read from `node_modules` and [package.json](package.json#L17).
- **Import into CSS:** `@import "tailwindcss";` at [src/app/globals.css:1](src/app/globals.css#L1).
- **Theme extension** (`@theme inline`, [src/app/globals.css:72-84](src/app/globals.css#L72-L84)), all bound to CSS custom properties defined on `:root` / `[data-theme="light"]`:
  - Colors: `--color-surface`, `--color-surface-raised`, `--color-surface-sunken`, `--color-ink`, `--color-ink-muted`, `--color-gold`, `--color-gold-hairline`, `--color-gold-strong`
  - Fonts: `--font-display` (Cormorant Garamond, Georgia, Times New Roman, serif fallback), `--font-sans` (Inter, ui-sans-serif, system-ui, sans-serif fallback)
  - No custom spacing or animation entries in `@theme` — animations are hand-written `@keyframes` outside the theme block (see below).
- **`@apply` usage:** none found (`grep "@apply"` over `src` returned no matches).
- **Custom utility classes** defined via `@layer utilities` in globals.css (not Tailwind plugins, hand-written CSS): `.tracked-caps`, `.tracked-caps-tight`, `.gold-frame`, `.gold-frame-strong`, `.surface-glow`, `.coverflow-track`, `.coverflow-card`, `.scrollbar-none` (+ `::-webkit-scrollbar` sub-rule). ([src/app/globals.css:124-198](src/app/globals.css#L124-L198))
- **No Tailwind plugins** (no `plugins: []` array anywhere — v4 has no config file to hold one, and none is imported).
- **Arbitrary-value / bracket classes in use** (grepped across `src`):
  - `min-h-[50vh]` — [src/app/not-found.tsx:6](src/app/not-found.tsx#L6)
  - `top-[1.85rem]`/`left-[2.35rem]` style negative insets — [src/app/achievements/page.tsx:52](src/app/achievements/page.tsx#L52)
  - `max-w-[60ch]` — [src/app/achievements/page.tsx:76](src/app/achievements/page.tsx#L76), [src/app/compositions/[slug]/page.tsx:132](src/app/compositions/%5Bslug%5D/page.tsx#L132)
  - `max-w-[65ch]` — [src/app/compositions/[slug]/page.tsx:141](src/app/compositions/%5Bslug%5D/page.tsx#L141), [src/app/about/page.tsx:29](src/app/about/page.tsx#L29), [src/app/about/page.tsx:31](src/app/about/page.tsx#L31), [src/components/ui/Prose.tsx:13](src/components/ui/Prose.tsx#L13)
  - `w-[min(62vw,17rem)]` — [src/components/landing/FeaturedCarousel.tsx:163](src/components/landing/FeaturedCarousel.tsx#L163)
  - `bg-(--overlay-scrim)` (arbitrary CSS-variable value) — [src/components/shell/MenuDrawer.tsx:119](src/components/shell/MenuDrawer.tsx#L119)
  - `shadow-[0_1px_4px_rgb(0_0_0/0.45)]` and `ease-[cubic-bezier(0.34,1.56,0.64,1)]` — [src/components/shell/ThemeToggle.tsx:79](src/components/shell/ThemeToggle.tsx#L79)
  - `ease-[cubic-bezier(0.34,1.56,0.64,1)]` also in [src/components/shell/MenuDrawer.tsx:103](src/components/shell/MenuDrawer.tsx#L103)

---

## 4. Theme mechanism

- **File:** [src/lib/theme.ts](src/lib/theme.ts) (logic/constants) + [src/components/shell/ThemeScript.tsx](src/components/shell/ThemeScript.tsx) (inlined bootstrap script) + [src/components/shell/ThemeToggle.tsx](src/components/shell/ThemeToggle.tsx) (UI control).
- **Attribute set on `<html>`:** `data-theme="dark"` / `data-theme="light"` — constant name `THEME_ATTRIBUTE = "data-theme"` ([src/lib/theme.ts:4](src/lib/theme.ts#L4)). Root layout hard-codes `data-theme="dark"` on the server-rendered `<html>` ([src/app/layout.tsx:67](src/app/layout.tsx#L67)):
  ```tsx
  data-theme="dark"
  suppressHydrationWarning
  ```
- **Persistence:** `localStorage`, key `"zc-theme"` (`THEME_STORAGE_KEY`, [src/lib/theme.ts:3](src/lib/theme.ts#L3)). Read/write in `readStoredTheme` / `applyTheme` ([src/lib/theme.ts:14-21](src/lib/theme.ts#L14-L21), [src/lib/theme.ts:44-78](src/lib/theme.ts#L44-L78)).
- **Flash-of-wrong-theme prevention:** a synchronous inline `<script>` in `<head>`, injected via `dangerouslySetInnerHTML` from a module-level string constant, executed during HTML parsing before first paint:
  ```ts
  // src/lib/theme.ts:11
  export const themeScriptSource = `(function(){try{var stored=localStorage.getItem("${THEME_STORAGE_KEY}");if(stored==="dark"||stored==="light"){document.documentElement.setAttribute("${THEME_ATTRIBUTE}",stored)}}catch(error){}})()`;
  ```
  ```tsx
  // src/components/shell/ThemeScript.tsx:30-37
  export function ThemeScript() {
    return (
      <script
        dangerouslySetInnerHTML={{ __html: themeScriptSource }}
      />
    );
  }
  ```
  This requires `suppressHydrationWarning` on `<html>` (present, see above) since the script mutates an attribute the server didn't send.
- **Theme change animation:** `transitionTheme()` ([src/lib/theme.ts:110-154](src/lib/theme.ts#L110-L154)) uses the View Transitions API for a circular wipe from the toggle's click point, falling back to a CSS cross-fade (`applyTheme(theme, { animate: true })`) or an instant snap under `prefers-reduced-motion: reduce`.

---

## 5. Existing CSS

Only one stylesheet exists under `src`: [src/app/globals.css](src/app/globals.css).

- Imported in [src/app/layout.tsx:9](src/app/layout.tsx#L9): `import "./globals.css";` — applied globally via the root layout, so it loads on every route.
- No `.module.css` files exist anywhere under `src` (glob for `**/*.module.css` returned nothing).
- No other `.css` files exist under `src`. (`.next/` build-output CSS chunks and `node_modules/tailwindcss/*.css` were excluded as generated/vendored.)

---

## 6. Content/lib shape

### `Composition` — [src/content/compositions.ts:28-55](src/content/compositions.ts#L28-L55)

```ts
export type Composition = {
  slug: string;                    // permalink segment, must never change once shared/indexed
  title: string;
  subtitle?: string;
  year: number;
  instrumentation: Instrumentation; // "orchestra" | "chamber" | "choral" | "solo" | "band" | "film"
  duration?: string;                // e.g. 12'30"
  scoring?: string;                 // e.g. 2.2.2.2 / 4.3.3.1 / timp / str
  blurb: string;                    // 1–2 sentences, reused on cards/carousel/meta description
  programNote?: string[];           // one string per paragraph
  cover?: { src: string; alt: string; credit?: string };
  audio?: { src: string; label: string }[];
  score?: { src: string; label: string };
  premiere?: {
    ensemble?: string;
    conductor?: string;
    venue?: string;
    date: string;
  };
  featured?: true;                  // exactly one entry may set this; enforced at build time by getFeatured()
};
```

`Instrumentation` union ([src/content/compositions.ts:10-16](src/content/compositions.ts#L10-L16)): `"orchestra" | "chamber" | "choral" | "solo" | "band" | "film"`.

### `Achievement` — [src/content/achievements.ts:28-39](src/content/achievements.ts#L28-L39)

```ts
export type Achievement = {
  id: string;
  year: number;
  kind: AchievementKind;      // "award" | "commission" | "premiere" | "residency" | "performance" | "press"
  title: string;
  organization?: string;
  detail?: string;
  href?: string;               // external link, rendered rel="noopener noreferrer"
  compositionSlug?: string;    // must match a Composition.slug
};
```

`AchievementKind` union ([src/content/achievements.ts:10-16](src/content/achievements.ts#L10-L16)): `"award" | "commission" | "premiere" | "residency" | "performance" | "press"`.

---

## 7. Risks

### (a) Full Tailwind removal

- **Blast radius is the entire component tree, not a subset.** Every one of the 19 files under `src/components` and all 5 route files under `src/app` style exclusively through Tailwind utility classes in `className` strings — there is no parallel CSS/module.css system to fall back on (confirmed in §5: only `globals.css` exists, no `.module.css` anywhere). Removing Tailwind without a replacement breaks visual styling on 100% of the site, not select files.
- **[src/app/globals.css](src/app/globals.css) has a hard dependency on Tailwind v4 mechanics** beyond utility classes: `@import "tailwindcss";` ([globals.css:1](src/app/globals.css#L1)) and the `@theme inline` block ([globals.css:72-84](src/app/globals.css#L72-L84)) are what generate `bg-surface`, `text-ink`, `border-gold-hairline`, `font-display`, etc. — utility class names used throughout every component. Deleting the import breaks every one of those class names simultaneously; there is no CSS fallback defined for them.
- **No `tailwind.config.js`** — v4's CSS-native config means "removal" isn't a one-line change to a config file; it means the `@theme inline` block and the `@import` both have to go, and every component's `className` string has to be rewritten by hand.
- **The theme-wipe/cross-fade CSS** ([globals.css:215-293](src/app/globals.css#L215-L293)) and the custom utilities (`.gold-frame`, `.tracked-caps`, `.coverflow-*`, `.scrollbar-none`, [globals.css:124-198](src/app/globals.css#L124-L198)) are plain hand-written CSS inside `@layer utilities`/`@layer base` — these specific rules would survive a Tailwind removal only if `@layer` is kept working (it's now a native CSS feature), but they still depend on Tailwind-generated custom properties like `--color-gold-hairline`'s consumers elsewhere.
- **`postcss.config.mjs`** wires in `@tailwindcss/postcss` as the sole PostCSS plugin ([postcss.config.mjs:2-4](postcss.config.mjs#L2-L4)) — removing the dependency without editing this file would not fail the build loudly; PostCSS would just stop processing `@import "tailwindcss"` / utility generation, and the site would render unstyled.

### (b) Moving component files into per-route folders

- **14 of 19 components are SHARED across 2+ routes** (§2) — moving any of them into a single route's folder breaks the `@/components/...` import in every *other* consuming file. Concretely:
  - `ui/Flourish.tsx`, `ui/icons.tsx`, `shell/*` (all 6 files) are reachable from **every route** via `layout.tsx` → `SiteHeader`/`SiteFooter`/`ThemeScript`/`PageFrame`. None of these can move into a route folder without either duplicating them or breaking the layout import.
  - `compositions/CompositionCover.tsx` is used from three different route contexts (`/`, `/compositions`, `/compositions/[slug]`, §2) — moving it under any one of those breaks the other two.
  - `compositions/CompositionCard.tsx` is used from `/compositions` (via `CompositionBrowser`) and directly from `/compositions/[slug]`.
  - `ui/Portrait.tsx` is used from `/about` and from `/` (via `Hero`).
  - `ui/Divider.tsx` and `ui/ExternalLink.tsx` are each reachable from all routes (via `MenuDrawer`/`SiteFooter` in the layout) plus specific pages directly.
- **`layout.tsx` itself is not a route folder** — it's the shared shell for all 5 routes. Any shell component moved into a per-route folder would need to be imported back out of that route's folder by `layout.tsx`, which defeats the purpose of "per-route" co-location and creates a cross-folder import in the opposite direction.
- **Safe to move with just an import-path update** (true PAGE-LOCAL, single consumer): `ui/MetaRow.tsx` (→ `/compositions/[slug]`), `ui/Prose.tsx` (→ `/about`), `compositions/CompositionBrowser.tsx` (→ `/compositions`), `landing/FeaturedCarousel.tsx` and `landing/Hero.tsx` (→ `/`).
- **`tsconfig.json`'s `@/*` → `./src/*` path alias** ([tsconfig.json:21-23](tsconfig.json#L21-L23)) is what every cross-component import above relies on — restructuring folders doesn't break the alias itself, but every moved file's *consumers* (traced in §2) need their import specifiers updated individually; there's no barrel/index file to update in one place.
