// Live viewer harness (security audit P1-2). Offline: no network, no Supabase.
// Checks the room-code reply handling in lib/liveRoom.ts and static guards on
// the /live viewer: it must read rooms ONLY through the get_live_match RPC
// (no direct live_matches select, no postgres_changes stream) and poll it.
//
//   node --experimental-strip-types scripts/validate-live-viewer.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
let passes = 0
let failures = 0
function assert(name, cond) {
  if (cond) { passes++; console.log(`PASS  ${name}`) } else { failures++; console.log(`FAIL  ${name}`) }
}

const { LIVE_POLL_MS, cleanRoomCode, classifyLiveRoomReply } = await import(pathToFileURL(join(ROOT, 'lib/liveRoom.ts')).href)

// ── Reply classification ─────────────────────────────────────────────────────
const room = { team_name: 'Synthetic', opponent_name: 'Opp', our_score: 3, their_score: 2, is_active: true, stats_snapshot: null, v: 'abc123' }
const k = (data, error = null) => classifyLiveRoomReply(data, error)
assert('room payload -> update with its version', k(room).kind === 'update' && k(room).version === 'abc123' && k(room).data.our_score === 3)
assert('payload without v -> update, version null', k({ ...room, v: undefined }).kind === 'update' && k({ ...room, v: undefined }).version === null)
assert('{unchanged:true} -> unchanged (no state change, no re-render)', k({ unchanged: true, v: 'abc123' }).kind === 'unchanged')
assert('null -> gone (ended / expired / wrong code)', k(null).kind === 'gone')
assert('undefined -> gone', k(undefined).kind === 'gone')
assert('RPC error -> error (transient; keep last good state)', k(null, { message: 'boom' }).kind === 'error' && k(room, { message: 'boom' }).kind === 'error')
assert('array -> error', k([room]).kind === 'error')
assert('string -> error', k('room').kind === 'error')
assert('object without team_name -> error (not a room)', k({ our_score: 1 }).kind === 'error')
assert('unchanged:false is not treated as unchanged', k({ ...room, unchanged: false }).kind === 'update')

// ── Room code handling ───────────────────────────────────────────────────────
assert('code cleaning: case, hyphen and spaces ignored', cleanRoomCode(' abc-23 4 ') === 'ABC234')
assert('code cleaning: punctuation and wildcards stripped', cleanRoomCode("A%B_C'2;3*4") === 'ABC234')
assert('code cleaning: empty / nullish safe', cleanRoomCode('') === '' && cleanRoomCode(undefined) === '')
assert('poll interval is between 1s and 10s', LIVE_POLL_MS >= 1000 && LIVE_POLL_MS <= 10000)

// ── Static guards on the viewer ──────────────────────────────────────────────
const live = readFileSync(join(ROOT, 'app/live/LiveClient.tsx'), 'utf8')
const code = live.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
assert('viewer: no direct live_matches table read', !/\.from\(\s*['"`]live_matches['"`]\s*\)/.test(code))
assert('viewer: no postgres_changes subscription', !code.includes('postgres_changes'))
assert('viewer: no realtime channel', !/\.channel\(/.test(code) && !code.includes('removeChannel'))
assert('viewer: initial load AND polling use get_live_match', (code.match(/\.rpc\(\s*['"]get_live_match['"]/g) || []).length === 2)
assert('viewer: polls send the known version', /p_known_version:\s*versionRef\.current/.test(code))
assert('viewer: polling uses LIVE_POLL_MS and is cleared', code.includes('setInterval(') && code.includes('LIVE_POLL_MS') && code.includes('clearInterval('))
assert('viewer: polling stops on unmount', /useEffect\(\(\) => stopPolling, \[stopPolling\]\)/.test(code))
assert('viewer: "watch another" stops polling', /handleWatchAnother = \(\) => \{\s*stopPolling\(\)/.test(code))
assert('viewer: a gone reply ends the match view', /reply\.kind === 'gone'\)\s*\{\s*stopPolling\(\)\s*setPageState\('ended'\)/.test(code))
assert('viewer: transient errors keep watching (no error state from polls)', !/pollRoom[\s\S]*?setPageState\('error'\)[\s\S]*?\}, \[stopPolling\]\)/.test(code.slice(code.indexOf('const pollRoom'), code.indexOf('const connectToRoom'))))
assert('viewer: stale replies for a previous room are ignored', (code.match(/roomRef\.current !== clean/g) || []).length >= 3)
const iface = (code.match(/interface LiveMatch \{[\s\S]*?\n\}/) || [''])[0]
assert('viewer: LiveMatch type carries no id / room_code / team_id / timestamps', iface.length > 0 && !/\b(id|room_code|team_id|last_updated|created_at)\s*:/.test(iface))
assert('viewer: imports the room helpers', /from '@\/lib\/liveRoom'/.test(code))

// Nothing else in the site reads the table or streams it either.
const offenders = []
for (const dir of ['app', 'components', 'lib']) {
  const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (/\.(t|j)sx?$/.test(f)) { const t = readFileSync(p, 'utf8'); if (/\.from\(\s*['"`]live_matches['"`]/.test(t) || t.includes('postgres_changes')) offenders.push(relative(ROOT, p)) } } }
  walk(join(ROOT, dir))
}
assert('site-wide: no other live_matches select or postgres_changes', offenders.length === 0)

console.log(`\n${passes} passed, ${failures} failed`)
if (failures) { console.log('❌ FAILED'); process.exit(1) } else console.log('✅ ALL PASSED')
