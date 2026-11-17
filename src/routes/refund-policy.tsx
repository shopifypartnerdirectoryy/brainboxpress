import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/refund-policy")({
  head: () =>
    pageHead({
      title: "Refund & Cancellation Policy | BrainboxPress",
      description:
        "How BrainboxPress handles cancellations and refunds before and after work begins, completed work, third-party costs and how to make a request.",
      path: "/refund-policy",
    }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  const support = <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>;
  return (
    <LegalPage
      title="Refund and Cancellation Policy"
      intro="How cancellations and refunds are handled fairly, based on the work agreed, completed and delivered."
      updated="17 November 2026"
      sections={[
        {
          id: "overview",
          heading: "Overview",
          body: (
            <p>
              This policy applies to services commissioned from BrainboxPress, an author-services brand operated by
              BrainboxWorld. We assess each request against your approved scope, payments made, work completed and any
              third-party costs disclosed to you. Nothing here limits your rights under applicable consumer law.
            </p>
          ),
        },
        {
          id: "before-work",
          heading: "Cancelling before work begins",
          body: (
            <p>
              If you cancel before work begins, we refund the amount you paid, less any non-refundable third-party costs
              already incurred and disclosed to you. We'll explain any deduction.
            </p>
          ),
        },
        {
          id: "after-work",
          heading: "Cancelling after work begins",
          body: (
            <p>
              If you cancel after work begins, we refund the part of the agreed work not yet carried out, taking into
              account work already completed and any disclosed third-party costs. We'll explain how the refund was worked
              out.
            </p>
          ),
        },
        {
          id: "completed-work",
          heading: "Completed and approved work",
          body: (
            <p>
              Work that has been completed and approved isn't refundable because plans change later. If you believe
              delivered work doesn't match what was agreed, contact us so we can review it and agree a fair remedy.
            </p>
          ),
        },
        {
          id: "third-party",
          heading: "Third-party costs",
          body: (
            <p>
              Advertising spend, subscriptions, printing, publishing fees and external production costs are separate unless
              your quotation says otherwise. Once incurred, they can be refunded only as far as the third party refunds them.
            </p>
          ),
        },
        {
          id: "results",
          heading: "Results are not guaranteed",
          body: (
            <p>
              We don't guarantee sales, rankings, reviews, views or bestseller status. Not reaching a hoped-for result is not,
              on its own, grounds for a refund when the agreed services were delivered.
            </p>
          ),
        },
        {
          id: "unable-to-deliver",
          heading: "If we can't deliver",
          body: (
            <p>
              If we can't deliver agreed work, we'll tell you and refund what you paid for the undelivered work. You don't
              have to accept a substitute service.
            </p>
          ),
        },
        {
          id: "request",
          heading: "How to request a cancellation or refund",
          body: (
            <p>
              Email {support} with your name, the email you used, the service concerned and your reason. Please include any
              quotation or payment reference — never send full card details. We'll review the request and confirm the
              outcome in writing.
            </p>
          ),
        },
        {
          id: "payment",
          heading: "How refunds are paid",
          body: (
            <p>
              Approved refunds go back through the original payment method where possible; otherwise we'll agree an
              alternative with you. How long the money takes to arrive depends on your bank or payment provider.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact",
          body: (
            <p>
              Cancellation and refund requests: {support}. General enquiries:{" "}
              <a href={`mailto:${SITE.generalEmail}`}>{SITE.generalEmail}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
