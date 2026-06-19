# Query Guide — courtos-web

Answer questions by traversing [`index.json`](index.json) instead of grepping.

### "How does the live viewer work?"
`saved_queries.how_does_the_live_viewer_work` → `live-viewer` (deep doc [`../pages/live.md`](../pages/live.md)) reads `db-live-matches` via `lib-supabase` realtime. Join by `?code=`; states enter/loading/watching/ended/error.

### "What connects the website to the app?"
`saved_queries.what_connects_web_to_the_app` + the top-level `cross_repo.bridges`. The big one: the app writes `live_matches`; the web subscribes to it. Also: reset-recovery emails, shared legal text, shared pricing, beta funnel. See [`cross-links.md`](cross-links.md).

### "Where do beta signups go?"
`beta-signup` → writes `db-beta-signups` (Supabase) → calls `api-notify-signup` → `resend`. Role enum + fields in the node `business_rules`.

### "What are the legal pages and are they complete?"
`legal-privacy`, `legal-terms`, `subscription-terms` (all use `legal-shell`). All effective 2026-06-14, entity **CourtOS LLC (California)**, **no placeholders** — this resolves part of the app's compliance blocker R4. Detail in [`../pages/legal.md`](../pages/legal.md).

### "What's the SEO surface?"
`saved_queries.seo_surface` → `root-layout` (metadata/OG), `seo-sitemap`, `seo-icon`, `blog-index`, `blog-post` (JSON-LD: Article + Breadcrumb + FAQPage).

### "What renders on the home page, in order?"
`saved_queries.what_renders_on_home` (matches `home-page.edges.renders`).

## Recipes
- **Impact ("what breaks if I change X"):** find every node with X in any `edges.*` array.
- **Cross-repo impact:** check `cross_repo` on the node AND the top-level `cross_repo.bridges` — a change to `live_matches` shape affects BOTH repos.
- **"Where is X":** `X.owner`/`X.files`.
