import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { user, error: loginError } = await login(email, password);

      if (loginError) {
        throw new Error(loginError);
      }

      if (!user) {
        throw new Error('Falha no login');
      }

      // Verificar se o usuário é admin
      const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map((e: string) => e.trim()) || [];
      if (!adminEmails.includes(email)) {
        // Fazer logout se não for admin
        await supabase.auth.signOut();
        throw new Error('Acesso negado. Você não tem permissão de administrador.');
      }

      // Redirecionar para o painel de administração
      navigate('/admin/blog');
    } catch (err: any) {
      console.error('Error logging in:', err);
      setError(err.message || 'Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F1] to-[#E8F5E9] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#004A24] py-6 px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Administração</h1>
          <p className="text-[#E8F5E9] mt-2">Painel de controle do blog</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-[#121A0F] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-[#121A0F] mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#BB4514] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB4514] focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#BB4514] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#A03D12] transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;