import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminRoute({
  children,
}) {
  const {
    colaborador,
    carregando,
  } = useAuth()

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />

          <p className="mt-3 text-sm text-ink/50">
            Verificando acesso...
          </p>
        </div>
      </div>
    )
  }

  if (
    !colaborador ||
    colaborador.role !== 'admin'
  ) {
    return (
      <Navigate
        to="/minhas-reclamacoes"
        replace
      />
    )
  }

  return children
}