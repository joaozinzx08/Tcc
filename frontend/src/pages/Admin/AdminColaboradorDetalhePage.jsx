import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function AdminColaboradorDetalhePage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-paper">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <Link
          to="/admin/colaboradores"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink/50 hover:text-teal-700"
        >
          <ArrowLeft size={16} />
          Voltar para colaboradores
        </Link>

        <p className="mt-8 text-sm font-semibold text-teal-600">
          Colaborador #{id}
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-ink">
          Perfil do colaborador
        </h1>

        <div className="mt-7 rounded-2xl border border-teal-100 bg-white p-6">
          <p className="text-sm text-ink/50">
            Aqui o RH poderá visualizar e editar os dados do colaborador.
          </p>
        </div>
      </section>
    </div>
  )
}