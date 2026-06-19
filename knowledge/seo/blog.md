# Blog / CourtOS Academy

- **Nodes:** `blog-index` (`/blog`), `blog-post` (`/blog/[slug]`), `blog-posts-data` (`app/blog/posts.ts`).

## Structure
- Posts are **static HTML strings** in `app/blog/posts.ts` (no MDX, no CMS). `BlogPost { slug, title, description, date, updated?, readingMinutes, excerpt, html, faqs? }`. Helpers `getPost`, `getAllPosts` (sorted newest-first).
- `/blog` lists cards (date, read time, title, excerpt, "Read guide →").
- `/blog/[slug]` is statically generated (`generateStaticParams`), renders `post.html` via `dangerouslySetInnerHTML` (author-trusted), and emits **JSON-LD: Article + BreadcrumbList + FAQPage**. Bottom CTA → `/#beta`.

## Current posts
| Slug | Title | Date | Read | FAQs |
|------|-------|------|------|------|
| `how-to-track-a-6-2-rotation` | How to Track a 6-2 Volleyball Rotation (With Diagrams) | 2026-06-17 | 7 min | 3 |

## Workflow
The comment in `posts.ts` notes a **weekly SEO task appends a new BlogPost** — the blog is the long-tail SEO engine from the app's growth brief. When adding a post: append to `posts.ts` (it auto-flows into `/blog`, the per-post page, and `sitemap.ts`). Keep title ≤60 chars, description ≤155, and add `faqs` to win FAQ rich results.

## Security note
`html` is rendered with `dangerouslySetInnerHTML` — it is author-controlled, so this is acceptable, but never source post HTML from user input.
