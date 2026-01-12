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
            <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">CURATED FOR YOU</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#6B4E4E] font-light">
              Tailored Experiences
            </h2>
          </div>
          <Link
            to="/experiences"
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#6B4E4E] hover:text-[#8B6B6B] transition-colors group"
          >
            VIEW ALL EXPERIENCES
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Experiences Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <Link
              key={experience.id}
              to={`/experiences/${experience.category}`}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-5">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div>
                <p className="text-xs tracking-[0.2em] text-[#C9A87C] mb-2 uppercase">
                  {experience.category}
                </p>
                <h3 className="font-serif text-xl lg:text-2xl text-[#6B4E4E] mb-3 group-hover:text-[#8B6B6B] transition-colors">
                  {experience.title}
                </h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  {experience.description}
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
