import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { emailMarketingPrice, formatPrice, getService } from "@/lib/services";
import { SITE } from "@/lib/site";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function price(id: Parameters<typeof getService>[0]) {
  return formatPrice(getService(id)!.price!);
}

const trailer = getService("book-trailer")!.packages!;
const challenge = getService("book-challenge")!.packages!;

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What does BrainboxPress do?",
    a: "BrainboxPress is an author-services and book-growth brand. We help authors present their books professionally and reach new readers through TikTok and Instagram book features, book trailers, social media management, email marketing, audiobook services, author websites, Goodreads Listopia placement and book challenges.",
  },
  {
    q: "How much do your services cost?",
    a: `Every price is published on this website. For example, the TikTok Book Feature is ${price("tiktok-book-feature")} per book, the Instagram Book Feature is ${price("instagram-book-feature")} per book and book trailers start at ${formatPrice(trailer[0]!.price!)}. Audiobook services are priced by custom quote. Prices are in US dollars.`,
  },
  {
    q: "What is the difference between the TikTok and Instagram Book Features?",
    a: `They are two separate services, each prepared for its own platform. The TikTok Book Feature (${price("tiktok-book-feature")} per book) presents your book's cover, title and author, two to three story highlights, a direct book link and a clean closing screen, with proposed wording for your approval. The Instagram Book Feature (${price("instagram-book-feature")} per book) is prepared specifically for Instagram audiences.`,
  },
  {
    q: "How long are your book trailers?",
    a: `Basic is a 15-second trailer (${formatPrice(trailer[0]!.price!)}), Standard is a 30-second trailer (${formatPrice(trailer[1]!.price!)}) and Premium is a 60-second — one-minute — trailer (${formatPrice(trailer[2]!.price!)}).`,
  },
  {
    q: "How is email marketing priced?",
    a: `Email marketing is ${price("email-marketing")} per contact. For example, 1,000 contacts is ${formatPrice(emailMarketingPrice(1000))}, 5,000 contacts is ${formatPrice(emailMarketingPrice(5000))} and 10,000 contacts is ${formatPrice(emailMarketingPrice(10000))}.`,
  },
  {
    q: "How is audiobook pricing calculated?",
    a: "Audiobook pricing is based on the number of pages in your book. Send us your page count through the enquiry form and we'll prepare a custom quote.",
  },
  {
    q: "What are the Book Challenge packages?",
    a: `The Book Challenge is available as Basic (${formatPrice(challenge[0]!.price!)}), Standard (${formatPrice(challenge[1]!.price!)}) and Premium (${formatPrice(challenge[2]!.price!)}). Get in touch and we'll explain how each package works for your book.`,
  },
  {
    q: "Do you guarantee sales, views or rankings?",
    a: "No. Our services are designed to present your book professionally and improve its discoverability, but no honest promotional service can guarantee sales, views, reviews, rankings or reader numbers.",
  },
  {
    q: "Will I see the content before it is shared?",
    a: "Where applicable, yes. For example, every TikTok Book Feature includes proposed wording for your review and approval.",
  },
  {
    q: "How do I get started?",
    a: `Choose a service or package and send us an enquiry using the form below, or email ${SITE.generalEmail}. For help with an existing order, contact ${SITE.supportEmail}.`,
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-card py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="Frequently Asked Questions"
            title={
              <>
                Answers for <em className="italic text-gold-deep">authors.</em>
              </>
            }
            intro="Clear information about our services, pricing and process. Can't find what you need? Send us a message."
          />
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="border-t border-border">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="py-5 text-left font-serif text-xl text-navy hover:no-underline sm:text-2xl [&>svg]:text-gold-deep">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[0.98rem] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
