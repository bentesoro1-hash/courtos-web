export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-court-bg">
      {/* Court grid background */}
      <div className="absolute inset-0 bg-court-grid opacity-100" />
      {/* Radial hero glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.18)_0%,transparent_60%)]" />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-28">
          {/* Left: Copy */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Beta badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/25 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
                Now accepting beta testers
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.08] tracking-tight mb-5 text-balance">
              The Coaching OS
              <br />
              <span className="text-blue-400">for Volleyball</span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-9 max-w-lg mx-auto lg:mx-0">
              Track rotations, substitutions, stats, and match flow in one
              simple sideline app built for real coaches.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#beta"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-[0_0_32px_rgba(59,130,246,0.45)] text-center"
              >
                Join the Beta
              </a>
              <a
                href="#features"
                className="border border-court-border hover:border-blue-500/40 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:bg-court-surface text-center"
              >
                See Features
              </a>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2.5">
                {['C', 'K', 'M', 'J'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-court-bg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0"
                  >
                    <span className="text-[11px] font-bold text-white">{initial}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-sm">
                <span className="text-slate-300 font-semibold">Coaches</span> testing
                CourtOS this season
              </p>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center order-1 lg:order-2">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function PositionCell({
  pos,
  label,
  variant,
}: {
  pos: string
  label: string
  variant?: 'libero' | 'serving'
}) {
  const bg =
    variant === 'serving'
      ? 'bg-blue-950/80 border-blue-700/60'
      : variant === 'libero'
        ? 'bg-amber-950/60 border-amber-700/40'
        : 'bg-[#050918] border-[#1A2845]'
  const posColor =
    variant === 'serving'
      ? 'text-blue-500'
      : variant === 'libero'
        ? 'text-amber-500'
        : 'text-slate-600'
  const labelColor =
    variant === 'serving'
      ? 'text-blue-300'
      : variant === 'libero'
        ? 'text-amber-300'
        : 'text-slate-200'

  return (
    <div className={`rounded-xl p-1.5 flex flex-col items-center border ${bg}`}>
      <span className={`text-[8px] font-medium leading-tight ${posColor}`}>{pos}</span>
      <span className={`text-[11px] font-bold leading-tight ${labelColor}`}>{label}</span>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-6 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      {/* Phone shell */}
      <div
        className="relative w-[268px] bg-[#080C1A] rounded-[48px] overflow-hidden"
        style={{
          border: '2px solid #1E2D50',
          boxShadow:
            '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset',
        }}
      >
        {/* Dynamic island */}
        <div className="flex justify-center pt-4 pb-2">
          <div
            className="w-24 h-6 rounded-full bg-black"
            style={{ border: '1px solid #1E2D50' }}
          />
        </div>

        {/* App screen */}
        <div className="px-4 pb-6 space-y-3">
          {/* App header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
                <span className="text-[9px] font-black text-white">C</span>
              </div>
              <span className="text-white text-[13px] font-bold">CourtOS</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse block" />
              <span className="text-emerald-400 text-[10px] font-semibold">Live</span>
            </div>
          </div>

          {/* Set label */}
          <div className="text-center">
            <span className="text-slate-600 text-[10px] uppercase tracking-[0.15em] font-medium">
              Set 2 · Match 1
            </span>
          </div>

          {/* Scoreboard */}
          <div
            className="rounded-2xl p-3"
            style={{ background: '#0D1530', border: '1px solid #1A2845' }}
          >
            <div className="flex items-stretch justify-between">
              <div className="flex-1 text-center">
                <div className="text-[9px] text-slate-500 uppercase tracking-wider font-medium mb-0.5">
                  HOME
                </div>
                <div className="text-[40px] font-black leading-none text-white tabular-nums">
                  14
                </div>
              </div>
              <div className="flex items-center justify-center px-2">
                <div className="w-px h-9 bg-court-border" />
              </div>
              <div className="flex-1 text-center">
                <div className="text-[9px] text-slate-500 uppercase tracking-wider font-medium mb-0.5">
                  AWAY
                </div>
                <div className="text-[40px] font-black leading-none text-slate-500 tabular-nums">
                  11
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex justify-center">
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse block" />
                <span className="text-blue-400 text-[10px] font-semibold">Serving</span>
              </div>
            </div>
          </div>

          {/* Rotation grid */}
          <div
            className="rounded-2xl p-3"
            style={{ background: '#0D1530', border: '1px solid #1A2845' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-[9px] uppercase tracking-[0.15em] font-medium">
                Rotation 3
              </span>
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`block w-1 h-1 rounded-full ${i < 2 ? 'bg-blue-500' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <PositionCell pos="P4" label="OH" />
              <PositionCell pos="P3" label="MH" />
              <PositionCell pos="P2" label="OPP" />
              <PositionCell pos="P5" label="OH" />
              <PositionCell pos="P6" label="L" variant="libero" />
              <PositionCell pos="P1" label="S" variant="serving" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              className="bg-blue-600 rounded-xl py-3.5 text-center"
              tabIndex={-1}
            >
              <span className="text-white text-[11px] font-black tracking-wide">+POINT</span>
            </button>
            <button
              className="rounded-xl py-3.5 text-center"
              style={{ background: '#0D1530', border: '1px solid #1A2845' }}
              tabIndex={-1}
            >
              <span className="text-slate-300 text-[11px] font-semibold">SIDEOUT</span>
            </button>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-3 pt-1">
          <div className="w-24 h-1 bg-slate-700/60 rounded-full" />
        </div>
      </div>
    </div>
  )
}
