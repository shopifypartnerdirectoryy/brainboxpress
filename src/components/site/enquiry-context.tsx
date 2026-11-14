import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

import type { ServiceId } from "@/lib/services";

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

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection>({ service: "", package: "", nonce: 0 });
  const focusTarget = useRef<HTMLElement | null>(null);

  const requestService = useCallback((service: ServiceId, packageId?: string) => {
    setSelection((prev) => ({ service, package: packageId ?? "", nonce: prev.nonce + 1 }));
    const contact = document.getElementById("contact-form") ?? document.getElementById("contact");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    contact?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => focusTarget.current?.focus({ preventScroll: true }), reduce ? 0 : 650);
  }, []);

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
