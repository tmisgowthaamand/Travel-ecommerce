import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    dates: '',
    travelers: '',
    budget: '',
    message: '',
    newsletter: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/80 mb-4">GET IN TOUCH</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light">
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-serif text-3xl text-[#6B4E4E] mb-8">Let's Connect</h2>
              <p className="text-[#5A5A5A] mb-10">
                Whether you're ready to book your dream journey or simply exploring possibilities, 
                we're here to help bring your travel aspirations to life.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F8F5F2] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#C9A87C]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#6B4E4E] mb-1">Our Office</h3>
                    <p className="text-sm text-[#5A5A5A]">42 Fitzwilliam Square<br />Dublin 2, Ireland</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F8F5F2] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C9A87C]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#6B4E4E] mb-1">Phone</h3>
                    <p className="text-sm text-[#5A5A5A]">+353 1 288 6355<br />+1 800 555 0123 (US)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F8F5F2] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C9A87C]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#6B4E4E] mb-1">Email</h3>
                    <p className="text-sm text-[#5A5A5A]">info@wanderlustco.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F8F5F2] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#C9A87C]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#6B4E4E] mb-1">Hours</h3>
                    <p className="text-sm text-[#5A5A5A]">Mon - Fri: 9am - 6pm GMT<br />24/7 Support for Clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#F8F5F2] p-8 lg:p-12 rounded-sm">
                <h2 className="font-serif text-3xl text-[#6B4E4E] mb-8">Start Planning Your Journey</h2>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#6B4E4E] mb-4">Thank You!</h3>
                    <p className="text-[#5A5A5A]">We've received your inquiry and will be in touch within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">FIRST NAME *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">LAST NAME *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">EMAIL *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">PHONE</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">PREFERRED DESTINATION</label>
                        <select
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors appearance-none"
                        >
                          <option value="">Select destination</option>
                          <option value="ireland">Ireland</option>
                          <option value="scotland">Scotland</option>
                          <option value="england">England</option>
                          <option value="africa">Africa</option>
                          <option value="multiple">Multiple Destinations</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">TRAVEL DATES</label>
                        <input
                          type="text"
                          name="dates"
                          value={formData.dates}
                          onChange={handleChange}
                          placeholder="e.g., June 2025"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">NUMBER OF TRAVELERS</label>
                        <input
                          type="text"
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleChange}
                          placeholder="e.g., 2 adults, 1 child"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">BUDGET RANGE</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors appearance-none"
                        >
                          <option value="">Select budget range</option>
                          <option value="5-10k">$5,000 - $10,000</option>
                          <option value="10-25k">$10,000 - $25,000</option>
                          <option value="25-50k">$25,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.15em] text-[#6B4E4E] mb-2">TELL US ABOUT YOUR DREAM TRIP</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors resize-none"
                        placeholder="Share your interests, special occasions, must-see places, or any specific experiences you'd like..."
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="newsletter"
                        id="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#C9A87C] border-gray-300 rounded focus:ring-[#C9A87C]"
                      />
                      <label htmlFor="newsletter" className="text-sm text-[#5A5A5A]">
                        Subscribe to our newsletter for travel inspiration and exclusive offers
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#6B4E4E] text-white text-xs tracking-[0.2em] hover:bg-[#5A3F3F] transition-colors rounded-sm"
                    >
                      SEND INQUIRY
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatButton />
    </div>
  );
};

export default ContactPage;
