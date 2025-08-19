import { supabase as supabaseClient } from '@/integrations/supabase/client'
import { createClient } from '@supabase/supabase-js'
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

// Criar cliente admin com service role key
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqaGd2Y2RyYmpzbHV5bnN5eWdtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTU0MzQ0MCwiZXhwIjoyMDcxMTE5NDQwfQ.-rVBiTaIvMWxUnSGaDXoCujoNzSGQgCr6sBfQVuhDJI";

export const supabaseAdmin = createClient<Database>(
  "https://ujhgvcdrbjsluynsyygm.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);