import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostComponent from '@/components/BlogPost';
import { getBlogPostById, BlogPost } from '@/services/blogService';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const postId = Number(id);
        const postData = await getBlogPostById(postId);
        if (postData) {
          setPost(postData);
        } else {
          setError('Post não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
        <Header />
        <div className="flex-grow w-full flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BB4514]"></div>
            <p className="mt-4 text-[#121A0F]">Carregando post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-[#004A24] mb-4">Ops!</h1>
            <p className="text-[#121A0F] mb-6">{error || 'Post não encontrado'}</p>
            <Link 
              to="/blog" 
              className="inline-block bg-[#BB4514] text-[#F6D8B8] px-6 py-3 rounded-lg font-bold hover:bg-[#A03D12] transition-colors"
            >
              Voltar para o Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start min-h-screen bg-[#FFF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full h-[200px] md:h-[300px] relative bg-gradient-to-r from-[#4B5A43] to-[#6B7A63] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[#F6D8B8] text-2xl md:text-4xl font-bold text-center px-4">{post.title}</h1>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <BlogPostComponent {...post} />
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;