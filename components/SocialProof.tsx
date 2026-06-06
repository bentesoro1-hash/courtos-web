const credibilityPoints = [
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Built for fast match decisions',
    description:
      'Every interaction is designed to take less than a second. CourtOS gets out of the way so you can coach.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: 'Designed for youth and club volleyball',
    description:
      'Built around real youth and club programs — not adapted from professional or college systems.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Tested around real coaching workflows',
    description:
      "Shaped by actual sideline feedback from coaches running practices, scrimmages, and tournaments.",
  },
]

export default function SocialProof() {
  return (
    <section className="py-20 sm:py-28 bg-court-bg relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 text-balance">
            Designed with real volleyball coaches
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            CourtOS is being built from real sideline feedback, not generic
            stat-tracking templates.
          </p>
        </div>

        {/* Quote callout */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="relative bg-court-surface border border-court-border rounded-2xl p-6 sm:p-8 text-center">
            {/* Opening quote mark */}
            <div className="text-5xl text-blue-500/30 font-serif leading-none mb-2 select-none">&ldquo;</div>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed font-medium">
              I just need something that tracks rotations and subs without
              getting in my way during a match.
            </p>
            <div className="mt-4 text-sm text-slate-500">
              — Feedback from a club volleyball coach
            </div>
          </div>
        </div>

        {/* Credibility points */}
        <div className="grid sm:grid-cols-3 gap-5">
          {credibilityPoints.map((point, i) => (
            <div
              key={i}
              className="flex gap-4 bg-court-surface border border-court-border rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                {point.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1.5">{point.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
