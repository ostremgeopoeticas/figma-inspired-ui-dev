import React from 'react';

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
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#BB4514] text-white px-3 py-1 rounded-full text-sm font-bold">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <time className="text-[#004A24] text-sm font-medium">
          {date}
        </time>
        <h3 className="text-xl font-bold text-[#121A0F] mt-2 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        <button className="bg-[#004A24] text-[#F6D8B8] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a2d] transition-colors duration-300">
          Leia mais
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
