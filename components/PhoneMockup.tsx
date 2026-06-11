'use client'
import { useState } from 'react'
import Image from 'next/image'

// [P4, P3, P2, P5, P6, P1] — grid renders top-left to bottom-right
const ROTATIONS: { label: string; type: 's' | 'l' | 'o' }[][] = [
  [{ label: 'MB', type: 'o' }, { label: 'OH', type: 'o' }, { label: 'OPP', type: 'o' }, { label: 'L', type: 'l' }, { label: 'OH', type: 'o' }, { label: 'S', type: 's' }],
  [{ label: 'OH', type: 'o' }, { label: 'OPP', type: 'o' }, { label: 'S', type: 's' }, { label: 'MB', type: 'o' }, { label: 'L', type: 'l' }, { label: 'OH', type: 'o' }],
  [{ label: 'OPP', type: 'o' }, { label: 'S', type: 's' }, { label: 'OH', type: 'o' }, { label: 'OH', type: 'o' }, { label: 'MB', type: 'o' }, { label: 'L', type: 'l' }],
  [{ label: 'S', type: 's' }, { label: 'OH', type: 'o' }, { label: 'MB', type: 'o' }, { label: 'L', type: 'l' }, { label: 'OH', type: 'o' }, { label: 'OPP', type: 'o' }],
  [{ label: 'OH', type: 'o' }, { label: 'MB', type: 'o' }, { label: 'L', type: 'l' }, { label: 'S', type: 's' }, { label: 'OPP', type: 'o' }, { label: 'OH', type: 'o' }],
  [{ label: 'MB', type: 'o' }, { label: 'L', type: 'l' }, { label: 'OH', type: 'o' }, { label: 'OPP', type: 'o' }, { label: 'S', type: 's' }, { label: 'MB', type: 'o' }],
]

const STAT_CHIPS = ['ACE', 'KILL', 'BLK', 'DIG', 'ERR']

const PLAYERS = [
  { name: 'Johnson', K: 4, A: 1, E: 0 },
  { name: 'Williams', K: 2, A: 8, E: 1 },
  { name: 'Davis', K: 5, A: 0, E: 2 },
  { name: 'Martinez', K: 3, A: 2, E: 0 },
]

export default function PhoneMockup() {
  const [homeScore, setHomeScore] = useState(14)
  const [awayScore, setAwayScore] = useState(11)
  const [rotation, setRotation] = useState(0)
  const [serving, setServing] = useState(true)
  const [activeChip, setActiveChip] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'match' | 'lineup' | 'stats' | 'history'>('match')

  const handlePointWon = () => {
    setHomeScore(h => h + 1)
    setRotation(r => (r + 1) % 6)
    setServing(true)
  }

  const handlePointLost = () => {
    setAwayScore(a => a + 1)
    setServing(false)
  }

  const tokens = ROTATIONS[rotation]

  const tokenBg = (type: 's' | 'l' | 'o') => {
    if (type === 's') return { background: '#1a3d2a', border: '1px solid #3DBE6B', color: '#3DBE6B' }
    if (type === 'l') return { background: '#3d2a0f', border: '1px solid #f97316', color: '#f97316' }
    return { background: '#1c1c1c', border: '1px solid #2a2a2a', color: '#666' }
  }

  const TABS = [
    { key: 'match', icon: '⚡', label: 'Match' },
    { key: 'lineup', icon: '👥', label: 'Lineup' },
    { key: 'stats', icon: '📊', label: 'Stats' },
    { key: 'history', icon: '📋', label: 'History' },
  ] as const

  return (
    <div
      className="animate-float animate-pulse-glow"
      style={{
        width: 272,
        height: 580,
        background: '#111111',
        borderRadius: 44,
        border: '2px solid #252525',
        boxShadow: '0 0 40px rgba(61,190,107,0.12), 0 32px 80px rgba(0,0,0,0.8)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Dynamic island */}
      <div style={{
        display: 'flex', justifyContent: 'center', paddingTop: 14, paddingBottom: 4, flexShrink: 0,
      }}>
        <div style={{ width: 96, height: 26, background: '#000', borderRadius: 20 }} />
      </div>

      {/* App header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 16px 8px',
        borderBottom: '1px solid #1e1e1e',
        flexShrink: 0,
      }}>
        <Image src="/logo-icon.png" alt="CourtOS" width={22} height={22} style={{ height: 22, width: 'auto' }} />
        <span style={{ color: '#888', fontSize: 11, fontWeight: 500 }}>Live Match · Set 2</span>
        <span style={{ color: '#3DBE6B', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 6, height: 6, background: '#3DBE6B', borderRadius: '50%', display: 'inline-block' }} />
          LIVE
        </span>
      </div>

      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 0' }}>
        {activeTab === 'match' ? (
          <div>
            {/* Scoreboard */}
            <div style={{
              background: '#141414', borderRadius: 12, padding: '12px 16px',
              marginBottom: 10, border: '1px solid #1e1e1e',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.1em', marginBottom: 2 }}>HOME</div>
                <div style={{ color: '#F0F0F0', fontSize: 38, fontWeight: 800, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{homeScore}</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0 12px' }}>
                <div style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>R{rotation + 1}</div>
                <div style={{
                  fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                  background: serving ? 'rgba(61,190,107,0.12)' : 'rgba(255,255,255,0.05)',
                  color: serving ? '#3DBE6B' : '#555',
                  border: `1px solid ${serving ? 'rgba(61,190,107,0.3)' : '#1e1e1e'}`,
                }}>
                  {serving ? '▲ SRV' : '▽ RCV'}
                </div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.1em', marginBottom: 2 }}>AWAY</div>
                <div style={{ color: '#444', fontSize: 38, fontWeight: 800, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{awayScore}</div>
              </div>
            </div>

            {/* Court */}
            <div style={{
              background: '#141414', borderRadius: 12, padding: '10px 10px 8px',
              marginBottom: 10, border: '1px solid #1e1e1e',
            }}>
              {/* Net line */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
              }}>
                <div style={{ flex: 1, height: 1, background: '#2a2a2a' }} />
                <span style={{ color: '#444', fontSize: 8, fontWeight: 600, letterSpacing: '0.1em' }}>NET</span>
                <div style={{ flex: 1, height: 1, background: '#2a2a2a' }} />
              </div>

              {/* 3x2 grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
                {tokens.map((token, i) => (
                  <div key={i} style={{
                    height: 42, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.02em',
                    ...tokenBg(token.type),
                  }}>
                    {token.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Stat chips */}
            <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
              {STAT_CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => setActiveChip(prev => prev === chip ? null : chip)}
                  style={{
                    flex: 1, padding: '5px 0', borderRadius: 6, fontSize: 9, fontWeight: 700,
                    background: activeChip === chip ? '#3DBE6B' : '#1a1a1a',
                    color: activeChip === chip ? '#000' : '#555',
                    border: `1px solid ${activeChip === chip ? '#3DBE6B' : '#242424'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Point buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                onClick={handlePointWon}
                style={{
                  padding: '12px 0', borderRadius: 8, fontSize: 11, fontWeight: 800,
                  background: '#3DBE6B', color: '#000', border: 'none', cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                ✓ POINT WON
              </button>
              <button
                onClick={handlePointLost}
                style={{
                  padding: '12px 0', borderRadius: 8, fontSize: 11, fontWeight: 700,
                  background: '#1a1a1a', color: '#666', border: '1px solid #242424', cursor: 'pointer',
                }}
              >
                ✕ POINT LOST
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Stats tab */}
            <div style={{ background: '#141414', borderRadius: 12, overflow: 'hidden', border: '1px solid #1e1e1e' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '8px 12px', borderBottom: '1px solid #1e1e1e',
                background: '#111',
              }}>
                {['PLAYER', 'K', 'A', 'E'].map(h => (
                  <span key={h} style={{ color: '#444', fontSize: 9, fontWeight: 700, textAlign: h !== 'PLAYER' ? 'center' : 'left', letterSpacing: '0.05em' }}>{h}</span>
                ))}
              </div>
              {PLAYERS.map((p, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  padding: '11px 12px',
                  borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none',
                  alignItems: 'center',
                }}>
                  <span style={{ color: '#F0F0F0', fontSize: 11, fontWeight: 600 }}>{p.name}</span>
                  <span style={{ color: '#3DBE6B', fontSize: 12, textAlign: 'center', fontWeight: 700 }}>{p.K}</span>
                  <span style={{ color: '#aaa', fontSize: 12, textAlign: 'center' }}>{p.A}</span>
                  <span style={{ color: p.E > 0 ? '#ef4444' : '#555', fontSize: 12, textAlign: 'center' }}>{p.E}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <div style={{
        display: 'flex',
        background: '#0d0d0d',
        borderTop: '1px solid #1a1a1a',
        padding: '8px 0 12px',
        flexShrink: 0,
      }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === tab.key ? '#3DBE6B' : '#444',
              fontSize: 8, fontWeight: 700, letterSpacing: '0.03em',
              transition: 'color 0.15s',
            }}
          >
            <span style={{ fontSize: 15 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Home indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8, paddingTop: 2, flexShrink: 0 }}>
        <div style={{ width: 80, height: 3, background: '#2a2a2a', borderRadius: 2 }} />
      </div>
    </div>
  )
}
