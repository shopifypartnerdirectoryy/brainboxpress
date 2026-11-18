import { CalendarDays } from "lucide-react";

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { visibleDepartments } from "@/lib/departments";
import { getService, SERVICES, SOCIAL_MEDIA_PACKAGES, type ServiceId } from "@/lib/services";

import { EmailMarketingPanel } from "./EmailMarketingPanel";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceCard } from "./ServiceCard";
import { SERVICE_ICONS } from "./service-icons";
import { SocialPackageCard } from "./SocialPackageCard";

const ROW_ONE: ServiceId[] = ["tiktok-book-feature", "instagram-book-feature", "book-trailer"];
const ROW_TWO: ServiceId[] = ["book-mockup", "audiobook", "website-design", "website-redesign", "goodreads-listopia", "book-challenge"];

function CardGrid({ ids }: { ids: ServiceId[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ids.map((id, i) => {
        const s = getService(id)!;
        return (
          <Reveal key={id} delay={(i % 3) * 80} className="h-full">
            <ServiceCard service={s} icon={SERVICE_ICONS[id]} />
          </Reveal>
        );
      })}
    </div>
  );
}

export function Services() {
  const social = getService("social-media-management")!;

  return (
    <section id="services" aria-labelledby="services-title" className="paper scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Our Services"
            title={
              <>
                Ways to grow <em className="italic text-gold-deep">your book's reach.</em>
              </>
            }
          />
          <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
            Every service is clearly described and transparently priced, so you can understand your options before
            proceeding. Select any service or package to begin an enquiry.
          </p>
        </Reveal>

        <div className="mt-14">
          <CardGrid ids={ROW_ONE} />
        </div>

        {/* Service 04 — Social Media Management */}
        <Reveal className="mt-6">
          <article aria-labelledby="service-social-media-management" className="relative overflow-hidden bg-navy px-6 py-14 text-navy-foreground sm:px-12 lg:px-16 lg:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-gold/25" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
              <div>
                <div className="flex items-center gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 text-gold">
                    <CalendarDays className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-5xl leading-none text-gold" aria-hidden="true">
                    {social.number}
                  </span>
                </div>
                <h3 id="service-social-media-management" className="mt-6 text-4xl leading-tight sm:text-5xl">
                  <span className="sr-only">Service {social.number}: </span>
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

        {/* Service 05 — Email Marketing */}
        <Reveal className="mt-6">
          <EmailMarketingPanel />
        </Reveal>

        <div className="mt-6">
          <CardGrid ids={ROW_TWO} />
        </div>

        <Reveal className="mt-16 border-t-2 border-gold bg-card p-7 shadow-editorial sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow text-gold-deep">The full catalogue</p>
              <h3 className="mt-3 text-4xl leading-tight text-navy">
                {SERVICES.length} services across six departments
              </h3>
            </div>
            <Button asChild variant="outlineNavy" size="xl">
              <Link to="/services">
                Explore All Services <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDepartments().map((d) => (
              <li key={d.id}>
                <Link to="/services" hash={d.id} className="font-serif text-2xl text-navy hover:text-gold-deep">
                  {d.title}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {d.services.map((x) => x.title).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
