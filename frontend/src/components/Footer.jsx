import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

const columns = [
  {
    title: 'Consumidores',
    links: [
      { label: 'Abrir reclamação', to: '/cadastro' },
      { label: 'Acompanhar status', to: '/minhas-reclamacoes' },
      { label: 'Consultar reputação', to: '/empresas' },
    ],
  },
  {
    title: 'Empresas',
    links: [
      { label: 'Painel da empresa', to: '/empresa/dashboard' },
      { label: 'Cadastrar CNPJ', to: '/cadastro-empresa' },
    ],
  },
  {
    title: 'Plataforma',
    links: [
      { label: 'Painel administrativo', to: '/admin' },
      { label: 'Termos de uso', to: '/termos' },
      { label: 'Política de privacidade', to: '/privacidade' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-teal-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-paper">
              <ShieldCheck size={18} />
            </span>
            <span className="text-lg font-bold tracking-tight text-ink">
              Resolva Já
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60">
            Plataforma de mediação entre consumidores, cidadãos e empresas.
            Projeto acadêmico (TCC) com dados fictícios.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-ink">{col.title}</p>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink/60 hover:text-teal-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-teal-100 px-6 py-5 text-center text-xs text-ink/45">
        © 2026 Resolva Já — protótipo acadêmico. Nenhum dado exibido é real.
      </div>
    </footer>
  )
}
