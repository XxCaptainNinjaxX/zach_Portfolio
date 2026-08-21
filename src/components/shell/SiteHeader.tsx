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
 */
export function SiteHeader() {
  return (
    <header className="border-b border-gold-hairline/40">
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

          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.name}`}
            className="inline-flex size-9 items-center justify-center text-ink-muted transition-colors hover:text-gold"
          >
            <MailIcon />
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
