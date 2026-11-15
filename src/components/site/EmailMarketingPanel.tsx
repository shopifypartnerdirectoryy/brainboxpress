import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EMAIL_MARKETING_EXAMPLES, emailMarketingPrice, formatPrice, getService } from "@/lib/services";

import { useEnquiry } from "./enquiry-context";

/** Email Marketing: transparent per-contact pricing with worked examples. */
export function EmailMarketingPanel({ headingLevel = "h3", showDetailsLink = true }: { headingLevel?: "h2" | "h3"; showDetailsLink?: boolean }) {
  const { requestService } = useEnquiry();
  const service = getService("email-marketing")!;
  const Heading = headingLevel;

  return (
    <article aria-labelledby="service-email-marketing" className="border border-border bg-card px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-mist text-navy">
              <Mail className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
            </span>
            <span className="font-serif text-5xl leading-none text-gold" aria-hidden="true">
              {service.number}
            </span>
          </div>
          <Heading id="service-email-marketing" className="mt-6 text-4xl leading-tight text-navy sm:text-5xl">
            <span className="sr-only">Service {service.number}: </span>
            {service.title}
          </Heading>
          <div className="mt-5 space-y-3 text-[0.98rem] leading-relaxed text-muted-foreground">
            {service.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-border py-4">
            <span className="font-serif text-5xl leading-none text-navy">{formatPrice(service.price!)}</span>
            <span className="eyebrow text-gold-deep">{service.priceUnit}</span>
          </p>
          {service.note && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{service.note}</p>}
          <Button type="button" variant="gold" size="xl" className="mt-6 w-full sm:w-auto" onClick={() => requestService("email-marketing")}>
            {service.cta}
          </Button>
          {showDetailsLink && (
            <div>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep"
              >
                Email Marketing details <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>

        <div>
          <p className="eyebrow text-navy">Pricing examples</p>
          <ul className="mt-4 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border min-[420px]:grid-cols-2">
            {EMAIL_MARKETING_EXAMPLES.map((n) => (
              <li key={n} className="bg-card">
                <button
                  type="button"
                  onClick={() => requestService("email-marketing", `email-${n}`)}
                  aria-label={`Enquire about email marketing to ${n.toLocaleString("en-US")} contacts — ${formatPrice(emailMarketingPrice(n))}`}
                  className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition-colors hover:bg-mist"
                >
                  <span className="text-charcoal">{n.toLocaleString("en-US")} contacts</span>
                  <span className="font-serif text-2xl text-navy">{formatPrice(emailMarketingPrice(n))}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Need a different number of contacts? Every quantity is priced at {formatPrice(service.price!)} per contact.
          </p>
        </div>
      </div>
    </article>
  );
}
