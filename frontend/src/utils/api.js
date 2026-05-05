import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  login: (data) => api.post('/auth/login', data),
  verifyLoginOTP: (data) => api.post('/auth/verify-login-otp', data)
};

export const votesAPI = {
  cast: (data) => api.post('/votes/cast', data),
  getCandidates: () => api.get('/votes/candidates'),
  getStats: () => api.get('/votes/stats'),
  checkVoted: (userId) => api.get(`/votes/check-voted/${userId}`)
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats')
};

export default api;
