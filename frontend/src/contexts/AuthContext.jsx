import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/user', {
        username,
        password
      });

      const { acess_token, expires_in, username: responseUsername, role, userId } = response.data;
      
      localStorage.setItem('access_token', acess_token);
      localStorage.setItem('token_expires_in', expires_in);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${acess_token}`;
      
      // Usar dados reais do backend
      const userData = {
        username: responseUsername,
        role: role,
        userId: userId
      };
      
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        message: error.response?.data || 'Erro ao fazer login. Verifique suas credenciais.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      // Sempre definir role como USER no registro
      const dataToSend = {
        ...userData,
        role: 'USER'
      };
      
      const response = await api.post('/register/user', dataToSend);
      
      return { 
        success: true, 
        message: response.data.message || 'Usuário registrado com sucesso!' 
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { 
        success: false, 
        message: error.response?.data || 'Erro ao registrar usuário.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token_expires_in');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
