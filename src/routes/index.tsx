import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { Commitment } from "@/components/site/Commitment";
import { Contact } from "@/components/site/Contact";
import { EnquiryProvider } from "@/components/site/enquiry-context";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Portfolio } from "@/components/site/Portfolio";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { WhyChoose } from "@/components/site/WhyChoose";
import { SERVICES, SOCIAL_MEDIA_PACKAGES } from "@/lib/services";
import { SITE, SOCIALS } from "@/lib/site";

const TITLE = "BrainboxPress | Ebook Promotion, Author Outreach & Book Marketing";
const DESCRIPTION =
  "BrainboxPress helps authors showcase their books through creative ebook promotion, book trailers, social media marketing, author websites and professional promotional services.";

function structuredData() {
  const offers = SERVICES.flatMap((s) => {
    if (s.id === "social-media-management") {
      return SOCIAL_MEDIA_PACKAGES.map((p) => ({
        "@type": "Offer",
        name: `${s.title} — ${p.name} (${p.durationDays} Days)`,
        price: p.price,
        priceCurrency: "USD",
        itemOffered: { "@type": "Service", name: s.title, provider: { "@id": `${SITE.url}/#organization` } },
      }));
    }
    if (s.packages) {
      return s.packages.map((p) => ({
        "@type": "Offer",
        name: `${s.title} — ${p.name}`,
        price: p.price,
        priceCurrency: "USD",
        itemOffered: { "@type": "Service", name: s.title, provider: { "@id": `${SITE.url}/#organization` } },
      }));
    }
    return [
      {
        "@type": "Offer",
        name: s.priceQualifier ? `${s.title} (${s.priceQualifier})` : s.title,
        price: s.price,
        priceCurrency: "USD",
        itemOffered: { "@type": "Service", name: s.title, provider: { "@id": `${SITE.url}/#organization` } },
      },
    ];
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/apple-touch-icon.png`,
        description: DESCRIPTION,
        email: SITE.generalEmail,
        sameAs: SOCIALS.map((s) => s.href),
        contactPoint: [
          { "@type": "ContactPoint", contactType: "sales", email: SITE.generalEmail },
          { "@type": "ContactPoint", contactType: "customer support", email: SITE.supportEmail },
        ],
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Author promotion services", itemListElement: offers },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { property: "og:site_name", content: SITE.name },
      { property: "og:image", content: SITE.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Navy and gold hardcover books arranged on ivory linen — BrainboxPress" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData()) }],
  }),
  component: Index,
});

function Index() {
  return (
    <EnquiryProvider>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Process />
        <Portfolio />
        <Commitment />
        <Contact />
      </main>
      <Footer />
    </EnquiryProvider>
  );
}
