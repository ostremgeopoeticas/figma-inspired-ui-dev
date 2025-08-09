import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full box-border bg-[#BB4514] px-10 py-3">
      <Link to="/">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/53bab51df5ffdee1dc031b6b054768e906c68ca2?width=306"
          alt="Logo Os Trem"
          className="w-[153px] h-[60px]"
        />
      </Link>
      <div className="flex justify-end items-start gap-8 flex-1">
        <nav className="flex h-10 items-center gap-[17px]" role="navigation" aria-label="Menu principal">
          <Link
            to="/sobre"
            className="flex w-[106px] justify-center items-center gap-2.5 text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors"
          >
            Sobre o projeto
          </Link>
          <Link
            to="/equipe"
            className="flex w-[106px] justify-center items-center gap-2.5 text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors"
          >
            Equipe
          </Link>
          <Link
            to="/eventos"
            className="flex w-[135px] justify-center items-center gap-2.5 text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors"
          >
            Encontros e eventos
          </Link>
          <Link
            to="/blog"
            className="flex w-[106px] justify-center items-center gap-2.5 text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/acervo"
            className="flex w-[106px] justify-center items-center gap-2.5 text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors"
          >
            Acervo Digital
          </Link>
          <Link
            to="/contato"
            className="flex w-[106px] justify-center items-center gap-2.5 text-[#F6D8B8] text-sm font-normal leading-[21px] hover:text-white transition-colors"
          >
            Contato
          </Link>
        </nav>
        <Link to="/mapa" className="flex w-[134px] h-10 justify-center items-center gap-2.5 bg-[#4B5A43] p-2.5 rounded-lg max-md:text-xs hover:bg-[#5a6b51] transition-colors">
          <span className="text-[#F6D8B8] text-center text-sm font-bold leading-[21px] max-md:text-xs">
            Mapa Interactivo
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
