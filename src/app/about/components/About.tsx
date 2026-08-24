import { Prose } from "@/app/about/components/Prose";
import { Divider } from "@/components/ui/Divider";
import { Portrait } from "@/components/ui/Portrait";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/components/data/site";
import subpageStyles from "@/app/subpage.module.css";
import styles from "@/app/about/components/About.module.css";

export function About() {
  return (
    <div className={subpageStyles.pageShell}>
      <div className={styles.grid}>
        {/* Sticky on desktop so the portrait stays with the prose on a long bio. */}
        <div className={styles.portraitColumn}>
          <Portrait priority sizes="(max-width: 1024px) 80vw, 20rem" />
        </div>

        <div>
          <SectionHeading as="h1" eyebrow={site.role}>
            About
          </SectionHeading>

          <Prose paragraphs={site.bioLong} className={styles.prose} />

          <Divider className={styles.divider} />

          <div className={styles.contact}>
            <h2 className={`tracked-caps ${styles.contactHeading}`}>
              Working together
            </h2>
            <p className={styles.contactBody}>
              For commissions, score enquiries, and performance materials, the
              fastest route is email.
            </p>
            <div className={styles.contactRow}>
              <a
                href={`mailto:${site.email}`}
                className={`tracked-caps-tight ${styles.emailLink}`}
              >
                Get in touch
              </a>
              {site.cvPath ? (
                <a
                  href={site.cvPath}
                  className={`tracked-caps-tight ${styles.cvLink}`}
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
