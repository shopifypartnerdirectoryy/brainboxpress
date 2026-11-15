import { useNavigate } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { getPackage, getService, type ServiceId } from "@/lib/services";

interface Selection {
  service: ServiceId | "";
  package: string;
  /** Bumps on every request so the form can react even if the same selection repeats. */
  nonce: number;
}

interface EnquiryContextValue {
  selection: Selection;
  requestService: (service: ServiceId, packageId?: string) => void;
  registerFocusTarget: (el: HTMLElement | null) => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

/**
 * "scroll" (homepage): selects the service in the enquiry form and scrolls to it.
 * "navigate" (service pages): opens the homepage enquiry form with the service preselected via ?service=&package=.
 */
export function EnquiryProvider({
  children,
  mode = "scroll",
  initial,
}: {
  children: ReactNode;
  mode?: "scroll" | "navigate";
  initial?: { service?: string; package?: string };
}) {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<Selection>({ service: "", package: "", nonce: 0 });
  const focusTarget = useRef<HTMLElement | null>(null);

  const scrollToForm = useCallback(() => {
    const contact = document.getElementById("contact-form") ?? document.getElementById("contact");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    contact?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => focusTarget.current?.focus({ preventScroll: true }), reduce ? 0 : 650);
  }, []);

  const requestService = useCallback(
    (service: ServiceId, packageId?: string) => {
      if (mode === "navigate") {
        void navigate({ to: "/", search: { service, ...(packageId ? { package: packageId } : {}) } });
        return;
      }
      setSelection((prev) => ({ service, package: packageId ?? "", nonce: prev.nonce + 1 }));
      scrollToForm();
    },
    [mode, navigate, scrollToForm],
  );

  // Apply a preselection arriving in the URL (e.g. from a service page).
  const initialService = initial?.service;
  const initialPackage = initial?.package;
  useEffect(() => {
    if (mode !== "scroll" || !initialService) return;
    const service = getService(initialService);
    if (!service) return;
    const pkg = initialPackage && getPackage(service.id, initialPackage) ? initialPackage : "";
    setSelection((prev) => ({ service: service.id, package: pkg, nonce: prev.nonce + 1 }));
    // Let the router finish its own scroll handling before moving to the form.
    const t = window.setTimeout(scrollToForm, 150);
    return () => window.clearTimeout(t);
  }, [mode, initialService, initialPackage, scrollToForm]);

  const registerFocusTarget = useCallback((el: HTMLElement | null) => {
    focusTarget.current = el;
  }, []);

  const value = useMemo(() => ({ selection, requestService, registerFocusTarget }), [selection, requestService, registerFocusTarget]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
}
