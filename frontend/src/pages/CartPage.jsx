import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShopHeader from '../components/shop/ShopHeader';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag, ArrowRight, Loader2, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, updateQuantity, removeFromCart, fetchCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA'
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'cod'
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    holder: ''
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

  const handleNextStep = () => {
    if (checkoutStep === 2) {
      // Validate shipping
      if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city) {
        toast.error('Please complete shipping information');
        return;
      }
    }
    setCheckoutStep(checkoutStep + 1);
  };

  const handleBackStep = () => {
    setCheckoutStep(checkoutStep - 1);
  };

  const handleFinalCheckout = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (!cardInfo.number || !cardInfo.expiry || !cardInfo.cvv) {
        toast.error('Please complete card details');
        return;
      }
    }

    setCheckingOut(true);

    try {
      await axios.post(`${API_URL}/orders`, {
        shipping_address: shippingInfo,
        payment_method: paymentMethod,
        payment_details: paymentMethod === 'card' ? { last4: cardInfo.number.slice(-4) } : null
      });
      await fetchCart();
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
  const totalValue = cart.total + shipping + tax;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <ShopHeader />
        <div className="pt-32 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-8 py-16 bg-white shadow-2xl rounded-[32px] text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-amber-500" />
            </div>
            <h1 className="font-serif text-3xl italic text-gray-900 mb-4">Establishing Identity</h1>
            <p className="text-gray-400 font-light mb-10 text-sm tracking-wide">Please sign in to your member portal to access your curated selection.</p>
            <Link
              to="/login"
              state={{ from: '/shop/cart' }}
              className="block w-full py-5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.4em] font-black uppercase hover:bg-[#C9A87C] transition-all duration-500 rounded-xl"
            >
              Verify Credentials
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-24">
      <ShopHeader />

      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">

          {/* Checkout Stepper */}
          {checkoutStep > 1 && (
            <div className="flex items-center justify-center mb-16 gap-12">
              <div className="flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${checkoutStep >= 2 ? 'bg-[#1A1A1A] text-white' : 'bg-gray-200 text-gray-400'}`}>1</div>
                <span className={`text-[9px] tracking-[0.2em] font-black uppercase ${checkoutStep >= 2 ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>Logistics</span>
              </div>
              <div className="w-24 h-[1px] bg-gray-200" />
              <div className="flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${checkoutStep === 3 ? 'bg-[#1A1A1A] text-white' : 'bg-gray-200 text-gray-400'}`}>2</div>
                <span className={`text-[9px] tracking-[0.2em] font-black uppercase ${checkoutStep === 3 ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>Settlement</span>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Left Column: Logic Flow */}
            <div className="lg:col-span-8">
              {checkoutStep === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-end justify-between mb-8 pb-8 border-b border-gray-100">
                    <div>
                      <p className="text-[#C9A87C] text-[10px] tracking-[0.4em] mb-4 font-black uppercase">Acquisition</p>
                      <h1 className="font-serif text-5xl italic text-gray-900">Your Selection</h1>
                    </div>
                    <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase font-black">{cart.item_count} Unique Items</p>
                  </div>

                  {cart.items.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[40px] shadow-sm border border-gray-50">
                      <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-8" />
                      <h2 className="font-serif text-2xl italic text-gray-900 mb-4">No items curated</h2>
                      <p className="text-gray-400 font-light mb-12">Return to the collection to refine your gear.</p>
                      <Link
                        to="/shop"
                        className="inline-block px-12 py-5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.4em] font-black uppercase hover:bg-[#C9A87C] transition-all duration-500 rounded-xl"
                      >
                        Explore Gear
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.items.map((item) => (
                        <div key={item.product_id} className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-gray-100">
                          <div className="flex gap-10">
                            <Link to={`/shop/product/${item.product_id}`} className="flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="w-full h-full object-cover"
                              />
                            </Link>
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <div>
                                <Link to={`/shop/product/${item.product_id}`}>
                                  <h3 className="font-serif text-2xl italic text-gray-900 group-hover:text-[#C9A87C] transition-colors mb-2">
                                    {item.product_name}
                                  </h3>
                                </Link>
                                <p className="text-[#C9A87C] font-black text-[11px] tracking-widest uppercase">${item.price}</p>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
                                  <button
                                    onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-900"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                                  <button
                                    onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-900"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => handleRemove(item.product_id, item.product_name)}
                                  className="text-red-300 hover:text-red-500 transition-colors flex items-center gap-2 text-[9px] tracking-[0.2em] font-black uppercase italic"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Remove
                                </button>
                              </div>
                            </div>
                            <div className="text-right py-1">
                              <p className="font-serif text-2xl italic text-gray-900">${item.subtotal.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {checkoutStep === 2 && (
                <div className="space-y-12 animate-reveal-up bg-white p-12 rounded-[48px] shadow-sm border border-gray-50">
                  <div>
                    <p className="text-[#C9A87C] text-[10px] tracking-[0.4em] mb-4 font-black uppercase italic">Logistics</p>
                    <h2 className="font-serif text-4xl italic text-gray-900">Destination Details</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] text-gray-900/40 font-black uppercase italic ml-1">Member Name</label>
                      <input
                        type="text"
                        placeholder="E.G. JULIAN VANE"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                        className="w-full pl-0 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-[#C9A87C] outline-none text-sm transition-all font-light placeholder:text-gray-200"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] text-gray-900/40 font-black uppercase italic ml-1">Street Address</label>
                      <input
                        type="text"
                        placeholder="CURATED DISTRICT 42"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full pl-0 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-[#C9A87C] outline-none text-sm transition-all font-light placeholder:text-gray-200"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] text-gray-900/40 font-black uppercase italic ml-1">City</label>
                      <input
                        type="text"
                        placeholder="NEW YORK"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full pl-0 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-[#C9A87C] outline-none text-sm transition-all font-light placeholder:text-gray-200"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] tracking-[0.3em] text-gray-900/40 font-black uppercase italic ml-1">State</label>
                        <input
                          type="text"
                          placeholder="NY"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className="w-full pl-0 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-[#C9A87C] outline-none text-sm transition-all font-light placeholder:text-gray-200"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] tracking-[0.3em] text-gray-900/40 font-black uppercase italic ml-1">ZIP Code</label>
                        <input
                          type="text"
                          placeholder="10001"
                          value={shippingInfo.zip}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                          className="w-full pl-0 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-[#C9A87C] outline-none text-sm transition-all font-light placeholder:text-gray-200"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 pt-10">
                    <button onClick={handleBackStep} className="flex-1 py-5 border border-gray-100 text-gray-400 text-[10px] tracking-[0.4em] font-black uppercase hover:bg-gray-50 transition-all rounded-xl">Back</button>
                    <button onClick={handleNextStep} className="flex-[2] py-5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.4em] font-black uppercase hover:bg-[#C9A87C] transition-all rounded-xl shadow-xl">Proceed to Settlement</button>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && (
                <div className="space-y-12 animate-reveal-up bg-white p-12 rounded-[48px] shadow-sm border border-gray-50">
                  <div>
                    <p className="text-[#C9A87C] text-[10px] tracking-[0.4em] mb-4 font-black uppercase italic">Settlement</p>
                    <h2 className="font-serif text-4xl italic text-gray-900">Secure Protocol</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-10 rounded-[32px] border-2 transition-all text-left flex flex-col gap-6 group ${paymentMethod === 'card' ? 'border-[#C9A87C] bg-amber-50/10' : 'border-gray-50 hover:border-gray-100'}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'bg-[#C9A87C] text-white' : 'bg-gray-50 text-gray-400'}`}>
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl italic text-gray-900 mb-2">Credit / Debit</h4>
                        <p className="text-gray-400 text-xs font-light">Instant verification through encrypted channels.</p>
                      </div>
                      {paymentMethod === 'card' && <CheckCircle2 className="w-5 h-5 text-[#C9A87C] mt-2" />}
                    </button>

                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-10 rounded-[32px] border-2 transition-all text-left flex flex-col gap-6 group ${paymentMethod === 'cod' ? 'border-[#C9A87C] bg-amber-50/10' : 'border-gray-50 hover:border-gray-100'}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'bg-[#C9A87C] text-white' : 'bg-gray-50 text-gray-400'}`}>
                        <Wallet className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl italic text-gray-900 mb-2">Cash on Delivery</h4>
                        <p className="text-gray-400 text-xs font-light">Physical settlement upon hand-delivery.</p>
                      </div>
                      {paymentMethod === 'cod' && <CheckCircle2 className="w-5 h-5 text-[#C9A87C] mt-2" />}
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="pt-8 space-y-8 animate-fade-in">
                      <div className="space-y-3">
                        <label className="text-[10px] tracking-[0.3em] text-gray-900/40 font-black uppercase italic ml-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="•••• •••• •••• ••••"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                          className="w-full pl-0 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-[#C9A87C] outline-none text-sm transition-all font-light tracking-[0.3em] placeholder:text-gray-200"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] tracking-[0.3em] text-gray-900/40 font-black uppercase italic ml-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                            className="w-full pl-0 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-[#C9A87C] outline-none text-sm transition-all font-light placeholder:text-gray-200"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] tracking-[0.3em] text-gray-900/40 font-black uppercase italic ml-1">Secret (CVV)</label>
                          <input
                            type="text"
                            placeholder="•••"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            className="w-full pl-0 pr-4 py-4 bg-transparent border-b border-gray-100 focus:border-[#C9A87C] outline-none text-sm transition-all font-light placeholder:text-gray-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-6 pt-10">
                    <button onClick={handleBackStep} className="flex-1 py-5 border border-gray-100 text-gray-400 text-[10px] tracking-[0.4em] font-black uppercase hover:bg-gray-50 transition-all rounded-xl">Back</button>
                    <button
                      onClick={handleFinalCheckout}
                      disabled={checkingOut}
                      className="flex-[2] py-5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.4em] font-black uppercase hover:bg-[#C9A87C] transition-all rounded-xl shadow-xl flex items-center justify-center gap-4"
                    >
                      {checkingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                      {checkingOut ? 'Authenticating...' : 'Authorize Transaction'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Investment Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-[#1A1A1A] text-white p-12 rounded-[48px] shadow-2xl space-y-10">
                <h3 className="font-serif text-3xl italic mb-10 pb-8 border-b border-white/5">Abstract</h3>

                <div className="space-y-6">
                  <div className="flex justify-between text-white/50 text-[10px] tracking-[0.2em] uppercase font-black">
                    <span>Subtotal</span>
                    <span className="text-white">${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/50 text-[10px] tracking-[0.2em] uppercase font-black">
                    <span>Logistics</span>
                    <span className="text-white">
                      {shipping === 0 ? <span className="text-[#C9A87C]">COMPLIMENTARY</span> : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/50 text-[10px] tracking-[0.2em] uppercase font-black">
                    <span>Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5">
                  <div className="flex justify-between items-end mb-10">
                    <span className="text-[#C9A87C] text-[10px] tracking-[0.5em] font-black uppercase">Total Investment</span>
                    <span className="font-serif text-5xl italic">${totalValue.toFixed(2)}</span>
                  </div>

                  {checkoutStep === 1 && cart.items.length > 0 && (
                    <button
                      onClick={handleNextStep}
                      className="w-full py-6 bg-[#C9A87C] text-[#1A1A1A] text-[10px] tracking-[0.4em] font-black uppercase hover:bg-white transition-all duration-500 rounded-xl shadow-xl flex items-center justify-center gap-4 group"
                    >
                      Begin Logistics
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-[9px] tracking-[0.2em] text-white/20 text-center font-bold uppercase italic mt-4 leading-relaxed">
                    Add ${(100 - cart.total).toFixed(2)} for complimentary logistics.
                  </p>
                )}
              </div>

              <div className="mt-12 space-y-12">
                <Link to="/shop" className="flex items-center gap-4 text-gray-400 hover:text-gray-900 transition-colors group">
                  <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] font-black uppercase italic">Refine Selection</span>
                </Link>
                <div className="p-8 border-2 border-dashed border-gray-100 rounded-[32px] text-center">
                  <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-[10px] tracking-[0.2em] text-gray-900 font-black uppercase mb-1">Encrypted Portal</p>
                  <p className="text-gray-400 text-[9px] tracking-[0.1em] uppercase font-bold">256-Bit SSL Secured Transaction</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
