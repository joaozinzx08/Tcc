import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShieldCheck, User, Building2 } from 'lucide-react'

export default function CadastroPage() {
  const [accountType, setAccountType] = useState('consumidor')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    // TODO: quando o backend estiver pronto, criar o usuário de fato aqui
    // antes de navegar. Por enquanto, qualquer envio simula o cadastro.
    navigate('/minhas-reclamacoes')
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
            Criar conta
          </h1>
          <p className="mt-1.5 text-sm text-ink/55">
            Escolha o tipo de conta para continuar.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAccountType('consumidor')}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors ${
                accountType === 'consumidor'
                  ? 'border-teal-600 bg-teal-50 text-teal-800'
                  : 'border-ink/15 text-ink/60 hover:border-ink/30'
              }`}
            >
              <User size={20} />
              Sou consumidor
            </button>
            <button
              type="button"
              onClick={() => setAccountType('empresa')}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors ${
                accountType === 'empresa'
                  ? 'border-teal-600 bg-teal-50 text-teal-800'
                  : 'border-ink/15 text-ink/60 hover:border-ink/30'
              }`}
            >
              <Building2 size={20} />
              Sou empresa
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                {accountType === 'consumidor' ? 'Nome completo' : 'Razão social'}
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder={accountType === 'consumidor' ? 'Seu nome' : 'Nome da empresa'}
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
              />
            </div>

            <div>
              <label htmlFor="doc" className="mb-1.5 block text-sm font-medium text-ink">
                {accountType === 'consumidor' ? 'CPF' : 'CNPJ'}
              </label>
              <input
                id="doc"
                type="text"
                required
                placeholder={accountType === 'consumidor' ? '000.000.000-00' : '00.000.000/0000-00'}
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-400 py-3 font-semibold text-ink transition-colors hover:bg-amber-600 hover:text-paper"
            >
              {accountType === 'consumidor' ? 'Criar conta gratuita' : 'Cadastrar empresa'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/55">
            Já tem conta?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}