# Tailwind ground truth — extracted from the last pre-removal build

Source: `tailwind-reference.css` (copy of `.next/static/chunks/0nxorn0lxc-5f.css`,
`npm run build`, Next 16.3.1 / Turbopack, 2026-08-21). Every value below is read
from that file, not from memory. Line references are into the emitted file after
splitting on `}` (one rule per line); the raw file is minified to 4 lines.

Regenerate: run `npm run build` on any commit before batch 8 and copy the CSS
chunk from `.next/static/chunks/`.

---

## 1. Resolved line-heights per text-* size in use

Emitted as `font-size:var(--text-N);line-height:var(--tw-leading,var(--text-N--line-height))`,
with the ratios defined in the theme layer:

| Class | font-size | line-height (emitted) | = unitless |
| --- | --- | --- | --- |
| `text-xs` | 0.75rem | `calc(1 / .75)` | 1.3333 |
| `text-sm` | 0.875rem | `calc(1.25 / .875)` | 1.4286 |
| `text-base` | 1rem | `calc(1.5 / 1)` | 1.5 |
| `text-lg` | 1.125rem | `calc(1.75 / 1.125)` | 1.5556 |
| `text-xl` | 1.25rem | `calc(1.75 / 1.25)` | 1.4 |
| `text-2xl` | 1.5rem | `calc(2 / 1.5)` | 1.3333 |
| `text-3xl` | 1.875rem | `calc(2.25 / 1.875)` | 1.2 |
| `text-4xl` | 2.25rem | `calc(2.5 / 2.25)` | 1.1111 |
| `text-[0.6rem]` | 0.6rem | **none — font-size only**, inherits (html is 1.5) |
| `text-[0.65rem]` | 0.65rem | **none — font-size only**, inherits (html is 1.5) |

Overrides where present at the use site: `leading-none` → `1`,
`leading-tight` → `1.25`, `leading-relaxed` → `1.625` (all confirmed in the
emitted theme layer). Modules write the `calc()` ratio verbatim next to the
font-size token unless a `leading-*` class overrode it.

`font-light` → `font-weight: 300`.

## 2. Backdrop blur

- `backdrop-blur-sm` → `blur(8px)` (`--blur-sm: 8px`)
- `backdrop-blur-md` → `blur(12px)` (`--blur-md: 12px`)

Emitted with a `-webkit-backdrop-filter` twin; modules keep the prefixed pair:
`-webkit-backdrop-filter: blur(Npx); backdrop-filter: blur(Npx);`

## 3. Opacity-modified colors — color space confirmed: **oklab**

Every `/NN` color emits a two-step pattern: a full-opacity fallback, then a
`color-mix` override gated on `@supports (color:color-mix(in lab, red, red))`.

| Class | Fallback | Supported browsers |
| --- | --- | --- |
| `border-gold-hairline/30` | `var(--gold-hairline)` | `color-mix(in oklab, var(--gold-hairline) 30%, transparent)` |
| `border-gold-hairline/40` | `var(--gold-hairline)` | `color-mix(in oklab, var(--gold-hairline) 40%, transparent)` |
| `border-gold-hairline/50` | `var(--gold-hairline)` | `color-mix(in oklab, var(--gold-hairline) 50%, transparent)` |
| `border-gold-hairline/60` | `var(--gold-hairline)` | `color-mix(in oklab, var(--gold-hairline) 60%, transparent)` |
| `border-gold-hairline/70` | `var(--gold-hairline)` | `color-mix(in oklab, var(--gold-hairline) 70%, transparent)` |
| `bg-surface/90` | `var(--surface)` | `color-mix(in oklab, var(--surface) 90%, transparent)` |

Module translation replicates the fallback without `@supports` via the CSS
invalid-value cascade (identical result — a parser without `color-mix` drops the
second declaration):

```css
border-color: var(--gold-hairline);
border-color: color-mix(in oklab, var(--gold-hairline) 50%, transparent);
```

The hand-written `.gold-frame` / `.gold-frame-strong` keep their `in srgb`
color-mix — confirmed preserved as-authored in the emitted file. Do not
"normalize" them to oklab.

## 4. Preflight rules that apply to elements this repo renders

To be replicated in globals.css `@layer base` before batch 8 (batch 1 adds them;
identical duplication while preflight still loads):

```css
*, ::before, ::after, ::backdrop {
  box-sizing: border-box;
  border: 0 solid;
  margin: 0;
  padding: 0;
}
html {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
}
h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}
a {
  color: inherit;
  text-decoration: inherit;
}
ol, ul, menu {
  list-style: none;
}
img, svg, video, canvas, audio, iframe, embed, object {
  vertical-align: middle;
  display: block;
}
img, video {
  max-width: 100%;
  height: auto;
}
button, input, select, optgroup, textarea {
  font: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  letter-spacing: inherit;
  color: inherit;
  opacity: 1;
  background-color: transparent;
  border-radius: 0;
}
button, input:where([type="button"], [type="reset"], [type="submit"]) {
  appearance: button;
}
[hidden]:where(:not([hidden="until-found"])) {
  display: none !important;
}
b, strong { font-weight: bolder; }
```

Preflight rules **not** carried (no such elements rendered anywhere): `hr`,
`abbr[title]`, `code/kbd/samp/pre`, `small`, `sub/sup`, `table`, `progress`,
`summary`, `textarea resize`, `::placeholder`, `::file-selector-button`, the
`-webkit-datetime` family, `-moz` quirks. If one of these elements is ever
added, pull its rule from `tailwind-reference.css`.

Preflight's `html` font-family default is irrelevant — `body` sets
`font-family: var(--font-sans)` in our own base layer.

## 5. Other emitted values confirmed (cited during conversion)

- Spacing base: `--spacing: 0.25rem`; every `p/m/gap/inset` class is
  `calc(var(--spacing) * N)` — confirms the 13-token map exactly.
- Breakpoints: `@media (min-width:40rem)` / `64rem` / `80rem`. No `md:` (48rem)
  appears anywhere in the emitted file — nothing may introduce one.
- **`hover:` variants are wrapped in `@media (hover:hover)`** — modules must
  replicate the wrapper or touch devices gain sticky hover states.
- `transition-colors` → `transition-property: color, background-color,
  border-color, outline-color, text-decoration-color, fill, stroke` (the
  `--tw-gradient-*` entries are dead here — no gradients use them); default
  duration `.15s`, default timing `cubic-bezier(.4, 0, .2, 1)`.
- `transition-transform` → `transform, translate, scale, rotate`;
  `transition-opacity` → `opacity`.
- `duration-220` → `.22s`; `duration-300` → `.3s`; `ease-in-out` →
  `cubic-bezier(.4, 0, .2, 1)`.
- Translate utilities set the individual `translate` property (not
  `transform`) — matches the MenuDrawer comment; keep `translate:` in modules.
- `space-y-N` emits `:where(.space-y-N > :not(:last-child)) {
  margin-block-end: calc(var(--spacing) * N) }` (reverse factor is always 0
  here) — module translation: `.x > :not(:last-child) { margin-block-end: … }`.
- `.sr-only` → `clip-path:inset(50%); white-space:nowrap; border-width:0;
  width:1px; height:1px; margin:-1px; padding:0; position:absolute;
  overflow:hidden`; `focus:not-sr-only` inverts to `clip-path:none;
  white-space:normal; width:auto; height:auto; margin:0; padding:0;
  position:static; overflow:visible`.
- `rounded-full` → `border-radius: 3.40282e38px` (calc(infinity)); token uses
  `9999px` — indistinguishable at these element sizes.
- `shadow-[0_1px_4px_rgb(0_0_0/0.45)]` resolves to
  `box-shadow: 0 1px 4px #00000073`.
- `border`/`border-b-2` etc. = width + `border-style: solid` (preflight sets
  `border: 0 solid`); modules write explicit `border-…-width` +
  `border-…-style: solid`.
- `flex-1` → `flex: 1` (not v3's `1 1 0%`); `.max-w-90` →
  `calc(var(--spacing) * 90)` = 22.5rem; `.w-18` = 4.5rem; `.lg:h-104` = 26rem.
- `bg-(--overlay-scrim)` → `background-color: var(--overlay-scrim)` exactly.
