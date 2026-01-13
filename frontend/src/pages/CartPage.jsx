import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShopHeader from '../components/shop/ShopHeader';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, updateQuantity, removeFromCart, loading } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA'
  });

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemove = async (productId, productName) => {
    const success = await removeFromCart(productId);
    if (success) {
      toast.success(`${productName} removed from cart`);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setCheckingOut(true);
    
    try {
      await axios.post(`${API_URL}/api/orders`, {
        shipping_address: shippingInfo
      });
      toast.success('Order placed successfully!');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  const shipping = cart.total >= 100 ? 0 : 9.99;
  const tax = cart.total * 0.08;
  const total = cart.total + shipping + tax;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShopHeader />
        <div className="pt-24">
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your cart</h1>
            <p className="text-gray-600 mb-8">Please sign in to add items to your cart and checkout</p>
            <Link
              to="/login"
              state={{ from: '/shop/cart' }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-colors"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          {cart.items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items yet</p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-colors"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product_id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex gap-6">
                      <Link to={`/shop/product/${item.product_id}`} className="flex-shrink-0">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link to={`/shop/product/${item.product_id}`}>
                          <h3 className="font-medium text-gray-900 hover:text-amber-600 transition-colors">
                            {item.product_name}
                          </h3>
                        </Link>
                        <p className="text-amber-600 font-medium mt-1">${item.price}</p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(item.product_id, item.product_name)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${item.subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mt-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cart.item_count} items)</span>
                      <span className="font-medium">${cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-gray-500 mb-6">
                      Add ${(100 - cart.total).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  {!showCheckout ? (
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  ) : (
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <h3 className="font-medium text-gray-900">Shipping Address</h3>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                        required
                      />
                      <button
                        type="submit"
                        disabled={checkingOut}
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        {checkingOut ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Place Order'
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
