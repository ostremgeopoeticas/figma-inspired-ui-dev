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
    <article className="flex w-[321px] h-[551px] flex-col items-start p-4">
      <div className="flex w-[291px] flex-col items-start gap-4 rounded-lg">
        <img
          src={image}
          alt={imageAlt}
          className="w-[292px] h-[171px] rounded-[20px_20px_0_0] object-cover"
        />
        <div className="flex w-[291px] flex-col items-start gap-4">
          <div className="flex w-[291px] flex-col items-start gap-1">
            <div className="flex w-[291px] h-[29px] flex-col items-start">
              <span className="h-[29px] w-full text-[#BB4514] text-[22px] font-bold leading-[25px]">
                {category}
              </span>
            </div>
            <div className="flex w-[291px] flex-col items-start">
              <h3 className="w-full text-[#121A0F] text-[22px] font-bold leading-[25px] mb-2">
                {title}
              </h3>
            </div>
            <time className="w-full text-[#004A24] text-xs font-normal leading-[21px]">
              {date}
            </time>
            <div className="flex w-[291px] flex-col items-start">
              <p className="w-full text-[#121A0F] text-sm font-normal leading-[21px]">
                {excerpt}
              </p>
            </div>
          </div>
          <button className="flex h-8 min-w-[84px] max-w-[480px] justify-center items-center bg-[#EBF2E8] px-4 py-0 rounded-lg hover:bg-[#dde8d8] transition-colors">
            <span className="text-[#121A0F] text-center text-sm font-normal leading-[21px]">
              Leia mais
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
