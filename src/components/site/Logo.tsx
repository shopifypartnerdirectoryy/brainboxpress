import { cn } from "@/lib/utils";

/** BrainboxPress "BP" book-spine monogram. Shared by the header, footer and favicon. */
export function LogoMark({ className }: { className?: string | undefined }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("h-9 w-9 shrink-0", className)}>
      <rect width="64" height="64" rx="12" className="fill-navy" />
      <rect x="5" y="5" width="54" height="54" rx="8" fill="none" className="stroke-gold" strokeOpacity=".35" strokeWidth="1.2" />
      <g fill="none" className="stroke-gold" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 15v34" />
        <path d="M23 15h10a8.5 8.5 0 0 1 0 17H23" />
        <path d="M23 32h12a8.5 8.5 0 0 1 0 17H23" />
      </g>
      <path d="M16 19v30" className="stroke-ivory" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={tone === "light" ? "ring-1 ring-gold/30 rounded-[12px]" : undefined} />
      <span
        className={cn(
          "font-serif text-[1.55rem] leading-none tracking-tight",
          tone === "dark" ? "text-navy" : "text-navy-foreground",
        )}
      >
        Brainbox<span className={cn("italic", tone === "dark" ? "text-gold-deep" : "text-gold")}>Press</span>
      </span>
    </span>
  );
}
