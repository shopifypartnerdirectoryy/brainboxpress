import { z } from "zod";

import { BUDGET_RANGES, CONTACT_METHODS, PUBLISHING_STAGES } from "./assessment-schema";
import { getService, SERVICES } from "./services";

const optionalChoice = <T extends readonly [string, ...string[]]>(options: T, message: string) =>
  z.union([z.enum(options, { errorMap: () => ({ message }) }), z.literal("")]).optional().default("");

const serviceIds = SERVICES.map((s) => s.id) as [string, ...string[]];

/** Shared by the enquiry form (client) and the submit handler (server). */
export const enquirySchema = z
  .object({
    fullName: z.string().trim().min(1, "Please enter your full name.").max(120, "Please keep your name under 120 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address.")
      .email("Please enter a valid email address.")
      .max(255, "Please keep your email under 255 characters."),
    bookTitle: z.string().trim().min(1, "Please enter your book title.").max(200, "Please keep the title under 200 characters."),
    authorName: z.string().trim().min(1, "Please enter the author name.").max(120, "Please keep the author name under 120 characters."),
    service: z.enum(serviceIds, { errorMap: () => ({ message: "Please choose the service you're interested in." }) }),
    package: z.string().trim().max(80).optional().default(""),
    message: z
      .string()
      .trim()
      .min(10, "Please tell us a little more (at least 10 characters).")
      .max(3000, "Please keep your message under 3,000 characters."),
    publishingStage: optionalChoice(PUBLISHING_STAGES, "Please choose a publishing stage."),
    budget: optionalChoice(BUDGET_RANGES, "Please choose a budget range."),
    preferredContact: optionalChoice(CONTACT_METHODS, "Please choose a contact method."),
    phone: z
      .string()
      .trim()
      .max(40, "Please keep the phone number under 40 characters.")
      .refine((v) => v === "" || /^[+()\d][\d\s().-]{5,}$/.test(v), "Please enter a valid phone number.")
      .optional()
      .default(""),
  })
  .superRefine((value, ctx) => {
    const service = getService(value.service);
    if (!service) return;
    if (service.packages?.length) {
      if (!service.packages.some((p) => p.id === value.package)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["package"], message: "Please choose a package for this service." });
      }
    } else if (value.package) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["package"], message: "This service has no packages." });
    }
    if ((value.preferredContact === "Phone" || value.preferredContact === "WhatsApp") && !value.phone) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message: "Please add a phone number so we can reach you." });
    }
  });

export type EnquiryValues = z.input<typeof enquirySchema>;

export const submissionMetaSchema = z.object({
  requestId: z.string().uuid(),
  /** Honeypot field — must stay empty. */
  website: z.string().max(200).optional().default(""),
  /** Milliseconds the visitor spent on the form before submitting. */
  elapsedMs: z.number().int().nonnegative(),
});

export type EnquiryField =
  | "fullName"
  | "email"
  | "bookTitle"
  | "authorName"
  | "service"
  | "package"
  | "message"
  | "publishingStage"
  | "budget"
  | "preferredContact"
  | "phone";
export type EnquiryFieldErrors = { [K in EnquiryField]?: string | undefined };

export function fieldErrorsFrom(error: z.ZodError): EnquiryFieldErrors {
  const out: EnquiryFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as EnquiryField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** Submissions faster than this are treated as automated. */
export const MIN_FILL_TIME_MS = 2500;
