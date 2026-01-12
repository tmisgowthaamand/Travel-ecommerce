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
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Blog Posts */}
          <div>
            {/* Header */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">FROM OUR JOURNAL</p>
                <h2 className="font-serif text-4xl md:text-5xl text-[#6B4E4E] font-light">
                  Blog & Press
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#6B4E4E] hover:text-[#8B6B6B] transition-colors"
              >
                VIEW ALL
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Posts */}
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group flex gap-6"
                >
                  <div className="w-32 h-24 flex-shrink-0 rounded-sm overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs tracking-[0.15em] text-[#C9A87C] uppercase">{post.category}</span>
                      <span className="text-[#8B8B8B] text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-[#6B4E4E] group-hover:text-[#8B6B6B] transition-colors mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#8B8B8B] line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/blog"
              className="md:hidden inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#6B4E4E] hover:text-[#8B6B6B] transition-colors mt-8"
            >
              VIEW ALL POSTS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-12">
            <div className="bg-[#F8F5F2] p-10 lg:p-12 rounded-sm h-full flex flex-col justify-center">
              <p className="text-xs tracking-[0.3em] text-[#C9A87C] mb-4">STAY INSPIRED</p>
              <h3 className="font-serif text-3xl md:text-4xl text-[#6B4E4E] font-light mb-6">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-[#5A5A5A] mb-8">
                Receive exclusive travel insights, special offers, and inspiration for your next extraordinary journey.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#C9A87C] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#6B4E4E] text-white text-xs tracking-[0.2em] hover:bg-[#5A3F3F] transition-colors rounded-sm"
                >
                  SUBSCRIBE
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <p className="text-xs text-[#8B8B8B] mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
