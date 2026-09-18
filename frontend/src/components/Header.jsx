import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/empresas', label: 'Empresas' },
  { to: '/minhas-reclamacoes', label: 'Minhas reclamações' },
]

export default function Header() {
  const location = useLocation()

  return (
    <header className="border-b border-teal-100 bg-teal-50/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-paper">
            <ShieldCheck size={18} />
          </span>

          <span className="text-lg font-bold tracking-tight text-ink">
            Resolva Já
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-medium text-ink/60 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                location.pathname === item.to
                  ? 'text-teal-600'
                  : 'hover:text-ink'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <Link
            to="/login"
            className="hidden rounded-lg bg-teal-600 px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md sm:inline-flex"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  )
}