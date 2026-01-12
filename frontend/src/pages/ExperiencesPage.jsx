import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { experiences } from '../data/mockData';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ExperiencesPage = () => {
  const { category } = useParams();

  const displayExperiences = category
    ? experiences.filter(e => e.category === category)
    : experiences;

  const categories = [...new Set(experiences.map(e => e.category))];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${displayExperiences[0]?.image || experiences[0].image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/80 mb-4">CURATED FOR YOU</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light">
              {category ? displayExperiences[0]?.title : 'Tailored Experiences'}
            </h1>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      {!category && (
        <section className="py-8 bg-[#F8F5F2] border-b border-gray-200">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/experiences"
                className="px-5 py-2 text-xs tracking-[0.2em] bg-[#6B4E4E] text-white rounded-sm"
              >
                ALL
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/experiences/${cat}`}
                  className="px-5 py-2 text-xs tracking-[0.2em] text-[#6B4E4E] hover:bg-[#6B4E4E] hover:text-white transition-colors rounded-sm border border-[#6B4E4E]"
                >
                  {cat.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experiences Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {category && (
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-[#5A5A5A] leading-relaxed text-lg">
                {displayExperiences[0]?.description}. Let us craft the perfect 
                {' '}{displayExperiences[0]?.title.toLowerCase()} experience tailored to your preferences.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-6 text-xs tracking-[0.2em] text-[#C9A87C] hover:text-[#6B4E4E] transition-colors"
              >
                INQUIRE NOW
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayExperiences.map((exp) => (
              <Link
                key={exp.id}
                to={`/experiences/${exp.category}`}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-5">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-xs tracking-[0.15em] text-[#6B4E4E] rounded-sm">
                      {exp.category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl lg:text-2xl text-[#6B4E4E] mb-3 group-hover:text-[#8B6B6B] transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-[#C9A87C]">
                  <span className="text-xs tracking-[0.2em]">LEARN MORE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatButton />
    </div>
  );
};

export default ExperiencesPage;
