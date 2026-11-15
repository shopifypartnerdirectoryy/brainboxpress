import { createServerFn } from "@tanstack/react-start";

import { enquirySchema, fieldErrorsFrom, MIN_FILL_TIME_MS, submissionMetaSchema, type EnquiryFieldErrors } from "./enquiry-schema";
import { getPackage, getService } from "./services";
import { buildStaticFormsPayload, STATIC_FORMS_ENDPOINT } from "./static-forms";

export type SubmitEnquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: EnquiryFieldErrors };

const FAILURE_MESSAGE =
  "We couldn't send your enquiry just now. Please try again in a moment, or email hello@brainboxworld.net directly.";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: { values: unknown; meta: unknown }) => input)
  .handler(async ({ data }): Promise<SubmitEnquiryResult> => {
    const meta = submissionMetaSchema.safeParse(data?.meta);
    if (!meta.success) {
      return { ok: false, error: "Something went wrong with the form. Please refresh the page and try again." };
    }

    // Spam protection: honeypot filled, or submitted implausibly fast.
    if (meta.data.website) {
      return { ok: true };
    }
    if (meta.data.elapsedMs < MIN_FILL_TIME_MS) {
      return { ok: false, error: "That was quick! Please take a moment to review your details, then submit again." };
    }

    const parsed = enquirySchema.safeParse(data?.values);
    if (!parsed.success) {
      return { ok: false, error: "Please check the highlighted fields.", fieldErrors: fieldErrorsFrom(parsed.error) };
    }

    const v = parsed.data;
    const service = getService(v.service)!;
    const pkg = v.package ? getPackage(v.service, v.package) : undefined;

    // 1. Keep a backup copy so no enquiry is lost if email delivery fails.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: dbError } = await supabaseAdmin.from("author_enquiries").insert({
      client_request_id: meta.data.requestId,
      full_name: v.fullName,
      email: v.email,
      book_title: v.bookTitle,
      author_name: v.authorName,
      service: service.formLabel,
      package: pkg?.formLabel ?? null,
      message: v.message,
    });

    // Same request sent twice (double click or retry) — it was already received and forwarded.
    if (dbError?.code === "23505") return { ok: true };
    if (dbError) console.error("Failed to save author enquiry", dbError.code, dbError.message);

    // 2. Deliver the notification email through Static Forms.
    const delivered = await sendToStaticForms({
      fullName: v.fullName,
      email: v.email,
      bookTitle: v.bookTitle,
      authorName: v.authorName,
      serviceLabel: service.formLabel,
      packageLabel: pkg?.formLabel,
      message: v.message,
    });

    if (!delivered && dbError) return { ok: false, error: FAILURE_MESSAGE };
    return { ok: true };
  });

async function sendToStaticForms(enquiry: Parameters<typeof buildStaticFormsPayload>[1]): Promise<boolean> {
  const apiKey = process.env["STATIC_FORMS_API_KEY"];
  if (!apiKey) {
    console.error("STATIC_FORMS_API_KEY is not configured; enquiry email not sent.");
    return false;
  }
  try {
    const res = await fetch(STATIC_FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildStaticFormsPayload(apiKey, enquiry)),
      signal: AbortSignal.timeout(12_000),
    });
    const text = await res.text();
    if (!res.ok) {
      console.error(`Static Forms request failed [${res.status}]: ${text.slice(0, 500)}`);
      return false;
    }
    try {
      const body = JSON.parse(text) as { success?: boolean; message?: string };
      if (body.success === false) {
        console.error(`Static Forms rejected the submission: ${body.message ?? text.slice(0, 500)}`);
        return false;
      }
    } catch {
      // Non-JSON 2xx body: treat as accepted.
    }
    return true;
  } catch (err) {
    console.error("Static Forms request error", err instanceof Error ? err.message : err);
    return false;
  }
}
