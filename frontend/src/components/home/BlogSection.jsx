import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/mockData';
import { ArrowRight, Calendar, Send } from 'lucide-react';

const BlogSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Blog Posts */}
          <div>
            {/* Header */}
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-[#C9A87C] text-xs tracking-[0.4em] mb-4 uppercase font-bold">The Library</p>
                <h2 className="font-serif text-5xl md:text-6xl text-[#6B4E4E] font-light">
                  Our <span className="italic">Journal</span>
                </h2>
              </div>
              <Link
                to="/travel/blog"
                className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-bold text-[#6B4E4E] border-b border-[#6B4E4E] pb-1 hover:text-[#C9A87C] hover:border-[#C9A87C] transition-all duration-300"
              >
                VIEW ALL STORIES
              </Link>
            </div>

            {/* Posts */}
            <div className="space-y-12">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/travel/blog/${post.id}`}
                  className="group flex flex-col sm:flex-row gap-8 items-center"
                >
                  <div className="w-full sm:w-48 aspect-[4/3] flex-shrink-0 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-4 mb-3">
                      <span className="text-[10px] tracking-[0.2em] text-[#C9A87C] font-bold uppercase">{post.category}</span>
                      <span className="w-4 h-[1px] bg-gray-200" />
                      <span className="text-gray-400 text-[10px] tracking-widest uppercase font-medium">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#6B4E4E] group-hover:text-[#C9A87C] transition-colors mb-3 font-light leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 italic font-light leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-12 flex items-center">
            <div className="bg-[#1A1A1A] p-12 lg:p-16 relative overflow-hidden text-center w-full">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A87C]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C9A87C]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <p className="text-[#C9A87C] text-[10px] tracking-[0.4em] mb-6 uppercase font-bold">Stay Connected</p>
                <h3 className="font-serif text-4xl text-white font-light mb-8 leading-tight">
                  Join Our World <br /><span className="italic">of Discovery</span>
                </h3>
                <p className="text-white/50 mb-10 text-sm font-light leading-relaxed max-w-sm mx-auto">
                  Receive exclusive travel insights, special collections, and inspiration for your next extraordinary journey.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white text-xs tracking-widest focus:outline-none focus:border-[#C9A87C] transition-all duration-300 placeholder:text-white/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[#C9A87C] text-[#1A1A1A] text-[10px] tracking-[0.3em] font-black hover:bg-white transition-all duration-500 uppercase"
                  >
                    SUBSCRIBE
                  </button>
                </form>

                <p className="text-[9px] tracking-widest text-white/30 mt-10 uppercase font-bold">
                  Privacy First. Excellence Always.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
