import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Image, FileText, ExternalLink, Heart, Search, Filter, Download, Eye, Calendar, MapPin } from 'lucide-react';
import archiveHero from '@/assets/banner_acervo_digital_page.png';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Array das imagens organizadas por posição (linha x coluna)
  const galleryImages = [
    // Linha 1
    { src: i1_1, alt: "Grupo de pessoas em auditório", position: "i1_1", category: "Eventos", date: "2024" },
    { src: i1_2, alt: "Homem apresentando", position: "i1_2", category: "Apresentações", date: "2024" },
    { src: i1_3, alt: "Pessoas em mesa de palco", position: "i1_3", category: "Mesa-redonda", date: "2024" },
    { src: i1_4, alt: "Discussão em grupo", position: "i1_4", category: "Oficinas", date: "2024" },
    { src: i1_5, alt: "Reunião em sala", position: "i1_5", category: "Encontros", date: "2024" },
    // Linha 2
    { src: i2_1, alt: "Grupo em discussão casual", position: "i2_1", category: "Discussões", date: "2024" },
    { src: i2_2, alt: "Pessoas em sala de conferência", position: "i2_2", category: "Conferências", date: "2024" },
    { src: i2_3, alt: "Mulher apresentando", position: "i2_3", category: "Apresentações", date: "2024" },
    { src: i2_4, alt: "Atividade em grupo", position: "i2_4", category: "Atividades", date: "2024" },
    { src: i2_5, alt: "Apresentação acadêmica", position: "i2_5", category: "Acadêmico", date: "2024" },
  ];

  const publications = [
    {
      title: "Geopoéticas da Bacia do Rio Doce",
      description: "Exploração das expressões culturais e artísticas na bacia do rio.",
      type: "PDF",
      icon: "📄",
      date: "2024",
      author: "Equipe Os Trem",
      category: "Pesquisa"
    },
    {
      title: "Memórias do Rio Doce",
      description: "Relatos e histórias das comunidades ribeirinhas.",
      type: "PDF",
      icon: "🌿",
      date: "2024",
      author: "Comunidades Locais",
      category: "Memória"
    },
    {
      title: "Manifestações Culturais",
      description: "Mapeamento das expressões artísticas da região.",
      type: "PDF",
      icon: "🎨",
      date: "2024",
      author: "Pesquisadores",
      category: "Cultura"
    }
  ];

  const links = [
    {
      title: "GOSTO AMARGO DO RIO DOCE: UMA ANÁLISE DE DISCURSOS JORNALÍSTICOS E ARTÍSTICO-LITERÁRIOS",
      url: "http://periodicos.unifacef.com.br/rel/article/view/1336",
      author: "Pesquisadores",
      year: "2023",
      category: "Análise"
    },
    {
      title: "Doce esperança.",
      url: "https://monografias.ufop.br/handle/35400000/7461",
      author: "Estudantes UFOP",
      year: "2023",
      category: "Monografia"
    },
    {
      title: "Subjetividades em Trânsito: Memória, Emoção, E-Imigração e Identidades",
      url: "https://www.academia.edu/35997162/Subjetividades_em_Tr%C3%A2nsito_Mem%C3%B3ria_Emo%C3%A7%C3%A3o_E_Imigra%C3%A7%C3%A3o_e_Identidades",
      author: "Academia.edu",
      year: "2023",
      category: "Pesquisa"
    },
    {
      title: "Topologias da escuta: como tocar as costas do céu com a boca do rio.",
      url: "https://openurl.ebsco.com/EPDB%3Agcd%3A14%3A26280302/detailv2?sid=ebsco%3Aplink%3Ascholar&id=ebsco%3Agcd%3A182629636&crl=c&link_origin=scholar.google.com.br",
      author: "EBSCO",
      year: "2023",
      category: "Artigo"
    },
    {
      title: "Dois autores e um rio: entre o real e o imaginário na poesia infantil contemporânea",
      url: "http://www.olhodagua.ibilce.unesp.br/index.php/revistamosaico/article/view/609",
      author: "Revista Olho d'Água",
      year: "2023",
      category: "Literatura"
    }
  ];

  const stats = [
    { label: "Imagens", value: "10", icon: <Image className="w-6 h-6" /> },
    { label: "Publicações", value: "3", icon: <FileText className="w-6 h-6" /> },
    { label: "Links", value: "5", icon: <ExternalLink className="w-6 h-6" /> },
    { label: "Categorias", value: "8", icon: <BookOpen className="w-6 h-6" /> }
  ];

  const handleSubmitPoetics = () => {
    window.open('https://docs.google.com/forms/d/1XqnGfyiYwrvKza0lVrUHgWHJTx1damARbZ5X-tGWwes/viewform?edit_requested=true', '_blank');
  };

  const filteredImages = galleryImages.filter(image =>
    image.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${archiveHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#BB4514]/80 to-[#8B4513]/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#BB4514]/20 to-[#8B4513]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#F6D8B8] text-4xl md:text-6xl font-bold text-center drop-shadow-lg mb-4">
              Acervo Digital
            </h1>
            <p className="text-[#E8F5E9] text-lg md:text-xl max-w-3xl mx-auto px-4">
              Explore nossa coleção de imagens, publicações e recursos sobre a Bacia do Rio Doce
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Imagens</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Publicações</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Links</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* Estatísticas */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-4">Números do Acervo</h2>
              <p className="text-gray-600">Conheça a extensão do nosso acervo digital</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-[#004A24] mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Galeria de Imagens */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Galeria de Imagens</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          {/* Filtros e Busca */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar imagens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                >
                  <option value="">Todas as categorias</option>
                  <option value="eventos">Eventos</option>
                  <option value="apresentacoes">Apresentações</option>
                  <option value="oficinas">Oficinas</option>
                  <option value="encontros">Encontros</option>
                </select>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                >
                  <option value="">Todas as localizações</option>
                  <option value="ipatinga">Ipatinga</option>
                  <option value="coronel-fabriciano">Coronel Fabriciano</option>
                  <option value="bacia-rio-doce">Bacia do Rio Doce</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Grid de Imagens */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#BB4514] text-white px-2 py-1 rounded-full text-xs font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">{image.alt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{image.date}</span>
                    <span>{image.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publicações */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Publicações</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{pub.icon}</div>
                <h3 className="text-xl font-bold text-[#004A24] mb-3">{pub.title}</h3>
                <p className="text-gray-600 mb-4">{pub.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#BB4514]/10 text-[#BB4514] px-3 py-1 rounded-full text-sm font-medium">
                    {pub.category}
                  </span>
                  <span className="text-sm text-gray-500">{pub.date}</span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Autor:</span> {pub.author}
                </div>
                <button className="w-full bg-[#BB4514] text-white py-2 px-4 rounded-lg hover:bg-[#A03D12] transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Baixar {pub.type}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Links Acadêmicos */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Links Acadêmicos</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#004A24] mb-2">{link.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{link.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{link.author}</span>
                        </div>
                        <span className="bg-[#BB4514]/10 text-[#BB4514] px-2 py-1 rounded-full text-xs font-medium">
                          {link.category}
                        </span>
                      </div>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#BB4514] text-white px-6 py-3 rounded-lg hover:bg-[#A03D12] transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Acessar</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Envie sua Poética */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[#BB4514] to-[#8B4513] rounded-2xl p-8 md:p-12 text-white">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contribua com sua Poética</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Faça parte do nosso acervo digital enviando sua poesia, memória ou reflexão sobre a Bacia do Rio Doce
            </p>
            <button
              onClick={handleSubmitPoetics}
              className="bg-white text-[#BB4514] px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2 text-lg"
            >
              <Heart className="w-5 h-5" />
              Enviar Minha Contribuição
            </button>
          </div>
        </section>
      </div>

      {/* Modal para visualização de imagem */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Archive;