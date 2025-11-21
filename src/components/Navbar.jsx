import { BookOpen, FilePlus2, Library } from 'lucide-react'

export default function Navbar({ onSeed }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 grid place-items-center shadow-lg shadow-indigo-500/30">
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold leading-none">Past Papers</p>
            <p className="text-[11px] text-white/70 leading-none">Revise. Practice. Excel.</p>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a href="/" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md text-white/90 hover:text-white hover:bg-white/10 transition-colors">
            <Library size={16} /> Browse
          </a>
          <button onClick={onSeed} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white hover:from-fuchsia-400 hover:to-indigo-500 transition-colors shadow-lg shadow-fuchsia-500/20">
            <FilePlus2 size={16} /> Quick add sample exam
          </button>
        </div>
      </div>
    </header>
  )
}
