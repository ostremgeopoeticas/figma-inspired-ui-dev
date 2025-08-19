import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Send, Mail, MapPin, Phone, Instagram, Facebook, Twitter, Youtube, MessageCircle, Users, Globe, Heart } from 'lucide-react';
import contactBanner from '@/assets/banner_contato_page.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    poeticSubmission: ''
  });
  const [activeTab, setActiveTab] = useState('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Em um ambiente real, você enviaria os dados para um backend aqui
      console.log('Form submitted:', formData);
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        poeticSubmission: ''
      });
    } catch (error) {
      setSubmitError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePoeticSubmission = async () => {
    if (!formData.poeticSubmission.trim()) {
      setSubmitError('Por favor, escreva algo antes de enviar.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Simular envio da contribuição poética
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Poetic submission:', formData.poeticSubmission);
      
      setSubmitSuccess(true);
      setFormData(prev => ({
        ...prev,
        poeticSubmission: ''
      }));
    } catch (error) {
      setSubmitError('Ocorreu um erro ao enviar sua contribuição. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "E-mails",
      color: "bg-blue-500",
      details: [
        { label: "Coordenação do projeto:", email: "ostrem@geometrias.com.br" },
        { label: "Para contato:", email: "ola.geometrias@gmail.com" }
      ]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      color: "bg-green-500",
      details: [
        { label: "Região de atuação:", value: "Bacia do Rio Doce" }
      ]
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Redes Sociais",
      color: "bg-purple-500",
      details: [
        { label: "Instagram:", value: "@ostremgeopoeticas" },
        { label: "YouTube:", value: "Em breve" }
      ]
    }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/ostremgeopoeticas",
      icon: <Instagram className="w-6 h-6" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      name: "YouTube",
      url: "#",
      icon: <Youtube className="w-6 h-6" />,
      color: "bg-gradient-to-r from-red-500 to-red-600"
    }
  ];

  const quickActions = [
    {
      title: "Contribuir com Poesia",
      description: "Envie sua poética para o acervo digital",
      icon: <Heart className="w-8 h-8" />,
      action: () => setActiveTab('poetry'),
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Participar de Eventos",
      description: "Fique por dentro dos próximos encontros",
      icon: <Users className="w-8 h-8" />,
      action: () => window.location.href = '/eventos',
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Conhecer o Projeto",
      description: "Saiba mais sobre nossa iniciativa",
      icon: <Globe className="w-8 h-8" />,
      action: () => window.location.href = '/sobre',
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${contactBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#BB4514]/80 to-[#8B4513]/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#BB4514]/20 to-[#8B4513]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#F6D8B8] text-4xl md:text-6xl font-bold text-center drop-shadow-lg mb-4">
              Entre em Contato
            </h1>
            <p className="text-[#E8F5E9] text-lg md:text-xl max-w-3xl mx-auto px-4">
              Conecte-se conosco e faça parte do projeto Os Trem
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Dúvidas</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Colaborações</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#F6D8B8] text-sm font-medium">Poéticas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* Quick Actions */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Como Você Pode Participar</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={action.action}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-[#004A24] mb-3 text-center">{action.title}</h3>
                <p className="text-gray-600 text-center mb-6">{action.description}</p>
                <div className="text-center">
                  <span className="text-[#BB4514] font-medium hover:text-[#A03D12] transition-colors">
                    Saiba mais →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Forms */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Fale Conosco</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-2">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === 'contact'
                      ? 'bg-[#BB4514] text-white shadow-lg'
                      : 'text-gray-600 hover:text-[#BB4514]'
                  }`}
                >
                  Contato Geral
                </button>
                <button
                  onClick={() => setActiveTab('poetry')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === 'poetry'
                      ? 'bg-[#BB4514] text-white shadow-lg'
                      : 'text-gray-600 hover:text-[#BB4514]'
                  }`}
                >
                  Contribuir com Poesia
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {activeTab === 'contact' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                      placeholder="Assunto da mensagem"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#BB4514] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#A03D12] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Heart className="w-12 h-12 text-[#BB4514] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#004A24] mb-2">Contribua com sua Poética</h3>
                    <p className="text-gray-600">
                      Compartilhe sua poesia, memória ou reflexão sobre a Bacia do Rio Doce
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="poeticSubmission" className="block text-sm font-medium text-gray-700 mb-2">
                      Sua Contribuição Poética *
                    </label>
                    <textarea
                      id="poeticSubmission"
                      name="poeticSubmission"
                      value={formData.poeticSubmission}
                      onChange={handleInputChange}
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all resize-none"
                      placeholder="Escreva sua poesia, memória ou reflexão sobre a Bacia do Rio Doce..."
                    />
                  </div>
                  
                  <button
                    onClick={handlePoeticSubmission}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        Enviar Contribuição
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {/* Success/Error Messages */}
              {submitSuccess && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    {activeTab === 'contact' ? 'Mensagem enviada com sucesso!' : 'Contribuição enviada com sucesso!'}
                  </p>
                </div>
              )}
              
              {submitError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">{submitError}</p>
                </div>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#004A24] mb-6">Informações de Contato</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#004A24] mb-2">{info.title}</h4>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="text-gray-600">
                              <span className="font-medium">{detail.label}</span>
                              {detail.email && (
                                <a
                                  href={`mailto:${detail.email}`}
                                  className="text-[#BB4514] hover:text-[#A03D12] transition-colors ml-1"
                                >
                                  {detail.email}
                                </a>
                              )}
                              {detail.value && (
                                <span className="ml-1">{detail.value}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#004A24] mb-6">Redes Sociais</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3`}
                    >
                      {social.icon}
                      <span className="font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#004A24] mb-6">Nossa Região de Atuação</h2>
            <div className="w-24 h-1 bg-[#BB4514] mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#004A24] mb-4">Bacia do Rio Doce</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Nossa atuação se concentra na Bacia do Rio Doce, uma região rica em diversidade cultural e socioambiental. 
                  Trabalhamos com comunidades locais para mapear, preservar e celebrar as manifestações culturais da região.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#BB4514]" />
                    <span className="text-gray-700">229 municípios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#BB4514]" />
                    <span className="text-gray-700">Milhares de comunidades</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#BB4514]" />
                    <span className="text-gray-700">Rica diversidade cultural</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p>Mapa da Bacia do Rio Doce</p>
                  <p className="text-sm">Em breve: mapa interativo</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;