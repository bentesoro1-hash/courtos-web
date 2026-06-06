const problems = [
  {
    icon: (
      <svg
        className="w-5 h-5 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    title: 'Paper scorebooks are slow',
    description:
      'Writing rotations, subs, and point sequences mid-match means your eyes are off the court — and the details still end up incomplete.',
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
    title: 'Rotation tracking gets messy',
    description:
      "Keeping track of who's where, which rotation you're in, and when the libero switches adds mental load you can't afford during a close set.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>
    ),
    title: 'Existing apps are too complex',
    description:
      "Most volleyball stat tools are built for programs with dedicated staff — not a single coach managing everything from a folding chair on the sideline.",
  },
]

export default function ProblemSection() {
  return (
    <section className="py-20 sm:py-28 bg-court-bg relative">
      {/* Divider line glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 text-balance">
            Built for the chaos of live coaching
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Coaching a live match means managing a lot at once. Your tools should reduce
            the load, not add to it.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="bg-court-surface border border-court-border rounded-2xl p-6 hover:border-blue-500/30 hover:bg-[#0F1A38] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="text-white font-bold text-[1.05rem] mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
