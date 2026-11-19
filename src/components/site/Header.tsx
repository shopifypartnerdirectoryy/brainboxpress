import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

import { Logo } from "./Logo";

/** Links to a homepage section: a plain in-page anchor on the homepage, a router link elsewhere. */
function SectionLink({
  id,
  page,
  onHome,
  className,
  onClick,
  children,
  ...rest
}: {
  id: string;
  page?: "/services" | "/resources" | "/assessment" | undefined;
  onHome: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  "aria-current"?: "true" | undefined;
}) {
  if (page) {
    return (
      <Link to={page} className={className} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
  if (onHome) {
    return (
      <a href={`#${id}`} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to="/" hash={id} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export function Header({ onHome = true }: { onHome?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the homepage section currently in view.
  useEffect(() => {
    if (!onHome) return;
    const sections = NAV_LINKS.filter((l) => !l.page).map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md transition-[box-shadow,border-color] duration-500",
        scrolled || open ? "border-border shadow-[0_10px_30px_-24px] shadow-navy/40" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2 focus:text-navy-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        {onHome ? (
          <a href="#home" className="shrink-0 rounded-sm" aria-label="BrainboxPress — back to top" onClick={close}>
            <Logo />
          </a>
        ) : (
          <Link to="/" className="shrink-0 rounded-sm" aria-label="BrainboxPress — home" onClick={close}>
            <Logo />
          </Link>
        )}

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <SectionLink
                  id={link.id}
                  page={link.page}
                  onHome={onHome}
                  aria-current={active === link.id ? "true" : undefined}
                  className={cn(
                    "relative py-2 text-[0.82rem] font-semibold tracking-[0.06em] text-charcoal/80 transition-colors hover:text-navy",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100",
                    active === link.id && "text-navy after:scale-x-100",
                  )}
                >
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="gold" size="xl" className="hidden sm:inline-flex">
            <SectionLink id="contact" onHome={onHome}>
              Work With Us
            </SectionLink>
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 pb-8 pt-2 sm:px-8">
          <ul className="divide-y divide-border">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id}>
                <SectionLink
                  id={link.id}
                  page={link.page}
                  onHome={onHome}
                  onClick={close}
                  className="flex items-baseline gap-4 py-3.5 font-serif text-2xl text-navy transition-colors hover:text-gold-deep"
                >
                  <span className="eyebrow text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
          <Button asChild variant="gold" size="xl" className="mt-6 w-full">
            <SectionLink id="contact" onHome={onHome} onClick={close}>
              Work With Us
            </SectionLink>
          </Button>
          <Button asChild variant="outlineNavy" size="xl" className="mt-3 w-full">
            <Link to="/assessment" onClick={close}>
              Free Book Assessment
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
