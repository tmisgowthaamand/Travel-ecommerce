import React from 'react';
import { Link } from 'react-router-dom';
import { experiences } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

const ExperiencesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-[#C9A87C] text-xs tracking-[0.4em] mb-4 uppercase font-bold">Unforgettable Moments</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#6B4E4E] font-light">
              Tailored <span className="italic">Experiences</span>
            </h2>
          </div>
          <Link
            to="/travel/experiences"
            className="text-[10px] tracking-[0.3em] font-bold border-b border-[#6B4E4E] pb-1 text-[#6B4E4E] hover:text-[#C9A87C] hover:border-[#C9A87C] transition-all duration-300"
          >
            VIEW ALL EXPERIENCES
          </Link>
        </div>

        {/* Experiences Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {experiences.map((experience) => (
            <Link
              key={experience.id}
              to={`/travel/experiences/${experience.category}`}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#1A1A1A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white text-[9px] tracking-[0.2em] text-[#1A1A1A] font-bold uppercase">
                    {experience.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="text-center px-4">
                <h3 className="font-serif text-2xl lg:text-3xl text-[#6B4E4E] mb-4 group-hover:text-[#C9A87C] transition-colors font-light">
                  {experience.title}
                </h3>
                <div className="w-10 h-[1px] bg-[#C9A87C]/30 mx-auto mb-4" />
                <p className="text-xs text-[#5A5A5A] leading-relaxed font-light line-clamp-2 italic">
                  "{experience.description}"
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
