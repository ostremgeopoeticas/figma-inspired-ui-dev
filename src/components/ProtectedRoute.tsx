import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticação e permissões
    if (!loading) {
      // Se não houver usuário ou não for admin, redirecionar para a página de login
      if (!user || !isAdmin) {
        navigate('/admin/login');
      }
    }
  }, [user, isAdmin, loading, navigate]);

  // Mostrar spinner enquanto carrega
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB4514]"></div>
      </div>
    );
  }

  // Renderizar children se for admin
  if (user && isAdmin) {
    return <>{children}</>;
  }

  // Se não for admin, não renderizar nada (o useEffect cuidará do redirecionamento)
  return null;
};

export default ProtectedRoute;