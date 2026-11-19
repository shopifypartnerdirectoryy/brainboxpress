import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import heroImage from "@/assets/hero-books.webp";
import heroImageSmall from "@/assets/hero-books-800.webp";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const AREAS = [
  "Publishing Preparation",
  "Book Optimization",
  "Book Marketing",
  "Author Branding",
  "Reader Engagement",
  "Audio & Translation",
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative scroll-mt-24 overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-4 text-gold-deep">
            <span className="gold-rule" aria-hidden="true" />
            {SITE.tagline}
          </p>
          <h1 id="hero-title" className="mt-7 text-[2.6rem] leading-[1.02] text-navy sm:text-6xl lg:text-[4.4rem]">
            Helping Authors Get <em className="font-serif italic text-gold-deep">Discovered</em>, Build Their Presence &amp;
            Reach More Readers.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            BrainboxPress is an author-services and book-growth brand. From editing, formatting and covers to Amazon
            optimization, book promotion, author websites and reader engagement, we help authors present their books
            professionally and reach new readers — with clear, honest pricing.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to="/services">
                Explore Our Services <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outlineNavy" size="xl">
              <a href="#contact">Discuss Your Book</a>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Not sure where to start?{" "}
            <Link to="/assessment" className="font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold-deep">
              Request a free Book Visibility Assessment
            </Link>
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy">
            {["Clear, published pricing", "Author approval where applicable", "Honest, realistic communication"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -right-4 -top-4 hidden h-full w-full border-2 border-gold/70 sm:block lg:-right-6 lg:-top-6" />
          <figure className="relative overflow-hidden bg-navy shadow-editorial">
            <img
              src={heroImage}
              srcSet={`${heroImageSmall} 800w, ${heroImage} 1600w`}
              sizes="(min-width: 1024px) 560px, 100vw"
              alt="Navy hardcover books with gold foil spines, a brass bookmark and a fountain pen arranged on linen"
              width={1600}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-[70%_center] sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent px-6 pb-5 pt-16 text-navy-foreground">
              <span className="font-serif text-lg italic">Presented with care.</span>
              <span className="eyebrow text-gold">Author Services</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Service areas */}
      <div className="border-y border-navy-soft bg-navy py-5 text-navy-foreground">
        <ul aria-label="Service areas" className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 sm:px-8">
          {AREAS.map((a, i) => (
            <li key={a} className="flex items-center gap-6">
              {i > 0 && <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />}
              <span className="font-serif text-lg italic text-navy-foreground/90 sm:text-xl">{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
