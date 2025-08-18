import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="flex w-full h-[300px] justify-center items-center gap-[78px] box-border bg-[#F6D8B8] px-44 py-0">
      <motion.div
        className="w-[461px] text-[#121A0F] text-lg font-normal leading-[29px]"
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
        className="w-[389px] h-[199px] rounded-[20px]"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
    </section>
  );
};

export default AboutSection;
