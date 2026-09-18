import { useEffect, useState } from 'react'
import { api } from '../services/api'

const statusConfig = {
  ativo: { label: 'Ativo', color: 'bg-green-100 text-green-700', dot: '🟢' },
  ferias: { label: 'Férias', color: 'bg-yellow-100 text-yellow-700', dot: '🟡' },
  inativo: { label: 'Inativo', color: 'bg-red-100 text-red-700', dot: '🔴' },
}

export default function PerfilPage() {
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editando, setEditando] = useState(false)
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [erroSalvar, setErroSalvar] = useState(null)

  useEffect(() => {
    async function loadPerfil() {
      setLoading(true)
      setError(null)
      try {
        const data = await api.getMe()
        setPerfil(data)
        setEmail(data.email || '')
        setTelefone(data.telefone || '')
      } catch (err) {
        setError(err.message || 'Não foi possível carregar o perfil.')
      } finally {
        setLoading(false)
      }
    }

    loadPerfil()
  }, [])

  async function handleSalvar(e) {
    e.preventDefault()
    setSalvando(true)
    setErroSalvar(null)
    try {
      const atualizado = await api.updateMe({ email, telefone })
      setPerfil(atualizado)
      setEditando(false)
    } catch (err) {
      setErroSalvar(err.message || 'Não foi possível salvar.')
    } finally {
      setSalvando(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-paper p-8">
        <p className="text-sm text-ink/55">Carregando perfil…</p>
      </div>
    )
  }

  if (error || !perfil) {
    return (
      <div className="min-h-screen bg-paper p-8">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  const status = statusConfig[perfil.status] || statusConfig.ativo
  const iniciais = perfil.nome
    ?.split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Meu perfil</h1>

        <div className="mt-8 rounded-2xl border border-teal-100 bg-white p-7">
          {/* Cabeçalho: foto + nome + status */}
          <div className="flex items-center gap-4">
            {perfil.foto_url ? (
              <img
                src={perfil.foto_url}
                alt={perfil.nome}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-lg font-semibold text-white">
                {iniciais}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-ink">{perfil.nome}</h2>
              <p className="text-sm text-ink/55">{perfil.cargo || 'Cargo não informado'}</p>
              <span
                className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}
              >
                {status.dot} {status.label}
              </span>
            </div>
          </div>

          {/* Dados fixos (controlados pelo RH) */}
          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-teal-100 pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-ink/45">Matrícula</p>
              <p className="mt-0.5 text-sm text-ink">{perfil.matricula}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ink/45">Setor</p>
              <p className="mt-0.5 text-sm text-ink">{perfil.setor || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ink/45">Cargo</p>
              <p className="mt-0.5 text-sm text-ink">{perfil.cargo || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ink/45">Data de admissão</p>
              <p className="mt-0.5 text-sm text-ink">
                {perfil.data_admissao
                  ? new Date(perfil.data_admissao).toLocaleDateString('pt-BR')
                  : '—'}
              </p>
            </div>
          </div>

          {/* Dados editáveis pelo colaborador */}
          <div className="mt-6 border-t border-teal-100 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">Contato</h3>
              {!editando && (
                <button
                  onClick={() => setEditando(true)}
                  className="text-sm font-medium text-teal-700 hover:underline"
                >
                  Editar
                </button>
              )}
            </div>

            {!editando ? (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-ink/75">
                  <span className="text-ink/45">E-mail: </span>
                  {perfil.email || 'Não informado'}
                </p>
                <p className="text-sm text-ink/75">
                  <span className="text-ink/45">Telefone: </span>
                  {perfil.telefone || 'Não informado'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSalvar} className="mt-3 space-y-3">
                <div>
                  <label htmlFor="email" className="mb-1 block text-xs font-medium text-ink/55">
                    E-mail corporativo
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2 text-sm text-ink focus:border-teal-600"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="mb-1 block text-xs font-medium text-ink/55">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2 text-sm text-ink focus:border-teal-600"
                  />
                </div>

                {erroSalvar && <p className="text-sm text-red-500">{erroSalvar}</p>}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={salvando}
                    className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-paper hover:bg-teal-800 disabled:opacity-60"
                  >
                    {salvando ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditando(false)}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-ink/60 hover:bg-ink/5"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}