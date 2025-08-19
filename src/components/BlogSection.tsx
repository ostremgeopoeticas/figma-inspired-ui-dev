import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import { getBlogPosts } from '@/services/blogService';
import { BlogPost } from '@/lib/supabase';

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar as 3 últimas postagens publicadas
        const posts = await getBlogPosts(1, 3);
        console.log('Latest posts fetched:', posts);
        
        setBlogPosts(posts);
      } catch (err) {
        console.error('Error fetching latest posts:', err);
        setError('Erro ao carregar as últimas postagens');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  // Função para formatar a data
  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Função para obter uma imagem padrão se não houver imagem
  const getDefaultImage = (category: string): string => {
    const categoryImages: { [key: string]: string } = {
      'Arte': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      'Comunidade': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
      'Relatos': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      'Cultura': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      'História': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
    };
    
    return categoryImages[category] || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop';
  };

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#004A24] mb-4">
            Últimas postagens
          </h2>
          <div className="w-16 h-1 bg-[#BB4514] mx-auto"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB4514] mb-4"></div>
              <p className="text-[#121A0F]">Carregando últimas postagens...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-[#BB4514] text-white px-4 py-2 rounded-lg hover:bg-[#A03D12] transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 font-medium">Nenhuma postagem encontrada</p>
              <p className="text-gray-500 text-sm mt-2">Aguarde novas publicações</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard
                  id={post.id}
                  image={post.image_url || getDefaultImage(post.category)}
                  category={post.category}
                  title={post.title}
                  date={formatDate(post.created_at)}
                  excerpt={post.excerpt}
                  imageAlt={`Imagem do post: ${post.title}`}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Botão para ver todas as postagens */}
        {blogPosts.length > 0 && (
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="/blog" 
              className="inline-flex items-center bg-[#004A24] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#005a2d] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Ver todas as postagens
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
