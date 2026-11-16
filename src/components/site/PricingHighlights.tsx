import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { emailMarketingPrice, formatPrice, priceSummary, SERVICES, type Service } from "@/lib/services";

import { useEnquiry } from "./enquiry-context";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function pricingDetail(s: Service): string[] {
  if (s.id === "email-marketing") {
    return [1000, 5000, 10000].map((n) => `${n.toLocaleString("en-US")} contacts — ${formatPrice(emailMarketingPrice(n))}`);
  }
  if (s.quoteBasis) return [s.quoteBasis];
  if (s.packages) {
    return s.packages
      .filter((p) => p.price !== undefined)
      .map((p) => `${p.name}${p.detail ? ` (${p.detail})` : ""} — ${formatPrice(p.price!)}`);
  }
  return [];
}

export function PricingHighlights() {
  const { requestService } = useEnquiry();

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="paper scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading
            id="pricing-title"
            eyebrow="Pricing Highlights"
            title={
              <>
                Transparent pricing, <em className="italic text-gold-deep">at a glance.</em>
              </>
            }
          />
          <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground lg:justify-self-end">
            Every price below matches the full service descriptions. Prices are in US dollars. Where a service is
            priced by quote, we'll confirm the details with you before any work begins.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ul className="divide-y divide-border border-y border-border bg-card">
            {SERVICES.map((s) => {
              const details = pricingDetail(s);
              return (
                <li key={s.id} className="grid gap-4 px-5 py-6 sm:px-8 md:grid-cols-[1fr_1.4fr_16rem] md:items-center md:gap-8">
                  <div>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group inline-flex items-center gap-2 font-serif text-2xl text-navy hover:text-gold-deep"
                    >
                      {s.title}
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                    <p className="mt-1 font-serif text-xl text-gold-deep md:hidden">{priceSummary(s)}</p>
                  </div>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    {details.length > 0 ? (
                      <ul className="flex flex-wrap gap-x-5 gap-y-1">
                        {details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{s.summary}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-6 md:justify-end">
                    <span className="hidden whitespace-nowrap font-serif text-2xl text-navy md:inline">{priceSummary(s)}</span>
                    <Button type="button" variant="outlineNavy" size="sm" className="min-h-10 px-4" onClick={() => requestService(s.id)}>
                      Enquire<span className="sr-only"> about {s.title}</span>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
