// Single source of truth for BrainboxPress services, packages and prices.
// Prices and quantities come from the approved brief — do not change, discount or add to them.

export type ServiceId =
  | "tiktok-instagram-feature"
  | "book-trailer"
  | "book-mockup"
  | "social-media-management"
  | "website-design"
  | "website-redesign"
  | "goodreads-listopia"
  | "book-challenge";

export interface ServicePackage {
  id: string;
  /** Label shown in the enquiry form, e.g. "Basic — 7 Days — $45" */
  formLabel: string;
  /** Short label shown on the service card, e.g. "15-second book trailer" */
  name: string;
  price: number;
}

export interface Service {
  id: ServiceId;
  number: string;
  title: string;
  /** Label used in the enquiry form dropdown */
  formLabel: string;
  description: string[];
  /** Single price (when the service has no packages) */
  price?: number;
  /** Qualifier shown next to a single price, e.g. "registration fee" */
  priceQualifier?: string;
  packages?: ServicePackage[];
  cta: string;
  /** Honest-results note shown on the card */
  note?: string;
}

export const SERVICES: Service[] = [
  {
    id: "tiktok-instagram-feature",
    number: "01",
    title: "TikTok / Instagram Book Feature",
    formLabel: "TikTok / Instagram Book Feature",
    description: [
      "A social media book feature designed to introduce books to TikTok and Instagram audiences, showcase their stories and support book discoverability.",
      "The feature provides authors with an opportunity to present their books through engaging promotional content and direct interested audiences towards their titles.",
    ],
    price: 20,
    priceQualifier: "registration fee",
    cta: "Enquire About This Service",
    note: "The $20 is a registration fee for the feature. Views, sales and reader numbers are not guaranteed.",
  },
  {
    id: "book-trailer",
    number: "02",
    title: "Book Trailer Creation",
    formLabel: "Book Trailer Creation",
    description: [
      "Creative video trailers designed to present a book's identity, storyline and atmosphere through engaging visual storytelling.",
      "Each trailer is developed to give readers a visual introduction to the book and its distinctive appeal.",
    ],
    packages: [
      { id: "trailer-15s", name: "15-second book trailer", formLabel: "15 Seconds — $95", price: 95 },
      { id: "trailer-45s", name: "45-second book trailer", formLabel: "45 Seconds — $145", price: 145 },
      { id: "trailer-2m", name: "2-minute book trailer", formLabel: "2 Minutes — $350", price: 350 },
    ],
    cta: "Request a Book Trailer",
  },
  {
    id: "book-mockup",
    number: "03",
    title: "Book Mockup Design",
    formLabel: "Book Mockup Design",
    description: [
      "Professional 3D book mockup presentations designed to showcase book covers through attractive, polished visual displays.",
      "Create an elegant presentation of your book for websites, social media, promotional campaigns and author branding.",
    ],
    price: 75,
    cta: "Order a Book Mockup",
  },
  {
    id: "social-media-management",
    number: "04",
    title: "Social Media Management",
    formLabel: "Social Media Management",
    description: [
      "BrainboxPress provides structured social media content management designed to help authors maintain an engaging, consistent and professional online presence.",
      "Each package combines professionally prepared static posts and short-form video content to showcase books, strengthen author branding and support audience engagement.",
    ],
    packages: [
      { id: "smm-basic", name: "Basic", formLabel: "Basic — 7 Days — $45", price: 45 },
      { id: "smm-standard", name: "Standard", formLabel: "Standard — 14 Days — $85", price: 85 },
      { id: "smm-premium", name: "Premium", formLabel: "Premium — 30 Days — $155", price: 155 },
    ],
    cta: "Choose a Package",
  },
  {
    id: "website-design",
    number: "05",
    title: "Website Design",
    formLabel: "Website Design",
    description: [
      "Professional custom website creation for authors who want a polished online presence to showcase their books, author identity and writing projects.",
      "Designed with an emphasis on elegant presentation, responsive layouts, user experience and professional author branding.",
    ],
    price: 845,
    cta: "Request Website Design",
  },
  {
    id: "website-redesign",
    number: "06",
    title: "Website Redesign",
    formLabel: "Website Redesign",
    description: [
      "Website redesign services focused on improving the visual appearance, structure, user experience and overall presentation of an existing author website.",
      "Transform an existing website into a more polished, organized and professional online presence.",
    ],
    price: 455,
    cta: "Request Website Redesign",
  },
  {
    id: "goodreads-listopia",
    number: "07",
    title: "Goodreads Listopia Placement",
    formLabel: "Goodreads Listopia Placement",
    description: [
      "Relevant Goodreads Listopia placement opportunities based on book genres, themes and reader interests.",
      "The service focuses on identifying relevant book-list opportunities that align with the identity and subject of each title.",
    ],
    packages: [
      { id: "listopia-2", name: "2 Listopia Lists", formLabel: "2 Lists — $95", price: 95 },
      { id: "listopia-5", name: "5 Listopia Lists", formLabel: "5 Lists — $145", price: 145 },
      { id: "listopia-10", name: "10 Listopia Lists", formLabel: "10 Lists — $357", price: 357 },
    ],
    cta: "Explore Goodreads Promotion",
    note: "Placement, rankings, votes and sales are not guaranteed.",
  },
  {
    id: "book-challenge",
    number: "08",
    title: "Book Challenge",
    formLabel: "Book Challenge",
    description: [
      "A book-focused promotional challenge designed to encourage reader awareness, engagement and interest in featured titles.",
      "A creative promotional opportunity for authors seeking additional ways to introduce their books to readers.",
    ],
    price: 75,
    cta: "Enquire About Book Challenges",
  },
];

/** Social Media Management package details (deliverables are fixed by the brief). */
export interface SocialPackage {
  packageId: string;
  name: string;
  price: number;
  durationDays: number;
  staticPosts: number;
  reels: number;
  cta: string;
  emphasis?: boolean;
}

export const SOCIAL_MEDIA_PACKAGES: SocialPackage[] = [
  { packageId: "smm-basic", name: "Basic", price: 45, durationDays: 7, staticPosts: 6, reels: 4, cta: "Choose Basic" },
  {
    packageId: "smm-standard",
    name: "Standard",
    price: 85,
    durationDays: 14,
    staticPosts: 12,
    reels: 8,
    cta: "Choose Standard",
    emphasis: true,
  },
  { packageId: "smm-premium", name: "Premium", price: 155, durationDays: 30, staticPosts: 21, reels: 9, cta: "Choose Premium" },
];

export function totalContentPieces(p: Pick<SocialPackage, "staticPosts" | "reels">) {
  return p.staticPosts + p.reels;
}

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getPackage(serviceId: string, packageId: string): ServicePackage | undefined {
  return getService(serviceId)?.packages?.find((p) => p.id === packageId);
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}
