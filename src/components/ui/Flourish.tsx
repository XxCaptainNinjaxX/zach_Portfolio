/**
 * The recurring gold flourish motif.
 *
 * ⚠️ VERIFY: placeholder geometry. The mockup's flourish was AI-generated and its
 * strokes do not resolve into a coherent pen path, so it could not be traced.
 * This is a hand-built stand-in with the same character: a woven family of thin
 * S-curves derived from a treble clef's spine.
 *
 * When the real asset arrives it should be an SVG with *stroked* paths (not
 * filled outlines) so it keeps inheriting currentColor and stays animatable via
 * stroke-dasharray. Swapping it means replacing the <path> elements below and
 * nothing else.
 *
 * Decorative in every current usage, so it is hidden from assistive technology.
 */

type FlourishProps = {
  className?: string;
};

/** Each stroke is one S-curve; later entries sit closer to the spine and fade out. */
const strokes: { path: string; opacity: number; width: number }[] = [
  {
    path: "M60 4 C 10 64, 110 114, 60 176 C 10 240, 110 294, 60 356",
    opacity: 0.35,
    width: 1,
  },
  {
    path: "M60 10 C 22 68, 98 118, 60 178 C 22 238, 98 288, 60 350",
    opacity: 0.55,
    width: 1.1,
  },
  {
    path: "M60 16 C 30 70, 92 122, 60 180 C 28 238, 90 286, 60 344",
    opacity: 0.75,
    width: 1.2,
  },
  {
    path: "M60 24 C 38 74, 86 126, 60 182 C 34 236, 84 282, 60 338",
    opacity: 0.9,
    width: 1.3,
  },
  {
    path: "M60 34 C 46 78, 80 130, 60 184 C 42 234, 78 278, 60 330",
    opacity: 0.7,
    width: 1.1,
  },
  {
    path: "M60 46 C 52 82, 72 134, 60 186 C 50 232, 70 274, 60 322",
    opacity: 0.45,
    width: 1,
  },
];

export function Flourish({ className }: FlourishProps) {
  return (
    <svg
      viewBox="0 0 120 360"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {strokes.map((stroke) => (
        <path
          key={stroke.path}
          d={stroke.path}
          stroke="currentColor"
          strokeWidth={stroke.width}
          strokeLinecap="round"
          opacity={stroke.opacity}
        />
      ))}
      {/* The spine, drawn last so it reads as the dominant line. */}
      <path
        d="M60 0 L60 360"
        stroke="currentColor"
        strokeWidth={0.6}
        opacity={0.22}
      />
    </svg>
  );
}
