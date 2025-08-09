import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';

const Blog = () => {
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
      date: "21 de Junho de 2025",
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
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=584",
      category: "Memória",
      title: "Arte e Memória: A Reconstrução de Narrativas",
      date: "15 de março de 2025",
      excerpt: "Como as manifestações artísticas ajudam a preservar e reconstituir as memórias coletivas das comunidades da Bacia do Rio Doce.",
      imageAlt: "Arte e memória"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=584",
      category: "Geografia",
      title: "Geopoéticas da Bacia: Explorando o território através da arte",
      date: "10 de março de 2025",
      excerpt: "A intersecção entre geografia e poesia revela novas formas de compreender e experienciar o território da Bacia do Rio Doce.",
      imageAlt: "Geopoéticas"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=584",
      category: "Artigos",
      title: "Geopoéticas na Bacia: Explorando a identidade Cultural",
      date: "5 de março de 2025",
      excerpt: "Análise das práticas culturais que definem a identidade das comunidades ribeirinhas e sua relação com o território.",
      imageAlt: "Identidade cultural"
    }
  ];

  const categories = ["Todos", "Artigos", "Geografia", "Relatos"];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[300px] relative bg-gradient-to-r from-[#4B5A43] to-[#6B7A63] overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b40096a763428a08b2da23b86127f33486875a6a?width=2560"
          alt="Banner notícias e blog"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#F6D8B8] text-5xl font-bold text-center">Notícias / Blog</h1>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        {/* Filtros */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  index === 0 
                    ? 'bg-[#BB4514] text-white' 
                    : 'bg-white text-[#121A0F] hover:bg-[#F6D8B8] border border-[#BB4514]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </section>

        {/* Paginação */}
        <section className="flex justify-center">
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg bg-[#BB4514] text-white font-medium">1</button>
            <button className="w-10 h-10 rounded-lg bg-white text-[#121A0F] border border-[#BB4514] hover:bg-[#F6D8B8]">2</button>
            <button className="w-10 h-10 rounded-lg bg-white text-[#121A0F] border border-[#BB4514] hover:bg-[#F6D8B8]">3</button>
            <button className="w-10 h-10 rounded-lg bg-white text-[#121A0F] border border-[#BB4514] hover:bg-[#F6D8B8]">4</button>
            <button className="w-10 h-10 rounded-lg bg-white text-[#121A0F] border border-[#BB4514] hover:bg-[#F6D8B8]">5</button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;