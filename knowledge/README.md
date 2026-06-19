# courtos-web Project Intelligence System

> **Query this graph first.** Long-term memory for the CourtOS **web** project (marketing site, legal pages, live broadcast viewer, SEO blog).

**Project:** `courtos-web` — Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 3 · Supabase JS · Resend · Vercel. Domain: **https://courtos.co**.

**Sibling:** the React Native app lives in `volleyiq-coach/` with its own knowledge graph at `../../volleyiq-coach/knowledge/`. The two share one Supabase project — see [`graph/cross-links.md`](graph/cross-links.md).

## How to use
1. Open [`graph/index.json`](graph/index.json) — nodes + typed edges (`renders`, `reads`, `writes`, `calls`, `links_to`, `cross_repo`). 33 nodes.
2. Use [`graph/QUERY_GUIDE.md`](graph/QUERY_GUIDE.md) for traversal recipes.
3. Read the domain doc, then the deep node files; open only the source the node points to.
4. After changing code, update impacted nodes per [`MAINTENANCE.md`](MAINTENANCE.md).

## Map
| Path | Holds |
|------|-------|
| [`graph/index.json`](graph/index.json) | the graph (nodes + edges + cross_repo bridges) |
| [`graph/QUERY_GUIDE.md`](graph/QUERY_GUIDE.md) | question → traversal recipes |
| [`graph/architecture.md`](graph/architecture.md) | stack, Supabase, env, hosting |
| [`graph/cross-links.md`](graph/cross-links.md) | bridges to the app graph |
| [`pages/landing.md`](pages/landing.md) | marketing home composition + copy |
| [`pages/live.md`](pages/live.md) | the `/live` broadcast viewer (deep) |
| [`pages/legal.md`](pages/legal.md) | privacy / terms / subscription terms |
| [`components/README.md`](components/README.md) | component inventory |
| [`api/api.md`](api/api.md) | email API routes (Resend) |
| [`seo/seo.md`](seo/seo.md) | metadata, sitemap, robots, icons |
| [`seo/blog.md`](seo/blog.md) | Academy blog + JSON-LD |
| [`graph/decisions/`](graph/decisions/) | ADRs |

## Provenance
Built by direct repository inspection. Links to the app graph rather than duplicating shared facts. The root [`CLAUDE.md`](../CLAUDE.md) points sessions here first.
