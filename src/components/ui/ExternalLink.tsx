import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * Off-site link. `rel="noopener noreferrer"` is required with target="_blank" —
 * without noopener the opened page gets a handle on this one via window.opener.
 * The visually-hidden suffix tells screen reader users a new tab is coming,
 * which the icon alone does not.
 */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline decoration-gold-hairline underline-offset-4 transition-colors hover:text-gold ${className ?? ""}`}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
