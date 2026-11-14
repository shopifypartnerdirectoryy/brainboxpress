import { HeartHandshake, Lightbulb, MessagesSquare, ReceiptText, Sparkles, type LucideIcon } from "lucide-react";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FEATURES: { n: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    n: "01",
    title: "Personalized Author Communication",
    text: "Every project begins with understanding the author's book, genre, audience and promotional objectives.",
    icon: MessagesSquare,
  },
  {
    n: "02",
    title: "Professional Presentation",
    text: "Carefully prepared promotional materials that respect the identity, message and visual character of every book.",
    icon: Sparkles,
  },
  {
    n: "03",
    title: "Clear Pricing",
    text: "Transparent service descriptions and clearly displayed pricing, allowing authors to understand their options before proceeding.",
    icon: ReceiptText,
  },
  {
    n: "04",
    title: "Creative Promotional Solutions",
    text: "Different promotional opportunities designed to support different types of books, authors and publishing objectives.",
    icon: Lightbulb,
  },
  {
    n: "05",
    title: "Author-Focused Approach",
    text: "Professional communication, organized delivery and author approval where applicable throughout the promotional process.",
    icon: HeartHandshake,
  },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow="Why Choose BrainboxPress?"
            title={
              <>
                Thoughtful Promotion. <em className="italic text-gold-deep">Professional Presentation.</em>
              </>
            }
          />
        </Reveal>

        <ol className="border-t border-border">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 70} className="group border-b border-border">
              <div className="grid grid-cols-[auto_1fr] gap-6 py-8 sm:grid-cols-[4rem_auto_1fr] sm:items-start sm:gap-8">
                <span className="hidden font-serif text-3xl text-gold sm:block" aria-hidden="true">
                  {f.n}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
                  <f.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl leading-snug text-navy sm:text-[1.7rem]">
                    <span className="sr-only">{f.n} — </span>
                    {f.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
