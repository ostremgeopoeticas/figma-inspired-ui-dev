import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Tag, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Region, 
  CulturalCategory, 
  CulturalType, 
  Material,
  MapFilters as MapFiltersType 
} from '@/lib/supabase';
import { 
  getRegions, 
  getCulturalCategories, 
  getCulturalTypes, 
  getMaterials 
} from '@/services/mapService';

interface MapFiltersProps {
  filters: MapFiltersType;
  onFiltersChange: (filters: MapFiltersType) => void;
  onSearch: () => void;
  isLoading?: boolean;
  worksCount?: number;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  isLoading = false,
  worksCount = 0,
}) => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [categories, setCategories] = useState<CulturalCategory[]>([]);
  const [types, setTypes] = useState<CulturalType[]>([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);

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
    
    loadReferenceData();
  }, []);

  // Carregar tipos quando categoria muda
  useEffect(() => {
    const loadTypes = async () => {
      if (filters.categoryId) {
        const typesData = await getCulturalTypes(filters.categoryId);
        setTypes(typesData);
      } else {
        setTypes([]);
      }
    };
    
    loadTypes();
  }, [filters.categoryId]);

  const handleFilterChange = (field: keyof MapFiltersType, value: any) => {
    const newFilters = { ...filters, [field]: value };
    
    // Limpar tipo quando categoria muda
    if (field === 'categoryId') {
      newFilters.typeId = undefined;
    }
    
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: '',
      regionId: undefined,
      categoryId: undefined,
      typeId: undefined,
      materialIds: [],
      status: 'active',
    });
  };

  const hasActiveFilters = 
    filters.searchTerm || 
    filters.regionId || 
    filters.categoryId || 
    filters.typeId || 
    filters.materialIds.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      {/* Busca principal */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          placeholder="Buscar por título, autor, descrição..."
          className="pl-10 border-[#BB4514] focus:ring-[#BB4514]"
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>

      {/* Filtros básicos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Select 
            value={filters.regionId?.toString() || ''} 
            onValueChange={(value) => handleFilterChange('regionId', value ? Number(value) : undefined)}
          >
            <SelectTrigger className="border-[#BB4514]">
              <SelectValue placeholder="Todas as regiões" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as regiões</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id.toString()}>
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select 
            value={filters.categoryId?.toString() || ''} 
            onValueChange={(value) => handleFilterChange('categoryId', value ? Number(value) : undefined)}
          >
            <SelectTrigger className="border-[#BB4514]">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select 
            value={filters.typeId?.toString() || ''} 
            onValueChange={(value) => handleFilterChange('typeId', value ? Number(value) : undefined)}
            disabled={!filters.categoryId}
          >
            <SelectTrigger className="border-[#BB4514]">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os tipos</SelectItem>
              {types.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

             {/* Filtros avançados - Temporariamente desabilitado */}
       <div className="text-center text-gray-500">
         <p>Filtros avançados em desenvolvimento</p>
       </div>

      {/* Ações */}
      <div className="flex gap-3 pt-4 border-t">
        <Button
          onClick={onSearch}
          disabled={isLoading}
          className="flex-1 bg-[#BB4514] hover:bg-[#A03D12] text-white"
        >
          <Search className="w-4 h-4 mr-2" />
          {isLoading ? 'Buscando...' : 'Buscar Obras'}
        </Button>
        
        {hasActiveFilters && (
          <Button
            onClick={clearAllFilters}
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <X className="w-4 h-4 mr-2" />
            Limpar
          </Button>
        )}
      </div>

      {/* Resultados */}
      <div className="text-center">
        <span className="text-sm text-gray-600">
          {isLoading ? 'Buscando...' : `${worksCount} obra(s) encontrada(s)`}
        </span>
      </div>

      {/* Indicadores de filtros ativos */}
      {hasActiveFilters && (
        <div className="pt-2 border-t">
          <span className="text-xs font-medium text-[#004A24] mb-2 block">Filtros ativos:</span>
          <div className="flex flex-wrap gap-2">
            {filters.searchTerm && (
              <Badge variant="outline" className="border-[#BB4514] text-[#BB4514]">
                Busca: "{filters.searchTerm}"
              </Badge>
            )}
            {filters.regionId && (
              <Badge variant="outline" className="border-[#BB4514] text-[#BB4514]">
                Região: {regions.find(r => r.id === filters.regionId)?.name}
              </Badge>
            )}
            {filters.categoryId && (
              <Badge variant="outline" className="border-[#BB4514] text-[#BB4514]">
                Categoria: {categories.find(c => c.id === filters.categoryId)?.name}
              </Badge>
            )}
            {filters.typeId && (
              <Badge variant="outline" className="border-[#BB4514] text-[#BB4514]">
                Tipo: {types.find(t => t.id === filters.typeId)?.name}
              </Badge>
            )}
            {filters.materialIds.length > 0 && (
              <Badge variant="outline" className="border-[#BB4514] text-[#BB4514]">
                {filters.materialIds.length} material(is)
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFilters;
