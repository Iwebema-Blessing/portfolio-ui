import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_URL || ''}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

const TOKEN_KEY = 'portfolio_token';

export const tokenStore = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage can be blocked, the cookie still works */
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* no-op */
    }
  },
};

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload = error.response?.data;
    const message =
      payload?.message ||
      (error.code === 'ERR_NETWORK'
        ? 'Cannot reach the server. Check that it is running.'
        : 'Something went wrong. Try again.');

    if (error.response?.status === 401 && !window.location.pathname.startsWith('/account')) {
      tokenStore.clear();
    }

    return Promise.reject({ message, details: payload?.details, status: error.response?.status });
  }
);

/** Every endpoint lives here, so a URL change is a one line change. */
export const endpoints = {
  authStatus: () => api.get('/auth/status'),
  register: (payload) => api.post('/auth/register', payload),
  verifyAccount: (payload) => api.post('/auth/verify', payload),
  resendCode: (payload) => api.post('/auth/resend', payload),
  login: (payload) => api.post('/auth/login', payload),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  changePassword: (payload) => api.patch('/auth/password', payload),
  updateAccount: (payload) => api.patch('/auth/profile', payload),

  publicProjects: (params) => api.get('/projects', { params }),
  allProjects: () => api.get('/projects/admin/all'),
  createProject: (payload) => api.post('/projects', payload),
  updateProject: (id, payload) => api.patch(`/projects/${id}`, payload),
  deleteProject: (id) => api.delete(`/projects/${id}`),

  sendMessage: (payload) => api.post('/messages', payload),
  messages: () => api.get('/messages'),
  markMessage: (id, read) => api.patch(`/messages/${id}/read`, { read }),
  deleteMessage: (id) => api.delete(`/messages/${id}`),

  settings: () => api.get('/settings'),
  updateSettings: (payload) => api.patch('/settings', payload),
};
