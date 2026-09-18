const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || 'Erro na requisição.');
  }

  return data;
}

export const api = {
  login: (matricula, senha) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ matricula, senha }),
    }),

  // PERFIL
  getMe: () => request('/auth/me'),

  updateMe: (payload) =>
    request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  // RECLAMAÇÕES
  getMyComplaints: () => request('/complaints'),

  getComplaint: (id) => request(`/complaints/${id}`),

  createComplaint: (payload) =>
    request('/complaints', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateComplaintStatus: (id, status) =>
    request(`/complaints/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  addComplaintResponse: (id, mensagem) =>
    request(`/complaints/${id}/responses`, {
      method: 'POST',
      body: JSON.stringify({ mensagem }),
    }),

  // COMUNICADOS
  getAnnouncements: () => request('/announcements'),
};