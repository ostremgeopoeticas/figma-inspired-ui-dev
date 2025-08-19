import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import mapBanner from '@/assets/banner_mapa_page.png';

const Map = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('Virtude');
  const [selectedType, setSelectedType] = useState('Artes Visuais');
  const [selectedTechnique, setSelectedTechnique] = useState('Literatura');

  const regions = ['Todos', 'América do Norte', 'América do Sul', 'Europa', 'África', 'Ásia', 'Oceania'];
  const categories = ['Virtude', 'Arte', 'Cultura', 'História'];
  const types = ['Artes Visuais', 'Música', 'Literatura', 'Teatro'];
  const techniques = ['Literatura', 'Pintura', 'Escultura', 'Fotografia'];

  const locations = [
    { name: 'Literatura', lat: -19.9167, lng: -43.9345, color: 'orange' },
    { name: 'Música', lat: -20.3155, lng: -40.3128, color: 'green' }
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[150px] md:h-[200px] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${mapBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#F6D8B8] text-2xl md:text-4xl font-bold text-center">Mapa das Geopoéticas</h1>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Filtros */}
        <section className="mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            {/* Buscar por autor */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#004A24] mb-1 md:mb-2">Buscar por autor</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome do autor"
                className="w-full px-2 py-1 md:px-4 md:py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] bg-[#EBF2E8] text-sm md:text-base"
              />
            </div>

            {/* Região */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#004A24] mb-1 md:mb-2">Região</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-2 py-1 md:px-4 md:py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] bg-white text-sm md:text-base"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#004A24] mb-1 md:mb-2">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-2 py-1 md:px-4 md:py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] bg-white text-sm md:text-base"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#004A24] mb-1 md:mb-2">Tipo</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-2 py-1 md:px-4 md:py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] bg-white text-sm md:text-base"
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Buscar por localização */}
          <div className="mb-4 md:mb-6">
            <label className="block text-xs md:text-sm font-medium text-[#004A24] mb-1 md:mb-2">Buscar por localização</label>
            <input
              type="text"
              placeholder="Digite uma localização"
              className="w-full max-w-md px-2 py-1 md:px-4 md:py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] bg-[#EBF2E8] text-sm md:text-base"
            />
          </div>
        </section>

        {/* Mapa e controles */}
        <section className="mb-6 md:mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Mapa placeholder */}
            <div className="h-[300px] md:h-[500px] bg-gray-100 relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=1200"
                alt="Mapa mundial"
                className="w-full h-full object-cover"
              />
              
              {/* Controles de zoom */}
              <div className="absolute left-2 md:left-4 top-2 md:top-4 flex flex-col gap-1 md:gap-2">
                <button className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-lg rounded-lg flex items-center justify-center text-lg md:text-xl font-bold text-[#004A24] hover:bg-gray-50">
                  +
                </button>
                <button className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-lg rounded-lg flex items-center justify-center text-lg md:text-xl font-bold text-[#004A24] hover:bg-gray-50">
                  −
                </button>
              </div>

              {/* Marcadores */}
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: '70%',
                    top: '60%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-${location.color}-500 border-2 border-white shadow-lg`}></div>
                  <div className="bg-white px-1 py-0.5 md:px-2 md:py-1 rounded text-xs mt-1 shadow-lg whitespace-nowrap">
                    {location.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legenda */}
        <section className="mb-6 md:mb-8">
          <div className="flex flex-wrap gap-3 md:gap-6 justify-center">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-500"></div>
              <span className="text-[#121A0F] font-medium text-xs md:text-sm">Literatura</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500"></div>
              <span className="text-[#121A0F] font-medium text-xs md:text-sm">Música</span>
            </div>
          </div>
        </section>

        {/* Imagens em destaque */}
        <section className="mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=400"
                alt="Destaque 1"
                className="w-full h-32 md:h-40 object-cover"
              />
              <div className="p-3 md:p-4">
                <h3 className="font-bold text-[#004A24] mb-1 md:mb-2 text-sm md:text-base">Destaque</h3>
                <p className="text-xs md:text-sm text-[#121A0F]">Exploração das manifestações culturais</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=400"
                alt="Destaque 2"
                className="w-full h-32 md:h-40 object-cover"
              />
              <div className="p-3 md:p-4">
                <h3 className="font-bold text-[#004A24] mb-1 md:mb-2 text-sm md:text-base">Geopoéticas</h3>
                <p className="text-xs md:text-sm text-[#121A0F]">Mapeamento territorial e cultural</p>
              </div>
            </div>
          </div>
        </section>

        {/* Botão adicionar nova geopoética */}
        <section className="text-center">
          <button className="bg-[#BB4514] text-white px-4 py-2 md:px-8 md:py-3 rounded-lg font-bold hover:bg-[#A03D12] transition-colors text-sm md:text-base">
            Adicione sua geopoética
          </button>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Map;