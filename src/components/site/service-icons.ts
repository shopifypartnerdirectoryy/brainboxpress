import {
  BookCopy,
  Clapperboard,
  Flag,
  Headphones,
  Instagram,
  Library,
  Mail,
  MonitorSmartphone,
  PenTool,
  Smartphone,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

import type { ServiceId } from "@/lib/services";

export const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  "tiktok-book-feature": Smartphone,
  "instagram-book-feature": Instagram,
  "book-trailer": Clapperboard,
  "social-media-management": CalendarDays,
  "email-marketing": Mail,
  "book-mockup": BookCopy,
  audiobook: Headphones,
  "website-design": MonitorSmartphone,
  "website-redesign": PenTool,
  "goodreads-listopia": Library,
  "book-challenge": Flag,
};
