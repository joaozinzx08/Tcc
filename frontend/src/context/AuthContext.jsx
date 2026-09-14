import { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [colaborador, setColaborador] = useState(() => {
    const saved = localStorage.getItem('colaborador');
    return saved ? JSON.parse(saved) : null;
  });

  async function login(matricula, senha) {
    const data = await api.login(matricula, senha);
    localStorage.setItem('token', data.token);
    localStorage.setItem('colaborador', JSON.stringify(data.colaborador));
    setColaborador(data.colaborador);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('colaborador');
    setColaborador(null);
  }

  return (
    <AuthContext.Provider value={{ colaborador, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}