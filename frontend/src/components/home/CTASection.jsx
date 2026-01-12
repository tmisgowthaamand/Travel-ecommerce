import React, { useState } from 'react';
import { Send, MapPin, Calendar, Users } from 'lucide-react';

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    dates: '',
    travelers: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
    setFormData({ name: '', email: '', destination: '', dates: '', travelers: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516570628389-492e1488089d?w=1920&q=80)' }}
      />
      <div className="absolute inset-0 bg-[#3D2E2E]/85" />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-white">
            <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">BEGIN YOUR JOURNEY</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Plan Your Dream<br />Adventure
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Let our travel experts craft a bespoke itinerary tailored to your desires. From castle stays to safari adventures, we'll create memories that last a lifetime.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-6 border border-white/10 rounded-sm">
                <p className="font-serif text-4xl text-[#C9A87C] mb-2">25+</p>
                <p className="text-xs tracking-[0.15em] text-white/60">YEARS EXPERIENCE</p>
              </div>
              <div className="text-center p-6 border border-white/10 rounded-sm">
                <p className="font-serif text-4xl text-[#C9A87C] mb-2">250+</p>
                <p className="text-xs tracking-[0.15em] text-white/60">EXCLUSIVE PROPERTIES</p>
              </div>
              <div className="text-center p-6 border border-white/10 rounded-sm">
                <p className="font-serif text-4xl text-[#C9A87C] mb-2">98%</p>
                <p className="text-xs tracking-[0.15em] text-white/60">CLIENT SATISFACTION</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 lg:p-10 rounded-sm shadow-2xl">
            <h3 className="font-serif text-2xl text-[#6B4E4E] mb-6">Request a Consultation</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">YOUR NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">PREFERRED DESTINATION</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors appearance-none bg-white"
                  >
                    <option value="">Select a destination</option>
                    <option value="ireland">Ireland</option>
                    <option value="scotland">Scotland</option>
                    <option value="england">England</option>
                    <option value="africa">Africa</option>
                    <option value="multiple">Multiple Destinations</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">TRAVEL DATES</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="dates"
                      value={formData.dates}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                      placeholder="e.g., June 2025"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">NUMBER OF TRAVELERS</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                      placeholder="e.g., 2 adults"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">TELL US ABOUT YOUR DREAM TRIP</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors resize-none"
                  placeholder="Share your interests, special occasions, or any specific experiences you'd like..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#6B4E4E] text-white text-xs tracking-[0.2em] hover:bg-[#5A3F3F] transition-colors rounded-sm"
              >
                SEND INQUIRY
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
