import logoPrimary from "@/assets/logo-brainboxpress.webp";
import logoWithTagline from "@/assets/logo-brainboxpress-tagline.webp";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The official BrainboxPress logo, cropped from the supplied artwork without redrawing or recolouring.
 * - "primary": book symbol + wordmark (header, mobile menu)
 * - "full": symbol + wordmark + official tagline (footer, brand panels)
 * Both have transparent backgrounds and are designed for white or light surfaces.
 */
export function Logo({ variant = "primary", className }: { variant?: "primary" | "full"; className?: string }) {
  if (variant === "full") {
    return (
      <img
        src={logoWithTagline}
        alt={`${SITE.name} — ${SITE.tagline}`}
        width={720}
        height={417}
        loading="lazy"
        decoding="async"
        className={cn("h-auto w-60", className)}
      />
    );
  }
  return (
    <img
      src={logoPrimary}
      alt={SITE.name}
      width={342}
      height={168}
      decoding="async"
      className={cn("h-12 w-auto sm:h-14", className)}
    />
  );
}
