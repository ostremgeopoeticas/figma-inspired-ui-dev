import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <div className="flex min-h-[800px] flex-col items-start w-full">
        <div className="flex flex-col items-start w-full">
          <Header />
          <Hero />
          <AboutSection />
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/b40096a763428a08b2da23b86127f33486875a6a?width=2560"
            alt="Banner decorativo do projeto Os Trem"
            className="w-full h-[235px] object-cover"
          />
          <BlogSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
