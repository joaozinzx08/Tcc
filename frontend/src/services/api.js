const API_URL = import.meta.env.VITE_API_URL

async function request(endpoint, options = {}) {
  const token =
    sessionStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),

    ...options.headers,
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  )

  let data = {}

  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (response.status === 401) {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('colaborador')

    window.dispatchEvent(
      new Event('auth:unauthorized')
    )

    throw new Error(
      data.erro ||
        'Acesso negado. Faça login.'
    )
  }

  if (response.status === 403) {
    throw new Error(
      data.erro ||
        'Acesso negado. Você não possui permissão.'
    )
  }

  if (!response.ok) {
    throw new Error(
      data.erro ||
        'Erro na requisição.'
    )
  }

  return data
}

export const api = {
  // LOGIN
  login: (matricula, senha) =>
    request('/auth/login', {
      method: 'POST',

      body: JSON.stringify({
        matricula,
        senha,
      }),
    }),

  // PERFIL
  getMe: () =>
    request('/auth/me'),

  updateMe: (payload) =>
    request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  // ADMIN / RH
  getEmployees: () =>
    request('/auth/employees'),

  createEmployee: (payload) =>
    request('/auth/employees', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // RECLAMAÇÕES
  getAdminDashboard: () => request('/admin/dashboard'),
 
  getMyComplaints: () =>
    request('/complaints'),

  getComplaint: (id) =>
    request(`/complaints/${id}`),

  createComplaint: (payload) =>
    request('/complaints', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateComplaintStatus: (
    id,
    status
  ) =>
    request(
      `/complaints/${id}/status`,
      {
        method: 'PATCH',

        body: JSON.stringify({
          status,
        }),
      }
    ),

  addComplaintResponse: (
    id,
    mensagem
  ) =>
    request(
      `/complaints/${id}/responses`,
      {
        method: 'POST',

        body: JSON.stringify({
          mensagem,
        }),
      }
    ),

  // COMUNICADOS
  getAnnouncements: () =>
    request('/announcements'),
}