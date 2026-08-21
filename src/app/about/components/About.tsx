import { Prose } from "@/app/about/components/Prose";
import { Divider } from "@/components/ui/Divider";
import { Portrait } from "@/components/ui/Portrait";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/components/data/site";

export function About() {
  return (
    <div className="px-5 py-12 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        {/* Sticky on desktop so the portrait stays with the prose on a long bio. */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <Portrait priority sizes="(max-width: 1024px) 80vw, 20rem" />
        </div>

        <div>
          <SectionHeading as="h1" eyebrow={site.role}>
            About
          </SectionHeading>

          <Prose paragraphs={site.bioLong} className="mt-10" />

          <Divider className="my-12 max-w-[65ch]" />

          <div className="max-w-[65ch]">
            <h2 className="tracked-caps font-display text-lg font-light text-ink">
              Working together
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              For commissions, score enquiries, and performance materials, the
              fastest route is email.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={`mailto:${site.email}`}
                className="tracked-caps-tight border-b border-gold pb-1 text-[0.65rem] text-gold transition-opacity hover:opacity-70"
              >
                Get in touch
              </a>
              {site.cvPath ? (
                <a
                  href={site.cvPath}
                  className="tracked-caps-tight border-b border-gold-hairline pb-1 text-[0.65rem] text-ink-muted transition-colors hover:text-gold"
                >
                  Download CV
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
