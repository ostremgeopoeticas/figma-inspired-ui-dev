import { 
  supabase, 
  supabaseAdmin, 
  CulturalWork, 
  CulturalWorkWithDetails, 
  Region, 
  CulturalCategory, 
  CulturalType, 
  Material,
  MapFilters 
} from '@/lib/supabase';

// Funções para buscar dados de referência
export const getRegions = async (): Promise<Region[]> => {
  try {
    const { data, error } = await supabase
      .from('regions')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching regions:', error);
    return [];
  }
};

export const getCulturalCategories = async (): Promise<CulturalCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('cultural_categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching cultural categories:', error);
    return [];
  }
};

export const getCulturalTypes = async (categoryId?: number): Promise<CulturalType[]> => {
  try {
    let query = supabase
      .from('cultural_types')
      .select('*')
      .order('name');

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching cultural types:', error);
    return [];
  }
};

export const getMaterials = async (): Promise<Material[]> => {
  try {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching materials:', error);
    return [];
  }
};

// Funções para obras culturais
export const getCulturalWorks = async (filters?: MapFilters): Promise<CulturalWorkWithDetails[]> => {
  try {
    let query = supabase
      .from('cultural_works')
      .select(`
        *,
        region:regions(*),
        category:cultural_categories(*),
        type:cultural_types(*),
        materials:materials(*)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    // Aplicar filtros
    if (filters) {
      if (filters.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,author.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
      }
      if (filters.regionId) {
        query = query.eq('region_id', filters.regionId);
      }
      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }
      if (filters.typeId) {
        query = query.eq('type_id', filters.typeId);
      }
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching cultural works:', error);
    return [];
  }
};

// Função específica para admin que inclui todos os status
export const getAllCulturalWorksForAdmin = async (filters?: { searchTerm?: string; status?: string; categoryId?: number }): Promise<CulturalWorkWithDetails[]> => {
  try {
    let query = supabaseAdmin
      .from('cultural_works')
      .select(`
        *,
        region:regions(*),
        category:cultural_categories(*),
        type:cultural_types(*),
        materials:materials(*)
      `)
      .order('created_at', { ascending: false });

    // Aplicar filtros
    if (filters) {
      if (filters.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,author.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
      }
      if (filters.status && filters.status !== 'todos') {
        query = query.eq('status', filters.status);
      }
      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all cultural works for admin:', error);
    return [];
  }
};

export const getCulturalWorkById = async (id: number): Promise<CulturalWorkWithDetails | null> => {
  try {
    const { data, error } = await supabase
      .from('cultural_works')
      .select(`
        *,
        region:regions(*),
        category:cultural_categories(*),
        type:cultural_types(*),
        materials:materials(*)
      `)
      .eq('id', id)
      .eq('status', 'active')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching cultural work:', error);
    return null;
  }
};

export const getCulturalWorksInBounds = async (
  bounds: { north: number; south: number; east: number; west: number },
  filters?: MapFilters
): Promise<CulturalWorkWithDetails[]> => {
  try {
    let query = supabase
      .from('cultural_works')
      .select(`
        *,
        region:regions(*),
        category:cultural_categories(*),
        type:cultural_types(*),
        materials:materials(*)
      `)
      .eq('status', 'active')
      .gte('latitude', bounds.south)
      .lte('latitude', bounds.north)
      .gte('longitude', bounds.west)
      .lte('longitude', bounds.east);

    // Aplicar filtros
    if (filters) {
      if (filters.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,author.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
      }
      if (filters.regionId) {
        query = query.eq('region_id', filters.regionId);
      }
      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }
      if (filters.typeId) {
        query = query.eq('type_id', filters.typeId);
      }
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching cultural works in bounds:', error);
    return [];
  }
};

export const createCulturalWork = async (work: Omit<CulturalWork, 'id' | 'created_at' | 'updated_at' | 'submission_date'>): Promise<CulturalWork | null> => {
  try {
    const workData = {
      ...work,
      status: 'active', // Por enquanto, aprovar automaticamente
      submission_date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('cultural_works')
      .insert([workData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating cultural work:', error);
    return null;
  }
};

export const updateCulturalWork = async (id: number, updates: Partial<CulturalWork>): Promise<CulturalWork | null> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('cultural_works')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating cultural work:', error);
    return null;
  }
};

export const deleteCulturalWork = async (id: number): Promise<boolean> => {
  try {
    // Soft delete - marcar como inativo
    const { error } = await supabaseAdmin
      .from('cultural_works')
      .update({ status: 'inactive' })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting cultural work:', error);
    return false;
  }
};

export const updateCulturalWorkStatus = async (id: number, status: 'active' | 'inactive' | 'pending'): Promise<boolean> => {
  try {
    const { error } = await supabaseAdmin
      .from('cultural_works')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating cultural work status:', error);
    return false;
  }
};

// Funções para busca e estatísticas
export const searchCulturalWorks = async (searchTerm: string, limit: number = 20): Promise<CulturalWorkWithDetails[]> => {
  try {
    const { data, error } = await supabase
      .from('cultural_works')
      .select(`
        *,
        region:regions(*),
        category:cultural_categories(*),
        type:cultural_types(*),
        materials:materials(*)
      `)
      .eq('status', 'active')
      .or(`title.ilike.%${searchTerm}%,author.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`)
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching cultural works:', error);
    return [];
  }
};

export const getCulturalWorksStats = async () => {
  try {
    const { count: totalWorks, error: totalError } = await supabase
      .from('cultural_works')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const { data: categoryStats, error: categoryError } = await supabase
      .from('cultural_works')
      .select('category_id, cultural_categories(name)')
      .eq('status', 'active');

    const { data: regionStats, error: regionError } = await supabase
      .from('cultural_works')
      .select('region_id, regions(name)')
      .eq('status', 'active');

    if (totalError || categoryError || regionError) {
      throw totalError || categoryError || regionError;
    }

    // Processar estatísticas por categoria
    const categoryCounts = categoryStats?.reduce((acc: Record<string, number>, work: any) => {
      const categoryName = work.cultural_categories?.name || 'Sem categoria';
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    }, {}) || {};

    // Processar estatísticas por região
    const regionCounts = regionStats?.reduce((acc: Record<string, number>, work: any) => {
      const regionName = work.regions?.name || 'Sem região';
      acc[regionName] = (acc[regionName] || 0) + 1;
      return acc;
    }, {}) || {};

    return {
      totalWorks: totalWorks || 0,
      byCategory: categoryCounts,
      byRegion: regionCounts,
    };
  } catch (error) {
    console.error('Error fetching cultural works stats:', error);
    return {
      totalWorks: 0,
      byCategory: {},
      byRegion: {},
    };
  }
};

// Estatísticas específicas para admin (incluindo todos os status)
export const getAdminCulturalWorksStats = async () => {
  try {
    const { count: totalWorks, error: totalError } = await supabaseAdmin
      .from('cultural_works')
      .select('*', { count: 'exact', head: true });

    const { count: activeWorks, error: activeError } = await supabaseAdmin
      .from('cultural_works')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const { count: pendingWorks, error: pendingError } = await supabaseAdmin
      .from('cultural_works')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: inactiveWorks, error: inactiveError } = await supabaseAdmin
      .from('cultural_works')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'inactive');

    const { count: totalCategories, error: categoriesError } = await supabaseAdmin
      .from('cultural_categories')
      .select('*', { count: 'exact', head: true });

    const { count: totalRegions, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('*', { count: 'exact', head: true });

    if (totalError || activeError || pendingError || inactiveError || categoriesError || regionsError) {
      throw totalError || activeError || pendingError || inactiveError || categoriesError || regionsError;
    }

    return {
      totalWorks: totalWorks || 0,
      activeWorks: activeWorks || 0,
      pendingWorks: pendingWorks || 0,
      inactiveWorks: inactiveWorks || 0,
      totalCategories: totalCategories || 0,
      totalRegions: totalRegions || 0,
    };
  } catch (error) {
    console.error('Error fetching admin cultural works stats:', error);
    return {
      totalWorks: 0,
      activeWorks: 0,
      pendingWorks: 0,
      inactiveWorks: 0,
      totalCategories: 0,
      totalRegions: 0,
    };
  }
};

// Função para geocodificação reversa (obter endereço a partir de coordenadas)
export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    // Usar serviço de geocodificação reversa (Nominatim é gratuito)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    
    if (!response.ok) throw new Error('Geocoding failed');
    
    const data = await response.json();
    return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  } catch (error) {
    console.error('Error getting address from coordinates:', error);
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
};
