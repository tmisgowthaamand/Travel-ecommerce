import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/mockData';
import { cn } from '../../lib/utils';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105 animate-slow-zoom"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-6">
        <div className="max-w-5xl">
          <p className="text-[#C9A87C] text-xs md:text-sm tracking-[0.4em] mb-6 animate-fade-in uppercase font-medium">
            Exclusively Curated For You
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8 animate-reveal-up leading-[1.1]">
            {heroSlides[currentSlide].title}
          </h1>
          <div className="w-20 h-[1px] bg-white/40 mx-auto mb-10 animate-fade-in-delay" />
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl font-light text-white/80 tracking-wide mb-14 animate-fade-in-delay max-w-2xl mx-auto">
            "{heroSlides[currentSlide].subtitle}"
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-10 mt-4 animate-fade-in-delay">
            <Link
              to="/travel/experiences"
              className="group relative overflow-hidden px-8 py-4 bg-white text-[#1A1A1A] text-[10px] tracking-[0.3em] font-bold transition-all duration-500 hover:bg-[#C9A87C] hover:text-white"
            >
              EXPLORE EXPERIENCES
            </Link>
            <Link
              to="/travel/contact"
              className="group flex items-center gap-4 text-[10px] tracking-[0.3em] hover:text-[#C9A87C] transition-colors font-bold"
            >
              PLAN YOUR JOURNEY
              <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
            )}
          />
        ))}
      </div>

      {/* Partner Logos */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#B8A090]/80 to-transparent py-8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-90">
            <span className="text-white text-xs tracking-[0.2em] font-light flex items-center gap-2">
              <span className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-[10px]">V</span>
              VIRTUOSO
            </span>
            <span className="hidden md:block text-white/60 text-xs">|</span>
            <span className="text-white text-xs tracking-[0.2em] font-light">TRAVEL + LEISURE A-LIST</span>
            <span className="hidden md:block text-white/60 text-xs">|</span>
            <span className="text-white text-xs tracking-[0.2em] font-light">CONDÉ NAST</span>
            <span className="hidden md:block text-white/60 text-xs">|</span>
            <span className="text-white text-xs tracking-[0.2em] font-light">SELECT HOTELS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
