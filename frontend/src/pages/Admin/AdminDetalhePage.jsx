import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function AdminDetalheReclamacaoPage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-paper">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <Link
          to="/admin/reclamacoes"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/50 hover:text-teal-700"
        >
          <ArrowLeft size={16} />
          Voltar para reclamações
        </Link>

        <p className="mt-8 text-sm font-semibold text-teal-600">
          Reclamação #{id}
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-ink">
          Detalhes da reclamação
        </h1>

        <div className="mt-7 rounded-2xl border border-teal-100 bg-white p-6">
          <p className="text-sm text-ink/50">
            Aqui o RH poderá visualizar a reclamação, responder e alterar
            seu status.
          </p>
        </div>
      </section>
    </div>
  )
}