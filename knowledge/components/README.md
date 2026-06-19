# Component Inventory

Marketing + shared components. Most use inline styles (brand green `#3DBE6B` on `#0C0C0C`); `LegalShell` and a few use the Tailwind `court.*` palette / `#060b14`.

| Component | Node | Purpose | Interactive |
|-----------|------|---------|-------------|
| `Navbar` | `navbar` | Sticky scroll-reactive nav; links Features/How It Works/Academy(/blog)/Beta + Join Beta CTA | mobile hamburger, scroll blur |
| `Hero` | `hero` | Headline + subhead + badge + CTAs + `HeroPhone` | — |
| `HeroPhone` | `hero-phone` | Phone frame cycling 3 app webp screens (3200ms) | auto-carousel (respects reduced-motion) |
| `PhoneMockup` | `phone-mockup` | Faux app UI (Match/Lineup/Stats/History tabs, court grid, point buttons) | clickable point buttons |
| `NoAssistantNeeded` | `no-assistant` | 4 cards: roles CourtOS replaces | — |
| `Agitation` | `agitation` | 4 coach-pain testimonial cards | — |
| `AppTease` | `app-tease` | 3 blurred "BETA ACCESS ONLY" previews | unlock → #beta |
| `FeatureShowcase` | `feature-showcase` | Auto-cycling 5-screen carousel (`#in-action`) | click feature list, auto-rotate 4200ms |
| `FeaturesSection` | `features-section` | 6-card feature grid (`#features`) incl. Live Broadcast | hover glow |
| `HowItWorks` | `how-it-works` | 3-step timeline (`#how-it-works`) | — |
| `BetaSignup` | `beta-signup` | Conversion form (see below) | form submit |
| `FinalCTA` | `final-cta` | Closing CTA | → #beta |
| `Footer` | `footer` | Logo + links + copyright | — |
| `SocialProof` | `social-proof` | Credibility cards — **NOT rendered on home** (future use) | — |
| `LegalShell` | `legal-shell` | Shared legal-page layout | — |

## BetaSignup flow (deep)
- **Fields:** name* (≥2), email* (regex), role* (head_coach / new_coach / parent_volunteer / athletic_director / player / just_interested), organization?, message?.
- **Submit:** insert to Supabase `beta_signups` `{name, email, organization, coaching_level: role, frustration: message, source: 'courtos.co/beta'}` → POST `/api/notify-signup`.
- **Success:** "YOU'RE IN." + Web Share button. **Error:** retry inline.
- **Disclaimer:** "Free during beta · No credit card · No spam."
- Writes `db-beta-signups`; calls `api-notify-signup` → `resend`.
