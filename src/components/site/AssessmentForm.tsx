import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  assessmentErrorsFrom,
  assessmentSchema,
  MAIN_CONCERNS,
  PUBLISHING_STAGES,
  type AssessmentField,
  type AssessmentFieldErrors,
} from "@/lib/assessment-schema";
import { submitAssessment } from "@/lib/enquiry.functions";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

import { FieldError, FieldLabel, inputClass, newRequestId, SelectField, TextField } from "./EnquiryForm";

type Values = Record<AssessmentField, string>;
const EMPTY: Values = {
  fullName: "",
  email: "",
  bookTitle: "",
  bookLink: "",
  genre: "",
  publishingStage: "",
  mainConcern: "",
  details: "",
};

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

export function AssessmentForm() {
  const submit = useServerFn(submitAssessment);
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<AssessmentFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const requestId = useRef("");
  const startedAt = useRef(0);
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    requestId.current = newRequestId();
    startedAt.current = Date.now();
  }, []);

  const submitting = status.kind === "submitting";
  const fieldId = (f: string) => `${uid}-${f}`;
  const errId = (f: string) => `${uid}-${f}-error`;

  const update = (field: AssessmentField, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (status.kind === "error") setStatus({ kind: "idle" });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;
    const parsed = assessmentSchema.safeParse(values);
    if (!parsed.success) {
      const fe = assessmentErrorsFrom(parsed.error);
      setErrors(fe);
      setStatus({ kind: "error", message: "Please check the highlighted fields." });
      const first = Object.keys(fe)[0];
      if (first) document.getElementById(fieldId(first))?.focus();
      return;
    }
    inFlight.current = true;
    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const result = await submit({
        data: {
          values: parsed.data,
          meta: { requestId: requestId.current, website: honeypot, elapsedMs: Date.now() - startedAt.current },
        },
      });
      if (result.ok) {
        setStatus({ kind: "success" });
        setValues(EMPTY);
        requestId.current = newRequestId();
        startedAt.current = Date.now();
      } else {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setStatus({ kind: "error", message: result.error });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        kind: "error",
        message: `We couldn't reach our server. Please check your connection and try again, or email ${SITE.generalEmail}.`,
      });
    } finally {
      inFlight.current = false;
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex min-h-[28rem] flex-col items-center justify-center px-4 text-center outline-none">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-mist text-success">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-8 text-4xl text-navy">Thank you — your assessment request has been received.</h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          We'll review how your book is currently presented and reply to the email address you provided with our
          observations and suggested next steps.
        </p>
        <Button type="button" variant="outlineNavy" size="xl" className="mt-10" onClick={() => setStatus({ kind: "idle" })}>
          Request another assessment
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting} aria-describedby={`${uid}-required`}>
      <p id={`${uid}-required`} className="mb-8 text-xs text-muted-foreground">
        Fields marked <span className="text-gold-deep">*</span> are required.
      </p>
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <TextField id={fieldId("fullName")} errId={errId("fullName")} label="Full Name" autoComplete="name" value={values.fullName} error={errors.fullName} onChange={(v) => update("fullName", v)} disabled={submitting} />
        <TextField id={fieldId("email")} errId={errId("email")} label="Email Address" type="email" autoComplete="email" inputMode="email" value={values.email} error={errors.email} onChange={(v) => update("email", v)} disabled={submitting} />
        <TextField id={fieldId("bookTitle")} errId={errId("bookTitle")} label="Book Title" value={values.bookTitle} error={errors.bookTitle} onChange={(v) => update("bookTitle", v)} disabled={submitting} />
        <TextField id={fieldId("genre")} errId={errId("genre")} label="Genre" value={values.genre} error={errors.genre} onChange={(v) => update("genre", v)} disabled={submitting} />
        <div className="sm:col-span-2">
          <TextField id={fieldId("bookLink")} errId={errId("bookLink")} label="Book Link (Amazon, Goodreads or website)" type="url" inputMode="url" optional value={values.bookLink} error={errors.bookLink} onChange={(v) => update("bookLink", v)} disabled={submitting} />
        </div>
        <SelectField id={fieldId("publishingStage")} errId={errId("publishingStage")} label="Publishing Stage" placeholder="Select a stage" options={PUBLISHING_STAGES} optional={false} value={values.publishingStage} error={errors.publishingStage} onChange={(v) => update("publishingStage", v)} disabled={submitting} />
        <SelectField id={fieldId("mainConcern")} errId={errId("mainConcern")} label="Main Concern" placeholder="What would you most like help with?" options={MAIN_CONCERNS} optional={false} value={values.mainConcern} error={errors.mainConcern} onChange={(v) => update("mainConcern", v)} disabled={submitting} />
        <div className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId("details")} optional>
            Anything Else We Should Know
          </FieldLabel>
          <textarea
            id={fieldId("details")}
            rows={4}
            value={values.details}
            onChange={(e) => update("details", e.target.value)}
            disabled={submitting}
            maxLength={2000}
            placeholder="Your goals, your readers, what you've already tried…"
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? errId("details") : undefined}
            className={cn(inputClass, "resize-y leading-relaxed")}
          />
          <FieldError id={errId("details")} error={errors.details} />
        </div>
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={fieldId("website")}>Leave this field empty</label>
          <input id={fieldId("website")} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="mt-8 outline-none">
        {status.kind === "error" && (
          <p role="alert" className="flex items-start gap-3 border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          We use your details only to prepare and send your assessment.
        </p>
        <Button type="submit" variant="gold" size="xl" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Request My Assessment <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
