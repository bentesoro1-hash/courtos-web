# Page node — Live Broadcast Viewer (`/live`)

- **Node:** `live-viewer` · **Files:** `app/live/LiveClient.tsx` (844 lines), `app/live/page.tsx`
- **Cross-repo:** app `live-broadcast` writes the data this reads. See [../graph/cross-links.md](../graph/cross-links.md).

## Purpose
Parents/fans watch a live match in real time by entering a room code — no login.

## Join flow
- URL query param `?code=` (auto-connects if present). Code sanitized to alphanumerics, needs 6+, displayed as `XXX-XXX`.
- Initial fetch: `supabase.from('live_matches').select('*').eq('room_code', clean).eq('is_active', true).single()`.
- Realtime: `supabase.channel(...)` postgres_changes, event `UPDATE`, table `live_matches`, filter `room_code=eq.<clean>`. Channel stored in a ref; removed on unmount.

## Page states (`PageState`)
`enter` (code input form) → `loading` ("Connecting…") → `watching` (live scoreboard) → `ended` ("Match Ended", final score, watch another) / `error`.

## What it displays (from the row)
Team + opponent names, score, current set, sets won/lost, `serving_us`, `current_rotation`, `court_mode` (e.g. "5-1"), and `stats_snapshot`:
- **team:** pointsWon/Lost, kills, aces, blocks, oppErrors, serviceErrors, hittingErrors, passErrors, oppKills, digs, passes, passRating, attackAttempts, hittingPct.
- **players[]:** id, name, jersey, position + per-player K/E/attempts/hit%, aces, serve errors, serveInPlay, blocks, digs, passes, passRating, passErrors, points. (Expandable player stats.)

## Auth model
None. The room code is the capability. RLS allows public SELECT on `live_matches`; writes are owner-only (app side).

## Risks / notes
- Depends entirely on the app keeping the `live_matches` row updated and `is_active` accurate. If the app crashes mid-match, `is_active` may stay true (stale "watching").
- `stats_snapshot` is denormalized JSON — its shape is a shared contract with the app's broadcast writer.

## Future
Broadcast v2 (chat, follows) per the app roadmap (`live-broadcast` → platform vision pillar #2).
