import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts, getBlogPostsCount, getBlogCategories, BlogPost, BlogCategory } from '@/services/blogService';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Buscar categorias
        const categoriesData = await getBlogCategories();
        console.log('Categories fetched in Blog page:', categoriesData);
        setCategories([
          { id: 0, name: 'Todos', description: 'Todas as categorias' },
          ...categoriesData
        ]);
        
        // Buscar contagem total de posts
        const count = await getBlogPostsCount();
        setTotalPosts(count);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Buscar posts do blog
        const posts = await getBlogPosts(currentPage, postsPerPage);
        console.log('Posts fetched in Blog page:', posts);
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  // Filtrar posts por categoria
  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
  
  console.log('Filtered posts:', filteredPosts, 'Selected category:', selectedCategory);

  // Calcular número total de páginas
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
        <Header />
        <div className="flex-grow w-full flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB4514]"></div>
            <p className="mt-4 text-[#121A0F]">Carregando posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[200px] md:h-[300px] relative bg-gradient-to-r from-[#004A24] to-[#4B5A43] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#F6D8B8] text-3xl md:text-5xl font-bold">Blog</h1>
            <p className="text-[#E8F5E9] mt-2 text-lg">Explorando narrativas e memórias da Bacia do Rio Doce</p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Introdução */}
        <section className="mb-8 md:mb-12 text-center">
          <p className="text-[#121A0F] max-w-3xl mx-auto text-lg">
            Descubra histórias, relatos e reflexões sobre a cultura, memória e geografia da Bacia do Rio Doce. 
            Cada post é uma janela para as vozes e experiências que compõem nossa comunidade.
          </p>
        </section>

        {/* Filtros */}
        <section className="mb-6 md:mb-8">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-3 py-2 md:px-6 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-[#BB4514] text-white shadow-md' 
                    : 'bg-white text-[#121A0F] hover:bg-[#F6D8B8] border border-[#BB4514] shadow-sm'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="mb-8 md:mb-12">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-[#BB4514]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-[#004A24] mt-4">Nenhum post encontrado</h3>
                <p className="text-[#121A0F] mt-2">
                  Não há posts disponíveis para a categoria "{selectedCategory}" no momento.
                </p>
                <p className="text-[#121A0F] mt-2 text-sm">
                  Total de posts: {blogPosts.length}, Posts filtrados: {filteredPosts.length}
                </p>
                <button
                  onClick={() => setSelectedCategory('Todos')}
                  className="mt-4 bg-[#BB4514] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#A03D12] transition-colors"
                >
                  Ver todas as categorias
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  image={post.image_url}
                  category={post.category}
                  title={post.title}
                  date={new Date(post.created_at).toLocaleDateString('pt-BR')}
                  excerpt={post.excerpt}
                  imageAlt={post.title}
                />
              ))}
            </div>
          )}
        </section>

        {/* Paginação */}
        {totalPages > 1 && (
          <section className="flex justify-center">
            <div className="flex gap-1 md:gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Sempre mostrar as primeiras 5 páginas ou as últimas 5 se estiver perto do final
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                // Não mostrar páginas inválidas
                if (pageNum < 1 || pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium text-sm md:text-base transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#BB4514] text-white shadow-md'
                        : 'bg-white text-[#121A0F] border border-[#BB4514] hover:bg-[#F6D8B8]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {/* Mostrar "..." se houver mais páginas além das exibidas */}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[#121A0F]">
                  ...
                </span>
              )}
              
              {/* Mostrar última página se não estiver sendo exibida */}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white text-[#121A0F] border border-[#BB4514] hover:bg-[#F6D8B8] text-sm md:text-base transition-colors"
                >
                  {totalPages}
                </button>
              )}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;