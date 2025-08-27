import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const checkAuthStatus = async () => {
    try {
      // Check if user is authenticated
      const response = await authService.checkAuth();
      if (response.data.status === 'success') {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async credentials => {
    try {
      const response = await authService.login(credentials);
      if (response.data.status === 'success') {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const register = async userData => {
    try {
      const response = await authService.register(userData);
      if (response.data.status === 'success') {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { user, login, register, logout, checkAuthStatus };
};
