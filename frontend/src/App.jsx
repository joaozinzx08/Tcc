import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import DashboardPage from './pages/DashboardPage'
import NovaReclamacaoPage from './pages/NovaReclamacaoPage'
import DetalheReclamacaoPage from './pages/DetalheReclamacaoPage'
import RespostasPage from './pages/RespostasPage'
import PerfilPage from './pages/PerfilPage'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './components/AppLayout'

export default function App() {
  return (
    <Routes>
      {/* Sem sidebar */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />

      {/* Com sidebar — protegido por login */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/minhas-reclamacoes" element={<DashboardPage />} />
        <Route path="/nova-reclamacao" element={<NovaReclamacaoPage />} />
        <Route path="/reclamacao/:id" element={<DetalheReclamacaoPage />} />
        <Route path="/respostas" element={<RespostasPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Route>
    </Routes>
  )
}