# CourtOS — Cost/Abuse Audit (credit run-up)

> Scope: can an outsider (or a signed-up beta user) run up your **Anthropic**, **Resend**, or
> **Supabase** bills, or abuse your infrastructure? Audited: 3 AI edge functions, 2 public email
> API routes, and Supabase RLS across both repos. Date: 2026-07-07.
>
> **TL;DR:** Database RLS is solid (owner-scoped, no anonymous writes). The real exposure is on the
> **two unauthenticated email routes** (Resend cost + phishing relay, no rate limit) and the
> **`practice-plan` AI function** (uncapped Anthropic calls). None of the AI functions verify
> subscription tier server-side.

Severity: 🔴 high · 🟠 medium · 🟡 low · ✅ okay

---

## 🔴 1. `notify-signup` — open email relay, no rate limit  (courtos-web)

`app/api/notify-signup/route.ts` is a public, unauthenticated POST. Every call sends **two** Resend
emails: a team notification and a "welcome" email to **`to: body.email`** — an attacker-controlled
address.

**Abuse:**
- **Cost run-up / quota burn:** a script POSTing in a loop sends unlimited Resend emails → burns your
  Resend quota and can rack up cost.
- **Phishing relay + domain reputation:** the attacker picks the recipient *and* influences the
  content (`body.name` / `firstName` are interpolated unescaped into the email). They can send
  CourtOS-branded mail from `hello@courtos.co` to arbitrary victims → your domain gets flagged/
  blacklisted, hurting real deliverability.
- **HTML injection:** `body.name`, `body.organization`, `body.frustration`, `email` are placed into
  HTML without escaping (lines 49–54, 77, 89).

**Fixes (do all):**
- Add **rate limiting** (per IP + per email), e.g. Vercel KV / Upstash Redis — a few requests/min.
- Add a **honeypot field + basic bot check** (or a lightweight CAPTCHA) on the signup form.
- **Validate** the email format; cap body field lengths; reject oversized bodies.
- **Escape** all user input before interpolating into HTML.
- Consider **double opt-in**: only send the install/welcome email after the address is confirmed, so
  the endpoint can't be used to mail strangers.
- Backstop: set a **Resend monthly sending cap / alert**.

---

## 🔴 2. `practice-plan` — uncapped Anthropic calls  (volleyiq-coach edge fn)

`supabase/functions/practice-plan/index.ts` calls Claude on **every** invocation. Unlike
`match-summary` / `match-captions` it has **no cache, no `gen_count` CAP, and no tier check**. It also
doesn't even check for the auth header (relies only on the platform `verify_jwt`).

**Abuse:** signup is open, so anyone can create an account, get a valid JWT, and loop
`practice-plan` (especially the `season` mode, which scans all matches) → unbounded Anthropic spend.
Each call is `max_tokens: 1500`.

**Fixes:**
- Add a **cache table + CAP** (mirror `match-summary`: store the plan keyed by match/season, serve
  cached unless `regenerate`, cap regenerations at ~5).
- Add a **per-user daily rate limit** on generations.
- Add the explicit `if (!authHeader) return 401` guard the other two functions have.

---

## 🟠 3. AI functions don't verify subscription tier server-side  (volleyiq-coach)

`match-summary`, `match-captions`, `practice-plan` are premium features, but gating is **client-side
only** (`src/utils/featureFlags.ts`). The edge functions only enforce ownership (via RLS), not tier.

**Abuse:** a free/beta user can call the functions directly (bypassing the client gate) and consume
paid AI → both a **cost** and a **revenue leak** at public launch.

**Fix:** in each function, look up the caller's entitlement (a `subscriptions`/`entitlements` table
synced from RevenueCat, or a RevenueCat REST check) and return `403` for non-pro before calling
Anthropic. Combine with a **global per-user daily cap** as a backstop even for pro users.

---

## 🟠 4. `match-summary` / `match-captions` — CAP is per-match, not per-user

Both correctly cap regenerations at **`CAP = 5` per match** (good — kills the trivial regenerate
loop). But a user can create **unlimited matches**, each granting 5 fresh generations → 5 × N calls.

**Fix:** add a **per-user (or per-team) daily generation cap** across all matches, in addition to the
per-match cap.

---

## 🟠 5. `notify-reset` — no rate limit  (courtos-web)

`app/api/notify-reset/route.ts` is unauthenticated. Recipient is **hardcoded** to your inbox (good —
no relay), but it's un-throttled, so it can be spammed → Resend cost + inbox flooding. User-supplied
`userId`/`userEmail` are interpolated unescaped (into an email only you receive → low, but escape
anyway).

**Fix:** rate-limit; escape inputs; ideally require the app's authenticated JWT to call it.

---

## 🟡 6. Self-scoped unbounded inserts  (Supabase)

RLS correctly limits writes to `owner_id = auth.uid()`, so a user can only write **their own** rows —
but there's no volume quota. A determined authenticated user could insert large numbers of their own
`stat_events` / `attempt_events` / `live_matches` rows → DB storage growth.

**Fix (low priority):** monitor row counts; optionally add sanity caps (e.g., events per match) and a
Supabase **budget alert**.

---

## ✅ What's already good

- **RLS is enabled on every table** and policies are **owner-scoped** (`owner_id = auth.uid()`), incl.
  cloud stats, AI tables, and tryouts. No `using (true)` / anon-write policies remain in the current
  migrations.
- **`live_matches`** was re-tightened (`retighten_live_matches_rls.sql`): anon has **SELECT only**
  (jersey-only public snapshot — no minors' names); INSERT/UPDATE are owner-scoped. The earlier
  `with check (true)` tampering hole is closed **in code**.
- **Edge functions default to `verify_jwt = true`** (no `config.toml` overrides), so anonymous callers
  can't invoke them — abuse requires a signed-up account.
- **AI `max_tokens` are bounded** (1100–1600), and `match-summary`/`captions` cache + cap per match.
- **Secrets** (`ANTHROPIC_API_KEY`, `RESEND_API_KEY`, service-role) are server-side only; the client
  ships only the anon key (safe by design).

---

## ⚠️ Must-verify (not visible from code)

- **Confirm the latest RLS migrations are actually applied in prod** — `retighten_live_matches_rls.sql`
  and `harden_pii_rls.sql`. `PIPELINE.md` still lists "run `tighten_live_matches_rls.sql`" as a launch
  blocker. If only `fix_live_matches_broadcast_rls.sql` (the `with check (true)` version) is live, then
  **any authenticated user can overwrite any coach's broadcast** — promote this to 🔴.
- **Billing backstops** (independent of code): set **Anthropic** usage limits + alerts, a **Resend**
  monthly cap, and a **Supabase** spend/budget alert. These cap the blast radius of anything missed.

---

## ✅ Remediation shipped (2026-07-07)

Code fixes landed in both repos (pending deploy/migration by Ben):

- **`practice-plan` locked** — now validates the JWT via `getUser()` (401 on invalid) and caches the
  plan per match/season with a **CAP of 5 regenerations** (new `practice_plans` table). Claude is no
  longer called on every request. *(volleyiq-coach)*
- **Durable rate limiter** — `rate_limit_hit()` SECURITY DEFINER RPC + `rate_limits` table; atomic,
  callable by the anon web client, no table writable via RLS. *(migration)*
- **`notify-signup` hardened** — email validation (no send to invalid/missing address, killing the
  stranger-relay), **per-IP (5/hr) + per-email (3/day) rate limits**, honeypot field (bots dropped
  silently), 8 KB body cap, field-length caps, and **all user input HTML-escaped**. *(courtos-web)*
- **`notify-signup` form** — hidden honeypot field added. *(courtos-web BetaSignup)*
- **`notify-reset` hardened** — per-IP rate limit (10/hr), input clipped + HTML-escaped (incl. the
  SQL-snippet interpolation). *(courtos-web)*

### Legal / privacy (the "lawsuits" angle) — verified

- ✅ **Minors' names are NOT sent to the AI provider.** All three AI functions send only jersey # +
  position (verified in `practice-plan`, `match-captions`, `match-summary`). This upholds the stated
  minors-data rule and is the key privacy exposure — it's clean.
- ✅ **Minors' data is private by default** (RLS owner-scoped) and the public live-broadcast snapshot
  is **jersey-only, no names**.
- ✅ **Legal pages exist** (privacy / terms / subscription-terms) for CourtOS LLC.
- 🟡 **Direct Supabase signup insert** (`BetaSignup` inserts to a signups table via the anon client
  before calling the email route) — bounded (DB rows, not email/AI), but it bypasses the email-route
  rate limit. Consider RLS insert throttling or moving the insert server-side behind the same limiter.
- ⚠️ **Policy items for you / counsel** (not code): confirm the privacy policy explicitly covers
  **minors / COPPA-style parental consent**, data-retention (your 30-day soft-delete is a good story),
  and that the Play **Data safety** form + **target-audience** settings match reality. The blog's
  `dangerouslySetInnerHTML` is author-controlled — keep it that way (never feed it user input).

### Round 2 (2026-07-07) — remaining items closed in code

- **Hard per-user daily AI cap (40/day)** added to **all three** AI functions via `rate_limit_hit`
  — bounds Anthropic cost even if a user spins up many matches. Also added real `getUser()` JWT
  validation to `match-summary` and `match-captions` (they previously checked header presence only).
- **Server-side tier enforcement scaffold** — new `entitlements` table (written only by the service
  role / RevenueCat webhook) + a check in each AI function, **gated behind the `AI_REQUIRE_PRO` env
  flag** so it's OFF during beta and flips ON at public launch. Closes the "free user calls paid AI"
  leak once RevenueCat populates the table.
- **Signup-table insert throttled** — `BetaSignup` now honeypot-checks and rate-limits the direct
  `beta_signups` insert (3/day per email) via the same RPC, so the DB insert can't be spammed either.

**Still requires you (RevenueCat wiring):** point a RevenueCat webhook at a small handler that upserts
`entitlements(owner_id, tier)` with the service-role key, then set `AI_REQUIRE_PRO=true` on the
functions at public launch. Until then the daily cap is the cost ceiling.

### Deploy / apply steps (Ben)

```
# 1. Supabase → SQL editor: run the new migrations (in volleyiq-coach/docs/migrations)
#    add_rate_limit.sql
#    add_practice_plans.sql
#    add_entitlements.sql
# 2. Redeploy ALL THREE edge functions (they now call rate_limit_hit + getUser)
supabase functions deploy practice-plan
supabase functions deploy match-summary
supabase functions deploy match-captions
# 3. courtos-web: push (Vercel auto-deploys the hardened routes + throttled signup)
# 4. Set billing backstops (dashboards): Anthropic usage limit + alert,
#    Resend monthly cap, Supabase budget alert.
# 5. (Public launch only) wire RevenueCat webhook -> entitlements table, then set
#    AI_REQUIRE_PRO=true on the functions:  supabase secrets set AI_REQUIRE_PRO=true
```

## Priority order

1. 🔴 Rate-limit + validate + escape **`notify-signup`** (and add double opt-in). Public + relay.
2. 🔴 Cap/cache **`practice-plan`** and add the auth guard.
3. ⚠️ Verify **RLS migrations are applied in prod**; set **billing alerts** on all three providers.
4. 🟠 Add **server-side tier checks** + per-user daily AI caps.
5. 🟠 Rate-limit **`notify-reset`**.
6. 🟡 Consider per-match event caps / storage monitoring.
