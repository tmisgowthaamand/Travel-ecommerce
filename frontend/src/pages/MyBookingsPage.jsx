import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plane, ShoppingBag, Calendar, MapPin, Users, Package, ArrowLeft, Loader2, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
      const response = await axios.get(`${API_URL}/api/my-activity`);
      setActivity(response.data);
    } catch (error) {
      console.error('Failed to fetch activity:', error);
      toast.error('Failed to load your bookings and orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/bookings/${bookingId}`);
      toast.success('Booking cancelled successfully');
      fetchActivity();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      toast.error('Failed to cancel booking');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Bookings & Orders</h1>
                <p className="text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to="/travel"
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition-colors flex items-center gap-2"
              >
                <Plane className="w-4 h-4" />
                Book Travel
              </Link>
              <Link
                to="/shop"
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200 transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Gear
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activity.total_bookings}</p>
                <p className="text-sm text-gray-500">Travel Bookings</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activity.total_orders}</p>
                <p className="text-sm text-gray-500">Product Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {activity.bookings.filter(b => b.status === 'confirmed').length + 
                   activity.orders.filter(o => o.status === 'confirmed').length}
                </p>
                <p className="text-sm text-gray-500">Confirmed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {activity.bookings.filter(b => b.status === 'pending').length +
                   activity.orders.filter(o => o.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'all', label: 'All Activity' },
            { id: 'bookings', label: 'Travel Bookings' },
            { id: 'orders', label: 'Product Orders' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Activity List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : allItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">No activity yet</h2>
            <p className="text-gray-500 mb-8">Start exploring and booking your next adventure!</p>
            <div className="flex justify-center gap-4">
              <Link
                to="/travel"
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
              >
                Explore Travel
              </Link>
              <Link
                to="/shop"
                className="px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors"
              >
                Shop Gear
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {allItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                {item.type === 'booking' ? (
                  // Travel Booking Card
                  <div className="flex gap-6">
                    <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.item_image}
                        alt={item.item_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full mb-2">
                            <Plane className="w-3 h-3" />
                            Travel Booking
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">{item.item_name}</h3>
                          <p className="text-gray-500 capitalize">{item.booking_type}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.start_date)}
                          {item.end_date && ` - ${formatDate(item.end_date)}`}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {item.guests} guest{item.guests > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <span className="text-lg font-bold text-gray-900">
                          ${item.total_price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleCancelBooking(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Product Order Card
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-2">
                          <Package className="w-3 h-3" />
                          Product Order
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{item.id.slice(0, 8)}</h3>
                        <p className="text-gray-500">{formatDate(item.created_at)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {item.items.map((orderItem, idx) => (
                        <div key={idx} className="flex-shrink-0 w-20">
                          <img
                            src={orderItem.product_image}
                            alt={orderItem.product_name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <p className="text-xs text-gray-500 mt-1 truncate">{orderItem.product_name}</p>
                          <p className="text-xs font-medium">x{orderItem.quantity}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <p>Shipping to: {item.shipping_address?.city}, {item.shipping_address?.state}</p>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        ${item.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookingsPage;
