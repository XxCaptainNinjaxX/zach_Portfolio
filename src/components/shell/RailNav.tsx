"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/site";

/**
 * The mockup's vertical right-edge nav. Desktop only — below `lg` the shell
 * swaps in MobileNav.
 *
 * `writing-mode: vertical-rl` plus a 180° rotation gives the bottom-to-top
 * reading direction the mockup uses. Rotating each item individually rather than
 * the container keeps the column's top-to-bottom order intact.
 */
export function RailNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      // The top inset the layout wrapper used to supply, so the first item still
      // lines up with the header now that the wrapper has no top padding.
      className="hidden w-14 shrink-0 border-l border-gold-hairline/50 pt-3 sm:pt-5 lg:flex lg:flex-col"
    >
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`tracked-caps flex flex-1 items-center justify-center border-b border-gold-hairline/30 text-[0.7rem] transition-colors last:border-b-0 [writing-mode:vertical-rl] hover:bg-surface-raised hover:text-gold ${
              isActive
                ? "bg-surface-raised text-gold"
                : "text-ink-muted"
            }`}
          >
            <span className="rotate-180">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
