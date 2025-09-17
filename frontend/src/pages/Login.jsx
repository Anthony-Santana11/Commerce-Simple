import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  // Usar diretamente os ícones do Lucide React

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        navigate('/home');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-hero">
      <div className="auth-container">
        <div className="text-center mb-10">
          <div className="auth-logo">
            <span className="text-2xl font-bold text-white">CS</span>
          </div>
          <h1 className="auth-title auth-title-gradient">
            CommerceSimple
          </h1>
          <h2 className="auth-subtitle">
            Bem-vindo de volta
          </h2>
          <p className="auth-description">
            Faça login para continuar sua jornada
          </p>
        </div>

        <div className="auth-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}

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
                className="btn btn-primary w-full btn-lg"
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <LogIn size={20} />
                    Entrar na Conta
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p className="text-gray-600">
                Não tem uma conta?{' '}
                <Link to="/register" className="auth-link">
                  Registre-se aqui
                </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
