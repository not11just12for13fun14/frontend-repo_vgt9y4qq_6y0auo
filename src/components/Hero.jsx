import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 ring-1 ring-white/20 mb-4">
            Interactive. Futuristic. Built for students.
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Ace your exams with vibrant practice papers
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Explore past papers, take timed quizzes, and track your progress. Designed with bold gradients and youthful energy to keep you motivated.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#exams" className="px-5 py-3 rounded-md bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:opacity-90 transition">
              Browse Past Papers
            </a>
            <a href="#how" className="px-5 py-3 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition font-medium">
              How it works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
