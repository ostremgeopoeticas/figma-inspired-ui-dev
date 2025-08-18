import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import teamHero from '@/assets/team-hero.jpg';

const Team = () => {
  const coordinator = {
    name: "Profa. Dra. Ana Luiza Rocha de Bem Drummond",
    role: "Coordenação do projeto",
    description: "Professora do Instituto de Geociências da UFMG. Doutora em Geografia e especialista em geopoética.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=300"
  };

  const students = [
    {
      name: "Ana Carolina e Silva Santos",
      role: "Graduação em Psicologia na UFMG",
      description: "Estudante de graduação em Psicologia na UFMG",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=300"
    },
    {
      name: "Gabriel Santos de Melo Silva",
      role: "Graduação em História na UFMG",
      description: "Estudante de graduação em História na UFMG",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=300"
    },
    {
      name: "Diego Martinez Gala da Costa",
      role: "Graduação em Geografia na UFMG",
      description: "Estudante de graduação em Geografia na UFMG",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=300"
    }
  ];

  const collaborators = [
    {
      name: "Profa. Dra. Helena Santos Almeida",
      role: "Professora do Instituto de Geociências da UFMG",
      description: "Doutora em Geografia",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=300"
    },
    {
      name: "Profa. Dra. Benedita Machado de Figueredo",
      role: "Professora da Faculdade de Letras da UFMG",
      description: "Doutora em Letras",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/87454d08b607413c6c8d60521159da7db8f0c8e8?width=300"
    },
    {
      name: "Prof. Dr. Jorge Berardineli Pereira Nonato",
      role: "Professor da Faculdade de Educação da UFMG",
      description: "Doutor em Educação",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=300"
    }
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${teamHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </section>

      <div className="w-full max-w-6xl mx-auto px-8 py-12">
        {/* Coordenação */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#004A24] mb-8 text-center">Coordenação</h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
              <img
                src={coordinator.image}
                alt={coordinator.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-[#004A24] mb-2">{coordinator.name}</h3>
              <p className="text-[#BB4514] font-semibold mb-3">{coordinator.role}</p>
              <p className="text-[#121A0F] text-sm">{coordinator.description}</p>
            </div>
          </div>
        </section>

        {/* Estudantes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#004A24] mb-8 text-center">Estudantes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {students.map((student, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-[#004A24] mb-2">{student.name}</h3>
                <p className="text-[#BB4514] font-semibold mb-3">{student.role}</p>
                <p className="text-[#121A0F] text-sm">{student.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Colaboradores */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#004A24] mb-8 text-center">Colaboradores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {collaborators.map((collaborator, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <img
                  src={collaborator.image}
                  alt={collaborator.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-bold text-[#004A24] mb-2">{collaborator.name}</h3>
                <p className="text-[#BB4514] font-semibold mb-3">{collaborator.role}</p>
                <p className="text-[#121A0F] text-sm">{collaborator.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parceiros e Instituições */}
        <section>
          <h2 className="text-3xl font-bold text-[#004A24] mb-8 text-center">Parceiros e Instituições Envolvidas</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="bg-[#004A24] p-8 rounded-lg mb-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=200"
                  alt="IFMG Logo"
                  className="w-24 h-24 mx-auto filter brightness-0 invert"
                />
              </div>
              <h3 className="text-xl font-bold text-[#004A24] mb-2">IFMG</h3>
              <p className="text-[#121A0F]">Instituto Federal de Minas Gerais</p>
            </div>
            <div className="text-center">
              <div className="bg-[#004A24] p-8 rounded-lg mb-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=200"
                  alt="UFOP Logo"
                  className="w-24 h-24 mx-auto filter brightness-0 invert"
                />
              </div>
              <h3 className="text-xl font-bold text-[#004A24] mb-2">UFOP</h3>
              <p className="text-[#121A0F]">Universidade Federal de Ouro Preto</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Team;