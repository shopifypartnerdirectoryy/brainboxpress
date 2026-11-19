import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { AssessmentForm } from "@/components/site/AssessmentForm";
import { PageIntro, PageShell } from "@/components/site/PageShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/assessment")({
  head: () =>
    pageHead({
      title: "Free Book Visibility Assessment for Authors | BrainboxPress",
      description:
        "Request a free Book Visibility Assessment from BrainboxPress. We review how your book is presented online and recommend practical next steps — no obligation.",
      path: "/assessment",
    }),
  component: AssessmentPage,
});

const REVIEWED = [
  "How your book is presented on its retailer page",
  "Your cover, title and description at a glance",
  "Your author presence: website, Goodreads and social profiles",
  "Which services, if any, could help most — and why",
];

function AssessmentPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Book Visibility Assessment"
        title={
          <>
            Find out what could help <em className="text-gold-deep">readers discover your book.</em>
          </>
        }
        intro="Tell us about your book and we'll review how it is currently presented, then reply with honest observations and practical recommendations. The assessment is free and there's no obligation to buy anything."
      />

      <section aria-label="Assessment request" className="bg-mist py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-3xl leading-tight text-navy sm:text-4xl">What we look at</h2>
            <ul className="mt-6 space-y-4">
              {REVIEWED.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted-foreground">
              An assessment gives you our professional opinion, not a guarantee of sales or rankings. Prefer to ask about
              a specific service instead?{" "}
              <Link to="/" hash="contact" className="font-medium text-navy underline decoration-gold underline-offset-4">
                Send an enquiry
              </Link>
              .
            </p>
          </div>
          <div className="border-t-4 border-gold bg-card p-6 shadow-editorial sm:p-10">
            <AssessmentForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
