import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Users, Clock, Instagram, Youtube, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import eventsBanner from '@/assets/banner_eventos_page.png';

const Events = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const upcomingEvents = [
    {
      id: 1,
      title: "Encontro 'Geopoéticas em Movimento'",
      date: "6 a 8 de Janeiro de 2025",
      description: "Participe do nosso próximo encontro onde exploraremos as conexões entre arte, geografia e memória na Bacia do Rio Doce. Programação completa disponível no Instagram @ostremgeopoeticas",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Bacia do Rio Doce",
      type: "Oficinas e Mesas-redondas"
    },
    {
      id: 2,
      title: "1º Encontro - Ipatinga e Coronel Fabriciano",
      date: "7 a 9 de outubro de 2024",
      description: "Oficinas, mesas-redondas, performances e rodas de conversa reuniram artistas, pesquisadores e comunidades locais para refletir sobre geopoética, corpo-território, ancestralidade e saberes compartilhados. Programação completa disponível no Instagram @ostremgeopoeticas",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Ipatinga e Coronel Fabriciano",
      type: "Encontro Cultural"
    },
    {
      id: 3,
      title: "Encontro - Ipatinga e Fabriciano",
      date: "Outubro de 2024",
      description: "Mesas-redondas, performances e rodas de conversa reuniram artistas, pesquisadores e comunidades locais para refletir sobre geopoética, corpo-território, ancestralidade e saberes compartilhados.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Bacia do Rio Doce",
      type: "Encontro Cultural"
    }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Fotografias das oficinas, rodas de conversa, exposições e encontros afetivos",
      description: "Fotografias das oficinas, rodas de conversa, exposições e encontros afetivos"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Videos curtos com depoimentos e trechos das atividades",
      description: "Videos curtos com depoimentos e trechos das atividades"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Trechos de falas e apresentações artisticas",
      description: "Trechos de falas e apresentações artisticas"
    }
  ];

  const nextEvent = {
    title: "Encontro 'Geopoéticas em Movimento'",
    description: "Participe do nosso próximo encontro, onde exploraremos as conexões entre arte, geografia e memória na Bacia do Rio Doce. O evento incluirá oficinas e mesas-redondas com artistas e pesquisadores, promovendo reflexões sobre território, corpo, arte e ancestralidade.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  };

  const nextEventIndex = () => {
    setCurrentEventIndex((prev) => (prev + 1) % upcomingEvents.length);
  };

  const prevEventIndex = () => {
    setCurrentEventIndex((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#BB4514]/90 to-[#8B4513]/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#BB4514]/20 to-[#8B4513]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#F6D8B8] text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
              Encontros e Eventos
            </h1>
            <p className="text-[#E8F5E9] mt-4 text-lg max-w-2xl mx-auto">
              O projeto "Os Trem" promove ações culturais que articulam território, arte, memória e resistência. 
              Aqui você pode acompanhar os encontros já realizados e os registros das atividades vividas na Bacia do Rio Doce.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* Próximo Evento - Carousel */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-8">Próximo Evento</h2>
          <div className="relative">
            <div className="flex overflow-hidden rounded-2xl shadow-2xl">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`flex-shrink-0 w-full transition-transform duration-500 ease-in-out ${
                    index === currentEventIndex ? 'translate-x-0' : 'translate-x-full'
                  }`}
                  style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>
                    <div className="lg:w-1/2 bg-white p-6 lg:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-[#BB4514]" />
                        <span className="text-sm font-medium text-[#BB4514]">{event.date}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#004A24] mb-4">{event.title}</h3>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{event.type}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
                      <div className="flex items-center gap-2 text-[#BB4514] font-medium">
                        <Instagram className="w-4 h-4" />
                        <span>@ostremgeopoeticas</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevEventIndex}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-[#004A24]" />
            </button>
            <button
              onClick={nextEventIndex}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-[#004A24]" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 gap-2">
              {upcomingEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentEventIndex ? 'bg-[#BB4514]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Programação */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-8">Programação</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-[#BB4514] mx-auto mb-4" />
              <p className="text-lg text-gray-700">
                Em breve: novas datas e localidades das próximas ações do projeto.
              </p>
            </div>
          </div>
        </section>

        {/* Galeria de Registros */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-8">Galeria de Registros</h2>
          <p className="text-gray-700 mb-8">Confira alguns momentos do encontro:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {galleryImages.map((image) => (
              <div key={image.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Acesse mais registros em nossas redes:
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://instagram.com/ostremgeopoeticas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#BB4514] text-white px-6 py-3 rounded-lg hover:bg-[#A03D12] transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span>YouTube (em breve)</span>
              </a>
            </div>
          </div>
        </section>

        {/* Próximos Encontros */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-6 h-6 text-[#BB4514]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#004A24]">Próximos encontros</h2>
                </div>
                <h3 className="text-xl font-bold text-[#004A24] mb-4">{nextEvent.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {nextEvent.description}
                </p>
                <button className="bg-[#BB4514] text-white px-6 py-3 rounded-lg hover:bg-[#A03D12] transition-colors flex items-center gap-2">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="lg:w-1/3">
                <img
                  src={nextEvent.image}
                  alt="Próximos encontros"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-[#BB4514]" />
              </div>
              <h3 className="text-2xl font-bold text-[#004A24] mb-2">3</h3>
              <p className="text-gray-600">Encontros Realizados</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-[#BB4514]" />
              </div>
              <h3 className="text-2xl font-bold text-[#004A24] mb-2">500+</h3>
              <p className="text-gray-600">Participantes</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#BB4514]" />
              </div>
              <h3 className="text-2xl font-bold text-[#004A24] mb-2">15</h3>
              <p className="text-gray-600">Municípios Atendidos</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#BB4514]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[#BB4514]" />
              </div>
              <h3 className="text-2xl font-bold text-[#004A24] mb-2">2025</h3>
              <p className="text-gray-600">Próximo Encontro</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Events;