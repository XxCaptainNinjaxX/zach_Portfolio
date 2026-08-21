/**
 * The thin gold rule inset from the viewport edge that encloses the whole page
 * in the mockup.
 *
 * Fixed rather than absolute so it behaves as viewport chrome — it stays put
 * while content scrolls, instead of scrolling away with the first screenful.
 * pointer-events-none keeps it from intercepting clicks near the edges.
 */
export function PageFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-3 z-40 border border-gold-hairline/70 sm:inset-5"
    />
  );
}
