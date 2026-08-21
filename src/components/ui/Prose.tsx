type ProseProps = {
  /** One string per paragraph. */
  paragraphs: readonly string[];
  className?: string;
};

/**
 * Long-form body copy at a constrained measure. 65ch is the readability ceiling
 * for continuous prose — past it the eye loses the line on the return sweep.
 */
export function Prose({ paragraphs, className }: ProseProps) {
  return (
    <div className={`max-w-[65ch] space-y-5 ${className ?? ""}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="leading-relaxed text-ink-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
