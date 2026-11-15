import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { enquirySchema } from "@/lib/enquiry-schema";
import {
  emailMarketingPrice,
  getService,
  priceSummary,
  SERVICES,
  SOCIAL_MEDIA_PACKAGES,
  totalContentPieces,
} from "@/lib/services";
import { SITE } from "@/lib/site";
import { buildStaticFormsPayload } from "@/lib/static-forms";

const prices = (id: string) => getService(id)?.packages?.map((p) => p.price);

describe("BrainboxPress approved pricing", () => {
  it("charges $25 per book for the TikTok Book Feature", () => {
    const s = getService("tiktok-book-feature")!;
    expect(s.price).toBe(25);
    expect(priceSummary(s)).toBe("$25 per book");
  });

  it("lists the six approved TikTok feature inclusions", () => {
    expect(getService("tiktok-book-feature")!.inclusions).toEqual([
      "Book cover, title and author presentation",
      "Two to three story highlights",
      "Engaging presentation of the book",
      "Direct book link",
      "Proposed wording for author review and approval",
      "Clean closing screen",
    ]);
  });

  it("charges $35 per book for the separate Instagram Book Feature", () => {
    const s = getService("instagram-book-feature")!;
    expect(s.price).toBe(35);
    expect(priceSummary(s)).toBe("$35 per book");
  });

  it("prices book trailers at $65 (15s) / $125 (30s) / $265 (60s)", () => {
    expect(prices("book-trailer")).toEqual([65, 125, 265]);
    const labels = getService("book-trailer")!.packages!.map((p) => p.formLabel);
    expect(labels[0]).toContain("15 Seconds");
    expect(labels[1]).toContain("30 Seconds");
    expect(labels[2]).toContain("60 Seconds (1 Minute)");
  });

  it("never describes any trailer as two minutes", () => {
    const text = JSON.stringify(getService("book-trailer"));
    expect(text).not.toMatch(/2[- ]minute|two[- ]minute|2 Minutes/i);
  });

  it("prices social media packages at $45 / $85 / $155", () => {
    expect(prices("social-media-management")).toEqual([45, 85, 155]);
    expect(SOCIAL_MEDIA_PACKAGES.map((p) => p.price)).toEqual([45, 85, 155]);
  });

  it("keeps social media durations and deliverables (7d 6+4, 14d 12+8, 30d 21+9)", () => {
    expect(SOCIAL_MEDIA_PACKAGES.map((p) => [p.durationDays, p.staticPosts, p.reels])).toEqual([
      [7, 6, 4],
      [14, 12, 8],
      [30, 21, 9],
    ]);
    expect(SOCIAL_MEDIA_PACKAGES.map(totalContentPieces)).toEqual([10, 20, 30]);
  });

  it("prices Book Challenge packages at $150 / $275 / $395", () => {
    expect(prices("book-challenge")).toEqual([150, 275, 395]);
  });

  it("charges $0.50 per contact for email marketing", () => {
    expect(getService("email-marketing")!.price).toBe(0.5);
    expect(priceSummary(getService("email-marketing")!)).toBe("$0.50 per contact");
    expect([1000, 2000, 5000, 10000].map(emailMarketingPrice)).toEqual([500, 1000, 2500, 5000]);
  });

  it("lists email marketing examples from 1,000 ($500) to 10,000 ($5,000) contacts", () => {
    const pkgs = getService("email-marketing")!.packages!.filter((p) => p.price !== undefined);
    expect(pkgs.map((p) => p.price)).toEqual([500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]);
  });

  it("prices audiobook services by custom quote only", () => {
    const s = getService("audiobook")!;
    expect(s.price).toBeUndefined();
    expect(s.packages).toBeUndefined();
    expect(s.cta).toBe("Request a Custom Quote");
    expect(priceSummary(s)).toBe("Custom quote");
  });

  it("keeps the other existing service prices", () => {
    expect(getService("book-mockup")!.price).toBe(75);
    expect(getService("website-design")!.price).toBe(845);
    expect(getService("website-redesign")!.price).toBe(455);
    expect(prices("goodreads-listopia")).toEqual([95, 145, 357]);
  });

  it("gives every service a unique slug, number and SEO title", () => {
    for (const key of ["slug", "number"] as const) {
      expect(new Set(SERVICES.map((s) => s[key])).size).toBe(SERVICES.length);
    }
    expect(new Set(SERVICES.map((s) => s.seo.title)).size).toBe(SERVICES.length);
  });

  it("lists every service page in the sitemap", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const s of SERVICES) expect(sitemap).toContain(`/services/${s.slug}</loc>`);
  });
});

describe("Brand", () => {
  it("uses the official tagline", () => {
    expect(SITE.tagline).toBe("A World of Discoverability & Growth");
  });
});

describe("Enquiry form validation", () => {
  const base = {
    fullName: "Jane Doe",
    email: "jane@example.com",
    bookTitle: "My Book",
    authorName: "Jane Doe",
    message: "I'd love to learn more about this service.",
  };

  it("requires a package for services that have packages", () => {
    expect(enquirySchema.safeParse({ ...base, service: "book-trailer", package: "" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...base, service: "book-trailer", package: "trailer-premium" }).success).toBe(true);
  });

  it("accepts single-price and quote services without a package", () => {
    expect(enquirySchema.safeParse({ ...base, service: "tiktok-book-feature", package: "" }).success).toBe(true);
    expect(enquirySchema.safeParse({ ...base, service: "audiobook", package: "" }).success).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(enquirySchema.safeParse({ ...base, email: "nope", service: "book-mockup" }).success).toBe(false);
  });
});

describe("Static Forms payload", () => {
  it("uses exactly the apiKey, name, email, subject and message fields", () => {
    const payload = buildStaticFormsPayload("key", {
      fullName: "Jane Doe",
      email: "jane@example.com",
      bookTitle: "My Book",
      authorName: "J. Doe",
      serviceLabel: "Book Trailer Creation",
      packageLabel: "Premium — 60 Seconds (1 Minute) — $265",
      message: "Hello",
    });
    expect(Object.keys(payload).sort()).toEqual(["apiKey", "email", "message", "name", "subject"]);
    expect(payload.name).toBe("Jane Doe");
    expect(payload.email).toBe("jane@example.com");
    expect(payload.message).toContain("Package: Premium — 60 Seconds (1 Minute) — $265");
  });
});
