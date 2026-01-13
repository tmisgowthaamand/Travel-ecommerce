import React, { useState } from 'react';
import axios from 'axios';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { MapPin, Phone, Mail, Clock, Send, Check, Instagram, Facebook, Linkedin, Loader2, AlertCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    budget: '',
    message: '',
    newsletter: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/contact`, formData);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        destination: '',
        budget: '',
        message: '',
        newsletter: false
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      setError('Transmission failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] font-sans">
      <TravelHeader />

      {/* Hero: Elegant Entrance */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom transition-all duration-[5000ms]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/40" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#F8F5F2] to-transparent" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full pt-32 text-center">
          <div className="max-w-4xl mx-auto space-y-10 animate-reveal-up">
            <p className="text-[#C9A87C] text-[10px] tracking-[0.8em] font-black uppercase italic">The Concierge Connection</p>
            <h1 className="font-serif text-7xl md:text-9xl text-white font-light leading-[0.85] drop-shadow-2xl">
              Initiate your <br /><span className="italic">Odyssey</span>
            </h1>
            <div className="flex items-center justify-center gap-12 pt-10">
              <div className="w-24 h-px bg-white/30" />
              <p className="text-white/60 text-xs tracking-[0.4em] font-light uppercase">Bespoke Design & Curated Planning</p>
              <div className="w-24 h-px bg-white/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Interface Section */}
      <section className="py-24 lg:py-48 relative z-10 -mt-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="bg-white shadow-[0_100px_200px_-50px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="grid lg:grid-cols-12">
              {/* Intelligence Desk (Dark) */}
              <div className="lg:col-span-4 bg-[#1A1A1A] text-white p-16 lg:p-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A87C]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                <h2 className="font-serif text-4xl mb-20 font-light italic leading-tight relative z-10">Our global presence is at your <span className="text-[#C9A87C]">disposal.</span></h2>

                <div className="space-y-16 relative z-10">
                  <div className="group space-y-6">
                    <p className="text-[10px] tracking-[0.4em] text-[#C9A87C] font-black uppercase italic">Headquarters</p>
                    <div className="flex gap-8">
                      <MapPin className="w-5 h-5 text-white/20 group-hover:text-[#C9A87C] transition-colors" />
                      <p className="text-base font-light text-white/40 leading-relaxed group-hover:text-white transition-colors uppercase tracking-widest">
                        42 Fitzwilliam Square South<br />
                        Dublin 2, D02 Y620, Ireland
                      </p>
                    </div>
                  </div>

                  <div className="group space-y-6">
                    <p className="text-[10px] tracking-[0.4em] text-[#C9A87C] font-black uppercase italic">Secure Voice</p>
                    <div className="flex gap-8">
                      <Phone className="w-5 h-5 text-white/20 group-hover:text-[#C9A87C] transition-colors" />
                      <div className="space-y-2">
                        <p className="text-base font-light text-white/40 group-hover:text-white transition-colors cursor-pointer uppercase tracking-widest">+353 1 288 6355 (HQ)</p>
                        <p className="text-base font-light text-white/40 group-hover:text-white transition-colors cursor-pointer uppercase tracking-widest">+1 800 555 0123 (INTL)</p>
                      </div>
                    </div>
                  </div>

                  <div className="group space-y-6">
                    <p className="text-[10px] tracking-[0.4em] text-[#C9A87C] font-black uppercase italic">Direct Dispatch</p>
                    <div className="flex gap-8">
                      <Mail className="w-5 h-5 text-white/20 group-hover:text-[#C9A87C] transition-colors" />
                      <p className="text-base font-light text-white/40 italic group-hover:text-[#C9A87C] transition-colors cursor-pointer tracking-widest">
                        concierge@wanderlustco.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-32 pt-16 border-t border-white/5 space-y-12">
                  <div className="flex gap-10">
                    <Instagram className="w-6 h-6 text-white/10 hover:text-[#C9A87C] transition-colors cursor-pointer" />
                    <Facebook className="w-6 h-6 text-white/10 hover:text-[#C9A87C] transition-colors cursor-pointer" />
                    <Linkedin className="w-6 h-6 text-white/10 hover:text-[#C9A87C] transition-colors cursor-pointer" />
                  </div>
                  <p className="text-[9px] tracking-[0.5em] text-white/20 font-black uppercase">Established MCMXCIX</p>
                </div>
              </div>

              {/* Inquiry Portal (Light) */}
              <div className="lg:col-span-8 p-16 lg:p-24 bg-white relative">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-24">
                    <div className="w-32 h-32 rounded-full border border-[#C9A87C]/20 flex items-center justify-center mb-12 relative">
                      <div className="absolute inset-0 bg-[#C9A87C]/5 animate-ping rounded-full" />
                      <Check className="w-12 h-12 text-[#C9A87C]" />
                    </div>
                    <h3 className="font-serif text-5xl text-[#1A1A1A] mb-8 italic">Transmission Received</h3>
                    <p className="text-[#1A1A1A]/50 max-w-sm text-lg font-light italic leading-relaxed">
                      Your vision is now in the hands of our senior curators. Expect a direct communication within the next lunar cycle (24 hours).
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-20 text-[10px] tracking-[0.6em] font-black border-b-2 border-[#C9A87C] pb-4 uppercase hover:bg-[#1A1A1A] hover:text-white hover:px-8 transition-all duration-[1000ms]"
                    >
                      Revised Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-24 space-y-6">
                      <h2 className="font-serif text-5xl text-[#1A1A1A] font-light italic">Inquiry <span className="text-[#C9A87C]">Dossier</span></h2>
                      <div className="w-24 h-px bg-[#C9A87C]" />
                      <p className="text-[#1A1A1A]/40 text-lg font-light italic leading-relaxed">Please provide the initial parameters of your desired immersion. Our specialists will take care of the rest.</p>
                      {error && (
                        <div className="flex items-center gap-4 p-4 bg-red-50 text-red-600 rounded-lg animate-fade-in">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">{error}</p>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-16">
                      <div className="grid md:grid-cols-2 gap-16">
                        <div className="relative group">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-gray-100 py-6 text-base font-light focus:outline-none focus:border-[#1A1A1A] transition-all peer placeholder:text-transparent"
                            placeholder="Given Name"
                          />
                          <label className="absolute left-0 top-6 text-[10px] tracking-[0.4em] text-gray-300 font-black uppercase transition-all duration-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-[-12px] peer-focus:text-[#C9A87C] peer-focus:italic">
                            Given Name
                          </label>
                        </div>
                        <div className="relative group">
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-gray-100 py-6 text-base font-light focus:outline-none focus:border-[#1A1A1A] transition-all peer placeholder:text-transparent"
                            placeholder="Family Name"
                          />
                          <label className="absolute left-0 top-6 text-[10px] tracking-[0.4em] text-gray-300 font-black uppercase transition-all duration-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-[-12px] peer-focus:text-[#C9A87C] peer-focus:italic">
                            Family Name
                          </label>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-16">
                        <div className="relative group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-gray-100 py-6 text-base font-light focus:outline-none focus:border-[#1A1A1A] transition-all peer placeholder:text-transparent"
                            placeholder="Authentication Email"
                          />
                          <label className="absolute left-0 top-6 text-[10px] tracking-[0.4em] text-gray-300 font-black uppercase transition-all duration-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-[-12px] peer-focus:text-[#C9A87C] peer-focus:italic">
                            Email Identity
                          </label>
                        </div>
                        <div className="relative group">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-100 py-6 text-base font-light focus:outline-none focus:border-[#1A1A1A] transition-all peer placeholder:text-transparent"
                            placeholder="Secure Line"
                          />
                          <label className="absolute left-0 top-6 text-[10px] tracking-[0.4em] text-gray-300 font-black uppercase transition-all duration-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-[-12px] peer-focus:text-[#C9A87C] peer-focus:italic">
                            Secure Line
                          </label>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-16">
                        <div className="relative group">
                          <select
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-100 py-6 text-base font-light focus:outline-none focus:border-[#1A1A1A] transition-all appearance-none cursor-pointer italic"
                          >
                            <option value="">Destination Interest</option>
                            <option value="ireland">The Emerald Legacy (Ireland)</option>
                            <option value="scotland">Highland Solitude (Scotland)</option>
                            <option value="england">The Crown Trust (England)</option>
                            <option value="africa">Wild Resonance (Africa)</option>
                            <option value="other">Uncharted Territories</option>
                          </select>
                        </div>
                        <div className="relative group">
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-100 py-6 text-base font-light focus:outline-none focus:border-[#1A1A1A] transition-all appearance-none cursor-pointer italic"
                          >
                            <option value="">Proposed Investment</option>
                            <option value="10k-20k">€10,000 - €20,000</option>
                            <option value="20k-50k">€20,000 - €50,000</option>
                            <option value="50k+">€50,000+</option>
                            <option value="undisclosed">Prefer not to disclose</option>
                          </select>
                        </div>
                      </div>

                      <div className="relative group">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          className="w-full bg-transparent border-b border-gray-100 py-6 text-base font-light focus:outline-none focus:border-[#1A1A1A] transition-all peer placeholder:text-transparent resize-none leading-relaxed italic"
                          placeholder="Tell us about your dream trip..."
                        />
                        <label className="absolute left-0 top-6 text-[10px] tracking-[0.4em] text-gray-300 font-black uppercase transition-all duration-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-[-12px] peer-focus:text-[#C9A87C] peer-focus:italic">
                          Vision & Requirements
                        </label>
                      </div>

                      <div className="flex items-center gap-6 group cursor-pointer" onClick={() => handleChange({ target: { name: 'newsletter', type: 'checkbox', checked: !formData.newsletter } })}>
                        <div className={`w-6 h-6 border transition-all flex items-center justify-center ${formData.newsletter ? 'bg-[#1A1A1A] border-[#1A1A1A]' : 'border-gray-200'}`}>
                          {formData.newsletter && <Check className="w-4 h-4 text-[#C9A87C]" />}
                        </div>
                        <span className="text-[10px] tracking-[0.3em] text-gray-400 font-bold uppercase transition-colors group-hover:text-[#1A1A1A]">Curated Intel Subscription</span>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1A1A1A] text-white py-8 text-[11px] tracking-[0.5em] font-black uppercase hover:bg-[#C9A87C] transition-all duration-700 relative group overflow-hidden shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-10">
                          {loading ? (
                            <>
                              Transmitting...
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              Dispatch Inquiry
                              <Send className="w-4 h-4 group-hover:translate-x-4 transition-transform" />
                            </>
                          )}
                        </span>
                        {!loading && <div className="absolute inset-0 bg-[#C9A87C] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
