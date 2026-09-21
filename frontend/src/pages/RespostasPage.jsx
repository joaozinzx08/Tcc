import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import StatusBadge from '../components/StatusBadge'

export default function RespostasPage() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadRespostas() {
      setLoading(true)
      setError(null)

      try {
        const data = await api.getMyComplaints()

        const comResposta = data.filter(
          (c) =>
            c.ComplaintResponses &&
            c.ComplaintResponses.length > 0
        )

        setComplaints(comResposta)
      } catch (err) {
        setError(
          err.message ||
            'Não foi possível carregar as respostas.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadRespostas()
  }, [])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          Respostas
        </h1>

        <p className="mt-1.5 text-ink/60">
          Acompanhe o que o RH respondeu nas suas reclamações.
        </p>

        {loading && (
          <div className="mt-8 rounded-xl border border-teal-100 bg-white p-10 text-center">
            <p className="text-sm text-ink/55">
              Carregando respostas…
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-xl border border-coral-200 bg-coral-50 p-10 text-center">
            <p className="text-sm text-ink/55">
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          complaints.length === 0 && (
            <div className="mt-8 rounded-xl border border-teal-100 bg-white p-10 text-center">
              <p className="text-sm text-ink/55">
                Nenhuma reclamação sua tem resposta ainda.
              </p>
            </div>
          )}

        <div className="mt-6 space-y-3">
          {complaints.map((complaint) => {
            const ultimaResposta =
              complaint.ComplaintResponses[
                complaint.ComplaintResponses
                  .length - 1
              ]

            return (
              <Link
                key={complaint.id}
                to={`/reclamacao/${complaint.id}`}
                className="block rounded-xl border border-teal-100 bg-white p-5 hover:border-teal-300"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-ink/40">
                      {complaint.protocolo}
                    </p>

                    <h2 className="mt-0.5 font-semibold text-ink">
                      {complaint.titulo}
                    </h2>
                  </div>

                  <StatusBadge
                    status={complaint.status}
                  />
                </div>

                <div className="mt-3 rounded-lg bg-teal-50/60 p-3">
                  <p className="text-xs font-medium text-ink/50">
                    {ultimaResposta.Employee
                      ?.nome || 'RH'}{' '}
                    respondeu:
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm text-ink/75">
                    {ultimaResposta.mensagem}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}