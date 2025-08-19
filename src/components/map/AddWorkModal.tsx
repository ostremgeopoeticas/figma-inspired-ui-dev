import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, MapPin, User, Tag, Image as ImageIcon } from 'lucide-react';
import { 
  Region, 
  CulturalCategory, 
  CulturalType, 
  Material, 
  CulturalWork 
} from '@/lib/supabase';
import { 
  getRegions, 
  getCulturalCategories, 
  getCulturalTypes, 
  getMaterials,
  createCulturalWork,
  getAddressFromCoordinates
} from '@/services/mapService';

interface AddWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (work: CulturalWork) => void;
  initialLatitude?: number;
  initialLongitude?: number;
}

const AddWorkModal: React.FC<AddWorkModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialLatitude,
  initialLongitude,
}) => {
  // Estados para dados de referência
  const [regions, setRegions] = useState<Region[]>([]);
  const [categories, setCategories] = useState<CulturalCategory[]>([]);
  const [types, setTypes] = useState<CulturalType[]>([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  
  // Estados para o formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    region_id: '',
    category_id: '',
    type_id: '',
    latitude: initialLatitude || 0,
    longitude: initialLongitude || 0,
    address: '',
    contact_email: '',
    contact_phone: '',
    contact_website: '',
    tags: [] as string[],
    image_urls: [] as string[],
  });
  
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Carregar dados de referência
  useEffect(() => {
    const loadReferenceData = async () => {
      const [regionsData, categoriesData, materialsData] = await Promise.all([
        getRegions(),
        getCulturalCategories(),
        getMaterials(),
      ]);
      
      setRegions(regionsData);
      setCategories(categoriesData);
      setAllMaterials(materialsData);
    };
    
    if (isOpen) {
      loadReferenceData();
    }
  }, [isOpen]);

  // Carregar tipos quando categoria muda
  useEffect(() => {
    const loadTypes = async () => {
      if (formData.category_id) {
        const typesData = await getCulturalTypes(Number(formData.category_id));
        setTypes(typesData);
      } else {
        setTypes([]);
      }
    };
    
    loadTypes();
  }, [formData.category_id]);

  // Atualizar coordenadas quando recebidas
  useEffect(() => {
    if (initialLatitude && initialLongitude) {
      setFormData(prev => ({
        ...prev,
        latitude: initialLatitude,
        longitude: initialLongitude,
      }));
      
      // Buscar endereço automaticamente
      if (initialLatitude && initialLongitude) {
        setIsLoadingAddress(true);
        getAddressFromCoordinates(initialLatitude, initialLongitude)
          .then(address => {
            setFormData(prev => ({ ...prev, address }));
          })
          .finally(() => setIsLoadingAddress(false));
      }
    }
  }, [initialLatitude, initialLongitude]);

  // Resetar formulário quando modal fecha
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        description: '',
        author: '',
        region_id: '',
        category_id: '',
        type_id: '',
        latitude: 0,
        longitude: 0,
        address: '',
        contact_email: '',
        contact_phone: '',
        contact_website: '',
        tags: [],
        image_urls: [],
      });
      setSelectedMaterials([]);
      setNewTag('');
      setNewImageUrl('');
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() && !formData.image_urls.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter(url => url !== imageToRemove)
    }));
  };

  const handleMaterialToggle = (materialId: number) => {
    setSelectedMaterials(prev => 
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.category_id || !formData.type_id || !formData.region_id) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);
    
    try {
      const workData = {
        title: formData.title,
        description: formData.description,
        author: formData.author,
        region_id: Number(formData.region_id),
        category_id: Number(formData.category_id),
        type_id: Number(formData.type_id),
        material_ids: selectedMaterials,
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address,
        image_urls: formData.image_urls,
        contact_info: {
          email: formData.contact_email || undefined,
          phone: formData.contact_phone || undefined,
          website: formData.contact_website || undefined,
        },
        tags: formData.tags,
        submitted_by: 'usuário', // TODO: integrar com sistema de autenticação
      };

      const createdWork = await createCulturalWork(workData);
      
      if (createdWork) {
        onSuccess(createdWork);
        onClose();
      } else {
        throw new Error('Erro ao criar obra');
      }
    } catch (error) {
      console.error('Error creating work:', error);
      alert('Erro ao adicionar obra. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#004A24]">
            <Plus className="w-5 h-5" />
            Adicionar Nova Obra Cultural
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-[#004A24] font-medium">
                Título da Obra *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Digite o título da obra"
                className="border-[#BB4514] focus:ring-[#BB4514]"
                required
              />
            </div>

            <div>
              <Label htmlFor="author" className="text-[#004A24] font-medium">
                <User className="w-4 h-4 inline mr-1" />
                Autor *
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Nome do autor"
                className="border-[#BB4514] focus:ring-[#BB4514]"
                required
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description" className="text-[#004A24] font-medium">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva a obra, sua história, significado..."
              className="border-[#BB4514] focus:ring-[#BB4514] min-h-[100px]"
            />
          </div>

          {/* Classificação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-[#004A24] font-medium">Região *</Label>
              <Select value={formData.region_id} onValueChange={(value) => handleInputChange('region_id', value)}>
                <SelectTrigger className="border-[#BB4514]">
                  <SelectValue placeholder="Selecione a região" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id.toString()}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[#004A24] font-medium">Categoria *</Label>
              <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                <SelectTrigger className="border-[#BB4514]">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[#004A24] font-medium">Tipo *</Label>
              <Select 
                value={formData.type_id} 
                onValueChange={(value) => handleInputChange('type_id', value)}
                disabled={!formData.category_id}
              >
                <SelectTrigger className="border-[#BB4514]">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Localização */}
          <div className="border rounded-lg p-4 bg-[#F8F9FA]">
            <h3 className="font-medium text-[#004A24] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Localização
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-[#004A24] font-medium">Latitude *</Label>
                <Input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value))}
                  placeholder="-19.9167"
                  className="border-[#BB4514]"
                  required
                />
              </div>
              <div>
                <Label className="text-[#004A24] font-medium">Longitude *</Label>
                <Input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value))}
                  placeholder="-43.9345"
                  className="border-[#BB4514]"
                  required
                />
              </div>
              <div>
                <Label className="text-[#004A24] font-medium">Endereço</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder={isLoadingAddress ? "Carregando..." : "Endereço da obra"}
                  className="border-[#BB4514]"
                  disabled={isLoadingAddress}
                />
              </div>
            </div>
          </div>

          {/* Materiais */}
          <div>
            <Label className="text-[#004A24] font-medium mb-3 block">Materiais Utilizados</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto border rounded p-3">
              {allMaterials.map((material) => (
                <label key={material.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material.id)}
                    onChange={() => handleMaterialToggle(material.id)}
                    className="text-[#BB4514] focus:ring-[#BB4514]"
                  />
                  <span className="text-sm">{material.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label className="text-[#004A24] font-medium">Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Adicionar tag"
                className="flex-1 border-[#BB4514]"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} size="sm" className="bg-[#BB4514] hover:bg-[#A03D12]">
                <Tag className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-[#E8F5E9] text-[#004A24]">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Imagens */}
          <div>
            <Label className="text-[#004A24] font-medium">URLs das Imagens</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="URL da imagem"
                className="flex-1 border-[#BB4514]"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
              />
              <Button type="button" onClick={handleAddImage} size="sm" className="bg-[#BB4514] hover:bg-[#A03D12]">
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.image_urls.map((url, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <img src={url} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                  <span className="flex-1 text-sm text-gray-600 truncate">{url}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div className="border rounded-lg p-4 bg-[#F8F9FA]">
            <h3 className="font-medium text-[#004A24] mb-3">Informações de Contato (Opcional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-[#004A24] font-medium">Email</Label>
                <Input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  placeholder="email@exemplo.com"
                  className="border-[#BB4514]"
                />
              </div>
              <div>
                <Label className="text-[#004A24] font-medium">Telefone</Label>
                <Input
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  placeholder="(31) 99999-9999"
                  className="border-[#BB4514]"
                />
              </div>
              <div>
                <Label className="text-[#004A24] font-medium">Website</Label>
                <Input
                  type="url"
                  value={formData.contact_website}
                  onChange={(e) => handleInputChange('contact_website', e.target.value)}
                  placeholder="https://exemplo.com"
                  className="border-[#BB4514]"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[#BB4514] text-[#BB4514] hover:bg-[#BB4514] hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#BB4514] hover:bg-[#A03D12] text-white"
            >
              {isLoading ? 'Adicionando...' : 'Adicionar Obra'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkModal;
