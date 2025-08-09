import React from 'react';
import BlogCard from './BlogCard';

const BlogSection = () => {
  const blogPosts = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=584",
      category: "Arte",
      title: "Exposição 'Cores da Bacia' celebra a diversidade artística da região",
      date: "21 de abril de 2025",
      excerpt: "Artistas locais apresentam obras inspiradas na paisagem e cultura da Bacia do Rio Doce, explorando temas como memória, identidade e sustentabilidade.",
      imageAlt: "Exposição de arte na Bacia do Rio Doce"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=584",
      category: "Comunidade",
      title: "Oficinas de arte e cultura reúnem comunidades na Bacia do Rio Doce",
      date: "21 de Junio de 2025",
      excerpt: "O projeto 'Os Trem' promove oficinas de arte e cultura em diversas localidades da Bacia do Rio Doce, incentivando a participação comunitária e o intercâmbio de saberes.",
      imageAlt: "Oficinas comunitárias de arte e cultura"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=584",
      category: "Relatos",
      title: "Documentário 'Rio de Memórias' retrata a história e os desafios da Bacia do Rio Doce",
      date: "21 de abril de 2025",
      excerpt: "O documentário 'Rio de Memórias' apresenta depoimentos de moradores, artistas e pesquisadores, revelando a riqueza cultural e os desafios socioambientais da Bacia do Rio Doce.",
      imageAlt: "Documentário sobre a Bacia do Rio Doce"
    }
  ];

  return (
    <section className="flex max-w-[960px] items-start w-full">
      <div className="flex h-[618px] flex-col items-start flex-1">
        <div className="flex flex-col items-start w-full box-border pt-[50px] pb-3 px-4">
          <h2 className="w-full text-[#004A24] text-[22px] font-normal leading-7">
            Últimas postagens
          </h2>
        </div>
        <div className="flex items-start w-full">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              image={post.image}
              category={post.category}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              imageAlt={post.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
