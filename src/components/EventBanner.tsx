import React from 'react';
import eventBanner from '@/assets/event-banner.jpg';
import { motion } from 'framer-motion';

const EventBanner = () => {
  return (
    <section className="relative w-full h-[300px] overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${eventBanner})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#BB4514]/80 to-[#BB4514]/60" />
      
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="flex items-center gap-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white">
              <path d="M8 12L12 8L16 12M12 8V24M32 28L28 32L24 28M28 32V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20" cy="20" r="3" fill="currentColor"/>
            </svg>
          </div>
          <motion.h2 
            className="text-2xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            1º ENCONTRO
          </motion.h2>
        </motion.div>
        <motion.h3 
          className="text-xl md:text-3xl font-bold text-[#F6D8B8] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Ipatinga e Coronel Fabriciano
        </motion.h3>
        <motion.p 
          className="text-white text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          de 7 a 9 de outubro de 2024
        </motion.p>
      </div>
    </section>
  );
};

export default EventBanner;