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

  const channelRef = useRef<any>(null)

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

          {/* Serving bar */}
          <div
            className="flex items-center"
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              padding: '6px 14px',
              minHeight: '32px',
            }}
          >
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

        {/* ── Live court — role-colored rotation ── */}
        {matchData.stats_snapshot?.court && matchData.stats_snapshot.court.length > 0 && (() => {
          const byPos: Record<number, LiveCourtSlot> = {}
          for (const s of matchData.stats_snapshot.court) byPos[s.pos] = s
          const tok = (pos: number) => {
            const s = byPos[pos]
            if (!s) return <div key={pos} />
            const c = posColor(s.position)
            return (
              <div key={pos} className="flex flex-col items-center" style={{ gap: '5px' }}>
                <div
                  className={BARLOW}
                  style={{
                    width: '52px', height: '52px', borderRadius: '999px',
                    border: `2px solid ${c}`, backgroundColor: '#0b1120',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '21px', fontWeight: 900, color: '#f8fafc',
                    boxShadow: `0 0 14px ${c}40`,
                  }}
                >
                  {s.jersey}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#e2e8f0', lineHeight: 1 }}>{s.name}</div>
                <div style={{ fontSize: '8px', fontWeight: 700, color: c, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {s.position}
                </div>
              </div>
            )
          }
          return (
            <div className="mx-4 mt-3 rounded-xl" style={{ backgroundColor: '#070d1a', border: '1px solid #1e293b', padding: '16px 14px' }}>
              <div style={{ fontSize: '9px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', textAlign: 'center' }}>
                On Court · {matchData.court_mode || '5-1'}
              </div>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)', margin: '0 4px 16px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {tok(4)}{tok(3)}{tok(2)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {tok(5)}{tok(6)}{tok(1)}
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
                        <div className="flex items-center" style={{ gap: '14px' }}>
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
