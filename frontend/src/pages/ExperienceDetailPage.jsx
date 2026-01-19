import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import { experiences } from '../data/mockData';
import { ArrowRight, ArrowLeft, Clock, Users, Calendar, MapPin, Check, Star } from 'lucide-react';

const ExperienceDetailPage = () => {
    const { id } = useParams();

    // Find the experience by ID
    const experience = experiences.find(exp => exp.id === parseInt(id));

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!experience) {
        return (
            <div className="min-h-screen bg-[#F8F5F2] flex items-center justify-center">
                <div className="text-center space-y-6">
                    <h1 className="font-serif text-4xl text-[#1A1A1A]">Experience Not Found</h1>
                    <Link to="/travel/experiences" className="text-[#C9A87C] hover:underline">
                        ← Back to Experiences
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F5F2] font-sans selection:bg-[#C9A87C] selection:text-[#1A1A1A]">
            <TravelHeader />

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform [transition-duration:8000ms] hover:scale-105"
                    style={{ backgroundImage: `url(${experience.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 w-full pb-16">
                    <Link
                        to={`/travel/experiences/${experience.category}`}
                        className="inline-flex items-center gap-3 text-white/70 hover:text-white text-sm mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to {experience.category.replace('-', ' ')}
                    </Link>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="bg-[#C9A87C] px-4 py-2 text-[10px] tracking-[0.3em] font-black text-white uppercase">
                                {experience.type}
                            </span>
                            {experience.difficulty && (
                                <span className="bg-white/10 backdrop-blur-xl px-4 py-2 text-[10px] tracking-[0.3em] font-black text-white uppercase">
                                    {experience.difficulty}
                                </span>
                            )}
                        </div>

                        <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-tight">
                            {experience.title}
                        </h1>

                        <div className="flex flex-wrap gap-8 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#C9A87C]" />
                                {experience.duration}
                            </div>
                            {experience.groupSize && (
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#C9A87C]" />
                                    {experience.groupSize}
                                </div>
                            )}
                            {experience.bestSeason && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#C9A87C]" />
                                    {experience.bestSeason}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 lg:py-32">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-3 gap-16">

                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-16">

                            {/* Description */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <span className="w-12 h-px bg-[#C9A87C]" />
                                    <p className="text-[#C9A87C] text-[11px] tracking-[0.6em] font-black uppercase">The Experience</p>
                                </div>
                                <p className="text-[#1A1A1A]/70 text-xl leading-relaxed font-light">
                                    {experience.fullDescription || experience.description}
                                </p>
                            </div>

                            {/* Course Info */}
                            {experience.courseInfo && (
                                <div className="bg-white p-10 border border-[#1A1A1A]/5 shadow-xl space-y-8">
                                    <div className="flex items-center gap-4">
                                        <span className="w-12 h-px bg-[#C9A87C]" />
                                        <p className="text-[#C9A87C] text-[11px] tracking-[0.6em] font-black uppercase">Course Details</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        <div className="text-center p-6 bg-[#F8F5F2] border border-[#1A1A1A]/5">
                                            <p className="font-serif text-3xl text-[#1A1A1A] mb-2">{experience.courseInfo.par}</p>
                                            <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/50 uppercase font-bold">Par</p>
                                        </div>
                                        <div className="text-center p-6 bg-[#F8F5F2] border border-[#1A1A1A]/5">
                                            <p className="font-serif text-2xl text-[#1A1A1A] mb-2">{experience.courseInfo.yardage}</p>
                                            <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/50 uppercase font-bold">Yardage</p>
                                        </div>
                                        <div className="text-center p-6 bg-[#F8F5F2] border border-[#1A1A1A]/5">
                                            <p className="font-serif text-3xl text-[#1A1A1A] mb-2">{experience.courseInfo.established}</p>
                                            <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/50 uppercase font-bold">Established</p>
                                        </div>
                                        <div className="text-center p-6 bg-[#F8F5F2] border border-[#1A1A1A]/5">
                                            <p className="font-serif text-lg text-[#1A1A1A] mb-2 leading-tight">{experience.courseInfo.designer}</p>
                                            <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/50 uppercase font-bold">Designer</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Itinerary */}
                            {experience.itinerary && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <span className="w-12 h-px bg-[#C9A87C]" />
                                        <p className="text-[#C9A87C] text-[11px] tracking-[0.6em] font-black uppercase">Your Day</p>
                                    </div>
                                    <div className="space-y-6">
                                        {experience.itinerary.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-6 p-6 bg-white border border-[#1A1A1A]/5 hover:border-[#C9A87C]/30 transition-colors group"
                                            >
                                                <div className="flex-shrink-0 w-20 text-center">
                                                    <p className="font-serif text-2xl text-[#C9A87C]">{item.time}</p>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[#1A1A1A] font-light text-lg group-hover:text-[#C9A87C] transition-colors">
                                                        {item.activity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Gallery */}
                            {experience.gallery && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <span className="w-12 h-px bg-[#C9A87C]" />
                                        <p className="text-[#C9A87C] text-[11px] tracking-[0.6em] font-black uppercase">Gallery</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {experience.gallery.map((img, index) => (
                                            <div key={index} className="aspect-[4/3] overflow-hidden group">
                                                <img
                                                    src={img}
                                                    alt={`${experience.title} gallery ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-8">

                            {/* Pricing Card */}
                            {experience.pricing && (
                                <div className="bg-[#1A1A1A] text-white p-10 sticky top-32 space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] font-black uppercase">From</p>
                                        <p className="font-serif text-5xl">{experience.pricing.from}</p>
                                        <p className="text-white/50 text-sm">
                                            {experience.pricing.perPerson ? 'per person' : 'per group'}
                                        </p>
                                    </div>

                                    <div className="w-full h-px bg-white/10" />

                                    <p className="text-white/70 text-sm">
                                        {experience.pricing.includes}
                                    </p>

                                    <Link
                                        to="/travel/contact"
                                        className="group flex items-center justify-center gap-4 bg-[#C9A87C] text-[#1A1A1A] w-full py-5 text-[11px] tracking-[0.4em] font-black uppercase hover:bg-white transition-colors"
                                    >
                                        Book This Experience
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            )}

                            {/* Inclusions */}
                            {experience.inclusions && (
                                <div className="bg-white p-10 border border-[#1A1A1A]/5 space-y-6">
                                    <p className="text-[#C9A87C] text-[11px] tracking-[0.5em] font-black uppercase">What's Included</p>
                                    <ul className="space-y-4">
                                        {experience.inclusions.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-[#C9A87C] flex-shrink-0 mt-0.5" />
                                                <span className="text-[#1A1A1A]/70 text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Highlights */}
                            {experience.highlights && (
                                <div className="bg-[#F8F5F2] p-10 border border-[#1A1A1A]/5 space-y-6">
                                    <p className="text-[#C9A87C] text-[11px] tracking-[0.5em] font-black uppercase">Highlights</p>
                                    <ul className="space-y-3">
                                        {experience.highlights.map((item, index) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <Star className="w-4 h-4 text-[#C9A87C] flex-shrink-0" />
                                                <span className="text-[#1A1A1A]/70 text-sm font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#1A1A1A]">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center space-y-10">
                    <p className="text-[#C9A87C] text-[11px] tracking-[0.8em] font-black uppercase">Ready to Begin?</p>
                    <h2 className="font-serif text-4xl md:text-6xl text-white font-light italic">
                        Let us craft your perfect <span className="text-[#C9A87C]">golf experience</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <Link
                            to="/travel/contact"
                            className="group inline-flex items-center justify-center gap-4 bg-[#C9A87C] text-[#1A1A1A] px-12 py-5 text-[11px] tracking-[0.4em] font-black uppercase hover:bg-white transition-colors"
                        >
                            Inquire Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link
                            to={`/travel/experiences/${experience.category}`}
                            className="inline-flex items-center justify-center gap-4 border border-white/20 text-white px-12 py-5 text-[11px] tracking-[0.4em] font-black uppercase hover:border-[#C9A87C] hover:text-[#C9A87C] transition-colors"
                        >
                            View More Experiences
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ExperienceDetailPage;
