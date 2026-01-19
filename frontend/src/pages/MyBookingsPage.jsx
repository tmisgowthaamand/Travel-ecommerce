import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plane, ShoppingBag, Calendar, Users, Package, ArrowLeft, Loader2, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Footer from '../components/layout/Footer';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activity, setActivity] = useState({ bookings: [], orders: [], total_bookings: 0, total_orders: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/my-bookings' } });
      return;
    }
    fetchActivity();
  }, [isAuthenticated, navigate]);

  const fetchActivity = async () => {
    try {
      const response = await axios.get(`${API_URL}/my-activity`);
      setActivity(response.data);
    } catch (error) {
      console.error('Failed to fetch activity:', error);
      toast.error('Failed to load your records');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this journey?')) return;

    try {
      await axios.delete(`${API_URL}/bookings/${bookingId}`);
      toast.success('Journey cancelled successfully');
      fetchActivity();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      toast.error('Failed to cancel journey');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFilteredItems = () => {
    if (activeTab === 'bookings') return { bookings: activity.bookings, orders: [] };
    if (activeTab === 'orders') return { bookings: [], orders: activity.orders };
    return activity;
  };

  const filteredActivity = getFilteredItems();
  const allItems = [
    ...filteredActivity.bookings.map(b => ({ ...b, type: 'booking', sortDate: new Date(b.created_at) })),
    ...filteredActivity.orders.map(o => ({ ...o, type: 'order', sortDate: new Date(o.created_at) }))
  ].sort((a, b) => b.sortDate - a.sortDate);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1A1A1A] text-white py-12 px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <Link to="/shop" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-[#C9A87C] hover:border-[#C9A87C] transition-all">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-2 font-black uppercase">Your Gallery</p>
                <h1 className="font-serif text-4xl font-light italic">The Personal Log</h1>
                <p className="text-white/40 text-xs tracking-widest mt-2 uppercase">Curating for {user?.name}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <Link
                to="/travel"
                className="px-8 py-3 bg-[#C9A87C] text-[#1A1A1A] text-[10px] tracking-[0.3em] font-black hover:bg-white transition-all uppercase"
              >
                Plan Journey
              </Link>
              <Link
                to="/shop"
                className="px-8 py-3 border border-white/20 text-white text-[10px] tracking-[0.3em] font-black hover:bg-white hover:text-[#1A1A1A] transition-all uppercase"
              >
                Refine Gear
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 mb-24">
          {[
            { label: 'Residencies', value: activity.total_bookings, icon: Plane },
            { label: 'Provisions', value: activity.total_orders, icon: Package },
            { label: 'Confirmed', value: activity.bookings.filter(b => b.status === 'confirmed').length + activity.orders.filter(o => o.status === 'confirmed').length, icon: CheckCircle },
            { label: 'Awaiting', value: activity.bookings.filter(b => b.status === 'pending').length + activity.orders.filter(o => o.status === 'pending').length, icon: Clock },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-12 text-center group hover:bg-[#F8F5F2] transition-colors">
              <stat.icon className="w-6 h-6 text-[#C9A87C] mx-auto mb-6" />
              <p className="text-4xl font-serif text-[#1A1A1A] italic mb-2">{stat.value}</p>
              <p className="text-[10px] tracking-[0.3em] text-gray-400 font-bold uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-12 mb-24 border-b border-gray-100">
          {[
            { id: 'all', label: 'Compendium' },
            { id: 'bookings', label: 'Journeys' },
            { id: 'orders', label: 'Acquisitions' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-8 text-[10px] tracking-[0.5em] font-black uppercase transition-all relative ${activeTab === tab.id ? 'text-[#C9A87C]' : 'text-gray-300 hover:text-[#1A1A1A]'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C9A87C]" />}
            </button>
          ))}
        </div>

        {/* Dynamic Activity List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <Loader2 className="w-12 h-12 animate-spin text-[#C9A87C]" />
            <p className="text-[10px] tracking-[0.5em] text-gray-400 font-black uppercase">Synchronizing Records...</p>
          </div>
        ) : allItems.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-100">
            <h2 className="font-serif text-3xl text-[#1A1A1A] italic mb-4">A blank canvas</h2>
            <p className="text-gray-400 font-light italic mb-12">Your history of exploration is waiting to be written.</p>
            <Link
              to="/travel"
              className="inline-block px-12 py-6 bg-[#1A1A1A] text-white text-[10px] tracking-[0.4em] font-black hover:bg-[#C9A87C] transition-all uppercase"
            >
              Begin the Narrative
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {allItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="group relative">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  {item.type === 'booking' ? (
                    <>
                      <div className="lg:col-span-3 aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                        <img src={item.item_image} alt={item.item_name} className="w-full h-full object-cover" />
                      </div>
                      <div className="lg:col-span-6 space-y-4">
                        <div className="flex items-center gap-6">
                          <span className="text-[#C9A87C] text-[10px] tracking-[0.3em] font-black uppercase italic">Journeys</span>
                          <div className="w-8 h-[1px] bg-gray-200" />
                          <span className={`text-[9px] tracking-[0.2em] font-black uppercase ${item.status === 'confirmed' ? 'text-green-500' : 'text-amber-500'}`}>{item.status}</span>
                        </div>
                        <h3 className="font-serif text-3xl text-[#1A1A1A] italic font-light">{item.item_name}</h3>
                        <div className="flex gap-12 text-[10px] tracking-[0.15em] font-bold text-gray-400 uppercase">
                          <span className="flex items-center gap-3"><Calendar className="w-3 h-3 text-[#C9A87C]" /> {formatDate(item.start_date)}</span>
                          <span className="flex items-center gap-3"><Users className="w-3 h-3 text-[#C9A87C]" /> {item.guests} Guests</span>
                        </div>
                      </div>
                      <div className="lg:col-span-3 text-right space-y-6">
                        <p className="font-serif text-2xl text-[#1A1A1A] italic">${item.total_price.toLocaleString()}</p>
                        <button
                          onClick={() => handleCancelBooking(item.id)}
                          className="text-red-300 hover:text-red-500 text-[9px] tracking-[0.3em] font-black uppercase transition-colors"
                        >
                          Revoke Request
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="lg:col-span-3 grid grid-cols-2 gap-2 aspect-square">
                        {item.items.slice(0, 4).map((orderItem, idx) => (
                          <div key={idx} className="aspect-square grayscale group-hover:grayscale-0 transition-all duration-1000">
                            <img src={orderItem.product_image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="lg:col-span-6 space-y-4">
                        <div className="flex items-center gap-6">
                          <span className="text-gray-400 text-[10px] tracking-[0.3em] font-black uppercase">Acquisitions</span>
                          <div className="w-8 h-[1px] bg-gray-200" />
                          <span className={`text-[9px] tracking-[0.2em] font-black uppercase ${item.status === 'confirmed' ? 'text-green-500' : 'text-amber-500'}`}>{item.status}</span>
                        </div>
                        <h3 className="font-serif text-3xl text-[#1A1A1A] italic font-light">Order #{item.id.slice(0, 8)}</h3>
                        <p className="text-[10px] tracking-[0.15em] font-bold text-gray-400 uppercase">Registered on {formatDate(item.created_at)}</p>
                      </div>
                      <div className="lg:col-span-3 text-right space-y-4">
                        <p className="font-serif text-2xl text-[#1A1A1A] italic">${item.total.toFixed(2)}</p>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-[8px] tracking-[0.2em] px-3 py-1 bg-gray-50 text-gray-400 font-black uppercase rounded-full border border-gray-100 italic">
                            {item.payment_method === 'card' ? 'Settled via Card' : 'Settlement on Delivery'}
                          </span>
                          <p className="text-[9px] tracking-[0.2em] text-gray-300 font-bold uppercase">To be delivered to {item.shipping_address?.city}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-16 w-full h-[1px] bg-gray-100" />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookingsPage;
