/**
 * Site-wide config. The single place to flip pre-launch → launched.
 *
 * Pre-launch: APP_STORE_URL is null, so every download button scrolls to the
 * email-capture section (#notify). At launch, set APP_STORE_URL to the real
 * App Store link and every button becomes a real download link automatically.
 */

export const APP_STORE_URL: string | null = null

/** Anchor for the pre-launch email-capture section. */
export const NOTIFY_ANCHOR = '#notify'

/** Brand accent — unified with the app's in-product green. */
export const GREEN = '#22c55e'
export const GREEN_INK = '#04220f'

/** Where a download button should point right now. */
export function downloadHref(): string {
  return APP_STORE_URL ?? NOTIFY_ANCHOR
}

/** True once the app is live and buttons should leave the site. */
export const IS_LAUNCHED = APP_STORE_URL !== null
