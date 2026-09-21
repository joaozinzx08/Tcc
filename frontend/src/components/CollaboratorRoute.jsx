import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CollaboratorRoute({ children }) {
  const { colaborador, carregando } = useAuth()

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-teal-600" />

          <p className="mt-4 text-sm text-ink/50">
            Verificando acesso...
          </p>
        </div>
      </div>
    )
  }

  if (!colaborador) {
    return <Navigate to="/login" replace />
  }

  if (colaborador.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  return children
}