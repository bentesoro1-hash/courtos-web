# CLAUDE.md — courtos-web

> **Read this first, every session.**

## Use the Project Intelligence System before exploring the repo
This project has a knowledge graph at [`knowledge/`](knowledge/). **Query it before grepping.**
1. [`knowledge/graph/index.json`](knowledge/graph/index.json) — nodes + edges (33 nodes) for the web project.
2. [`knowledge/graph/QUERY_GUIDE.md`](knowledge/graph/QUERY_GUIDE.md) — traversal recipes.
3. [`knowledge/graph/cross-links.md`](knowledge/graph/cross-links.md) — bridges to the React Native app graph.
4. After changing code, update nodes per [`knowledge/MAINTENANCE.md`](knowledge/MAINTENANCE.md).

Start at [`knowledge/README.md`](knowledge/README.md).

## Project at a glance
- **What:** Marketing site + legal pages + `/live` broadcast viewer + SEO blog for CourtOS. Domain https://courtos.co.
- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind 3 · Supabase JS · Resend · Vercel.
- **Sibling:** the app repo `volleyiq-coach/` (its own graph at `../volleyiq-coach/knowledge/`). **Shared Supabase project.**

## Non-negotiable rules
1. **`live_matches` is a shared contract** with the app. Changing its shape is a two-repo change — update both knowledge graphs.
2. **Anon key only on the client; safety = RLS.** Never put a service-role key in the web app.
3. **Never print/commit secret env values.** Document env var *names* only.
4. **Legal pages are live compliance docs** — entity is CourtOS LLC (California), effective 2026-06-14. They satisfy app paywall blockers R3/R4; keep them in sync with the app.
5. **Blog `html` is rendered with `dangerouslySetInnerHTML`** — author-controlled only, never user input.

## Where things live
- Live viewer: `app/live/LiveClient.tsx` · Signup: `components/BetaSignup.tsx` → `app/api/notify-signup/route.ts`
- Legal: `app/{privacy,terms,subscription-terms}/page.tsx` + `components/LegalShell.tsx`
- Blog: `app/blog/` + `app/blog/posts.ts` · SEO: `app/{sitemap,robots,icon}.ts(x)`, `app/layout.tsx`
- Supabase client: `lib/supabase.ts` · Email: Resend in `app/api/`
