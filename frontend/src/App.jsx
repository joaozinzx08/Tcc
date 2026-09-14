import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import DashboardPage from './pages/DashboardPage'
import NovaReclamacaoPage from './pages/NovaReclamacaoPage'
import DetalheReclamacaoPage from './pages/DetalheReclamacaoPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route
        path="/minhas-reclamacoes"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nova-reclamacao"
        element={
          <ProtectedRoute>
            <NovaReclamacaoPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reclamacao/:id"
        element={
          <ProtectedRoute>
            <DetalheReclamacaoPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}