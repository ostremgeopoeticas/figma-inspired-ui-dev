import { supabase } from '@/lib/supabase';

// Função para verificar se o usuário está autenticado
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Função para fazer logout
export const logout = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    // Remover token do localStorage
    localStorage.removeItem('admin_token');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Função para verificar se o usuário é admin
export const isAdmin = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    // Verificar se o usuário tem o papel de admin
    // Isso pode ser feito verificando um campo customizado no usuário
    // ou verificando se o email está em uma lista de admins
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
    return adminEmails.includes(user.email);
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
};