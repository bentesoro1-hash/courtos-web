# ADR-W002 — Static HTML blog in `posts.ts` (no CMS)

- **Status:** Accepted
- **Nodes:** `blog-index`, `blog-post`, `blog-posts-data`

## Context
The Academy blog is the long-tail SEO engine (rank for "6-2 rotation", "volleyball stats app", etc.). It needs fast pages, full control of on-page SEO + JSON-LD, and zero infra.

## Decision
Store posts as static `BlogPost` objects (with trusted `html` strings) in `app/blog/posts.ts`. Statically generate per-post pages via `generateStaticParams`; emit Article + Breadcrumb + FAQPage JSON-LD. A weekly task appends new posts.

## Reason
Maximum crawlability and Core Web Vitals, no CMS dependency, total control of metadata/schema — ideal for a solo operator.

## Tradeoffs
- Authoring is in-code (no editor UI).
- `html` rendered via `dangerouslySetInnerHTML` — safe only because it's author-controlled; never source from user input.

## Future reconsideration
If post volume or non-engineer authoring grows, migrate to MDX or a headless CMS while preserving the JSON-LD + canonical strategy.
