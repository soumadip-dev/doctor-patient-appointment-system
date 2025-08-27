import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
