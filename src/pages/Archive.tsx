import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import archiveHero from '@/assets/banner_acervo_digital_page.png';

const Archive = () => {
  const categories = ["Todos os Conteúdos", "Literatura", "Artes"];
  
  const galleryImages = [
    "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=300",
    "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=300"
  ];

  const publications = [
    {
      title: "CENTRO MINEIRO GEOPOÉTICO: UM PERICURSO METODOLÓGICO EM MOVIMENTO DRAMATURGIA MULTIESPECIES",
      description: "Artículo sobre centro mineiro geopoético",
      icon: "📄"
    },
    {
      title: "LIVRO DE ARTIGOS GEOPOÉTICOS - Histórias e metodologias geopoéticas em Ouro Preto e região",
      description: "Coletânea de artigos sobre geopoética",
      icon: "📖"
    }
  ];

  const links = [
    "CENTRO MINEIRO GEOPOÉTICO: UM PERICURSO METODOLÓGICO EM MOVIMENTO DRAMATURGIA MULTIESPECIES",
    "Geopoética: uma perspectiva poética da geografia",
    "Intercâmbio e diálogos: memória, tradição, território e paisagem intercultural da Rota do Sal",
    "Geografia da travessia: utopia lusíada e imaginação geográfica em Álvaro Cunqueiro",
    "Revista Nós: um olhar interdisciplinar sobre as geografias do território"
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[200px] md:h-[300px] relative bg-gradient-to-r from-[#4B5A43] to-[#6B7A63] overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b40096a763428a08b2da23b86127f33486875a6a?width=2560"
          alt="Banner acervo digital"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#F6D8B8] text-3xl md:text-5xl font-bold text-center">Acervo Digital</h1>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Filtros */}
        <section className="mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-2 md:px-6 md:py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
                  index === 0 
                    ? 'bg-[#BB4514] text-white' 
                    : 'bg-white text-[#121A0F] hover:bg-[#F6D8B8] border border-[#BB4514]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Galeria */}
        <section className="mb-12 md:mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={image}
                  alt={`Imagem do acervo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Publicações */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6 md:mb-8">Publicações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {publications.map((publication, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="text-2xl md:text-4xl">{publication.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-[#004A24] mb-2">{publication.title}</h3>
                    <p className="text-[#121A0F] text-xs md:text-sm mb-3 md:mb-4">{publication.description}</p>
                    <button className="bg-[#BB4514] text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-[#A03D12] transition-colors text-sm md:text-base">
                      Acessar PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Links para Publicações */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6 md:mb-8">Links para Publicações</h2>
          <div className="space-y-3 md:space-y-4">
            {links.map((link, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-3 md:p-4 flex items-center justify-between hover:shadow-xl transition-shadow">
                <span className="text-[#121A0F] font-medium text-sm md:text-base">{link}</span>
                <button className="text-[#BB4514] hover:text-[#A03D12] transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Archive;