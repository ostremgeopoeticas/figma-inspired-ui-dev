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