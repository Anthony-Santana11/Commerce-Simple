import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se requerer admin e o usuário não for admin, redireciona para home
  if (requireAdmin && user?.role !== 'ADMIN') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;




