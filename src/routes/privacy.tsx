import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | BrainboxPress",
      description:
        "How BrainboxPress handles enquiry information, confidential manuscripts, visitor analytics and service providers, and how to make a privacy request.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

const Hello = () => <a href={`mailto:${SITE.generalEmail}`}>{SITE.generalEmail}</a>;
const Support = () => <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>;

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How we collect, use and protect information when you visit our website or enquire about author services."
      updated="17 November 2026"
      sections={[
        {
          id: "who-we-are",
          heading: "Who we are",
          body: (
            <p>
              BrainboxPress is an author-services and book-growth brand operated by BrainboxWorld. Our website is{" "}
              <a href={SITE.url}>{SITE.displayUrl}</a>. We do not publish a physical address.
            </p>
          ),
        },
        {
          id: "information",
          heading: "Information you provide",
          body: (
            <>
              <p>We collect the information you choose to submit through our forms:</p>
              <ul>
                <li>
                  Enquiry form: your name, email, book title, author name, the service you're interested in, your
                  publishing stage, an optional budget range, your preferred contact method, an optional phone number and
                  your message.
                </li>
                <li>
                  Book Visibility Assessment: your name, email, book title, book link, genre, publishing stage, your main
                  concern and the kind of help you're looking for.
                </li>
              </ul>
              <p>
                We also handle information you share in later correspondence or as agreed for your project. Please don't
                include sensitive personal information that isn't needed for your enquiry.
              </p>
            </>
          ),
        },
        {
          id: "analytics",
          heading: "Visitor analytics and cookies",
          body: (
            <>
              <p>
                We use Lovable's visitor analytics to understand how the website is used. It uses no cookies, stores
                nothing on your device, doesn't keep IP addresses and doesn't identify visitors.
              </p>
              <p>
                Lovable collects this data for us. <a href="https://lovable.dev/privacy">Lovable's privacy policy</a>{" "}
                explains how it handles it.
              </p>
              <p>
                It records the pages visited, where visitors came from, their country, browser, operating system and
                device type, how long they stay, how fast pages load, errors, and which buttons and links people click.
                Detailed data is kept for 90 days and daily summaries for a year.
              </p>
              <p>
                We don't show a cookie banner, so this is recorded for every visitor — without cookies and without
                identifying anyone. We don't use advertising pixels, and visitors don't have sign-in accounts.
              </p>
            </>
          ),
        },
        {
          id: "fonts-links",
          heading: "Google Fonts and social links",
          body: (
            <>
              <p>
                Our fonts are loaded from Google Fonts (fonts.googleapis.com and fonts.gstatic.com). Your browser connects
                to Google to download them, and Google receives your IP address as part of that request.
              </p>
              <p>
                Our Facebook, Instagram, TikTok, X and LinkedIn links are plain links with no embedded trackers. If you
                follow one, that website's privacy practices apply.
              </p>
            </>
          ),
        },
        {
          id: "use",
          heading: "How we use information",
          body: (
            <ul>
              <li>To respond to enquiries and review your book or service needs.</li>
              <li>To prepare recommendations, quotations and project arrangements.</li>
              <li>To communicate about and deliver agreed services.</li>
              <li>To keep necessary service, payment and accounting records and meet legal obligations.</li>
              <li>To use non-identifying analytics to improve the website and fix errors.</li>
            </ul>
          ),
        },
        {
          id: "legal-bases",
          heading: "Legal bases",
          body: (
            <p>
              Where privacy law requires a legal basis, we rely on taking steps at your request before a contract,
              performing our agreement with you, meeting legal obligations, and our legitimate interests in responding to
              enquiries, running our business and improving our website, balanced against your rights. Where consent is
              required, we will ask for it, and you may withdraw it at any time.
            </p>
          ),
        },
        {
          id: "storage-providers",
          heading: "Storage, access and service providers",
          body: (
            <>
              <p>
                Form submissions are stored securely in the website's database, with access restricted to authorised
                BrainboxPress personnel. Submissions are also delivered by email through Static Forms (staticforms.dev) to{" "}
                <Hello />.
              </p>
              <p>
                Our website uses Lovable for hosting and analytics, Static Forms for form delivery, and Google Fonts for
                fonts. These providers process information only as needed for their role, under their own terms and
                privacy policies.
              </p>
              <p>
                Where an agreed service involves a specialist professional, we share only the material needed for that
                service under appropriate confidentiality arrangements. We may also disclose information when the law
                requires it.
              </p>
              <p>
                Providers may process information in other countries. No method of electronic storage or transmission is
                completely secure.
              </p>
            </>
          ),
        },
        {
          id: "manuscripts",
          heading: "Manuscripts and confidential material",
          body: (
            <p>
              You can't upload manuscripts through this website. Manuscripts are shared later, by agreement, and are
              treated as confidential. Access is limited to what the agreed work needs. We never show manuscripts or
              confidential project material in our portfolio without your permission.
            </p>
          ),
        },
        {
          id: "retention",
          heading: "Retention and deletion",
          body: (
            <p>
              We keep enquiry records only as long as needed to respond, deliver services and meet legal or accounting
              obligations. You may ask us to delete your information; some records may need to be kept where the law
              requires it. Analytics retention is described above.
            </p>
          ),
        },
        {
          id: "rights",
          heading: "Your privacy rights",
          body: (
            <p>
              You can ask to access, correct or delete your information by emailing <Support />. Depending on where you
              live, you may also have rights to object to or restrict processing, receive a copy of your data, withdraw
              consent, or complain to a privacy regulator. We may need to verify your identity before acting on a request.
            </p>
          ),
        },
        {
          id: "children",
          heading: "Children",
          body: (
            <p>
              Our website and services are not aimed at children. If you believe a child has sent us information without
              a parent or guardian's involvement, please contact us so we can review and delete it.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          body: <p>We may update this policy. The updated version will be posted here with a new "last updated" date.</p>,
        },
        {
          id: "contact",
          heading: "Privacy questions",
          body: (
            <p>
              Send privacy requests to <Support /> and general enquiries to <Hello />.
            </p>
          ),
        },
      ]}
    />
  );
}
