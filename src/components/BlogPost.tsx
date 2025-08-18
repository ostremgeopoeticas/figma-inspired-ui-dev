import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image_url: string;
  created_at: string;
  published: boolean;
  published_at: string | null;
}

const BlogPost: React.FC<BlogPostProps> = ({ 
  id,
  title,
  content,
  excerpt,
  category,
  author,
  image_url,
  created_at
}) => {
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <motion.article 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cabeçalho do post */}
      <div className="relative">
        {image_url && (
          <img
            src={image_url}
            alt={title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-[#BB4514] text-white px-3 py-1 rounded-full text-sm font-bold">
            {category}
          </span>
        </div>
      </div>

      {/* Conteúdo do post */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <time className="text-[#004A24] text-sm font-medium">
            {formatDate(created_at)}
          </time>
          <span className="text-[#121A0F] text-sm">
            Por {author}
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-[#121A0F] mb-6">
          {title}
        </h1>

        <div 
          className="text-[#121A0F] leading-relaxed prose max-w-none prose-headings:text-[#004A24] prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-a:text-[#BB4514] prose-a:hover:text-[#A03D12] prose-blockquote:border-l-4 prose-blockquote:border-[#BB4514] prose-blockquote:pl-4 prose-blockquote:text-[#004A24]"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags e compartilhamento */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#E8F5E9] text-[#004A24] px-3 py-1 rounded-full text-sm">
                {category}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[#121A0F] text-sm">Compartilhar:</span>
              <button className="w-8 h-8 rounded-full bg-[#BB4514] text-white flex items-center justify-center hover:bg-[#A03D12] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-8 h-8 rounded-full bg-[#BB4514] text-white flex items-center justify-center hover:bg-[#A03D12] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </button>
              <button className="w-8 h-8 rounded-full bg-[#BB4514] text-white flex items-center justify-center hover:bg-[#A03D12] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Botão para voltar ao blog */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link 
            to="/blog"
            className="inline-flex items-center text-[#BB4514] hover:text-[#A03D12] font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para o Blog
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;