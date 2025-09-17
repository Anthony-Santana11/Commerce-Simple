import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import api from '../services/api';
import { ShoppingCart, Plus, Search, Package } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/products/');
      setProducts(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    setError('');
    setSuccess('');
    
    const result = await addToCart(product, 1);
    
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Encontre Produtos que
            <br />
            <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Combinam
            </span>
            <br />
            com seu Estilo
          </h1>
          <p className="hero-subtitle">
            Navegue pela nossa diversa gama de produtos cuidadosamente selecionados, 
            projetados para destacar sua individualidade e atender ao seu senso de estilo.
          </p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="relative">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Alert Messages */}
      {error && (
        <div className="alert alert-error">
          <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                {searchTerm ? `Resultados para "${searchTerm}"` : 'Nossos Produtos'}
              </h2>
              <div className="section-subtitle"></div>
            </div>
            <div className="products-count">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Carregando produtos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Package size={32} />
              </div>
              <h3 className="empty-title">
                {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto disponível'}
              </h3>
              <p className="empty-description">
                {searchTerm ? 'Tente buscar por outros termos' : 'Volte mais tarde para ver novos produtos'}
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.productId} className="product-card">
                  <img
                    src={product.imageURL || '/api/placeholder/300/300'}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGQUZDIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEzMy40MzEgMTAwIDEyMCAxMTMuNDMxIDEyMCAxMzBDMTIwIDE0Ni41NjkgMTMzLjQzMSAxNjAgMTUwIDE2MEMxNjYuNTY5IDE2MCAxODAgMTQ2LjU2OSAxODAgMTMwQzE4MCAxMTMuNDMxIDE2Ni41NjkgMTAwIDE1MCAxMDBaIiBmaWxsPSIjRTVFN0VCIi8+CjxwYXRoIGQ9Ik0xMjAgMTgwSDM0VjE2MEgxMjBWMTgwWiIgZmlsbD0iI0U1RTdFQiIvPgo8L3N2Zz4K';
                    }}
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">{formatPrice(product.price)}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="add-to-cart-btn"
                      >
                        <Plus size={16} />
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;