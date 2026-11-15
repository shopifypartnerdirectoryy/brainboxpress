import { Link } from "@tanstack/react-router";

import { SERVICES } from "@/lib/services";
import { NAV_LINKS, SITE } from "@/lib/site";

import { Logo } from "./Logo";
import { SocialLinks } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="border-t-4 border-gold bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.1fr_1fr]">
          <div>
            <Link to="/" aria-label="BrainboxPress — home" className="inline-block rounded-md bg-background px-5 py-4">
              <Logo variant="full" className="w-52" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-muted">
              Author services and book-growth support — helping authors present their books professionally and
              reach new readers.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow font-sans text-gold">Quick Navigation</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link to="/" className="text-sm text-navy-muted transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <Link to="/" hash={l.id} className="text-sm text-navy-muted transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="eyebrow font-sans text-gold">Services</h2>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-sm text-navy-muted transition-colors hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow font-sans text-gold">Contact</h2>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`mailto:${SITE.generalEmail}`} className="break-words text-navy-muted transition-colors hover:text-gold">
                  {SITE.generalEmail}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.supportEmail}`} className="break-words text-navy-muted transition-colors hover:text-gold">
                  {SITE.supportEmail}
                </a>
              </li>
              <li>
                <a href={SITE.url} className="text-navy-muted transition-colors hover:text-gold">
                  {SITE.displayUrl}
                </a>
              </li>
            </ul>
            <h2 className="eyebrow mt-10 font-sans text-gold">Follow Us</h2>
            <SocialLinks tone="light" className="mt-5" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-navy-foreground/15 pt-8 text-xs text-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BrainboxPress. All rights reserved.</p>
          <p className="font-semibold uppercase tracking-[0.18em] text-gold">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
