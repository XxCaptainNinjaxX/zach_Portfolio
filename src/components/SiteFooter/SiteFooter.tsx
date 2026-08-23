import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { navItems, site } from "@/components/data/site";
import styles from "@/components/SiteFooter/SiteFooter.module.css";

/**
 * ⚠️ VERIFY: the mockup has no footer on any viewport. This is an addition — the
 * page needs a terminal edge and a copyright line, and it gives the four routes
 * a second reachable path on mobile.
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav aria-label="Footer" className={styles.linkRow}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`tracked-caps-tight ${styles.navLink}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {site.socials.length > 0 ? (
          <ul className={styles.linkRow}>
            {site.socials.map((social) => (
              <li key={social.href}>
                <ExternalLink
                  href={social.href}
                  className={`tracked-caps-tight ${styles.socialLink}`}
                >
                  {social.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        ) : null}

        <p className={styles.copyright}>
          © {currentYear} {site.name}
        </p>
      </div>
    </footer>
  );
}
