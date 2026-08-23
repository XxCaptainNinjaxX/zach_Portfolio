"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MenuIcon } from "@/components/ui/icons";
import { Divider } from "@/components/ui/Divider";
import { navItems, site } from "@/components/data/site";
import styles from "@/components/MenuDrawer/MenuDrawer.module.css";

/**
 * The site's only navigation, at every breakpoint.
 *
 * One hamburger in the header opens a panel on the right edge. The button is
 * also the close control — it is not replaced by an X inside the panel — so its
 * three horizontal bars rotate a quarter turn into three vertical bars to show
 * the open state.
 *
 * Layering: SiteHeader is `sticky z-30`, which makes it a stacking context, so
 * every z-index below competes only with its siblings inside that context, not
 * with the rest of the page. The header as a whole outranks PageFrame (z-20),
 * which is what keeps the gold rule from drawing across the open panel.
 *
 * SiteHeader must not carry a filter or backdrop-filter of its own — that would
 * make it the containing block for the fixed scrim and panel below, shrinking
 * both to the header's box. Its translucent band is a separate layer for exactly
 * this reason.
 */
export function MenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    // Lock background scrolling while the scrim covers the page.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      const trigger = triggerRef.current;
      if (!panel || !trigger) return;

      // Focus trap. The trigger is outside the panel but is the visible close
      // control, so it belongs in the cycle — otherwise a keyboard user can see
      // the button that closes the menu and never reach it.
      const focusable = [
        trigger,
        ...panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ];

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="site-menu"
        className={styles.trigger}
      >
        {/*
          The icon is one path of three bars drawn symmetrically about the 24×24
          centre, so a plain 90° turn lands three vertical bars — no second icon
          and no per-bar animation. The easing overshoots, so they swing just
          past vertical and settle.
        */}
        <MenuIcon
          className={`${styles.triggerIcon} ${
            isOpen ? styles.triggerIconOpen : styles.triggerIconClosed
          }`}
        />
      </button>

      {/*
        Scrim and panel stay mounted and animate on class changes, which is what
        gives the panel an exit transition as well as an entrance without an
        animation library. `inert` is what makes that safe: while closed the
        panel is out of the tab order and out of the accessibility tree, and it
        ships that way from the server, so there is nothing to correct on hydration.
      */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`${styles.scrim} ${
          isOpen ? styles.scrimOpen : styles.scrimClosed
        }`}
      />

      <div
        id="site-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        inert={!isOpen}
        // `translate`, not `transform`: the open/closed classes set the
        // individual `translate` property, so a transition list naming
        // `transform` animates nothing and the panel jumps into place in one
        // frame.
        className={`${styles.panel} ${
          // Closed sits at 0.6 rather than 0: the panel slides in already mostly
          // opaque, so the motion reads as the edge arriving rather than a fade.
          isOpen ? styles.panelOpen : styles.panelClosed
        }`}
      >
        {/*
          Centred, so the header band overlapping the panel's top strip lands on
          empty space. That header is two rows on mobile and one on desktop —
          anchoring the links to the top would mean measuring it.
        */}
        <nav aria-label="Main" className={styles.nav}>
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            // Entrance stagger, so the links arrive just behind the panel rather
            // than riding in with it.
            const entranceDelay = 60 + index * 45;

            return (
              <Link
                key={item.href}
                href={item.href}
                // Closed here rather than in an effect on pathname: the panel
                // must close on every activation, including a link to the page
                // already showing, which produces no pathname change to react to.
                onClick={close}
                aria-current={isActive ? "page" : undefined}
                // One delay per property, positionally matched to the
                // transition-property list on .navLink in the module: the three
                // colours stay instant so hover does not lag, and only the
                // entrance staggers. Zero on the way out, otherwise closing
                // drags.
                style={{
                  transitionDelay: isOpen
                    ? `0ms,0ms,0ms,${entranceDelay}ms,${entranceDelay}ms`
                    : "0ms",
                }}
                // `translate` rather than `transform` — see the panel above.
                className={`tracked-caps ${styles.navLink} ${
                  isOpen ? styles.navLinkOpen : styles.navLinkClosed
                } ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.panelFooter}>
          <Divider className={styles.divider} />
          <a
            href={`mailto:${site.email}`}
            onClick={close}
            className={`tracked-caps-tight ${styles.emailLink}`}
          >
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
