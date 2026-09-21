import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [colaborador, setColaborador] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    // Remove sessão antiga que ficava salva permanentemente
    localStorage.removeItem('token')
    localStorage.removeItem('colaborador')

    async function verificarSessao() {
      const token = sessionStorage.getItem('token')

      if (!token) {
        setColaborador(null)
        setCarregando(false)
        return
      }

      try {
        const dados = await api.getMe()

        setColaborador(dados)

        sessionStorage.setItem(
          'colaborador',
          JSON.stringify(dados)
        )
      } catch (err) {
        console.error('Sessão inválida:', err)

        sessionStorage.removeItem('token')
        sessionStorage.removeItem('colaborador')

        setColaborador(null)
      } finally {
        setCarregando(false)
      }
    }

    verificarSessao()

    function acessoNegado() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('colaborador')

      setColaborador(null)
    }

    window.addEventListener('auth:unauthorized', acessoNegado)

    return () => {
      window.removeEventListener(
        'auth:unauthorized',
        acessoNegado
      )
    }
  }, [])

  async function login(matricula, senha) {
    const data = await api.login(matricula, senha)

    sessionStorage.setItem('token', data.token)

    sessionStorage.setItem(
      'colaborador',
      JSON.stringify(data.colaborador)
    )

    setColaborador(data.colaborador)

    return data
  }

  function logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('colaborador')

    setColaborador(null)
  }

  return (
    <AuthContext.Provider
      value={{
        colaborador,
        carregando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}