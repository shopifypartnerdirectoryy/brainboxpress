import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Service | BrainboxPress",
      description:
        "BrainboxPress service terms covering quotations, payments, client materials, revisions, delivery, ownership, confidentiality and third-party platforms.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The general terms for using our website and commissioning BrainboxPress author services."
      updated="17 November 2026"
      sections={[
        {
          id: "about",
          heading: "About us and these terms",
          body: (
            <p>
              BrainboxPress is an author-services and book-growth brand operated by BrainboxWorld (
              <a href={SITE.url}>{SITE.displayUrl}</a>). These terms apply to our website and services alongside the
              written scope and quotation you approve. Any project-specific changes must be agreed in writing. Nothing
              here limits rights that cannot lawfully be excluded.
            </p>
          ),
        },
        {
          id: "services",
          heading: "Services and quotations",
          body: (
            <>
              <p>
                Our services are described on our <Link to="/services">services page</Link>. Prices are in US dollars.
                Services with a published price are charged at that price; other services are priced by written quotation.
              </p>
              <p>Deliverables, exclusions, pricing and timelines are agreed in writing before work begins.</p>
            </>
          ),
        },
        {
          id: "commencement",
          heading: "How a project starts",
          body: (
            <p>
              Our process is enquiry, review, recommendation, then written agreement on scope, price and timeline. Work
              begins after your approval and the agreed payment arrangements. Sending an enquiry does not start a project
              or create any obligation.
            </p>
          ),
        },
        {
          id: "payments",
          heading: "Payment arrangements",
          body: (
            <p>
              Payment amounts, stages and due dates are as stated in your written quotation or otherwise agreed in writing
              before work begins. We may pause work if an agreed payment is overdue, after letting you know. Changes to the
              agreed scope may need a revised quotation and your approval.
            </p>
          ),
        },
        {
          id: "responsibilities",
          heading: "Your materials and responsibilities",
          body: (
            <p>
              Please provide accurate information, complete materials and timely feedback. You must own or have permission
              to use the materials you supply — text, images, fonts and other content — and you remain responsible for the
              accuracy and legality of your book. Share platform access only through agreed, secure methods and only as
              far as the work needs.
            </p>
          ),
        },
        {
          id: "reviews",
          heading: "Review, revisions and approvals",
          body: (
            <p>
              You'll have the chance to review deliverables before they are finalised. Included revisions are as stated in
              the service description or your quotation. New directions or extra deliverables outside the agreed scope may
              need a separate agreement on price and timing. Final delivery follows your approval.
            </p>
          ),
        },
        {
          id: "delivery",
          heading: "Delivery and timelines",
          body: (
            <p>
              Delivery formats and timelines are agreed in writing and depend on receiving materials, feedback, approvals
              and agreed payments. If a delay arises, we'll tell you and agree a revised schedule with you.
            </p>
          ),
        },
        {
          id: "guarantees",
          heading: "No guaranteed results",
          body: (
            <p>
              We do not guarantee sales, rankings, reviews, views, bestseller status, literary agent representation, or
              publishing or film deals. Results depend on factors outside our control, including reader response, market
              conditions and platform decisions. This does not affect our obligation to deliver the services agreed in
              writing.
            </p>
          ),
        },
        {
          id: "platforms",
          heading: "Third-party platforms and costs",
          body: (
            <p>
              Platforms such as Amazon KDP, Goodreads and social networks apply their own terms and decisions, which we
              cannot control. Advertising spend, third-party subscriptions, printing, publishing fees and external
              production costs are separate unless your quotation says otherwise.
            </p>
          ),
        },
        {
          id: "ownership",
          heading: "Ownership and licensing",
          body: (
            <p>
              You keep copyright in your book and the materials you provide. On full payment, final deliverables are
              licensed or transferred to you as stated in your quotation. Third-party assets such as stock images, music or
              fonts remain subject to their own licences. We show your work in our portfolio only with your permission.
            </p>
          ),
        },
        {
          id: "confidentiality",
          heading: "Confidentiality",
          body: (
            <p>
              We treat unpublished manuscripts and project information as confidential and use them only for the agreed
              work. Access may be given to authorised personnel and agreed specialist professionals under appropriate
              confidentiality arrangements, or where the law requires disclosure.
            </p>
          ),
        },
        {
          id: "partners",
          heading: "Services coordinated with specialists",
          body: (
            <p>
              Some services, such as audiobook production, may be coordinated with specialist professionals. Your quotation
              will explain the scope, responsibilities and any licences involved. Coordination does not guarantee acceptance
              by a publisher, agent, producer or platform.
            </p>
          ),
        },
        {
          id: "liability",
          heading: "Limitation of liability",
          body: (
            <p>
              We deliver agreed services with reasonable care and skill. As far as the law allows, we are not responsible
              for indirect losses, outcomes we have not guaranteed, problems caused by client-supplied materials, or
              third-party actions outside our reasonable control. Nothing in these terms excludes liability that cannot
              lawfully be excluded.
            </p>
          ),
        },
        {
          id: "cancellation",
          heading: "Cancellation and refunds",
          body: (
            <p>
              Cancellations and refunds are handled under our{" "}
              <Link to="/refund-policy">Refund and Cancellation Policy</Link>, subject to any rights you have under
              applicable law.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to these terms",
          body: (
            <p>
              We may update these terms and the "last updated" date on this page. Updates don't change a project you have
              already approved; changes to an existing project must be agreed in writing.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact",
          body: (
            <p>
              For quotations and general enquiries, email <a href={`mailto:${SITE.generalEmail}`}>{SITE.generalEmail}</a>.
              For project support, email <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
