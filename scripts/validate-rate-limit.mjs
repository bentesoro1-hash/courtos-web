// Website rate-limit harness (security audit P1-1B). Offline: no network, no
// Supabase, no email. Executes the REAL route handlers (app/api/notify-signup,
// app/api/notify-reset) and lib/rateLimit.server.ts with mocked next/server,
// resend and @supabase/supabase-js, then checks the server-only, fail-closed,
// opaque-bucket contract plus static guards on the browser code.
//
//   node --experimental-strip-types scripts/validate-rate-limit.mjs
import { register } from 'node:module'
import { createHmac } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
let passes = 0
let failures = 0
function assert(name, cond) {
  if (cond) { passes++; console.log(`PASS  ${name}`) } else { failures++; console.log(`FAIL  ${name}`) }
}

// ── Module mocks (resolve hook) ─────────────────────────────────────────────
const mod = (src) => 'data:text/javascript,' + encodeURIComponent(src)
const MOCKS = {
  'next/server': mod(`export const NextResponse = { json: (body, init) => new Response(JSON.stringify(body), { status: init?.status ?? 200, headers: { 'content-type': 'application/json' } }) }`),
  'resend': mod(`export class Resend { constructor(key) { if (!key) throw new Error('Missing API key'); this.emails = { send: (msg) => globalThis.__RL_TEST__.send(msg) } } }`),
  '@supabase/supabase-js': mod(`export const createClient = (...a) => globalThis.__RL_TEST__.createClient(...a)`),
  'server-only': mod(`export {}`),
}
register(mod(`
const MOCKS = ${JSON.stringify(MOCKS)};
const ROOT = ${JSON.stringify(pathToFileURL(ROOT + '/').href)};
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
export async function resolve(specifier, context, next) {
  if (MOCKS[specifier]) return { url: MOCKS[specifier], shortCircuit: true };
  if (specifier.startsWith('@/')) {
    for (const ext of ['.ts', '.tsx', '']) {
      const url = new URL(specifier.slice(2) + ext, ROOT);
      if (existsSync(fileURLToPath(url))) return { url: url.href, shortCircuit: true };
    }
  }
  return next(specifier, context);
}`))

// ── Mocked runtime ──────────────────────────────────────────────────────────
const SERVICE_KEY = 'test-service-role-key-SENTINEL'
const ANON_KEY = 'test-anon-key'
const ENV = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://project.example.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY,
  RESEND_API_KEY: 're_test_key',
}
Object.assign(process.env, ENV)

const s = {}
function reset() {
  s.clients = []
  s.rpcCalls = []
  s.inserts = []
  s.sent = []
  s.rpcImpl = () => ({ data: true, error: null })
  s.insertImpl = () => ({ data: null, error: null })
  Object.assign(process.env, ENV)
}
globalThis.__RL_TEST__ = {
  createClient: (url, key, opts) => {
    s.clients.push({ url, key, opts })
    return {
      rpc: async (fn, args) => { s.rpcCalls.push({ key, fn, args }); return s.rpcImpl(args, s.rpcCalls.length) },
      from: (table) => ({ insert: async (rows) => { s.inserts.push({ key, table, rows }); return s.insertImpl(rows) } }),
    }
  },
  send: async (msg) => { s.sent.push(msg); return { data: { id: 'email_test' }, error: null } },
}

// Stateful limiter with the exact semantics of public.rate_limit_hit (fixed window).
function statefulLimiter() {
  const buckets = new Map()
  return (args) => {
    const b = buckets.get(args.p_key) ?? { count: 0 }
    b.count += 1
    buckets.set(args.p_key, b)
    return { data: b.count <= args.p_max, error: null }
  }
}

const signup = await import(pathToFileURL(join(ROOT, 'app/api/notify-signup/route.ts')).href)
const resetRoute = await import(pathToFileURL(join(ROOT, 'app/api/notify-reset/route.ts')).href)
const rl = await import(pathToFileURL(join(ROOT, 'lib/rateLimit.server.ts')).href)

const IP = '203.0.113.7'
function request(body, headers = {}) {
  const raw = typeof body === 'string' ? body : JSON.stringify(body)
  const h = new Headers({ 'content-type': 'application/json', 'x-real-ip': IP, 'x-vercel-forwarded-for': IP, 'x-forwarded-for': IP, ...headers })
  return new Request('https://courtos.co/api/test', { method: 'POST', headers: h, body: raw })
}
async function call(route, body, headers) {
  const res = await route.POST(request(body, headers))
  return { status: res.status, body: await res.json() }
}
const FORM = { name: 'Coach Sarah', email: 'Coach.Sarah+beta@GMail.com', organization: 'Riverside VBC', coaching_level: 'head_coach', platform: 'android', frustration: 'Rotations', hp: '' }
const RESET = { userId: '00000000-0000-4000-8000-000000000001', userEmail: 'coach@example.com', resetAt: '2026-10-02T00:00:00.000Z', kind: 'hard_reset' }
const bucket = (scope, value) => `web:${scope}:` + createHmac('sha256', SERVICE_KEY).update(`courtos-web-rl:v1:${scope}:${value}`).digest('hex')
const serviceOnly = () => s.rpcCalls.every((c) => c.key === SERVICE_KEY && c.fn === 'rate_limit_hit') && s.clients.every((c) => c.key === SERVICE_KEY)
const nothingDone = () => s.inserts.length === 0 && s.sent.length === 0

// ── lib/rateLimit.server.ts ─────────────────────────────────────────────────
assert('bucket name = "web:<scope>:" + HMAC-SHA256(service-role key) (independent node:crypto check)', await (async () => {
  reset(); await rl.hitRateLimit('signup-email', 'x@y.co', 3, 86400)
  return s.rpcCalls[0]?.args.p_key === bucket('signup-email', 'x@y.co')
})())
assert('bucket names are opaque: 64 hex chars, never contain the raw email or IP', await (async () => {
  reset(); await rl.hitRateLimit('signup-ip', IP, 5, 3600); await rl.hitRateLimit('signup-email', 'coach@example.com', 3, 86400)
  return s.rpcCalls.every((c) => /^web:(signup-ip|signup-email|reset-ip):[0-9a-f]{64}$/.test(c.args.p_key) && !c.args.p_key.includes('@') && !c.args.p_key.includes(IP))
})())
assert('emailBucketKey: case, +tag, Gmail dots and googlemail.com map to one inbox; other domains keep dots',
  rl.emailBucketKey(' Coach.Sarah+beta@GMail.com ') === 'coachsarah@gmail.com' &&
  rl.emailBucketKey('coachsarah@googlemail.com') === 'coachsarah@gmail.com' &&
  rl.emailBucketKey('j.doe+x@school.org') === 'j.doe@school.org' &&
  rl.emailBucketKey('a@b.co') !== rl.emailBucketKey('c@b.co'))
assert('clientIp: x-real-ip (Vercel) first, then x-vercel-forwarded-for, then first x-forwarded-for hop; "unknown" when absent',
  rl.clientIp(new Request('https://x', { headers: { 'x-real-ip': '1.1.1.1', 'x-forwarded-for': '9.9.9.9' } })) === '1.1.1.1' &&
  rl.clientIp(new Request('https://x', { headers: { 'x-vercel-forwarded-for': '2.2.2.2', 'x-forwarded-for': '9.9.9.9' } })) === '2.2.2.2' &&
  rl.clientIp(new Request('https://x', { headers: { 'x-forwarded-for': '3.3.3.3, 10.0.0.1' } })) === '3.3.3.3' &&
  rl.clientIp(new Request('https://x')) === 'unknown')
for (const [label, impl] of [
  ['DB error', () => ({ data: null, error: { code: '42501', message: 'permission denied for function rate_limit_hit' } })],
  ['thrown error', () => { throw new Error('ECONNREFUSED') }],
  ['null reply', () => ({ data: null, error: null })],
  ['"true" string', () => ({ data: 'true', error: null })],
  ['1', () => ({ data: 1, error: null })],
  ['{}', () => ({ data: {}, error: null })],
]) {
  reset(); s.rpcImpl = impl
  assert(`hitRateLimit: ${label} → 'unavailable' (fail closed)`, (await rl.hitRateLimit('reset-ip', IP, 10, 3600)) === 'unavailable')
}
for (const missing of ['SUPABASE_SERVICE_ROLE_KEY', 'NEXT_PUBLIC_SUPABASE_URL']) {
  reset(); delete process.env[missing]
  const r = await rl.hitRateLimit('reset-ip', IP, 10, 3600)
  assert(`hitRateLimit: missing ${missing} → 'unavailable', limiter never called`, r === 'unavailable' && s.rpcCalls.length === 0)
}

// ── notify-signup ───────────────────────────────────────────────────────────
reset()
let r = await call(signup, FORM)
const row = s.inserts[0]?.rows?.[0]
assert('signup: normal request → 200, IP bucket (5/3600) then inbox bucket (3/86400), both via SERVICE ROLE',
  r.status === 200 && r.body.ok === true && serviceOnly() && s.rpcCalls.length === 2 &&
  s.rpcCalls[0].args.p_key === bucket('signup-ip', IP) && s.rpcCalls[0].args.p_max === 5 && s.rpcCalls[0].args.p_window_seconds === 3600 &&
  s.rpcCalls[1].args.p_key === bucket('signup-email', 'coachsarah@gmail.com') && s.rpcCalls[1].args.p_max === 3 && s.rpcCalls[1].args.p_window_seconds === 86400)
assert('signup: the anon key is never used by the server route', s.clients.every((c) => c.key !== ANON_KEY))
assert('signup: records the beta signup server-side (service role) with the same row shape the browser used to write',
  s.inserts.length === 1 && s.inserts[0].table === 'beta_signups' && s.inserts[0].key === SERVICE_KEY &&
  row.name === 'Coach Sarah' && row.email === 'Coach.Sarah+beta@GMail.com' && row.organization === 'Riverside VBC' &&
  row.coaching_level === 'head_coach' && row.frustration === 'Rotations' && row.source === 'courtos.co/beta-android')
assert('signup: sends the team notification + the welcome email (to the lowercased address)',
  s.sent.length === 2 && s.sent[0].to === 'courtos@courtos.co' && s.sent[1].to === 'coach.sarah+beta@gmail.com')
reset(); await call(signup, { ...FORM, organization: '', frustration: '', platform: 'ios' })
assert('signup: empty optional fields stored as null; iOS source tag preserved',
  s.inserts[0]?.rows?.[0]?.organization === null && s.inserts[0]?.rows?.[0]?.frustration === null && s.inserts[0]?.rows?.[0]?.source === 'courtos.co/beta-ios')
reset(); await call(signup, { ...FORM, platform: 'x'.repeat(20) })
assert('signup: unknown platform is stored as "courtos.co/beta-unknown"', s.inserts[0]?.rows?.[0]?.source === 'courtos.co/beta-unknown')

reset(); s.rpcImpl = (args) => ({ data: !args.p_key.startsWith('web:signup-ip:'), error: null })
r = await call(signup, FORM)
assert('signup: IP over limit → 429, inbox bucket untouched, nothing inserted or sent', r.status === 429 && s.rpcCalls.length === 1 && nothingDone())
reset(); s.rpcImpl = (args) => ({ data: !args.p_key.startsWith('web:signup-email:'), error: null })
r = await call(signup, FORM)
assert('signup: inbox over limit → 429, nothing inserted or sent', r.status === 429 && nothingDone())
for (const [label, impl] of [
  ['limiter DB error (e.g. permission denied)', () => ({ data: null, error: { code: '42501', message: 'permission denied for function rate_limit_hit' } })],
  ['limiter throws', () => { throw new Error('fetch failed') }],
  ['unexpected limiter reply', () => ({ data: null, error: null })],
  ['inbox limiter error after IP pass', (args) => args.p_key.startsWith('web:signup-email:') ? { data: null, error: { message: 'boom' } } : { data: true, error: null }],
  ['IP limiter error while the inbox limiter is healthy', (args) => args.p_key.startsWith('web:signup-ip:') ? { data: null, error: { message: 'boom' } } : { data: true, error: null }],
]) {
  reset(); s.rpcImpl = impl
  r = await call(signup, FORM)
  assert(`signup: ${label} → 503, nothing inserted or sent, no internals leaked`,
    r.status === 503 && nothingDone() && !/42501|permission|rate_limit|boom|fetch/i.test(JSON.stringify(r.body)))
}
reset(); delete process.env.SUPABASE_SERVICE_ROLE_KEY
r = await call(signup, FORM)
assert('signup: SUPABASE_SERVICE_ROLE_KEY not configured → 503, nothing inserted or sent', r.status === 503 && nothingDone() && s.rpcCalls.length === 0)
reset(); s.insertImpl = () => ({ data: null, error: { message: 'insert failed' } })
r = await call(signup, FORM)
assert('signup: insert error → 500, no emails', r.status === 500 && s.sent.length === 0)
reset(); r = await call(signup, { ...FORM, hp: 'http://spam.example' })
assert('signup: honeypot → 200 ok, no limiter, nothing inserted or sent', r.status === 200 && s.rpcCalls.length === 0 && nothingDone())
reset(); r = await call(signup, { ...FORM, email: 'not-an-email' })
assert('signup: invalid email → 400, no limiter, nothing inserted or sent', r.status === 400 && s.rpcCalls.length === 0 && nothingDone())
reset(); r = await call(signup, FORM, { 'content-length': '500000' })
assert('signup: oversized body → 413 before any work', r.status === 413 && s.rpcCalls.length === 0 && nothingDone())
reset(); r = await call(signup, '{not json')
assert('signup: malformed JSON → 400, nothing done', r.status === 400 && s.rpcCalls.length === 0 && nothingDone())
reset(); await call(signup, { ...FORM, p_key: 'attacker', p_max: 1e9, p_window_seconds: 0, ip: '6.6.6.6' })
assert('signup: client-supplied key/limit/window/ip fields are ignored',
  s.rpcCalls.length === 2 && s.rpcCalls[0].args.p_key === bucket('signup-ip', IP) && s.rpcCalls[0].args.p_max === 5 && s.rpcCalls[1].args.p_max === 3)

// Exact limits with a stateful limiter (same semantics as public.rate_limit_hit)
reset(); s.rpcImpl = statefulLimiter()
const ipRun = []
for (let i = 0; i < 6; i++) ipRun.push((await call(signup, { ...FORM, email: `coach${i}@example.com` })).status)
assert('signup: 5/hour per IP preserved — 5 × 200 then 429 (distinct inboxes, same IP)', ipRun.join() === '200,200,200,200,200,429' && s.inserts.length === 5)
reset(); s.rpcImpl = statefulLimiter()
const inboxRun = []
for (const [i, variant] of ['coachsarah@gmail.com', 'Coach.Sarah@gmail.com', 'coachsarah+1@googlemail.com', 'c.o.a.c.h.s.a.r.a.h+2@gmail.com'].entries()) {
  inboxRun.push((await call(signup, { ...FORM, email: variant }, { 'x-real-ip': `198.51.100.${i}` })).status)
}
assert('signup: 3/day per inbox preserved — plus/dot variants of one Gmail inbox share it (3 × 200 then 429)', inboxRun.join() === '200,200,200,429' && s.inserts.length === 3 && s.sent.length === 6)

// ── notify-reset ────────────────────────────────────────────────────────────
reset()
r = await call(resetRoute, RESET)
assert('reset: normal request → 200, one bucket (10/3600) via SERVICE ROLE, one email to the owner',
  r.status === 200 && serviceOnly() && s.rpcCalls.length === 1 && s.rpcCalls[0].args.p_key === bucket('reset-ip', IP) &&
  s.rpcCalls[0].args.p_max === 10 && s.rpcCalls[0].args.p_window_seconds === 3600 && s.sent.length === 1 && s.sent[0].to === 'bentesoro1@gmail.com')
reset(); s.rpcImpl = () => ({ data: false, error: null })
r = await call(resetRoute, RESET)
assert('reset: over limit → 429, no email', r.status === 429 && s.sent.length === 0)
for (const [label, impl] of [
  ['limiter DB error', () => ({ data: null, error: { code: '42501', message: 'permission denied' } })],
  ['limiter throws', () => { throw new Error('fetch failed') }],
  ['unexpected limiter reply', () => ({ data: 'yes', error: null })],
]) {
  reset(); s.rpcImpl = impl
  r = await call(resetRoute, RESET)
  assert(`reset: ${label} → 503, no email, no internals leaked`, r.status === 503 && s.sent.length === 0 && !/42501|permission|fetch/i.test(JSON.stringify(r.body)))
}
reset(); delete process.env.SUPABASE_SERVICE_ROLE_KEY
r = await call(resetRoute, RESET)
assert('reset: SUPABASE_SERVICE_ROLE_KEY not configured → 503, no email', r.status === 503 && s.sent.length === 0 && s.rpcCalls.length === 0)
reset(); s.rpcImpl = statefulLimiter()
const resetRun = []
for (let i = 0; i < 11; i++) resetRun.push((await call(resetRoute, RESET)).status)
assert('reset: 10/hour per IP preserved — 10 × 200 then 429', resetRun.slice(0, 10).every((x) => x === 200) && resetRun[10] === 429 && s.sent.length === 10)

// ── Static guards: browser code and secret placement ────────────────────────
function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx|js|jsx|mjs)$/.test(n) ? [p] : []
  })
}
const SRC = ['app', 'components', 'lib'].flatMap((d) => walk(join(ROOT, d)))
const text = (p) => readFileSync(p, 'utf8')
const rel = (p) => relative(ROOT, p)
const beta = text(join(ROOT, 'components/BetaSignup.tsx'))
assert('BetaSignup.tsx: no rate_limit_hit, no Supabase client, no direct beta_signups write',
  !/rate_limit_hit|@supabase\/supabase-js|beta_signups|\.rpc\(|createClient/.test(beta))
assert('BetaSignup.tsx: posts to /api/notify-signup and treats any non-2xx as an error',
  beta.includes("fetch('/api/notify-signup'") && /if \(!res\.ok\) throw/.test(beta))
assert('no client/browser file references rate_limit_hit (only lib/rateLimit.server.ts does)',
  SRC.filter((p) => text(p).includes('rate_limit_hit')).map(rel).join() === 'lib/rateLimit.server.ts')
assert('SUPABASE_SERVICE_ROLE_KEY is read only in lib/rateLimit.server.ts, and never as a NEXT_PUBLIC_ variable',
  SRC.filter((p) => text(p).includes('SUPABASE_SERVICE_ROLE_KEY')).map(rel).join() === 'lib/rateLimit.server.ts' &&
  !SRC.some((p) => /NEXT_PUBLIC_[A-Z_]*SERVICE/.test(text(p))))
const serverMod = text(join(ROOT, 'lib/rateLimit.server.ts'))
assert("lib/rateLimit.server.ts imports 'server-only' (build fails if client code imports it)", /^import 'server-only'$/m.test(serverMod))
// Import graph: no 'use client' module may reach lib/rateLimit.server.ts.
const importsOf = (p) => [...text(p).matchAll(/from\s+['"]([^'"]+)['"]|import\s+['"]([^'"]+)['"]/g)]
  .map((m) => m[1] ?? m[2])
  .map((spec) => {
    const base = spec.startsWith('@/') ? join(ROOT, spec.slice(2)) : spec.startsWith('.') ? join(dirname(p), spec) : null
    if (!base) return null
    return ['', '.ts', '.tsx', '.js', '/index.ts', '/index.tsx'].map((e) => base + e).find((c) => existsSync(c) && statSync(c).isFile()) ?? null
  })
  .filter(Boolean)
const clientFiles = SRC.filter((p) => /^\s*['"]use client['"]/.test(text(p)))
const reaches = (start, target, seen = new Set()) => {
  if (start === target) return true
  if (seen.has(start)) return false
  seen.add(start)
  return importsOf(start).some((n) => reaches(n, target, seen))
}
const target = join(ROOT, 'lib/rateLimit.server.ts')
assert(`no 'use client' module (${clientFiles.length} found) imports lib/rateLimit.server.ts, directly or transitively`,
  clientFiles.length > 0 && clientFiles.every((p) => !reaches(p, target)))
assert('lib/rateLimit.server.ts is imported only by the two API route handlers',
  SRC.filter((p) => importsOf(p).includes(target)).map(rel).sort().join() === 'app/api/notify-reset/route.ts,app/api/notify-signup/route.ts')

console.log(`\n${passes} passed, ${failures} failed`)
console.log(failures === 0 ? '✅ ALL PASSED' : '❌ FAILURES')
process.exit(failures === 0 ? 0 : 1)
