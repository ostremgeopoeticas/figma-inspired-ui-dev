import React from 'react';
import { motion } from 'framer-motion';

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  imageAlt?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  image, 
  category, 
  title, 
  date, 
  excerpt, 
  imageAlt = "" 
}) => {
  return (
    <motion.article 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-40 md:h-48 object-cover"
        />
        <div className="absolute top-3 left-3 md:top-4 md:left-4">
          <span className="bg-[#BB4514] text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
            {category}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <time className="text-[#004A24] text-xs md:text-sm font-medium">
          {date}
        </time>
        <h3 className="text-lg md:text-xl font-bold text-[#121A0F] mt-2 mb-3 line-clamp-2 flex-grow">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>
        <motion.button 
          className="bg-[#004A24] text-[#F6D8B8] px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-medium hover:bg-[#005a2d] transition-colors duration-300 self-start mt-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Leia mais
        </motion.button>
      </div>
    </motion.article>
  );
};

export default BlogCard;
