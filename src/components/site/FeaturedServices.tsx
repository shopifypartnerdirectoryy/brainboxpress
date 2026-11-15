import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import socialDesigns from "@/assets/portfolio-social-designs-640.webp";
import socialFeature from "@/assets/portfolio-social-feature-640.webp";
import trailer from "@/assets/portfolio-trailer-640.webp";
import { Button } from "@/components/ui/button";
import { FEATURED_SERVICE_IDS, getService, priceSummary, type ServiceId } from "@/lib/services";

import { useEnquiry } from "./enquiry-context";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const VISUALS: Partial<Record<ServiceId, { src: string; alt: string }>> = {
  "tiktok-book-feature": { src: socialFeature, alt: "Smartphone displaying a vertical video of book pages beside a navy paperback and dried flowers" },
  "book-trailer": { src: trailer, alt: "Cinematic still of an ornate hardcover book on a dark table lit by a beam of golden light" },
  "social-media-management": { src: socialDesigns, alt: "Grid of square navy and gold social media post designs featuring book covers and landscapes" },
};

export function FeaturedServices() {
  const { requestService } = useEnquiry();

  return (
    <section aria-labelledby="featured-title" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="featured-title" eyebrow="Featured Services" title="Popular ways to begin." />
          <a href="#services" className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep">
            View all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURED_SERVICE_IDS.map((id, i) => {
            const s = getService(id)!;
            const visual = VISUALS[id];
            return (
              <Reveal key={id} delay={i * 90} className="h-full">
                <article aria-labelledby={`featured-${id}`} className="group flex h-full flex-col border border-border bg-card transition-shadow duration-500 hover:shadow-editorial">
                  {visual && (
                    <div className="relative overflow-hidden bg-navy">
                      <img
                        src={visual.src}
                        alt={visual.alt}
                        width={640}
                        height={486}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-3 top-3 rounded-sm bg-background/95 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy">
                        Illustrative visual
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <p className="eyebrow text-gold-deep">{priceSummary(s)}</p>
                    <h3 id={`featured-${id}`} className="mt-3 text-3xl leading-tight text-navy">
                      {s.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{s.summary}</p>
                    <div className="mt-auto flex flex-col gap-4 pt-7">
                      <Button type="button" variant="navy" size="xl" onClick={() => requestService(s.id)}>
                        {s.cta}
                      </Button>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-deep"
                      >
                        {s.title} details <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
