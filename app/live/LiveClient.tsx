'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface LivePlayerLine {
  id: string
  name: string
  jersey: number
  position: string
  kills: number
  hittingErrors: number
  attackAttempts: number
  hittingPct: number | null
  aces: number
  serviceErrors: number
  serveInPlay: number
  blocks: number
  digs: number
  passes: number
  passRating: number | null
  passErrors: number
  points: number
}

interface LiveTeamLine {
  pointsWon: number
  pointsLost: number
  kills: number
  aces: number
  blocks: number
  oppErrors: number
  serviceErrors: number
  hittingErrors: number
  passErrors: number
  oppKills: number
  digs: number
  passes: number
  passRating: number | null
  attackAttempts: number
  hittingPct: number | null
}

interface LiveCourtSlot {
  pos: number
  jersey: number
  name: string
  position: string
}

interface LiveRecentPlay {
  label: string
  player: string | null
  us: boolean
  our: number
  their: number
}

interface LiveStatsSnapshot {
  updatedAt: string
  team: LiveTeamLine
  players: LivePlayerLine[]
  court?: LiveCourtSlot[]
  recentPlays?: LiveRecentPlay[]
}

// Role colors mirror the app's positionColors.ts (short labels).
const POS_COLORS: Record<string, string> = {
  S: '#EAB308',
  OH: '#22C55E',
  MB: '#3B82F6',
  RS: '#F97316',
  OPP: '#F97316',
  L: '#8B5CF6',
  DS: '#14B8A6',
}
function posColor(short: string): string {
  return POS_COLORS[(short || '').toUpperCase()] ?? '#64748B'
}

// ─── Court formations (Base / Serve / Receive) ────────────────────────────────
// Tactical coordinates lifted from the app's src/constants/tacticalPositions.ts
// (frame: x 0=left..1=right, y 0=net..1=baseline). Arrays are pos 1..6 for R1..R6.
// court[] from the snapshot already gives the current on-court player per position
// (rotation + libero swap applied by the app), so we can place the *current*
// rotation in any formation without extra data.
type CourtFmt = 'base' | 'serve' | 'receive'
const BASE_COORDS: [number, number][] =[[0.88, 0.78], [0.88, 0.09], [0.5, 0.09], [0.12, 0.09], [0.12, 0.78], [0.5, 0.78]]
const FORM_COORDS: Record<string, { receive: [number, number][][]; serve: [number, number][][] }> = {
  '5-1': {
    receive: [[[0.92,0.73],[0.83,0.62],[0.27,0.24],[0.08,0.33],[0.25,0.67],[0.54,0.73]],[[0.8,0.75],[0.92,0.5],[0.84,0.23],[0.17,0.73],[0.46,0.78],[0.71,0.27]],[[0.75,0.77],[0.91,0.31],[0.18,0.75],[0.08,0.19],[0.24,0.28],[0.54,0.75]],[[0.91,0.81],[0.24,0.74],[0.12,0.43],[0.07,0.18],[0.51,0.78],[0.75,0.74]],[[0.83,0.67],[0.92,0.45],[0.64,0.18],[0.19,0.68],[0.49,0.74],[0.63,0.8]],[[0.78,0.67],[0.64,0.19],[0.21,0.69],[0.08,0.2],[0.3,0.79],[0.52,0.68]]],
    serve: [[[0.86,0.93],[0.58,0.26],[0.5,0.19],[0.39,0.26],[0.12,0.54],[0.5,0.83]],[[0.85,0.92],[0.53,0.19],[0.43,0.25],[0.32,0.18],[0.51,0.81],[0.85,0.56]],[[0.85,0.92],[0.71,0.19],[0.59,0.22],[0.5,0.2],[0.44,0.63],[0.56,0.59]],[[0.85,0.92],[0.62,0.2],[0.51,0.17],[0.41,0.22],[0.14,0.6],[0.51,0.82]],[[0.85,0.92],[0.5,0.2],[0.39,0.22],[0.3,0.19],[0.49,0.81],[0.83,0.56]],[[0.85,0.92],[0.7,0.17],[0.59,0.2],[0.5,0.17],[0.45,0.63],[0.56,0.58]]],
  },
  '6-2': {
    receive: [[[0.87,0.83],[0.79,0.76],[0.49,0.19],[0.14,0.19],[0.17,0.76],[0.5,0.8]],[[0.76,0.78],[0.9,0.43],[0.72,0.18],[0.16,0.63],[0.44,0.78],[0.59,0.27]],[[0.8,0.76],[0.84,0.19],[0.15,0.71],[0.11,0.19],[0.32,0.25],[0.49,0.74]],[[0.85,0.85],[0.77,0.77],[0.49,0.19],[0.14,0.19],[0.16,0.76],[0.49,0.8]],[[0.77,0.77],[0.88,0.53],[0.68,0.11],[0.16,0.76],[0.46,0.86],[0.72,0.32]],[[0.78,0.76],[0.88,0.18],[0.16,0.7],[0.11,0.19],[0.26,0.34],[0.49,0.79]]],
    serve: [[[0.86,0.93],[0.64,0.25],[0.52,0.15],[0.35,0.2],[0.11,0.56],[0.52,0.77]],[[0.86,0.93],[0.53,0.17],[0.4,0.19],[0.13,0.18],[0.48,0.78],[0.84,0.52]],[[0.86,0.93],[0.79,0.16],[0.64,0.16],[0.52,0.16],[0.17,0.51],[0.33,0.77]],[[0.86,0.93],[0.67,0.21],[0.54,0.16],[0.4,0.19],[0.29,0.7],[0.66,0.69]],[[0.86,0.93],[0.54,0.13],[0.4,0.17],[0.17,0.16],[0.47,0.79],[0.81,0.54]],[[0.86,0.93],[0.8,0.13],[0.65,0.17],[0.52,0.16],[0.21,0.51],[0.33,0.76]]],
  },
  '4-2': {
    receive: [[[0.83,0.74],[0.72,0.16],[0.44,0.3],[0.31,0.16],[0.19,0.74],[0.51,0.74]],[[0.8,0.74],[0.63,0.16],[0.5,0.32],[0.38,0.16],[0.19,0.74],[0.51,0.74]],[[0.81,0.74],[0.51,0.32],[0.39,0.16],[0.08,0.32],[0.2,0.74],[0.5,0.74]],[[0.84,0.74],[0.72,0.16],[0.46,0.31],[0.32,0.16],[0.21,0.74],[0.51,0.74]],[[0.78,0.74],[0.63,0.16],[0.5,0.32],[0.37,0.16],[0.21,0.74],[0.49,0.74]],[[0.84,0.74],[0.51,0.32],[0.39,0.15],[0.09,0.32],[0.18,0.74],[0.51,0.74]]],
    serve: [[[0.85,0.92],[0.76,0.15],[0.5,0.26],[0.4,0.15],[0.15,0.74],[0.51,0.74]],[[0.86,0.9],[0.65,0.18],[0.52,0.22],[0.38,0.18],[0.2,0.73],[0.52,0.73]],[[0.85,0.91],[0.56,0.17],[0.42,0.22],[0.09,0.19],[0.14,0.73],[0.52,0.73]],[[0.85,0.91],[0.82,0.16],[0.55,0.23],[0.42,0.17],[0.14,0.74],[0.52,0.73]],[[0.85,0.91],[0.67,0.18],[0.52,0.22],[0.39,0.24],[0.16,0.73],[0.51,0.73]],[[0.85,0.91],[0.56,0.17],[0.42,0.22],[0.09,0.19],[0.14,0.73],[0.52,0.73]]],
  },
}
function coordFor(system: string, fmt: CourtFmt, rotation: number, pos: number): { x: number; y: number } {
  const sys = FORM_COORDS[system] ? system : '5-1'
  const r = Math.min(6, Math.max(1, rotation || 1))
  const a = fmt === 'base' ? BASE_COORDS[pos - 1] : FORM_COORDS[sys][fmt][r - 1][pos - 1]
  return { x: a[0], y: a[1] }
}

// Current scoring run, derived from recentPlays (newest first).
function computeRun(plays: LiveRecentPlay[] | undefined): { us: boolean; len: number } {
  if (!plays || plays.length === 0) return { us: true, len: 0 }
  const first = plays[0]
  let len = 0
  for (const p of plays) { if (p.us === first.us) len++; else break }
  return { us: first.us, len }
}

// Auto-written "match story" lines from team + player tallies.
function buildStory(players: LivePlayerLine[], run: { us: boolean; len: number }, teamName: string, oppName: string): { emoji: string; text: string }[] {
  const out: { emoji: string; text: string }[] = []
  if (run.len >= 3) out.push({ emoji: run.us ? '🔥' : '⚠️', text: `${run.us ? teamName : oppName} on a ${run.len}-0 run.` })
  const topK = [...players].sort((a, b) => b.kills - a.kills)[0]
  if (topK && topK.kills > 0) out.push({ emoji: '⚡', text: `${topK.name} leads with ${topK.kills} kill${topK.kills > 1 ? 's' : ''}.` })
  const passers = players.filter((p) => p.passRating != null).sort((a, b) => (b.passRating ?? 0) - (a.passRating ?? 0))
  if (passers[0] && (passers[0].passRating ?? 0) > 0) out.push({ emoji: '🎯', text: `Serve-receive steady — ${passers[0].name} passing ${(passers[0].passRating ?? 0).toFixed(1)} of 3.0.` })
  const acer = players.find((p) => p.aces > 0)
  if (acer) out.push({ emoji: '🏐', text: `${acer.name} has ${acer.aces} ace${acer.aces > 1 ? 's' : ''} from the line.` })
  return out.slice(0, 3)
}

interface LiveMatch {
  id: string
  room_code: string
  team_name: string
  opponent_name: string
  our_score: number
  their_score: number
  current_set: number
  sets_won: number
  sets_lost: number
  serving_us: boolean
  current_rotation: number
  court_mode: string
  is_active: boolean
  last_updated: string | null
  stats_snapshot: LiveStatsSnapshot | null
}

function pctLabel(p: number | null): string {
  if (p == null) return '—'
  return `${Math.round(p * 100)}%`
}
function ratingLabel(r: number | null): string {
  if (r == null) return '—'
  return r.toFixed(1)
}

function GaugeBar({ label, valueLabel, pct, color }: { label: string; valueLabel: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: '5px' }}>
        <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <span className={BARLOW} style={{ fontSize: '15px', fontWeight: 900, color }}>{valueLabel}</span>
      </div>
      <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#1e293b', overflow: 'hidden' }}>
        <div style={{ width: `${Math.round(Math.max(0, Math.min(1, pct)) * 100)}%`, height: '100%', backgroundColor: color, borderRadius: '4px', transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )
}

type PageState = 'enter' | 'loading' | 'watching' | 'ended' | 'error'

const BARLOW = 'font-[family-name:var(--font-barlow)]'

function formatCode(raw: string): string {
  const clean = raw.replace(/[^A-Z0-9]/g, '')
  if (clean.length === 6) return `${clean.slice(0, 3)}-${clean.slice(3)}`
  return clean
}

function timeAgoLabel(lastUpdated: Date | null, now: Date): string {
  if (!lastUpdated) return ''
  const secs = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000)
  if (secs < 5) return 'Updated just now'
  if (secs < 60) return `Updated ${secs}s ago`
  return `Updated ${Math.floor(secs / 60)}m ago`
}

function CourtOSLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const fontSize = size === 'sm' ? '18px' : size === 'lg' ? '36px' : '28px'
  return (
    <div className={BARLOW} style={{ fontSize, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>
      <span style={{ color: '#f8fafc' }}>Court</span>
      <span style={{ color: '#22c55e' }}>OS</span>
    </div>
  )
}

export default function LiveClient() {
  const searchParams = useSearchParams()

  const [inputCode, setInputCode] = useState('')
  const [pageState, setPageState] = useState<PageState>('enter')
  const [errorMsg, setErrorMsg] = useState('')
  const [matchData, setMatchData] = useState<LiveMatch | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [now, setNow] = useState<Date>(() => new Date())
  const [activeCode, setActiveCode] = useState('')
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null)
  const [myJersey, setMyJersey] = useState<number | null>(null)
  const [fmt, setFmt] = useState<CourtFmt>('receive')
  const [fmtManual, setFmtManual] = useState(false)

  const channelRef = useRef<any>(null)

  // Persist the parent's followed player across visits.
  useEffect(() => {
    try {
      const v = window.localStorage.getItem('courtos.live.myJersey')
      if (v != null) setMyJersey(Number(v))
    } catch {}
  }, [])
  const followPlayer = useCallback((jersey: number | null) => {
    setMyJersey(jersey)
    try {
      if (jersey == null) window.localStorage.removeItem('courtos.live.myJersey')
      else window.localStorage.setItem('courtos.live.myJersey', String(jersey))
    } catch {}
  }, [])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current)
    }
  }, [])

  const connectToRoom = useCallback(async (code: string) => {
    const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (clean.length < 6) return

    setPageState('loading')
    setErrorMsg('')

    try {
      const { data, error } = await (supabase as any)
        .from('live_matches')
        .select('*')
        .eq('room_code', clean)
        .eq('is_active', true)
        .single()

      if (error || !data) {
        setPageState('error')
        setErrorMsg('Room not found. Check the code and try again.')
        return
      }

      const match = data as LiveMatch
      setMatchData(match)
      setLastUpdated(new Date())
      setActiveCode(clean)
      setPageState(match.is_active ? 'watching' : 'ended')

      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }

      const channel = supabase
        .channel(`live_match_${clean}`)
        .on('postgres_changes' as any, {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_matches',
          filter: `room_code=eq.${clean}`,
        }, (payload: { new: LiveMatch }) => {
          setMatchData(payload.new)
          setLastUpdated(new Date())
          if (!payload.new.is_active) setPageState('ended')
        })
        .subscribe()

      channelRef.current = channel
    } catch {
      setPageState('error')
      setErrorMsg('Room not found. Check the code and try again.')
    }
  }, [])

  // Auto-connect from ?code= URL param
  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      const upper = code.toUpperCase()
      setInputCode(upper)
      connectToRoom(upper)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, '')
      .slice(0, 7)
    setInputCode(val)
    if (pageState === 'error') {
      setPageState('enter')
      setErrorMsg('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    connectToRoom(inputCode)
  }

  const handleWatchAnother = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
    }
    setMatchData(null)
    setInputCode('')
    setPageState('enter')
    setActiveCode('')
    setLastUpdated(null)
  }

  // ─── LOADING ──────────────────────────────────────────────────────────────

  if (pageState === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5" style={{ backgroundColor: '#060b14' }}>
        <CourtOSLogo size="lg" />
        <div
          className="rounded-full animate-spin"
          style={{
            width: '36px',
            height: '36px',
            border: '2px solid #1e293b',
            borderTopColor: '#22c55e',
          }}
        />
        <p style={{ fontSize: '13px', color: '#475569' }}>Connecting…</p>
      </div>
    )
  }

  // ─── ENDED ────────────────────────────────────────────────────────────────

  if (pageState === 'ended' && matchData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4" style={{ backgroundColor: '#060b14' }}>
        <CourtOSLogo size="lg" />
        <div style={{ fontSize: '52px' }}>🏆</div>
        <div className="text-center">
          <h2 className={`${BARLOW} text-white`} style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1 }}>
            Match Ended
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>
            {matchData.team_name} vs {matchData.opponent_name}
          </p>
        </div>

        <div
          className="text-center rounded-xl"
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            padding: '20px 32px',
            minWidth: '220px',
          }}
        >
          <p style={{ fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
            Final Score
          </p>
          <div className={BARLOW} style={{ fontSize: '60px', fontWeight: 900, lineHeight: 1 }}>
            <span style={{ color: '#22c55e' }}>{matchData.our_score}</span>
            <span style={{ color: '#334155', margin: '0 10px' }}>–</span>
            <span style={{ color: '#94a3b8' }}>{matchData.their_score}</span>
          </div>
          <p style={{ fontSize: '12px', color: '#475569', marginTop: '8px' }}>
            Sets {matchData.sets_won}–{matchData.sets_lost}
          </p>
        </div>

        <button
          onClick={handleWatchAnother}
          className={BARLOW}
          style={{
            backgroundColor: '#22c55e',
            color: '#000',
            fontWeight: 900,
            fontSize: '16px',
            borderRadius: '10px',
            padding: '14px 32px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '4px',
          }}
        >
          Watch Another Match
        </button>

        <p style={{ fontSize: '12px', color: '#1e293b', marginTop: '16px' }}>
          Powered by CourtOS · courtos.co
        </p>
      </div>
    )
  }

  // ─── WATCHING ─────────────────────────────────────────────────────────────

  if (pageState === 'watching' && matchData) {
    const servingUs = matchData.serving_us
    const homeColor = servingUs ? '#22c55e' : '#ef4444'
    const awayColor = servingUs ? '#ef4444' : '#22c55e'
    const borderColor = servingUs ? '#22c55e' : '#ef4444'
    const glowColor = servingUs ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'
    const timeLabel = timeAgoLabel(lastUpdated, now)
    const homeName = matchData.team_name.slice(0, 13)
    const awayName = matchData.opponent_name.slice(0, 13)

    const snap = matchData.stats_snapshot
    const run = computeRun(snap?.recentPlays)
    const system = FORM_COORDS[matchData.court_mode] ? matchData.court_mode : '5-1'
    const fmtEff: CourtFmt = fmtManual ? fmt : (servingUs ? 'serve' : 'receive')
    const myPlayer = myJersey != null ? snap?.players.find((p) => p.jersey === myJersey) ?? null : null
    const story = snap ? buildStory(snap.players, run, homeName, awayName) : []

    return (
      <div
        className="flex flex-col"
        style={{ minHeight: '100vh', backgroundColor: '#060b14', maxWidth: '480px', margin: '0 auto' }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '12px 16px', borderBottom: '1px solid #1e293b', flexShrink: 0 }}
        >
          <CourtOSLogo size="sm" />

          <div
            className="flex items-center gap-1.5 rounded-full animate-pulse"
            style={{
              backgroundColor: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              padding: '4px 12px',
            }}
          >
            <span style={{ fontSize: '7px', color: '#ef4444' }}>●</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', letterSpacing: '0.06em' }}>
              LIVE
            </span>
          </div>

          <div style={{ fontSize: '11px', color: '#334155' }}>
            #{formatCode(activeCode)}
          </div>
        </div>

        {/* Team names */}
        <div
          style={{
            padding: '14px 16px 8px',
            textAlign: 'center',
            fontSize: '12px',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {matchData.team_name} vs {matchData.opponent_name}
        </div>

        {/* Scoreboard */}
        <div
          className="mx-4 overflow-hidden rounded-xl"
          style={{
            backgroundColor: '#070d1a',
            border: `1.5px solid ${borderColor}`,
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        >
          {/* Score row */}
          <div className="flex">
            {/* Home */}
            <div
              className="flex-1 flex flex-col items-center"
              style={{ padding: '20px 12px 16px', borderRight: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div
                style={{
                  fontSize: '9px',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '6px',
                }}
              >
                {homeName}
              </div>
              <div
                className={BARLOW}
                style={{ fontSize: '56px', fontWeight: 900, color: homeColor, lineHeight: 1 }}
              >
                {matchData.our_score}
              </div>
            </div>

            {/* Center */}
            <div
              className="flex flex-col items-center justify-center"
              style={{ width: '60px', padding: '12px 0' }}
            >
              <div
                style={{
                  fontSize: '7px',
                  color: '#334155',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '2px',
                }}
              >
                SET
              </div>
              <div
                className={BARLOW}
                style={{ fontSize: '30px', fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}
              >
                {matchData.current_set}
              </div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
                {matchData.sets_won}–{matchData.sets_lost}
              </div>
            </div>

            {/* Away */}
            <div
              className="flex-1 flex flex-col items-center"
              style={{ padding: '20px 12px 16px', borderLeft: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div
                style={{
                  fontSize: '9px',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '6px',
                }}
              >
                {awayName}
              </div>
              <div
                className={BARLOW}
                style={{ fontSize: '56px', fontWeight: 900, color: awayColor, lineHeight: 1 }}
              >
                {matchData.their_score}
              </div>
            </div>
          </div>

          {/* Serving + momentum bar */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '8px 14px 10px' }}>
            <div className="flex items-center" style={{ minHeight: '18px' }}>
              {servingUs ? (
                <div className="flex items-center gap-1.5">
                  <span style={{ fontSize: '8px', color: '#22c55e' }}>●</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>SERVING</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 ml-auto">
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>OPP SERVING 🏐</span>
                </div>
              )}
            </div>
            {run.len > 0 && (
              <>
                <div style={{ height: '6px', borderRadius: '999px', backgroundColor: '#13203a', overflow: 'hidden', marginTop: '7px' }}>
                  <div style={{ width: `${Math.max(8, Math.min(92, run.us ? 50 + Math.min(run.len, 8) * 6 : 50 - Math.min(run.len, 8) * 6))}%`, height: '100%', background: run.us ? 'linear-gradient(90deg,#22c55e,#4ade80)' : 'linear-gradient(90deg,#f87171,#ef4444)', transition: 'width 0.6s' }} />
                </div>
                <div className="flex items-center justify-between" style={{ marginTop: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: run.us ? '#22c55e' : '#ef4444' }}>{run.us ? '🔥' : '⚠️'} {run.len}-0 run</span>
                  <span style={{ fontSize: '10px', color: '#475569' }}>momentum</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Rotation / sets / status strip */}
        <div
          className="flex justify-between items-center mx-4 mt-3 rounded-xl"
          style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '10px 18px' }}
        >
          <div className="flex flex-col">
            <div style={{ fontSize: '8px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rotation</div>
            <div className={BARLOW} style={{ fontSize: '22px', fontWeight: 900, color: '#f8fafc', lineHeight: 1.1 }}>
              R{matchData.current_rotation}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div style={{ fontSize: '8px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sets</div>
            <div className={BARLOW} style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', lineHeight: 1.1 }}>
              {matchData.sets_won}–{matchData.sets_lost}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div style={{ fontSize: '8px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</div>
            <div className={BARLOW} style={{ fontSize: '14px', fontWeight: 700, color: servingUs ? '#22c55e' : '#f59e0b', lineHeight: 1.1 }}>
              {servingUs ? 'SERVING' : 'RECEIVING'}
            </div>
          </div>
        </div>

        {/* ── Your Player ── */}
        {snap && snap.players.length > 0 && (
          myPlayer ? (() => {
            const c = posColor(myPlayer.position)
            const atk = myPlayer.hittingPct == null ? 0 : Math.max(0, Math.min(1, (myPlayer.hittingPct + 0.2) / 0.7))
            const pass = myPlayer.passRating == null ? 0 : myPlayer.passRating / 3
            const ring = (label: string, frac: number, col: string, center: string) => {
              const R = 20, CC = 2 * Math.PI * R, off = CC * (1 - Math.max(0, Math.min(1, frac)))
              return (
                <div className="flex flex-col items-center" style={{ gap: '5px' }} key={label}>
                  <div style={{ position: 'relative', width: '52px', height: '52px' }}>
                    <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="26" cy="26" r={R} fill="none" stroke="#13203a" strokeWidth="6" />
                      <circle cx="26" cy="26" r={R} fill="none" stroke={col} strokeWidth="6" strokeLinecap="round" strokeDasharray={CC} strokeDashoffset={off} />
                    </svg>
                    <div className={BARLOW} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900, color: col }}>{center}</div>
                  </div>
                  <span style={{ fontSize: '8px', color: '#64748b', textTransform: 'uppercase' }}>{label}</span>
                </div>
              )
            }
            return (
              <div className="mx-4 mt-3 rounded-xl" style={{ background: 'linear-gradient(155deg,#10243a,#0d1526 60%)', border: `1.5px solid ${c}`, padding: '14px' }}>
                <div className="flex items-center" style={{ gap: '12px' }}>
                  <div className={BARLOW} style={{ width: '52px', height: '52px', borderRadius: '999px', border: `2.5px solid ${c}`, backgroundColor: '#0b1120', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900, color: '#f8fafc', boxShadow: `0 0 16px ${c}55` }}>{myPlayer.jersey}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={BARLOW} style={{ fontSize: '22px', fontWeight: 900, lineHeight: 1 }}>{myPlayer.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>#{myPlayer.jersey} · <span style={{ color: c, fontWeight: 700 }}>{myPlayer.position}</span> · {myPlayer.points} pts</div>
                  </div>
                  <button onClick={() => followPlayer(null)} style={{ fontSize: '10px', color: '#64748b', background: 'transparent', border: '1px solid #1e293b', borderRadius: '999px', padding: '4px 10px', cursor: 'pointer' }}>Unfollow</button>
                </div>
                <div className="flex" style={{ justifyContent: 'space-between', marginTop: '14px' }}>
                  {ring('Attack', atk, '#22c55e', myPlayer.hittingPct == null ? '—' : pctLabel(myPlayer.hittingPct))}
                  {ring('Serve', Math.min(1, myPlayer.aces * 0.4 + (myPlayer.serviceErrors ? 0.25 : 0.55)), '#eab308', String(myPlayer.aces))}
                  {ring('Pass', pass, '#8b5cf6', ratingLabel(myPlayer.passRating))}
                  {ring('Defense', Math.min(1, myPlayer.digs * 0.18 + myPlayer.blocks * 0.25 + 0.1), '#14b8a6', String(myPlayer.digs + myPlayer.blocks))}
                </div>
              </div>
            )
          })() : (
            <div className="mx-4 mt-3 rounded-xl" style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>⭐ Follow your player — tap the ☆ on any player below to pin them here all match.</span>
            </div>
          )
        )}

        {/* ── Match Story ── */}
        {story.length > 0 && (
          <div className="mx-4 mt-3" style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {story.map((st, i) => (
              <div key={i} className="flex items-center rounded-xl" style={{ gap: '10px', backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '10px 12px' }}>
                <span style={{ fontSize: '15px' }}>{st.emoji}</span>
                <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{st.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── On Court — Base / Serve / Receive ── */}
        {snap?.court && snap.court.length > 0 && (() => {
          const byPos: Record<number, LiveCourtSlot> = {}
          for (const s of snap.court) byPos[s.pos] = s
          const X = (x: number) => `${6 + x * 88}%`
          const Y = (y: number) => `${8 + y * 84}%`
          return (
            <div className="mx-4 mt-3 rounded-xl" style={{ backgroundColor: '#070d1a', border: '1px solid #1e293b', padding: '12px' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em' }}>On Court</span>
                <span className={BARLOW} style={{ fontSize: '11px', fontWeight: 800, color: '#eab308', backgroundColor: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.35)', borderRadius: '999px', padding: '2px 9px' }}>{system}</span>
              </div>
              <div className="flex" style={{ gap: '5px', marginBottom: '8px' }}>
                {(['base', 'serve', 'receive'] as CourtFmt[]).map((f) => {
                  const on = fmtEff === f
                  return (
                    <button key={f} onClick={() => { setFmt(f); setFmtManual(true) }} className={BARLOW}
                      style={{ flex: 1, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '7px 0', borderRadius: '8px', cursor: 'pointer', color: on ? '#04130a' : '#64748b', background: on ? '#22c55e' : '#0b1322', border: `1px solid ${on ? '#22c55e' : '#1e293b'}` }}>
                      {f}
                    </button>
                  )
                })}
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '7 / 8', background: 'radial-gradient(120% 80% at 50% 38%,#11253e,#0a1120)', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: '6%', right: '6%', top: '8%', height: '4px', background: 'linear-gradient(90deg,transparent,#fbbf24,#fbbf24,transparent)', borderRadius: '2px' }} />
                <div style={{ position: 'absolute', left: '6%', right: '6%', top: '36%', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'absolute', left: '6%', right: '6%', top: '92%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                {[1, 2, 3, 4, 5, 6].map((pos) => {
                  const s = byPos[pos]
                  if (!s) return null
                  const c = posColor(s.position)
                  const cc = coordFor(system, fmtEff, matchData.current_rotation, pos)
                  const serving = fmtEff === 'serve' && pos === 1
                  const mine = myJersey === s.jersey
                  return (
                    <div key={pos} style={{ position: 'absolute', left: X(cc.x), top: Y(cc.y), transform: 'translate(-50%,-50%)', transition: 'left 0.6s cubic-bezier(.34,1.2,.5,1), top 0.6s cubic-bezier(.34,1.2,.5,1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontSize: '8px', fontWeight: 800, color: c, border: `1px solid ${c}66`, background: '#0b1120', borderRadius: '999px', padding: '1px 6px', marginBottom: '-7px', zIndex: 3, position: 'relative' }}>{s.position}</div>
                      <div className={BARLOW} style={{ width: '46px', height: '46px', borderRadius: '999px', border: `2.5px solid ${c}`, backgroundColor: '#0b1120', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: serving ? '0 0 0 3px rgba(234,179,8,0.55), 0 0 18px rgba(234,179,8,0.5)' : mine ? '0 0 0 3px rgba(34,197,94,0.45), 0 0 16px rgba(34,197,94,0.5)' : `0 0 12px ${c}55` }}>
                        <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.jersey}</span>
                        <span style={{ fontSize: '8px', fontWeight: 700, color: '#cbd5e1', lineHeight: 1, marginTop: '1px', maxWidth: '42px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                      </div>
                      <div style={{ fontSize: '8px', fontWeight: 800, color: '#94a3b8', background: '#0b1322', border: '1px solid #1e293b', borderRadius: '6px', padding: '1px 5px', marginTop: '2px' }}>P{pos}</div>
                    </div>
                  )
                })}
              </div>
              <div style={{ textAlign: 'center', fontSize: '10px', color: '#475569', marginTop: '9px', fontWeight: 600 }}>
                {fmtEff === 'serve' ? 'Serving formation' : fmtEff === 'receive' ? 'Serve-receive' : 'Base positions'} · Rotation {matchData.current_rotation} · {system}
                {fmtManual
                  ? <button onClick={() => setFmtManual(false)} style={{ color: '#22c55e', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '10px', fontWeight: 700 }}> · ↺ live</button>
                  : <span style={{ color: servingUs ? '#22c55e' : '#f59e0b' }}> · live</span>}
              </div>
            </div>
          )
        })()}

        {/* Last updated */}
        {timeLabel && (
          <p style={{ fontSize: '11px', color: '#334155', textAlign: 'center', marginTop: '8px' }}>
            {timeLabel}
          </p>
        )}

        {/* ── Team stats — visual ── */}
        {matchData.stats_snapshot && (() => {
          const t = matchData.stats_snapshot.team
          const totalErrors = t.serviceErrors + t.hittingErrors + t.passErrors
          const ptsWon = Math.max(t.pointsWon, 1)
          const segs = [
            { label: 'Kills', value: t.kills, color: '#22c55e' },
            { label: 'Aces', value: t.aces, color: '#EAB308' },
            { label: 'Blocks', value: t.blocks, color: '#3B82F6' },
            { label: 'Opp Err', value: t.oppErrors, color: '#64748b' },
          ].filter((s) => s.value > 0)
          return (
            <div className="mx-4 mt-3 rounded-xl" style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '16px' }}>
              <div style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                Team Stats
              </div>

              {/* How we scored — stacked bar */}
              {t.pointsWon > 0 && (
                <>
                  <div style={{ fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '7px' }}>
                    How we scored · {t.pointsWon} pts
                  </div>
                  <div style={{ display: 'flex', height: '14px', borderRadius: '7px', overflow: 'hidden', backgroundColor: '#1e293b', marginBottom: '8px' }}>
                    {segs.map((s) => (
                      <div key={s.label} style={{ width: `${(s.value / ptsWon) * 100}%`, backgroundColor: s.color }} />
                    ))}
                  </div>
                  <div className="flex flex-wrap" style={{ gap: '12px', marginBottom: '18px' }}>
                    {segs.map((s) => (
                      <div key={s.label} className="flex items-center" style={{ gap: '5px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: s.color, display: 'inline-block' }} />
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                          {s.label} <span style={{ color: '#f8fafc', fontWeight: 700 }}>{s.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '18px' }}>
                {[
                  { label: 'Kills', value: t.kills },
                  { label: 'Aces', value: t.aces },
                  { label: 'Blocks', value: t.blocks },
                  { label: 'Digs', value: t.digs },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div className={BARLOW} style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '8px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Gauges */}
              <GaugeBar label="Hitting %" valueLabel={pctLabel(t.hittingPct)} pct={t.hittingPct ?? 0} color="#22c55e" />
              <div style={{ height: '12px' }} />
              <GaugeBar label="Passing Avg (0–3)" valueLabel={ratingLabel(t.passRating)} pct={(t.passRating ?? 0) / 3} color="#8B5CF6" />

              {/* Errors */}
              <div className="flex items-center justify-between" style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #1e293b' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Errors</span>
                <span className={BARLOW} style={{ fontSize: '20px', fontWeight: 900, color: '#ef4444' }}>{totalErrors}</span>
              </div>
            </div>
          )
        })()}

        {/* ── Players — tap to expand ── */}
        {matchData.stats_snapshot && matchData.stats_snapshot.players.length > 0 && (
          <div className="mx-4 mt-3 mb-2">
            <div style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', paddingLeft: '4px' }}>
              Players · tap for detail
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[...matchData.stats_snapshot.players]
                .sort((a, b) => b.points - a.points || a.jersey - b.jersey)
                .map((p) => {
                  const open = expandedPlayer === p.id
                  const c = posColor(p.position)
                  return (
                    <div
                      key={p.id}
                      onClick={() => setExpandedPlayer(open ? null : p.id)}
                      style={{
                        backgroundColor: '#0f172a',
                        border: `1px solid ${open ? c : '#1e293b'}`,
                        borderRadius: '12px',
                        padding: '12px 14px',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center" style={{ gap: '10px' }}>
                          <div
                            className={BARLOW}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '999px',
                              border: `2px solid ${c}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '15px',
                              fontWeight: 900,
                              color: '#f8fafc',
                              flexShrink: 0,
                              boxShadow: `0 0 10px ${c}33`,
                            }}
                          >
                            {p.jersey}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>{p.name}</div>
                            <div style={{ fontSize: '10px', color: c, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              {p.position}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center" style={{ gap: '12px' }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); followPlayer(myJersey === p.jersey ? null : p.jersey) }}
                            style={{ fontSize: '17px', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 1, color: myJersey === p.jersey ? '#eab308' : '#475569' }}
                            aria-label={myJersey === p.jersey ? 'Unfollow' : 'Follow'}
                          >
                            {myJersey === p.jersey ? '★' : '☆'}
                          </button>
                          <div style={{ textAlign: 'right' }}>
                            <div className={BARLOW} style={{ fontSize: '18px', fontWeight: 900, color: c, lineHeight: 1 }}>
                              {p.points}
                            </div>
                            <div style={{ fontSize: '8px', color: '#475569', textTransform: 'uppercase' }}>Pts</div>
                          </div>
                          <span
                            style={{
                              fontSize: '16px',
                              color: '#475569',
                              display: 'inline-block',
                              transform: open ? 'rotate(90deg)' : 'none',
                              transition: 'transform 0.15s',
                            }}
                          >
                            ›
                          </span>
                        </div>
                      </div>

                      {open && (
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '12px',
                            marginTop: '12px',
                            paddingTop: '12px',
                            borderTop: '1px solid #1e293b',
                          }}
                        >
                          {[
                            { label: 'Kills', value: p.kills },
                            { label: 'Hit %', value: pctLabel(p.hittingPct) },
                            { label: 'Attempts', value: p.attackAttempts },
                            { label: 'Aces', value: p.aces },
                            { label: 'Blocks', value: p.blocks },
                            { label: 'Digs', value: p.digs },
                            { label: 'Passes', value: p.passes },
                            { label: 'Pass Avg', value: ratingLabel(p.passRating) },
                            { label: 'Atk Err', value: p.hittingErrors },
                            { label: 'Srv Err', value: p.serviceErrors },
                            { label: 'Pass Err', value: p.passErrors },
                            { label: 'Points', value: p.points },
                          ].map((s) => (
                            <div key={s.label} style={{ textAlign: 'center' }}>
                              <div className={BARLOW} style={{ fontSize: '18px', fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}>
                                {s.value}
                              </div>
                              <div style={{ fontSize: '7px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '3px' }}>
                                {s.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* ── Recent plays ── */}
        {matchData.stats_snapshot?.recentPlays && matchData.stats_snapshot.recentPlays.length > 0 && (
          <div className="mx-4 mt-3 mb-2">
            <div style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', paddingLeft: '4px' }}>
              Recent Plays
            </div>
            <div className="rounded-xl" style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', overflow: 'hidden' }}>
              {matchData.stats_snapshot.recentPlays.map((pl, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between"
                  style={{ padding: '10px 14px', borderTop: i === 0 ? 'none' : '1px solid #161f30' }}
                >
                  <div className="flex items-center" style={{ gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: pl.us ? '#22c55e' : '#ef4444', display: 'inline-block', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: pl.us ? '#e2e8f0' : '#94a3b8' }}>{pl.label}</span>
                      {pl.player && <span style={{ fontSize: '12px', color: '#64748b' }}> · {pl.player}</span>}
                    </div>
                  </div>
                  <span className={BARLOW} style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                    {pl.our}–{pl.their}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-8 pb-6 text-center" style={{ fontSize: '12px', color: '#1e293b' }}>
          <p>Powered by CourtOS</p>
          <p>Get the app at courtos.co</p>
        </div>
      </div>
    )
  }

  // ─── ENTER ROOM CODE (+ ERROR) ────────────────────────────────────────────

  const cleanLength = inputCode.replace(/[^A-Z0-9]/g, '').length
  const isError = pageState === 'error'

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#060b14' }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '32px' }}>
        <CourtOSLogo size="lg" />
      </div>

      {/* Hero */}
      <div className="text-center" style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '64px', lineHeight: 1, marginBottom: '16px' }}>🏐</div>
        <h1
          className={`${BARLOW} text-white`}
          style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1, marginBottom: '12px' }}
        >
          Watch Live
        </h1>
        <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '260px', lineHeight: '1.5', margin: '0 auto' }}>
          Enter the room code from your coach to follow the match
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center"
        style={{ gap: '16px', width: '100%', maxWidth: '280px' }}
      >
        <input
          type="text"
          value={inputCode}
          onChange={handleInputChange}
          placeholder="ABC-123"
          maxLength={7}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="characters"
          spellCheck={false}
          className={`${BARLOW} outline-none transition-colors`}
          style={{
            backgroundColor: '#0f172a',
            border: `2px solid ${isError ? '#ef4444' : '#1e293b'}`,
            borderRadius: '12px',
            padding: '20px 24px',
            fontSize: '32px',
            fontWeight: 900,
            color: '#f8fafc',
            textAlign: 'center',
            letterSpacing: '8px',
            width: '240px',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#22c55e' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = isError ? '#ef4444' : '#1e293b' }}
        />

        {isError && (
          <p style={{ fontSize: '14px', color: '#ef4444', textAlign: 'center' }}>
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={cleanLength < 6}
          className={`${BARLOW} transition-opacity`}
          style={{
            backgroundColor: '#22c55e',
            color: '#000',
            fontWeight: 900,
            fontSize: '18px',
            borderRadius: '10px',
            padding: '16px 40px',
            width: '240px',
            border: 'none',
            cursor: cleanLength >= 6 ? 'pointer' : 'default',
            opacity: cleanLength >= 6 ? 1 : 0.5,
          }}
        >
          Watch Live
        </button>
      </form>

      {/* Footer */}
      <p style={{ fontSize: '12px', color: '#1e293b', marginTop: '64px', textAlign: 'center' }}>
        Powered by CourtOS · courtos.co
      </p>
    </div>
  )
}
