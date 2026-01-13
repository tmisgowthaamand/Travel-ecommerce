import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import { Calendar, Users, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import axios from 'axios';
import { destinations, experiences, privateRentals } from '../data/mockData';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type') || 'destination';
  const itemId = searchParams.get('id');
  
  // Get item data based on type
  const getItemData = () => {
    const id = parseInt(itemId);
    switch (type) {
      case 'destination':
        return destinations.find(d => d.id === id);
      case 'experience':
        return experiences.find(e => e.id === id);
      case 'rental':
        return privateRentals.find(r => r.id === id);
      default:
        return null;
    }
  };
  
  const item = getItemData();
  
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    guests: 1
  });
  const [loading, setLoading] = useState(false);

  const getPriceEstimate = () => {
    const basePrice = type === 'rental' ? 8500 : type === 'experience' ? 500 : 2500;
    const nights = formData.startDate && formData.endDate 
      ? Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))
      : 1;
    return basePrice * Math.max(nights, 1) * formData.guests;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to book');
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }
    
    if (!item) {
      toast.error('Invalid booking item');
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/api/bookings`, {
        booking_type: type,
        item_id: String(item.id),
        item_name: item.name || item.title,
        item_image: item.image,
        start_date: formData.startDate,
        end_date: formData.endDate || null,
        guests: formData.guests,
        total_price: getPriceEstimate()
      });
      
      toast.success('Booking confirmed!');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen">
        <TravelHeader />
        <div className="pt-24 text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900">Item not found</h1>
          <p className="text-gray-600 mt-2">The booking item could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TravelHeader />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header Image */}
            <div className="relative h-64">
              <img
                src={item.image}
                alt={item.name || item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm capitalize">
                  {type}
                </span>
                <h1 className="text-3xl font-bold mt-2">{item.name || item.title}</h1>
                {item.location && (
                  <p className="flex items-center gap-1 mt-1 text-white/80">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </p>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Complete Your Booking</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Price Summary */}
                <div className="bg-emerald-50 rounded-xl p-6">
                  <h3 className="font-medium text-emerald-900 mb-4">Price Estimate</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Base Price</span>
                      <span className="font-medium">${getPriceEstimate().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Taxes & Fees</span>
                      <span className="font-medium">Included</span>
                    </div>
                    <div className="pt-2 border-t border-emerald-200 flex justify-between">
                      <span className="font-bold text-emerald-900">Total</span>
                      <span className="font-bold text-xl text-emerald-900">
                        ${getPriceEstimate().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
