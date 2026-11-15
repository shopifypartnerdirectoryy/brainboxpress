// Head-metadata helpers. Canonical / og:url use the published address that serves this project today;
// switch PUBLIC_ORIGIN to https://brainboxworld.net once that domain is connected to this project.
import { priceSummary, SERVICES, type Service } from "./services";
import { SITE, SOCIALS } from "./site";

export const PUBLIC_ORIGIN = "https://brainboxpress.lovable.app";

const ORG_ID = `${PUBLIC_ORIGIN}/#organization`;

export function organizationSchema(description: string) {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    slogan: SITE.tagline,
    url: SITE.url,
    logo: SITE.logoImage,
    description,
    email: SITE.generalEmail,
    sameAs: SOCIALS.map((s) => s.href),
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", email: SITE.generalEmail },
      { "@type": "ContactPoint", contactType: "customer support", email: SITE.supportEmail },
    ],
  };
}

export function servicePageUrl(s: Pick<Service, "slug">) {
  return `${PUBLIC_ORIGIN}/services/${s.slug}`;
}

/** Offers for a service; quote-only services have none (no invented prices). */
export function serviceOffers(s: Service) {
  if (s.quoteBasis) return [];
  if (s.id === "email-marketing") {
    return [
      {
        "@type": "Offer",
        name: `${s.title} — ${priceSummary(s)}`,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: s.price,
          priceCurrency: "USD",
          unitText: "contact",
        },
      },
    ];
  }
  if (s.packages) {
    return s.packages
      .filter((p) => p.price !== undefined)
      .map((p) => ({
        "@type": "Offer",
        name: `${s.title} — ${p.name}${p.detail ? ` (${p.detail})` : ""}`,
        price: p.price,
        priceCurrency: "USD",
      }));
  }
  return [{ "@type": "Offer", name: s.priceUnit ? `${s.title} (${s.priceUnit})` : s.title, price: s.price, priceCurrency: "USD" }];
}

export function serviceSchema(s: Service) {
  const offers = serviceOffers(s);
  return {
    "@type": "Service",
    "@id": `${servicePageUrl(s)}#service`,
    name: s.title,
    serviceType: s.title,
    description: s.seo.description,
    url: servicePageUrl(s),
    provider: { "@id": ORG_ID },
    ...(offers.length ? { offers } : {}),
  };
}

export function homeSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...organizationSchema(description),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "BrainboxPress author services",
          itemListElement: SERVICES.map((s) => ({
            "@type": "OfferCatalog",
            name: s.title,
            url: servicePageUrl(s),
            itemListElement: serviceOffers(s).map((o) => ({ ...o, itemOffered: { "@id": `${servicePageUrl(s)}#service` } })),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${PUBLIC_ORIGIN}/#website`,
        url: PUBLIC_ORIGIN,
        name: SITE.name,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function servicePageSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...organizationSchema(`${SITE.name} — ${SITE.tagline}`) },
      serviceSchema(s),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${PUBLIC_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${PUBLIC_ORIGIN}/#services` },
          { "@type": "ListItem", position: 3, name: s.title, item: servicePageUrl(s) },
        ],
      },
    ],
  };
}
