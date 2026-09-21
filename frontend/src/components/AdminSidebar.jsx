import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  MessageSquareText,
  UserRound,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AdminSidebar() {
  const { colaborador, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const iniciais = colaborador?.nome
    ?.split(' ')
    .slice(0, 2)
    .map((nome) => nome[0])
    .join('')
    .toUpperCase()

  const navItems = [
    {
      to: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: '/admin/reclamacoes',
      label: 'Reclamações',
      icon: FileText,
    },
    {
      to: '/admin/colaboradores',
      label: 'Colaboradores',
      icon: Users,
    },
    {
      to: '/admin/comunicados',
      label: 'Comunicados',
      icon: Megaphone,
    },
    {
      to: '/admin/feedbacks',
      label: 'Feedbacks',
      icon: MessageSquareText,
    },
  ]

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-teal-100 bg-white">
      <NavLink
        to="/admin/perfil"
        className="flex items-center gap-3 border-b border-teal-100 px-5 py-5 hover:bg-teal-50/60"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-semibold text-white">
          {iniciais || '?'}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {colaborador?.nome || 'Administrador'}
          </p>

          <p className="text-xs font-medium text-teal-600">
            RH / Administração
          </p>
        </div>
      </NavLink>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
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

        <NavLink
          to="/admin/perfil"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-teal-600 text-white'
                : 'text-ink/70 hover:bg-teal-50 hover:text-ink'
            }`
          }
        >
          <UserRound size={18} />
          Meu perfil
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 border-t border-teal-100 px-5 py-4 text-sm font-medium text-ink/60 hover:bg-red-50 hover:text-red-500"
      >
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  )
}