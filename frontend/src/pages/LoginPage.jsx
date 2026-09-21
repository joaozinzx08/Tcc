import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ShieldCheck,
  User,
  Lock,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
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
      const data = await login(matricula, senha)

      if (data.colaborador.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/minhas-reclamacoes')
      }
    } catch (err) {
      setError(err.message || 'Matrícula ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white">

      {/* LADO ESQUERDO */}
      <section className="relative hidden w-1/2 overflow-hidden bg-teal-700 lg:flex lg:flex-col lg:justify-between">

        {/* Decoração */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-white/5" />

        {/* Logo */}
        <div className="relative z-10 px-14 pt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-teal-700">
              <ShieldCheck size={20} />
            </span>

            <span className="text-xl font-bold">
              Resolva Já
            </span>
          </Link>
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 max-w-xl px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-100">
            Portal interno
          </p>

          <h1 className="mt-5 text-5xl font-extrabold leading-[1.08] tracking-tight text-white">
            Reclamar.
            <br />
            Acompanhar.
            <br />

            <span className="text-amber-300">
              Resolver.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
            Um espaço simples para registrar solicitações,
            acompanhar respostas e melhorar a comunicação dentro da empresa.
          </p>

          <div className="mt-9 space-y-4">
            <div className="flex items-center gap-3 text-sm text-white/80">
              <CheckCircle2
                size={18}
                className="text-amber-300"
              />

              Histórico organizado
            </div>

            <div className="flex items-center gap-3 text-sm text-white/80">
              <CheckCircle2
                size={18}
                className="text-amber-300"
              />

              Acompanhamento do status
            </div>

            <div className="flex items-center gap-3 text-sm text-white/80">
              <CheckCircle2
                size={18}
                className="text-amber-300"
              />

              Comunicação direta com os setores
            </div>
          </div>
        </div>

        <div className="relative z-10 px-14 pb-10">
          <p className="text-xs text-white/35">
            Resolva Já • Comunicação interna
          </p>
        </div>
      </section>

      {/* LADO DIREITO */}
      <section className="flex w-full items-center justify-center bg-white px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">

          <Link
            to="/"
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-ink/45 transition-colors hover:text-teal-700"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>

          {/* Logo mobile */}
          <div className="mb-10 lg:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white">
                <ShieldCheck size={20} />
              </span>

              <span className="text-xl font-bold text-ink">
                Resolva Já
              </span>
            </Link>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-ink">
              Faça seu login
            </h2>

            <p className="mt-3 text-sm text-ink/50">
              Entre com sua matrícula e senha.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="matricula"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Matrícula
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30"
                />

                <input
                  id="matricula"
                  type="text"
                  required
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Digite sua matrícula"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-ink/30 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="senha"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                Senha
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30"
                />

                <input
                  id="senha"
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-ink/30 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white transition-all hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-ink/45">
            Não possui acesso? Solicite o cadastro ao RH.
          </p>

        </div>
      </section>
    </div>
  )
}