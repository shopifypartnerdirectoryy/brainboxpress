import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmailMarketingPanel } from "@/components/site/EmailMarketingPanel";
import { EnquiryProvider, useEnquiry } from "@/components/site/enquiry-context";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ServicePrice } from "@/components/site/ServiceCard";
import { SERVICE_ICONS } from "@/components/site/service-icons";
import { SocialPackageCard } from "@/components/site/SocialPackageCard";
import { servicePageSchema, servicePageUrl } from "@/lib/seo";
import { formatPrice, getServiceBySlug, SERVICES, SOCIAL_MEDIA_PACKAGES, type Service } from "@/lib/services";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ params }) => {
    const s = getServiceBySlug(params.slug);
    if (!s) {
      return { meta: [{ title: "Service not found | BrainboxPress" }, { name: "robots", content: "noindex" }] };
    }
    const url = servicePageUrl(s);
    return {
      meta: [
        { title: s.seo.title },
        { name: "description", content: s.seo.description },
        { property: "og:title", content: s.seo.title },
        { property: "og:description", content: s.seo.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: SITE.ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: `${SITE.name} logo — ${SITE.tagline}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: s.seo.title },
        { name: "twitter:description", content: s.seo.description },
        { name: "twitter:image", content: SITE.ogImage },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(servicePageSchema(s)) }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const service = getServiceBySlug(slug)!;
  return (
    <EnquiryProvider mode="navigate">
      <Header onHome={false} />
      <main id="main">
        <ServiceDetail service={service} />
        <RelatedServices current={service} />
      </main>
      <Footer />
    </EnquiryProvider>
  );
}

function ServiceDetail({ service }: { service: Service }) {
  const { requestService } = useEnquiry();
  const Icon = SERVICE_ICONS[service.id];
  const isSocial = service.id === "social-media-management";
  const isEmail = service.id === "email-marketing";

  return (
    <>
      <section aria-labelledby="service-title" className="paper border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:pb-24 lg:pt-12">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/services" className="hover:text-navy">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-navy">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-card text-navy">
                  <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="eyebrow text-gold-deep">Service {service.number}</span>
              </div>
              <h1 id="service-title" className="mt-6 text-5xl leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
                {service.title}
              </h1>
              <div className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {service.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {service.audience && (
                <p className="mt-8 max-w-2xl border-l-2 border-gold pl-5 text-charcoal">
                  <span className="eyebrow mb-1 block font-sans text-navy">Who it's for</span>
                  {service.audience}
                </p>
              )}
              {service.scope && (
                <div className="mt-10">
                  <h2 className="eyebrow font-sans text-navy">What a quotation can cover</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.scope.map((item) => (
                      <li key={item} className="flex gap-3 text-charcoal">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    The exact scope, price and timeline are agreed with you in writing before any work begins.
                  </p>
                </div>
              )}
              {service.inclusions && (
                <div className="mt-10">
                  <h2 className="eyebrow font-sans text-navy">What's included</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.inclusions.map((item) => (
                      <li key={item} className="flex gap-3 text-charcoal">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside aria-labelledby="price-title" className="self-start border-t-4 border-gold bg-card p-7 shadow-editorial sm:p-9">
              <h2 id="price-title" className="eyebrow font-sans text-navy">
                Pricing
              </h2>
              <div className="mt-5">
                {service.packages && !isEmail ? (
                  <ul className="divide-y divide-border border-y border-border">
                    {service.packages.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => requestService(service.id, p.id)}
                          aria-label={`Enquire about ${service.title}: ${p.formLabel}`}
                          className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left transition-colors hover:text-navy"
                        >
                          <span>
                            <span className="block font-semibold text-navy">{p.name}</span>
                            {p.detail && <span className="block text-xs text-muted-foreground">{p.detail}</span>}
                          </span>
                          {p.price !== undefined && <span className="font-serif text-2xl text-navy">{formatPrice(p.price)}</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ServicePrice service={service} />
                )}
              </div>
              {service.note && <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{service.note}</p>}
              <Button type="button" variant="gold" size="xl" className="mt-7 w-full" onClick={() => requestService(service.id)}>
                {service.cta}
              </Button>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Opens our enquiry form with this service selected. Prices are in US dollars.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {isSocial && (
        <section aria-labelledby="packages-title" className="bg-navy py-16 text-navy-foreground lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 id="packages-title" className="text-4xl sm:text-5xl">
              Compare packages
            </h2>
            <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-0">
              {SOCIAL_MEDIA_PACKAGES.map((pkg) => (
                <SocialPackageCard key={pkg.packageId} pkg={pkg} headingAs="h3" />
              ))}
            </div>
          </div>
        </section>
      )}

      {isEmail && (
        <section aria-label="Email marketing pricing examples" className="bg-card py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <EmailMarketingPanel headingLevel="h2" showDetailsLink={false} />
          </div>
        </section>
      )}
    </>
  );
}

function RelatedServices({ current }: { current: Service }) {
  const related = SERVICES.filter((s) => s.id !== current.id && s.category === current.category).slice(0, 3);
  const others = related.length ? related : SERVICES.filter((s) => s.id !== current.id).slice(0, 3);

  return (
    <section aria-labelledby="related-title" className="paper py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 id="related-title" className="text-4xl text-navy sm:text-5xl">
            Related services
          </h2>
          <Link to="/" hash="services" className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {others.map((s) => {
            const Icon = SERVICE_ICONS[s.id];
            return (
              <li key={s.id}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col border border-border bg-card p-7 transition-[border-color,box-shadow] hover:border-gold/70 hover:shadow-editorial"
                >
                  <Icon className="h-6 w-6 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
                  <span className="mt-5 font-serif text-2xl text-navy">{s.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-navy">
                    View service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
