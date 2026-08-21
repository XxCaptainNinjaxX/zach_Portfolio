# Zachary Crawford — Orchestral Composer

Static portfolio site. Next.js 16 (App Router) · TypeScript · Tailwind v4.

`PLAN.md` holds the build plan, the open questions, and the reasoning behind the
non-obvious decisions.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build — all routes prerender to static HTML
npm start        # serve the production build
npm run lint     # eslint (next build does not lint in Next 16)
npx tsc --noEmit # type check
```

## Editing content

All content lives in `src/content/`. Nothing else needs touching to change what
the site says.

**Add a composition** — append one object to the `compositions` array in
`src/content/compositions.ts`. The catalogue page, the landing carousel,
`/compositions/<slug>`, the sitemap, and the related-works strip all pick it up.
If you have cover art, drop it at `public/compositions/<slug>.jpg` (square,
≥1200px) and add a `cover` field; without one, a typographic placeholder is
generated from the title.

**Change the featured work** — move `featured: true` to a different entry. The
build fails if zero or two entries carry it.

**Add an achievement** — append to `src/content/achievements.ts`. Set
`compositionSlug` to cross-link it to a work.

**Everything else** — name, email, bio, portrait path, socials, CV, SEO defaults,
and the nav order are in `src/content/site.ts`.

## What is still placeholder

Marked in-repo with `⚠️ VERIFY`. Run `grep -rn "VERIFY" src/` for the full list.

- Every content string — titles, dates, bio, achievements, email.
- The ZC logo (CSS monogram stand-in) and the flourish motif (hand-built SVG).
- The portrait (`site.portrait.src` is `null`, so a labelled placeholder renders).
- Cover art for all six works.
- Display typeface — Cormorant Garamond stands in for the mockup's face.
- Mobile navigation — the mockup shows none at all; the overlay panel is a proposal.
- The footer — the mockup has none.
- The carousel — it appears only in the AI mockup, not the original hand sketch.

## Structure

```
src/
  app/          routes, metadata, sitemap, robots, OG image
  components/
    shell/      frame, header, rail nav, mobile nav, theme, footer
    ui/         Flourish, Logo, Portrait, headings, icons, primitives
    landing/    hero, featured carousel
    compositions/  card, cover, catalogue browser
    contact/    copy-email button
  content/      site.ts, compositions.ts, achievements.ts  ← edit these
  lib/          derived views over content, theme storage
```

## Notable constraints

**No server features.** No Server Actions, Route Handlers, `cookies()`, or
`headers()`. This keeps `output: 'export'` available as a one-line hosting escape
hatch, which is what makes the Vercel licensing question in `PLAN.md` §9
deferrable rather than urgent. Contact is a `mailto:` link for the same reason.

**Theme.** Dark is the default and is baked into the prerendered HTML. A blocking
inline script in `<head>` applies a stored light preference during HTML parsing,
before first paint — see `src/components/shell/ThemeScript.tsx` for why the
obvious alternatives all flash.
