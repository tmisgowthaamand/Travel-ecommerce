import React from 'react';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import { blogPosts } from '../data/mockData';
import { Calendar, ArrowRight, Clock, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const BlogPage = () => {
  const { id } = useParams();
  const post = id ? blogPosts.find(p => p.id === parseInt(id)) : null;

  return (
    <div className="min-h-screen bg-white font-sans">
      <TravelHeader />

      {/* Hero: Editorial Grandeur */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom transition-all [transition-duration:5000ms]"
          style={{ backgroundImage: `url(${post?.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80'})` }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/50" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white to-transparent" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full pt-32 text-center lg:text-left">
          <div className="max-w-4xl space-y-10 animate-reveal-up mx-auto lg:mx-0">
            <div className="flex items-center justify-center lg:justify-start gap-6">
              <div className="w-12 h-px bg-[#C9A87C]" />
              <p className="text-[#C9A87C] text-[10px] tracking-[0.6em] font-black uppercase italic">
                {post ? post.category : 'The Chronicles'}
              </p>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-white font-light leading-[0.85] drop-shadow-2xl">
              {post ? post.title : 'Voices of'} <br /><span className="italic">{post ? '' : 'the Wild'}</span>
            </h1>
            {post && (
              <div className="flex items-center justify-center lg:justify-start gap-12 text-white/60 text-[10px] tracking-[0.4em] font-black uppercase italic">
                <span className="flex items-center gap-4">
                  <Calendar className="w-4 h-4 text-[#C9A87C]" />
                  {post.date}
                </span>
                <span className="flex items-center gap-4">
                  <Clock className="w-4 h-4 text-[#C9A87C]" />
                  6 MIN READ
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-24 lg:py-48 bg-white relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {!post ? (
            // Blog List View: Masonry/Editorial Grid
            <div className="space-y-32">
              <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-gray-100 pb-24">
                <div className="max-w-2xl space-y-8">
                  <h2 className="font-serif text-6xl md:text-7xl text-[#1A1A1A] font-light italic">Letters from <br />the Frontier</h2>
                  <p className="text-[#1A1A1A]/40 text-xl font-light leading-relaxed italic max-w-xl">
                    A curated collection of observations, insights, and philosophical reflections from our global network of explorers.
                  </p>
                </div>
                <p className="text-[10px] tracking-[0.4em] font-black text-[#1A1A1A] uppercase italic">Volume IV • Issue II</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-x-12 gap-y-32">
                {blogPosts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/travel/blog/${item.id}`}
                    className="group space-y-12 block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all [transition-duration:1500ms]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform [transition-duration:2000ms]"
                      />
                      <div className="absolute inset-0 bg-[#3D2E2E]/10 group-hover:opacity-0 transition-opacity" />
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center gap-6">
                        <span className="text-[#C9A87C] text-[10px] tracking-[0.4em] font-black uppercase italic">{item.category}</span>
                        <div className="w-12 h-px bg-gray-100" />
                        <span className="text-gray-300 text-[10px] tracking-[0.3em] font-black uppercase">{item.date}</span>
                      </div>

                      <h3 className="font-serif text-4xl text-[#1A1A1A] font-light leading-tight group-hover:text-[#C9A87C] transition-colors italic">
                        {item.title}
                      </h3>

                      <p className="text-[#1A1A1A]/50 text-base font-light leading-relaxed line-clamp-3 italic">
                        {item.excerpt}
                      </p>

                      <div className="pt-6">
                        <span className="text-[10px] tracking-[0.5em] font-black text-[#1A1A1A] border-b-2 border-[#C9A87C] pb-3 group-hover:bg-[#C9A87C] group-hover:text-white group-hover:px-6 transition-all duration-700 uppercase">
                          READ ARTICLE
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            // Single Post View: Deep Immersion
            <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                <Link to="/travel/blog" className="inline-flex items-center gap-3 text-[#1A1A1A]/40 hover:text-[#C9A87C] transition-colors group">
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] tracking-[0.4em] font-black uppercase italic">Back to Journal</span>
                </Link>
              </div>
              <article className="space-y-24">
                <div className="flex flex-col lg:flex-row items-center justify-between pb-16 border-b border-gray-100 gap-12">
                  <div className="flex items-center gap-10">
                    <div className="w-20 h-20 rounded-full overflow-hidden grayscale border border-gray-100 p-1">
                      <img src={post.author?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"} alt={post.author?.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-[0.4em] text-[#C9A87C] font-black uppercase italic">Written By</p>
                      <p className="font-serif text-2xl text-[#1A1A1A] italic">{post.author?.name || 'Alexander Sterling'}</p>
                    </div>
                  </div>
                  <div className="flex gap-10 opacity-30 hover:opacity-100 transition-opacity">
                    {/* Sharing icons would go here */}
                    <p className="text-[10px] tracking-[0.4em] font-black uppercase italic">Share the Narrative</p>
                  </div>
                </div>

                <div className="prose prose-2xl prose-stone max-w-none">
                  <p className="text-4xl font-serif text-[#1A1A1A] leading-relaxed italic mb-20 text-center lg:text-left">
                    {post.excerpt}
                  </p>

                  <div className="space-y-12 text-[#1A1A1A]/60 font-light leading-[2.2] text-xl italic">
                    {post.content ? (
                      post.content.map((block, index) => {
                        switch (block.type) {
                          case 'paragraph':
                            return <p key={index}>{block.text}</p>;
                          case 'quote':
                            return (
                              <div key={index} className="relative py-24 px-16 bg-[#F8F5F2] my-24 overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 h-full bg-[#C9A87C]" />
                                <p className="font-serif text-5xl text-[#1A1A1A] italic leading-tight relative z-10 transition-transform duration-700 group-hover:translate-x-4">
                                  "{block.text}"
                                </p>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] text-[#C9A87C]/5 font-serif italic select-none pointer-events-none">"</div>
                              </div>
                            );
                          case 'image':
                            return (
                              <figure key={index} className="my-16 space-y-4">
                                <div className="overflow-hidden rounded-sm md:rounded-md lg:rounded-lg shadow-xl">
                                  <img
                                    src={block.src}
                                    alt={block.caption || "Blog illustration"}
                                    className="w-full h-auto hover:scale-105 transition-transform [transition-duration:2s]"
                                  />
                                </div>
                                {block.caption && <figcaption className="text-[10px] tracking-[0.2em] text-center text-[#C9A87C] uppercase font-bold pt-4">{block.caption}</figcaption>}
                              </figure>
                            );
                          default:
                            return null;
                        }
                      })
                    ) : (
                      <p>
                        The morning mist clung to the valleys of the Highlands like a forgotten secret. As the first light touched the peaks, the landscape transformed into a tapestry of gold and emerald—a reminder that in the wild, time follows a different rhythm.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-48 pt-24 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-12">
                  <Link
                    to="/travel/blog"
                    className="flex items-center gap-8 group"
                  >
                    <div className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-700">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white rotate-180 transition-colors" />
                    </div>
                    <span className="text-[10px] tracking-[0.5em] font-black text-gray-400 group-hover:text-[#1A1A1A] transition-colors uppercase italic">Return to the Chronicles</span>
                  </Link>

                  <div className="text-center lg:text-right">
                    <p className="text-[9px] tracking-[0.4em] font-black uppercase text-gray-300">Next Article</p>
                    <p className="font-serif text-2xl text-[#1A1A1A] italic group-hover:text-[#C9A87C] transition-colors cursor-pointer mt-2">The Silence of the Sahara</p>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
