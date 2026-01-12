import React from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

const DestinationsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F5F2]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">WHERE DREAMS COME TRUE</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#6B4E4E] font-light">
            Our Destinations
          </h2>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.name.toLowerCase()}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <p className="text-xs tracking-[0.2em] text-white/70 mb-2">{destination.subtitle}</p>
                <h3 className="font-serif text-2xl lg:text-3xl font-light mb-3">{destination.name}</h3>
                <p className="text-sm text-white/80 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {destination.description}
                </p>
                
                {/* Arrow */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#6B4E4E] hover:text-[#8B6B6B] transition-colors group"
          >
            VIEW ALL DESTINATIONS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
