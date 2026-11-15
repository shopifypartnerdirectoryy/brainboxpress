import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";

import { useEnquiry } from "./enquiry-context";

export function ServicePrice({ service, size = "lg" }: { service: Service; size?: "lg" | "md" }) {
  const big = size === "lg" ? "text-5xl" : "text-4xl";
  if (service.quoteBasis) {
    return (
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={cn("font-serif leading-none text-navy", size === "lg" ? "text-4xl" : "text-3xl")}>Custom Quote</span>
        <span className="eyebrow text-gold-deep">{service.quoteBasis}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className={cn("font-serif leading-none text-navy", big)}>{formatPrice(service.price!)}</span>
      {service.priceUnit && <span className="eyebrow text-gold-deep">{service.priceUnit}</span>}
    </div>
  );
}

export function ServiceCard({ service, icon: Icon, className }: { service: Service; icon: LucideIcon; className?: string }) {
  const { requestService } = useEnquiry();
  const headingId = `service-${service.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group relative flex h-full flex-col border border-border bg-card p-7 transition-[box-shadow,border-color] duration-500 hover:border-gold/70 hover:shadow-editorial sm:p-9",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-0 bg-gold transition-[width] duration-700 group-hover:w-full" />
      <div className="flex items-start justify-between gap-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-mist text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
          <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
        </span>
        <span className="font-serif text-5xl leading-none text-gold" aria-hidden="true">
          {service.number}
        </span>
      </div>

      <h3 id={headingId} className="mt-7 text-[1.85rem] leading-tight text-navy">
        <span className="sr-only">Service {service.number}: </span>
        {service.title}
      </h3>

      <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        {service.description.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {service.inclusions && (
        <ul className="mt-6 space-y-2.5 text-sm text-charcoal">
          {service.inclusions.map((item) => (
            <li key={item} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-8">
        {service.packages ? (
          <ul className="divide-y divide-border border-y border-border">
            {service.packages.map((pkg) => (
              <li key={pkg.id}>
                <button
                  type="button"
                  onClick={() => requestService(service.id, pkg.id)}
                  aria-label={`Enquire about ${service.title}: ${pkg.formLabel}`}
                  className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left text-sm text-charcoal transition-colors hover:text-navy"
                >
                  <span>
                    <span className="flex items-center gap-2 font-semibold text-navy">
                      {pkg.name}
                      <ArrowUpRight className="h-3.5 w-3.5 text-gold-deep opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </span>
                    {pkg.detail && <span className="mt-0.5 block text-xs text-muted-foreground">{pkg.detail}</span>}
                  </span>
                  {pkg.price !== undefined && <span className="font-serif text-2xl text-navy">{formatPrice(pkg.price)}</span>}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-y border-border py-4">
            <ServicePrice service={service} />
          </div>
        )}

        {service.note && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{service.note}</p>}

        <Button type="button" variant="outlineNavy" size="xl" className="mt-6 w-full" onClick={() => requestService(service.id)}>
          {service.cta}
        </Button>
        <Link
          to="/services/$slug"
          params={{ slug: service.slug }}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-deep"
        >
          {service.title} details <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
