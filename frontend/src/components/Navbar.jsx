import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Home,
  Settings
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/home" className="navbar-brand">
            CommerceSimple
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link 
              to="/home" 
              className={`btn btn-ghost ${isActive('/home') ? 'text-blue-600' : ''}`}
              onClick={closeMenu}
            >
              <Home size={18} />
              Home
            </Link>

            {user?.role === 'ADMIN' && (
              <Link 
                to="/dashboard" 
                className={`btn btn-ghost ${isActive('/dashboard') ? 'text-blue-600' : ''}`}
                onClick={closeMenu}
              >
                <Settings size={18} />
                Dashboard
              </Link>
            )}

            <Link 
              to="/cart" 
              className={`btn btn-ghost relative ${isActive('/cart') ? 'text-blue-600' : ''}`}
              onClick={closeMenu}
            >
              <ShoppingCart size={18} />
              Carrinho
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-2 text-sm">
              <User size={16} />
              <span className="text-gray-600">
                {user?.username}
                {user?.role === 'ADMIN' && ' (Admin)'}
              </span>
            </div>

            <button 
              onClick={handleLogout}
              className="btn btn-ghost text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>

          <button className="navbar-toggle md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
