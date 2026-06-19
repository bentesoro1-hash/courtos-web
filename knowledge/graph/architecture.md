# Web Architecture

- **Framework:** Next.js 16 (App Router, Turbopack dev) · React 19 · TypeScript.
- **Styling:** Tailwind CSS 3. Custom `court` palette: `bg #05091A`, `surface #0D1530`, `border #1A2845`. Animations `fade-in-up`, `shimmer`. Note: most components use inline styles with brand green `#3DBE6B` (hover `#4FD080`) on near-black `#0C0C0C` — the in-component palette and the Tailwind `court.*` palette and the legal pages' `#060b14` differ slightly; reconcile if unifying.
- **Fonts:** Inter (body), Bebas Neue (headlines).
- **Data:** Supabase JS (`lib/supabase.ts`), anon key only, realtime 10 events/sec, relies on RLS.
- **Email:** Resend (transactional) in the two API routes.
- **Hosting:** Vercel (`.vercel` present).

## Rendering model
- Mostly static/server components for marketing + legal + blog (great for SEO).
- Client components where interactivity is needed: `LiveClient` (realtime), `BetaSignup` (form), animated marketing components.
- Blog posts are **static HTML strings** in `app/blog/posts.ts`, pre-rendered via `generateStaticParams`.

## Supabase usage
| Table | Access | By |
|-------|--------|-----|
| `live_matches` | read + realtime UPDATE subscription | `live-viewer` |
| `beta_signups` | insert | `beta-signup` |
| `teams`/`lineups`/`players`/`data_backups` | referenced in recovery SQL (not queried by web) | `api-notify-reset` email body |

`live_matches` is **shared** with the app (app writes, web reads) — see [cross-links.md](cross-links.md). `beta_signups` is web-only.

## Environment variables (names only)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (in `.env.local`).
- `RESEND_API_KEY`, `TESTFLIGHT_LINK?`, `ANDROID_TEST_LINK?` (Vercel secrets).

## Security notes
- Anon key on client is expected; **safety depends on Supabase RLS** (public SELECT on `live_matches`, restricted writes). Confirm `beta_signups` has an INSERT policy that doesn't allow reading others' signups.
- `api-notify-reset` emails recovery SQL to a hardcoded admin address (`bentesoro1@gmail.com`) — fine for solo ops; revisit if the team grows.
- No service-role key on the client. Good.

## Routes
`/` (home) · `/live` · `/privacy` · `/terms` · `/subscription-terms` · `/blog` · `/blog/[slug]` · `/api/notify-signup` · `/api/notify-reset` · `/sitemap.xml` · `/robots.txt` · dynamic `/icon`.
