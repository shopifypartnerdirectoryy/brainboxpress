# BrainboxPress roadmap

## Final audit (Nov 2026)
- [x] Official logo (header, footer, mobile menu, favicon, share image)
- [x] New palette: navy #081C41, gold #D39914, white, light grey #F5F6F8
- [x] Tagline "A World of Discoverability & Growth" (old tagline was not present anywhere)
- [x] New hero headline; homepage sections incl. discoverability, featured services, pricing highlights, FAQ
- [x] Updated services & prices (TikTok $25, Instagram $35, trailers 15s/30s/60s $65/$125/$265, Book Challenge $150/$275/$395, email marketing $0.50/contact, audiobook quote)
- [x] Service detail pages with unique SEO metadata + sitemap
- [x] Contact form -> Static Forms (server-side, STATIC_FORMS_API_KEY), keep database backup — test accepted; owner to confirm inbox receipt
- [x] Visitor auto-acknowledgement: explained (Static Forms auto-reply is Starter plan+; Resend alternative needs account + verified domain)
- [x] Performance (responsive images), mobile/desktop checks, tests

## Form fix (Nov 16)
- [x] Live form: Static Forms was rejecting live-site submissions (403); fixed, published, live test accepted — owner to confirm inbox

## Master revamp brief (Nov 16 upload) — waiting on owner answers before building
- [x] Owner confirmed: Amazon KDP, cover design, formatting, launch campaigns, author branding are available (quote-only)
- [x] Other brief services (editing, proofreading, newsletters, ARC, translation, adaptation) — owner chose show as available
- [ ] New homepage structure (new hero headline, 5-stage journey, testimonials empty state, final CTA)
- [ ] Services overview page + priority service pages
- [ ] Book Visibility Assessment form
- [x] Legal pages (Privacy, Terms, Refund & Cancellation) — drafts; full payment upfront confirmed; revision count still general
- [ ] Author resources / blog structure
- [ ] Enquiry status tracking (lead management) + analytics

## Waiting on the owner
- [ ] Connect brainboxworld.net to this project (it currently shows another deployment), then switch PUBLIC_ORIGIN in src/lib/seo.ts and the sitemap/robots to it
- [ ] Choose visitor auto-reply route (Static Forms paid plan, or Resend free tier with a verified domain)
- [ ] Publish, then submit the sitemap in Google Search Console
