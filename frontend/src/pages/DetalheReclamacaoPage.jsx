import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import StatusBadge from '../components/StatusBadge'
import { api } from '../services/api'

export default function DetalheReclamacaoPage() {
  const { id } = useParams()
  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadComplaint() {
      setLoading(true)
      setError(null)
      try {
        const data = await api.getComplaint(id)
        setComplaint(data)
      } catch (err) {
        setError(err.message || 'Não foi possível carregar esta reclamação.')
      } finally {
        setLoading(false)
      }
    }

    loadComplaint()
  }, [id])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <Link
          to="/minhas-reclamacoes"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/55 hover:text-teal-700"
        >
          <ArrowLeft size={16} />
          Voltar para minhas reclamações
        </Link>

        {loading && (
          <div className="mt-8 rounded-xl border border-teal-100 bg-white p-10 text-center">
            <p className="text-sm text-ink/55">Carregando reclamação…</p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-xl border border-coral-200 bg-coral-50 p-10 text-center">
            <p className="font-semibold text-ink">Não deu pra carregar agora</p>
            <p className="mt-1 text-sm text-ink/55">{error}</p>
          </div>
        )}

        {!loading && !error && complaint && (
          <>
            <div className="mt-6 rounded-xl border border-teal-100 bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-ink/40">{complaint.protocolo}</p>
                  <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
                    {complaint.titulo}
                  </h1>
                  <p className="mt-1.5 text-sm text-ink/55">
                    {complaint.setor_relacionado || 'Setor não informado'} · {complaint.categoria}
                  </p>
                </div>
                <StatusBadge status={complaint.status} />
              </div>

              <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-ink/75">
                {complaint.descricao}
              </p>

              <p className="mt-5 text-xs text-ink/40">
                Aberta em{' '}
                {new Date(complaint.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            {/* Timeline de respostas */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-ink">Histórico</h2>

              {(!complaint.ComplaintResponses || complaint.ComplaintResponses.length === 0) && (
                <div className="mt-3 rounded-xl border border-teal-100 bg-white p-6 text-center">
                  <p className="text-sm text-ink/55">
                    Ainda não há respostas para esta reclamação.
                  </p>
                </div>
              )}

              <div className="mt-3 space-y-3">
                {complaint.ComplaintResponses?.map((response) => (
                  <div
                    key={response.id}
                    className="rounded-xl border border-teal-100 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">
                        {response.Employee?.nome || 'RH'}
                      </p>
                      <p className="text-xs text-ink/40">
                        {new Date(response.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <p className="mt-1.5 text-sm text-ink/75">{response.mensagem}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  )
}