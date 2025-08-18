import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id?: number;
  image: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  imageAlt?: string;
}

// Função para formatar a data com tratamento de erro
const safeFormatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

const BlogCard: React.FC<BlogCardProps> = ({ 
  id,
  image, 
  category, 
  title, 
  date, 
  excerpt, 
  imageAlt = "" 
}) => {
  // Formatar a data com tratamento de erro
  const formattedDate = safeFormatDate(date);
  return (
    <motion.article 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-[#E8F5E9]"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/blog/${id}`} className="block h-full flex flex-col">
        <div className="relative">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 md:top-4 md:left-4">
            <span className="bg-[#BB4514] text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-md">
              {category}
            </span>
          </div>
        </div>
        <div className="p-5 md:p-6 flex flex-col flex-grow">
          <time className="text-[#004A24] text-xs md:text-sm font-medium">
            {formattedDate}
          </time>
          <h3 className="text-xl font-bold text-[#121A0F] mt-3 mb-3 line-clamp-2 flex-grow">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </p>
          <motion.button 
            className="bg-[#004A24] text-[#F6D8B8] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a2d] transition-colors duration-300 self-start mt-auto shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Leia mais
          </motion.button>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
