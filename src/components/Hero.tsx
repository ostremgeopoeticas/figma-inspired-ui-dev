import React from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-background.jpg';

const Hero = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-7xl mx-auto px-8 lg:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
            Onde o chão vira palavra e o rio conta histórias.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
            Explorando as expressões culturais e artísticas na cuenca do rio, combinando arte, geografia e memória.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/sobre"
              className="flex justify-center items-center px-8 py-3 bg-[#004A24] text-[#F6D8B8] font-bold rounded-lg hover:bg-[#005a2d] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sobre o projeto
            </Link>
            <Link 
              to="/contato"
              className="flex justify-center items-center px-8 py-3 bg-[#F6D8B8] text-[#4B5A43] font-bold rounded-lg hover:bg-[#f0d0a8] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Envie sua poética
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
