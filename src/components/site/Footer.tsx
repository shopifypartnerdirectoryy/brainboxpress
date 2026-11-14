import { NAV_LINKS, SITE } from "@/lib/site";

import { Logo } from "./Logo";
import { SocialLinks } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="eyebrow mt-6 text-gold">BRAINBOXPRESS</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-navy-muted">{SITE.descriptor}</p>
            <p className="mt-6 max-w-xs font-serif text-xl italic leading-snug text-navy-foreground/90">
              Helping authors present their books and connect with potential readers.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow font-sans text-gold">Quick Navigation</h2>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-navy-muted transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow font-sans text-gold">Contact</h2>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`mailto:${SITE.generalEmail}`} className="text-navy-muted transition-colors hover:text-gold">
                  {SITE.generalEmail}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.supportEmail}`} className="text-navy-muted transition-colors hover:text-gold">
                  {SITE.supportEmail}
                </a>
              </li>
              <li>
                <a href={SITE.url} className="text-navy-muted transition-colors hover:text-gold">
                  {SITE.url}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow font-sans text-gold">Follow Us</h2>
            <SocialLinks tone="light" className="mt-6" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-navy-foreground/12 pt-8 text-xs text-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BrainboxPress. All rights reserved.</p>
          <p className="tracking-[0.18em] uppercase">{SITE.displayUrl}</p>
        </div>
      </div>
    </footer>
  );
}
