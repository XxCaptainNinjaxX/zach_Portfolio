"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Divider } from "@/components/ui/Divider";
import { navItems, site } from "@/content/site";

/**
 * Mobile navigation.
 *
 * ⚠️ VERIFY: the mockup shows NO navigation on mobile at all — no rail, no
 * hamburger, no tab bar. This full-screen overlay is a proposal, not a
 * transcription. It was chosen over a bottom tab bar (reads as an app, off-brand
 * for this design) and a horizontal scrolling strip (four long tracked-caps
 * labels do not fit at 390px).
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    // Lock background scrolling while the overlay covers the page.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Captured now rather than read in cleanup: by the time cleanup runs the ref
    // may point somewhere else, and the eslint rule that flags this is right to.
    const openButton = openButtonRef.current;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      // Focus trap: keep Tab inside the panel so a keyboard user cannot land on
      // the page behind an overlay they can no longer see.
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

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
      // Return focus to the control that opened the panel, so the keyboard user
      // resumes where they left off rather than at the top of the document.
      openButton?.focus();
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="inline-flex size-9 items-center justify-center text-ink-muted transition-colors hover:text-gold lg:hidden"
      >
        <MenuIcon />
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="fixed inset-0 z-50 flex flex-col bg-(--overlay-scrim) px-8 py-6 backdrop-blur-sm lg:hidden"
        >
          <div className="flex justify-end">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex size-9 items-center justify-center text-ink-muted transition-colors hover:text-gold"
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            aria-label="Main"
            className="flex flex-1 flex-col justify-center gap-2"
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  // Closed here rather than in an effect on pathname: the panel
                  // must close on every activation, including a link to the page
                  // already showing, which produces no pathname change to react to.
                  onClick={close}
                  aria-current={isActive ? "page" : undefined}
                  className={`tracked-caps border-b border-gold-hairline/30 py-5 font-display text-lg transition-colors ${
                    isActive ? "text-gold" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pb-4">
            <Divider className="mb-6" />
            <a
              href={`mailto:${site.email}`}
              onClick={close}
              className="tracked-caps-tight text-xs text-ink-muted transition-colors hover:text-gold"
            >
              {site.email}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
