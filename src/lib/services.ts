// Single source of truth for BrainboxPress services, packages and prices.
// Prices, durations and quantities are the latest approved figures — do not change, discount or add to them.

export type ServiceId =
  | "tiktok-book-feature"
  | "instagram-book-feature"
  | "book-trailer"
  | "social-media-management"
  | "email-marketing"
  | "book-mockup"
  | "audiobook"
  | "website-design"
  | "website-redesign"
  | "goodreads-listopia"
  | "book-challenge"
  | "amazon-kdp-optimization"
  | "book-cover-design"
  | "book-formatting"
  | "book-launch-campaign"
  | "author-branding";

export type ServiceCategory = "visibility" | "presence" | "reach";

export interface ServicePackage {
  id: string;
  /** Short package name shown on cards, e.g. "Basic" or "2 Lists" */
  name: string;
  /** What the package is, e.g. "15-second book trailer" */
  detail?: string;
  /** Label shown in the enquiry form, e.g. "Basic — 15 Seconds — $65" */
  formLabel: string;
  /** Omitted only for open-ended options priced by a stated rate. */
  price?: number;
}

export interface Service {
  id: ServiceId;
  /** URL segment of the service page: /services/<slug> */
  slug: string;
  number: string;
  title: string;
  category: ServiceCategory;
  /** Label used in the enquiry form dropdown */
  formLabel: string;
  /** One-sentence summary for overviews and the pricing table */
  summary: string;
  description: string[];
  /** Approved inclusions. Only list what has been approved — never invent deliverables. */
  inclusions?: string[];
  /** Single or per-unit price */
  price?: number;
  /** Unit shown after a price, e.g. "per book" */
  priceUnit?: string;
  /** Set when the service is priced by custom quote; explains the basis */
  quoteBasis?: string;
  packages?: ServicePackage[];
  cta: string;
  /** Honest-results note shown with the service */
  note?: string;
  /**
   * Areas a quotation can cover, for quote-based services. Unlike `inclusions`, these are not a fixed
   * package: the exact scope is agreed in writing before work begins.
   */
  scope?: string[];
  /** Who the service is for */
  audience?: string;
  /** Hint shown in the enquiry message box when this service is selected */
  messageHint?: string;
  seo: { title: string; description: string };
}

export const EMAIL_MARKETING_RATE = 0.5;
export const EMAIL_MARKETING_EXAMPLES = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

const fmtCount = (n: number) => n.toLocaleString("en-US");

export function formatPrice(price: number) {
  return Number.isInteger(price)
    ? `$${price.toLocaleString("en-US")}`
    : `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function emailMarketingPrice(contacts: number) {
  return Math.round(contacts * EMAIL_MARKETING_RATE * 100) / 100;
}

export const SERVICES: Service[] = [
  {
    id: "tiktok-book-feature",
    slug: "tiktok-book-promotion",
    number: "01",
    title: "TikTok Book Feature",
    category: "visibility",
    formLabel: "TikTok Book Feature — $25 per book",
    summary: "A paid TikTok feature that presents your book, its story and a direct link to TikTok audiences.",
    description: [
      "A paid TikTok book feature that introduces your book to TikTok audiences through an engaging presentation of its cover, story and author.",
      "Proposed wording is shared with you for review and approval, and every feature closes with a clean end screen and a direct link to your book.",
    ],
    inclusions: [
      "Book cover, title and author presentation",
      "Two to three story highlights",
      "Engaging presentation of the book",
      "Direct book link",
      "Proposed wording for author review and approval",
      "Clean closing screen",
    ],
    price: 25,
    priceUnit: "per book",
    cta: "Book a TikTok Feature",
    note: "A single book feature — not a social media management campaign. Views, sales and reader numbers are not guaranteed.",
    seo: {
      title: "TikTok Book Promotion — $25 Book Feature | BrainboxPress",
      description:
        "Promote your book on TikTok with a BrainboxPress book feature: cover, title and author presentation, story highlights, a direct book link and author approval. $25 per book.",
    },
  },
  {
    id: "instagram-book-feature",
    slug: "instagram-book-promotion",
    number: "02",
    title: "Instagram Book Feature",
    category: "visibility",
    formLabel: "Instagram Book Feature — $35 per book",
    summary: "A separate book feature prepared specifically for Instagram audiences.",
    description: [
      "A dedicated book feature prepared specifically for Instagram, presenting your book to Instagram audiences in a polished format suited to the platform.",
      "It is booked and priced separately from the TikTok Book Feature, so you can choose the platform that best suits your readers — or feature your book on both.",
    ],
    price: 35,
    priceUnit: "per book",
    cta: "Book an Instagram Feature",
    note: "Separate from the TikTok Book Feature. Views, sales and reader numbers are not guaranteed.",
    seo: {
      title: "Instagram Book Promotion — $35 Book Feature | BrainboxPress",
      description:
        "Introduce your book to Instagram readers with a dedicated BrainboxPress Instagram book feature, prepared separately from our TikTok feature. $35 per book.",
    },
  },
  {
    id: "book-trailer",
    slug: "book-trailers",
    number: "03",
    title: "Book Trailer Creation",
    category: "visibility",
    formLabel: "Book Trailer Creation",
    summary: "Creative video trailers in 15-second, 30-second and 60-second (1-minute) formats.",
    description: [
      "Creative video trailers designed to present a book's identity, storyline and atmosphere through engaging visual storytelling.",
      "Each trailer is developed to give readers a visual introduction to the book and its distinctive appeal.",
    ],
    packages: [
      { id: "trailer-basic", name: "Basic", detail: "15-second book trailer", formLabel: "Basic — 15 Seconds — $65", price: 65 },
      { id: "trailer-standard", name: "Standard", detail: "30-second book trailer", formLabel: "Standard — 30 Seconds — $125", price: 125 },
      {
        id: "trailer-premium",
        name: "Premium",
        detail: "60-second (1-minute) book trailer",
        formLabel: "Premium — 60 Seconds (1 Minute) — $265",
        price: 265,
      },
    ],
    cta: "Request a Book Trailer",
    seo: {
      title: "Book Trailer Services — 15, 30 & 60 Seconds | BrainboxPress",
      description:
        "Professional book trailers that present your story's identity and atmosphere. Basic 15 seconds $65, Standard 30 seconds $125, Premium 60 seconds (1 minute) $265.",
    },
  },
  {
    id: "social-media-management",
    slug: "author-social-media-management",
    number: "04",
    title: "Social Media Management",
    category: "presence",
    formLabel: "Social Media Management",
    summary: "Structured static posts and reels over 7, 14 or 30 days.",
    description: [
      "BrainboxPress provides structured social media content management designed to help authors maintain an engaging, consistent and professional online presence.",
      "Each package combines professionally prepared static posts and short-form video content to showcase books, strengthen author branding and support audience engagement.",
    ],
    packages: [
      { id: "smm-basic", name: "Basic", detail: "7 days · 6 static posts · 4 reels", formLabel: "Basic — 7 Days — $45", price: 45 },
      { id: "smm-standard", name: "Standard", detail: "14 days · 12 static posts · 8 reels", formLabel: "Standard — 14 Days — $85", price: 85 },
      { id: "smm-premium", name: "Premium", detail: "30 days · 21 static posts · 9 reels", formLabel: "Premium — 30 Days — $155", price: 155 },
    ],
    cta: "Choose a Package",
    seo: {
      title: "Author Social Media Management — From $45 | BrainboxPress",
      description:
        "Social media management for authors: static posts and reels over 7, 14 or 30 days. Basic $45, Standard $85, Premium $155 — clear deliverables, no hidden extras.",
    },
  },
  {
    id: "email-marketing",
    slug: "email-marketing-for-authors",
    number: "05",
    title: "Email Marketing",
    category: "reach",
    formLabel: "Email Marketing — $0.50 per contact",
    summary: "Email marketing for authors, priced transparently at $0.50 per contact.",
    description: [
      "Email marketing for authors who want to introduce their book to readers by email, with pricing that is simple to understand.",
      "Every campaign is priced at $0.50 per contact. Choose the number of contacts that suits your goals and we'll discuss your book and campaign with you by email.",
    ],
    price: EMAIL_MARKETING_RATE,
    priceUnit: "per contact",
    packages: [
      ...EMAIL_MARKETING_EXAMPLES.map((n) => ({
        id: `email-${n}`,
        name: `${fmtCount(n)} contacts`,
        formLabel: `${fmtCount(n)} Contacts — ${formatPrice(emailMarketingPrice(n))}`,
        price: emailMarketingPrice(n),
      })),
      { id: "email-other", name: "Another quantity", detail: "$0.50 per contact", formLabel: "Another quantity — $0.50 per contact" },
    ],
    cta: "Enquire About Email Marketing",
    note: "Opens, clicks, reviews and sales are not guaranteed.",
    messageHint: "Tell us about your book and how many contacts you'd like to reach.",
    seo: {
      title: "Email Marketing for Authors — $0.50 per Contact | BrainboxPress",
      description:
        "Email marketing for authors at a transparent $0.50 per contact — 1,000 contacts $500, 5,000 contacts $2,500, 10,000 contacts $5,000. Enquire with BrainboxPress.",
    },
  },
  {
    id: "book-mockup",
    slug: "3d-book-mockups",
    number: "06",
    title: "Book Mockup Design",
    category: "visibility",
    formLabel: "Book Mockup Design — $75",
    summary: "Polished 3D mockups that present your book cover professionally.",
    description: [
      "Professional 3D book mockup presentations designed to showcase book covers through attractive, polished visual displays.",
      "Create an elegant presentation of your book for websites, social media, promotional campaigns and author branding.",
    ],
    price: 75,
    cta: "Order a Book Mockup",
    seo: {
      title: "3D Book Mockup Design — $75 | BrainboxPress",
      description:
        "Professional 3D book mockups that showcase your cover for websites, social media, promotional campaigns and author branding. $75 from BrainboxPress.",
    },
  },
  {
    id: "audiobook",
    slug: "audiobook-services",
    number: "07",
    title: "Audiobook Services",
    category: "reach",
    formLabel: "Audiobook Services — custom quote",
    summary: "Audiobook services priced according to the number of pages in your book.",
    description: [
      "Audiobook services for authors who want to bring their book to listeners in audio format.",
      "Pricing is based on the number of pages in your book. Share your page count with us and we'll prepare a custom quote.",
    ],
    quoteBasis: "Priced by page count",
    cta: "Request a Custom Quote",
    messageHint: "Please include your book's page count, genre and anything else we should know.",
    seo: {
      title: "Audiobook Services for Authors — Custom Quotes | BrainboxPress",
      description:
        "Audiobook services for authors, priced by the number of pages in your book. Share your page count with BrainboxPress and request a custom quote.",
    },
  },
  {
    id: "website-design",
    slug: "author-website-design",
    number: "08",
    title: "Website Design",
    category: "presence",
    formLabel: "Website Design — $845",
    summary: "A custom author website to showcase your books and author identity.",
    description: [
      "Professional custom website creation for authors who want a polished online presence to showcase their books, author identity and writing projects.",
      "Designed with an emphasis on elegant presentation, responsive layouts, user experience and professional author branding.",
    ],
    price: 845,
    cta: "Request Website Design",
    seo: {
      title: "Author Website Design — $845 | BrainboxPress",
      description:
        "Custom author website design with elegant presentation, responsive layouts and professional author branding to showcase your books. $845 from BrainboxPress.",
    },
  },
  {
    id: "website-redesign",
    slug: "author-website-redesign",
    number: "09",
    title: "Website Redesign",
    category: "presence",
    formLabel: "Website Redesign — $455",
    summary: "A refreshed, more polished version of your existing author website.",
    description: [
      "Website redesign services focused on improving the visual appearance, structure, user experience and overall presentation of an existing author website.",
      "Transform an existing website into a more polished, organized and professional online presence.",
    ],
    price: 455,
    cta: "Request Website Redesign",
    seo: {
      title: "Author Website Redesign — $455 | BrainboxPress",
      description:
        "Redesign your existing author website with improved visuals, structure and user experience for a more polished, professional online presence. $455.",
    },
  },
  {
    id: "goodreads-listopia",
    slug: "goodreads-listopia-placement",
    number: "10",
    title: "Goodreads Listopia Placement",
    category: "reach",
    formLabel: "Goodreads Listopia Placement",
    summary: "Relevant Goodreads Listopia opportunities matched to your book's genre and themes.",
    description: [
      "Relevant Goodreads Listopia placement opportunities based on book genres, themes and reader interests.",
      "The service focuses on identifying relevant book-list opportunities that align with the identity and subject of each title.",
    ],
    packages: [
      { id: "listopia-2", name: "2 Lists", formLabel: "2 Lists — $95", price: 95 },
      { id: "listopia-5", name: "5 Lists", formLabel: "5 Lists — $145", price: 145 },
      { id: "listopia-10", name: "10 Lists", formLabel: "10 Lists — $357", price: 357 },
    ],
    cta: "Explore Goodreads Promotion",
    note: "Placement, rankings, votes and sales are not guaranteed.",
    seo: {
      title: "Goodreads Listopia Placement — From $95 | BrainboxPress",
      description:
        "Goodreads Listopia placement opportunities matched to your book's genre and themes: 2 lists $95, 5 lists $145, 10 lists $357. Results are not guaranteed.",
    },
  },
  {
    id: "book-challenge",
    slug: "book-challenge",
    number: "11",
    title: "Book Challenge",
    category: "reach",
    formLabel: "Book Challenge",
    summary: "A reader-focused promotional challenge for featured titles.",
    description: [
      "A book-focused promotional challenge designed to encourage reader awareness, engagement and interest in featured titles.",
      "A creative promotional opportunity for authors seeking additional ways to introduce their books to readers.",
    ],
    packages: [
      { id: "challenge-basic", name: "Basic", formLabel: "Basic — $150", price: 150 },
      { id: "challenge-standard", name: "Standard", formLabel: "Standard — $275", price: 275 },
      { id: "challenge-premium", name: "Premium", formLabel: "Premium — $395", price: 395 },
    ],
    cta: "Enquire About Book Challenges",
    seo: {
      title: "Book Challenge Promotion — From $150 | BrainboxPress",
      description:
        "A book-focused promotional challenge that encourages reader awareness and engagement. Basic $150, Standard $275, Premium $395 from BrainboxPress.",
    },
  },
  {
    id: "amazon-kdp-optimization",
    slug: "amazon-kdp-optimization",
    number: "12",
    title: "Amazon KDP Optimization",
    category: "visibility",
    formLabel: "Amazon KDP Optimization — request a quote",
    summary: "A review and refresh of your Amazon book listing so readers can find and understand your book.",
    description: [
      "Your Amazon listing is often the first place a reader meets your book. We review how it is presented — description, keywords, categories, metadata and author information — and recommend or implement clearer, better-targeted improvements.",
      "The aim is a listing that accurately represents your book and gives it better discoverability opportunities within Amazon's own guidelines.",
    ],
    scope: [
      "Book description and blurb review",
      "Keyword research for your seven KDP keyword slots",
      "Category research",
      "Metadata, title and subtitle presentation review",
      "Amazon Author Central profile setup or review",
      "A+ Content design (where your account is eligible)",
    ],
    audience: "Self-published authors with a book on Amazon KDP, or preparing to publish there.",
    quoteBasis: "Quoted after reviewing your listing",
    cta: "Request a Quote",
    note: "Amazon rankings, visibility and sales are not guaranteed. Changes follow Amazon's current KDP guidelines.",
    messageHint: "Please include your Amazon book link (or publishing date) and what you'd most like to improve.",
    seo: {
      title: "Amazon KDP Optimization for Authors | BrainboxPress",
      description:
        "Amazon KDP listing optimization for self-published authors: book description, keyword and category research, metadata, Author Central and A+ Content. Request a quote.",
    },
  },
  {
    id: "book-cover-design",
    slug: "book-cover-design",
    number: "13",
    title: "Book Cover Design",
    category: "visibility",
    formLabel: "Book Cover Design — request a quote",
    summary: "Professional eBook, paperback and hardcover covers designed for your genre and readers.",
    description: [
      "A cover tells readers what kind of book they're looking at in a moment. We design covers that suit your genre, read clearly at thumbnail size and reflect the tone of your story.",
      "eBook fronts and full print wraps (front, spine and back) are prepared to your printer's or platform's specifications once your page count and trim size are confirmed.",
    ],
    scope: [
      "eBook cover design",
      "Paperback full-wrap cover (front, spine and back)",
      "Hardcover case or dust-jacket cover",
      "Cover concepts for your review and approval",
      "Print-ready files to your platform's specifications",
    ],
    audience: "Authors preparing a new book, a new edition, or a refreshed cover for an existing title.",
    quoteBasis: "Quoted by format and requirements",
    cta: "Request a Quote",
    note: "Stock images, fonts or illustrations that need separate licences are disclosed in your quotation.",
    messageHint: "Tell us your genre, formats needed (eBook, paperback, hardcover), trim size and page count if known.",
    seo: {
      title: "Book Cover Design — eBook, Paperback & Hardcover | BrainboxPress",
      description:
        "Professional book cover design for eBook, paperback and hardcover editions, created for your genre with print-ready files. Request a custom quote from BrainboxPress.",
    },
  },
  {
    id: "book-formatting",
    slug: "book-formatting",
    number: "14",
    title: "Book Formatting",
    category: "visibility",
    formLabel: "Book Formatting — request a quote",
    summary: "Clean, readable interior formatting for eBook, paperback and hardcover editions.",
    description: [
      "Good formatting is invisible to readers — it simply makes the book easy and pleasant to read. We prepare your manuscript's interior so it displays correctly on e-readers and prints cleanly.",
      "Each edition is formatted to the requirements of the platform you're publishing with, and you review the files before they're finalised.",
    ],
    scope: [
      "eBook formatting (reflowable files for e-readers)",
      "Paperback interior formatting",
      "Hardcover interior formatting",
      "Chapter headings, front and back matter layout",
      "Files prepared to your platform's specifications",
    ],
    audience: "Authors with a finished, edited manuscript who are ready to publish.",
    quoteBasis: "Quoted by word count, formats and layout complexity",
    cta: "Request a Quote",
    messageHint: "Please share your approximate word count, the formats you need and any images, tables or special layouts.",
    seo: {
      title: "Book Formatting Services — eBook & Print | BrainboxPress",
      description:
        "Book formatting for eBook, paperback and hardcover editions: clean interiors, front and back matter, and platform-ready files. Request a quote from BrainboxPress.",
    },
  },
  {
    id: "book-launch-campaign",
    slug: "book-launch-campaigns",
    number: "15",
    title: "Book Launch Campaigns",
    category: "reach",
    formLabel: "Book Launch Campaigns — request a quote",
    summary: "A planned, coordinated campaign to introduce a new — or relaunched — book to readers.",
    description: [
      "A single book feature introduces your book once; a launch campaign plans several coordinated activities around your release date so your book has a clear, sustained introduction to readers.",
      "We agree a plan with you that can combine services such as book features, a trailer, social media content, email outreach and listing preparation, with a clear timeline and budget.",
    ],
    scope: [
      "Launch plan and timeline",
      "Pre-launch listing and presentation review",
      "Promotional graphics and short-form video",
      "Social media and book feature scheduling",
      "Reader outreach and advance reader copy coordination",
      "Relaunch campaigns for existing books",
    ],
    audience: "Authors with an upcoming release, or an existing book that deserves a fresh introduction.",
    quoteBasis: "Quoted from the agreed campaign plan",
    cta: "Request a Quote",
    note: "Advertising spend and paid placements are not included unless stated in your quotation. Sales, rankings and bestseller status are not guaranteed.",
    messageHint: "Tell us your launch date (or current publishing status), genre and what you'd like the campaign to include.",
    seo: {
      title: "Book Launch Campaigns & Relaunches | BrainboxPress",
      description:
        "Planned book launch and relaunch campaigns for authors, combining features, trailers, social content and reader outreach on a clear timeline. Request a quote.",
    },
  },
  {
    id: "author-branding",
    slug: "author-branding",
    number: "16",
    title: "Author Branding",
    category: "presence",
    formLabel: "Author Branding — request a quote",
    summary: "A consistent author identity across your books, website and social profiles.",
    description: [
      "Readers remember authors whose presentation is consistent and recognisable. We help you define a clear author identity and apply it across the places readers find you.",
      "Work can range from a logo and visual style to your author biography, media kit and social media profiles — agreed with you in a written scope.",
    ],
    scope: [
      "Author brand identity and visual style",
      "Author logo design",
      "Author biography development",
      "Author media kit and press kit",
      "Social media profile optimization and branding",
      "Book series branding",
    ],
    audience: "Authors building a long-term presence, launching a series, or refreshing an inconsistent online image.",
    quoteBasis: "Quoted by scope",
    cta: "Request a Quote",
    seo: {
      title: "Author Branding Services — Logo, Bio & Media Kit | BrainboxPress",
      description:
        "Author branding services: brand identity, author logo, biography, media kit and social profile branding for a consistent, recognisable author presence. Request a quote.",
    },
  },
];

/** Social Media Management package details (deliverables are fixed). */
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

export const FEATURED_SERVICE_IDS: ServiceId[] = ["tiktok-book-feature", "book-trailer", "social-media-management"];

export function totalContentPieces(p: Pick<SocialPackage, "staticPosts" | "reels">) {
  return p.staticPosts + p.reels;
}

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getPackage(serviceId: string, packageId: string): ServicePackage | undefined {
  return getService(serviceId)?.packages?.find((p) => p.id === packageId);
}

/** Lowest listed package price, used for "From $X" summaries. */
function lowestPackagePrice(s: Service) {
  const prices = (s.packages ?? []).map((p) => p.price).filter((p): p is number => typeof p === "number");
  return prices.length ? Math.min(...prices) : undefined;
}

/** Short, consistent price summary, e.g. "$25 per book", "From $65", "$0.50 per contact", "Custom quote". */
export function priceSummary(s: Service): string {
  if (s.quoteBasis) return "Custom quote";
  if (typeof s.price === "number") return s.priceUnit ? `${formatPrice(s.price)} ${s.priceUnit}` : formatPrice(s.price);
  const from = lowestPackagePrice(s);
  return from !== undefined ? `From ${formatPrice(from)}` : "Request a quote";
}
