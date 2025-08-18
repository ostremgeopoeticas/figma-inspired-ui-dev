import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F1]">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#004A24]">404</h1>
          <p className="text-lg md:text-xl text-[#121A0F] mb-6">Oops! Página não encontrada</p>
          <p className="text-sm md:text-base text-[#121A0F] mb-8">
            A página que você está procurando pode ter sido removida, ter seu nome alterado ou estar temporariamente indisponível.
          </p>
          <a 
            href="/" 
            className="inline-block bg-[#BB4514] text-[#F6D8B8] px-6 py-3 rounded-lg font-bold hover:bg-[#A03D12] transition-colors"
          >
            Voltar para a página inicial
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
