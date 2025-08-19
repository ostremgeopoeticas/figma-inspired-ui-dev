import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import teamHero from '@/assets/banner_equipe_pag.png';
import anaLuizaDrummond from '@/assets/ana_luiza_drummond.png';
import angelaMariaPena from '@/assets/angela_maria_pena_nova.png';
import isabelaStefani from '@/assets/isabela_stefani_de_paula.png';
import riannMatheus from '@/assets/riann_matheus_dias.png';
import helenaAssuncao from '@/assets/prof_dra_helena_assuncao.png';
import ranielleFigueiredo from '@/assets/prof_dra_ranielle.png';
import jorgeTeodoro from '@/assets/prof_dr_jorge.png';
import logoIFMG from '@/assets/logo_ifmg.png';
import logoUFOP from '@/assets/logo_ufop.png';
import { motion } from 'framer-motion';

const Team = () => {
  const coordinator = {
    name: "Profa. Dra. Ana Luiza Duarte de Brito Drummond",
    role: "Coordenação do projeto",
    institution: "Instituto Federal de Minas Gerais campus São João Evangelista",
    image: anaLuizaDrummond
  };

  const students = [
    {
      name: "Angela Maria Peña Novoa",
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
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${teamHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="text-[#F6D8B8] text-4xl md:text-6xl font-bold text-center drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Equipe
          </motion.h1>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Coordenação */}
        <motion.section 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-8 md:mb-12 text-center">
            Coordenação
          </h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg text-center border border-[#E8F5E9]">
              <div className="relative mb-8">
                <img
                  src={coordinator.image}
                  alt={coordinator.name}
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full mx-auto object-cover border-4 border-[#BB4514] shadow-lg"
                />
                <div className="absolute -bottom-3 -right-3 bg-[#BB4514] text-white rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#004A24] mb-2">{coordinator.name}</h3>
              <p className="text-[#BB4514] font-semibold mb-3 text-base">{coordinator.role}</p>
              <p className="text-[#121A0F] text-sm leading-relaxed">{coordinator.institution}</p>
            </div>
          </div>
        </motion.section>

        {/* Estudantes */}
        <motion.section 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-8 md:mb-12 text-center">
            Estudantes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {students.map((student, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 border border-[#E8F5E9] hover:border-[#BB4514]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-6">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full mx-auto object-cover border-3 border-[#BB4514] shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#004A24] text-white rounded-full p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#004A24] mb-2">{student.name}</h3>
                <p className="text-[#121A0F] text-sm leading-relaxed">{student.institution}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Colaboradores */}
        <motion.section 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-8 md:mb-12 text-center">
            Colaboradores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collaborators.map((collaborator, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 border border-[#E8F5E9] hover:border-[#004A24]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-6">
                  <img
                    src={collaborator.image}
                    alt={collaborator.name}
                    className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full mx-auto object-cover border-3 border-[#004A24] shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#BB4514] text-white rounded-full p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#004A24] mb-2">{collaborator.name}</h3>
                <p className="text-[#121A0F] text-sm leading-relaxed">{collaborator.institution}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Parceiros e Instituições */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-8 md:mb-12 text-center">
            Parceiros e Instituições Envolvidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {institutions.map((institution, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-all duration-300 border border-[#E8F5E9]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-6 md:p-8 rounded-full mb-6 flex items-center justify-center border-2 border-[#004A24] shadow-md">
                  <img
                    src={institution.logo}
                    alt={`${institution.name} Logo`}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-3">{institution.name}</h3>
                <p className="text-[#121A0F] text-base md:text-lg font-medium">{institution.fullName}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default Team;