import { useEffect, useMemo, useState } from 'react'
import { TimerReset, CheckCircle2, XCircle, Trophy } from 'lucide-react'

export default function ExamPlayer({ exam, onClose }) {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const load = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/exams/${exam.id}/questions`)
      const data = await res.json()
      setQuestions(data)
    }
    load()
  }, [exam])

  const remaining = useMemo(() => {
    return Math.max(0, exam.duration_minutes || 60)
  }, [exam])

  const choose = (idxQ, idxOpt) => {
    setAnswers(a => ({ ...a, [idxQ]: idxOpt }))
  }

  const submit = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const orderedAnswers = questions.map((_, i) => answers[i] ?? -1)
    const res = await fetch(`${baseUrl}/api/attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exam_id: exam.id, answers: orderedAnswers })
    })
    const data = await res.json()
    setResult(data)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h3 className="text-white font-semibold">{exam.title}</h3>
            <p className="text-white/70 text-sm">{exam.subject} • {exam.year}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-white/80"><TimerReset size={16} /> {remaining} min</span>
            <button onClick={onClose} className="px-3 py-1.5 rounded-md text-white/80 hover:bg-white/10">Close</button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {questions.length === 0 ? (
            <p className="text-white/70">No questions found for this exam.</p>
          ) : (
            questions.map((q, i) => (
              <div key={q.id} className="rounded-xl border border-white/10 p-5 bg-white/5">
                <div className="flex items-start gap-2">
                  <span className="text-white/60 text-sm pt-1">Q{i+1}.</span>
                  <p className="text-white">{q.prompt}</p>
                </div>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {q.options.map((opt, j) => {
                    const active = answers[i] === j
                    return (
                      <button key={j} onClick={() => choose(i, j)} className={`text-left px-3 py-2 rounded-md border ${active ? 'border-fuchsia-400 bg-fuchsia-500/10 text-white' : 'border-white/10 text-white/80 hover:bg-white/10'}`}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          {!submitted ? (
            <button onClick={submit} className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-indigo-600 text-white font-medium hover:opacity-90">Submit answers</button>
          ) : (
            <div className="flex items-center gap-3 text-white">
              <Trophy className="text-amber-400" />
              <span>Score: <strong>{result?.score}</strong> / {result?.max_score}</span>
            </div>
          )}
          <div className="text-white/70 text-sm">
            {submitted ? (
              result?.score >= (result?.max_score || 1) / 2 ? (
                <span className="inline-flex items-center gap-1 text-emerald-400"><CheckCircle2 size={16}/> Great job!</span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-400"><XCircle size={16}/> Keep practicing!</span>
              )
            ) : (
              <span className="text-white/60">Make sure you select an option for each question.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
