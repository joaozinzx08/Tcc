import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  FileText,
  Users,
  UserCheck,
  CalendarDays,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'

import { api } from '../../services/api'

export default function AdminDashboardPage() {
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    carregarDashboard()
  }, [])

  async function carregarDashboard() {
    setLoading(true)
    setError('')

    try {
      const data = await api.getAdminDashboard()
      setDados(data)
    } catch (err) {
      setError(
        err.message ||
          'Não foi possível carregar o dashboard.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />

          <p className="mt-4 text-sm text-ink/50">
            Carregando dashboard...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paper p-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3">
            <AlertCircle
              size={22}
              className="text-red-500"
            />

            <div>
              <p className="font-semibold text-red-700">
                Não foi possível carregar o dashboard
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>
          </div>

          <button
            onClick={carregarDashboard}
            className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  const resumo = dados?.resumo || {}

  const maiorStatus = Math.max(
    ...((dados?.porStatus || []).map(
      (item) => item.total
    )),
    1
  )

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* CABEÇALHO */}
        <div>
          <p className="text-sm font-semibold text-teal-600">
            Administração
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-ink/50">
            Visão geral das atividades do Resolva Já.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={FileText}
            titulo="Total de reclamações"
            valor={resumo.totalReclamacoes || 0}
          />

          <MetricCard
            icon={CalendarDays}
            titulo="Últimos 7 dias"
            valor={resumo.reclamacoesUltimos7Dias || 0}
          />

          <MetricCard
            icon={UserCheck}
            titulo="Colaboradores ativos"
            valor={resumo.colaboradoresAtivos || 0}
          />

          <MetricCard
            icon={Users}
            titulo="Total de colaboradores"
            valor={resumo.totalColaboradores || 0}
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.4fr]">

          {/* STATUS */}
          <section className="rounded-2xl border border-teal-100 bg-white p-6">
            <div>
              <h2 className="text-lg font-bold text-ink">
                Distribuição por status
              </h2>

              <p className="mt-1 text-sm text-ink/45">
                Situação atual das reclamações.
              </p>
            </div>

            {dados?.porStatus?.length > 0 ? (
              <div className="mt-6 space-y-5">
                {dados.porStatus.map((item) => {
                  const porcentagem =
                    (item.total / maiorStatus) * 100

                  return (
                    <div key={item.status}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-medium capitalize text-ink">
                          {formatarStatus(item.status)}
                        </span>

                        <span className="text-sm font-bold text-ink">
                          {item.total}
                        </span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-teal-50">
                        <div
                          className="h-full rounded-full bg-teal-600 transition-all"
                          style={{
                            width: `${porcentagem}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-xl bg-slate-50 px-5 py-8 text-center">
                <FileText
                  size={27}
                  className="mx-auto text-ink/25"
                />

                <p className="mt-3 text-sm font-medium text-ink/50">
                  Ainda não existem reclamações cadastradas.
                </p>
              </div>
            )}
          </section>

          {/* RECLAMAÇÕES RECENTES */}
          <section className="overflow-hidden rounded-2xl border border-teal-100 bg-white">

            <div className="flex items-center justify-between border-b border-teal-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-ink">
                  Reclamações recentes
                </h2>

                <p className="mt-1 text-sm text-ink/45">
                  Últimos registros recebidos.
                </p>
              </div>

              <Link
                to="/admin/reclamacoes"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                Ver todas
                <ArrowRight size={16} />
              </Link>
            </div>

            {dados?.reclamacoesRecentes?.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {dados.reclamacoesRecentes.map(
                  (reclamacao) => (
                    <Link
                      key={reclamacao.id}
                      to={`/admin/reclamacoes/${reclamacao.id}`}
                      className="flex items-center justify-between gap-5 px-6 py-4 transition-colors hover:bg-teal-50/50"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-ink/35">
                          {reclamacao.protocolo}
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-ink">
                          {reclamacao.titulo}
                        </p>

                        <p className="mt-1 text-xs text-ink/45">
                          {reclamacao.setor_relacionado ||
                            'Setor não informado'}

                          {' • '}

                          {reclamacao.categoria ||
                            'Sem categoria'}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <StatusPill
                          status={reclamacao.status}
                        />

                        <p className="mt-2 text-xs text-ink/35">
                          {formatarData(
                            reclamacao.createdAt
                          )}
                        </p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <div className="px-6 py-14 text-center">
                <FileText
                  size={28}
                  className="mx-auto text-ink/20"
                />

                <p className="mt-3 text-sm text-ink/45">
                  Nenhuma reclamação registrada ainda.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  titulo,
  valor,
}) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <Icon size={20} />
      </div>

      <p className="mt-5 text-3xl font-extrabold tracking-tight text-ink">
        {valor}
      </p>

      <p className="mt-1 text-sm text-ink/45">
        {titulo}
      </p>
    </div>
  )
}

function StatusPill({ status }) {
  return (
    <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold capitalize text-teal-700">
      {formatarStatus(status)}
    </span>
  )
}

function formatarStatus(status) {
  if (!status) return 'Sem status'

  return String(status)
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .toLowerCase()
}

function formatarData(data) {
  if (!data) return ''

  return new Date(data).toLocaleDateString(
    'pt-BR'
  )
}