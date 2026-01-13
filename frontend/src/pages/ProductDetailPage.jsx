import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShopHeader from '../components/shop/ShopHeader';
import { ShoppingCart, Star, ArrowLeft, Minus, Plus, Heart, Truck, Shield, RefreshCw, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Product not found');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to cart');
      navigate('/login', { state: { from: `/shop/product/${productId}` } });
      return;
    }

    setAddingToCart(true);
    const success = await addToCart(product.id, quantity);
    if (success) {
      toast.success(`Added ${quantity} ${product.name} to cart!`);
    }
    setAddingToCart(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShopHeader />
        <div className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse grid md:grid-cols-2 gap-12">
              <div className="bg-gray-200 rounded-3xl h-[500px]" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />

      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link
              to={`/shop/category/${product.category}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-600 hover:text-amber-600 font-medium rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
            <span className="text-gray-300">/</span>
            <Link to={`/shop/category/${product.category}`} className="text-gray-500 hover:text-gray-700 capitalize">
              {product.category}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.original_price && (
                <span className="absolute top-6 left-6 px-4 py-2 bg-red-500 text-white font-medium rounded-full">
                  {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                </span>
              )}
              <button className="absolute top-6 right-6 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating} ({product.reviews_count} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                {product.original_price && (
                  <span className="text-xl text-gray-400 line-through">${product.original_price}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Product details/Features */}
              {product.details && product.details.length > 0 && (
                <div className="space-y-3 pt-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Key Features</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.in_stock ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock || addingToCart}
                  className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders $100+</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">5-Year Warranty</p>
                  <p className="text-xs text-gray-500">Premium protection</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">30-Day Returns</p>
                  <p className="text-xs text-gray-500">Easy returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Link
              to={`/shop/category/${product.category}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
