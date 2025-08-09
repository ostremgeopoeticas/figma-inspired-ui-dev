import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    poeticSubmission: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Facebook', color: 'bg-blue-600' },
    { name: 'Twitter', color: 'bg-blue-400' },
    { name: 'YouTube', color: 'bg-red-600' }
  ];

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[300px] relative bg-gradient-to-r from-[#BB4514] to-[#D4561A] overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b40096a763428a08b2da23b86127f33486875a6a?width=2560"
          alt="Banner contato"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#F6D8B8] text-5xl font-bold text-center">Contato</h1>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto px-8 py-12">
        {/* Formulário de Contato */}
        <section className="mb-16">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#004A24] mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514]"
                  required
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
                  className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514]"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
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
                className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] resize-vertical"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#BB4514] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#A03D12] transition-colors"
            >
              Enviar
            </button>
          </form>
        </section>

        {/* Social Media */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#004A24] mb-6 text-center">Social Media</h2>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-full ${social.color} flex items-center justify-center text-white font-bold hover:scale-110 transition-transform`}
              >
                {social.name.charAt(0)}
              </button>
            ))}
          </div>
        </section>

        {/* Email */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-[#004A24] mb-4">E-mails</h2>
          <div className="space-y-2">
            <p className="text-[#121A0F]">
              <span className="font-medium">Coordenação do projeto:</span>
              <br />
              <a href="mailto:ostrem@geometrias.com.br" className="text-[#BB4514] hover:underline">
                ostrem@geometrias.com.br
              </a>
            </p>
            <p className="text-[#121A0F]">
              <span className="font-medium">Para contato:</span>
              <br />
              <a href="mailto:ola.geometrias@gmail.com" className="text-[#BB4514] hover:underline">
                ola.geometrias@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* Envie sua Poética */}
        <section>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#004A24] mb-4">Envie sua Poética - Projeto Os Trem</h2>
            <p className="text-[#121A0F] mb-6 leading-relaxed">
              "Os Trem: Geopoéticas da Bacia do Rio Doce" busca reunir e divulgar as expressões artísticas e culturais da região. Sua história, 
              suas memórias e as suas manifestações podem contribuir para mapear e celebrar a diversidade cultural da Bacia do Rio Doce. 
              Envie aqui sua poética para que ela possa fazer parte das manifestações culturais e artísticas do projeto e dos dados da geografia poética.
            </p>
            
            <div className="mb-6">
              <label htmlFor="poeticSubmission" className="block text-sm font-medium text-[#004A24] mb-2">
                Sua contribuição poética (opcional)
              </label>
              <textarea
                id="poeticSubmission"
                name="poeticSubmission"
                value={formData.poeticSubmission}
                onChange={handleInputChange}
                rows={8}
                placeholder="Compartilhe suas expressões artísticas, memórias ou manifestações culturais relacionadas à Bacia do Rio Doce..."
                className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] resize-vertical"
              />
            </div>

            <p className="text-sm text-[#121A0F] mb-4">
              Ao enviar sua contribuição, você estará ajudando a construir uma memória coletiva e a valorizar as manifestações 
              culturais da Bacia do Rio Doce. Esperamos contribuições artísticas, poéticas, literárias ou qualquer outra forma 
              de expressão cultural que dialogue com o território.
            </p>

            <p className="text-sm text-[#121A0F] mb-6">
              Para enviar conteúdo multimídia (imagens, áudios ou vídeos), entre em contato conosco pelos e-mails informados acima.
            </p>

            <button
              type="button"
              onClick={() => {
                // Handle poetic submission
                console.log('Poetic submission:', formData.poeticSubmission);
              }}
              className="bg-[#004A24] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#005a2d] transition-colors"
            >
              Envie sua poética
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;