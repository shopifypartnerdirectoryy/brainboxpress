import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { Commitment } from "@/components/site/Commitment";
import { Contact } from "@/components/site/Contact";
import { Discoverability } from "@/components/site/Discoverability";
import { EnquiryProvider } from "@/components/site/enquiry-context";
import { Faq } from "@/components/site/Faq";
import { FeaturedServices } from "@/components/site/FeaturedServices";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Portfolio } from "@/components/site/Portfolio";
import { PricingHighlights } from "@/components/site/PricingHighlights";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { WhyChoose } from "@/components/site/WhyChoose";
import { homeSchema, PUBLIC_ORIGIN } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "BrainboxPress | Book Marketing & Author Promotion Services";
const DESCRIPTION =
  "Book promotion and author marketing services from BrainboxPress: TikTok and Instagram book features, book trailers, social media management, email marketing, audiobooks and author websites.";

type HomeSearch = { service?: string; package?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: { service?: unknown; package?: unknown }): HomeSearch => ({
    ...(typeof search.service === "string" ? { service: search.service } : {}),
    ...(typeof search.package === "string" ? { package: search.package } : {}),
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${PUBLIC_ORIGIN}/` },
      { property: "og:image", content: SITE.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE.name} logo — ${SITE.tagline}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [{ rel: "canonical", href: `${PUBLIC_ORIGIN}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(homeSchema(DESCRIPTION)) }],
  }),
  component: Index,
});

function Index() {
  const search = Route.useSearch();
  return (
    <EnquiryProvider initial={search}>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Discoverability />
        <FeaturedServices />
        <Services />
        <WhyChoose />
        <Process />
        <Portfolio />
        <PricingHighlights />
        <Faq />
        <Commitment />
        <Contact />
      </main>
      <Footer />
    </EnquiryProvider>
  );
}
