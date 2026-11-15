// Official BrainboxPress contact details and social accounts. Use these exact values everywhere.
export const SITE = {
  name: "BrainboxPress",
  tagline: "A World of Discoverability & Growth",
  url: "https://brainboxworld.net",
  displayUrl: "brainboxworld.net",
  generalEmail: "hello@brainboxworld.net",
  supportEmail: "support@brainboxworld.net",
  /**
   * Share image and logo are served from the published Lovable address, which always resolves
   * (and keeps working after brainboxworld.net is connected to this project).
   */
  ogImage: "https://brainboxpress.lovable.app/og-image.jpg",
  logoImage: "https://brainboxpress.lovable.app/apple-touch-icon.png",
} as const;

export type SocialId = "facebook" | "instagram" | "tiktok" | "x" | "linkedin";

export const SOCIALS: { id: SocialId; label: string; href: string }[] = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/brainboxpress" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/brainboxpress" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@brainboxpress" },
  { id: "x", label: "X", href: "https://x.com/Brainboxpress" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/brainboxpress/" },
];

/** Homepage sections reachable from the main navigation (ids match section ids on the homepage). */
export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "process", label: "Process" },
  { id: "portfolio", label: "Portfolio" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;
