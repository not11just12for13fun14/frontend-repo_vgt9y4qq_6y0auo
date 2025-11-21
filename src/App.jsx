import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExamList from './components/ExamList'
import ExamPlayer from './components/ExamPlayer'

function App() {
  const [playingExam, setPlayingExam] = useState(null)
  const [seeding, setSeeding] = useState(false)

  const seedSample = async () => {
    try {
      setSeeding(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      // create exam
      const examRes = await fetch(`${baseUrl}/api/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Mathematics Paper 1',
          subject: 'Mathematics',
          year: 2022,
          description: 'Algebra, functions, trigonometry and probability',
          duration_minutes: 30
        })
      })
      const exam = await examRes.json()
      const examId = exam.id

      const questions = [
        {
          prompt: 'What is the solution to 2x + 3 = 11?',
          options: ['x = 3', 'x = 4', 'x = 5', 'x = 2'],
          answer_index: 1, marks: 1
        },
        {
          prompt: 'The derivative of x^2 is:',
          options: ['x', '2x', 'x^3', '2'],
          answer_index: 1, marks: 1
        },
        {
          prompt: 'sin(30°) equals:',
          options: ['1/2', '√3/2', '0', '1'],
          answer_index: 0, marks: 1
        }
      ]

      for (const q of questions) {
        await fetch(`${baseUrl}/api/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...q, exam_id: examId })
        })
      }
      // refresh page list by simple reload
      window.location.reload()
    } catch (e) {
      console.error(e)
      alert('Failed to seed sample exam')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar onSeed={seedSample} seeding={seeding} />
      <Hero />
      <ExamList onStart={setPlayingExam} />
      {playingExam && <ExamPlayer exam={playingExam} onClose={() => setPlayingExam(null)} />}

      <section id="how" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          {[{
            title: 'Pick a paper',
            text: 'Browse subject collections and pick from recent years.'
          }, {
            title: 'Practice with purpose',
            text: 'Timed mode, clean interface, focused on what matters.'
          }, {
            title: 'Track progress',
            text: 'Submit and instantly see your score, keep improving.'
          }].map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-white/80">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 border-t border-white/10 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/60">
          Built for learners — bold, vibrant, and focused.
        </div>
      </footer>
    </div>
  )
}

export default App
