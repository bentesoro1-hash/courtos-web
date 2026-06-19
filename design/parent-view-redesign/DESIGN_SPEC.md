# CourtOS — Parent / Spectator View Redesign

**Surface:** `courtos.co/live` broadcast viewer (`courtos-web` → `app/live/LiveClient.tsx`)
**Data source:** shared `live_matches` row + `stats_snapshot` JSON (realtime via Supabase)
**Goal:** Turn a stats page into a live sports broadcast companion a non-volleyball parent keeps open the whole match.
**Date:** 2026-06-19 · Companion file: `prototype.html` (clickable, auto-simulating)

> Everything below is grounded in the *real* data the app already broadcasts. Where an idea needs new data, it's labelled **[needs data]** so you can scope it honestly. Nothing in the core redesign requires backend changes — it's a re-layout of fields you already send.

---

## 0. What I'm working with (the real schema)

From `LiveClient.tsx`, the broadcast row gives me:

- **Match:** `team_name, opponent_name, our_score, their_score, current_set, sets_won, sets_lost, serving_us, current_rotation, court_mode, last_updated`
- **Team (`stats_snapshot.team`):** `pointsWon, kills, aces, blocks, oppErrors, digs, passes, passRating, attackAttempts, hittingPct, serviceErrors, hittingErrors, passErrors`
- **Players (`stats_snapshot.players[]`):** `name, jersey, position, kills, hittingErrors, attackAttempts, hittingPct, aces, serviceErrors, blocks, digs, passes, passRating, passErrors, points`
- **Court (`stats_snapshot.court[]`):** `pos (1–6), jersey, name, position`
- **Recent plays (`stats_snapshot.recentPlays[]`):** `label, player, us, our, their`

That's a *lot* of broadcast-grade material already flowing. The current page just lists it. The redesign sequences it into a story.

---

## 1. UX Audit of the current `/live` view

Scored 1–10 (10 = launch-ready premium).

| Dimension | Score | Notes |
|---|---|---|
| Visual design | 6 | Strong dark base, good color discipline, real type hierarchy on the scoreboard. Falls apart below the fold into flat label/number rows. |
| Ease of use | 5 | Everything is visible but nothing is prioritized — parent has to *read* to find their kid. |
| Clarity | 4 | "FORMATION serve_receive", "R1", "RECEIVING" are coach language. A parent doesn't know what any of it means. |
| Speed (glanceability) | 5 | Score is fast; everything else needs study. |
| Accessibility | 5 | Many 7–9px labels (below the ~11px floor), low-contrast `#334155` text on near-black. |
| Consistency | 7 | Reuses the app's tokens well; player cards and tiles are internally consistent. |
| Premium feel | 5 | Looks like a competent internal tool, not a broadcast. No motion, no narrative, no emotional hook. |
| **Overall** | **5.3** | Solid data foundation, wrong job. It answers "what are the numbers?" not "what's happening and how's my kid?" |

### Problems (ranked)

**Critical**
1. **`HIT % 275% / 240% / 400% / 200%`** — visible in every screenshot. Hitting % in volleyball is `(kills − errors) / attempts` and lives in `−100%…+100%`. The app is sending kills/attempts (or attempts are undercounted: "4 kills, 1 attempt"). To a parent this reads as broken, and broken kills "premium" instantly. *This is app-side data, but it surfaces here — fix before any beta.* Display defensively too: clamp and format as `.318`-style (decimals are the volleyball convention and dodge the >100% look).
2. **No "my child" concept.** The #1 question — "how is my child doing?" — requires the parent to scan a 7–12 row list every rally. The single highest-impact fix in this whole document is a pinned player.
3. **Coach jargon on a parent surface.** `FORMATION · serve_receive`, `R1`, base/rotation language. Parents don't have the schema. Translate or hide.

**High**
4. **No motion / no "what just changed."** A real broadcast's job is to tell you *the thing that just happened*. Static numbers that silently change fail the "keep it open" test.
5. **Flat information order.** Team stats (a coach's concern) sit above the players (a parent's concern). Order is backwards for the audience.
6. **Tiny type & low contrast.** 7–9px uppercase labels and `#334155` on `#060b14` are below WCAG and hard to read in a bright gym.
7. **`recentPlays` is underused.** It's the most broadcast-native asset you have (the play-by-play) and it's buried last with no emphasis on the latest point, no momentum, no filters.

**Medium**
8. Scoreboard is the only thing that feels designed; the rest is a settings sheet.
9. No empty/loading nuance — a parent who joins pre-match or at halftime sees a sea of zeros with no framing.
10. "OPP SERVING 🏐" / "SERVING" status is duplicated three times (scoreboard bar, status strip, court) with slightly different wording.

**Low**
11. Set score `0–0` shown twice (center column + status strip).
12. Footer takes premium vertical space mid-scroll on short matches.

---

## 2. Information Architecture (redesigned)

Ordered by the parent's questions, not by data category.

```
TOP BAR  (sticky)            CourtOS · ● LIVE · room code   → collapses to mini-score on scroll
─────────────────────────────────────────────────────────
1. HERO SCOREBOARD           "What's happening + why"
     scores · set · serving · MOMENTUM bar · run chip · status
2. YOUR PLAYER (pinned)      "How is MY child doing?"   ← the differentiator
     avatar · court status · form rating · 4 stat rings · key pills
3. MATCH STORY               "What should I watch / understand?"
     2–3 auto-written insight lines (the 'commentator')
4. ON COURT                  "Where is everyone / where's my kid?"
     live 6-token court, serving glow, animates on rotation
5. HOW WE'RE PLAYING         "How's the team?" (team perf, visual)
     how-we-scored bar · 4 tiles · hitting & passing gauges · errors
6. POINT BY POINT            "What just happened?" (the play-by-play)
     newest animates in · won/lost filter · my-player highlighted
7. PLAYERS                   "Everyone else" (browse + pin)
     compact cards, tap to expand, ★ to set Your Player
FOOTER
```

**Why this order:** Hero answers *what/why* in one glance (broadcast law: score + momentum first). Your Player answers the emotional question second — before the parent has to think. Everything a coach would lead with (team efficiency, rotation) drops below the personal layer because this audience is spectators, not tacticians.

---

## 3. Visual hierarchy

Three tiers, enforced by size + motion, not just position:

- **Tier 1 — Hero (always loudest):** 56–62px Barlow-Condensed scores, the only animated-on-change numbers, the only colored glow border. Nothing else competes.
- **Tier 2 — Your Player + Match Story:** one accent-bordered card and 2–3 sentence-case story lines. Mid-weight, 24px name, 14px ring values. This is the second thing the eye lands on.
- **Tier 3 — Team / Court / Timeline / Players:** uniform card system, 9–10px section caps, 24px stat numbers. Calm, scannable, never shouting.

The eye path: **score → momentum → my kid → the story → details on demand.**

---

## 4. Component breakdown

| Component | Built from (real fields) | Notes |
|---|---|---|
| `Hero` | scores, set, sets, serving_us | Serving team's score turns green; border + glow follow possession. |
| `MomentumBar` | derived from `recentPlays` run | Bar biases toward the team on a run; gradient flips red/green. Client-side, no new data. |
| `RunChip` | derived run length | "On a 4–0 run" / "Opponent 3–0 run". |
| `YourPlayer` | one `players[]` row + `court[]` lookup | Pinned via localStorage (`courtos.live.myPlayer`). Court status = front/back/serving derived from `pos`. |
| `StatRing` ×4 | hittingPct, aces/serviceErrors, passRating, digs+blocks | Normalized 0–1 progress rings (Attack / Serve / Pass / Defense). |
| `FormRating` | composite of points/kills/errors | Simple, transparent 0–10 score with ▲/▼ trend. *Label it "Form", not an official rating.* |
| `MatchStory` ×2–3 | run, kills leader, top passer, ace | Template-generated sentences. The "commentator." |
| `LiveCourt` | `court[]` | 3×2 grid, role colors, serving token pulses + ball, animates position change on rotation. |
| `HowWeScored` | kills/aces/blocks/oppErrors | Stacked proportional bar + legend (kept from current — it's good). |
| `TeamTiles` ×4 | kills/aces/blocks/digs | With trend arrows. |
| `Gauge` ×2 | hittingPct (clamped), passRating/3 | Hitting shown as `.318`; passing as `2.5 / 3`. |
| `PointTimeline` | `recentPlays[]` | Newest animates in; won=green / lost=red; filter chips; my-player rows tint gold. |
| `PlayerRow` | `players[]` | Sorted by points; expandable 12-stat grid; ★ pin. |
| `Toast` | latest play | Slides in on each new point: "Ace — Emma". |

---

## 5. Card designs

- **One card system:** `#0f172a` fill, `1px #1e293b` border, 16px radius, 16px padding. Sections never invent new chrome.
- **Accent cards** (Your Player, expanded player) get a 1.5px colored border = role color or green, plus a soft inner radial highlight. This is the *only* place gradients/glow appear, so it reads as "important," not decorative.
- **Tokens (court & player avatars):** circular, 2px role-colored ring, jersey number in Barlow-Condensed 900, role-colored glow at `color + 40% alpha`. Serving token adds a pulsing ring + 🏐.
- **Stat rings:** 56px, 6px stroke, track `#13203a`, value centered in role/metric color. Animate `stroke-dashoffset` on update.

---

## 6. Animation recommendations

Motion's job here is **communication, not decoration**. Each one maps to a question.

| Trigger | Animation | Why | Duration |
|---|---|---|---|
| Point scored | Score digit `scale 1→1.32→1` pop | "What just changed" | 450ms |
| Point scored | Toast slides down "Kill — Maddie" | Names the moment like a broadcast lower-third | in 400ms, hold 2.6s |
| New play | Row slides in from left + green flash fade | Draws eye to newest without a refresh blink | 600ms |
| Momentum shift | Bar width eases, gradient flips color | Makes a run *feel* like a swing | 600ms |
| Rotation change | Court tokens ease to new grid cells | The "TV replay" feel you asked for | 550ms, spring |
| Serving change | Token glow + ball icon cross-fade | Shows possession moving | 300ms |
| Ring update | `stroke-dashoffset` eases | Stat growth feels alive | 700ms |
| Scroll | Hero collapses → mini-score in top bar | Score always present (ESPN sticky-score pattern) | tied to scroll |

**Restraint rules:** never more than one "loud" animation at a time (the score pop owns the moment; everything else is a quiet ease). Respect `prefers-reduced-motion` — drop transforms, keep color/number changes. No looping animation except the LIVE dot and the serving pulse.

---

## 7. Typography hierarchy

Uses the brand's **Barlow / Barlow Condensed** (already in `LiveClient`/marketing kit) over Inter, because condensed numerals read as "sports broadcast."

| Role | Font / weight | Size |
|---|---|---|
| Hero score | Barlow Condensed 900 | 56–62px |
| Set number | Barlow Condensed 900 | 30px |
| Player name (spotlight) | Barlow Condensed 900 | 24px |
| Section stat numbers | Barlow Condensed 900 | 24px |
| Player/ring values | Barlow Condensed 900 | 15–19px |
| Body / play labels | Barlow 600–700 | 13–14px |
| Team names | Barlow 600 | 11px caps |
| Section captions | Barlow 700 | 10px caps, 0.12em tracking |
| **Minimum label** | Barlow 600 | **11px** (raise everything currently 7–9px) |

Two type families, four working sizes. Anything smaller than 11px gets promoted or cut.

---

## 8. Color system (unchanged tokens, clarified meaning)

Keeps your real palette; codifies what each color *means* so it's consistent everywhere.

| Color | Hex | Means, everywhere |
|---|---|---|
| Green | `#22C55E` | Us / point won / serving / OH / positive trend |
| Red | `#EF4444` | Opponent / point lost / errors |
| Gold | `#EAB308` | Ace / serve / Setter / the ball |
| Blue | `#3B82F6` | Block / Middle (MB) |
| Purple | `#8B5CF6` | Passing / Libero (L) |
| Teal | `#14B8A6` | Defense / DS |
| Orange | `#F97316` | RS / error accent |
| Surfaces | `#060b14 / #0f172a / #1e293b` | bg / card / hairline |

Rule: a color means one thing. Green is never "just decoration" — if it's green, it's *us / good*. This lets a parent learn the language in 30 seconds without a key.

---

## 9. Live update behavior

- **Transport:** existing Supabase realtime `UPDATE` on `live_matches` (already wired). On each payload, diff against previous state.
- **Diffing drives motion:** if `our_score`/`their_score` increased → pop + toast. If `current_rotation` changed → animate court. If `serving_us` flipped → move serving glow. If a `players[]` value grew → ease that ring/number. Never re-mount the whole tree (which causes the "blink" the current page risks).
- **Run / momentum** computed client-side by walking `recentPlays` from newest until `us` flips. Zero new data.
- **Freshness:** keep "Updated Ns ago"; add a subtle pulse on the LIVE dot each time a payload lands so the parent *sees* it's live even between points.
- **Latency honesty:** if `last_updated` is >90s old, soften the LIVE pill to "PAUSED" rather than implying real-time when the coach has stepped away.

---

## 10. Empty states

- **Joined before first serve (0–0, empty snapshot):** Don't show a wall of zeros. Show the hero (0–0, Set 1), the lineup on court if `court[]` exists, and a friendly line: *"Match starting soon — you'll see every point here live."* Hide team/timeline cards until there's data.
- **No `court[]`:** hide the court card entirely (current code already guards this — keep it).
- **No `recentPlays`:** Point-by-point card shows *"Plays will appear here as the match goes."*
- **Your Player not yet pinned:** the spotlight slot shows the "Pick your player" prompt (one tap), so the highest-value module is never just blank.
- **Player has 0 stats but is on court:** spotlight still shows court status + "Warming up — no stats yet," never a dead card.

---

## 11. Loading states

- **Connecting:** keep the existing centered logo + spinner, add one line: *"Finding match {CODE}…"*.
- **Skeletons over spinners for content:** once connected, render card skeletons (shimmer bars at the real heights) so layout doesn't jump when the first snapshot lands.
- **Reconnect:** if realtime drops, show a thin top banner "Reconnecting…" rather than freezing silently; restore on next payload.
- **Match ended:** keep the trophy + final score screen; add the pinned player's final line ("Maddie finished with 9 points, 7 kills") for an emotional close.

---

## 12. Responsive mobile layout

- Single column, `max-width: 430px`, centered; full-bleed on phones, device-framed on desktop (it's a phone-first surface).
- Touch targets ≥44px: player rows, filter chips, the ★ pin, and "change player" all meet it.
- Hero is fully visible without scrolling on the smallest common phone (≈360×640) — Your Player should *start* peeking above the fold to pull the parent down.
- Sticky top bar with collapsing mini-score keeps the score on screen during scroll.
- Landscape: not a priority (parents hold phones portrait while watching), but the single-column layout degrades gracefully — cap content width and center.

---

## 13. Accessibility review

- **Contrast:** retire `#334155` text on `#060b14` (fails AA). Captions move to `#475569`→ lighten to at least `#64748b`; body stays `#94A3B8`+ (passes). Score/number text is `#f8fafc` (passes easily).
- **Minimum 11px** type, enforced (section 7).
- **Color is never the only signal:** points won/lost use ✔/✖ glyphs + dot color + position; serving uses an icon + glow, not just color; trends use ▲/▼ arrows.
- **Motion:** honor `prefers-reduced-motion` — replace transforms with instant state + color change.
- **Screen readers:** scoreboard exposes an `aria-label` like "Summer League 15, Blue 6, set 2, Summer League serving"; live regions (`aria-live="polite"`) announce new plays and score so a low-vision parent hears "Point, Summer League, 16–6, kill by Maddie."
- **Tap, don't hover:** all detail is tap-to-expand; nothing depends on hover.

---

## 14. Charts & data-visualization recommendations

| Use | Viz | Why this one |
|---|---|---|
| How the team scored | Stacked proportional bar | Part-to-whole at a glance; already in code and it works. |
| Player Attack/Serve/Pass/Defense | 4 progress **rings** | Compact, "performance ring" reads as premium (Apple Watch / Apple Sports vocabulary). |
| Hitting % & passing | Linear **gauges** | One-dimensional metric → one-dimensional bar. Hitting shown `.318`; passing `2.5/3`. |
| Momentum / run | Single **bias bar** | Communicates a swing without a chart axis a parent must read. |
| **[needs data] Player radar** | Radar/spider on tap-into-profile | Only if you later send season averages to compare match-vs-season. |
| **[needs data] Score-flow line** | Sparkline of score margin over the set | Great "story of the set" viz; needs per-point margin history (derivable if you keep `recentPlays` long enough, or store a `scoreSeries`). |
| **Avoid** | Pie charts, dense tables, heat maps in the parent view | Heat maps are coach/Pro material and aren't in the broadcast snapshot anyway. Keep the parent view about people and momentum, not zones. |

**Honest data gaps (label as future / needs schema):**
- *"Improved passing 18% since Set 1"* and any **trend-over-time** line need per-set or per-point history in `stats_snapshot` (today it's a current-state snapshot only).
- **Player photos** aren't in the schema (and for minors, jersey-number avatars are the safer, COPPA-friendlier default — recommend keeping numbers, not photos, for the public viewer).
- **Win probability** — genuinely future; needs a model. The momentum bar is the right beta stand-in.
- **Match rating** is shown as a transparent "Form" heuristic, not an authoritative rating, until you define one.

---

## 15. Inspiration references — *why* each pattern works (adapted, not copied)

- **Apple Sports / ESPN — sticky score + "what just happened" lead.** Fans glance for seconds; the score and the last event must be instant. → Our sticky hero + collapsing mini-score + toast on every point.
- **NBA App / Sofascore — momentum & runs.** A bare score doesn't convey *who's surging*; a run indicator turns numbers into narrative tension. → MomentumBar + RunChip, derived from `recentPlays` (no new data).
- **F1 Live Timing — one driver you care about, pinned.** F1 lets you favorite a driver and surfaces them above the field. The emotional hook is "my person." → Your Player pin: the single biggest idea here, and it uses data you already send.
- **MLB Gameday — play-by-play as the spine.** The event log *is* the broadcast when there's no video. → Point-by-point timeline elevated from buried list to a first-class, animated, filterable feed.
- **Volleyball World / Olympic TV graphics — role-colored on-court lineup + serving indicator.** Broadcasts always show who's serving and where players are, with clean lower-thirds. → Live court with role colors, serving glow, animated rotation.
- **The Score / Flashscore — calm, scannable secondary stats.** They never let team stats shout over the score. → Team performance sits *below* the personal layer, in a quiet uniform card system.
- **Duolingo / Superhuman — motion that teaches and rewards.** Micro-animation signals "something happened" and makes the product feel alive and premium. → Score pop, ring growth, story lines — restrained, one loud moment at a time.

The throughline: these apps win by **prioritizing emotion and the single thing that just changed** over completeness. The current page optimizes for completeness. The redesign re-sequences the *same data* around the parent's five questions.

---

## Recommendation summary (by effort)

**Quick wins (< 30 min each)**
- Clamp & reformat hitting % (`.318`, never `>100%`) — kills the worst credibility bug on sight.
- Rename/hide coach jargon: drop "FORMATION · serve_receive"; "R1" → "Rotation 1"; keep "Serving/Receiving" in *one* place.
- Raise every 7–9px label to 11px; lighten `#334155` captions.
- Reorder sections: players above team stats.

**Medium (1–3 hrs each)**
- Your Player pin (localStorage) + spotlight card with rings — the headline feature.
- Momentum bar + run chip + match-story lines (all derived from `recentPlays`/`players`).
- Score-pop + toast + "new play animates in" on realtime diff.

**Major (half–full day)**
- Full re-layout to the IA in §2 with the unified card system and sticky collapsing hero.
- Animated rotation on the live court (diff `current_rotation`, ease tokens).
- Skeleton loaders + richer empty/ended states.

**Future (post-beta, needs data/schema)**
- Per-set/score-flow history → trend lines and "improved since Set 1" story beats.
- Win-probability model.
- Tap-into player profile with season-average radar.

---

## Beginner test & coaching-context note

- **Could a parent who's never seen volleyball use this?** With the redesign: the score, who's winning, who's serving, whether their kid is on court and doing well, and what just happened are all answerable in <10s without a single piece of jargon. With the current page: no — they'd have to decode "R1 / serve_receive / RECEIVING" and hunt a list for their child.
- **Spectator (not coach) workflow:** this view is read-only and watched from the stands, so the live-match "2–3 seconds between rallies" rule applies to *attention*, not input. The design optimizes for glance-and-look-up: score and momentum are legible at arm's length, and the toast means a parent who looked away still catches the last point.

---

## 16. On Court — mirrors the in-app coach court (added/revised)

The court now visually matches the **in-app coach view**: a proportional half-court with rich player tokens, the `LIVE | R1–R6 | SERVE/RECEIVE` chip row, net + antennas, and a serving bar.

**Player tokens (copied from the app)**
- 62px disc, 3px role-colored ring + glow; **role pill on top** (OH/MB/S/RS/L), **big jersey number**, **player name** inside, and a **P# court-slot pill** at the bottom-right — same anatomy as `PlayerToken`/`CourtPositionSlot` in the app.
- **Server** gets a gold ring halo + ball icon and is named in the serving bar ("SERVING — Maddie #1"), exactly like the app.
- The **pinned player** keeps a green ring + always-visible name so a parent never loses their kid in the overlap.

**System is read-only.** Per request, parents **cannot** switch 5-1/6-2/4-2 — the header shows a static badge of the system **the coach chose** (driven by `court_mode`). The only controls are the app's own: `LIVE` (snap back to the live rotation + possession), the `R1–R6` chips (current highlighted blue, green dot = live; tap to preview a rotation), and the `SERVE/RECEIVE` chip (formation), which auto-follows live possession until tapped.

**Faithful geometry + engine.** Formations use the *exact* coordinate tables from `src/constants/tacticalPositions.ts`; on-court players are computed with the app's rotation math (`displayPos = ((basePos − 1 − rotationsApplied + 6) % 6) + 1`) plus the **libero-stays-in-back-row swap** (mirrors `computeDisplayAssignments → applyLiberoSwap`). Verified: every rotation = 6 unique players, libero never front row. Tokens ease between coordinates (600ms spring) so rotation/possession changes look like a TV replay.

**Production data note [needs data]:** the live `stats_snapshot` doesn't broadcast formation coordinates today. Recommended: the web view imports the same `tacticalPositions.ts` and computes locally from `court_mode` + `current_rotation` + the R1 lineup — zero added payload, one source of truth. (The broadcast already sends `court_mode` and `current_rotation`; only the R1 base lineup needs to be in the snapshot.)

---

## 17. Stat Map (added)

A full-court shot map answering "where are the points going?" — kills (green), aces (gold), errors (red) plotted by location, with **All / Kills / Aces / Errors** filters and a **Your player** toggle that isolates the pinned child's contributions.

- **Frame** follows the app's point-mapping convention (`courtXPercent` 0=left→1=right, `courtYPercent` 0=opponent baseline→1=our baseline). Net runs across the middle; our attacks land on the opponent half (top).
- **Live.** New kills/aces/errors drop onto the map as the match plays (animated dot-in), so it grows like a broadcast graphic.
- **Parent-appropriate by default.** It shows *outcomes and placement*, not coaching heat zones. Tying it to "your player" makes it personal ("here's where Maddie scored").

**Production data note [needs data]:** point coordinates (`courtXPercent`, `courtYPercent`, stat type, player) already exist app-side in `StatEvent` but are **not** in the live `stats_snapshot`, and the in-app heat map is **Pro-gated**. To ship this in the parent view the app must add a `shots[]` array to the broadcast snapshot, and you'll want a product decision on whether the stat map is free in the broadcast or a premium upsell. Until then, the prototype uses mock placements to show the design.
