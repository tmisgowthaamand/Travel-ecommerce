import React from 'react';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { teamMembers } from '../data/mockData';
import { Award, Heart, Globe, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const values = [
    { icon: Heart, title: 'SOUL', description: 'We believe in journeys that resonate with your inner self, creating connections that transcend the physical plane.' },
    { icon: Award, title: 'PRECISION', description: 'Every detail is meticulously calibrated to the highest standards of international luxury and local authenticity.' },
    { icon: Globe, title: 'HERITAGE', description: 'We preserve the narratives of the lands we traverse, honoring the legacies of the people and places we visit.' },
    { icon: Users, title: 'CONNECTION', description: 'Our network of global partners ensures exclusive access to the worlds most guarded and evocative secrets.' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <TravelHeader />

      {/* Hero: Immersive Narrative */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-[#3D2E2E]/40" />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full mt-24">
          <div className="max-w-4xl space-y-10">
            <p className="text-[#C9A87C] text-[10px] tracking-[0.6em] font-black animate-fade-in uppercase italic">Established 1999</p>
            <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] text-white font-light leading-[0.85] animate-reveal-up drop-shadow-2xl">
              The <span className="italic">Legacy</span> <br />of Insight
            </h1>
            <div className="flex items-center gap-12 animate-fade-in delay-500 pt-10">
              <div className="w-48 h-px bg-white/30" />
              <p className="text-white/60 text-xs tracking-[0.3em] font-light uppercase">Orchestrating the Extraordinary</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy: The White Section */}
      <section className="py-48 lg:py-64 overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-1 hidden lg:block">
              <div className="h-[600px] w-px bg-gray-100 relative mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C9A87C]" />
                <p className="absolute top-24 left-1/2 -translate-x-1/2 -rotate-90 text-[10px] tracking-[0.5em] text-gray-300 font-black uppercase whitespace-nowrap">Philosophy</p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[3/4] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
                  alt="Our craft"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all [transition-duration:2000ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute -top-12 -left-12 w-32 h-32 border-l border-t border-[#C9A87C]/40" />
            </div>

            <div className="lg:col-span-6 lg:pl-12 space-y-16">
              <div className="space-y-8">
                <p className="text-[#C9A87C] text-[10px] tracking-[0.4em] font-black uppercase italic">The Ethos</p>
                <h2 className="font-serif text-6xl md:text-7xl text-[#1A1A1A] font-light italic leading-tight">
                  Crafting Journeys <br />that <span className="italic">Resonate</span>
                </h2>
              </div>

              <div className="space-y-10 text-[#1A1A1A]/60 font-light leading-relaxed text-xl max-w-xl">
                <p>
                  At Wanderlust & Co., we view travel not as a commodity of consumption, but as a medium of profound transformation. Since our inception, we have dedicated ourselves to the pursuit of the inaccessible.
                </p>
                <p className="border-l-2 border-[#C9A87C] pl-10 italic text-[#1A1A1A] font-medium">
                  "Luxury is the ability to connect with the authentic soul of a place, without the distractions of the mundane."
                </p>
                <p>
                  Our curatorial approach is deeply personal. We don't just know the world; we know the gatekeepers. From the private vineyards of Tuscany to the most remote nomadic camps of the Sahara, our reaches are as deep as they are diverse.
                </p>
              </div>

              <Link to="/travel/contact" className="inline-flex items-center gap-8 text-[11px] tracking-[0.4em] font-black uppercase group">
                <span className="border-b-2 border-[#C9A87C] pb-2 group-hover:bg-[#C9A87C] group-hover:text-white group-hover:px-6 transition-all duration-500">Engage the Concierge</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars: The Dark Section */}
      <section className="py-48 lg:py-64 bg-[#1A1A1A] relative overflow-hidden">
        {/* Background Texture Placeholder */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ background: 'radial-gradient(circle, #C9A87C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 items-end mb-32 gap-12">
            <div>
              <p className="text-[#C9A87C] text-[10px] tracking-[0.6em] mb-8 font-black uppercase italic">Pillars of Excellence</p>
              <h2 className="font-serif text-6xl md:text-8xl text-white font-light italic leading-tight">The Curation <br />Matrix</h2>
            </div>
            <p className="text-white/40 text-lg font-light max-w-md italic pb-4">
              Our governing principles ensure that every odyssey we orchestrate is unique, evocative, and flawlessly executed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {values.map((value, i) => (
              <div key={i} className="group relative p-16 bg-[#1A1A1A] hover:bg-[#C9A87C] transition-all [transition-duration:1000ms] flex flex-col justify-between h-[500px]">
                <div className="relative z-10 space-y-10 group-hover:-translate-y-4 transition-transform duration-700">
                  <value.icon className="w-10 h-10 text-[#C9A87C] group-hover:text-[#1A1A1A] transition-colors duration-700 font-light" />
                  <h3 className="font-serif text-3xl text-white font-light group-hover:text-[#1A1A1A] transition-colors">{value.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed font-light group-hover:text-[#1A1A1A]/70 transition-colors uppercase tracking-widest">
                    {value.description}
                  </p>
                </div>
                <span className="absolute bottom-10 right-10 text-[10rem] font-serif italic text-white/[0.02] group-hover:text-[#1A1A1A]/5 transition-colors duration-1000 select-none">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process: The Art of Curation */}
      <section className="py-48 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-8 font-black uppercase">The Method</p>
            <h2 className="font-serif text-6xl text-[#1A1A1A] font-light italic">The Art of <span className="italic">Curation</span></h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { title: "Discovery", desc: "We begin by understanding the nuances of your desires, translating your dreams into a tangible blueprint.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80" },
              { title: "Design", desc: "Our specialists leverage global connections to weave a seamless itinerary of exclusive experiences.", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" },
              { title: "Delivery", desc: "From the moment you depart, every detail is overseen with white-glove precision.", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" }
            ].map((step, i) => (
              <div key={i} className="group space-y-8">
                <div className="aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all [transition-duration:1500ms]">
                  <img src={step.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform [transition-duration:2000ms]" alt={step.title} />
                </div>
                <div className="space-y-4 px-4 border-l border-[#C9A87C]/30">
                  <h3 className="font-serif text-3xl italic text-[#1A1A1A]">{step.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans: The Gallery Section */}
      <section className="py-48 lg:py-64 bg-[#F8F5F2] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-2xl">
              <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-8 font-black uppercase">The Curators</p>
              <h2 className="font-serif text-7xl md:text-8xl text-[#1A1A1A] font-light leading-tight">The Minds <br />Behind the <span className="italic">Map</span></h2>
            </div>
            <div className="w-full lg:w-1/3 h-px bg-gray-200 hidden lg:block" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
            {teamMembers.map((member) => (
              <div key={member.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden mb-12 grayscale group-hover:grayscale-0 transition-all [transition-duration:1500ms]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all [transition-duration:2000ms]"
                  />
                  <div className="absolute inset-0 bg-[#3D2E2E]/10 group-hover:opacity-0 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-[#1A1A1A] to-transparent">
                    <p className="text-white/80 text-[9px] tracking-[0.3em] font-black uppercase italic">{member.bio}</p>
                  </div>
                </div>
                <div className="text-center lg:text-left space-y-4">
                  <p className="text-[#C9A87C] text-[10px] tracking-[0.4em] font-black uppercase">{member.role}</p>
                  <h3 className="font-serif text-4xl text-[#1A1A1A] font-light italic">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Final Word */}
      <section className="py-48 bg-[#1A1A1A] text-center overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif italic text-white/[0.02] pointer-events-none select-none">Odyssey</div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-5xl md:text-7xl text-white font-light italic mb-12">Your invitation to the <br /> extraordinary awaits.</h2>
          <Link to="/travel/contact" className="inline-block px-14 py-6 border border-[#C9A87C] text-white text-[10px] tracking-[0.5em] font-black uppercase hover:bg-[#C9A87C] hover:text-[#1A1A1A] transition-all duration-500">Begin the Narrative</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
