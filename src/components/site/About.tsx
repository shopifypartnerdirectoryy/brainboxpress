import aboutImage from "@/assets/about-workspace.webp";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FOCUS = ["Author outreach", "Creative book marketing", "Visual content creation", "Digital promotional services"];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative order-2 lg:order-1">
          <img
            src={aboutImage}
            alt="An author's workspace with an open notebook, printed book cover proofs, coffee, reading glasses and navy hardcover books"
            width={1200}
            height={1504}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover shadow-editorial"
          />
          <div className="absolute -bottom-8 left-6 right-6 border-l-2 border-gold bg-navy px-7 py-6 text-navy-foreground sm:left-auto sm:right-[-1.5rem] sm:w-80">
            <p className="font-serif text-2xl leading-snug">
              Clear, organized and <em className="text-gold">professional</em> — at every stage of the publishing journey.
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2 lg:pt-6">
          <Reveal>
            <SectionHeading id="about-title" eyebrow="Who We Are" title="About BrainboxPress" />
          </Reveal>
          <Reveal delay={100} className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            <p className="font-serif text-2xl leading-snug text-navy sm:text-[1.7rem]">
              BrainboxPress is an independent author-promotion and ebook marketing brand focused on helping authors
              present their books professionally and explore meaningful promotional opportunities.
            </p>
            <p>
              Through author outreach, creative book marketing, visual content creation and digital promotional
              services, BrainboxPress works to help authors strengthen their book presentation, improve discoverability
              and introduce their work to potential readers.
            </p>
            <p>
              With an emphasis on professional communication, personalized service and thoughtful promotional
              planning, our goal is to make every author's promotional experience clear, organized and professional.
            </p>
            <p>
              From social media book features and creative video trailers to author websites and promotional content,
              our services are designed to support authors at different stages of their publishing journey.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-border pt-8 sm:grid-cols-2">
              {FOCUS.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium tracking-wide text-navy">
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
