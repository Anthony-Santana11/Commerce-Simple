import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Package,
  CreditCard,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, 
    loading, 
    removeFromCart, 
    updateQuantity,
    clearCart, 
    getCartTotal, 
    getCartItemsCount 
  } = useCart();
  const { user } = useAuth();

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Tem certeza que deseja remover este item do carrinho?')) {
      await removeFromCart(itemId);
    }
  };

  const handleIncreaseQuantity = async (itemId, currentQuantity) => {
    await updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = async (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      await updateQuantity(itemId, currentQuantity - 1);
    } else {
      // Se a quantidade for 1, remove o item
      if (window.confirm('Deseja remover este item do carrinho?')) {
        await removeFromCart(itemId);
      }
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Tem certeza que deseja limpar todo o carrinho?')) {
      await clearCart();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const cartTotal = getCartTotal();
  const itemsCount = getCartItemsCount();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <Link to="/home" className="btn btn-ghost flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
              <ArrowLeft size={20} />
              Voltar às Compras
            </Link>
            
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="btn btn-secondary flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
              >
                <Trash2 size={20} />
                Limpar Carrinho
              </button>
            )}
          </div>
          
          <h1 className="hero-title">
            Seu
            <br />
            <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Carrinho
            </span>
          </h1>
          <p className="hero-subtitle">
            {itemsCount} {itemsCount === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="products-section">
        <div className="container">
          {cartItems.length === 0 ? (
            // Empty Cart
            <div className="empty-state">
              <div className="empty-icon">
                <ShoppingCart size={32} />
              </div>
              <h3 className="empty-title">
                Seu carrinho está vazio
              </h3>
              <p className="empty-description">
                Adicione alguns produtos para começar suas compras!
              </p>
              <Link to="/home" className="add-to-cart-btn">
                <Package size={16} />
                Ver Produtos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="section-header">
                  <div>
                    <h2 className="section-title">Itens no Carrinho</h2>
                    <div className="section-subtitle"></div>
                  </div>
                  <div className="products-count">
                    {itemsCount} {itemsCount === 1 ? 'item' : 'itens'}
                  </div>
                </div>

                <div className="products-grid">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="cart-product-card">
                      <img
                        src={item.product?.imageURL || '/api/placeholder/300/300'}
                        alt={item.product?.name || item.name}
                        className="cart-product-image"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGQUZDIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEzMy40MzEgMTAwIDEyMCAxMTMuNDMxIDEyMCAxMzBDMTIwIDE0Ni41NjkgMTMzLjQzMSAxNjAgMTUwIDE2MEMxNjYuNTY5IDE2MCAxODAgMTQ2LjU2OSAxODAgMTMwQzE4MCAxMTMuNDMxIDE2Ni41NjkgMTAwIDE1MCAxMDBaIiBmaWxsPSIjRTVFN0VCIi8+CjxwYXRoIGQ9Ik0xMjAgMTgwSDM0VjE2MEgxMjBWMTgwWiIgZmlsbD0iI0U1RTdFQiIvPgo8L3N2Zz4K';
                        }}
                      />
                      <div className="cart-product-info">
                        <h3 className="cart-product-name">{item.product?.name || item.name}</h3>
                        <p className="cart-product-description">{item.product?.description}</p>
                        
                        {/* Quantity Controls */}
                        <div className="cart-quantity-controls">
                          <div className="cart-quantity-buttons">
                            <button
                              className="cart-quantity-btn"
                              onClick={() => handleDecreaseQuantity(item.cartItemId, item.quantity)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="cart-quantity-display">
                              {item.quantity}
                            </span>
                            <button
                              className="cart-quantity-btn"
                              onClick={() => handleIncreaseQuantity(item.cartItemId, item.quantity)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <div className="cart-unit-price">
                            <div className="cart-unit-price-label">Preço unitário</div>
                            <div className="cart-unit-price-value">
                              {formatPrice(item.product?.price || 0)}
                            </div>
                          </div>
                        </div>

                        <div className="cart-product-footer">
                          <div className="cart-total-price">
                            <span className="cart-total-label">Total:</span>
                            <span className="cart-total-value">
                              {formatPrice((item.product?.price || 0) * item.quantity)}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.cartItemId)}
                            className="cart-remove-btn"
                          >
                            <Trash2 size={16} />
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                {/* Order Summary */}
                <div className="order-summary-card sticky top-24">
                  <div className="order-summary-header">
                    <h3 className="order-summary-title">Resumo do Pedido</h3>
                  </div>
                  <div className="order-summary-body">
                    <div className="order-item">
                      <span className="order-item-label">Subtotal:</span>
                      <span className="order-item-value">{formatPrice(cartTotal)}</span>
                    </div>
                    
                    <div className="order-item">
                      <span className="order-item-label">Frete:</span>
                      <span className="order-item-value" style={{ color: '#10b981', background: '#d1fae5', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600' }}>
                        Grátis
                      </span>
                    </div>
                    
                    <div className="order-total">
                      <div className="flex justify-between items-center">
                        <span className="order-total-label">Total:</span>
                        <span className="order-total-value">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>
                    </div>

                    <button
                      className="checkout-btn"
                      disabled
                    >
                      <CreditCard size={20} style={{ marginRight: '0.5rem' }} />
                      Finalizar Compra
                    </button>
                    
                    <div className="checkout-notice">
                      <p className="checkout-notice-text">
                        <span style={{ fontWeight: '600' }}>Funcionalidade de checkout</span><br />
                        será implementada em breve
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="customer-info-card">
                  <div className="customer-info-header">
                    <h3 className="customer-info-title">Dados do Cliente</h3>
                  </div>
                  <div className="customer-info-body">
                    <div className="flex items-center">
                      <div className="customer-avatar">
                        <span className="customer-avatar-text">
                          {user?.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="customer-details">
                        <p className="customer-name">{user?.username}</p>
                        <p className="customer-role">
                          {user?.role === 'ADMIN' ? 'Administrador' : 'Cliente'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
