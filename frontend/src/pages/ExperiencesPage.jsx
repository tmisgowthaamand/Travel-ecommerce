import React, { useEffect } from 'react';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import { experiences } from '../data/mockData';
import { ArrowRight, Users, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ExperiencesPage = () => {
  const { category } = useParams();

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const displayExperiences = category
    ? experiences.filter(e => e.category === category)
    : experiences;

  const categories = [...new Set(experiences.map(e => e.category))];

  // Logic to separate Hero item from the rest of the collection to avoid duplication
  const heroExperience = displayExperiences[0];
  const gridExperiences = displayExperiences.slice(1);

  return (
    <div className="min-h-screen bg-[#F8F5F2] font-sans selection:bg-[#C9A87C] selection:text-[#1A1A1A]">
      <TravelHeader />

      {/* Hero: Immersive Entrance */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom transition-all duration-[5000ms]"
          style={{ backgroundImage: `url(${heroExperience?.image || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1920'})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#F8F5F2] to-transparent" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full pt-32">
          <div className="max-w-5xl space-y-8 animate-reveal-up">
            <div className="flex items-center gap-6">
              <div className="w-16 h-px bg-[#C9A87C]" />
              <p className="text-[#C9A87C] text-[11px] tracking-[0.8em] font-black uppercase italic">
                {category ? category.replace('-', ' ') : 'Our Global Portfolio'}
              </p>
            </div>
            <h1 className="font-serif text-7xl md:text-9xl text-white font-light leading-[0.9] drop-shadow-2xl">
              {category ? (
                <>The <span className="italic">{category.split('-')[0]}</span> <br />{category.split('-')[1] || 'Portfolio'}</>
              ) : (
                <>Transcend the <br /><span className="italic">Ordinary</span></>
              )}
            </h1>
          </div>
        </div>
      </section>

      {/* Category Navigation: Floating Glassmorphism (Light Mode) */}
      <section className="sticky top-0 z-40 bg-[#F8F5F2]/80 backdrop-blur-2xl border-b border-[#1A1A1A]/5 py-8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-12">
            <div className="flex items-center gap-16 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              <Link
                to="/travel/experiences"
                className={`text-[11px] tracking-[0.5em] font-black transition-all uppercase whitespace-nowrap ${!category ? 'text-[#C9A87C] border-b-2 border-[#C9A87C] pb-3' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'}`}
              >
                The Collection
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/travel/experiences/${cat}`}
                  className={`text-[11px] tracking-[0.5em] font-black transition-all uppercase whitespace-nowrap ${category === cat ? 'text-[#C9A87C] border-b-2 border-[#C9A87C] pb-3' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'}`}
                >
                  {cat.replace('-', ' ')}
                </Link>
              ))}
            </div>
            <p className="hidden lg:block text-[10px] tracking-[0.6em] text-[#C9A87C]/60 font-black uppercase">Legacy of Insight • Established MCMXCIX</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 lg:py-48 relative z-10 px-6 lg:px-12 overflow-hidden">
        {/* Decorative elements (Light) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A87C]/10 rounded-full blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C9A87C]/5 rounded-full blur-[180px] -z-10" />

        <div className="max-w-[1600px] mx-auto">

          {category && heroExperience && (
            <div className="grid lg:grid-cols-2 gap-32 mb-48 items-center">
              <div className="space-y-16 animate-reveal-up">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-px bg-[#C9A87C]" />
                    <p className="text-[#C9A87C] text-[11px] tracking-[0.8em] font-black uppercase italic">Master Curation</p>
                  </div>
                  <h2 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] font-light leading-tight italic">
                    {category === 'golf-escapes' ? 'The Art of the Links' : 'A Realm of Distinction'}
                  </h2>
                </div>
                <div className="w-48 h-px bg-[#1A1A1A]/10" />
                <p className="text-[#1A1A1A]/60 text-2xl font-light leading-relaxed italic max-w-xl">
                  {category === 'golf-escapes'
                    ? 'Our golf journeys are more than just rounds; they are pilgrimages to the world\'s most sacred fairways. We secure the unsecurable—guaranteed morning tee times at St Andrews, private caddies who know every blade of grass, and after-hours access to the most exclusive clubhouses in the British Isles.'
                    : 'Every experience in this portfolio has been meticulously audited by our senior curators to ensure it meets our exacting standards of service, narrative, and exclusivity.'}
                </p>
                <div className="pt-10">
                  <Link
                    to="/travel/contact"
                    className="group relative inline-flex items-center gap-12 bg-[#1A1A1A] text-white px-16 py-8 hover:bg-[#C9A87C] transition-all duration-700 overflow-hidden shadow-xl"
                  >
                    <span className="relative z-10 text-[11px] tracking-[0.6em] font-black uppercase italic">Initiate Commission</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-6 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-[#C9A87C] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] group border border-[#1A1A1A]/5 bg-white">
                <img
                  src={heroExperience.image}
                  alt="Curated Experience"
                  className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                {/* Visual Accent */}
                <div className="absolute bottom-0 left-0 right-0 p-12 bg-white/90 backdrop-blur-xl border-t border-[#1A1A1A]/5 translate-y-full group-hover:translate-y-0 transition-all duration-1000">
                  <p className="text-[#C9A87C] text-[10px] tracking-[0.4em] font-black uppercase mb-4 italic">Signature Series</p>
                  <h4 className="font-serif text-3xl text-[#1A1A1A] italic font-light">{heroExperience.title}</h4>
                </div>
              </div>
            </div>
          )}

          {/* Experience Grid: Editorial Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
            {gridExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className="group space-y-10 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Link to={`/travel/experience/${exp.id}`} className="block space-y-8">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-xl shadow-[#1A1A1A]/5 border border-[#1A1A1A]/5">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-all duration-[2500ms] group-hover:scale-110 brightness-[0.95] group-hover:brightness-105"
                      loading="lazy"
                    />
                    <div className="absolute top-6 right-6">
                      <span className="bg-white/90 backdrop-blur-xl border border-[#1A1A1A]/5 px-6 py-3 text-[9px] tracking-[0.4em] font-black text-[#C9A87C] uppercase italic shadow-sm">
                        {exp.type || exp.category}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-12 group-hover:translate-y-0 transition-all duration-1000 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center gap-4 text-white text-[10px] tracking-[0.4em] font-black uppercase">
                        <Clock className="w-4 h-4 text-[#C9A87C]" />
                        {exp.duration || '4-8 HOURS'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 px-2">
                    <div className="flex items-center gap-6">
                      <span className="text-[#C9A87C] text-[10px] tracking-[0.5em] font-black uppercase italic">Commission IV</span>
                      <div className="flex-1 h-px bg-[#1A1A1A]/5" />
                      <span className="text-[#1A1A1A]/30 text-[9px] tracking-[0.4em] font-black uppercase italic">Private</span>
                    </div>

                    <h3 className="font-serif text-4xl text-[#1A1A1A] font-light leading-tight italic group-hover:text-[#C9A87C] transition-colors duration-700">
                      {exp.title}
                    </h3>

                    <p className="text-[#1A1A1A]/50 text-lg font-light leading-relaxed italic line-clamp-2 min-h-[3.5rem]">
                      {exp.description}
                    </p>

                    {exp.highlights && (
                      <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                        {exp.highlights.slice(0, 3).map((h, i) => (
                          <span key={i} className="text-[9px] tracking-[0.2em] font-bold text-[#1A1A1A]/40 group-hover:text-[#C9A87C] transition-all duration-700 uppercase flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#C9A87C] rounded-full scale-125" />
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-6 border-t border-[#1A1A1A]/5 flex items-center justify-between group/btn">
                      <p className="text-[10px] tracking-[0.5em] font-black text-[#1A1A1A]/80 uppercase italic group-hover/btn:translate-x-4 transition-transform duration-700">Explore Narrative</p>
                      <ArrowRight className="w-4 h-4 text-[#C9A87C] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {!category && (
            <div className="mt-48 pt-32 border-t border-[#1A1A1A]/5 text-center space-y-12">
              <p className="text-[#C9A87C] text-[12px] tracking-[1.2em] font-black uppercase italic">The Philosophy of Access</p>
              <h2 className="font-serif text-6xl md:text-9xl text-[#1A1A1A] font-light italic leading-tight max-w-6xl mx-auto drop-shadow-sm">
                We create the <span className="text-[#1A1A1A]/10">moments</span> money alone <span className="text-[#C9A87C]">cannot buy.</span>
              </h2>
              <div className="pt-16">
                <Link
                  to="/travel/contact"
                  className="inline-block bg-[#1A1A1A] text-white px-20 py-8 text-[11px] tracking-[0.8em] font-black hover:bg-[#C9A87C] transition-all duration-1000 uppercase italic shadow-2xl"
                >
                  Initiate an Inquiry
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExperiencesPage;
