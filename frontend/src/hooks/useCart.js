import { useContext } from 'react';
import { CartContext } from '../contexts/CartContextDefinition';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};
