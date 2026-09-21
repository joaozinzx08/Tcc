import {
  useState,
  useEffect,
  useCallback,
} from 'react'
import {
  useParams,
  Link,
} from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import { api } from '../services/api'

export default function DetalheReclamacaoPage() {
  const { id } = useParams()

  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erroResposta, setErroResposta] = useState(null)

  const loadComplaint = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await api.getComplaint(id)

      setComplaint(data)
    } catch (err) {
      setError(
        err.message ||
          'Não foi possível carregar esta reclamação.'
      )
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadComplaint()
  }, [loadComplaint])

  async function handleAddResponse(e) {
    e.preventDefault()

    const texto = mensagem.trim()

    if (!texto || enviando) return

    setEnviando(true)
    setErroResposta(null)

    try {
      await api.addComplaintResponse(
        id,
        texto
      )

      setMensagem('')

      await loadComplaint()
    } catch (err) {
      setErroResposta(
        err.message ||
          'Não foi possível enviar a resposta.'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
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
            <p className="text-sm text-ink/55">
              Carregando reclamação…
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-xl border border-coral-200 bg-coral-50 p-10 text-center">
            <p className="font-semibold text-ink">
              Não deu pra carregar agora
            </p>

            <p className="mt-1 text-sm text-ink/55">
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          complaint && (
            <>
              <div className="mt-6 rounded-xl border border-teal-100 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-ink/40">
                      {complaint.protocolo}
                    </p>

                    <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
                      {complaint.titulo}
                    </h1>

                    <p className="mt-1.5 text-sm text-ink/55">
                      {complaint.setor_relacionado ||
                        'Setor não informado'}{' '}
                      · {complaint.categoria}
                    </p>
                  </div>

                  <StatusBadge
                    status={complaint.status}
                  />
                </div>

                <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-ink/75">
                  {complaint.descricao}
                </p>

                <p className="mt-5 text-xs text-ink/40">
                  Aberta em{' '}
                  {new Date(
                    complaint.createdAt
                  ).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold text-ink">
                  Histórico
                </h2>

                {(!complaint.ComplaintResponses ||
                  complaint.ComplaintResponses
                    .length === 0) && (
                  <div className="mt-3 rounded-xl border border-teal-100 bg-white p-6 text-center">
                    <p className="text-sm text-ink/55">
                      Ainda não há respostas para esta reclamação.
                    </p>
                  </div>
                )}

                <div className="mt-3 space-y-3">
                  {complaint.ComplaintResponses?.map(
                    (response) => (
                      <div
                        key={response.id}
                        className="rounded-xl border border-teal-100 bg-white p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-ink">
                            {response.Employee?.nome ||
                              'RH'}
                          </p>

                          <p className="text-xs text-ink/40">
                            {new Date(
                              response.createdAt
                            ).toLocaleDateString(
                              'pt-BR'
                            )}
                          </p>
                        </div>

                        <p className="mt-1.5 whitespace-pre-wrap text-sm text-ink/75">
                          {response.mensagem}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <form
                  onSubmit={handleAddResponse}
                  className="mt-5 rounded-xl border border-teal-100 bg-white p-4"
                >
                  <label
                    htmlFor="mensagem"
                    className="mb-1.5 block text-sm font-medium text-ink"
                  >
                    Adicionar resposta
                  </label>

                  <textarea
                    id="mensagem"
                    value={mensagem}
                    onChange={(e) =>
                      setMensagem(e.target.value)
                    }
                    rows={3}
                    placeholder="Escreva uma atualização ou resposta..."
                    required
                    disabled={enviando}
                    className="w-full resize-none rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600 disabled:opacity-60"
                  />

                  {erroResposta && (
                    <p
                      role="alert"
                      className="mt-2 text-sm text-red-500"
                    >
                      {erroResposta}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      enviando ||
                      !mensagem.trim()
                    }
                    className="mt-3 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {enviando
                      ? 'Enviando...'
                      : 'Enviar resposta'}
                  </button>
                </form>
              </div>
            </>
          )}
      </section>
    </div>
  )
}