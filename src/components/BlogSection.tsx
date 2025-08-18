import React from 'react';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';

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
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-4">
            Últimas postagens
          </h2>
          <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard
                image={post.image}
                category={post.category}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                imageAlt={post.imageAlt}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
