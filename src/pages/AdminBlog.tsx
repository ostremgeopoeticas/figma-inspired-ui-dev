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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  console.log('AdminBlog component rendered');
  
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
  const { logout, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  console.log('AdminBlog - Current user state:', user?.email, 'Auth loading:', authLoading);

  // Carregar posts e categorias
  useEffect(() => {
    console.log('AdminBlog useEffect triggered', { user: user?.email, authLoading });
    
    // Aguardar o carregamento da autenticação
    if (authLoading) {
      console.log('Auth still loading, waiting...');
      return;
    }
    
    // Verificar se o usuário está logado
    if (!user || typeof user !== 'object' || !user.email) {
      console.log('No valid user, redirecting to login');
      navigate('/admin/login');
      return;
    }
    
    // Verificar se o usuário é admin
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map((e: string) => e.trim()) || [];
    const isAdminUser = adminEmails.includes(user.email);
    console.log('AdminBlog - User email:', user.email, 'Is admin:', isAdminUser);
    
    if (!isAdminUser) {
      console.log('User is not admin, redirecting to login');
      navigate('/admin/login');
      return;
    }
    
    console.log('User is valid and admin, loading posts and categories');
    fetchPosts();
    fetchCategories();
  }, [user, authLoading, navigate]);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB4514]"></div>
          <p className="mt-4 text-slate-600 font-medium">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Painel Administrativo</h1>
              <p className="text-slate-600 mt-1">Gerenciamento do Blog</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user?.email}</p>
                <p className="text-xs text-slate-500">Administrador</p>
              </div>
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
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="create">Criar/Editar Post</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Total de Posts</p>
                      <p className="text-2xl font-bold text-slate-900">{posts.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-600">Publicados</p>
                      <p className="text-2xl font-bold text-slate-900">{posts.filter(p => p.published).length}</p>
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
                      <p className="text-sm font-medium text-slate-600">Rascunhos</p>
                      <p className="text-2xl font-bold text-slate-900">{posts.filter(p => !p.published).length}</p>
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
                      <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Posts Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Posts do Blog</span>
                  <Button 
                    onClick={() => document.querySelector('[data-value="create"]')?.click()}
                    className="bg-[#BB4514] hover:bg-[#A03D12]"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Novo Post
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-slate-900">Nenhum post encontrado</h3>
                    <p className="mt-1 text-sm text-slate-500">Comece criando seu primeiro post.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Post
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Categoria
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Autor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {posts.map((post) => (
                          <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {post.image_url && (
                                  <img 
                                    className="h-10 w-10 rounded-lg object-cover mr-3" 
                                    src={post.image_url} 
                                    alt={post.title}
                                  />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-slate-900 line-clamp-1">
                                    {post.title}
                                  </div>
                                  <div className="text-sm text-slate-500 line-clamp-1">
                                    {post.excerpt}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                                {post.category}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {post.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge 
                                variant={post.published ? "default" : "secondary"}
                                className={post.published 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {post.published ? 'Publicado' : 'Rascunho'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                              {new Date(post.created_at).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button
                                  onClick={() => editPost(post)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-600 hover:text-slate-900"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </Button>
                                <Button
                                  onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </Button>
                                <Button
                                  onClick={() => deletePost(post.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {editingPost ? 'Editar Post' : 'Criar Novo Post'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={savePost} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Digite o título do post"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author">Autor</Label>
                      <Input
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="Nome do autor"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger>
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="image_url">URL da Imagem</Label>
                      <Input
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleInputChange}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Resumo</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Breve descrição do post"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Conteúdo completo do post"
                      rows={8}
                      required
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center mb-6">
            <label className="block text-sm font-medium text-[#121A0F] mr-3">
              Status:
            </label>
            <button
              type="button"
              onClick={() => handlePublishChange({ target: { checked: !formData.published } } as React.ChangeEvent<HTMLInputElement>)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:ring-offset-2 ${
                formData.published ? 'bg-[#BB4514]' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={formData.published}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  formData.published ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-2 text-sm font-medium text-[#121A0F]">
              {formData.published ? (
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  Publicado
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                  Rascunho
                </span>
              )}
            </span>
          </div>
                  
                  <div className="flex justify-end space-x-4">
                    {editingPost && (
                      <Button
                        type="button"
                        onClick={cancelEdit}
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="bg-[#BB4514] hover:bg-[#A03D12]"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {editingPost ? 'Atualizar Post' : 'Criar Post'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminBlog;