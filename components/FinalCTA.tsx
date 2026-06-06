export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-court-bg">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Blue gradient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(37,99,235,0.14)_0%,transparent_70%)]" />
      {/* Court grid */}
      <div className="absolute inset-0 bg-court-grid opacity-50" />

      {/* Decorative court lines */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none select-none opacity-10">
        <div
          className="w-[520px] h-[320px] border-2 border-blue-400 rounded-sm"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none select-none opacity-10">
        <div className="w-px h-[320px] bg-blue-400" aria-hidden="true" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5 text-balance">
          Ready to coach with less chaos?
        </h2>
        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
          Join the beta and help shape the app before it launches.
        </p>
        <a
          href="#beta"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-[0_0_48px_rgba(59,130,246,0.5)]"
        >
          Join the Beta
        </a>
        <p className="text-slate-600 text-sm mt-5">
          Free to join. No credit card required.
        </p>
      </div>
    </section>
  )
}
