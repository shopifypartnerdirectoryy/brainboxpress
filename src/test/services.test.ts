import { describe, expect, it } from "vitest";

import { enquirySchema } from "@/lib/enquiry-schema";
import { getService, SERVICES, SOCIAL_MEDIA_PACKAGES, totalContentPieces } from "@/lib/services";

const prices = (id: string) => getService(id)?.packages?.map((p) => p.price);

describe("BrainboxPress pricing", () => {
  it("offers exactly the eight services in order", () => {
    expect(SERVICES.map((s) => s.number)).toEqual(["01", "02", "03", "04", "05", "06", "07", "08"]);
  });

  it("charges a $20 registration fee for the TikTok / Instagram feature", () => {
    const s = getService("tiktok-instagram-feature")!;
    expect(s.price).toBe(20);
    expect(s.priceQualifier).toBe("registration fee");
  });

  it("prices book trailers at $95 / $145 / $350", () => {
    expect(prices("book-trailer")).toEqual([95, 145, 350]);
  });

  it("prices single-price services exactly", () => {
    expect(getService("book-mockup")!.price).toBe(75);
    expect(getService("website-design")!.price).toBe(845);
    expect(getService("website-redesign")!.price).toBe(455);
    expect(getService("book-challenge")!.price).toBe(75);
  });

  it("prices Goodreads Listopia at $95 / $145 / $357", () => {
    expect(prices("goodreads-listopia")).toEqual([95, 145, 357]);
  });

  it("keeps Social Media Management deliverables fixed", () => {
    expect(
      SOCIAL_MEDIA_PACKAGES.map((p) => [p.name, p.price, p.durationDays, p.staticPosts, p.reels, totalContentPieces(p)]),
    ).toEqual([
      ["Basic", 45, 7, 6, 4, 10],
      ["Standard", 85, 14, 12, 8, 20],
      ["Premium", 155, 30, 21, 9, 30],
    ]);
    expect(prices("social-media-management")).toEqual([45, 85, 155]);
  });
});

describe("Enquiry form rules", () => {
  const base = {
    fullName: "Jane Writer",
    email: "jane@example.com",
    bookTitle: "The Long Road",
    authorName: "J. Writer",
    message: "I'd love to promote my new novel.",
  };

  it("requires a package for Social Media Management", () => {
    expect(enquirySchema.safeParse({ ...base, service: "social-media-management", package: "" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...base, service: "social-media-management", package: "smm-standard" }).success).toBe(true);
  });

  it("rejects a package that belongs to a different service", () => {
    expect(enquirySchema.safeParse({ ...base, service: "book-trailer", package: "smm-basic" }).success).toBe(false);
  });

  it("accepts services without packages and no package", () => {
    expect(enquirySchema.safeParse({ ...base, service: "book-mockup", package: "" }).success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    expect(enquirySchema.safeParse({ ...base, email: "not-an-email", service: "book-mockup" }).success).toBe(false);
  });
});
