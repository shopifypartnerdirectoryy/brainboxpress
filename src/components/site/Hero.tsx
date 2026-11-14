import { ArrowRight } from "lucide-react";

import heroImage from "@/assets/hero-books.webp";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="paper relative scroll-mt-24 overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-4 text-navy">
            <span className="gold-rule" aria-hidden="true" />
            BrainboxPress
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold-deep sm:text-xs">
            <span>Ebook Promotion</span>
            <span className="text-gold" aria-hidden="true">|</span>
            <span>Author Outreach</span>
            <span className="text-gold" aria-hidden="true">|</span>
            <span>Book Marketing</span>
          </p>
          <h1
            id="hero-title"
            className="mt-8 text-[3.1rem] leading-[0.98] text-navy sm:text-7xl lg:text-[5.6rem]"
          >
            Every Book Deserves to Be <em className="font-serif italic text-gold-deep">Discovered.</em>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Helping authors showcase their books through creative promotional strategies, professional visual
            content and thoughtful marketing solutions designed to connect books with potential readers.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="navy" size="xl">
              <a href="#services">
                Explore Our Services <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outlineNavy" size="xl">
              <a href="#contact">Start a Conversation</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -right-4 -top-4 hidden h-full w-full border border-gold/60 sm:block lg:-right-6 lg:-top-6" />
          <figure className="relative overflow-hidden bg-navy shadow-editorial">
            <img
              src={heroImage}
              alt="Navy linen hardcover books with gold foil spines, a brass bookmark and a fountain pen arranged on ivory linen"
              width={1600}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-[70%_center] sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent px-6 pb-5 pt-16 text-navy-foreground">
              <span className="font-serif text-lg italic">Presented with care.</span>
              <span className="eyebrow text-gold">Author Promotion</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Service ribbon */}
      <div className="border-y border-navy-soft bg-navy py-5 text-navy-foreground" aria-label="Our services">
        <div className="flex overflow-hidden">
          <ul className="animate-marquee flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
            {[...SERVICES, ...SERVICES].map((s, i) => (
              <li key={`${s.id}-${i}`} aria-hidden={i >= SERVICES.length} className="flex items-center gap-10">
                <span className="font-serif text-xl italic text-navy-foreground/90">{s.title}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
