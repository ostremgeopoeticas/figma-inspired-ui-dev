import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Users, Calendar, Target, BookOpen, Heart, Shield, Globe, Award, Lightbulb } from 'lucide-react';
import aboutHero from '@/assets/about-hero.jpg';
import bottomImage from '@/assets/imagem_bottom_pag_sobre.png';

const About = () => {
  const [animatedStats, setAnimatedStats] = useState({
    communities: 0,
    municipalities: 0,
    events: 0,
    participants: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.1 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const targets = { communities: 50, municipalities: 229, events: 15, participants: 500 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        communities: Math.floor(targets.communities * progress),
        municipalities: Math.floor(targets.municipalities * progress),
        events: Math.floor(targets.events * progress),
        participants: Math.floor(targets.participants * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(targets);
      }
    }, stepDuration);
  };

  const objectives = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Mapear manifestações culturais",
      description: "Identificar e sistematizar manifestações culturais e artísticas da região",
      items: ["Identificar manifestações culturais e artísticas", "Sistematizar dados", "Criar inventário cultural"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Refletir sobre os impactos da mineração",
      description: "Analisar mudanças socioambientais e documentar resistências",
      items: ["Analisar mudanças socioambientais", "Documentar resistências", "Preservar memórias"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Promover intercâmbio e memórias",
      description: "Facilitar diálogo cultural e preservar narrativas locais",
      items: ["Facilitar diálogo cultural", "Preservar narrativas locais", "Fortalecer laços comunitários"]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Criar um acervo digital",
      description: "Desenvolver plataforma online e sistematizar informações",
      items: ["Desenvolver plataforma online", "Sistematizar informações", "Tornar acessível o conhecimento"]
    }
  ];

  const methodologySteps = [
    {
      step: "01",
      title: "Pesquisa de Campo",
      description: "Visitas às comunidades locais para mapear manifestações culturais"
    },
    {
      step: "02",
      title: "Entrevistas",
      description: "Conversas com artistas, lideranças e membros das comunidades"
    },
    {
      step: "03",
      title: "Registros Audiovisuais",
      description: "Documentação fotográfica e videográfica das atividades culturais"
    },
    {
      step: "04",
      title: "Análise de Dados",
      description: "Processamento e sistematização das informações coletadas"
    }
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#BB4514]/80 to-[#8B4513]/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#BB4514]/20 to-[#8B4513]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#F6D8B8] text-4xl md:text-6xl font-bold text-center drop-shadow-lg mb-4">
              Sobre o Projeto
            </h1>
            <p className="text-[#E8F5E9] text-lg md:text-xl max-w-3xl mx-auto px-4">
              Os Trem: Geopoéticas da Bacia do Rio Doce
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Iniciativa Acadêmico-Cultural</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Bacia do Rio Doce</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Arte, Geografia e Memória</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* Apresentação */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Apresentação</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-[#121A0F] leading-relaxed">
                O projeto <strong>"Os Trem: Geopoéticas da Bacia do Rio Doce"</strong> é uma iniciativa acadêmico-cultural que mapeia as expressões
                culturais e artísticas da Bacia do Rio Doce. Através de uma abordagem interdisciplinar, que integra arte, geografia e memória, o
                projeto visa promover um diálogo entre diferentes formas de conhecimento tradicionais e científicos.
              </p>
              <p className="text-lg text-[#121A0F] leading-relaxed">
                Valorizamos as manifestações culturais locais, promovendo o diálogo entre as diferentes formas de conhecimento e valorizando a diversidade
                cultural da região.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#BB4514]" />
                  <span className="text-sm font-medium text-[#004A24]">Interdisciplinar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#BB4514]" />
                  <span className="text-sm font-medium text-[#004A24]">Comunitário</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#BB4514]" />
                  <span className="text-sm font-medium text-[#004A24]">Cultural</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#BB4514]/10 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#BB4514]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#004A24]">Missão</h3>
                    <p className="text-sm text-gray-600">Mapear e celebrar poéticas do território</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#BB4514]/10 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-[#BB4514]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#004A24]">Visão</h3>
                    <p className="text-sm text-gray-600">Promover intercâmbio cultural entre comunidades</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#BB4514]/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#BB4514]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#004A24]">Valores</h3>
                    <p className="text-sm text-gray-600">Diversidade, memória e resistência</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section id="stats-section" className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-4">Nossos Números</h2>
              <p className="text-gray-600">Impacto do projeto na Bacia do Rio Doce</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#BB4514]" />
                </div>
                <div className="text-3xl font-bold text-[#004A24] mb-2">
                  {animatedStats.communities}+
                </div>
                <p className="text-gray-600">Comunidades</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-[#BB4514]" />
                </div>
                <div className="text-3xl font-bold text-[#004A24] mb-2">
                  {animatedStats.municipalities}
                </div>
                <p className="text-gray-600">Municípios</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#BB4514]" />
                </div>
                <div className="text-3xl font-bold text-[#004A24] mb-2">
                  {animatedStats.events}
                </div>
                <p className="text-gray-600">Eventos</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#BB4514]" />
                </div>
                <div className="text-3xl font-bold text-[#004A24] mb-2">
                  {animatedStats.participants}+
                </div>
                <p className="text-gray-600">Participantes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Objetivos */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Objetivos</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((objective, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-[#BB4514]/10 rounded-full flex items-center justify-center mb-4">
                  {objective.icon}
                </div>
                <h3 className="font-bold text-[#004A24] mb-3">{objective.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{objective.description}</p>
                <ul className="space-y-2">
                  {objective.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-[#121A0F]">
                      <div className="w-2 h-2 bg-[#BB4514] rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Metodologia */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Metodologia</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-lg text-[#121A0F] leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              Utilizamos uma metodologia interdisciplinar que integra pesquisas de campo, entrevistas, registros audiovisuais e análise de
              dados geográficos. Acreditamos que esta é a forma mais eficiente de mapear manifestações culturais e artísticas que têm a
              capacidade de resgatar memórias, tradições e identidades dos territórios e comunidades que habitam essa região.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodologySteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#BB4514] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-[#004A24] mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Justificativa */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Justificativa</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Texto */}
              <div className="p-8 lg:p-12">
                <div className="space-y-6">
                  <p className="text-lg text-[#121A0F] leading-relaxed">
                    A Bacia do Rio Doce é um território marcado por ricas diversidades cultural e socioambiental. Este contexto de integrações da
                    diversidade. Este projeto visa construir uma memória viva e crítica das lutas e das resistências empreendidas na região.
                  </p>
                  
                  <div className="border-l-4 border-[#BB4514] pl-6 bg-[#FFF8F1] p-6 rounded-r-lg">
                    <p className="text-lg text-[#121A0F] leading-relaxed font-medium">
                      Núcleo destes lugares para a construção de narrativas críticas, contribuindo para a valorização e preservação do patrimônio cultural da
                      região é necessário.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#BB4514] rounded-full"></div>
                      <span className="text-sm font-medium text-[#004A24]">Preservação Cultural</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#004A24] rounded-full"></div>
                      <span className="text-sm font-medium text-[#004A24]">Memória Viva</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#E8F5E9] rounded-full border border-[#004A24]"></div>
                      <span className="text-sm font-medium text-[#004A24]">Resistência</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Imagem */}
              <div className="relative h-64 lg:h-full min-h-[400px]">
                <img
                  src={bottomImage}
                  alt="Paisagem da Bacia do Rio Doce - Território de diversidades culturais e socioambientais"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm text-[#004A24] font-medium text-center">
                      Território de diversidades culturais e socioambientais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cards de destaque */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#004A24] text-white p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-3 text-lg">Território Rico</h4>
              <p className="text-sm opacity-90">Diversidades cultural e socioambiental</p>
            </div>
            
            <div className="bg-[#BB4514] text-white p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-3 text-lg">Memória Viva</h4>
              <p className="text-sm opacity-90">Construção de narrativas críticas</p>
            </div>
            
            <div className="bg-[#E8F5E9] text-[#004A24] p-6 rounded-2xl text-center border-2 border-[#004A24] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#004A24]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-3 text-lg">Preservação</h4>
              <p className="text-sm opacity-90">Patrimônio cultural da região</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;