# ADR-W001 — `live_matches` is a shared two-repo contract

- **Status:** Accepted
- **Nodes:** `live-viewer`, `db-live-matches` (web) ↔ `live-broadcast`, `db-live-matches` (app)

## Context
The app broadcasts live match state by writing a `live_matches` row (owner-scoped). The website's `/live` viewer reads that row by `room_code` and subscribes to realtime UPDATEs with the anon key (public SELECT via RLS). The two repos are deployed independently.

## Decision
Treat the `live_matches` row shape — including the denormalized `stats_snapshot` JSON — as a **shared contract**. Any change to its columns or the snapshot structure must be made in both repos and reflected in both knowledge graphs.

## Reason
The web viewer renders fields directly from the row. A silent column rename or snapshot restructure on the app side breaks the viewer with no compile-time error (different repos, untyped JSON).

## Tradeoffs
- No shared type package today; the contract is enforced by discipline + this ADR, not the compiler.
- `is_active` can go stale if the app crashes mid-match (viewer stays "watching").

## Future reconsideration
Extract a shared TypeScript types package (or generate from Supabase) so the contract is compiler-enforced across both repos. Consider a heartbeat/`last_updated` staleness check in the viewer.
