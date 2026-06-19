# Page node — Marketing Landing (`/`)

- **Node:** `home-page` · **Files:** `app/page.tsx`, `app/layout.tsx`

## Composition (render order)
`Navbar → Hero → NoAssistantNeeded → Agitation → AppTease → FeatureShowcase → FeaturesSection → HowItWorks → BetaSignup → FinalCTA → Footer`.

## Message architecture
- **Hero:** "YOUR ENTIRE COACHING STAFF. IN ONE TAP." + "replaces your scorekeeper, rotation tracker, sub coordinator, and stats person." Badge "Now Accepting Beta Testers". CTAs Get Early Access / See Features.
- **NoAssistantNeeded:** the 4 roles replaced (Scorekeeper, Rotation Tracker, Sub Coordinator, Stats Person).
- **Agitation:** 4 real coach pain quotes ("COACHING ALONE IS HARD. WE KNOW.").
- **AppTease:** 3 blurred "BETA ACCESS ONLY" previews.
- **FeatureShowcase** (`#in-action`): auto-cycling 5-screen carousel (score / rotation / log / heatmap / live stats).
- **FeaturesSection** (`#features`): 6 cards incl. Live Broadcast (room-code share — ties to `/live`).
- **HowItWorks** (`#how-it-works`): 3 steps (2 min / 30 sec / match day).
- **BetaSignup** (`#beta`): the conversion form (see [../components/README.md](../components/README.md)).
- **FinalCTA / Footer:** closing CTA + links.

## Anchors
`#features`, `#how-it-works`, `#in-action`, `#beta` (used by Navbar + CTAs).

## Brand
Bebas Neue headlines, Inter body, brand green `#3DBE6B`, near-black `#0C0C0C`. (See palette caveat in [../graph/architecture.md](../graph/architecture.md).)

## Notes
`SocialProof.tsx` exists but is **not** rendered here (available for future use). All conversion paths funnel to `#beta`.
