import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Award, GraduationCap, Building, Mail, Linkedin, Globe, Star } from 'lucide-react';
import teamHero from '@/assets/banner_equipe_pag.png';
import anaLuizaDrummond from '@/assets/ana_luiza_drummond.png';
import angelaMariaPena from '@/assets/angela_maria_pena_nova.png';
import isabelaStefani from '@/assets/isabela_leao_de_paula_foto.png';
import riannMatheus from '@/assets/riann_matheus_dias_da_costa.png';
import helenaAssuncao from '@/assets/prof_dra_helena_assuncao.png';
import ranielleFigueiredo from '@/assets/prof_dra_ranielle.png';
import jorgeTeodoro from '@/assets/prof_dr_jorge_benedito_de_freitas_teodoro.png';
import logoIFMG from '@/assets/logo_ifmg.png';
import logoUFOP from '@/assets/logo_ufop.png';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const coordinator = {
    name: "Profa. Dra. Ana Luiza Duarte de Brito Drummond",
    role: "Coordenação do projeto",
    institution: "Instituto Federal de Minas Gerais campus São João Evangelista",
    image: anaLuizaDrummond,
    email: "ana.luiza@ifmg.edu.br",
    linkedin: "https://linkedin.com/in/ana-luiza-drummond",
    website: "https://ifmg.edu.br",
    specialties: ["Geopoética", "Geografia Cultural", "Memória Territorial"],
    description: "Professora e pesquisadora dedicada ao estudo das geopoéticas e manifestações culturais da Bacia do Rio Doce."
  };

  const students = [
    {
      name: "Angela Maria Peña Novoa",
      institution: "Corporación universitaria UNITEC, Bogotá, Colombia",
      image: angelaMariaPena,
      role: "Pesquisadora",
      email: "angela.pena@unitec.edu.co",
      specialties: ["Arte e Cultura", "Pesquisa de Campo", "Documentação"],
      description: "Pesquisadora colombiana especializada em arte e cultura latino-americana."
    },
    {
      name: "Isabela Stefani de Paula Silva",
      institution: "Instituto Federal de Minas Gerais campus São João Evangelista",
      image: isabelaStefani,
      role: "Estudante de Pesquisa",
      email: "isabela.stefani@ifmg.edu.br",
      specialties: ["Geografia", "Mapeamento Cultural", "Tecnologia"],
      description: "Estudante dedicada ao mapeamento cultural e tecnológico da região."
    },
    {
      name: "Riann Matheus Dias da Costa",
      institution: "Instituto Federal de Minas Gerais campus São João Evangelista",
      image: riannMatheus,
      role: "Desenvolvedor",
      email: "riann.matheus@ifmg.edu.br",
      specialties: ["Desenvolvimento Web", "Sistemas", "Tecnologia"],
      description: "Desenvolvedor responsável pela plataforma digital do projeto."
    }
  ];

  const collaborators = [
    {
      name: "Profa. Dra. Helena Santos Assunção",
      institution: "Instituto Federal de Minas Gerais campus Ouro Preto",
      image: helenaAssuncao,
      role: "Colaboradora",
      email: "helena.assuncao@ifmg.edu.br",
      specialties: ["Educação", "Pesquisa", "Extensão"],
      description: "Professora colaboradora especializada em educação e extensão universitária."
    },
    {
      name: "Profa. Dra. Ranielle Menezes de Figueiredo",
      institution: "Universidade Federal de Ouro Preto",
      image: ranielleFigueiredo,
      role: "Colaboradora",
      email: "ranielle.figueiredo@ufop.edu.br",
      specialties: ["Geografia", "Pesquisa", "Academia"],
      description: "Pesquisadora da UFOP com foco em geografia e estudos territoriais."
    },
    {
      name: "Prof. Dr. Jorge Benedito de Freitas Teodoro",
      institution: "Universidade Federal de Ouro Preto",
      image: jorgeTeodoro,
      role: "Colaborador",
      email: "jorge.teodoro@ufop.edu.br",
      specialties: ["Pesquisa", "Academia", "Extensão"],
      description: "Professor colaborador com vasta experiência em pesquisa acadêmica."
    }
  ];

  const institutions = [
    {
      name: "IFMG",
      fullName: "Instituto Federal de Minas Gerais",
      logo: logoIFMG,
      description: "Instituição federal de ensino superior e técnico"
    },
    {
      name: "UFOP",
      fullName: "Universidade Federal de Ouro Preto",
      logo: logoUFOP,
      description: "Universidade pública federal de excelência"
    }
  ];

  const stats = [
    { label: "Membros", value: "7", icon: <Users className="w-6 h-6" /> },
    { label: "Instituições", value: "2", icon: <Building className="w-6 h-6" /> },
    { label: "Especialidades", value: "12+", icon: <Award className="w-6 h-6" /> },
    { label: "Experiência", value: "15+ anos", icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${teamHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#BB4514]/80 to-[#8B4513]/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#BB4514]/20 to-[#8B4513]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#F6D8B8] text-4xl md:text-6xl font-bold text-center drop-shadow-lg mb-4">
              Nossa Equipe
            </h1>
            <p className="text-[#E8F5E9] text-lg md:text-xl max-w-3xl mx-auto px-4">
              Conheça os pesquisadores, estudantes e colaboradores que fazem parte do projeto
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Pesquisadores</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Estudantes</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Colaboradores</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* Estatísticas */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-4">Nossa Equipe em Números</h2>
              <p className="text-gray-600">Conheça os números que representam nossa equipe</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-[#004A24] mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coordenação */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Coordenação</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Imagem */}
              <div className="lg:col-span-1">
                <div className="relative h-[500px] lg:h-full bg-gradient-to-br from-[#BB4514]/10 to-[#8B4513]/10 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Informações */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-2">
                      {coordinator.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-[#BB4514]" />
                      <span className="text-lg font-medium text-[#BB4514]">{coordinator.role}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Building className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-600">{coordinator.institution}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {coordinator.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {coordinator.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-[#BB4514]/10 text-[#BB4514] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <a
                      href={`mailto:${coordinator.email}`}
                      className="flex items-center gap-2 text-[#BB4514] hover:text-[#A03D12] transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email</span>
                    </a>
                    <a
                      href={coordinator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#BB4514] hover:text-[#A03D12] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={coordinator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#BB4514] hover:text-[#A03D12] transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Website</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estudantes */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Estudantes e Pesquisadores</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onMouseEnter={() => setHoveredMember(student.name)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative h-96 bg-gradient-to-br from-[#BB4514]/10 to-[#8B4513]/10">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-[#004A24] font-bold text-xl mb-2">{student.name}</h3>
                    <p className="text-[#BB4514] text-base font-medium">{student.role}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-[#BB4514]" />
                    <span className="text-sm text-gray-600">{student.institution}</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4">
                    {student.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {student.specialties.map((specialty, specIndex) => (
                      <span
                        key={specIndex}
                        className="bg-[#BB4514]/10 text-[#BB4514] px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={`mailto:${student.email}`}
                    className="flex items-center gap-2 text-[#BB4514] hover:text-[#A03D12] transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contato</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colaboradores */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Colaboradores</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onMouseEnter={() => setHoveredMember(collaborator.name)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative h-96 bg-gradient-to-br from-[#BB4514]/10 to-[#8B4513]/10">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={collaborator.image}
                        alt={collaborator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                                    <div className="text-center mb-4">
                    <h3 className="text-[#004A24] font-bold text-xl mb-2">{collaborator.name}</h3>
                    <p className="text-[#BB4514] text-base font-medium">{collaborator.role}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-4 h-4 text-[#BB4514]" />
                    <span className="text-sm text-gray-600">{collaborator.institution}</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4">
                    {collaborator.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {collaborator.specialties.map((specialty, specIndex) => (
                      <span
                        key={specIndex}
                        className="bg-[#BB4514]/10 text-[#BB4514] px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={`mailto:${collaborator.email}`}
                    className="flex items-center gap-2 text-[#BB4514] hover:text-[#A03D12] transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contato</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instituições */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Instituições Parceiras</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {institutions.map((institution, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6">
                    <img
                      src={institution.logo}
                      alt={institution.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#004A24] mb-2">{institution.fullName}</h3>
                  <p className="text-gray-600 mb-4">{institution.description}</p>
                  <div className="flex justify-center">
                    <span className="bg-[#BB4514]/10 text-[#BB4514] px-4 py-2 rounded-full text-sm font-medium">
                      Parceira
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-[#BB4514] to-[#8B4513] rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Quer fazer parte da nossa equipe?</h2>
            <p className="text-lg mb-6 opacity-90">
              Estamos sempre abertos a novas colaborações e parcerias
            </p>
            <a
              href="/contato"
              className="bg-white text-[#BB4514] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Entre em Contato
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Team;