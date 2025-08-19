import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import archiveHero from '@/assets/banner_acervo_digital_page.png';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Importar imagens do acervo digital
import i1_1 from '@/assets/acervo_digital/i1_1.png';
import i1_2 from '@/assets/acervo_digital/i1_2.png';
import i1_3 from '@/assets/acervo_digital/i1_3.png';
import i1_4 from '@/assets/acervo_digital/i1_4.png';
import i1_5 from '@/assets/acervo_digital/i1_5.png';
import i2_1 from '@/assets/acervo_digital/i2_1.png';
import i2_2 from '@/assets/acervo_digital/i2_2.png';
import i2_3 from '@/assets/acervo_digital/i2_3.png';
import i2_4 from '@/assets/acervo_digital/i2_4.png';
import i2_5 from '@/assets/acervo_digital/i2_5.png';

const Archive = () => {
  const [contentType, setContentType] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  // Array das imagens organizadas por posição (linha x coluna)
  const galleryImages = [
    // Linha 1
    { src: i1_1, alt: "Grupo de pessoas em auditório", position: "i1_1" },
    { src: i1_2, alt: "Homem apresentando", position: "i1_2" },
    { src: i1_3, alt: "Pessoas em mesa de palco", position: "i1_3" },
    { src: i1_4, alt: "Discussão em grupo", position: "i1_4" },
    { src: i1_5, alt: "Reunião em sala", position: "i1_5" },
    // Linha 2
    { src: i2_1, alt: "Grupo em discussão casual", position: "i2_1" },
    { src: i2_2, alt: "Pessoas em sala de conferência", position: "i2_2" },
    { src: i2_3, alt: "Mulher apresentando", position: "i2_3" },
    { src: i2_4, alt: "Atividade em grupo", position: "i2_4" },
    { src: i2_5, alt: "Apresentação acadêmica", position: "i2_5" },
  ];

  const publications = [
    {
      title: "Geopoéticas da Bacia do Rio Doce",
      description: "Exploração das expressões culturais e artísticas na bacia do rio.",
      type: "PDF",
      icon: "📄"
    },
    {
      title: "Memórias do Rio Doce",
      description: "Relatos e histórias das comunidades ribeirinhas.",
      type: "PDF",
      icon: "🌿"
    }
  ];

  const links = [
    {
      title: "GOSTO AMARGO DO RIO DOCE: UMA ANÁLISE DE DISCURSOS JORNALÍSTICOS E ARTÍSTICO-LITERÁRIOS",
      url: "http://periodicos.unifacef.com.br/rel/article/view/1336"
    },
    {
      title: "Doce esperança.",
      url: "https://monografias.ufop.br/handle/35400000/7461"
    },
    {
      title: "Subjetividades em Trânsito: Memória, Emoção, E-Imigração e Identidades",
      url: "https://www.academia.edu/35997162/Subjetividades_em_Tr%C3%A2nsito_Mem%C3%B3ria_Emo%C3%A7%C3%A3o_E_Imigra%C3%A7%C3%A3o_e_Identidades"
    },
    {
      title: "Topologias da escuta: como tocar as costas do céu com a boca do rio.",
      url: "https://openurl.ebsco.com/EPDB%3Agcd%3A14%3A26280302/detailv2?sid=ebsco%3Aplink%3Ascholar&id=ebsco%3Agcd%3A182629636&crl=c&link_origin=scholar.google.com.br"
    },
    {
      title: "Dois autores e um rio: entre o real e o imaginário na poesia infantil contemporânea",
      url: "http://www.olhodagua.ibilce.unesp.br/index.php/revistamosaico/article/view/609"
    }
  ];

  const handleSubmitPoetics = () => {
    window.open('https://docs.google.com/forms/d/1XqnGfyiYwrvKza0lVrUHgWHJTx1damARbZ5X-tGWwes/viewform?edit_requested=true', '_blank');
  };

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${archiveHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#F6D8B8] text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
            Acervo Digital
          </h1>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Filtros */}
          <section className="mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="bg-[#E8F5E9] border-[#004A24] text-[#004A24] font-medium">
                    <SelectValue placeholder="Tipo de Conteúdo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Conteúdos</SelectItem>
                    <SelectItem value="literatura">Literatura</SelectItem>
                    <SelectItem value="artes">Artes</SelectItem>
                    <SelectItem value="cultura">Cultura</SelectItem>
                    <SelectItem value="historia">História</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="bg-[#E8F5E9] border-[#004A24] text-[#004A24] font-medium">
                    <SelectValue placeholder="Localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as Localizações</SelectItem>
                    <SelectItem value="ouro-preto">Ouro Preto</SelectItem>
                    <SelectItem value="mariana">Mariana</SelectItem>
                    <SelectItem value="sao-joao">São João Evangelista</SelectItem>
                    <SelectItem value="outras">Outras Localidades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Galeria de Imagens */}
          <section className="mb-16 md:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </section>

          {/* Publicações */}
          <section className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-8 md:mb-12 text-center">
              Publicações
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {publications.map((publication, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 border border-[#E8F5E9]"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="text-3xl md:text-4xl">{publication.icon}</div>
                    <div className="flex-1">
                      <div className="bg-[#BB4514] text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                        {publication.type}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#004A24] mb-2">{publication.title}</h3>
                      <p className="text-[#121A0F] text-sm md:text-base mb-4">{publication.description}</p>
                      <button className="bg-[#004A24] text-white px-4 py-2 rounded-lg hover:bg-[#005a2d] transition-colors text-sm font-medium">
                        Acessar PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Links para Publicações */}
          <section className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-8 md:mb-12 text-center">
              Links para Publicações
            </h2>
            <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
              {links.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 border border-[#E8F5E9] cursor-pointer group block"
                >
                  <span className="text-[#121A0F] font-medium text-sm md:text-base group-hover:text-[#004A24] transition-colors">
                    {link.title}
                  </span>
                  <div className="text-[#BB4514] group-hover:text-[#A03D12] transition-colors">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Botão Envie sua Poética */}
          <section className="text-center">
            <button
              onClick={handleSubmitPoetics}
              className="bg-[#F6D8B8] text-[#004A24] px-8 py-4 rounded-xl font-bold text-lg md:text-xl hover:bg-[#f0d0a8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Envie sua poética
            </button>
          </section>
        </div>
      <Footer />
    </div>
  );
};

export default Archive;