import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileSidebar from './MobileSidebar';
import logoOsTrem from '@/assets/logo_os_trem.svg';

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center w-full box-border bg-[#BB4514] px-4 py-3 md:px-10 md:py-3 sticky top-0 left-0 right-0 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <img
              src={logoOsTrem}
              alt="Logo Os Trem"
              className="w-[100px] h-[40px] md:w-[153px] md:h-[60px]"
            />
          </Link>
        </motion.div>
        
        {/* Navegação desktop - oculta em mobile */}
        <div className="hidden md:flex justify-end items-start gap-8 flex-1">
          <nav className="flex h-10 items-center gap-[17px]" role="navigation" aria-label="Menu principal">
            {['sobre', 'equipe', 'eventos', 'blog', 'acervo', 'mapa', 'contato'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={`/${item}`}
                  className="flex w-[106px] justify-center items-center gap-2.5 text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors"
                >
                  {item === 'sobre' && 'Sobre o projeto'}
                  {item === 'equipe' && 'Equipe'}
                  {item === 'eventos' && 'Eventos'}
                  {item === 'blog' && 'Blog'}
                  {item === 'acervo' && 'Acervo Digital'}
                  {item === 'mapa' && 'Mapa Interativo'}
                  {item === 'contato' && 'Contato'}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/mapa" className="flex w-[134px] h-10 justify-center items-center gap-2.5 bg-[#4B5A43] p-2.5 rounded-lg max-md:text-xs hover:bg-[#5a6b51] transition-colors">
              <span className="text-[#F6D8B8] text-center text-sm font-bold leading-[21px] max-md:text-xs">
                Mapa Interativo
              </span>
            </Link>
          </motion.div>
        </div>
      </header>
      
      {/* Sidebar mobile para telas pequenas */}
      <MobileSidebar />
    </>
  );
};

export default Header;
