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
  publishingStage?: string | undefined;
  budget?: string | undefined;
  preferredContact?: string | undefined;
  phone?: string | undefined;
}

export interface AssessmentForEmail {
  fullName: string;
  email: string;
  bookTitle: string;
  bookLink?: string | undefined;
  genre: string;
  publishingStage: string;
  mainConcern: string;
  details?: string | undefined;
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
    ...(e.publishingStage ? [`Publishing stage: ${e.publishingStage}`] : []),
    ...(e.budget ? [`Budget: ${e.budget}`] : []),
    ...(e.preferredContact ? [`Preferred contact: ${e.preferredContact}`] : []),
    ...(e.phone ? [`Phone: ${e.phone}`] : []),
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

/** Book Visibility Assessment request, using the same Static Forms field set. */
export function buildAssessmentPayload(apiKey: string, a: AssessmentForEmail): StaticFormsPayload {
  const lines = [
    "BOOK VISIBILITY ASSESSMENT REQUEST",
    "",
    `Name: ${a.fullName}`,
    `Email: ${a.email}`,
    `Book title: ${a.bookTitle}`,
    `Book link: ${a.bookLink || "Not provided"}`,
    `Genre: ${a.genre}`,
    `Publishing stage: ${a.publishingStage}`,
    `Main concern: ${a.mainConcern}`,
    "",
    "Additional details:",
    a.details || "None provided",
  ];
  return {
    apiKey,
    name: a.fullName,
    email: a.email,
    subject: `Book Visibility Assessment request — ${a.bookTitle}`.slice(0, 200),
    message: lines.join("\n"),
  };
}
