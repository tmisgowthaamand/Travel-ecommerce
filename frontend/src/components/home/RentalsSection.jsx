import React from 'react';
import { Link } from 'react-router-dom';
import { privateRentals } from '../../data/mockData';
import { ArrowRight, Users, BedDouble } from 'lucide-react';

const RentalsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#3D2E2E] text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[#C9A87C] text-xs tracking-[0.4em] mb-4 uppercase font-bold">Exclusive Estates</p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-6">
            Private <span className="italic">Sanctuaries</span>
          </h2>
          <div className="w-20 h-[1px] bg-[#C9A87C] mx-auto mb-8" />
          <p className="text-white/60 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the ultimate in privacy and luxury with our collection of exclusive castles, manor houses, and estates available for private hire. Each property is hand-selected for its historical significance and modern elegance.
          </p>
        </div>

        {/* Rentals Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {privateRentals.map((rental) => (
            <Link
              key={rental.id}
              to={`/travel/rentals/${rental.id}`}
              className="group relative overflow-hidden bg-[#2D1F1F]"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={rental.image}
                  alt={rental.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#1A1A1A]/80 flex flex-col justify-center p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] tracking-[0.3em] text-[#C9A87C] mb-4 uppercase font-bold">{rental.location}</p>
                <h3 className="font-serif text-3xl mb-4 font-light">{rental.name}</h3>
                <p className="text-xs text-white/70 mb-8 font-light leading-relaxed italic line-clamp-3">
                  "{rental.description}"
                </p>

                {/* Details */}
                <div className="flex items-center gap-8 text-[10px] tracking-[0.2em] text-white/50 mb-8 font-bold">
                  <span className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4" />
                    {rental.bedrooms} BEDS
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {rental.guests} GUESTS
                  </span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <span className="text-[#C9A87C] text-sm tracking-[0.15em] font-bold">{rental.price.toUpperCase()}</span>
                  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold">
                    VIEW DETAILS <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Static Label (Visible when not hovering) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-[10px] tracking-[0.2em] text-[#C9A87C] mb-1 uppercase">{rental.location}</p>
                <h3 className="font-serif text-xl font-light">{rental.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link
            to="/travel/rentals"
            className="group inline-flex flex-col items-center gap-4"
          >
            <span className="text-[10px] tracking-[0.4em] font-bold text-white/60 group-hover:text-white transition-colors">EXPLORE ALL PROPERTIES</span>
            <div className="w-12 h-[1px] bg-[#C9A87C] group-hover:w-24 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RentalsSection;
