import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Events = () => {
  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[200px] relative bg-gradient-to-r from-[#BB4514] to-[#D4561A] overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b40096a763428a08b2da23b86127f33486875a6a?width=2560"
          alt="Banner Ipatinga e Coronel Fabriciano"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-2">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/53bab51df5ffdee1dc031b6b054768e906c68ca2?width=306" alt="Logo" className="w-12 h-12 mr-3 filter brightness-0 invert" />
              <h1 className="text-4xl font-bold">1º ENCONTRO</h1>
            </div>
            <h2 className="text-3xl font-bold">Ipatinga e Coronel Fabriciano</h2>
            <p className="text-lg mt-2">17, 18 e 19 de outubro de 2024</p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        {/* Descrição do Evento */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#004A24] mb-6">Encontros e Eventos</h2>
          <p className="text-lg text-[#121A0F] leading-relaxed mb-8">
            O projeto "Os Trem" promove encontros culturais que buscam fortalecer laços comunitários, criar espaços de memória e resistência, 
            destacar práticas de intercâmbio cultural que fortalecem identidades e promovem o diálogo entre as comunidades da Bacia do Rio Doce.
          </p>
        </section>

        {/* Próximo Evento */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-[#004A24] mb-6">Próximo Evento</h3>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=800"
              alt="Próximo evento"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-[#004A24] mb-4">1º Encontro Geopoético em Movimento</h4>
                  <ul className="space-y-2 text-[#121A0F]">
                    <li>• Data: 17 a 19 de outubro</li>
                    <li>• Local: Ipatinga e Coronel Fabriciano</li>
                    <li>• Participantes: Comunidades locais</li>
                    <li>• Atividades: Oficinas, apresentações</li>
                    <li>• Tema: Memórias e resistências</li>
                    <li>• Público: Aberto à comunidade</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#004A24] mb-4">1º Encontro - Ipatinga e Coronel Fabriciano</h4>
                  <ul className="space-y-2 text-[#121A0F]">
                    <li>• 17 a 19 de outubro de 2024</li>
                    <li>• Objetivo: Mapear manifestações</li>
                    <li>• Dinâmica: Oficinas participativas</li>
                    <li>• Encontros comunitários</li>
                    <li>• Registros audiovisuais</li>
                    <li>• Atividades lúdicas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#004A24] mb-4">Eixo - Ipatinga e Fabriciano</h4>
                  <ul className="space-y-2 text-[#121A0F]">
                    <li>• Mapeamento de resistências</li>
                    <li>• Manifestações artísticas</li>
                    <li>• Práticas comunitárias</li>
                    <li>• Intercâmbio de saberes</li>
                    <li>• Valorização da memória</li>
                    <li>• Fortalecimento de vínculos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programação */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-[#004A24] mb-6">Programação</h3>
          <p className="text-lg text-[#121A0F] leading-relaxed mb-6">
            Eventos: mesa sobre cidade dos picos junto ao projeto
          </p>
        </section>

        {/* Galeria de Registros */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-[#004A24] mb-6">Galeria de Registros</h3>
          <p className="text-[#121A0F] mb-6">Confira registros fotográficos de eventos:</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=400"
                alt="Evento comunitário, expressões e encontros diversos"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-[#121A0F]">Evento comunitário, expressões e encontros diversos</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=400"
                alt="Mesa sobre a cidade dos picos, encontros de atividades"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-[#121A0F]">Mesa sobre a cidade dos picos, encontros de atividades</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=400"
                alt="Encontro de intercâmbio comunitário, artefatos"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-[#121A0F]">Encontro de intercâmbio comunitário, artefatos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Próximos Encontros */}
        <section>
          <h3 className="text-2xl font-bold text-[#004A24] mb-6">Próximos encontros</h3>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex md:flex-row flex-col gap-8 items-center">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#004A24] mb-4">Encontro Geopoético em Movimento</h4>
                <p className="text-[#121A0F] leading-relaxed">
                  Nossos próximos encontros promovem uma série cultural comunitária em diversas áreas da região, 
                  promovendo e incentivando a Bacia do Rio Doce. O projeto contém oficinas educativas e artísticas 
                  que envolvem a preservação da Bacia e seus territórios, valorizando a cultura e a memória 
                  coletiva através de práticas participativas.
                </p>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=400"
                alt="Próximos encontros"
                className="w-80 h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Events;