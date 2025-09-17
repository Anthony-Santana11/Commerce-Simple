import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Lock, 
  Mail, 
  UserPlus, 
  Eye, 
  EyeOff, 
  FileText 
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  // Usar diretamente os ícones do Lucide React

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.username.length < 3 || formData.username.length > 10) {
      setError('O nome de usuário deve ter entre 3 e 10 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { confirmPassword, ...dataToSend } = formData;
      // Role será definida automaticamente como USER no contexto
      const result = await register(dataToSend);
      
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            Criar conta
          </h2>
          <p className="auth-description">
            Registre-se para começar sua jornada
          </p>
        </div>

        <div className="auth-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nome completo
                </label>
                <div className="input-container">
                  <div className="input-icon-left">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

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
                    minLength={3}
                    maxLength={10}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Entre 3 e 10 caracteres
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-container">
                  <div className="input-icon-left">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="Digite seu email"
                    value={formData.email}
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
                    minLength={6}
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
                <p className="text-sm text-gray-500 mt-1">
                  Mínimo de 6 caracteres
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar senha
                </label>
                <div className="input-container">
                  <div className="input-icon-left">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="form-input form-input-with-right-icon"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
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
                    <UserPlus size={20} />
                    Criar Conta
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="auth-link">
                  Faça login aqui
                </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
