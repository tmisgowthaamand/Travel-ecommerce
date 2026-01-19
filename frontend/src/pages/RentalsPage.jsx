import React from 'react';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { privateRentals } from '../data/mockData';
import { ArrowRight, BedDouble, Users, MapPin, Wifi, Car, UtensilsCrossed } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const RentalsPage = () => {
  const { id } = useParams();
  const rental = id ? privateRentals.find(r => r.id === parseInt(id)) : null;

  return (
    <div className="min-h-screen bg-[#F0FDFA] font-sans">
      <TravelHeader />

      {/* Hero: Majestic Scale */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom transition-all [transition-duration:3000ms]"
          style={{ backgroundImage: `url(${rental?.image || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80'})` }}
        />
        <div className="absolute inset-0 bg-[#0F172A]/40" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#F0FDFA] to-transparent" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full pt-32">
          <div className="max-w-4xl space-y-8 animate-reveal-up">
            <p className="text-[#0D9488] text-[10px] tracking-[0.6em] font-black uppercase italic">Private Collections</p>
            <h1 className="font-serif text-7xl md:text-9xl text-white font-light leading-[0.85] drop-shadow-2xl">
              {rental ? rental.name : 'The Sanctuary'} <br /><span className="italic">{rental ? 'Residency' : 'Portfolio'}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-24 lg:py-48 relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {!rental ? (
            // All Rentals List View: Architectural Brilliance
            <div className="space-y-32">
              <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#1A1A1A]/5 pb-24">
                <div className="max-w-2xl space-y-8">
                  <h2 className="font-serif text-6xl md:text-7xl text-[#1A1A1A] font-light italic">Estates of <br />Distinction</h2>
                  <p className="text-[#1A1A1A]/40 text-xl font-light leading-relaxed italic max-w-xl">
                    Our residency portfolio encompasses the world's most evocative architectural masterpieces, curated for those who demand absolute silence and unparalleled service.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-[10px] tracking-[0.4em] font-black text-[#1A1A1A] uppercase">Filter: Global Reach</span>
                  <div className="w-48 h-px bg-[#0D9488]" />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-x-24 gap-y-32">
                {privateRentals.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={`/travel/rentals/${item.id}`}
                    className="group space-y-12"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all [transition-duration:2000ms]"
                      />
                      <div className="absolute top-8 right-8 bg-[#1A1A1A]/90 backdrop-blur-md px-8 py-4 text-white">
                        <p className="text-[10px] tracking-[0.3em] font-black uppercase italic">{item.price.split('/')[0]}</p>
                      </div>
                      {/* Floating Indicator */}
                      <div className="absolute bottom-8 left-8 flex items-center gap-4 animate-fade-in opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-px bg-white" />
                        <span className="text-white text-[9px] tracking-[0.4em] font-black uppercase">View Residency Details</span>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                      <div className="lg:col-span-8 space-y-6">
                        <p className="text-[#0D9488] text-[10px] tracking-[0.4em] font-black uppercase italic flex items-center gap-4">
                          <MapPin className="w-3 h-3 text-[#1A1A1A]/20" /> {item.location}
                        </p>
                        <h3 className="font-serif text-5xl text-[#1A1A1A] font-light group-hover:text-[#0D9488] transition-colors italic">
                          {item.name}
                        </h3>
                        <p className="text-[#1A1A1A]/50 text-base font-light leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="lg:col-span-4 pt-4 border-t lg:border-t-0 lg:border-l border-[#1A1A1A]/5 lg:pl-10 h-full flex flex-col justify-center gap-4">
                        <div className="flex items-center gap-4">
                          <BedDouble className="w-4 h-4 text-[#0D9488]/40" />
                          <span className="text-[9px] tracking-[0.2em] font-black uppercase text-gray-500">{item.bedrooms} Master Suites</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Users className="w-4 h-4 text-[#0D9488]/40" />
                          <span className="text-[9px] tracking-[0.2em] font-black uppercase text-gray-500">Up to {item.guests} Guests</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            // Single Property View: Immersive Detail
            <div className="grid lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-8 space-y-24">
                <div className="space-y-12">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-px bg-[#0D9488]" />
                    <p className="text-[#0D9488] text-[10px] tracking-[0.5em] font-black uppercase italic">The Narrative</p>
                  </div>
                  <h2 className="font-serif text-7xl text-[#1A1A1A] font-light italic leading-[1.1]">Where History <br />Meets <span className="italic">Immortality</span></h2>
                  <div className="space-y-8 text-[#1A1A1A]/60 text-2xl font-light leading-relaxed italic max-w-3xl">
                    <p>{rental.fullDescription || rental.description}</p>
                    <p className="pl-12 border-l-2 border-[#0D9488]/30 text-xl border-dashed">Exclusive to Wanderlust & Co., this property operates with a full complement of staff, including private security, world-class culinary talent, and a dedicated concierge available at all hours.</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-24">
                  <div className="space-y-12">
                    <h3 className="font-serif text-3xl text-[#1A1A1A] italic font-light">Service & Refinements</h3>
                    <div className="space-y-8">
                      {/* Core Stats */}
                      <div className="flex gap-8 group">
                        <div className="w-16 h-16 border border-[#0D9488]/10 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-700">
                          <BedDouble className="w-6 h-6 text-[#0D9488] group-hover:text-white transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] tracking-[0.2em] font-black text-[#1A1A1A] uppercase">Accommodation</p>
                          <p className="text-xs text-gray-400 font-light italic">{rental.bedrooms} Master Suites</p>
                        </div>
                      </div>
                      <div className="flex gap-8 group">
                        <div className="w-16 h-16 border border-[#0D9488]/10 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-700">
                          <Users className="w-6 h-6 text-[#0D9488] group-hover:text-white transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] tracking-[0.2em] font-black text-[#1A1A1A] uppercase">Capacity</p>
                          <p className="text-xs text-gray-400 font-light italic">Up to {rental.guests} Distinguished Guests</p>
                        </div>
                      </div>

                      {/* Dynamic Amenities */}
                      {rental.amenities && rental.amenities.map((amenity, i) => (
                        <div key={i} className="flex gap-8 group">
                          <div className="w-16 h-16 border border-[#0D9488]/10 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-700">
                            <Wifi className="w-6 h-6 text-[#0D9488] group-hover:text-white transition-colors" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] tracking-[0.2em] font-black text-[#1A1A1A] uppercase">Feature</p>
                            <p className="text-xs text-gray-400 font-light italic">{amenity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery Grid */}
                  <div className="space-y-8">
                    {rental.gallery && rental.gallery.map((img, index) => (
                      <div key={index} className="aspect-[4/3] overflow-hidden grayscale hover:grayscale-0 transition-all [transition-duration:2000ms] shadow-lg">
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform [transition-duration:3000ms]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reservation Abstract: Sticky Side Card */}
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <div className="bg-[#1A1A1A] text-white p-12 lg:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
                  <p className="text-[#0D9488] text-[10px] tracking-[0.5em] mb-12 font-black uppercase italic">Investment Abstract</p>

                  <div className="space-y-4 mb-20">
                    <p className="text-6xl font-serif text-white italic">{rental.price.split('/')[0]}</p>
                    <p className="text-[10px] tracking-[0.2em] text-[#0D9488]/60 font-black uppercase">Standard Residency / Per Night</p>
                  </div>

                  <div className="space-y-8 mb-20 pt-12 border-t border-white/5">
                    <div className="flex justify-between items-center group">
                      <span className="text-[10px] tracking-[0.2em] font-black text-white/30 uppercase">Service Status</span>
                      <span className="text-[10px] tracking-[0.2em] text-white uppercase italic px-4 py-1 border border-white/20">Full Staffing</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-[10px] tracking-[0.2em] font-black text-white/30 uppercase">Min. Residency</span>
                      <span className="text-[10px] tracking-[0.2em] text-white uppercase italic">7 Evenings</span>
                    </div>
                  </div>

                  <Link
                    to="/travel/contact"
                    className="flex items-center justify-center w-full py-8 bg-transparent border border-white/20 text-white text-[10px] tracking-[0.5em] font-black uppercase hover:bg-white hover:text-[#1A1A1A] hover:border-white transition-all duration-700 relative group overflow-hidden"
                  >
                    <span className="relative z-10">Secure Residency</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>

                  <div className="mt-12 text-center opacity-30">
                    <p className="text-[8px] tracking-[0.4em] font-black uppercase">Authentication Required for Access</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RentalsPage;
