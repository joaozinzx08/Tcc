import { Link } from 'react-router-dom'
import { ShieldCheck, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
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

          <form className="mt-7 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                E-mail
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-lg border border-ink/15 bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-ink">
                  Senha
                </label>
                <Link to="/recuperar-senha" className="text-sm text-teal-600 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
                />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-ink/15 bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-paper transition-colors hover:bg-teal-800"
            >
              Entrar
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