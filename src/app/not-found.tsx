import Link from "next/link";
import { Flourish } from "@/components/ui/Flourish";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-5 py-20 text-center">
      <Flourish className="h-32 text-gold opacity-50" />

      <h1 className="tracked-caps mt-10 font-display text-2xl font-light text-ink">
        Page not found
      </h1>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
        That page does not exist, or it has moved.
      </p>

      <Link
        href="/"
        className="tracked-caps-tight mt-8 border-b border-gold pb-1 text-[0.65rem] text-gold transition-opacity hover:opacity-70"
      >
        Return home
      </Link>
    </div>
  );
}
