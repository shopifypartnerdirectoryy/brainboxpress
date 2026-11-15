import { Link } from "@tanstack/react-router";
import { Compass, Megaphone, Sprout, type LucideIcon } from "lucide-react";

import { SERVICES, type ServiceCategory } from "@/lib/services";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const PILLARS: { category: ServiceCategory; title: string; text: string; icon: LucideIcon }[] = [
  {
    category: "visibility",
    title: "Book Visibility",
    text: "Introduce your book to new audiences with platform-ready features, trailers and polished visual presentation.",
    icon: Megaphone,
  },
  {
    category: "presence",
    title: "Author Presence",
    text: "Build a consistent, professional author identity through social media content and a well-presented website.",
    icon: Sprout,
  },
  {
    category: "reach",
    title: "Reader Reach",
    text: "Explore further ways to reach readers and listeners — by email, on Goodreads, through challenges and in audio.",
    icon: Compass,
  },
];

export function Discoverability() {
  return (
    <section id="growth" aria-labelledby="growth-title" className="paper scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            id="growth-title"
            eyebrow="Author Growth & Book Discoverability"
            align="center"
            title={
              <>
                Helping the right readers <em className="italic text-gold-deep">discover your book.</em>
              </>
            }
            intro="A great book still needs to be seen. BrainboxPress brings together the visibility, presence and reach that help authors present their work with confidence and grow at their own pace."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.category} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col border-t-2 border-gold bg-card p-8 shadow-[0_18px_40px_-34px] shadow-navy/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold">
                  <p.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-3xl text-navy">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.text}</p>
                <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                  {SERVICES.filter((s) => s.category === p.category).map((s) => (
                    <li key={s.id}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="inline-flex items-center gap-3 font-medium text-navy transition-colors hover:text-gold-deep"
                      >
                        <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
