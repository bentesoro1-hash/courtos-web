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
export const ANDROID_URL = (process.env.NEXT_PUBLIC_ANDROID_URL || '').trim()

/** True once a public install link exists — flips every CTA to direct-install. */
export const HAS_INSTALL = TESTFLIGHT_URL.length > 0

/** Best primary install target (iPhone first; this is an iOS-first launch). */
export const INSTALL_URL = TESTFLIGHT_URL || ANDROID_URL
