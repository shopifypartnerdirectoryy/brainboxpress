import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { BUDGET_RANGES, CONTACT_METHODS, PUBLISHING_STAGES } from "@/lib/assessment-schema";
import { enquirySchema, fieldErrorsFrom, type EnquiryField, type EnquiryFieldErrors } from "@/lib/enquiry-schema";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { getService, SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

import { useEnquiry } from "./enquiry-context";

type Values = {
  fullName: string;
  email: string;
  bookTitle: string;
  authorName: string;
  service: string;
  package: string;
  message: string;
  publishingStage: string;
  budget: string;
  preferredContact: string;
  phone: string;
};

const EMPTY: Values = {
  fullName: "",
  email: "",
  bookTitle: "",
  authorName: "",
  service: "",
  package: "",
  message: "",
  publishingStage: "",
  budget: "",
  preferredContact: "",
  phone: "",
};

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success" } | { kind: "error"; message: string };

export const newRequestId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (Number(c) ^ (Math.random() * 16) >> (Number(c) / 4)).toString(16),
      );

export function EnquiryForm() {
  const submit = useServerFn(submitEnquiry);
  const { selection, registerFocusTarget } = useEnquiry();
  const uid = useId();

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const requestId = useRef<string>("");
  const startedAt = useRef<number>(0);
  const inFlight = useRef(false);
  const serviceRef = useRef<HTMLSelectElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    requestId.current = newRequestId();
    startedAt.current = Date.now();
  }, []);

  // Pre-select the service / package chosen from a service button.
  useEffect(() => {
    if (!selection.nonce) return;
    setValues((v) => ({ ...v, service: selection.service, package: selection.package }));
    setErrors((e) => ({ ...e, service: undefined, package: undefined }));
    if (status.kind === "success") setStatus({ kind: "idle" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.nonce]);

  useEffect(() => {
    registerFocusTarget(serviceRef.current);
    return () => registerFocusTarget(null);
  }, [registerFocusTarget]);

  const service = values.service ? getService(values.service) : undefined;
  const packages = service?.packages ?? [];
  const submitting = status.kind === "submitting";

  const update = (field: keyof Values, value: string) => {
    setValues((v) => {
      const next = { ...v, [field]: value };
      if (field === "service") next.package = "";
      return next;
    });
    if (errors[field as EnquiryField]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (status.kind === "error") setStatus({ kind: "idle" });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const fe = fieldErrorsFrom(parsed.error);
      setErrors(fe);
      setStatus({ kind: "error", message: "Please check the highlighted fields." });
      const first = Object.keys(fe)[0];
      if (first) document.getElementById(`${uid}-${first}`)?.focus();
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
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[32rem] flex-col items-center justify-center px-4 text-center outline-none"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-mist text-success">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-8 text-4xl text-navy">Thank you — your enquiry has been received.</h3>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          We'll review the details of your book and reply to the email address you provided. For anything urgent,
          write to{" "}
          <a className="text-navy underline decoration-gold underline-offset-4" href={`mailto:${SITE.generalEmail}`}>
            {SITE.generalEmail}
          </a>
          .
        </p>
        <Button type="button" variant="outlineNavy" size="xl" className="mt-10" onClick={() => setStatus({ kind: "idle" })}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const fieldId = (f: string) => `${uid}-${f}`;
  const errId = (f: string) => `${uid}-${f}-error`;

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-required`} aria-busy={submitting}>
      <p id={`${uid}-required`} className="mb-8 text-xs text-muted-foreground">
        Fields marked <span className="text-gold-deep">*</span> are required.
      </p>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <TextField id={fieldId("fullName")} errId={errId("fullName")} label="Full Name" autoComplete="name" value={values.fullName} error={errors.fullName} onChange={(v) => update("fullName", v)} disabled={submitting} />
        <TextField id={fieldId("email")} errId={errId("email")} label="Email Address" type="email" autoComplete="email" inputMode="email" value={values.email} error={errors.email} onChange={(v) => update("email", v)} disabled={submitting} />
        <TextField id={fieldId("bookTitle")} errId={errId("bookTitle")} label="Book Title" value={values.bookTitle} error={errors.bookTitle} onChange={(v) => update("bookTitle", v)} disabled={submitting} />
        <TextField id={fieldId("authorName")} errId={errId("authorName")} label="Author Name" value={values.authorName} error={errors.authorName} onChange={(v) => update("authorName", v)} disabled={submitting} />

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId("service")}>Service Interested In</FieldLabel>
          <div className="relative">
            <select
              ref={serviceRef}
              id={fieldId("service")}
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
              disabled={submitting}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? errId("service") : undefined}
              className={cn(inputClass, "appearance-none pr-10", !values.service && "text-muted-foreground")}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.formLabel}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-deep" />
          </div>
          <FieldError id={errId("service")} error={errors.service} />
        </div>

        {packages.length > 0 && packages.length <= 4 && (
          <fieldset
            className="sm:col-span-2"
            aria-describedby={errors.package ? errId("package") : undefined}
            aria-invalid={!!errors.package}
          >
            <legend className="eyebrow mb-4 text-navy">
              Choose a Package <span className="text-gold-deep">*</span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {packages.map((p, i) => {
                const checked = values.package === p.id;
                return (
                  <label
                    key={p.id}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-3 border px-4 py-4 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                      checked ? "border-navy bg-navy text-navy-foreground" : "border-input bg-card text-charcoal hover:border-navy/50",
                      submitting && "pointer-events-none opacity-60",
                    )}
                  >
                    <input
                      id={i === 0 ? fieldId("package") : undefined}
                      type="radio"
                      name={`${uid}-package`}
                      value={p.id}
                      checked={checked}
                      onChange={() => update("package", p.id)}
                      disabled={submitting}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border", checked ? "border-gold" : "border-navy/40")}
                    >
                      {checked && <span className="h-2 w-2 rounded-full bg-gold" />}
                    </span>
                    <span className="font-medium">{p.formLabel}</span>
                  </label>
                );
              })}
            </div>
            <FieldError id={errId("package")} error={errors.package} />
          </fieldset>
        )}

        {packages.length > 4 && (
          <div className="sm:col-span-2">
            <FieldLabel htmlFor={fieldId("package")}>Choose a Package</FieldLabel>
            <div className="relative">
              <select
                id={fieldId("package")}
                value={values.package}
                onChange={(e) => update("package", e.target.value)}
                disabled={submitting}
                aria-invalid={!!errors.package}
                aria-describedby={errors.package ? errId("package") : undefined}
                className={cn(inputClass, "appearance-none pr-10", !values.package && "text-muted-foreground")}
              >
                <option value="" disabled>
                  Select a package
                </option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.formLabel}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-deep" />
            </div>
            <FieldError id={errId("package")} error={errors.package} />
          </div>
        )}

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId("message")}>Message</FieldLabel>
          <textarea
            id={fieldId("message")}
            rows={5}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            disabled={submitting}
            maxLength={3000}
            placeholder={service?.messageHint ?? "Tell us about your book, genre, audience and what you'd like to achieve."}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? errId("message") : undefined}
            className={cn(inputClass, "resize-y leading-relaxed")}
          />
          <FieldError id={errId("message")} error={errors.message} />
        </div>

        <SelectField
          id={fieldId("publishingStage")}
          errId={errId("publishingStage")}
          label="Publishing Stage"
          placeholder="Select a stage"
          options={PUBLISHING_STAGES}
          value={values.publishingStage}
          error={errors.publishingStage}
          onChange={(v) => update("publishingStage", v)}
          disabled={submitting}
        />
        <SelectField
          id={fieldId("budget")}
          errId={errId("budget")}
          label="Budget Range"
          placeholder="Select a range"
          options={BUDGET_RANGES}
          value={values.budget}
          error={errors.budget}
          onChange={(v) => update("budget", v)}
          disabled={submitting}
        />
        <SelectField
          id={fieldId("preferredContact")}
          errId={errId("preferredContact")}
          label="Preferred Contact"
          placeholder="Select a method"
          options={CONTACT_METHODS}
          value={values.preferredContact}
          error={errors.preferredContact}
          onChange={(v) => update("preferredContact", v)}
          disabled={submitting}
        />
        <TextField
          id={fieldId("phone")}
          errId={errId("phone")}
          label="Phone / WhatsApp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          optional={values.preferredContact !== "Phone" && values.preferredContact !== "WhatsApp"}
          value={values.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
          disabled={submitting}
        />

        {/* Honeypot: hidden from people, tempting for bots. */}
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
          We use your details only to reply to your enquiry.
        </p>
        <Button type="submit" variant="gold" size="xl" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send Enquiry <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export const inputClass =
  "block w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-charcoal placeholder:text-muted-foreground/70 transition-colors focus:border-navy focus:outline-none focus:ring-0 focus-visible:outline-none disabled:opacity-60 aria-[invalid=true]:border-destructive";

export function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow block text-navy">
      {children}{" "}
      {optional ? (
        <span className="font-sans text-[0.7rem] normal-case tracking-normal text-muted-foreground">(optional)</span>
      ) : (
        <span className="text-gold-deep">*</span>
      )}
    </label>
  );
}

export function SelectField({
  id,
  errId,
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
  disabled,
  optional = true,
}: {
  id: string;
  errId: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  disabled?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={cn(inputClass, "appearance-none pr-10", !value && "text-muted-foreground")}
        >
          <option value="" disabled={!optional}>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-deep" />
      </div>
      <FieldError id={errId} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string | undefined }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 text-xs text-destructive">
      {error}
    </p>
  );
}

export function TextField({
  id,
  errId,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
  disabled,
  optional = false,
}: {
  id: string;
  errId: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  type?: string;
  autoComplete?: string | undefined;
  inputMode?: "email" | "text" | "tel" | "url" | undefined;
  disabled?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        disabled={disabled}
        required={!optional}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={inputClass}
      />
      <FieldError id={errId} error={error} />
    </div>
  );
}
