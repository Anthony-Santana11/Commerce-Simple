import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  const fetchCartItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await api.get('/api/cart/get-items', {
        params: { userid: user.userId }
      });
      setCartItems(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar itens do carrinho:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) return { success: false, message: 'Usuário não autenticado' };
    
    // Se não tem userId, precisa fazer login novamente
    if (!user.userId) {
      return { success: false, message: 'Sessão expirada. Faça login novamente.' };
    }
    
    try {
      const cartItem = {
        product: product,
        quantity: quantity,
        name: product.name
      };

      await api.post('/api/cart/', cartItem, {
        params: { userid: user.userId }
      });

      await fetchCartItems();
      
      return { success: true, message: 'Produto adicionado ao carrinho!' };
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      return { 
        success: false, 
        message: error.response?.data || 'Erro ao adicionar produto ao carrinho' 
      };
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) return { success: false, message: 'Usuário não autenticado' };
    
    try {
      await api.delete(`/api/cart/${itemId}`);
      
      await fetchCartItems();
      
      return { success: true, message: 'Item removido do carrinho!' };
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      return { 
        success: false, 
        message: error.response?.data || 'Erro ao remover item do carrinho' 
      };
    }
  };

  const clearCart = async () => {
    if (!user) return { success: false, message: 'Usuário não autenticado' };
    
    try {
      await api.delete('/api/cart/clear', {
        params: { userid: user.userId }
      });
      
      setCartItems([]);
      
      return { success: true, message: 'Carrinho limpo com sucesso!' };
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      return { 
        success: false, 
        message: error.response?.data || 'Erro ao limpar carrinho' 
      };
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.product?.price || 0) * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (!user) return { success: false, message: 'Usuário não autenticado' };
    
    try {
      await api.put(`/api/cart/${itemId}/quantity`, null, {
        params: { quantity: newQuantity }
      });
      
      await fetchCartItems();
      
      return { success: true, message: 'Quantidade atualizada!' };
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      return { 
        success: false, 
        message: error.response?.data || 'Erro ao atualizar quantidade' 
      };
    }
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    fetchCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
