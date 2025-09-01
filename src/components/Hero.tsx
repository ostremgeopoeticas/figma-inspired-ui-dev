import React from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/banner_header_principal.png';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-7xl mx-auto px-8 lg:px-16">
        <div className="max-w-2xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Onde o chão vira palavra e o rio conta histórias.
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Explorando as expressões culturais e artísticas na nas beiras do rio, combinando arte, geografia e memória.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
