import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  getAllCulturalWorksForAdmin, 
  getAdminCulturalWorksStats, 
  updateCulturalWork, 
  updateCulturalWorkStatus, 
  deleteCulturalWork,
  getCulturalCategories,
  getRegions
} from '@/services/mapService';
import { CulturalWorkWithDetails, CulturalCategory, Region } from '@/lib/supabase';
import 'leaflet/dist/leaflet.css';
import '@/components/map/leaflet-custom.css';

// Fix for default marker icons
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const AdminMap = () => {
  const { user, logout } = useAuth();
  const [works, setWorks] = useState<CulturalWorkWithDetails[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<CulturalWorkWithDetails[]>([]);
  const [selectedWork, setSelectedWork] = useState<CulturalWorkWithDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalWorks: 0,
    activeWorks: 0,
    pendingWorks: 0,
    inactiveWorks: 0,
    totalCategories: 0,
    totalRegions: 0,
  });
  const [categories, setCategories] = useState<CulturalCategory[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  // Carregar dados do banco de dados
  const loadData = async () => {
    setLoading(true);
    try {
      const [worksData, statsData, categoriesData, regionsData] = await Promise.all([
        getAllCulturalWorksForAdmin(),
        getAdminCulturalWorksStats(),
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

  useEffect(() => {
    let filtered = works;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(work =>
        work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        work.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (work.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(work => work.status === statusFilter);
    }

    // Filtrar por categoria
    if (categoryFilter !== 'todas') {
      const selectedCategory = categories.find(cat => cat.name === categoryFilter);
      if (selectedCategory) {
        filtered = filtered.filter(work => work.category_id === selectedCategory.id);
      }
    }

    setFilteredWorks(filtered);
  }, [works, searchTerm, statusFilter, categoryFilter, categories]);

  const handleStatusChange = async (workId: number, newStatus: 'active' | 'inactive' | 'pending') => {
    try {
      const success = await updateCulturalWorkStatus(workId, newStatus);
      if (success) {
        setWorks(prevWorks =>
          prevWorks.map(work =>
            work.id === workId ? { ...work, status: newStatus } : work
          )
        );
        // Atualizar estatísticas
        const newStats = await getAdminCulturalWorksStats();
        setStats(newStats);
      } else {
        alert('Erro ao atualizar status da obra');
      }
    } catch (error) {
      console.error('Error updating work status:', error);
      alert('Erro ao atualizar status da obra');
    }
  };

  const handleDeleteWork = async (workId: number) => {
    if (confirm('Tem certeza que deseja excluir esta obra?')) {
      try {
        const success = await deleteCulturalWork(workId);
        if (success) {
          setWorks(prevWorks => prevWorks.filter(work => work.id !== workId));
          // Atualizar estatísticas
          const newStats = await getAdminCulturalWorksStats();
          setStats(newStats);
        } else {
          alert('Erro ao excluir obra');
        }
      } catch (error) {
        console.error('Error deleting work:', error);
        alert('Erro ao excluir obra');
      }
    }
  };

  const handleEditWork = (work: CulturalWorkWithDetails) => {
    setSelectedWork(work);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSaveWork = async (workData: { title: string; author: string; description: string; category: string; region: string }) => {
    try {
      // Encontrar IDs das novas seleções
      const selectedCategory = categories.find(cat => cat.name === workData.category);
      const selectedRegion = regions.find(reg => reg.name === workData.region);

      if (!selectedCategory || !selectedRegion) {
        alert('Categoria ou região inválida');
        return;
      }

      if (selectedWork && isEditing) {
        // Atualizar obra existente
        const updatedWork = await updateCulturalWork(selectedWork.id, {
          title: workData.title,
          author: workData.author,
          description: workData.description,
          category_id: selectedCategory.id,
          region_id: selectedRegion.id,
        });

        if (updatedWork) {
          // Recarregar dados para ter as relações atualizadas
          await loadData();
        } else {
          alert('Erro ao salvar alterações');
        }
      } else {
        // Criar nova obra
        const newWork = await createCulturalWork({
          title: workData.title,
          author: workData.author,
          description: workData.description,
          region_id: selectedRegion.id,
          category_id: selectedCategory.id,
          type_id: 1, // Default type
          material_ids: [1], // Default material
          latitude: -19.5, // Default coordinates (center of Rio Doce basin)
          longitude: -42.5,
          address: '',
          image_urls: [],
          contact_info: {},
          status: 'active',
          submitted_by: user?.email || 'Admin',
          tags: [workData.category.toLowerCase(), workData.region.toLowerCase()]
        });

        if (newWork) {
          // Recarregar dados para incluir a nova obra
          await loadData();
        } else {
          alert('Erro ao criar nova obra');
        }
      }
    } catch (error) {
      console.error('Error saving work:', error);
      alert('Erro ao salvar alterações');
    }
    setShowModal(false);
    setSelectedWork(null);
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">Ativo</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500 text-white">Inativo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 text-white">Pendente</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Painel Administrativo</h1>
              <p className="text-slate-600 mt-1">Gerenciamento do Mapa Cultural</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user?.email}</p>
                <p className="text-xs text-slate-500">Administrador</p>
              </div>
              <Button
                onClick={() => window.location.href = '/admin/blog'}
                variant="outline"
                className="border-[#BB4514] text-[#BB4514] hover:bg-[#BB4514] hover:text-white"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Admin Blog
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0l-6-2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Total de Obras</p>
                  <p className="text-2xl font-bold text-slate-900">{loading ? '...' : stats.totalWorks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Obras Ativas</p>
                  <p className="text-2xl font-bold text-slate-900">{loading ? '...' : stats.activeWorks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Pendentes</p>
                  <p className="text-2xl font-bold text-slate-900">{loading ? '...' : stats.pendingWorks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Categorias</p>
                  <p className="text-2xl font-bold text-slate-900">{loading ? '...' : stats.totalCategories}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar obras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mapa */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Mapa das Obras</h2>
              <Badge variant="outline">{filteredWorks.length} obras</Badge>
            </div>
            <div className="h-[400px] w-full rounded-lg overflow-hidden border border-slate-200">
              <MapContainer
                center={[-19.5, -42.5]}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredWorks.map((work) => (
                  <Marker
                    key={work.id}
                    position={[work.latitude, work.longitude]}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-sm">{work.title}</h3>
                        <p className="text-xs text-gray-600">Por: {work.author}</p>
                        <p className="text-xs text-gray-600">{work.category}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Lista de Obras */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Obras do Mapa ({filteredWorks.length})</h2>
              <Button 
                className="bg-[#BB4514] hover:bg-[#A03D12] text-white"
                onClick={() => {
                  setSelectedWork({
                    id: 0,
                    title: '',
                    author: '',
                    description: '',
                    region_id: 0,
                    category_id: 0,
                    type_id: 0,
                    material_ids: [],
                    latitude: 0,
                    longitude: 0,
                    address: '',
                    image_urls: [],
                    contact_info: {},
                    status: 'active',
                    submitted_by: '',
                    submission_date: new Date().toISOString(),
                    approved_by: '',
                    approval_date: '',
                    tags: [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    region: { id: 0, name: '', description: '', created_at: '' },
                    category: { id: 0, name: '', description: '', created_at: '' },
                    type: { id: 0, name: '', category_id: 0, description: '', created_at: '' },
                    materials: []
                  });
                  setIsEditing(false);
                  setShowModal(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Obra
              </Button>
            </div>
          </div>
          
          <div className="divide-y divide-slate-200">
            {filteredWorks.map((work) => (
              <div key={work.id} className="p-6 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{work.title}</h3>
                      {getStatusBadge(work.status)}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      <strong>Autor:</strong> {work.author} | <strong>Categoria:</strong> {work.category?.name || 'N/A'} | <strong>Região:</strong> {work.region?.name || 'N/A'}
                    </p>
                    <p className="text-sm text-slate-500">{work.description || 'Sem descrição'}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant={work.status === 'active' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(work.id, 'active')}
                      className={work.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'border-green-300 text-green-600'}
                      title="Ativar obra"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={work.status === 'pending' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(work.id, 'pending')}
                      className={work.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-yellow-300 text-yellow-600'}
                      title="Marcar como pendente"
                    >
                      <div className="w-4 h-4 bg-yellow-300 rounded-full" />
                    </Button>
                    <Button
                      size="sm"
                      variant={work.status === 'inactive' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(work.id, 'inactive')}
                      className={work.status === 'inactive' ? 'bg-red-500 hover:bg-red-600' : 'border-red-300 text-red-600'}
                      title="Desativar obra"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditWork(work)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteWork(work.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredWorks.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-slate-500">Nenhuma obra encontrada com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {showModal && selectedWork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
                             <h3 className="text-xl font-semibold text-slate-900">
                 {isEditing ? 'Editar Obra' : selectedWork?.id === 0 ? 'Nova Obra' : 'Visualizar Obra'}
               </h3>
              <Button
                onClick={() => setShowModal(false)}
                variant="ghost"
                size="sm"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveWork({
                title: formData.get('title') as string,
                author: formData.get('author') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                region: formData.get('region') as string,
              });
            }}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={selectedWork.title}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Autor</Label>
                    <Input
                      id="author"
                      name="author"
                      defaultValue={selectedWork.author}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={selectedWork.description}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select name="category" defaultValue={selectedWork.category?.name}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="region">Região</Label>
                    <Select name="region" defaultValue={selectedWork.region?.name}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region.id} value={region.name}>{region.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      value={selectedWork.latitude.toFixed(6)}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      value={selectedWork.longitude.toFixed(6)}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                                 <Button
                   type="submit"
                   className="flex-1 bg-[#BB4514] hover:bg-[#A03D12] text-white"
                 >
                   {isEditing ? 'Salvar Alterações' : 'Criar Obra'}
                 </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMap;
