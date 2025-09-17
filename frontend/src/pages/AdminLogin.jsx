import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Eye, EyeOff, Shield } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Usar diretamente os ícones do Lucide React

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        // Verificar se o usuário é admin
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        if (userData.role === 'ADMIN') {
          navigate('/dashboard');
        } else {
          setError('Acesso negado. Apenas administradores podem acessar esta área.');
          // Fazer logout se não for admin
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_data');
          localStorage.removeItem('token_expires_in');
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-hero">
      <div className="auth-container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="auth-logo auth-logo-admin">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="auth-title">
            Área Administrativa
          </h1>
          <p className="auth-description">
            Faça login para acessar o painel de administração
          </p>
        </div>

        {/* Form */}
        <div className="auth-card">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Nome de usuário
              </label>
              <div className="input-container">
                  <div className="input-icon-left">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="form-input"
                  placeholder="Digite seu nome de usuário"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
                <div className="input-container">
                  <div className="input-icon-left">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input form-input-with-right-icon"
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-danger w-full btn-lg"
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <Shield size={20} />
                  Entrar como Administrador
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p className="text-sm text-gray-600">
              Não é um administrador?{' '}
              <a 
                href="/login" 
                className="auth-link"
              >
                Faça login como usuário
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="auth-footer-text">
            Sistema de E-commerce - Painel Administrativo
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
