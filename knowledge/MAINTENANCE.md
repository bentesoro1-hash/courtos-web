# Living Knowledge — courtos-web maintenance

Keep the graph true. Update impacted nodes in the same change as the code.

## On code change
1. Find the node(s) in `graph/index.json` by file path/name.
2. Check incoming edges for blast radius (see [graph/QUERY_GUIDE.md](graph/QUERY_GUIDE.md)).
3. **Check `cross_repo`** — if you touched a shared concept, update the **app** graph too (`../../volleyiq-coach/knowledge/`).

## Change → update map
| Changed | Update |
|---------|--------|
| A component | its node + `components/README.md`; home order if added/removed |
| A page/route | the page node + `seo/seo.md` (sitemap) |
| `/live` viewer or `live_matches` shape | `live-viewer` node + `pages/live.md` + **app `live-broadcast`/`db-live-matches`** + `graph/cross-links.md` |
| A legal page | `pages/legal.md` + nodes; reconcile app compliance (R3/R4) |
| Pricing | `subscription-terms` node + **app `subscriptions`/business.md** |
| An API route | `api/api.md` + node; env vars |
| Blog post | append to `posts.ts` (auto-flows to index/page/sitemap); update `seo/blog.md` table |
| New env var | `graph/architecture.md` (names only — never values) |

## Validate
```bash
python3 -c "import json; d=json.load(open('knowledge/graph/index.json')); print('OK', len(d['nodes']))"
```
Spot-check that changed nodes' `files` still exist.

## The shared contract rule
`live_matches` (and its `stats_snapshot`) is co-owned with the app. Any column/shape change is a **two-repo change** — update both graphs or the viewer silently breaks.
