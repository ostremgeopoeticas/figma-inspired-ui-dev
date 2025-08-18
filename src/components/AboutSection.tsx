import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="flex w-full justify-center items-center box-border bg-[#F6D8B8] px-4 py-8 md:px-16 md:py-12">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 md:gap-[78px] items-center">
        <motion.div
          className="w-full md:w-[461px] text-[#121A0F] text-base md:text-lg font-normal leading-relaxed"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          O projeto 'Os Trem' é uma iniciativa que busca mapear e celebrar as diversas manifestações culturais e artísticas presentes na Bacia do Rio Doce. Através de uma abordagem interdisciplinar, que integra arte, geografia e memória, o projeto visa promover um diálogo entre as comunidades locais e o patrimônio natural e cultural da região.
        </motion.div>
        <motion.img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6ef1e15276a6a497199d6aa81fd7f3b5e21d748e?width=778"
          alt="Imagem representativa do projeto Os Trem"
          className="w-full md:w-[389px] h-auto max-h-[199px] rounded-[20px] object-cover"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
    </section>
  );
};

export default AboutSection;
