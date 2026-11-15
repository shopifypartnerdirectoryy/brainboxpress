import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { n: "01", title: "Discovery", text: "Understand the author's book, genre, audience and promotional goals." },
  { n: "02", title: "Strategy", text: "Identify suitable services and promotional opportunities based on the author's objectives." },
  {
    n: "03",
    title: "Preparation",
    text: "Prepare promotional materials and share proposed content with the author for approval where applicable.",
  },
  { n: "04", title: "Delivery", text: "Proceed with the agreed service and provide professional communication throughout the process." },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="paper scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow="How Our Process Works"
            align="center"
            title={
              <>
                From First Conversation to <em className="italic text-gold-deep">Final Delivery</em>
              </>
            }
          />
        </Reveal>

        <ol className="relative mt-20 grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Connecting lines */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold to-transparent lg:block" />
          <span aria-hidden="true" className="absolute bottom-6 left-8 top-6 w-px bg-gradient-to-b from-gold via-gold/70 to-transparent lg:hidden" />

          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 120} className="relative grid grid-cols-[4rem_1fr] gap-6 lg:block lg:text-center">
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-mist font-serif text-2xl text-navy shadow-[0_0_0_8px] shadow-mist lg:mx-auto">
                {s.n}
              </span>
              <div className="lg:mt-8">
                <p className="eyebrow text-gold-deep">Step {s.n}</p>
                <h3 className="mt-2 text-3xl text-navy">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground lg:mx-auto lg:max-w-[16rem]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
