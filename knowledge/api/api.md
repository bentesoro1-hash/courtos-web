# API Routes (Resend email)

Both are POST handlers under `app/api/`. Email via **Resend** from `hello@courtos.co`. No Supabase writes in the routes themselves.

## POST /api/notify-signup (`api-notify-signup`)
- **Trigger:** `BetaSignup` form submit (after the Supabase insert).
- **Body:** `name, email, organization, coaching_level, frustration`.
- **Sends:**
  1. Team notification → `courtos@courtos.co` ("🏐 New CourtOS Beta Signup!") with the details.
  2. *(Conditional)* user welcome → the signup email ("You're in — install the CourtOS beta 🏐") **only if `TESTFLIGHT_LINK` is set**; adds an Android button if `ANDROID_TEST_LINK` is set. Degrades gracefully if send fails.
- **Env:** `RESEND_API_KEY`, `TESTFLIGHT_LINK?`, `ANDROID_TEST_LINK?`.
- **Returns:** `{ ok: true }`.

## POST /api/notify-reset (`api-notify-reset`)
- **Trigger:** the **app** when a user resets/deletes data (cross-repo → app `danger-zone`).
- **Body:** `userId, userEmail, resetAt, kind` (`match_history` | full reset).
- **Sends:** admin email → `bentesoro1@gmail.com` ("⚠️ CourtOS … : <userEmail>") containing **recovery SQL** for `public.teams`, `public.lineups`, `public.players` (un-set `deleted_at`) and `public.data_backups` (fetch JSON snapshot). Supports the **30-day soft-delete recovery window**.
- **Env:** `RESEND_API_KEY`.
- **Returns:** `{ ok: true }` (error 500 on failure).

## Notes
- Admin recipient is hardcoded — fine for solo ops; parameterize if the team grows.
- These routes are the email layer only; the actual soft-delete + 30-day purge live in the app's Supabase (`purge_expired_soft_deletes` cron). See app `knowledge/graph/database.md`.
