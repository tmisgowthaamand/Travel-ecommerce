import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const SplitLandingPage = () => {
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Travel Side */}
      <Link
        to="/travel"
        className={`relative flex-1 flex items-center justify-center transition-all duration-700 ease-out cursor-pointer group overflow-hidden ${
          hoveredSide === 'travel' ? 'lg:flex-[1.3]' : hoveredSide === 'shop' ? 'lg:flex-[0.7]' : 'lg:flex-1'
        }`}
        onMouseEnter={() => setHoveredSide('travel')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1920&q=80)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-800/70 to-cyan-900/80 transition-opacity duration-500 group-hover:opacity-70" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8 py-12 max-w-lg">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-500">
            <Plane className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-serif font-light text-white mb-4 tracking-wide">
            <span className="block text-lg font-sans tracking-[0.3em] text-emerald-300 mb-2">EXPLORE</span>
            Wanderlust
          </h1>
          
          <p className="text-white/80 text-lg mb-8 font-light leading-relaxed">
            Discover extraordinary destinations, curated experiences, and luxury escapes around the world.
          </p>
          
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 text-white font-medium tracking-wide group-hover:bg-white group-hover:text-emerald-900 transition-all duration-500">
            <span>Explore Travel</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-white/20 rounded-br-3xl" />
      </Link>

      {/* Shop Side */}
      <Link
        to="/shop"
        className={`relative flex-1 flex items-center justify-center transition-all duration-700 ease-out cursor-pointer group overflow-hidden ${
          hoveredSide === 'shop' ? 'lg:flex-[1.3]' : hoveredSide === 'travel' ? 'lg:flex-[0.7]' : 'lg:flex-1'
        }`}
        onMouseEnter={() => setHoveredSide('shop')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?w=1920&q=80)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-amber-900/80 via-orange-800/70 to-rose-900/80 transition-opacity duration-500 group-hover:opacity-70" />
        
        {/* Animated sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-white/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${12 + Math.random() * 12}px`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8 py-12 max-w-lg">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-500">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-serif font-light text-white mb-4 tracking-wide">
            <span className="block text-lg font-sans tracking-[0.3em] text-amber-300 mb-2">DISCOVER</span>
            Travel Gear
          </h1>
          
          <p className="text-white/80 text-lg mb-8 font-light leading-relaxed">
            Premium luggage, stylish backpacks, and essential accessories for the modern traveler.
          </p>
          
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 text-white font-medium tracking-wide group-hover:bg-white group-hover:text-amber-900 transition-all duration-500">
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-white/20 rounded-tl-3xl" />
      </Link>

      {/* Center Divider with Auth Buttons */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent hidden lg:block" />
        
        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="px-6 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 font-medium text-sm hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 bg-gray-900/80 backdrop-blur-sm rounded-full text-white font-medium text-sm hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-xl border border-white/20"
          >
            Create Account
          </Link>
        </div>
        
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent hidden lg:block" />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <h1 className="text-3xl font-serif text-white tracking-widest drop-shadow-lg">
          <span className="font-light">W</span>
          <span className="text-xl">&</span>
          <span className="font-light">C</span>
        </h1>
      </div>

      {/* Custom animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SplitLandingPage;
