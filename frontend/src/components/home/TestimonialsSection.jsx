import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/mockData';

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-48 bg-white border-y border-gray-50">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-24">
          <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-6 font-black uppercase italic">In Fine Company</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] font-light italic">
            Voices of the <span className="italic">extraordinary</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1px bg-gray-100 border border-gray-100">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-12 lg:p-16 group hover:bg-[#F8F5F2] transition-all duration-1000"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-12">
                <Quote className="w-12 h-12 text-[#C9A87C]/20 group-hover:text-[#C9A87C] transition-colors duration-1000" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#C9A87C] text-[#C9A87C]" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p className="font-serif text-2xl text-[#1A1A1A] leading-relaxed mb-12 italic font-light">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-6 pt-12 border-t border-gray-100 group-hover:border-[#C9A87C]/20 transition-colors">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 grayscale group-hover:grayscale-0 transition-all duration-1000 object-cover"
                  />
                  <div className="absolute -inset-2 border border-[#C9A87C]/0 group-hover:border-[#C9A87C]/20 transition-all duration-1000" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-black text-[#1A1A1A] uppercase">{testimonial.name}</p>
                  <p className="text-[9px] tracking-[0.1em] text-gray-400 font-bold uppercase mt-1 italic">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
