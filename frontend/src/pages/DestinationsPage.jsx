import React from 'react';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { destinations, experiences } from '../data/mockData';
import { ArrowRight, MapPin, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const DestinationsPage = () => {
  const { destination } = useParams();

  // Filter if specific destination
  const displayDestinations = destination
    ? destinations.filter(d => d.name.toLowerCase() === destination)
    : destinations;

  return (
    <div className="min-h-screen bg-white">
      <TravelHeader />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: `url(${displayDestinations[0]?.image || destinations[0].image})` }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/30" />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full pt-24">
          <div className="max-w-4xl">
            <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-10 font-black animate-fade-in uppercase italic">World Discovery</p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.9] animate-reveal-up">
              {destination ? displayDestinations[0]?.name : 'The'} <br /><span className="italic">{destination ? 'Curated' : 'Destinations'}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {!destination ? (
            // All Destinations Grid
            <div className="space-y-32">
              <div className="max-w-3xl">
                <h2 className="font-serif text-5xl text-[#1A1A1A] font-light italic mb-8">Global Sanctuaries</h2>
                <p className="text-gray-400 text-xl font-light leading-relaxed">
                  From the emerald hills of Ireland to the vast plains of the Serengeti, we have meticulously curated a collection of worlds waiting to be explored.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {destinations.map((dest) => (
                  <Link
                    key={dest.id}
                    to={`/travel/destinations/${dest.name.toLowerCase()}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden mb-10">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#3D2E2E]/10 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-[#C9A87C] text-[10px] tracking-[0.3em] font-black uppercase italic">{dest.subtitle}</p>
                      <h3 className="font-serif text-4xl text-[#1A1A1A] font-light italic group-hover:text-[#C9A87C] transition-colors">{dest.name}</h3>
                      <p className="text-gray-400 text-sm font-light leading-relaxed max-w-lg line-clamp-2">
                        {dest.description}
                      </p>
                      <div className="pt-6">
                        <span className="text-[10px] tracking-[0.4em] font-black text-[#1A1A1A] border-b border-[#C9A87C] pb-2 group-hover:bg-[#C9A87C] group-hover:text-white group-hover:px-4 transition-all duration-500 uppercase">
                          DISCOVER REGION
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            // Single Destination Detail
            <div className="space-y-32">
              <Link to="/travel/destinations" className="inline-flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-500">
                  <ArrowLeft className="w-4 h-4 text-[#1A1A1A] group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] tracking-[0.2em] font-black uppercase text-[#1A1A1A] group-hover:tracking-[0.3em] transition-all duration-500">
                  Return to Atlas
                </span>
              </Link>

              <div className="grid lg:grid-cols-2 gap-24 items-start">
                <div>
                  <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-8 font-black uppercase">Region Overview</p>
                  <h2 className="font-serif text-6xl text-[#1A1A1A] font-light italic mb-10 leading-tight">
                    {displayDestinations[0]?.subtitle || 'Authentic Soul'}, <br />
                    <span className="italic">Unforgettable</span>
                  </h2>
                  <div className="w-24 h-[1px] bg-[#C9A87C] mb-12" />
                  <p className="text-[#1A1A1A]/60 text-xl font-light leading-relaxed italic mb-12">
                    {displayDestinations[0]?.fullDescription || displayDestinations[0]?.description}
                  </p>

                  {displayDestinations[0]?.highlights && (
                    <div className="mb-12">
                      <h3 className="text-[10px] tracking-[0.2em] font-black uppercase text-[#1A1A1A] mb-6">Regional Highlights</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {displayDestinations[0].highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-[#C9A87C]" />
                            <span className="text-sm font-light text-gray-500 italic">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to="/travel/contact"
                    className="inline-block bg-[#1A1A1A] text-white px-12 py-6 text-[10px] tracking-[0.4em] font-black hover:bg-[#C9A87C] transition-all duration-500 uppercase"
                  >
                    Start Your Journey
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-12">
                    <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                      <img src={displayDestinations[0]?.gallery?.[0] || displayDestinations[0]?.image} className="w-full h-full object-cover" alt="Gallery 1" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                      <img src={displayDestinations[0]?.gallery?.[1] || displayDestinations[0]?.image} className="w-full h-full object-cover" alt="Gallery 2" />
                    </div>
                    <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                      <img src={displayDestinations[0]?.gallery?.[2] || displayDestinations[0]?.image} className="w-full h-full object-cover" alt="Gallery 3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Experiences */}
              <div className="space-y-16">
                <div className="text-center">
                  <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-6 font-black uppercase italic">The Collection</p>
                  <h3 className="font-serif text-5xl text-[#1A1A1A] font-light italic">Curated Memories in {displayDestinations[0]?.name}</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  {experiences.slice(0, 3).map((exp) => (
                    <Link
                      key={exp.id}
                      to={`/travel/experiences/${exp.category}`}
                      className="group"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden mb-8">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                        />
                      </div>
                      <p className="text-[#C9A87C] text-[10px] tracking-[0.2em] font-black uppercase mb-3">{exp.category}</p>
                      <h4 className="font-serif text-2xl text-[#1A1A1A] group-hover:text-[#C9A87C] transition-colors italic">
                        {exp.title}
                      </h4>
                      <p className="text-sm text-gray-400 font-light mt-4 line-clamp-2 leading-relaxed italic">{exp.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ChatButton />
    </div>
  );
};

export default DestinationsPage;
