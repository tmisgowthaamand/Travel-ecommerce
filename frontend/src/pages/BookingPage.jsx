import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import { Calendar, Users, MapPin, Loader2, ArrowRight, Star } from 'lucide-react';
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
      await axios.post(`${API_URL}/bookings`, {
        booking_type: type,
        item_id: String(item.id),
        item_name: item.name || item.title,
        item_image: item.image,
        start_date: formData.startDate,
        end_date: formData.endDate || null,
        guests: formData.guests,
        total_price: getPriceEstimate()
      });

      toast.success('Your journey has been successfully registered.');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Failed to register journey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <TravelHeader />
        <div className="pt-48 text-center py-32">
          <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-6 font-black uppercase">Error</p>
          <h1 className="font-serif text-4xl text-[#1A1A1A] italic">Sanctuary not found</h1>
          <p className="text-gray-400 mt-6 font-light">The requested destination or experience is currently unavailable.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TravelHeader />

      <div className="pt-32 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-24 items-start">

            {/* Left: Summary */}
            <div className="lg:col-span-7 space-y-16">
              <div>
                <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-8 font-black uppercase">Reservation Detail</p>
                <h1 className="font-serif text-6xl text-[#1A1A1A] font-light italic mb-10 leading-tight">Securing Your <span className="italic">Odyssey</span></h1>
                <div className="w-24 h-[1px] bg-[#C9A87C] mb-12" />
              </div>

              <div className="relative aspect-[16/9] overflow-hidden grayscale">
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-[#3D2E2E]/10" />
                <div className="absolute top-8 left-8">
                  <span className="bg-white/90 backdrop-blur-md px-6 py-2 text-[10px] tracking-[0.2em] font-black text-[#1A1A1A] uppercase italic">
                    {type}
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="font-serif text-3xl text-[#1A1A1A] italic">{item.name || item.title}</h2>
                <div className="flex items-center gap-12 text-[10px] tracking-[0.2em] font-black text-gray-500 uppercase">
                  {item.location && (
                    <span className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#C9A87C]" />
                      {item.location}
                    </span>
                  )}
                  <span className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-[#C9A87C]" fill="currentColor" />
                    Ultra-Exclusive
                  </span>
                </div>
                <p className="text-gray-400 font-light leading-relaxed text-lg max-w-2xl italic">
                  Prepare for an immersion into the extraordinary. Your residency at {item.name || item.title} will be curated to the most exacting standards of luxury and authenticity.
                </p>
              </div>
            </div>

            {/* Right: Booking Card */}
            <div className="lg:col-span-5 bg-[#1A1A1A] p-12 lg:p-16 text-white lg:sticky lg:top-32 shadow-2xl">
              <p className="text-[#C9A87C] text-[10px] tracking-[0.3em] mb-10 font-black uppercase italic">Arrangements</p>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.2em] text-white/40 font-bold uppercase italic">Arrival Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-[#C9A87C] transition-colors outline-none cursor-pointer"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.2em] text-white/40 font-bold uppercase italic">Departure Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-[#C9A87C] transition-colors outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] tracking-[0.2em] text-white/40 font-bold uppercase italic">The Party</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-[#C9A87C] transition-colors outline-none cursor-pointer appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map(n => (
                      <option key={n} value={n} className="bg-[#1A1A1A]">{n} Distinguished Guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Investment Abstract */}
                <div className="pt-12 border-t border-white/5 space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] tracking-[0.1em] text-white/30 font-bold uppercase mb-2">Estimated Investment</p>
                      <p className="text-4xl font-serif text-white italic">${getPriceEstimate().toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] tracking-[0.1em] text-white/20 font-bold uppercase">USD inclusive of all curated services</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-[#C9A87C] text-[#1A1A1A] text-[10px] tracking-[0.4em] font-black hover:bg-white transition-all duration-500 uppercase flex items-center justify-center gap-4 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      SYNCHRONIZING...
                    </>
                  ) : (
                    <>
                      FINALIZE RESERVATION
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[9px] tracking-[0.2em] text-white/20 text-center font-bold uppercase italic mt-8 leading-relaxed">
                  Subject to availability and personal concierge verification.
                </p>
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
