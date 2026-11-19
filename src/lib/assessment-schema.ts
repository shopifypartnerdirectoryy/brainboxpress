import { z } from "zod";

/** Shared choice lists for the enquiry form and the Book Visibility Assessment. */
export const PUBLISHING_STAGES = [
  "Still writing",
  "Manuscript complete",
  "Preparing to publish",
  "Recently published (under 6 months)",
  "Published more than 6 months ago",
] as const;

export const MAIN_CONCERNS = [
  "Readers aren't finding my book",
  "My Amazon listing needs improvement",
  "I need a professional cover or formatting",
  "I'm planning a launch or relaunch",
  "I need a stronger author brand or website",
  "I want to build a reader list",
  "Audio, translation or adaptation",
  "I'm not sure where to start",
] as const;

export const BUDGET_RANGES = ["Under $100", "$100–$300", "$300–$750", "$750–$1,500", "Over $1,500", "Not sure yet"] as const;

export const CONTACT_METHODS = ["Email", "Phone", "WhatsApp"] as const;

const optionalUrl = z
  .string()
  .trim()
  .max(500, "Please keep the link under 500 characters.")
  .refine((v) => v === "" || /^https?:\/\/\S+\.\S+/.test(v), "Please enter a full link starting with https://")
  .optional()
  .default("");

export const assessmentSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name.").max(120, "Please keep your name under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(255, "Please keep your email under 255 characters."),
  bookTitle: z.string().trim().min(1, "Please enter your book title.").max(200, "Please keep the title under 200 characters."),
  bookLink: optionalUrl,
  genre: z.string().trim().min(1, "Please enter your book's genre.").max(100, "Please keep the genre under 100 characters."),
  publishingStage: z.enum(PUBLISHING_STAGES, { errorMap: () => ({ message: "Please choose your publishing stage." }) }),
  mainConcern: z.enum(MAIN_CONCERNS, { errorMap: () => ({ message: "Please choose what you'd most like help with." }) }),
  details: z.string().trim().max(2000, "Please keep this under 2,000 characters.").optional().default(""),
});

export type AssessmentValues = z.input<typeof assessmentSchema>;
export type AssessmentField = keyof AssessmentValues;
export type AssessmentFieldErrors = { [K in AssessmentField]?: string | undefined };

export function assessmentErrorsFrom(error: z.ZodError): AssessmentFieldErrors {
  const out: AssessmentFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as AssessmentField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
