# SEO Infrastructure

## Metadata (`app/layout.tsx`, `root-layout`)
- `metadataBase: https://courtos.co`. Title "CourtOS — Your Entire Coaching Staff. One Tap." Description = the replaces-your-staff line.
- OpenGraph (website, siteName CourtOS, og-image `/og-image.png` 1200×630) + Twitter `summary_large_image`.
- Icons: favicon set + apple-icon; `site.webmanifest`; theme color `#0C0C0C`.

## sitemap / robots (`seo-sitemap`)
- `app/sitemap.ts` emits: `/` (1.0), `/blog` (0.7), `/privacy` `/terms` `/subscription-terms` (0.7), and `/blog/{slug}` (0.6) for every post via `getAllPosts()`.
- `app/robots.ts`: `User-Agent *` Allow `/`, Sitemap + Host `https://courtos.co`. Fully crawlable.

## Dynamic icon (`seo-icon`)
- `app/icon.tsx`: 32×32 `ImageResponse` — blue square `#3B82F6` with white "C".

## Strategy
Static rendering of marketing/legal/blog for crawlability; per-post canonical + Article/Breadcrumb/FAQPage JSON-LD (see [blog.md](blog.md)). Aligns with the app's growth mandate to rank for "volleyball rotation tracker / stats app / 6-2 / 5-1" (app `knowledge/marketing/marketing.md`).
