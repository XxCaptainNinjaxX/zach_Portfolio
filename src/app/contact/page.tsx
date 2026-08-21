import type { Metadata } from "next";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { Divider } from "@/components/ui/Divider";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Flourish } from "@/components/ui/Flourish";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Commission enquiries, score requests, and performance materials — contact ${site.name}.`,
};

/**
 * Email rather than a posted form, deliberately: a form needs a backend, spam
 * handling, and deliverability monitoring, and it would take a server dependency
 * that currently keeps `output: 'export'` available as a hosting escape hatch.
 * Commission enquiries arrive by email regardless.
 */
export default function ContactPage() {
  return (
    <div className="px-5 py-12 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading as="h1" eyebrow="Enquiries" className="text-left">
          Contact
        </SectionHeading>

        <div className="gold-frame mt-12 px-6 py-12 sm:px-10">
          <Flourish className="mx-auto h-24 text-gold opacity-60" />

          <p className="mt-8 leading-relaxed text-ink-muted">
            For commissions, arranging and orchestration, score enquiries, and
            performance materials.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 block break-words font-display text-2xl font-light text-gold underline decoration-gold-hairline underline-offset-8 transition-opacity hover:opacity-75 sm:text-3xl"
          >
            {site.email}
          </a>

          <div className="mt-8 flex justify-center">
            <CopyEmailButton email={site.email} />
          </div>

          {site.phone ? (
            <p className="mt-8 text-sm text-ink-muted">
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="transition-colors hover:text-gold"
              >
                {site.phone}
              </a>
            </p>
          ) : null}
        </div>

        {site.socials.length > 0 ? (
          <>
            <Divider className="mt-16" />
            <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
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
          </>
        ) : null}
      </div>
    </div>
  );
}
