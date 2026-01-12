import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/mockData';

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F5F2]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">GUEST STORIES</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#6B4E4E] font-light">
            What Our Travelers Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-[#C9A87C]/30 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A87C] text-[#C9A87C]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#5A5A5A] leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-[#6B4E4E]">{testimonial.name}</p>
                  <p className="text-sm text-[#8B8B8B]">{testimonial.location}</p>
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
