// ════════════════════════════════════════════════════════════════════════
// Server-only rate limiting for the public website API routes
// (app/api/notify-signup, app/api/notify-reset). Security audit P1-1B.
//
// • TRUSTED ACCESS. Buckets are consumed through public.rate_limit_hit() with
//   SUPABASE_SERVICE_ROLE_KEY — a server-only env var (never NEXT_PUBLIC_*).
//   The 'server-only' import below fails the build if client code ever imports
//   this file. Browsers and the public anon key cannot call the limiter.
// • OPAQUE BUCKETS. Bucket names are "web:<scope>:" + HMAC-SHA256 keyed with
//   the service-role key, so no raw email or IP address is stored in
//   public.rate_limits and nobody without the key can derive a bucket name.
// • FAIL CLOSED. A missing env var, a database error, an exception or any
//   reply other than true/false is 'unavailable'; callers must then not
//   insert, send or process anything.
// • CLIENT IP. On Vercel, x-real-ip / x-vercel-forwarded-for / x-forwarded-for
//   are written by Vercel's edge from the connecting address (Vercel overwrites
//   client-supplied values to prevent IP spoofing), so the first one present
//   is trusted. Off Vercel (local dev) they are client-controlled.
// ════════════════════════════════════════════════════════════════════════
import 'server-only'
import { createClient } from '@supabase/supabase-js'

export type RateLimitScope = 'signup-ip' | 'signup-email' | 'reset-ip'
export type RateLimitResult = 'allowed' | 'limited' | 'unavailable'

/** Supabase client with the service-role key, for server routes only. Null when not configured. */
export function serviceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

const encoder = new TextEncoder()

async function bucketName(secret: string, scope: RateLimitScope, value: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(`courtos-web-rl:v1:${scope}:${value}`)))
  return `web:${scope}:` + Array.from(mac, (b) => b.toString(16).padStart(2, '0')).join('')
}

/** Consume one hit from a durable server-side bucket. Only 'allowed' may proceed. */
export async function hitRateLimit(
  scope: RateLimitScope,
  value: string,
  max: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  try {
    const secret = process.env.SUPABASE_SERVICE_ROLE_KEY
    const sb = serviceRoleClient()
    if (!secret || !sb) return 'unavailable'
    const { data, error } = await sb.rpc('rate_limit_hit', {
      p_key: await bucketName(secret, scope, value),
      p_max: max,
      p_window_seconds: windowSeconds,
    })
    if (error) return 'unavailable'
    if (data === true) return 'allowed'
    if (data === false) return 'limited'
    return 'unavailable' // null or any unexpected reply: fail closed
  } catch {
    return 'unavailable'
  }
}

/** Client IP as written by Vercel's edge (see the note at the top of this file). */
export function clientIp(req: Request): string {
  const h = req.headers
  const raw = h.get('x-real-ip') || h.get('x-vercel-forwarded-for') || h.get('x-forwarded-for') || ''
  return raw.split(',')[0].trim().slice(0, 64) || 'unknown'
}

/**
 * Inbox key for the per-email limit: lowercased, "+tag" dropped and, for
 * Gmail, dots dropped, so plus/dot variants of one inbox share one bucket.
 * Used only to derive the bucket; the address itself is stored and sent as is.
 */
export function emailBucketKey(email: string): string {
  const e = email.trim().toLowerCase()
  const at = e.lastIndexOf('@')
  if (at <= 0) return e
  let local = e.slice(0, at).split('+')[0]
  let domain = e.slice(at + 1)
  if (domain === 'googlemail.com') domain = 'gmail.com'
  if (domain === 'gmail.com') local = local.replace(/\./g, '')
  return `${local}@${domain}`
}
