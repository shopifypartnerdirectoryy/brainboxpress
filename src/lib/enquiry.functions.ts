import { createServerFn } from "@tanstack/react-start";

import { enquirySchema, fieldErrorsFrom, MIN_FILL_TIME_MS, submissionMetaSchema, type EnquiryFieldErrors } from "./enquiry-schema";
import { getPackage, getService } from "./services";

export type SubmitEnquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: EnquiryFieldErrors };

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

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("author_enquiries").insert({
      client_request_id: meta.data.requestId,
      full_name: v.fullName,
      email: v.email,
      book_title: v.bookTitle,
      author_name: v.authorName,
      service: service.formLabel,
      package: pkg?.formLabel ?? null,
      message: v.message,
    });

    if (error) {
      // Same request sent twice (e.g. a double click or retry) — it is already saved.
      if (error.code === "23505") return { ok: true };
      console.error("Failed to save author enquiry", error.code, error.message);
      return {
        ok: false,
        error: "We couldn't send your enquiry just now. Please try again in a moment, or email hello@brainboxworld.net.",
      };
    }

    return { ok: true };
  });
