type DividerProps = {
  className?: string;
};

/** Horizontal gold hairline with a centred diamond, used between page sections. */
export function Divider({ className }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-4 text-gold-hairline ${className ?? ""}`}
    >
      <span className="h-px flex-1 bg-current opacity-50" />
      <span className="size-1.5 rotate-45 border border-current" />
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}
