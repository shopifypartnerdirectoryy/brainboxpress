// Official BrainboxPress contact details and social accounts. Use these exact values everywhere.
export const SITE = {
  name: "BrainboxPress",
  url: "https://brainboxworld.net",
  displayUrl: "brainboxworld.net",
  descriptor: "Ebook Promotion | Author Outreach | Book Marketing",
  generalEmail: "hello@brainboxworld.net",
  supportEmail: "support@brainboxworld.net",
  ogImage: "https://brainboxworld.net/og-image.jpg",
} as const;

export type SocialId = "facebook" | "instagram" | "tiktok" | "x" | "linkedin";

export const SOCIALS: { id: SocialId; label: string; href: string }[] = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/brainboxpress" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/brainboxpress" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@brainboxpress" },
  { id: "x", label: "X", href: "https://x.com/Brainboxpress" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/brainboxpress/" },
];

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Our Process" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
] as const;
