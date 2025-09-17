import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Package, 
  Save, 
  X,
  DollarSign,
  FileText,
  Image,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageURL: ''
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/products/getAll');
      setProducts(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      imageURL: ''
    });
    setEditingProduct(null);
    setShowModal(false);
  };

  const handleAddProduct = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      imageURL: product.imageURL || ''
    });
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (editingProduct) {
        // Atualizar produto
        productData.productId = editingProduct.productId;
        await api.put('/api/admin/products/update', productData);
        setSuccess('Produto atualizado com sucesso!');
      } else {
        // Criar novo produto
        await api.post('/api/admin/products/create', productData);
        setSuccess('Produto criado com sucesso!');
      }

      resetForm();
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setError(error.response?.data || 'Erro ao salvar produto');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      return;
    }

    try {
      await api.delete('/api/admin/products/delete', { data: product });
      setSuccess('Produto excluído com sucesso!');
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setError('Erro ao excluir produto');
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
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
          <div className="text-center mb-8">
            <h1 className="hero-title">
              Dashboard
              <br />
              <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Administrativo
              </span>
            </h1>
            <p className="hero-subtitle">
              Gerencie os produtos da sua loja, {user?.username}.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <button
              onClick={handleAddProduct}
              className="add-to-cart-btn"
            >
              <Plus size={16} />
              Novo Produto
            </button>
          </div>
            
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

        {/* Stats Section */}
        <section className="products-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="flex justify-center mb-4">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <div className="stat-number">{products.length}</div>
                <div className="stat-label">Total de Produtos</div>
              </div>
              
              <div className="stat-card">
                <div className="flex justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="stat-number">
                  {formatPrice(products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0))}
                </div>
                <div className="stat-label">Valor Total</div>
              </div>
            </div>

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
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  {searchTerm ? `Resultados para "${searchTerm}"` : 'Produtos Cadastrados'}
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
                  {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
                </h3>
                <p className="empty-description">
                  {searchTerm ? 'Tente buscar por outros termos' : 'Adicione seu primeiro produto para começar'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleAddProduct}
                    className="add-to-cart-btn"
                  >
                    <Plus size={16} />
                    Adicionar Produto
                  </button>
                )}
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="btn btn-ghost btn-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl px-3 py-2 transition-all duration-200"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product)}
                            className="btn btn-ghost btn-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl px-3 py-2 transition-all duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content dashboard-modal">
            <form onSubmit={handleSubmit}>
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {editingProduct ? 'Atualize as informações do produto' : 'Adicione um novo produto ao catálogo'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nome do Produto
                    </label>
                    <div className="input-container">
                      <div className="input-icon-left">
                        <Package className="h-5 w-5" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="form-input"
                        placeholder="Digite o nome do produto"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description" className="form-label">
                      Descrição
                    </label>
                    <div className="input-container">
                      <div className="input-icon-left">
                        <FileText className="h-5 w-5" />
                      </div>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows="4"
                        className="form-textarea resize-none"
                        placeholder="Digite a descrição do produto"
                        value={formData.description}
                        onChange={handleInputChange}
                        minLength={5}
                        maxLength={200}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm text-gray-500">
                        Entre 5 e 200 caracteres
                      </p>
                      <p className="text-sm font-medium text-gray-400">
                        {formData.description.length}/200
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-group">
                      <label htmlFor="price" className="form-label">
                        Preço (R$)
                      </label>
                      <div className="input-container">
                        <div className="input-icon-left">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          required
                          className="form-input"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="imageURL" className="form-label">
                        URL da Imagem
                      </label>
                      <div className="input-container">
                        <div className="input-icon-left">
                          <Image className="h-5 w-5" />
                        </div>
                        <input
                          id="imageURL"
                          name="imageURL"
                          type="url"
                          className="form-input"
                          placeholder="https://exemplo.com/imagem.jpg"
                          value={formData.imageURL}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-8 py-6 flex flex-col sm:flex-row sm:justify-end gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary order-2 sm:order-1"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary order-1 sm:order-2 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    <span>{editingProduct ? 'Atualizar' : 'Criar'} Produto</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
