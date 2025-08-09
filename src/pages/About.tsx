import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[300px] relative bg-gradient-to-r from-[#4B5A43] to-[#6B7A63] overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b40096a763428a08b2da23b86127f33486875a6a?width=2560"
          alt="Banner sobre o projeto"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#F6D8B8] text-5xl font-bold text-center">Sobre o projeto</h1>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto px-8 py-12">
        {/* Apresentação */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#004A24] mb-6">Apresentação</h2>
          <p className="text-lg text-[#121A0F] leading-relaxed mb-6">
            O projeto "Os Trem: Geopoéticas da Bacia do Rio Doce" é uma iniciativa acadêmico-cultural que mapeia as expressões
            culturais e artísticas da Bacia do Rio Doce. Através de uma abordagem interdisciplinar, que integra arte, geografia e memória, o
            projeto visa promover um diálogo entre diferentes formas de conhecimento tradicionais e científicos, valorizando as
            manifestações culturais locais, promovendo o diálogo entre as diferentes formas de conhecimento e valorizando a diversidade
            cultural da região.
          </p>
          <p className="text-lg text-[#121A0F] leading-relaxed">
            "Os Trem: Geopoéticas da Bacia do Rio Doce" é um projeto acadêmico-cultural que mapeia, reconstrói e celebra
            poéticas do território da própria comunidade na Bacia do Rio Doce. Através da articulação entre arte, geografia e memória, o
            projeto investiga manifestações artísticas e culturais, promovendo intercâmbio cultural entre as comunidades locais.
          </p>
        </section>

        {/* Objetivos */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#004A24] mb-6">Objetivos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#004A24] text-white p-6 rounded-lg">
              <h3 className="font-bold mb-3">Mapear manifestações culturais</h3>
              <ul className="text-sm space-y-2">
                <li>✓ Identificar manifestações culturais e artísticas</li>
                <li>✓ Sistematizar dados</li>
              </ul>
            </div>
            <div className="bg-[#004A24] text-white p-6 rounded-lg">
              <h3 className="font-bold mb-3">Refletir sobre os impactos da mineração</h3>
              <ul className="text-sm space-y-2">
                <li>✓ Analisar mudanças socioambientais</li>
                <li>✓ Documentar resistências</li>
              </ul>
            </div>
            <div className="bg-[#004A24] text-white p-6 rounded-lg">
              <h3 className="font-bold mb-3">Promover intercâmbio e memórias</h3>
              <ul className="text-sm space-y-2">
                <li>✓ Facilitar diálogo cultural</li>
                <li>✓ Preservar narrativas locais</li>
              </ul>
            </div>
            <div className="bg-[#004A24] text-white p-6 rounded-lg">
              <h3 className="font-bold mb-3">Criar um acervo digital</h3>
              <ul className="text-sm space-y-2">
                <li>✓ Desenvolver plataforma online</li>
                <li>✓ Sistematizar informações</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Metodologia */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#004A24] mb-6">Metodologia</h2>
          <p className="text-lg text-[#121A0F] leading-relaxed">
            Utilizamos uma metodologia interdisciplinar que integra pesquisas de campo, entrevistas, registros audiovisuais e análise de
            dados geográficos. Acreditamos que esta é a forma mais eficiente de mapear manifestações culturais e artísticas que têm a
            capacidade de resgatar memórias, tradições e identidades dos territórios e comunidades que habitam essa região. O projeto
            visa construir pontes entre diferentes formas de conhecimento acadêmico e popular, científico e tradicional.
          </p>
        </section>

        {/* Justificativa */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#004A24] mb-6">Justificativa</h2>
          <p className="text-lg text-[#121A0F] leading-relaxed mb-6">
            A Bacia do Rio Doce é um território marcado por ricas diversidades cultural e socioambiental. Este contexto de integrações da
            diversidade. Este projeto visa construir uma memória viva e crítica das lutas e das resistências empreendidas na região. Núcleo destes
            lugares para a construção de narrativas críticas, contribuindo para a valorização e preservação do patrimônio cultural da
            região é necessário.
          </p>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/6ef1e15276a6a497199d6aa81fd7f3b5e21d748e?width=778"
            alt="Pessoas participando de atividades do projeto"
            className="w-full max-w-2xl mx-auto rounded-lg"
          />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;