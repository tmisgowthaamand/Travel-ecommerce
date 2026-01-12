import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { teamMembers } from '../data/mockData';
import { Award, Heart, Globe, Users } from 'lucide-react';

const AboutPage = () => {
  const values = [
    { icon: Heart, title: 'Passion', description: 'We are passionate about creating extraordinary journeys that exceed expectations.' },
    { icon: Award, title: 'Excellence', description: 'We maintain the highest standards in everything we do, from planning to execution.' },
    { icon: Globe, title: 'Authenticity', description: 'We believe in genuine experiences that connect travelers with local cultures.' },
    { icon: Users, title: 'Personal Touch', description: 'Every journey is uniquely crafted to reflect your individual preferences.' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/80 mb-4">OUR STORY</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light">
              About Us
            </h1>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">SINCE 1999</p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#6B4E4E] font-light mb-8">
                Crafting Dreams<br />Into Reality
              </h2>
              <div className="space-y-6 text-[#5A5A5A] leading-relaxed">
                <p>
                  For over 25 years, Wanderlust & Co. has been the trusted partner for discerning travelers 
                  seeking extraordinary experiences across Ireland, Scotland, England, and Africa.
                </p>
                <p>
                  Founded with a passion for authentic travel, we believe that the best journeys are those 
                  that connect you with the soul of a destination—its people, traditions, and hidden treasures.
                </p>
                <p>
                  Our team of dedicated travel experts combines deep local knowledge with a commitment to 
                  personalized service, ensuring every detail of your journey is crafted to perfection.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80"
                alt="Our story"
                className="rounded-sm"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#F8F5F2] -z-10 rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-[#F8F5F2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">WHAT DRIVES US</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#6B4E4E] font-light">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-[#F8F5F2] flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-[#C9A87C]" />
                </div>
                <h3 className="font-serif text-xl text-[#6B4E4E] mb-3">{value.title}</h3>
                <p className="text-sm text-[#5A5A5A]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">THE EXPERTS</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#6B4E4E] font-light">
              Meet Our Team
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-sm mb-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl text-[#6B4E4E]">{member.name}</h3>
                <p className="text-xs tracking-[0.2em] text-[#C9A87C] mt-1 mb-3">{member.role}</p>
                <p className="text-sm text-[#5A5A5A]">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatButton />
    </div>
  );
};

export default AboutPage;
