import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, ShoppingBag, ArrowRight } from 'lucide-react';

const SplitLandingPage = () => {
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#1A1A1A]">
      {/* Travel Side */}
      <Link
        to="/travel"
        className={`relative flex-1 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer group overflow-hidden ${hoveredSide === 'travel' ? 'lg:flex-[1.5]' : hoveredSide === 'shop' ? 'lg:flex-[0.5]' : 'lg:flex-1'
          } min-h-[50vh] lg:min-h-screen`}
        onMouseEnter={() => setHoveredSide('travel')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1920&q=80)'
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#3D2E2E]/40 group-hover:bg-[#3D2E2E]/20 transition-all duration-1000" />

        {/* Content */}
        <div className="relative z-10 text-center px-12 py-12 max-w-xl transition-all duration-700 group-hover:translate-y-[-20px]">
          <div className="mb-10 inline-flex items-center justify-center w-24 h-24 border border-white/20 group-hover:border-[#C9A87C] transition-colors duration-1000">
            <Plane className="w-8 h-8 text-white group-hover:text-[#C9A87C] transition-colors" />
          </div>

          <h1 className="font-serif text-6xl lg:text-8xl text-white font-light mb-8 tracking-tighter leading-tight">
            <span className="block text-[10px] font-sans tracking-[0.6em] text-[#C9A87C] mb-6 font-black uppercase italic">The Collection</span>
            Journeys
          </h1>

          <p className="text-white/60 text-lg mb-12 font-light leading-relaxed italic max-w-sm mx-auto opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-300">
            Orchestrating the world's most evocative experiences for the discerning soul.
          </p>

          <div className="inline-flex items-center gap-6 text-[10px] tracking-[0.5em] font-black text-white uppercase border-b border-[#C9A87C] pb-3 group-hover:bg-[#C9A87C] group-hover:px-8 group-hover:py-3 group-hover:border-transparent transition-all duration-700">
            <span>Enter Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-700" />
          </div>
        </div>
      </Link>

      {/* Shop Side */}
      <Link
        to="/shop"
        className={`relative flex-1 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer group overflow-hidden ${hoveredSide === 'shop' ? 'lg:flex-[1.5]' : hoveredSide === 'travel' ? 'lg:flex-[0.5]' : 'lg:flex-1'
          } min-h-[50vh] lg:min-h-screen`}
        onMouseEnter={() => setHoveredSide('shop')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?w=1920&q=80)'
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1A1A1A]/40 group-hover:bg-[#1A1A1A]/20 transition-all duration-1000" />

        {/* Content */}
        <div className="relative z-10 text-center px-12 py-12 max-w-xl transition-all duration-700 group-hover:translate-y-[-20px]">
          <div className="mb-10 inline-flex items-center justify-center w-24 h-24 border border-white/20 group-hover:border-white transition-colors duration-1000">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>

          <h1 className="font-serif text-6xl lg:text-8xl text-white font-light mb-8 tracking-tighter leading-tight italic">
            <span className="block text-[10px] font-sans tracking-[0.6em] text-white/40 mb-6 font-black uppercase">The Boutique</span>
            Essentials
          </h1>

          <p className="text-white/60 text-lg mb-12 font-light leading-relaxed italic max-w-sm mx-auto opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-300">
            Meticulously crafted gear designed to withstand the rigors of global exploration.
          </p>

          <div className="inline-flex items-center gap-6 text-[10px] tracking-[0.5em] font-black text-white uppercase border-b border-white/40 pb-3 group-hover:bg-white group-hover:text-[#1A1A1A] group-hover:px-8 group-hover:py-3 transition-all duration-700">
            <span>Shop Gear</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-700" />
          </div>
        </div>
      </Link>

      {/* Brand Identity Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
        <h1 className="font-serif text-4xl lg:text-6xl text-white/20 tracking-[1em] uppercase font-light pointer-events-none select-none group-hover:opacity-0 transition-opacity duration-1000">
          W&C
        </h1>
      </div>

      {/* Auth Panel */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-8">
        <Link to="/login" className="text-[10px] tracking-[0.4em] font-black text-white/40 hover:text-white transition-colors uppercase">Sign In</Link>
        <div className="w-[1px] h-4 bg-white/10" />
        <Link to="/register" className="text-[10px] tracking-[0.4em] font-black text-white/40 hover:text-white transition-colors uppercase">Register</Link>
      </div>

      {/* Logo */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30">
        <h2 className="font-serif text-2xl text-white font-light italic tracking-tighter">
          Wanderlust <span className="text-[#C9A87C]">&</span> Co.
        </h2>
      </div>
    </div>
  );
};

export default SplitLandingPage;
