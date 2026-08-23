import Link from "next/link";
import { MenuDrawer } from "@/components/MenuDrawer/MenuDrawer";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";
import { site } from "@/components/data/site";
import styles from "@/components/SiteHeader/SiteHeader.module.css";

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
 * content to appear in above it. z-30 puts it over PageFrame's gold rule (z-20)
 * and, because a z-index makes it a stacking context, confines MenuDrawer's own
 * layering to this subtree.
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      {/*
        The translucent band is its own layer rather than a background on
        <header>, because backdrop-filter makes an element the containing block
        for its fixed-position descendants — which would re-anchor MenuDrawer's
        viewport-filling scrim and full-height panel to this ~160px box. inset-0
        covers the padding box, so the band still includes the top inset above.
        The blur is so the body's radial glow reads through rather than being cut
        by a flat band.
      */}
      <div aria-hidden="true" className={styles.band} />

      <div className={styles.row}>
        <Link
          href="/"
          className={styles.homeLink}
          aria-label={`${site.name} — home`}
        >
          <Logo size={48} className={styles.logo} />

          <span className={styles.wordmark}>
            <span className={`tracked-caps ${styles.name}`}>{site.name}</span>
            <span aria-hidden="true" className={styles.separator} />
            <span className={`tracked-caps ${styles.role}`}>{site.role}</span>
          </span>
        </Link>

        <div className={styles.controls}>
          {site.phone ? (
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              aria-label={`Call ${site.name}`}
              className={styles.phoneLink}
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
            className={styles.mailLink}
          >
            <MailIcon />
            <span className={`tracked-caps-tight ${styles.mailText}`}>
              {site.email}
            </span>
          </a>

          <ThemeToggle />
          <MenuDrawer />
        </div>
      </div>

      {/* Mobile wordmark row. */}
      <div className={styles.mobileRow}>
        <p className={`tracked-caps ${styles.mobileName}`}>{site.name}</p>
        <p className={`tracked-caps ${styles.mobileRole}`}>{site.role}</p>
      </div>
    </header>
  );
}
