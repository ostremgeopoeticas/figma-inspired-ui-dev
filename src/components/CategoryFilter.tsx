import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: Array<{ id: number; name: string; description: string }>;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onSelectCategory(category.name)}
          className={`px-3 py-2 md:px-6 md:py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
            selectedCategory === category.name
              ? 'bg-[#BB4514] text-white' 
              : 'bg-white text-[#121A0F] hover:bg-[#F6D8B8] border border-[#BB4514]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;