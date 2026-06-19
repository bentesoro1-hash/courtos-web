# Stats Page → Broadcast Restyle — Implementation Plan

**Goal:** Re-sequence the existing **TEAM** tab into one broadcast-style scroll (hero → spotlight → match story → how we're playing → rotation → **playing time** → point by point), add the two missing sections (**Player Spotlight**, **Match Story**), **redesign the Playing Time graph**, and keep the other tabs (**PLAYERS**, **STAT MAP**) reachable. The full per-player list stays under the **PLAYERS tab** (only the Spotlight is on TEAM). **Reuse the data the app already computes — no store schema changes.**

Reference mockup: `stats-reference.html` (this folder). Approve that look first; this plan is the build path.

---

## Guiding constraints (from CLAUDE.md)

- Premium gating stays centralized in `src/utils/featureFlags.ts`; default tier `free`. The broadcast restyle must respect the existing free-taster vs Pro split — it's a **visual re-layout of already-gated data**, not a gating change.
- Per-change protocol, every commit: git restore-point tag → `npx tsc --noEmit` (0 errors) → device test → OTA gate (no OTA if `react-native-purchases` in `app.json` plugins) → session summary.
- This is presentation-layer only. No changes to the rotation engine, `executeSub()`, RLS, or minors'-data rules.

---

## Section → data source map (what feeds each block)

| Broadcast section | Existing source | Existing component to reuse | New work |
|---|---|---|---|
| **Hero scoreboard** | `useRotationStore` (score, set, serving, rotation) + server name | current TEAM hero (already broadcast-style) | momentum bar + run chip derived from point log |
| **Player Spotlight** | `useStatsStore.computePlayerStats` / `computeAllPlayerStats` | player-card internals from PLAYERS tab | a `pinnedPlayerId` in `useStatsLayoutStore` (UI-only pref) + spotlight card |
| **Match Story** | derive from team + player tallies + point log + (stat-map zones) | — | small pure `buildMatchStory()` util returning 3–4 insight lines |
| **How we're playing** | `computeTeamStats` (kills/aces/blocks/digs/errors, hittingPct, sideout, passRating) | sideout/attack rings, passing card, scoring donut, `StatTile` | restyle into one card; no new math |
| **Rotation performance** | existing rotation-margin widget | rotation bars (already built) | none (move into sequence) |
| **Playing time** (redesigned) | per-player rotations on court + sub events (`useStatsStore.events`, category `sub`) + sets played | current playing-time bars | redesigned viz: comparative bars normalized to max, team-average marker, starter/sub/libero tag, grouped bench. Replaces the "all-23 + LOW" bars. Stays on the TEAM scroll. |
| **Point by point** | point event log (`useStatsStore.events`, category `point`) | POINT HISTORY list | latest-point animation on insert |
| **Players** (stays in PLAYERS tab) | `computeAllPlayerStats` + `buildPlayerSeasonStats` | existing PLAYERS tab cards | none — the full player list stays under the **PLAYERS tab**, not the TEAM scroll. Only the single **Player Spotlight** appears on TEAM, with an "all players →" link to the PLAYERS tab. |

**Net new code is small:** one pinned-player pref, one `buildMatchStory()` util, one momentum/run derivation, and a layout re-sequence. Everything else is moving + restyling components that already exist.

---

## Files (expected touch list)

- `app/(tabs)/stats.tsx` — re-sequence the TEAM view into the broadcast scroll; mount Spotlight + Match Story; keep tab switcher.
- `src/components/stats/PlayerSpotlight.tsx` — **new**; reuses ring/stat-chip subcomponents.
- `src/components/stats/MatchStory.tsx` — **new**; renders lines from the util.
- `src/utils/matchStory.ts` — **new**; pure `buildMatchStory(team, players, points)` → `{icon,text,tone}[]`. Unit-testable.
- `src/store/useStatsLayoutStore.ts` — add `pinnedPlayerId` (persisted UI pref; bump key only if needed).
- `src/utils/featureFlags.ts` — no change expected; confirm Spotlight/Story respect existing tier (likely free-safe summaries, Pro for deep stats).
- Existing widgets (`StatTile`, `LeaderboardTile`, rings, rotation bars, point history) — restyle props/container only.

---

## Build order (vertical slices, each its own restore-point + tsc + device test)

1. **Match Story** (lowest risk, pure util + simple card). Ship, device-test the copy on a real match.
2. **Player Spotlight** + `pinnedPlayerId` pref (tap a player → pin → spotlight at top). Default to top performer when unpinned.
3. **Re-sequence** the TEAM scroll into broadcast order; restyle the existing widgets into the unified card system. No logic change. Keep the full player list in the PLAYERS tab; add the "all players →" link from the Spotlight.
4. **Playing Time redesign** — replace the "all-23 + LOW" bars with comparative normalized bars + team-average marker + starter/sub/libero tags + grouped bench. Pure presentation over existing rotation/sub data.
5. **Momentum bar + run chip** on the hero, derived from the point log.
6. **Point-by-point insert animation** + polish pass (typography, spacing, motion, `prefers-reduced-motion`).

---

## Verification per slice

- `npx tsc --noEmit` clean.
- Device test in **both** states: live in-match (numbers tick, spotlight/story update) and post-match recap (frozen, reads as a summary).
- Confirm free vs Pro: free tier still shows the taster set; Pro unlocks the deep stats exactly as today — restyle must not leak Pro data into free.
- `buildMatchStory()` unit test: never asserts a stat that isn't present (no "improved since set 1" without per-set data); degrades to fewer lines when data is thin.
- Empty/loading: pre-match (0–0) shows hero + "match starting" framing, not a wall of zeros; spotlight shows "pin a player" when none chosen.

---

## Open product calls (not blockers)

- **Spotlight default**: auto-spotlight top performer, or require an explicit pin? (Reference shows auto = top performer with a "tap to pin" hint.)
- **Match Story depth**: free shows 2 lines, Pro shows 4 + zone/rotation insights? (Keeps a Pro reason without hiding the headline.)
- Whether to eventually **fold** the broadcast scroll into a single default view and demote the tab bar to just PLAYERS / STAT MAP (post-beta).
