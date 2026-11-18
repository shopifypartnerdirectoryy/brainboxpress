import { SERVICES, type Service, type ServiceId } from "./services";

/**
 * The six BrainboxPress service departments. A department lists only services that exist in
 * `SERVICES`; departments without any services are hidden automatically.
 */
export interface Department {
  id: string;
  title: string;
  summary: string;
  serviceIds: ServiceId[];
}

export const DEPARTMENTS: Department[] = [
  {
    id: "publishing",
    title: "Publishing & Book Preparation",
    summary: "Editing, proofreading, formatting, covers and publishing help — so your book is ready before it reaches readers.",
    serviceIds: ["book-editing", "proofreading", "book-formatting", "book-cover-design", "kdp-publishing-assistance", "book-mockup"],
  },
  {
    id: "optimization",
    title: "Book Optimization & Discoverability",
    summary: "Clearer listings and better-targeted metadata so the right readers can find and understand your book.",
    serviceIds: ["amazon-kdp-optimization", "discoverability-optimization", "goodreads-listopia"],
  },
  {
    id: "marketing",
    title: "Book Marketing & Promotion",
    summary: "Features, trailers, social media and campaigns that introduce your book to new readers.",
    serviceIds: [
      "tiktok-book-feature",
      "instagram-book-feature",
      "book-trailer",
      "social-media-management",
      "book-launch-campaign",
      "book-marketing-strategy",
      "book-challenge",
    ],
  },
  {
    id: "branding",
    title: "Author Branding & Online Presence",
    summary: "A consistent, professional author identity across your website and profiles.",
    serviceIds: ["author-branding", "website-design", "website-redesign"],
  },
  {
    id: "engagement",
    title: "Reader Engagement & Retention",
    summary: "Permission-based ways to build and keep relationships with readers who chose to hear from you.",
    serviceIds: ["author-newsletter-setup", "email-marketing", "arc-reader-coordination"],
  },
  {
    id: "audio",
    title: "Audio, Translation & Adaptation",
    summary: "Bringing your book to listeners, coordinated with specialist professionals.",
    serviceIds: ["audiobook", "book-translation", "book-adaptation"],
  },
];

export function departmentServices(d: Department): Service[] {
  return d.serviceIds.map((id) => SERVICES.find((s) => s.id === id)).filter((s): s is Service => !!s);
}

export function visibleDepartments() {
  return DEPARTMENTS.map((d) => ({ ...d, services: departmentServices(d) })).filter((d) => d.services.length > 0);
}

export function departmentOf(serviceId: ServiceId) {
  return DEPARTMENTS.find((d) => d.serviceIds.includes(serviceId));
}
