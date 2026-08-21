import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { navItems, site } from "@/content/site";

/**
 * ⚠️ VERIFY: the mockup has no footer on any viewport. This is an addition — the
 * page needs a terminal edge and a copyright line, and it gives the four routes
 * a second reachable path on mobile.
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gold-hairline/40 px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tracked-caps-tight text-[0.65rem] text-ink-muted transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {site.socials.length > 0 ? (
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.href}>
                <ExternalLink
                  href={social.href}
                  className="tracked-caps-tight text-[0.65rem] text-ink-muted no-underline"
                >
                  {social.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="text-[0.65rem] text-ink-muted">
          © {currentYear} {site.name}
        </p>
      </div>
    </footer>
  );
}
