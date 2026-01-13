import React from 'react';

const LuxuryStats = () => {
  const stats = [
    { label: 'EXCLUSIVE DESTINATIONS', value: '50+' },
    { label: 'PRIVATE VILLA RENTALS', value: '200+' },
    { label: 'CURATED EXPERIENCES', value: '150+' },
    { label: 'AWARDS WON', value: '12' },
  ];

  return (
    <section className="py-20 bg-[#6B4E4E] text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-4 group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.3em] font-medium text-white/60">
                {stat.label}
              </div>
              <div className="w-8 h-[1px] bg-[#C9A87C] mx-auto mt-6 group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryStats;
