import { Info } from "lucide-react";

import { PORTFOLIO, PORTFOLIO_LABELS } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="scroll-mt-20 bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="portfolio-title"
            eyebrow="Portfolio Showcase"
            title={
              <>
                Our Creative <em className="italic text-gold-deep">Work</em>
              </>
            }
            intro="Explore the types of creative promotional work and digital presentation services offered by BrainboxPress."
          />
          <p className="flex max-w-sm items-start gap-3 border-l-2 border-gold bg-ivory px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
            The visuals below are demonstration pieces that illustrate each service category. They are not client
            projects.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((item, i) => (
            <Reveal as="li" key={item.id} delay={(i % 3) * 90} className={cn(i % 3 === 1 && "lg:translate-y-10")}>
              <figure className="group">
                <div className="relative overflow-hidden bg-navy">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={1200}
                    height={912}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 bg-ivory/95 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-navy backdrop-blur">
                    {PORTFOLIO_LABELS[item.kind]}
                  </span>
                </div>
                <figcaption className="mt-5 flex items-start justify-between gap-6 border-b border-border pb-5">
                  <div>
                    <h3 className="text-2xl leading-snug text-navy">{item.category}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="font-serif text-2xl text-gold" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
