import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShieldCheck, User, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(matricula, senha)
      navigate('/minhas-reclamacoes')
    } catch (err) {
      setError(err.message || 'Matrícula ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-teal-50 to-amber-100/50 px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-paper">
            <ShieldCheck size={18} />
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">
            Resolva Já
          </span>
        </Link>

        <div className="rounded-2xl border border-teal-100 bg-white p-8 shadow-lg shadow-teal-900/5">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">
            Entrar na sua conta
          </h1>
          <p className="mt-1.5 text-sm text-ink/55">
            Acompanhe suas reclamações ou o painel da sua empresa.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-coral-100 px-3.5 py-2.5 text-sm text-coral-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="matricula" className="mb-1.5 block text-sm font-medium text-ink">
                Matrícula
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
                />
                <input
                  id="matricula"
                  type="text"
                  required
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="0001"
                  className="w-full rounded-lg border border-ink/15 bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="mb-1.5 block text-sm font-medium text-ink">
                Senha
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
                />
                <input
                  id="senha"
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-ink/15 bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-paper transition-colors hover:bg-teal-800 disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/55">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="font-medium text-teal-600 hover:underline">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}