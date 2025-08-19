import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin, Palette, Music, BookOpen, Camera, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCulturalWorks, getCulturalWorksStats, createCulturalWork, getCulturalCategories, getRegions, type CulturalWorkWithDetails, type CulturalCategory, type Region } from '@/services/mapService';
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
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState<CulturalWorkWithDetails[]>([]);
  const [stats, setStats] = useState({
    totalWorks: 0,
    byCategory: {} as Record<string, number>,
    byRegion: {} as Record<string, number>,
  });
  const [categories, setCategories] = useState<CulturalCategory[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  // Carregar dados do banco
  const loadData = async () => {
    setLoading(true);
    try {
      const [worksData, statsData, categoriesData, regionsData] = await Promise.all([
        getCulturalWorks(),
        getCulturalWorksStats(),
        getCulturalCategories(),
        getRegions()
      ]);

      setWorks(worksData);
      setStats(statsData);
      setCategories(categoriesData);
      setRegions(regionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    if (isAddMode) {
      setSelectedLocation({ lat, lng });
      setShowAddModal(true);
      setIsAddMode(false);
    }
  };

  const handleAddWork = async (workData: any) => {
    if (!selectedLocation) return;

    try {
      // Encontrar IDs das categorias e regiões
      const selectedCategory = categories.find(cat => cat.name === workData.category);
      const selectedRegion = regions.find(reg => reg.name === workData.region);

      if (!selectedCategory || !selectedRegion) {
        alert('Categoria ou região inválida');
        return;
      }

      // Criar nova obra no banco
      const newWork = await createCulturalWork({
        title: workData.title,
        author: workData.author,
        description: workData.description,
        region_id: selectedRegion.id,
        category_id: selectedCategory.id,
        type_id: 1, // Default type
        material_ids: [1], // Default material
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        address: '',
        image_urls: [],
        contact_info: {},
        status: 'active',
        submitted_by: 'Usuário Público',
        tags: [workData.category.toLowerCase(), workData.region.toLowerCase()],
        approved_by: null,
        approval_date: null
      });

      if (newWork) {
        // Recarregar dados para incluir a nova obra
        await loadData();
        
        setShowAddModal(false);
        setSelectedLocation(null);
        
        // Mostrar mensagem de sucesso
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        
        // Voltar para a primeira página se necessário
        const totalPages = Math.ceil((works.length + 1) / worksPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }
      } else {
        alert('Erro ao adicionar obra');
      }
    } catch (error) {
      console.error('Error adding work:', error);
      alert('Erro ao adicionar obra');
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
              <div className="text-3xl font-bold text-[#BB4514]">{loading ? '...' : stats.totalWorks}</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <BookOpen className="w-8 h-8 text-[#BB4514]" />
              </div>
              <h3 className="text-sm font-medium text-[#004A24] mb-2">Categorias</h3>
              <div className="text-3xl font-bold text-[#BB4514]">
                {loading ? '...' : Object.keys(stats.byCategory).length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8 text-[#BB4514]" />
              </div>
              <h3 className="text-sm font-medium text-[#004A24] mb-2">Regiões</h3>
              <div className="text-3xl font-bold text-[#BB4514]">
                {loading ? '...' : Object.keys(stats.byRegion).length}
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
                {works.map((work) => (
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
                          <strong>Categoria:</strong> {work.category?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Região:</strong> {work.region?.name || 'N/A'}
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
            const totalPages = Math.ceil(works.length / worksPerPage);
            const startIndex = (currentPage - 1) * worksPerPage;
            const endIndex = startIndex + worksPerPage;
            const currentWorks = works.slice(startIndex, endIndex);
            
            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentWorks.map((work) => (
                    <div key={work.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-l-4 border-[#BB4514]">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-[#004A24]">{work.title}</h3>
                        <div className="flex items-center space-x-1">
                          {work.category?.name === 'Artes Visuais' && <Palette className="w-4 h-4 text-[#BB4514]" />}
                          {work.category?.name === 'Música' && <Music className="w-4 h-4 text-[#BB4514]" />}
                          {work.category?.name === 'Literatura' && <BookOpen className="w-4 h-4 text-[#BB4514]" />}
                          {work.category?.name === 'Fotografia' && <Camera className="w-4 h-4 text-[#BB4514]" />}
                          {work.category?.name === 'Teatro e Performance' && <span className="text-[#BB4514]">🎭</span>}
                          {work.category?.name === 'Artesanato' && <span className="text-[#BB4514]">🏺</span>}
                          {work.category?.name === 'Cinema' && <span className="text-[#BB4514]">🎬</span>}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-[#004A24]">Autor:</span> {work.author}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-[#004A24]">Categoria:</span> {work.category?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-[#004A24]">Região:</span> {work.region?.name || 'N/A'}
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
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
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
                      {regions.map(region => (
                        <option key={region.id} value={region.name}>{region.name}</option>
                      ))}
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