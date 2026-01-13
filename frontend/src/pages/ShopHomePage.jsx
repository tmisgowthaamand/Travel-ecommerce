import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShopHeader from '../components/shop/ShopHeader';
import { ShoppingCart, Star, ArrowRight, Sparkles, Truck, Shield, RefreshCw, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ShopHomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [allRes, featuredRes] = await Promise.all([
        axios.get(`${API_URL}/api/products`),
        axios.get(`${API_URL}/api/products?featured=true`)
      ]);
      setProducts(allRes.data);
      setFeaturedProducts(featuredRes.data);
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

  const categories = [
    { name: 'Luggage', image: 'https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?w=600&q=80', count: 3 },
    { name: 'Backpacks', image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&q=80', count: 3 },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1555337159-d399aaa99955?w=600&q=80', count: 4 },
    { name: 'Comfort', image: 'https://images.unsplash.com/photo-1523496922380-91d5afba98a3?w=600&q=80', count: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full text-amber-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              New Collection 2025
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Travel in <span className="text-amber-400">Style</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Premium luggage and accessories designed for the modern traveler. Explore our curated collection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop/category/luggage"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 flex items-center gap-2 group"
              >
                Shop Luggage
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/travel"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all duration-300 border border-white/30"
              >
                Explore Travel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: 'Free Shipping', sub: 'On orders $100+' },
              { icon: Shield, text: '5-Year Warranty', sub: 'Premium protection' },
              { icon: RefreshCw, text: '30-Day Returns', sub: 'Easy returns' },
              { icon: Tag, text: 'Best Prices', sub: 'Price match guarantee' },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{feature.text}</p>
                  <p className="text-sm text-gray-500">{feature.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find the perfect gear for your next adventure</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop/category/${category.name.toLowerCase()}`}
                className="group relative h-64 rounded-2xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-gray-300 text-sm">{category.count} products</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Our most popular travel essentials</p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="group">
                  <Link to={`/shop/product/${product.id}`} className="block relative overflow-hidden rounded-2xl mb-4">
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {product.original_price && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                        Sale
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link to={`/shop/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews_count})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">${product.price}</span>
                    {product.original_price && (
                      <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Products</h2>
            <p className="text-gray-600">Browse our complete collection</p>
          </div>
          
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
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
                      <h3 className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
                <li><Link to="/shop/category/luggage" className="text-gray-400 hover:text-white transition-colors">Luggage</Link></li>
                <li><Link to="/shop/category/backpacks" className="text-gray-400 hover:text-white transition-colors">Backpacks</Link></li>
                <li><Link to="/shop/category/accessories" className="text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Travel</h3>
              <ul className="space-y-2">
                <li><Link to="/travel" className="text-gray-400 hover:text-white transition-colors">Explore</Link></li>
                <li><Link to="/travel/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
                <li><Link to="/travel/experiences" className="text-gray-400 hover:text-white transition-colors">Experiences</Link></li>
                <li><Link to="/travel/rentals" className="text-gray-400 hover:text-white transition-colors">Rentals</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/travel/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/travel/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 Wanderlust & Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopHomePage;
