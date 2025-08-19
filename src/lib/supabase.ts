import { createClient } from '@supabase/supabase-js'

// Tipos para as tabelas do banco de dados
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

// Tipos para o mapa cultural
export interface Region {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface CulturalCategory {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface CulturalType {
  id: number;
  name: string;
  category_id: number;
  description: string;
  created_at: string;
}

export interface Material {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface CulturalWork {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  author: string;
  region_id: number;
  category_id: number;
  type_id: number;
  material_ids: number[];
  latitude: number;
  longitude: number;
  address?: string;
  image_urls: string[];
  contact_info?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  status: 'active' | 'inactive' | 'pending';
  submitted_by?: string;
  submission_date: string;
  approved_by?: string;
  approval_date?: string;
  tags: string[];
}

export interface CulturalWorkWithDetails extends CulturalWork {
  region: Region;
  category: CulturalCategory;
  type: CulturalType;
  materials: Material[];
}

export interface MapFilters {
  searchTerm: string;
  regionId?: number;
  categoryId?: number;
  typeId?: number;
  materialIds: number[];
  status: string;
}

// Obter as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

// Validar variáveis de ambiente
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Criar cliente Supabase com permissões de serviço para operações de administração
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    })
  : supabase