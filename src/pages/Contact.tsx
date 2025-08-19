import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import contactBanner from '@/assets/banner_contato_page.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    poeticSubmission: ''
  });
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
      details: [
        { label: "Coordenação do projeto:", email: "ostrem@geometrias.com.br" },
        { label: "Para contato:", email: "ola.geometrias@gmail.com" }
      ]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      details: [
        { label: "Região de atuação:", value: "Bacia do Rio Doce" }
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://www.instagram.com/ostremgeopoeticas/',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: '#',
      color: 'bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: '#',
      color: 'bg-blue-400'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-5 h-5" />,
      url: '#',
      color: 'bg-red-600'
    }
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[200px] md:h-[300px] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${contactBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#F6D8B8] text-3xl md:text-5xl font-bold">Contato</h1>
            <p className="text-[#E8F5E9] mt-2 text-lg">Entre em contato conosco</p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Informações de Contato e Formulário */}
          <div>
            {/* Informações de Contato */}
            <section className="mb-10 md:mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Informações de Contato
              </motion.h2>
              
              <div className="space-y-6 md:space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-5 md:p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-[#BB4514] p-2 rounded-lg text-white">
                        {info.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#004A24] ml-3">{info.title}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {info.details.map((detail, detailIndex) => (
                        <div key={detailIndex}>
                          {detail.email ? (
                            <div>
                              <p className="text-[#121A0F] font-medium text-sm md:text-base">{detail.label}</p>
                              <a 
                                href={`mailto:${detail.email}`} 
                                className="text-[#BB4514] hover:text-[#A03D12] transition-colors text-sm md:text-base flex items-center mt-1"
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                {detail.email}
                              </a>
                            </div>
                          ) : (
                            <p className="text-[#121A0F] text-sm md:text-base">
                              <span className="font-medium">{detail.label}</span> {detail.value}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Redes Sociais */}
            <section className="mb-10 md:mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6 md:mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Siga-nos nas Redes Sociais
              </motion.h2>
              
              <motion.div 
                className="flex justify-center gap-4 md:gap-6 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg`}
                    aria-label={`Siga-nos no ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </section>
          </div>

          {/* Formulário de Contato */}
          <div>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-5 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-6">Envie-nos uma mensagem</h2>
                
                {submitSuccess && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                    <p>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
                  </div>
                )}
                
                {submitError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                    <p>{submitError}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#004A24] mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#004A24] mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#004A24] mb-2">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Digite sua mensagem aqui..."
                        className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all resize-none"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#BB4514] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#A03D12] transition-all flex items-center justify-center disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          </div>
        </div>

        {/* Envie sua Poética */}
        <motion.section 
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-5 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#004A24] mb-4 md:mb-6">Envie sua Poética - Projeto Os Trem</h2>
            
            <div className="prose max-w-none mb-6">
              <p className="text-[#121A0F] mb-4 leading-relaxed">
                <strong>"Os Trem: Geopoéticas da Bacia do Rio Doce"</strong> busca reunir e divulgar as expressões artísticas e culturais da região. 
                Sua história, suas memórias e as suas manifestações podem contribuir para mapear e celebrar a diversidade cultural da Bacia do Rio Doce.
              </p>
              
              <p className="text-[#121A0F] mb-4 leading-relaxed">
                Envie aqui sua poética para que ela possa fazer parte das manifestações culturais e artísticas do projeto e dos dados da geografia poética.
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="poeticSubmission" className="block text-sm font-medium text-[#004A24] mb-2">
                Sua contribuição poética
              </label>
              <textarea
                id="poeticSubmission"
                name="poeticSubmission"
                value={formData.poeticSubmission}
                onChange={handleInputChange}
                rows={6}
                placeholder="Compartilhe suas expressões artísticas, memórias ou manifestações culturais relacionadas à Bacia do Rio Doce..."
                className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all resize-none"
                disabled={isSubmitting}
              />
            </div>

            <div className="bg-[#E8F5E9] rounded-lg p-4 mb-6">
              <p className="text-sm text-[#004A24] mb-2">
                <strong>Ao enviar sua contribuição, você estará ajudando a construir uma memória coletiva e a valorizar as manifestações culturais da Bacia do Rio Doce.</strong>
              </p>
              <p className="text-xs text-[#004A24]">
                Esperamos contribuições artísticas, poéticas, literárias ou qualquer outra forma de expressão cultural que dialogue com o território.
              </p>
            </div>

            <div className="bg-[#FFF8F1] border-l-4 border-[#BB4514] p-4 mb-6 rounded">
              <p className="text-sm text-[#121A0F]">
                <strong>Para enviar conteúdo multimídia (imagens, áudios ou vídeos), entre em contato conosco pelos e-mails informados acima.</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={handlePoeticSubmission}
              disabled={isSubmitting}
              className="w-full md:w-auto bg-[#004A24] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005a2d] transition-all flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Envie sua poética
                </>
              )}
            </button>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;