import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { privateRentals } from '../data/mockData';
import { ArrowRight, BedDouble, Users, MapPin, Wifi, Car, UtensilsCrossed } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const RentalsPage = () => {
  const { id } = useParams();
  const rental = id ? privateRentals.find(r => r.id === parseInt(id)) : null;

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${rental?.image || privateRentals[0].image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/80 mb-4">EXCLUSIVE ESTATES</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light">
              {rental ? rental.name : 'Private Rentals'}
            </h1>
            {rental && (
              <p className="flex items-center justify-center gap-2 text-white/80 mt-4">
                <MapPin className="w-4 h-4" />
                {rental.location}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {!rental ? (
            // All Rentals
            <>
              <div className="max-w-3xl mx-auto text-center mb-16">
                <p className="text-[#5A5A5A] leading-relaxed text-lg">
                  Experience the ultimate in privacy and luxury with our collection of exclusive castles, 
                  manor houses, and estates available for private hire across Ireland, Scotland, and England.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {privateRentals.map((item) => (
                  <Link
                    key={item.id}
                    to={`/rentals/${item.id}`}
                    className="group bg-[#F8F5F2] rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs tracking-[0.2em] text-[#C9A87C] mb-2 flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                      <h3 className="font-serif text-xl lg:text-2xl text-[#6B4E4E] mb-3 group-hover:text-[#8B6B6B] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#5A5A5A] mb-4">{item.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-[#8B8B8B] mb-4">
                        <span className="flex items-center gap-2">
                          <BedDouble className="w-4 h-4" />
                          {item.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {item.guests} Guests
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-[#C9A87C] font-medium">{item.price}</span>
                        <ArrowRight className="w-5 h-5 text-[#6B4E4E] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            // Single Rental Detail
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-serif text-3xl text-[#6B4E4E] mb-6">About This Property</h2>
                <p className="text-[#5A5A5A] leading-relaxed mb-6">
                  {rental.description}. This magnificent property offers an unparalleled experience 
                  for discerning travelers seeking privacy, luxury, and authentic character.
                </p>
                <p className="text-[#5A5A5A] leading-relaxed mb-8">
                  Set in breathtaking surroundings, this exclusive estate provides the perfect backdrop 
                  for celebrations, family gatherings, or corporate retreats.
                </p>

                {/* Amenities */}
                <h3 className="font-serif text-xl text-[#6B4E4E] mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[{ icon: BedDouble, label: `${rental.bedrooms} Luxury Bedrooms` },
                    { icon: Users, label: `Up to ${rental.guests} Guests` },
                    { icon: Wifi, label: 'High-Speed WiFi' },
                    { icon: Car, label: 'Private Parking' },
                    { icon: UtensilsCrossed, label: 'Chef Available' },
                  ].map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 text-[#5A5A5A]">
                      <amenity.icon className="w-5 h-5 text-[#C9A87C]" />
                      <span className="text-sm">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#F8F5F2] p-8 rounded-sm">
                <h3 className="font-serif text-2xl text-[#6B4E4E] mb-6">Book This Property</h3>
                <div className="mb-6">
                  <p className="text-3xl font-serif text-[#C9A87C]">{rental.price}</p>
                </div>
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-4 bg-[#6B4E4E] text-white text-xs tracking-[0.2em] hover:bg-[#5A3F3F] transition-colors rounded-sm"
                >
                  INQUIRE NOW
                </Link>
                <p className="text-xs text-[#8B8B8B] text-center mt-4">
                  Our team will respond within 24 hours
                </p>
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

export default RentalsPage;
