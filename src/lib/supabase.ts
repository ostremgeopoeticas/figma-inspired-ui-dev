import { supabase as supabaseClient } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'

// Exportar tipos do mapService
export type { 
  Region, 
  CulturalCategory, 
  CulturalType, 
  Material, 
  CulturalWork, 
  CulturalWorkWithDetails, 
  MapFilters 
} from '@/services/mapService'

// Tipos adicionais para o blog
export interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image_url: string;
  published: boolean;
  published_at: string | null;
}

export interface BlogCategory {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

// Usar o cliente Supabase da integração
export const supabase = supabaseClient
export const supabaseAdmin = supabaseClient