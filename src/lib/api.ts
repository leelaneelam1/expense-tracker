
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: async (credentials: { email: string; password: string; name?: string }) =>
    api.post('/auth/register', credentials),
};

export const expenseApi = {
  getExpenses: async () => api.get('/expenses'),
  createExpense: async (expense: any) => api.post('/expenses', expense),
  updateExpense: async (id: string, expense: any) =>
    api.put(`/expenses/${id}`, expense),
  deleteExpense: async (id: string) => api.delete(`/expenses/${id}`),
};

export default api;
