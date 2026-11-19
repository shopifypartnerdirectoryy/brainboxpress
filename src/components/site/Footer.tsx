import { Link } from "@tanstack/react-router";

import { visibleDepartments } from "@/lib/departments";
import { FOOTER_SECTIONS, SITE } from "@/lib/site";

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
              {FOOTER_SECTIONS.map((l) => (
                <li key={l.id}>
                  <Link to="/" hash={l.id} className="text-sm text-navy-muted transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/assessment" className="text-sm text-navy-muted transition-colors hover:text-gold">
                  Free Book Assessment
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-navy-muted transition-colors hover:text-gold">
                  Author Resources
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="eyebrow font-sans text-gold">Services</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link to="/services" className="text-sm font-semibold text-navy-foreground transition-colors hover:text-gold">
                  All Services
                </Link>
              </li>
              {visibleDepartments().map((d) => (
                <li key={d.id}>
                  <Link to="/services" hash={d.id} className="text-sm text-navy-muted transition-colors hover:text-gold">
                    {d.title}
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p>© 2026 BrainboxPress. All rights reserved.</p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              <Link to="/privacy" className="transition-colors hover:text-gold">Privacy</Link>
              <Link to="/terms" className="transition-colors hover:text-gold">Terms</Link>
              <Link to="/refund-policy" className="transition-colors hover:text-gold">Refunds</Link>
            </nav>
          </div>
          <p className="font-semibold uppercase tracking-[0.18em] text-gold">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
