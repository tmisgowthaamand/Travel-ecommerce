import React from 'react';
import { Link } from 'react-router-dom';
import { privateRentals } from '../../data/mockData';
import { ArrowRight, Users, BedDouble } from 'lucide-react';

const RentalsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#3D2E2E] text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">EXCLUSIVE ESTATES</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            Private Rentals
          </h2>
          <p className="text-white/70 mt-6 max-w-2xl mx-auto">
            Experience the ultimate in privacy and luxury with our collection of exclusive castles, manor houses, and estates available for private hire.
          </p>
        </div>

        {/* Rentals Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {privateRentals.map((rental) => (
            <Link
              key={rental.id}
              to={`/rentals/${rental.id}`}
              className="group bg-white/5 rounded-sm overflow-hidden hover:bg-white/10 transition-colors duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={rental.image}
                  alt={rental.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs tracking-[0.2em] text-[#C9A87C] mb-2">{rental.location}</p>
                <h3 className="font-serif text-xl lg:text-2xl mb-3">{rental.name}</h3>
                <p className="text-sm text-white/70 mb-4">{rental.description}</p>
                
                {/* Details */}
                <div className="flex items-center gap-6 text-sm text-white/60 mb-4">
                  <span className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4" />
                    {rental.bedrooms} Bedrooms
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Up to {rental.guests} Guests
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[#C9A87C] font-medium">{rental.price}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/rentals"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-xs tracking-[0.2em] hover:bg-white hover:text-[#3D2E2E] transition-colors duration-300"
          >
            EXPLORE ALL PROPERTIES
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RentalsSection;
