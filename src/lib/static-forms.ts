// Static Forms (https://www.staticforms.dev) delivers enquiry notifications to hello@brainboxworld.net.
// The API key is a server-side secret (STATIC_FORMS_API_KEY) and is only read inside the submit handler.

export const STATIC_FORMS_ENDPOINT = "https://api.staticforms.dev/submit";

export interface StaticFormsPayload {
  apiKey: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EnquiryForEmail {
  fullName: string;
  email: string;
  bookTitle: string;
  authorName: string;
  serviceLabel: string;
  packageLabel?: string | undefined;
  message: string;
}

/** Builds the exact field set Static Forms expects: apiKey, name, email, subject, message. */
export function buildStaticFormsPayload(apiKey: string, e: EnquiryForEmail): StaticFormsPayload {
  const lines = [
    `Name: ${e.fullName}`,
    `Email: ${e.email}`,
    `Book title: ${e.bookTitle}`,
    `Author name: ${e.authorName}`,
    `Service: ${e.serviceLabel}`,
    ...(e.packageLabel ? [`Package: ${e.packageLabel}`] : []),
    "",
    "Message:",
    e.message,
  ];
  return {
    apiKey,
    name: e.fullName,
    email: e.email,
    subject: `New BrainboxPress enquiry: ${e.serviceLabel} — ${e.bookTitle}`.slice(0, 200),
    message: lines.join("\n"),
  };
}
