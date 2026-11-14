import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <p
        className={cn(
          "eyebrow flex items-center gap-4",
          align === "center" && "justify-center",
          tone === "dark" ? "text-gold-deep" : "text-gold",
        )}
      >
        <span className="gold-rule" aria-hidden="true" />
        {eyebrow}
        {align === "center" && <span className="gold-rule" aria-hidden="true" />}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.6rem]",
          tone === "dark" ? "text-navy" : "text-navy-foreground",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-muted-foreground" : "text-navy-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
