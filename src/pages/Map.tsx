import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Palette, Music, BookOpen, Camera, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'leaflet/dist/leaflet.css';
import '@/components/map/leaflet-custom.css';

// Fix for default marker icons
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Componente para detectar cliques no mapa
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const Map = () => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const worksPerPage = 6;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Dados de exemplo da Bacia do Rio Doce
  const [sampleWorks, setSampleWorks] = useState([
    {
      id: 1,
      title: "Mural da Resistência",
      author: "Ana Silva",
      description: "Mural retratando a história da Bacia do Rio Doce e as lutas das comunidades locais",
      latitude: -19.9167,
      longitude: -43.9345,
      category: "Arte Urbana",
      region: "Vale do Rio Doce - MG"
    },
    {
      id: 2,
      title: "Escultura do Rio",
      author: "Carlos Mendes",
      description: "Escultura em homenagem ao Rio Doce e sua importância para a região",
      latitude: -19.8500,
      longitude: -43.9500,
      category: "Escultura",
      region: "Vale do Rio Doce - MG"
    },
    {
      id: 3,
      title: "Poema das Águas",
      author: "Maria Santos",
      description: "Poema sobre a relação das comunidades com o Rio Doce",
      latitude: -20.1500,
      longitude: -42.8000,
      category: "Poesia",
      region: "Zona da Mata - MG"
    },
    {
      id: 4,
      title: "Mural da Memória",
      author: "João Oliveira",
      description: "Mural preservando a memória das comunidades ribeirinhas",
      latitude: -19.7500,
      longitude: -42.1500,
      category: "Arte Urbana",
      region: "Vale do Rio Doce - MG"
    },
    {
      id: 5,
      title: "Escultura da Esperança",
      author: "Lucia Ferreira",
      description: "Escultura simbolizando a esperança de recuperação do Rio Doce",
      latitude: -19.4000,
      longitude: -40.1000,
      category: "Escultura",
      region: "Espírito Santo"
    },
    {
      id: 6,
      title: "Canto do Rio",
      author: "Pedro Costa",
      description: "Composição musical inspirada no Rio Doce e sua história",
      latitude: -19.6000,
      longitude: -42.7000,
      category: "Música",
      region: "Vale do Rio Doce - MG"
    },
    {
      id: 7,
      title: "Fotografia da Memória",
      author: "Roberto Lima",
      description: "Série fotográfica documentando a vida das comunidades ribeirinhas",
      latitude: -19.3000,
      longitude: -42.9000,
      category: "Fotografia",
      region: "Vale do Rio Doce - MG"
    },
    {
      id: 8,
      title: "Teatro das Águas",
      author: "Grupo Cultural Rio Doce",
      description: "Peça teatral sobre a história e cultura da região",
      latitude: -19.8000,
      longitude: -43.2000,
      category: "Teatro",
      region: "Vale do Rio Doce - MG"
    },
    {
      id: 9,
      title: "Dança dos Pescadores",
      author: "Cia de Dança Regional",
      description: "Coreografia inspirada nos movimentos dos pescadores tradicionais",
      latitude: -19.5000,
      longitude: -40.5000,
      category: "Dança",
      region: "Espírito Santo"
    },
    {
      id: 10,
      title: "Literatura do Vale",
      author: "Ana Paula Costa",
      description: "Coletânea de contos sobre a vida no Vale do Rio Doce",
      latitude: -19.7000,
      longitude: -42.3000,
      category: "Literatura",
      region: "Vale do Rio Doce - MG"
    },
    {
      id: 11,
      title: "Artesanato em Barro",
      author: "Dona Maria das Panelas",
      description: "Trabalho artesanal em barro tradicional da região",
      latitude: -19.9000,
      longitude: -43.1000,
      category: "Artesanato",
      region: "Vale do Rio Doce - MG"
    },
    {
      id: 12,
      title: "Cinema Documentário",
      author: "Cineasta Local",
      description: "Documentário sobre a transformação da paisagem do Rio Doce",
      latitude: -19.6000,
      longitude: -42.6000,
      category: "Cinema",
      region: "Vale do Rio Doce - MG"
    }
  ]);

  const handleMapClick = (lat: number, lng: number) => {
    if (isAddMode) {
      setSelectedLocation({ lat, lng });
      setShowAddModal(true);
      setIsAddMode(false);
    }
  };

  const handleAddWork = (workData: any) => {
    // Criar nova obra
    const newWork = {
      id: sampleWorks.length + 1,
      title: workData.title,
      author: workData.author,
      description: workData.description,
      category: workData.category,
      region: workData.region,
      latitude: selectedLocation?.lat || 0,
      longitude: selectedLocation?.lng || 0
    };
    
    // Adicionar à lista de obras
    setSampleWorks(prevWorks => [...prevWorks, newWork]);
    
    // Em uma implementação real, isso seria salvo no Supabase
    console.log('Obra adicionada:', newWork);
    
    setShowAddModal(false);
    setSelectedLocation(null);
    
    // Mostrar mensagem de sucesso
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    
    // Voltar para a primeira página se necessário
    const totalPages = Math.ceil((sampleWorks.length + 1) / worksPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#BB4514]/90 to-[#8B4513]/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#BB4514]/20 to-[#8B4513]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#F6D8B8] text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
              Mapa Cultural da Bacia do Rio Doce
            </h1>
            <p className="text-[#E8F5E9] mt-4 text-lg max-w-2xl mx-auto">
              Explore e adicione obras culturais dos 229 municípios da bacia, preservando a memória e identidade desta importante região brasileira
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">86.175 km²</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">229 Municípios</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">853 km de Rio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Estatísticas */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Palette className="w-8 h-8 text-[#BB4514]" />
              </div>
              <h3 className="text-sm font-medium text-[#004A24] mb-2">Total de Obras</h3>
              <div className="text-3xl font-bold text-[#BB4514]">{sampleWorks.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <BookOpen className="w-8 h-8 text-[#BB4514]" />
              </div>
              <h3 className="text-sm font-medium text-[#004A24] mb-2">Categorias</h3>
              <div className="text-3xl font-bold text-[#BB4514]">
                {new Set(sampleWorks.map(w => w.category)).size}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8 text-[#BB4514]" />
              </div>
              <h3 className="text-sm font-medium text-[#004A24] mb-2">Regiões</h3>
              <div className="text-3xl font-bold text-[#BB4514]">
                {new Set(sampleWorks.map(w => w.region)).size}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-[#BB4514]" />
              </div>
              <h3 className="text-sm font-medium text-[#004A24] mb-2">Adicionar Obra</h3>
              <button
                onClick={() => setIsAddMode(!isAddMode)}
                className={`w-full px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                  isAddMode 
                    ? 'bg-red-500 hover:bg-red-600 text-white transform scale-105' 
                    : 'bg-[#BB4514] hover:bg-[#A03D12] text-white hover:transform hover:scale-105'
                }`}
              >
                {isAddMode ? 'Cancelar' : 'Adicionar Obra'}
              </button>
              {isAddMode && (
                <p className="text-xs text-gray-600 mt-2 animate-pulse">
                  🎯 Clique no mapa para selecionar a localização
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Mapa Interativo */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#004A24] mb-6">Mapa Interativo</h2>
          <div className="bg-white rounded-lg shadow-lg p-4">
            {isAddMode && (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">
                  🎯 Modo de adição ativo - Clique no mapa para selecionar a localização da nova obra
                </p>
              </div>
            )}
            <div className="h-[500px] w-full">
              <MapContainer
                center={[-19.5, -42.5]} // Centro aproximado da Bacia do Rio Doce
                zoom={8}
                style={{ height: '100%', width: '100%' }}
                minZoom={6}
                maxZoom={15}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler onMapClick={handleMapClick} />
                {sampleWorks.map((work) => (
                  <Marker 
                    key={work.id} 
                    position={[work.latitude, work.longitude]}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg text-[#004A24]">{work.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Autor:</strong> {work.author}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Categoria:</strong> {work.category}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Região:</strong> {work.region}
                        </p>
                        <p className="text-sm text-gray-600">{work.description}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Lista de Obras */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#004A24] mb-6">Obras Cadastradas</h2>
          
          {(() => {
            const totalPages = Math.ceil(sampleWorks.length / worksPerPage);
            const startIndex = (currentPage - 1) * worksPerPage;
            const endIndex = startIndex + worksPerPage;
            const currentWorks = sampleWorks.slice(startIndex, endIndex);
            
            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentWorks.map((work) => (
                    <div key={work.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-l-4 border-[#BB4514]">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-[#004A24]">{work.title}</h3>
                        <div className="flex items-center space-x-1">
                          {work.category === 'Arte Urbana' && <Palette className="w-4 h-4 text-[#BB4514]" />}
                          {work.category === 'Música' && <Music className="w-4 h-4 text-[#BB4514]" />}
                          {work.category === 'Poesia' && <BookOpen className="w-4 h-4 text-[#BB4514]" />}
                          {work.category === 'Fotografia' && <Camera className="w-4 h-4 text-[#BB4514]" />}
                          {work.category === 'Teatro' && <span className="text-[#BB4514]">🎭</span>}
                          {work.category === 'Dança' && <span className="text-[#BB4514]">💃</span>}
                          {work.category === 'Literatura' && <BookOpen className="w-4 h-4 text-[#BB4514]" />}
                          {work.category === 'Artesanato' && <span className="text-[#BB4514]">🏺</span>}
                          {work.category === 'Cinema' && <span className="text-[#BB4514]">🎬</span>}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-[#004A24]">Autor:</span> {work.author}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-[#004A24]">Categoria:</span> {work.category}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-[#004A24]">Região:</span> {work.region}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 italic">"{work.description}"</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          📍 {work.latitude.toFixed(4)}, {work.longitude.toFixed(4)}
                        </div>
                        <button className="text-xs bg-[#BB4514] text-white px-3 py-1 rounded-full hover:bg-[#A03D12] transition-colors">
                          Ver no Mapa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex gap-1 md:gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        if (pageNum < 1 || pageNum > totalPages) return null;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium text-sm md:text-base transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#BB4514] text-white shadow-md'
                                : 'bg-white text-[#121A0F] border border-[#BB4514] hover:bg-[#F6D8B8]'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[#121A0F]">
                          ...
                        </span>
                      )}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white text-[#121A0F] border border-[#BB4514] hover:bg-[#F6D8B8] text-sm md:text-base transition-colors"
                        >
                          {totalPages}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </section>

        {/* Informações sobre a Bacia do Rio Doce */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#004A24] mb-6">Sobre a Bacia do Rio Doce</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg text-[#004A24] mb-3">Características Geográficas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Área:</strong> 86.175 km² de drenagem</li>
                <li>• <strong>Municípios:</strong> 229 municípios (203 em MG, 26 no ES)</li>
                <li>• <strong>Distribuição:</strong> 86% em Minas Gerais, 14% no Espírito Santo</li>
                <li>• <strong>Extensão:</strong> 853 km do rio principal</li>
                <li>• <strong>Nascente:</strong> Serra da Mantiqueira e Espinhaço</li>
                <li>• <strong>Foz:</strong> Oceano Atlântico (Linhares - ES)</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg text-[#004A24] mb-3">Principais Afluentes</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Margem Esquerda:</strong> Piracicaba, Santo Antônio, Suaçuí</li>
                <li>• <strong>Margem Direita:</strong> Casca, Matipó, Caratinga, Manhuaçu</li>
                <li>• <strong>Sub-bacias:</strong> Piranga, Piracicaba, Santo Antônio</li>
                <li>• <strong>Formação:</strong> Confluência dos rios Piranga e Carmo</li>
                <li>• <strong>Região:</strong> Sudeste do Brasil</li>
                <li>• <strong>Importância:</strong> Cultural, econômica e ambiental</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Como Usar */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#004A24] mb-6">Como Usar o Mapa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#BB4514] rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                <h3 className="font-bold text-lg text-[#004A24]">Explorar</h3>
              </div>
              <p className="text-gray-600">
                Navegue pelo mapa interativo e clique nos marcadores para ver detalhes das obras culturais já cadastradas.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#BB4514] rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                <h3 className="font-bold text-lg text-[#004A24]">Adicionar</h3>
              </div>
              <p className="text-gray-600">
                Clique no botão "Adicionar Obra" e depois clique no mapa para selecionar a localização da nova obra cultural.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#BB4514] rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                <h3 className="font-bold text-lg text-[#004A24]">Compartilhar</h3>
              </div>
              <p className="text-gray-600">
                Preencha o formulário com os detalhes da obra e ajude a preservar a memória cultural da Bacia do Rio Doce.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Mensagem de sucesso */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[10001] animate-in slide-in-from-right">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span>Obra adicionada com sucesso!</span>
          </div>
        </div>
      )}

      {/* Modal para adicionar obra */}
      {showAddModal && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg mx-4 modal-content shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#004A24]">Adicionar Nova Obra</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedLocation(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddWork({
                title: formData.get('title'),
                author: formData.get('author'),
                description: formData.get('description'),
                category: formData.get('category'),
                region: formData.get('region')
              });
            }}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#004A24] mb-2">
                    Título da Obra
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Digite o título da obra cultural"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-[#BB4514] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#004A24] mb-2">
                    Autor/Criador
                  </label>
                  <input
                    type="text"
                    name="author"
                    required
                    placeholder="Nome do autor ou criador"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-[#BB4514] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#004A24] mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Descreva a obra, sua história e importância cultural"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-[#BB4514] transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#004A24] mb-2">
                      Categoria
                    </label>
                    <select
                      name="category"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-[#BB4514] transition-all"
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Arte Urbana">🎨 Arte Urbana</option>
                      <option value="Escultura">🗿 Escultura</option>
                      <option value="Pintura">🖼️ Pintura</option>
                      <option value="Poesia">📝 Poesia</option>
                      <option value="Música">🎵 Música</option>
                      <option value="Literatura">📚 Literatura</option>
                      <option value="Teatro">🎭 Teatro</option>
                      <option value="Dança">💃 Dança</option>
                      <option value="Artesanato">🏺 Artesanato</option>
                      <option value="Fotografia">📸 Fotografia</option>
                      <option value="Cinema">🎬 Cinema</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#004A24] mb-2">
                      Região da Bacia
                    </label>
                    <select
                      name="region"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-[#BB4514] transition-all"
                    >
                      <option value="">Selecione uma região</option>
                      <option value="Vale do Rio Doce - MG">🏔️ Vale do Rio Doce - MG</option>
                      <option value="Zona da Mata - MG">🌳 Zona da Mata - MG</option>
                      <option value="Espírito Santo">🏖️ Espírito Santo</option>
                      <option value="Serra da Mantiqueira - MG">⛰️ Serra da Mantiqueira - MG</option>
                      <option value="Serra do Espinhaço - MG">🏔️ Serra do Espinhaço - MG</option>
                    </select>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-semibold text-blue-800">Localização Selecionada</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                    <div>
                      <span className="font-medium">Latitude:</span> {selectedLocation.lat.toFixed(6)}
                    </div>
                    <div>
                      <span className="font-medium">Longitude:</span> {selectedLocation.lng.toFixed(6)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-[#BB4514] text-white py-3 px-6 rounded-lg hover:bg-[#A03D12] transition-all duration-200 font-semibold hover:transform hover:scale-105"
                >
                  ✨ Adicionar Obra
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedLocation(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Map;