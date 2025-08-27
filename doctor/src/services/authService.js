import api from './api';

export const authService = {
  login: credentials => api.post('/auth/login', credentials),
  register: userData => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  checkAuth: () => api.get('/auth/is-auth'),
};
