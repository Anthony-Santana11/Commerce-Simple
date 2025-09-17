import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { User, Lock, Eye, EyeOff, Shield, UserPlus, X, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [createUserData, setCreateUserData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    role: 'ADMIN'
  });
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [createUserError, setCreateUserError] = useState('');
  const [createUserSuccess, setCreateUserSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateUserChange = (e) => {
    setCreateUserData({
      ...createUserData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetCreateUserForm = () => {
    setCreateUserData({
      username: '',
      password: '',
      email: '',
      name: '',
      role: 'ADMIN'
    });
    setCreateUserError('');
    setCreateUserSuccess('');
    setShowCreateUser(false);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateUserError('');
    setCreateUserSuccess('');
    setCreateUserLoading(true);

    try {
      await api.post('/register/user', createUserData);
      setCreateUserSuccess('Usuário administrador criado com sucesso!');
      resetCreateUserForm();
      setTimeout(() => setCreateUserSuccess(''), 3000);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setCreateUserError(error.response?.data || 'Erro ao criar usuário');
      setTimeout(() => setCreateUserError(''), 5000);
    } finally {
      setCreateUserLoading(false);
    }
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

          {/* Create User Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowCreateUser(true)}
              className="btn btn-secondary w-full"
            >
              <UserPlus size={20} />
              Criar Usuário Administrador
            </button>
          </div>

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

      {/* Create User Modal */}
      {showCreateUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleCreateUser}>
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <UserPlus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Criar Usuário Administrador
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Crie uma nova conta de administrador
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={resetCreateUserForm}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Alert Messages */}
                {createUserError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{createUserError}</p>
                  </div>
                )}

                {createUserSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-600 text-sm">{createUserSuccess}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="create-username" className="form-label">
                        Nome de Usuário
                      </label>
                      <div className="input-container">
                        <div className="input-icon-left">
                          <User className="h-5 w-5" />
                        </div>
                        <input
                          id="create-username"
                          name="username"
                          type="text"
                          required
                          className="form-input"
                          placeholder="Digite o nome de usuário"
                          value={createUserData.username}
                          onChange={handleCreateUserChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="create-email" className="form-label">
                        Email
                      </label>
                      <div className="input-container">
                        <div className="input-icon-left">
                          <Mail className="h-5 w-5" />
                        </div>
                        <input
                          id="create-email"
                          name="email"
                          type="email"
                          required
                          className="form-input"
                          placeholder="Digite o email"
                          value={createUserData.email}
                          onChange={handleCreateUserChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="create-name" className="form-label">
                      Nome Completo
                    </label>
                    <div className="input-container">
                      <div className="input-icon-left">
                        <User className="h-5 w-5" />
                      </div>
                      <input
                        id="create-name"
                        name="name"
                        type="text"
                        required
                        className="form-input"
                        placeholder="Digite o nome completo"
                        value={createUserData.name}
                        onChange={handleCreateUserChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="create-password" className="form-label">
                      Senha
                    </label>
                    <div className="input-container">
                      <div className="input-icon-left">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        id="create-password"
                        name="password"
                        type="password"
                        required
                        className="form-input"
                        placeholder="Digite a senha"
                        value={createUserData.password}
                        onChange={handleCreateUserChange}
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-8 py-6 flex flex-col sm:flex-row sm:justify-end gap-4">
                  <button
                    type="button"
                    onClick={resetCreateUserForm}
                    className="btn btn-secondary order-2 sm:order-1"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={createUserLoading}
                    className="btn btn-primary order-1 sm:order-2 flex items-center justify-center gap-2"
                  >
                    {createUserLoading ? (
                      <div className="spinner"></div>
                    ) : (
                      <>
                        <UserPlus size={18} />
                        <span>Criar Administrador</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
