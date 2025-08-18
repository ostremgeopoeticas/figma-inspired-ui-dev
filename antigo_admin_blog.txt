import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BlogPost {
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

interface BlogCategory {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id' | 'created_at'>>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    author: '',
    image_url: '',
    published: false,
    published_at: null
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Carregar posts e categorias
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
      console.log('Categorias carregadas:', data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Lidar com mudanças no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Lidar com mudança de categoria no Select
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  // Atualizar published_at quando o status de publicação muda
  const handlePublishChange = (e: { target: { checked: boolean } }) => {
    const checked = e.target.checked;
    
    setFormData(prev => ({
      ...prev,
      published: checked,
      published_at: checked ? new Date().toISOString() : null
    }));
  };

  // Salvar post (criar ou atualizar)
  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que uma categoria foi selecionada
    if (!formData.category) {
      alert('Por favor, selecione uma categoria.');
      return;
    }
    
    console.log('Dados do formulário:', formData);
    
    try {
      if (editingPost) {
        // Atualizar post existente
        const { error } = await supabaseAdmin
          .from('blog_posts')
          .update(formData)
          .eq('id', editingPost.id);
        
        if (error) throw error;
      } else {
        // Criar novo post
        const { data, error } = await supabaseAdmin
          .from('blog_posts')
          .insert([formData])
          .select();
        
        if (error) throw error;
        console.log('Post criado com sucesso:', data);
      }
      
      // Resetar formulário e recarregar posts
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        author: '',
        image_url: '',
        published: false,
        published_at: null
      });
      setEditingPost(null);
      fetchPosts();
    } catch (error: any) {
      console.error('Error saving post:', error);
      alert(`Erro ao salvar post: ${error.message || 'Erro desconhecido'}`);
    }
  };

  // Editar post
  const editPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      image_url: post.image_url,
      published: post.published,
      published_at: post.published_at
    });
  };

  // Excluir post
  const deletePost = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;
    
    try {
      const { error } = await supabaseAdmin
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Cancelar edição
  const cancelEdit = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      author: '',
      image_url: '',
      published: false,
      published_at: null
    });
  };

  // Fazer logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
        <div className="flex-grow w-full flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB4514]"></div>
            <p className="mt-4 text-[#121A0F]">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#004A24]">Administração do Blog</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition-colors"
        >
          Sair
        </button>
      </div>
      
      {/* Formulário de criação/edição */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#004A24] mb-4">
          {editingPost ? 'Editar Post' : 'Criar Novo Post'}
        </h2>
        
        <form onSubmit={savePost}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#121A0F] mb-2">
                Título
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#121A0F] mb-2">
                Autor
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#121A0F] mb-2">
                Categoria
              </label>
              <Select 
                value={formData.category} 
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger className="w-full border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514]">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#121A0F] mb-2">
                URL da Imagem
              </label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514]"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#121A0F] mb-2">
              Resumo
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#121A0F] mb-2">
              Conteúdo
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-4 py-2 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514]"
              required
            />
          </div>
          
          <div className="flex items-center mb-6">
            <label className="block text-sm font-medium text-[#121A0F] mr-3">
              Publicar:
            </label>
            <div 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                formData.published ? 'bg-[#BB4514]' : 'bg-gray-300'
              }`}
              onClick={() => handlePublishChange({ target: { checked: !formData.published } } as React.ChangeEvent<HTMLInputElement>)}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.published ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
            <span className="ml-2 text-sm text-[#121A0F]">
              {formData.published ? 'Publicado' : 'Não publicado'}
            </span>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#BB4514] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#A03D12] transition-colors"
            >
              {editingPost ? 'Atualizar Post' : 'Criar Post'}
            </button>
            
            {editingPost && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Lista de posts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#004A24] mb-4">Posts Existentes</h2>
        
        {posts.length === 0 ? (
          <p className="text-[#121A0F]">Nenhum post encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Publicado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#121A0F]">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#121A0F]">
                      {post.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#121A0F]">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#121A0F]">
                      {post.published ? 'Sim' : 'Não'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#121A0F]">
                      {new Date(post.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => editPost(post)}
                        className="text-[#BB4514] hover:text-[#A03D12] mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;