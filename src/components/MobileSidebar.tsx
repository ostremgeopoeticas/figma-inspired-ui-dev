import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre o projeto' },
    { path: '/equipe', label: 'Equipe' },
    { path: '/eventos', label: 'Eventos' },
    { path: '/blog', label: 'Blog' },
    { path: '/acervo', label: 'Acervo Digital' },
    { path: '/contato', label: 'Contato' },
    { path: '/mapa', label: 'Mapa Interactivo' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Fecha a sidebar quando a rota muda
  React.useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <>
      {/* Botão de hambúrguer visível apenas em mobile */}
      <button 
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-[#BB4514] shadow-lg"
        onClick={toggleSidebar}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
      >
        <Menu className="text-white" size={24} />
      </button>

      {/* Sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        >
          <div 
            className="fixed left-0 top-0 h-full w-64 bg-[#4B5A43] shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <div className="flex justify-end p-4">
              <button 
                onClick={closeSidebar}
                className="p-2 rounded-full hover:bg-[#5a6b51] focus:outline-none focus:ring-2 focus:ring-[#F6D8B8]"
                aria-label="Fechar menu"
              >
                <X className="text-[#F6D8B8]" size={24} />
              </button>
            </div>

            {/* Links de navegação */}
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-3 px-4 rounded-lg text-[#F6D8B8] hover:bg-[#5a6b51] transition-colors ${
                    location.pathname === item.path ? 'bg-[#5a6b51] font-bold' : ''
                  }`}
                  onClick={closeSidebar}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;