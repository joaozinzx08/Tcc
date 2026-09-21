import {
  MessageSquareText,
  Star,
} from 'lucide-react'

export default function AdminFeedbacksPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm font-semibold text-teal-600">
          Administração
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-ink">
          Feedbacks
        </h1>

        <p className="mt-2 text-sm text-ink/55">
          Analise avaliações e sugestões enviadas pelos colaboradores.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-teal-100 bg-white p-5">
            <Star
              size={20}
              className="text-amber-400"
            />

            <p className="mt-3 text-2xl font-bold text-ink">
              —
            </p>

            <p className="text-sm text-ink/45">
              Avaliação média
            </p>
          </div>

          <div className="rounded-xl border border-teal-100 bg-white p-5">
            <MessageSquareText
              size={20}
              className="text-teal-600"
            />

            <p className="mt-3 text-2xl font-bold text-ink">
              —
            </p>

            <p className="text-sm text-ink/45">
              Feedbacks recebidos
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}