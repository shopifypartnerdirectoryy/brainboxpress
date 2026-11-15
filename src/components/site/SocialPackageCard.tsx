import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice, totalContentPieces, type SocialPackage } from "@/lib/services";
import { cn } from "@/lib/utils";

import { useEnquiry } from "./enquiry-context";

export function SocialPackageCard({ pkg, headingAs: Heading = "h4" }: { pkg: SocialPackage; headingAs?: "h3" | "h4" }) {
  const { requestService } = useEnquiry();
  const featured = !!pkg.emphasis;
  const headingId = `smm-${pkg.packageId}`;

  const rows = [
    { label: "Duration", value: `${pkg.durationDays} Days` },
    { label: "Static Posts", value: String(pkg.staticPosts) },
    { label: "Reels", value: String(pkg.reels) },
  ];

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "relative flex flex-col p-8 transition-transform duration-500 sm:p-10",
        featured
          ? "z-10 bg-navy text-navy-foreground shadow-editorial ring-1 ring-gold/60 lg:-my-6 lg:py-14"
          : "border border-navy-foreground/15 bg-navy-soft/60 text-navy-foreground",
      )}
    >
      <p className="eyebrow text-gold">Package</p>
      <Heading id={headingId} className="mt-2 text-4xl">
        {pkg.name}
      </Heading>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-serif text-6xl leading-none">{formatPrice(pkg.price)}</span>
        <span className="text-sm text-navy-muted">/ {pkg.durationDays} days</span>
      </p>

      <dl className="mt-8 divide-y divide-navy-foreground/12 border-y border-navy-foreground/12">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between py-3.5 text-sm">
            <dt className="text-navy-muted">{r.label}</dt>
            <dd className="font-medium">{r.value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between py-4">
          <dt className="flex items-center gap-2 text-sm font-semibold text-gold">
            <Check className="h-4 w-4" aria-hidden="true" /> Total
          </dt>
          <dd className="font-serif text-xl sm:text-2xl">{totalContentPieces(pkg)} Content Pieces</dd>
        </div>
      </dl>

      <Button
        type="button"
        variant={featured ? "gold" : "outlineLight"}
        size="xl"
        className="mt-8 w-full"
        onClick={() => requestService("social-media-management", pkg.packageId)}
      >
        {pkg.cta}
      </Button>
    </article>
  );
}
