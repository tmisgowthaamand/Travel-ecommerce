import React from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

const DestinationsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F5F2]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <p className="text-[#C9A87C] text-xs tracking-[0.4em] mb-4 uppercase font-bold">Curated Collections</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#6B4E4E] font-light leading-none">
              Where will your <br /><span className="italic">next story</span> begin?
            </h2>
          </div>
          <Link
            to="/travel/destinations"
            className="text-[10px] tracking-[0.3em] font-bold border-b border-[#6B4E4E] pb-1 text-[#6B4E4E] hover:text-[#C9A87C] hover:border-[#C9A87C] transition-all duration-300 h-fit"
          >
            VIEW ALL DESTINATIONS
          </Link>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/travel/destinations/${destination.name.toLowerCase()}`}
              className="group relative aspect-[4/5] overflow-hidden"
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <p className="text-[10px] tracking-[0.3em] text-[#C9A87C] mb-3 uppercase font-medium">{destination.subtitle}</p>
                <h3 className="font-serif text-3xl font-light mb-4">{destination.name}</h3>

                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-xs text-white/70 leading-relaxed mb-6">
                    {destination.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold">
                    EXPLORE <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
