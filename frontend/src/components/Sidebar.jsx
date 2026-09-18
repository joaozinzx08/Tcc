import { NavLink, useNavigate } from 'react-router-dom'
import { FileText, PlusCircle, MessageSquare, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const { colaborador, logout } = useAuth()
  const navigate = useNavigate()

 function handleLogout() {
  navigate('/')
  setTimeout(() => {
    logout()
  }, 0)
}

  const iniciais = colaborador?.nome
    ?.split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const navItems = [
    { to: '/minhas-reclamacoes', label: 'Minhas reclamações', icon: FileText },
    { to: '/nova-reclamacao', label: 'Nova reclamação', icon: PlusCircle },
    { to: '/respostas', label: 'Respostas', icon: MessageSquare },
  ]

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-teal-100 bg-white">
      {/* Bloco de perfil */}
      <NavLink
        to="/perfil"
        className="flex items-center gap-3 border-b border-teal-100 px-5 py-5 hover:bg-teal-50/60"
      >
        {colaborador?.foto_url ? (
          <img
            src={colaborador.foto_url}
            alt={colaborador.nome}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
            {iniciais || '?'}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {colaborador?.nome || 'Meu perfil'}
          </p>
          <p className="truncate text-xs text-ink/50">{colaborador?.setor}</p>
        </div>
      </NavLink>

      {/* Navegação */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white'
                  : 'text-ink/70 hover:bg-teal-50 hover:text-ink'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Sair */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 border-t border-teal-100 px-5 py-4 text-sm font-medium text-ink/60 hover:text-coral-500"
      >
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  )
}