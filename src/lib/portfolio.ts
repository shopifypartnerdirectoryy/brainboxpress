import goodreads from "@/assets/portfolio-goodreads.webp";
import mockup from "@/assets/portfolio-mockup.webp";
import socialDesigns from "@/assets/portfolio-social-designs.webp";
import socialFeature from "@/assets/portfolio-social-feature.webp";
import trailer from "@/assets/portfolio-trailer.webp";
import website from "@/assets/portfolio-website.webp";

/**
 * Portfolio entries. Demonstration visuals must carry a non-client label.
 * To add a genuine project later, append an entry with kind: "client" and real details.
 */
export type PortfolioKind = "concept" | "sample" | "illustrative" | "client";

export const PORTFOLIO_LABELS: Record<PortfolioKind, string> = {
  concept: "Concept Work",
  sample: "Sample Design",
  illustrative: "Illustrative Example",
  client: "Client Project",
};

export interface PortfolioItem {
  id: string;
  category: string;
  description: string;
  kind: PortfolioKind;
  image: string;
  alt: string;
}

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "trailer",
    category: "Book Trailer Examples",
    description: "Cinematic, atmospheric frames that introduce a book's mood and storyline.",
    kind: "concept",
    image: trailer,
    alt: "Cinematic still of an ornate hardcover book on a dark table lit by a beam of golden light",
  },
  {
    id: "mockup",
    category: "3D Book Mockup Designs",
    description: "Polished 3D presentations of hardcover and paperback editions.",
    kind: "sample",
    image: mockup,
    alt: "3D mockup of a navy hardcover and paperback with gold geometric cover art on an ivory plinth",
  },
  {
    id: "social-feature",
    category: "TikTok and Instagram Book Features",
    description: "Vertical short-form content created for social book discovery.",
    kind: "illustrative",
    image: socialFeature,
    alt: "Smartphone displaying a vertical video of book pages beside a navy paperback and dried flowers",
  },
  {
    id: "social-designs",
    category: "Social Media Promotional Designs",
    description: "Cohesive static post layouts for a consistent author presence.",
    kind: "sample",
    image: socialDesigns,
    alt: "Grid of square navy and gold social media post designs featuring book covers and landscapes",
  },
  {
    id: "website",
    category: "Author Website Designs",
    description: "Elegant, responsive author websites centred on the book.",
    kind: "concept",
    image: website,
    alt: "Laptop showing a minimal author website layout with a navy book cover and a gold moon",
  },
  {
    id: "goodreads",
    category: "Goodreads Promotional Graphics",
    description: "Refined list and reading graphics for book-list promotion.",
    kind: "illustrative",
    image: goodreads,
    alt: "Tablet showing rows of illustrated book covers beside navy and gold promotional cards",
  },
];
