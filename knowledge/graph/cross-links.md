# Cross-repo links — courtos-web ↔ volleyiq-coach

The website and the React Native app are **one product on one Supabase project**. This is the bridge map. The app graph is at `../../volleyiq-coach/knowledge/graph/index.json`; the corresponding note there is `knowledge/graph/cross-links.md`.

## The bridges (also encoded in `index.json` → `cross_repo.bridges`)

| Web node | App node | Via | Direction |
|----------|----------|-----|-----------|
| `live-viewer` / `db-live-matches` | `live-broadcast` / `db-live-matches` | `live_matches` table | App **writes** (owner INSERT/UPDATE), web **reads** (public SELECT + realtime UPDATE by `room_code`) |
| `api-notify-reset` | `danger-zone` / `db-data-backups` | recovery SQL for teams/lineups/players/data_backups | App reset → web email with 30-day recovery queries |
| `legal-privacy` / `legal-terms` | `danger-zone` / legal domain | hosted legal text | App links out to these pages |
| `subscription-terms` | `subscriptions` | pricing + auto-renew | Same tiers: Free / Coach Premium $9.99 / Coach Advanced $19.99 |
| `beta-signup` / `db-beta-signups` | `subscriptions` (funnel) | `beta_signups` table | Web-only acquisition → TestFlight/Android beta |

## The critical shared contract: `live_matches`
The app's broadcast writer and the web viewer must agree on this row shape. **A change to `live_matches` columns or `stats_snapshot` shape is a 2-repo change** — update both graphs.

Fields the web viewer consumes: `room_code, is_active, team_name, opponent_name, our_score, their_score, current_set, sets_won, sets_lost, serving_us, current_rotation, court_mode, stats_snapshot{team{...}, players[...]}, last_updated`.

## Compliance reconciliation
The app's `COMPLIANCE_AUDIT_2026-06.md` lists **R4 (legal entity placeholders)** as a blocker. The web legal pages now use a real entity — **CourtOS LLC, a California LLC**, governing law California, effective 2026-06-14, no placeholders. So R4 is resolved on the web side; verify the in-app legal links point here and that any in-app copies match. (R3 — paywall must link to `/terms` + `/privacy` + `/subscription-terms` — is satisfiable using these pages.)

## When you change one repo
- Touch `live_matches` shape → update `live-viewer` (web) AND `live-broadcast` + `db-live-matches` (app).
- Change pricing → update `subscription-terms` (web) AND `subscriptions` + `business.md` (app).
- Change reset/recovery flow → update `api-notify-reset` (web) AND `danger-zone` (app).
