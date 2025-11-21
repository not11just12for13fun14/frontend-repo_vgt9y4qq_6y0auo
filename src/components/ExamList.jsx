import { useEffect, useState } from 'react'
import { Clock, FileText, Play } from 'lucide-react'

export default function ExamList({ onStart }) {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/exams`)
        const data = await res.json()
        setExams(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchExams()
  }, [])

  if (loading) {
    return (
      <section id="exams" className="py-16 bg-gradient-to-b from-transparent to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-24 animate-pulse rounded-xl bg-white/5" />
        </div>
      </section>
    )
  }

  return (
    <section id="exams" className="py-16 bg-gradient-to-b from-transparent to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Available Past Papers</h2>
        {exams.length === 0 ? (
          <p className="text-white/70">No exams yet. Click "Quick add sample exam" to seed one.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div key={exam.id} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-5 hover:bg-white/10 transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{exam.title}</h3>
                    <p className="text-sm text-white/70">{exam.subject} • {exam.year}</p>
                  </div>
                </div>
                <p className="mt-3 text-white/80 text-sm line-clamp-2">{exam.description || 'No description provided.'}</p>
                <div className="mt-4 flex items-center justify-between text-white/80 text-sm">
                  <span className="inline-flex items-center gap-1"><Clock size={16} /> {exam.duration_minutes || 60} min</span>
                  <span className="inline-flex items-center gap-1"><FileText size={16} /> {exam.total_questions || 0} Qs</span>
                </div>
                <button onClick={() => onStart(exam)} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white font-medium hover:from-fuchsia-400 hover:to-indigo-500 transition">
                  <Play size={16} /> Start Practice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
