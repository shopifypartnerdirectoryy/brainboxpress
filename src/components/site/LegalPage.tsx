import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { PageIntro, PageShell } from "@/components/site/PageShell";
import { SITE } from "@/lib/site";

type LegalPageProps = {
  title: string;
  intro: string;
  updated: string;
  sections: { id: string; heading: string; body: ReactNode }[];
};

export function LegalNav() {
  return (
    <nav aria-label="Legal policies" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gold-deep">
      <Link className="underline underline-offset-4" to="/privacy">Privacy Policy</Link>
      <Link className="underline underline-offset-4" to="/terms">Terms of Service</Link>
      <Link className="underline underline-offset-4" to="/refund-policy">Refund and Cancellation Policy</Link>
    </nav>
  );
}

export function LegalPage({ title, intro, updated, sections }: LegalPageProps) {
  return (
    <PageShell>
      <div className="min-w-0 break-words">
        <PageIntro eyebrow="BrainboxPress policies" title={title} intro={intro}>
          <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
            This policy is a general draft and should be reviewed by a qualified legal professional.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
        </PageIntro>

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-[70ch]">
            <LegalNav />

            <nav aria-label="On this page" className="mt-8 rounded-lg border border-border bg-mist p-5 sm:p-7">
              <h2 className="font-serif text-2xl text-navy">On this page</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a className="text-gold-deep underline underline-offset-4" href={`#${section.id}`}>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-12 space-y-10">
              {sections.map((section) => (
                <section key={section.id} aria-labelledby={section.id} className="min-w-0">
                  <h2 id={section.id} className="scroll-mt-28 font-serif text-3xl leading-tight text-navy">
                    {section.heading}
                  </h2>
                  <div className="mt-4 max-w-[70ch] space-y-4 leading-relaxed text-muted-foreground [&_a]:break-words [&_a]:text-gold-deep [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>

            <aside aria-label="Contact BrainboxPress" className="mt-12 rounded-lg border border-gold bg-card p-5 shadow-editorial sm:p-8">
              <h2 className="font-serif text-2xl text-navy">Contact BrainboxPress</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                General enquiries:{" "}
                <a className="break-words text-gold-deep underline underline-offset-4" href={`mailto:${SITE.generalEmail}`}>{SITE.generalEmail}</a>
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Support and policy requests:{" "}
                <a className="break-words text-gold-deep underline underline-offset-4" href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
              </p>
              <div className="mt-6"><LegalNav /></div>
            </aside>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
