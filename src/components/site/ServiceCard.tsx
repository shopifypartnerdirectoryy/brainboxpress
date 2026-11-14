import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";

import { useEnquiry } from "./enquiry-context";

export function ServiceCard({ service, icon: Icon, className }: { service: Service; icon: LucideIcon; className?: string }) {
  const { requestService } = useEnquiry();
  const headingId = `service-${service.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group relative flex h-full flex-col border border-border bg-card p-8 transition-[box-shadow,border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-editorial sm:p-10",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-gold transition-[width] duration-700 group-hover:w-full" />
      <div className="flex items-start justify-between gap-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-ivory text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
          <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
        </span>
        <span className="font-serif text-5xl leading-none text-gold/70" aria-hidden="true">
          {service.number}
        </span>
      </div>

      <h3 id={headingId} className="mt-8 text-[1.9rem] leading-tight text-navy">
        <span className="sr-only">Service {service.number}: </span>
        {service.title}
      </h3>

      <div className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        {service.description.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-auto pt-8">
        {service.packages ? (
          <ul className="divide-y divide-border border-y border-border">
            {service.packages.map((pkg) => (
              <li key={pkg.id}>
                <button
                  type="button"
                  onClick={() => requestService(service.id, pkg.id)}
                  aria-label={`Enquire about ${pkg.name} — ${formatPrice(pkg.price)}`}
                  className="flex w-full items-center justify-between gap-4 py-3.5 text-left text-sm text-charcoal transition-colors hover:text-navy"
                >
                  <span className="flex items-center gap-2">
                    {pkg.name}
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold-deep opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-2xl text-navy">{formatPrice(pkg.price)}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-baseline gap-3 border-y border-border py-4">
            <span className="font-serif text-5xl leading-none text-navy">{formatPrice(service.price!)}</span>
            {service.priceQualifier && (
              <span className="eyebrow text-gold-deep">{service.priceQualifier}</span>
            )}
          </div>
        )}

        {service.note && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{service.note}</p>}

        <Button
          type="button"
          variant="outlineNavy"
          size="xl"
          className="mt-6 w-full"
          onClick={() => requestService(service.id)}
        >
          {service.cta}
        </Button>
      </div>
    </article>
  );
}
