import { supabase, supabaseAdmin, BlogPost, BlogCategory } from '@/lib/supabase'

// Funções para Blog Posts
export const getBlogPosts = async (page: number = 1, limit: number = 6): Promise<BlogPost[]> => {
  try {
    console.log('Fetching blog posts...');
    // Tentar primeiro com o cliente admin para evitar problemas de permissões
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching blog posts with admin client:', error);
      // Se falhar, tentar com o cliente normal
      const { data: normalData, error: normalError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (normalError) {
        console.error('Error fetching blog posts with normal client:', normalError);
        throw normalError;
      }
      
      console.log('Posts fetched with normal client:', normalData);
      return normalData || []
    }
    
    console.log('Posts fetched with admin client:', data);
    return data || []
  } catch (error) {
    console.error('Error in getBlogPosts:', error)
    return []
  }
}

export const getBlogPostsCount = async (): Promise<number> => {
  try {
    const { count, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('published', true);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching blog posts count:', error);
    return 0;
  }
}

export const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
  try {
    console.log('Fetching blog post by id:', id);
    // Tentar primeiro com o cliente admin para evitar problemas de permissões
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Error fetching blog post with admin client:', error);
      // Se falhar, tentar com o cliente normal
      const { data: normalData, error: normalError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single()
      
      if (normalError) {
        console.error('Error fetching blog post with normal client:', normalError);
        throw normalError;
      }
      
      console.log('Post fetched with normal client:', normalData);
      return normalData || null
    }
    
    console.log('Post fetched with admin client:', data);
    return data || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching blog posts by category:', error)
    return []
  }
}

// Funções para Categorias
export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }
}

// Função para formatar datas
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}