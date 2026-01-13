import React from 'react';
import TravelHeader from '../components/travel/TravelHeader';
import Footer from '../components/layout/Footer';
import ChatButton from '../components/layout/ChatButton';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import DestinationsSection from '../components/home/DestinationsSection';
import ExperiencesSection from '../components/home/ExperiencesSection';
import RentalsSection from '../components/home/RentalsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogSection from '../components/home/BlogSection';
import CTASection from '../components/home/CTASection';
import LuxuryStats from '../components/home/LuxuryStats';

const TravelHomePage = () => {
  return (
    <div className="min-h-screen">
      <TravelHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <LuxuryStats />
        <DestinationsSection />
        <ExperiencesSection />
        <RentalsSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
      <ChatButton />
    </div>
  );
};

export default TravelHomePage;
