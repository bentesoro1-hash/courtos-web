// ════════════════════════════════════════════════════════════════════════
// Install-link config — the single switch that turns the whole funnel from
// "capture email" into "install now".
//
// THE DAY YOUR TESTFLIGHT PUBLIC LINK IS LIVE, set these in Vercel → Project
// → Settings → Environment Variables, then redeploy. No code change needed:
//
//   NEXT_PUBLIC_TESTFLIGHT_URL = https://testflight.apple.com/join/xxxxxxxx
//   NEXT_PUBLIC_ANDROID_URL    = (optional) Play Store / internal-test link
//
// Also set (server-side, for the auto-welcome email in app/api/notify-signup):
//   TESTFLIGHT_LINK = same TestFlight URL
//   ANDROID_TEST_LINK = same Android URL (optional)
//
// NEXT_PUBLIC_* vars are inlined into the client bundle at BUILD time, so a
// redeploy is required for changes to take effect.
// ════════════════════════════════════════════════════════════════════════

export const TESTFLIGHT_URL = (process.env.NEXT_PUBLIC_TESTFLIGHT_URL || '').trim()

// Android has two phases:
//  • CLOSED beta — set NEXT_PUBLIC_ANDROID_SIGNUP="true". Google requires each
//    tester's email to be authorized, so the Android CTA routes to the signup
//    form; the welcome email delivers the join + install steps.
//  • OPEN testing (public link, after the 14-day closed test) — set
//    NEXT_PUBLIC_ANDROID_URL to the public Play opt-in link. The CTA then becomes
//    a true one-tap install like iOS. (A direct URL takes precedence over signup.)
export const ANDROID_URL = (process.env.NEXT_PUBLIC_ANDROID_URL || '').trim()
export const ANDROID_SIGNUP = (process.env.NEXT_PUBLIC_ANDROID_SIGNUP || '').trim() === 'true'

/** True once a public install link exists — flips every CTA to direct-install. */
export const HAS_INSTALL = TESTFLIGHT_URL.length > 0

/** A direct Play link exists (open testing) — the Android CTA installs directly. */
export const ANDROID_IS_DIRECT = ANDROID_URL.length > 0

/** Show an Android CTA at all (either a direct link or the closed-beta signup). */
export const HAS_ANDROID = ANDROID_IS_DIRECT || ANDROID_SIGNUP

/** Where the Android CTA points: the Play link if we have it, else the signup form. */
export const ANDROID_CTA_HREF = ANDROID_URL || '#beta'
/** Label reflects the mode: direct install vs. request-an-invite. */
export const ANDROID_CTA_LABEL = ANDROID_IS_DIRECT ? '🤖 Install on Android' : '🤖 Get the Android beta'

/** Best primary install target (iPhone first; this is an iOS-first launch). */
export const INSTALL_URL = TESTFLIGHT_URL || ANDROID_URL
