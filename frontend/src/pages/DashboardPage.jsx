import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import StatusBadge from '../components/StatusBadge'
import { mockComplaints, STATUS } from '../data/mockData'

const filters = ['Todas', ...Object.keys(STATUS)]

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('Todas')

  const visibleComplaints =
    activeFilter === 'Todas'
      ? mockComplaints
      : mockComplaints.filter((c) => c.status === activeFilter)

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              Minhas reclamações
            </h1>
            <p className="mt-1.5 text-ink/60">
              Acompanhe o andamento de cada protocolo aberto.
            </p>
          </div>
          <Link
            to="/nova-reclamacao"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-paper transition-colors hover:bg-teal-800"
          >
            <Plus size={18} />
            Nova reclamação
          </Link>
        </div>

        {/* Busca */}
        <div className="relative mt-8 max-w-sm">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
          />
          <input
            type="text"
            placeholder="Buscar por título ou empresa"
            className="w-full rounded-lg border border-ink/15 bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
          />
        </div>

        {/* Filtros por status */}
        <div className="mt-5 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const label = filter === 'Todas' ? 'Todas' : STATUS[filter].label
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-paper'
                    : 'bg-teal-50 text-ink/60 hover:bg-teal-100'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Lista de reclamações */}
        <div className="mt-8 space-y-3">
          {visibleComplaints.length === 0 && (
            <div className="rounded-xl border border-teal-100 bg-white p-10 text-center">
              <p className="font-semibold text-ink">
                Nenhuma reclamação com esse status.
              </p>
              <p className="mt-1 text-sm text-ink/55">
                Tente outro filtro ou registre uma nova reclamação.
              </p>
            </div>
          )}

          {visibleComplaints.map((complaint) => (
            <Link
              key={complaint.id}
              to={`/reclamacao/${complaint.id}`}
              className="block rounded-xl border border-teal-100 bg-white p-5 transition-colors hover:border-teal-400"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-ink/40">{complaint.id}</p>
                  <h3 className="mt-1 font-bold text-ink">{complaint.title}</h3>
                  <p className="mt-1 text-sm text-ink/55">
                    {complaint.company} · {complaint.category}
                  </p>
                </div>
                <StatusBadge status={complaint.status} />
              </div>
              <p className="mt-3 text-xs text-ink/40">
                Aberta em{' '}
                {new Date(complaint.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}