import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Users, Calendar, FileText, Archive, Map, Mail, Info, ExternalLink } from 'lucide-react';
import logoOsTrem from '@/assets/logo_os_trem.svg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navItemsRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navItems = [
    { path: '/', label: 'Início', icon: <Home className="w-5 h-5" />, description: 'Página inicial do projeto' },
    { path: '/sobre', label: 'Sobre o projeto', icon: <Info className="w-5 h-5" />, description: 'Informações sobre o projeto Os Trem' },
    { path: '/equipe', label: 'Equipe', icon: <Users className="w-5 h-5" />, description: 'Conheça nossa equipe de pesquisadores' },
    { path: '/eventos', label: 'Eventos', icon: <Calendar className="w-5 h-5" />, description: 'Eventos e atividades do projeto' },
    { path: '/blog', label: 'Blog', icon: <FileText className="w-5 h-5" />, description: 'Artigos e notícias do projeto' },
    { path: '/acervo', label: 'Acervo Digital', icon: <Archive className="w-5 h-5" />, description: 'Acervo digital de materiais culturais' },
    { path: '/mapa', label: 'Mapa Interativo', icon: <Map className="w-5 h-5" />, description: 'Mapa interativo da Bacia do Rio Doce' },
    { path: '/contato', label: 'Contato', icon: <Mail className="w-5 h-5" />, description: 'Entre em contato conosco' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      // Foca no primeiro item quando abre
      setTimeout(() => {
        if (navItemsRefs.current[0]) {
          navItemsRefs.current[0].focus();
        }
      }, 300);
    } else {
      // Retorna o foco para o botão quando fecha
      if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setFocusedIndex(-1);
    // Retorna o foco para o botão
    if (menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  };

  // Fecha o menu quando a rota muda
  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  // Previne scroll do body quando menu está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMobileMenuOpen) return;

      switch (event.key) {
        case 'Escape':
          closeMobileMenu();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => {
            const next = prev < navItems.length - 1 ? prev + 1 : 0;
            navItemsRefs.current[next]?.focus();
            return next;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => {
            const next = prev > 0 ? prev - 1 : navItems.length - 1;
            navItemsRefs.current[next]?.focus();
            return next;
          });
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          navItemsRefs.current[0]?.focus();
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(navItems.length - 1);
          navItemsRefs.current[navItems.length - 1]?.focus();
          break;
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen, navItems.length]);

  return (
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

      {/* Botão de menu mobile */}
      <motion.button 
        ref={menuButtonRef}
        className="md:hidden p-2 rounded-lg bg-[#4B5A43] hover:bg-[#5a6b51] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F6D8B8] focus:ring-offset-2"
        onClick={toggleMobileMenu}
        aria-label="Abrir menu de navegação"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        aria-haspopup="true"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMobileMenuOpen ? (
          <X className="text-[#F6D8B8]" size={24} aria-hidden="true" />
        ) : (
          <Menu className="text-[#F6D8B8]" size={24} aria-hidden="true" />
        )}
      </motion.button>

      {/* Menu mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-[#4B5A43] shadow-2xl border-t border-[#5a6b51]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            role="menu"
            aria-label="Menu de navegação"
          >
            <nav className="flex flex-col p-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    ref={el => navItemsRefs.current[index] = el}
                    to={item.path}
                    className={`flex items-center gap-4 py-4 px-4 rounded-xl text-[#F6D8B8] hover:bg-[#5a6b51] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F6D8B8] focus:ring-offset-2 ${
                      location.pathname === item.path 
                        ? 'bg-[#5a6b51] font-bold shadow-lg ring-2 ring-[#BB4514]' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={closeMobileMenu}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    aria-describedby={`nav-item-${index}-desc`}
                    role="menuitem"
                  >
                    <div 
                      className={`${location.pathname === item.path ? 'text-[#BB4514]' : 'text-[#F6D8B8]'}`}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>
                    <span className="text-base font-medium">{item.label}</span>
                    {item.path === '/mapa' && (
                      <ExternalLink className="w-4 h-4 ml-auto opacity-60" aria-hidden="true" />
                    )}
                  </Link>
                  <div 
                    id={`nav-item-${index}-desc`} 
                    className="sr-only"
                  >
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </nav>
            
            {/* Footer do menu mobile */}
            <div className="p-4 border-t border-[#5a6b51] bg-[#3d4a35]">
              <div className="text-center">
                <p className="text-[#F6D8B8]/70 text-sm mb-2">
                  Projeto Os Trem
                </p>
                <p className="text-[#F6D8B8]/50 text-xs">
                  Mapeamento Cultural da Bacia do Rio Doce
                </p>
                <div className="mt-3 text-[#F6D8B8]/40 text-xs">
                  Use as setas para navegar • ESC para fechar
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
