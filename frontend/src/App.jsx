import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import DashboardPage from './pages/DashboardPage'
import Reclamacao from './pages/Reclamacao'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/minhas-reclamacoes" element={<DashboardPage />} />
      <Route path="/nova-Reclamacao" element={<Reclamacao />} />
    </Routes>
  )
}