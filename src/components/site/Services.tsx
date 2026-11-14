import {
  BookCopy,
  CalendarDays,
  Clapperboard,
  Flag,
  Library,
  MonitorSmartphone,
  PenTool,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { SERVICES, SOCIAL_MEDIA_PACKAGES, type ServiceId } from "@/lib/services";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { SocialPackageCard } from "./SocialPackageCard";

const ICONS: Record<ServiceId, LucideIcon> = {
  "tiktok-instagram-feature": Smartphone,
  "book-trailer": Clapperboard,
  "book-mockup": BookCopy,
  "social-media-management": CalendarDays,
  "website-design": MonitorSmartphone,
  "website-redesign": PenTool,
  "goodreads-listopia": Library,
  "book-challenge": Flag,
};

export function Services() {
  const first = SERVICES.slice(0, 3);
  const social = SERVICES.find((s) => s.id === "social-media-management")!;
  const rest = SERVICES.slice(4);

  return (
    <section id="services" aria-labelledby="services-title" className="paper scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Professional Services & Pricing"
            title={
              <>
                Eight ways to present <em className="italic text-gold-deep">your book.</em>
              </>
            }
          />
          <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
            Every service is clearly described and transparently priced, so you can understand your options before
            proceeding. Select any service or package to begin an enquiry.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {first.map((s, i) => (
            <Reveal key={s.id} delay={i * 90} className={i === 2 ? "h-full md:col-span-2 lg:col-span-1" : "h-full"}>
              <ServiceCard service={s} icon={ICONS[s.id]} />
            </Reveal>
          ))}
        </div>

        {/* Service 04 — Social Media Management */}
        <Reveal className="mt-6">
          <article aria-labelledby="service-social-media-management" className="relative overflow-hidden bg-navy px-6 py-14 text-navy-foreground sm:px-12 lg:px-16 lg:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-gold/20" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-gold/15" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
              <div>
                <div className="flex items-center gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <CalendarDays className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="eyebrow text-gold">
                    <span className="sr-only">Service </span>
                    {social.number}
                  </span>
                </div>
                <h3 id="service-social-media-management" className="mt-6 text-4xl leading-tight sm:text-5xl">
                  {social.title}
                </h3>
              </div>
              <div className="space-y-4 text-[0.98rem] leading-relaxed text-navy-muted">
                {social.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="relative mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-0">
              {SOCIAL_MEDIA_PACKAGES.map((pkg) => (
                <SocialPackageCard key={pkg.packageId} pkg={pkg} />
              ))}
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 90} className="h-full">
              <ServiceCard service={s} icon={ICONS[s.id]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
