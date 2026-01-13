import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ShopHeader from '../components/shop/ShopHeader';
import { ShoppingCart, Star, ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = category
        ? `${API_URL}/products?category=${category}`
        : `${API_URL}/products`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    const success = await addToCart(product.id);
    if (success) {
      toast.success(`${product.name} added to cart!`);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return b.featured - a.featured;
    }
  });

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">{categoryTitle}</h1>
          <p className="text-gray-600 mt-2">{products.length} products found</p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-amber-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found in this category</p>
              <Link to="/shop" className="mt-4 inline-flex items-center gap-2 text-amber-600 font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow">
                  <Link to={`/shop/product/${product.id}`} className="block relative overflow-hidden rounded-xl mb-4">
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {product.original_price && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                      </span>
                    )}
                  </Link>
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <Link to={`/shop/product/${product.id}`}>
                      <h3 className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({product.reviews_count})</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">${product.price}</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-400 line-through">${product.original_price}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-10 h-10 bg-amber-100 hover:bg-amber-500 text-amber-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <ShoppingCart className="w-5 h-5" />
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

export default CategoryPage;
