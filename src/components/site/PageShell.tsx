import type { ReactNode } from "react";

import { EnquiryProvider } from "./enquiry-context";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Shared layout for every page other than the homepage: header, main content and footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <EnquiryProvider mode="navigate">
      <Header onHome={false} />
      <main id="main">{children}</main>
      <Footer />
    </EnquiryProvider>
  );
}

/** Consistent page introduction: breadcrumb-free eyebrow, one H1 and an intro paragraph. */
export function PageIntro({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="paper border-b border-border">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 lg:pb-20 lg:pt-16">
        <p className="eyebrow flex items-center gap-4 text-gold-deep">
          <span className="gold-rule" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] text-navy sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && <div className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</div>}
        {children}
      </div>
    </section>
  );
}
