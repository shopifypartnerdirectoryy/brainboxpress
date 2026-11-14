import { Globe, LifeBuoy, Mail } from "lucide-react";

import { SITE } from "@/lib/site";

import { EnquiryForm } from "./EnquiryForm";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialIcons";

export function Contact() {
  const details = [
    { icon: Globe, label: "Website", value: SITE.displayUrl, href: SITE.url },
    { icon: Mail, label: "General Enquiries", value: SITE.generalEmail, href: `mailto:${SITE.generalEmail}` },
    { icon: LifeBuoy, label: "Customer Support", value: SITE.supportEmail, href: `mailto:${SITE.supportEmail}` },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="paper scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact & Author Enquiries"
            title={
              <>
                Let's Talk About <em className="italic text-gold-deep">Your Book.</em>
              </>
            }
            intro="Whether you're preparing to launch a new title or looking to give an existing book more visibility, let's discuss how the right promotional service can support your goals."
          />

          <dl className="mt-12 divide-y divide-border border-y border-border">
            <div className="py-5">
              <dt className="eyebrow text-gold-deep">Brand</dt>
              <dd className="mt-1 font-serif text-2xl text-navy">BrainboxPress</dd>
            </div>
            {details.map((d) => (
              <div key={d.label} className="flex items-center gap-5 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-navy">
                  <d.icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="eyebrow text-gold-deep">{d.label}</dt>
                  <dd className="mt-1">
                    <a
                      href={d.href}
                      {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="break-words text-lg text-navy underline decoration-gold/0 underline-offset-4 transition-colors hover:decoration-gold"
                    >
                      {d.value}
                    </a>
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <p className="eyebrow text-navy">Follow BrainboxPress</p>
            <SocialLinks className="mt-4" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div id="contact-form" className="scroll-mt-28 relative border border-border bg-card p-7 shadow-editorial sm:p-12">
            <span aria-hidden="true" className="absolute left-0 top-0 h-1 w-24 bg-gold" />
            <h3 className="text-3xl text-navy sm:text-4xl">Author Enquiry Form</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us about your book and the service you're interested in — we'll reply by email.
            </p>
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
