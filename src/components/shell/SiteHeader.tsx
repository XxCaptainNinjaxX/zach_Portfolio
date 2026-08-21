import Link from "next/link";
import { MobileNav } from "@/components/shell/MobileNav";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";
import { site } from "@/content/site";

/**
 * Logo badge, wordmark, role, contact shortcuts, theme toggle.
 *
 * Mobile splits into two rows — badge and controls, then the wordmark centred
 * beneath — matching the mockup. Note the mockup's mobile header drops the theme
 * toggle entirely, which would make light mode unreachable on a phone; it is
 * kept here deliberately.
 *
 * Sticky, and it owns the top inset that used to live on the layout wrapper —
 * that is what lets it pin flush to the viewport edge with no gap for scrolled
 * content to appear in above it. z-30 keeps it under PageFrame's gold rule (z-40)
 * and under the MobileNav overlay (z-50). The translucent background plus blur is
 * so the body's radial glow reads through rather than being cut by a flat band.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-surface/90 pt-3 backdrop-blur-md sm:pt-5">
      <div className="flex items-center gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-4"
          aria-label={`${site.name} — home`}
        >
          <Logo size={48} className="sm:size-14" />

          <span className="hidden min-w-0 items-baseline gap-4 lg:flex">
            <span className="tracked-caps truncate font-display text-2xl font-light text-ink xl:text-3xl">
              {site.name}
            </span>
            <span
              aria-hidden="true"
              className="h-6 w-px shrink-0 self-center bg-gold-hairline"
            />
            <span className="tracked-caps truncate font-display text-lg font-light text-ink-muted xl:text-xl">
              {site.role}
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          {site.phone ? (
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              aria-label={`Call ${site.name}`}
              className="inline-flex size-9 items-center justify-center text-ink-muted transition-colors hover:text-gold"
            >
              <PhoneIcon />
            </a>
          ) : null}

          {/*
            The site's only contact surface — there is no /contact route. The
            address shows from `sm` up; below that it is too long for the header
            row, and the mobile overlay ends with the same address anyway.
          */}
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.name}`}
            className="inline-flex items-center gap-2 px-1 text-ink-muted transition-colors hover:text-gold sm:px-2"
          >
            <MailIcon />
            <span className="tracked-caps-tight hidden text-[0.65rem] sm:inline">
              {site.email}
            </span>
          </a>

          <ThemeToggle />
          <MobileNav />
        </div>
      </div>

      {/* Mobile wordmark row. */}
      <div className="px-5 pb-4 text-center lg:hidden">
        <p className="tracked-caps font-display text-base font-light text-ink sm:text-xl">
          {site.name}
        </p>
        <p className="tracked-caps mt-1 font-display text-[0.65rem] font-light text-ink-muted sm:text-xs">
          {site.role}
        </p>
      </div>
    </header>
  );
}
