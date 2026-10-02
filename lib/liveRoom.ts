// ════════════════════════════════════════════════════════════════════════
// Room-code access for the public /live viewer. Security audit P1-2.
//
// The viewer never reads the live_matches table. Its only read path is the
// get_live_match RPC: it takes the room code and returns that one live room's
// whitelisted, jersey-only viewer fields — or null once the coach ends the
// broadcast, the room expires, or the code is wrong. The public key cannot
// select the table, so updates arrive by polling the same RPC: it answers
// {"unchanged": true} when nothing moved, which keeps each poll tiny.
// ════════════════════════════════════════════════════════════════════════

/** How often a watching viewer asks for changes. */
export const LIVE_POLL_MS = 3000

/** Room codes are 6 characters; case, spaces and the display hyphen are ignored. */
export function cleanRoomCode(raw: string): string {
  return (raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export type LiveRoomReply =
  | { kind: 'update'; data: Record<string, unknown>; version: string | null }
  | { kind: 'unchanged' }
  | { kind: 'gone' } // ended, expired or not found
  | { kind: 'error' } // transient: keep the last good state and retry

/** Classify one get_live_match reply ({ data, error } from supabase.rpc). */
export function classifyLiveRoomReply(data: unknown, error: unknown): LiveRoomReply {
  if (error) return { kind: 'error' }
  if (data === null || data === undefined) return { kind: 'gone' }
  if (typeof data !== 'object' || Array.isArray(data)) return { kind: 'error' }
  const d = data as Record<string, unknown>
  if (d.unchanged === true) return { kind: 'unchanged' }
  if (typeof d.team_name !== 'string') return { kind: 'error' }
  return { kind: 'update', data: d, version: typeof d.v === 'string' ? d.v : null }
}
