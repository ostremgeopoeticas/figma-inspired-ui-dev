import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute check:', { user: user?.email, loading });
    
    // Aguardar o carregamento da autenticação
    if (loading) {
      console.log('Auth still loading, waiting...');
      return;
    }
    
    // Se não tiver usuário, redirecionar para login
    if (!user || typeof user !== 'object' || !user.email) {
      console.log('No valid user, redirecting to login page');
      navigate('/admin/login');
      return;
    }
    
    // Se tiver usuário, verificar se é admin
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map((e: string) => e.trim()) || [];
    const isAdminUser = adminEmails.includes(user.email);
    console.log('ProtectedRoute - User email:', user.email, 'Is admin:', isAdminUser);
    
    if (!isAdminUser) {
      console.log('User is not admin, redirecting to login page');
      navigate('/admin/login');
      return;
    }
  }, [user, loading, navigate]);

  // Se estiver carregando, mostrar spinner
  if (loading) {
    console.log('ProtectedRoute: Loading');
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB4514]"></div>
      </div>
    );
  }

  // Se tiver usuário e for admin, renderizar children
  if (user && typeof user === 'object' && user.email) {
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map((e: string) => e.trim()) || [];
    const isAdminUser = adminEmails.includes(user.email);
    
    if (isAdminUser) {
      console.log('ProtectedRoute: Rendering children');
      return <>{children}</>;
    }
  }

  // Caso contrário, não renderizar nada (o useEffect cuidará do redirecionamento)
  console.log('ProtectedRoute: Not admin or invalid user, rendering null');
  return null;
};

export default ProtectedRoute;