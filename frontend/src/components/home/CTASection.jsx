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
    <section className="relative py-32 lg:py-48 overflow-hidden bg-[#1A1A1A]">
      {/* Background with Subtle Parallax Effect (via CSS) */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale opacity-30 scale-110"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516570628389-492e1488089d?w=1920&q=80)' }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Content */}
          <div className="text-white lg:sticky lg:top-32">
            <p className="text-[#C9A87C] text-xs tracking-[0.4em] mb-8 uppercase font-bold">The Consultation</p>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light mb-10 leading-[1.1]">
              Start Your <br /><span className="italic">Odyssey</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#C9A87C] mb-12" />
            <p className="text-white/50 text-xl font-light leading-relaxed mb-16 max-w-xl">
              Let our travel artisans craft a bespoke sanctuary for your next journey. Every detail, from private transit to exclusive access, is meticulously curated to reflect your unique vision.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#C9A87C] group-hover:bg-[#C9A87C] group-hover:text-[#1A1A1A] transition-all duration-500">
                  <span className="font-serif italic text-xl">1</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1 font-light">Discovery Call</h4>
                  <p className="text-sm text-white/40 font-light">We begin with a deep dive into your travel aspirations and preferred pace.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#C9A87C] group-hover:bg-[#C9A87C] group-hover:text-[#1A1A1A] transition-all duration-500">
                  <span className="font-serif italic text-xl">2</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1 font-light">Bespoke Design</h4>
                  <p className="text-sm text-white/40 font-light">Our experts draft a unique itinerary with exclusive experiences hidden from the public eye.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white p-12 lg:p-16 relative">
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#C9A87C]/20" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-[#C9A87C]/20" />

            <h3 className="font-serif text-3xl text-[#6B4E4E] mb-10 font-light italic text-center">Inquiry for Excellence</h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-8">
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-200 py-4 text-sm focus:outline-none focus:border-[#C9A87C] transition-colors peer placeholder:text-transparent"
                    placeholder="Full Name"
                  />
                  <label className="absolute left-0 top-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-[10px] peer-focus:text-[#C9A87C] font-bold">
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-200 py-4 text-sm focus:outline-none focus:border-[#C9A87C] transition-colors peer placeholder:text-transparent"
                    placeholder="Email Address"
                  />
                  <label className="absolute left-0 top-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-[10px] peer-focus:text-[#C9A87C] font-bold">
                    Email Address
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-gray-200 py-4 text-sm focus:outline-none focus:border-[#C9A87C] transition-colors appearance-none"
                    >
                      <option value="">Destination Preference</option>
                      <option value="ireland">Ireland</option>
                      <option value="scotland">Scotland</option>
                      <option value="england">England</option>
                      <option value="africa">Africa</option>
                    </select>
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      name="dates"
                      value={formData.dates}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-200 py-4 text-sm focus:outline-none focus:border-[#C9A87C] transition-colors peer placeholder:text-transparent"
                      placeholder="Travel Window"
                    />
                    <label className="absolute left-0 top-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-[10px] peer-focus:text-[#C9A87C] font-bold">
                      Travel Window
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-transparent border-b border-gray-200 py-4 text-sm focus:outline-none focus:border-[#C9A87C] transition-colors peer placeholder:text-transparent resize-none"
                    placeholder="Special Requests"
                  />
                  <label className="absolute left-0 top-4 text-[10px] tracking-[0.2em] text-gray-400 uppercase transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-[10px] peer-focus:text-[#C9A87C] font-bold">
                    Your Vision & Special Requests
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] tracking-[0.4em] font-black hover:bg-[#C9A87C] transition-all duration-500 flex items-center justify-center gap-4 group uppercase"
              >
                REQUEST PRIVATE CONSULTATION
                <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
