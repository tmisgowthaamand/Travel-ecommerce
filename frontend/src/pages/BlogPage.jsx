import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { blogPosts } from '../data/mockData';
import { Calendar, ArrowRight, Clock, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const BlogPage = () => {
  const { id } = useParams();
  const post = id ? blogPosts.find(p => p.id === parseInt(id)) : null;

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post?.image || blogPosts[0].image})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/80 mb-4">
              {post ? post.category.toUpperCase() : 'FROM OUR JOURNAL'}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light max-w-4xl">
              {post ? post.title : 'Blog & Press'}
            </h1>
            {post && (
              <div className="flex items-center justify-center gap-6 mt-6 text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {!post ? (
            // Blog List
            <div className="grid lg:grid-cols-3 gap-8">
              {blogPosts.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.id}`}
                  className="group"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-sm mb-5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs tracking-[0.15em] text-[#C9A87C] uppercase">{item.category}</span>
                    <span className="text-xs text-[#8B8B8B] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl text-[#6B4E4E] mb-3 group-hover:text-[#8B6B6B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5A5A5A] mb-4">{item.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#C9A87C]">
                    READ MORE
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            // Single Post
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <p className="text-xl text-[#5A5A5A] leading-relaxed mb-8">
                  {post.excerpt}
                </p>
                <p className="text-[#5A5A5A] leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-[#5A5A5A] leading-relaxed mb-6">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <blockquote className="border-l-4 border-[#C9A87C] pl-6 my-8 italic text-[#6B4E4E]">
                  "Travel is the only thing you buy that makes you richer."
                </blockquote>
                <p className="text-[#5A5A5A] leading-relaxed">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </article>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#6B4E4E] hover:text-[#8B6B6B] transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  BACK TO ALL POSTS
                </Link>
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

export default BlogPage;
