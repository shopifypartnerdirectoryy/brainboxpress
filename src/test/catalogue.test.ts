import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { assessmentSchema } from "@/lib/assessment-schema";
import { DEPARTMENTS, visibleDepartments } from "@/lib/departments";
import { enquirySchema } from "@/lib/enquiry-schema";
import { ARTICLES } from "@/lib/resources";
import { getService, SERVICES } from "@/lib/services";
import { buildAssessmentPayload } from "@/lib/static-forms";

const NEW_QUOTE_SERVICES = [
  "amazon-kdp-optimization",
  "book-cover-design",
  "book-formatting",
  "book-launch-campaign",
  "author-branding",
  "book-editing",
  "proofreading",
  "kdp-publishing-assistance",
  "discoverability-optimization",
  "book-marketing-strategy",
  "arc-reader-coordination",
  "author-newsletter-setup",
  "book-translation",
  "book-adaptation",
];

describe("Service catalogue", () => {
  it("offers the newly approved services by quote only, with no invented price", () => {
    for (const id of NEW_QUOTE_SERVICES) {
      const s = getService(id);
      expect(s, id).toBeDefined();
      expect(s!.price, id).toBeUndefined();
      expect(s!.packages, id).toBeUndefined();
      expect(s!.cta, id).toBe("Request a Quote");
    }
  });

  it("places every service in exactly one of the six departments", () => {
    expect(DEPARTMENTS).toHaveLength(6);
    for (const s of SERVICES) {
      expect(DEPARTMENTS.filter((d) => d.serviceIds.includes(s.id)), s.id).toHaveLength(1);
    }
    expect(visibleDepartments()).toHaveLength(6);
  });

  it("lists the overview, assessment, resources, legal and article pages in the sitemap", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const p of ["/services", "/assessment", "/resources", "/privacy", "/terms", "/refund-policy"]) {
      expect(sitemap).toContain(`${p}</loc>`);
    }
    for (const a of ARTICLES) expect(sitemap).toContain(`/resources/${a.slug}</loc>`);
  });

  it("links author guides only to services that exist", () => {
    const slugs = new Set(SERVICES.map((s) => s.slug));
    for (const a of ARTICLES) for (const slug of a.relatedServiceSlugs ?? []) expect(slugs.has(slug), slug).toBe(true);
  });
});

describe("Enquiry contact details", () => {
  const base = {
    fullName: "Jane Doe",
    email: "jane@example.com",
    bookTitle: "My Book",
    authorName: "Jane Doe",
    service: "book-mockup",
    message: "I'd love to learn more about this service.",
  };

  it("keeps stage, budget, contact method and phone optional", () => {
    expect(enquirySchema.safeParse(base).success).toBe(true);
  });

  it("requires a phone number when the author prefers phone or WhatsApp", () => {
    expect(enquirySchema.safeParse({ ...base, preferredContact: "WhatsApp" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...base, preferredContact: "WhatsApp", phone: "+234 801 234 5678" }).success).toBe(true);
  });
});

describe("Book Visibility Assessment", () => {
  const base = {
    fullName: "Jane Doe",
    email: "jane@example.com",
    bookTitle: "My Book",
    genre: "Mystery",
    publishingStage: "Recently published (under 6 months)",
    mainConcern: "Readers aren't finding my book",
  };

  it("requires publishing stage and main concern, but not a book link", () => {
    expect(assessmentSchema.safeParse(base).success).toBe(true);
    expect(assessmentSchema.safeParse({ ...base, publishingStage: "" }).success).toBe(false);
    expect(assessmentSchema.safeParse({ ...base, mainConcern: "" }).success).toBe(false);
  });

  it("rejects a book link that isn't a full web address", () => {
    expect(assessmentSchema.safeParse({ ...base, bookLink: "amazon" }).success).toBe(false);
    expect(assessmentSchema.safeParse({ ...base, bookLink: "https://www.amazon.com/dp/B000" }).success).toBe(true);
  });

  it("sends Static Forms only the apiKey, name, email, subject and message fields", () => {
    const parsed = assessmentSchema.parse(base);
    const payload = buildAssessmentPayload("key", parsed);
    expect(Object.keys(payload).sort()).toEqual(["apiKey", "email", "message", "name", "subject"]);
    expect(payload.message).toContain("Main concern: Readers aren't finding my book");
  });
});
