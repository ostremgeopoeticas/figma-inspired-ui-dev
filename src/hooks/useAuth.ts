import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar a sessão atual
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        // Verificar se é admin
        if (currentUser) {
          const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map((email: string) => email.trim()) || [];
          const isAdminUser = adminEmails.includes(currentUser.email);
          setIsAdmin(isAdminUser);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Escutar mudanças na autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        // Verificar se é admin
        if (currentUser) {
          const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map((email: string) => email.trim()) || [];
          const isAdminUser = adminEmails.includes(currentUser.email);
          setIsAdmin(isAdminUser);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      console.log('Login successful:', email);
      
      // Atualizar o estado do usuário
      setUser(data.user);
      console.log('useAuth - User state updated:', data.user?.email);
      
      // Verificar se é admin e atualizar o estado
      const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map((e: string) => e.trim()) || [];
      const isAdminUser = adminEmails.includes(email);
      setIsAdmin(isAdminUser);
      console.log('useAuth - Admin state updated:', isAdminUser);
      
      return { 
        user: data.user, 
        error: null 
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return { user: null, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      console.log('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { user, isAdmin, loading, login, logout };
};