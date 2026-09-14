import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { colaborador } = useAuth()

  if (!colaborador) {
    return <Navigate to="/login" replace />
  }

  return children
}