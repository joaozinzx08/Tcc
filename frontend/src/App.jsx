import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'

import DashboardPage from './pages/DashboardPage'
import NovaReclamacaoPage from './pages/NovaReclamacaoPage'
import DetalheReclamacaoPage from './pages/DetalheReclamacaoPage'
import RespostasPage from './pages/RespostasPage'
import FeedbackPage from './pages/FeedbackPage'
import PerfilPage from './pages/PerfilPage'

// ADMIN
import AdminDashboardPage from './pages/Admin/AdminDashboardPage'
import AdminReclamacoesPage from './pages/Admin/AdminReclamacoesPage'
import AdminDetalhePage from './pages/Admin/AdminDetalhePage'
import AdminColaboradoresPage from './pages/Admin/AdminColaboradoresPage'
import AdminColaboradorDetalhePage from './pages/Admin/AdminColaboradorDetalhePage'
import AdminComunicadosPage from './pages/Admin/AdminComunicadosPage'
import AdminFeedbacksPage from './pages/Admin/AdminFeedbacksPage'
import AdminPerfilPage from './pages/Admin/AdminPerfilPage'

import CollaboratorRoute from './components/CollaboratorRoute'
import AdminRoute from './components/AdminRoute'

import AppLayout from './components/AppLayout'
import AdminLayout from './components/AdminLayout'

export default function App() {
  return (
    <Routes>
      {/* PÚBLICO */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* COLABORADOR */}
      <Route
        element={
          <CollaboratorRoute>
            <AppLayout />
          </CollaboratorRoute>
        }
      >
        <Route
          path="/minhas-reclamacoes"
          element={<DashboardPage />}
        />

        <Route
          path="/nova-reclamacao"
          element={<NovaReclamacaoPage />}
        />

        <Route
          path="/reclamacao/:id"
          element={<DetalheReclamacaoPage />}
        />

        <Route
          path="/respostas"
          element={<RespostasPage />}
        />

        <Route
          path="/feedback"
          element={<FeedbackPage />}
        />

        <Route
          path="/perfil"
          element={<PerfilPage />}
        />
      </Route>

      {/* ADMIN */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          path="/admin"
          element={<AdminDashboardPage />}
        />

        <Route
          path="/admin/reclamacoes"
          element={<AdminReclamacoesPage />}
        />

        <Route
          path="/admin/reclamacoes/:id"
          element={<AdminDetalhePage />}
        />

        <Route
          path="/admin/colaboradores"
          element={<AdminColaboradoresPage />}
        />

        <Route
          path="/admin/colaboradores/:id"
          element={<AdminColaboradorDetalhePage />}
        />

        <Route
          path="/admin/comunicados"
          element={<AdminComunicadosPage />}
        />

        <Route
          path="/admin/feedbacks"
          element={<AdminFeedbacksPage />}
        />

        <Route
          path="/admin/perfil"
          element={<AdminPerfilPage />}
        />
      </Route>
    </Routes>
  )
}