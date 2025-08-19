import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import teamHero from '@/assets/team-hero.jpg';
import anaLuizaDrummond from '@/assets/ana_luiza_drummond.png';
import angelaMariaPena from '@/assets/angela_maria_pena_nova.png';
import isabelaStefani from '@/assets/isabela_stefani_de_paula.png';
import riannMatheus from '@/assets/riann_matheus_dias.png';
import helenaAssuncao from '@/assets/prof_dra_helena_assuncao.png';
import ranielleFigueiredo from '@/assets/prof_dra_ranielle.png';
import jorgeTeodoro from '@/assets/prof_dr_jorge.png';
import logoIFMG from '@/assets/logo_ifmg.png';
import logoUFOP from '@/assets/logo_ufop.png';

const Team = () => {
  const coordinator = {
    name: "Profa. Dra. Ana Luiza Duarte de Brito Drummond",
    role: "Coordenação do projeto",
    institution: "Instituto Federal de Minas Gerais campus São João Evangelista",
    image: anaLuizaDrummond
  };

  const students = [
    {
      name: "Ângela Maria Peña Novoa",
      institution: "Corporación universitaria UNITEC, Bogotá, Colombia",
      image: angelaMariaPena
    },
    {
      name: "Isabela Stefani de Paula Silva",
      institution: "Instituto Federal de Minas Gerais campus São João Evangelista",
      image: isabelaStefani
    },
    {
      name: "Riann Matheus Dias da Costa",
      institution: "Instituto Federal de Minas Gerais campus São João Evangelista",
      image: riannMatheus
    }
  ];

  const collaborators = [
    {
      name: "Profa. Dra. Helena Santos Assunção",
      institution: "Instituto Federal de Minas Gerais campus Ouro Preto",
      image: helenaAssuncao
    },
    {
      name: "Profa. Dra. Ranielle Menezes de Figueiredo",
      institution: "Universidade Federal de Ouro Preto",
      image: ranielleFigueiredo
    },
    {
      name: "Prof. Dr. Jorge Benedito de Freitas Teodoro",
      institution: "Universidade Federal de Ouro Preto",
      image: jorgeTeodoro
    }
  ];

  const institutions = [
    {
      name: "IFMG",
      fullName: "Instituto Federal de Minas Gerais",
      logo: logoIFMG
    },
    {
      name: "UFOP",
      fullName: "Universidade Federal de Ouro Preto",
      logo: logoUFOP
    }
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${teamHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#F6D8B8] text-3xl md:text-5xl font-bold text-center">Equipe</h1>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Coordenação */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6 md:mb-8 text-center">Coordenação</h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-xs md:max-w-md text-center">
              <img
                src={coordinator.image}
                alt={coordinator.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-3 md:mb-4 object-cover border-4 border-[#BB4514]"
              />
              <h3 className="text-lg md:text-xl font-bold text-[#004A24] mb-1 md:mb-2">{coordinator.name}</h3>
              <p className="text-[#BB4514] font-semibold mb-2 md:mb-3 text-sm md:text-base">{coordinator.role}</p>
              <p className="text-[#121A0F] text-xs md:text-sm">{coordinator.institution}</p>
            </div>
          </div>
        </section>

        {/* Estudantes */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6 md:mb-8 text-center">Estudantes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {students.map((student, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 md:p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 object-cover border-2 border-[#BB4514]"
                />
                <h3 className="text-base md:text-lg font-bold text-[#004A24] mb-1 md:mb-2">{student.name}</h3>
                <p className="text-[#121A0F] text-xs md:text-sm leading-relaxed">{student.institution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Colaboradores */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6 md:mb-8 text-center">Colaboradores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {collaborators.map((collaborator, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 md:p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <img
                  src={collaborator.image}
                  alt={collaborator.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 object-cover border-2 border-[#004A24]"
                />
                <h3 className="text-base md:text-lg font-bold text-[#004A24] mb-1 md:mb-2">{collaborator.name}</h3>
                <p className="text-[#121A0F] text-xs md:text-sm leading-relaxed">{collaborator.institution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parceiros e Instituições */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6 md:mb-8 text-center">Parceiros e Instituições Envolvidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {institutions.map((institution, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-[#004A24] p-4 md:p-6 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src={institution.logo}
                    alt={`${institution.name} Logo`}
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto filter brightness-0 invert object-contain"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#004A24] mb-2">{institution.name}</h3>
                <p className="text-[#121A0F] text-sm md:text-base">{institution.fullName}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Team;