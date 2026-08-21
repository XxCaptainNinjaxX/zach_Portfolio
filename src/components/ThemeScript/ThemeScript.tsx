import { themeScriptSource } from "@/lib/theme";

/**
 * Applies the stored theme before the browser paints anything.
 *
 * THE FAILURE MODE THIS EXISTS TO PREVENT — "flash of incorrect theme":
 * every page is prerendered to static HTML at build time, so that HTML is
 * identical for everyone and must hard-code one theme (dark). A visitor who
 * previously chose light gets navy HTML from the CDN, sees it painted, and only
 * then does JavaScript repaint it white.
 *
 * Why not the obvious alternatives:
 *   useEffect        — runs after hydration AND after paint. Guarantees the flash.
 *   useLayoutEffect  — runs before paint but after hydration. On a slow connection
 *                      the browser paints the server HTML long before React exists.
 *   cookies() in the
 *   root layout      — correct on the server, but opts every route out of static
 *                      prerendering. Trades a 200ms flash for a permanently
 *                      dynamic site.
 *
 * This script is inlined into <head> and executes synchronously while the browser
 * parses the document — before the first paint, before React loads, before any
 * element exists. By the time anything is painted, data-theme is already right.
 *
 * Requires `suppressHydrationWarning` on <html> in the root layout: the script
 * mutates an attribute the server did not send, and without the suppression React
 * treats that as a hydration error and re-renders the subtree — throwing away the
 * correction and causing the exact flash this prevents.
 */
export function ThemeScript() {
  return (
    <script
      // The source is a module-level constant, not user input — no injection surface.
      dangerouslySetInnerHTML={{ __html: themeScriptSource }}
    />
  );
}
