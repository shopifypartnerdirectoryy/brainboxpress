import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageIntro, PageShell } from "@/components/site/PageShell";
import { SERVICE_ICONS } from "@/components/site/service-icons";
import { Button } from "@/components/ui/button";
import { visibleDepartments } from "@/lib/departments";
import { ORG_ID, pageHead, PUBLIC_ORIGIN } from "@/lib/seo";
import { priceSummary, SERVICES } from "@/lib/services";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Author Services & Book Marketing Services | BrainboxPress",
      description:
        "Explore BrainboxPress author services: editing, formatting, cover design, Amazon KDP optimization, book promotion, trailers, author websites, newsletters, audiobooks and more.",
      path: "/services",
      schema: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "BrainboxPress author services",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${PUBLIC_ORIGIN}/services/${s.slug}`,
          name: s.title,
        })),
        provider: { "@id": ORG_ID },
      },
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const departments = visibleDepartments();
  return (
    <PageShell>
      <PageIntro
        eyebrow="Our Services"
        title={
          <>
            Author services for every stage of <em className="text-gold-deep">your book's journey.</em>
          </>
        }
        intro="From preparing your manuscript to reaching new readers, BrainboxPress services are organised into six departments. Published prices are shown; tailored services are quoted after we understand your book."
      >
        <nav aria-label="Service departments" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {departments.map((d) => (
              <li key={d.id}>
                <a
                  href={`#${d.id}`}
                  className="inline-flex min-h-11 items-center rounded-sm border border-border bg-card px-4 text-sm font-medium text-navy transition-colors hover:border-gold"
                >
                  {d.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      {departments.map((d, di) => (
        <section
          key={d.id}
          id={d.id}
          aria-labelledby={`${d.id}-title`}
          className={`scroll-mt-24 py-16 lg:py-20 ${di % 2 ? "bg-mist" : "bg-background"}`}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="eyebrow text-gold-deep">Department {String(di + 1).padStart(2, "0")}</p>
                <h2 id={`${d.id}-title`} className="mt-3 text-4xl leading-tight text-navy sm:text-5xl">
                  {d.title}
                </h2>
              </div>
              <p className="max-w-xl leading-relaxed text-muted-foreground">{d.summary}</p>
            </div>

            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {d.services.map((s) => {
                const Icon = SERVICE_ICONS[s.id];
                return (
                  <li key={s.id} className="flex">
                    <article className="group flex w-full flex-col border border-border bg-card p-7 transition-[box-shadow,border-color] duration-500 hover:border-gold/70 hover:shadow-editorial">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-mist text-navy">
                        <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                      </span>
                      <h3 className="mt-6 text-[1.7rem] leading-tight text-navy">
                        <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-gold-deep">
                          {s.title}
                        </Link>
                      </h3>
                      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{s.summary}</p>
                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                        <span className="font-serif text-xl text-navy">{priceSummary(s)}</span>
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          aria-label={`View ${s.title}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold-deep"
                        >
                          View <ArrowRight className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="services-cta" className="bg-navy py-16 text-navy-foreground lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="services-cta" className="text-4xl leading-tight sm:text-5xl">
              Not sure which service your book needs?
            </h2>
            <p className="mt-4 leading-relaxed text-navy-muted">
              Request a free Book Visibility Assessment. We'll review how your book is presented and recommend practical
              next steps — with no obligation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to="/assessment">Request an Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-gold/60 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground">
              <Link to="/" hash="contact">Discuss Your Book</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
