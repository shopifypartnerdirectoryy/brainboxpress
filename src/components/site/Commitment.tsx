import { Reveal } from "./Reveal";

export function Commitment() {
  return (
    <section aria-labelledby="commitment-title" className="relative overflow-hidden bg-navy py-24 text-navy-foreground lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-gold/15" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full border border-gold/10" />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-4 text-gold">
            <span className="gold-rule" aria-hidden="true" />
            Our Professional Commitment
            <span className="gold-rule" aria-hidden="true" />
          </p>
          <h2 id="commitment-title" className="mt-8 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Professional Promotion. <em className="italic text-gold">Thoughtful Presentation.</em> Clear Communication.
          </h2>
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-12 max-w-3xl space-y-6 text-[1.05rem] leading-relaxed text-navy-muted">
          <p className="font-serif text-3xl italic text-navy-foreground">Every book deserves to be presented with care.</p>
          <p>
            BrainboxPress is committed to providing authors with clearly explained services, professional
            communication and thoughtful promotional preparation.
          </p>
          <p>
            From creative book presentation to digital promotional opportunities, our approach focuses on understanding
            each title and delivering services that respect the author's goals.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-12 max-w-2xl border-t border-gold/30 pt-8 text-sm leading-relaxed text-navy-foreground/75">
            Promotional services are designed to support visibility and discoverability. Specific views, sales,
            reviews or results cannot be guaranteed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
