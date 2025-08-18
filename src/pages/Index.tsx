import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import EventBanner from '@/components/EventBanner';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      <Hero />
      <AboutSection />
      <EventBanner />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
