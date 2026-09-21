import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-teal-100 bg-teal-50/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-paper">
            <ShieldCheck size={18} />
          </span>

          <span className="text-lg font-bold tracking-tight text-ink">
            Resolva Já
          </span>
        </Link>

        {/* Login */}
        <Link
          to="/login"
          className="rounded-lg bg-teal-600 px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md"
        >
          Entrar
        </Link>
      </div>
    </header>
  )
}