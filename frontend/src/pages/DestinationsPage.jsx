import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { destinations, experiences } from '../data/mockData';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const DestinationsPage = () => {
  const { destination } = useParams();

  // Filter if specific destination
  const displayDestinations = destination 
    ? destinations.filter(d => d.name.toLowerCase() === destination)
    : destinations;

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${displayDestinations[0]?.image || destinations[0].image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/80 mb-4">EXPLORE</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light">
              {destination ? displayDestinations[0]?.name : 'Our Destinations'}
            </h1>
            {destination && (
              <p className="font-serif text-xl text-white/80 mt-4">
                {displayDestinations[0]?.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {!destination ? (
            // All Destinations Grid
            <div className="grid md:grid-cols-2 gap-8">
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  to={`/destinations/${dest.name.toLowerCase()}`}
                  className="group relative aspect-[16/10] overflow-hidden rounded-sm"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <p className="text-xs tracking-[0.2em] text-white/70 mb-2">{dest.subtitle}</p>
                    <h2 className="font-serif text-3xl lg:text-4xl font-light mb-3">{dest.name}</h2>
                    <p className="text-white/80">{dest.description}</p>
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs tracking-[0.2em]">EXPLORE</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Single Destination Detail
            <div>
              <div className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-[#5A5A5A] leading-relaxed text-lg">
                  {displayDestinations[0]?.description}. Discover the magic of {displayDestinations[0]?.name} 
                  through our curated collection of experiences, from historic castles to breathtaking landscapes.
                </p>
              </div>

              {/* Related Experiences */}
              <h3 className="font-serif text-3xl text-[#6B4E4E] text-center mb-12">
                Experiences in {displayDestinations[0]?.name}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {experiences.slice(0, 6).map((exp) => (
                  <Link
                    key={exp.id}
                    to={`/experiences/${exp.category}`}
                    className="group"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-serif text-xl text-[#6B4E4E] group-hover:text-[#8B6B6B] transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-sm text-[#8B8B8B] mt-2">{exp.description}</p>
                  </Link>
                ))}
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
