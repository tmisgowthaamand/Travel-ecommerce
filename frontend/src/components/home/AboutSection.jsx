import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Scenic train journey"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#F8F5F2] -z-10 rounded-sm" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#6B4E4E] font-light leading-tight mb-8">
              Magical memories,<br />
              <span className="text-[#8B6B6B]">Bespoke experiences</span>
            </h2>

            <div className="space-y-6 text-[#5A5A5A] leading-relaxed">
              <p>
                Once you have travelled the voyage never ends. Wanderlust & Co. will open a world of wonders and create magical memories that will stay with you far beyond your travels.
              </p>
              <p>
                Diverge from the typical tourist destinations in favour of unique, authentic experiences. Experiences designed in the most inspiring surroundings that will be yours, and yours only. Journeys that create memorable moments and Wanderlust & Co.'s bespoke itineraries will make this happen. The wonders of the world are within your reach.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 mt-10 text-xs tracking-[0.2em] text-[#6B4E4E] hover:text-[#8B6B6B] transition-colors group"
            >
              MEET OUR TEAM
              <span className="w-0 group-hover:w-6 h-[1px] bg-current transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
