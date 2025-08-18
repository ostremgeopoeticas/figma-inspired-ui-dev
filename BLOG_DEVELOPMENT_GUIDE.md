# Guia de Desenvolvimento do Blog

## Estrutura do Projeto

```
src/
├── components/
│   ├── BlogCard.tsx
│   └── ...
├── hooks/
│   └── useAuth.ts
├── lib/
│   └── supabase.ts
├── pages/
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   ├── AdminBlog.tsx
│   └── AdminLogin.tsx
├── services/
│   └── blogService.ts
└── types/
    └── supabase.ts
```

## Componentes Principais

### BlogCard
Componente responsável por exibir um post do blog em formato de cartão.

### Blog
Página principal do blog que lista todos os posts publicados.

### BlogPost
Página individual de um post do blog.

### AdminBlog
Painel de administração para gerenciar posts do blog.

### AdminLogin
Página de login para o painel de administração.

## Serviços

### blogService.ts
Serviço que encapsula as operações com o Supabase para o blog:
- `getBlogPosts()` - Obtém todos os posts publicados
- `getBlogPostById(id)` - Obtém um post específico pelo ID
- `getBlogPostsByCategory(category)` - Obtém posts por categoria
- `getBlogCategories()` - Obtém todas as categorias

### supabase.ts
Cliente do Supabase configurado com as variáveis de ambiente.

## Hooks

### useAuth.ts
Hook personalizado para gerenciar o estado de autenticação.

## Tipos

### supabase.ts
Definições de tipos para as tabelas do Supabase:
- `BlogPost`
- `BlogCategory`

## Fluxo de Trabalho

### Para usuários finais:
1. Acessar `/blog` para ver a lista de posts
2. Clicar em um post para ver a página individual

### Para administradores:
1. Acessar `/admin/login` para fazer login
2. Após autenticação, será redirecionado para `/admin/blog`
3. No painel de administração, é possível:
   - Criar novos posts
   - Editar posts existentes
   - Excluir posts
   - Gerenciar categorias

## Políticas de Segurança (RLS)

As seguintes políticas estão configuradas no Supabase:

1. Leitura pública de posts publicados
2. Acesso completo para administradores

## Variáveis de Ambiente Necessárias

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAILS=admin@example.com,admin2@example.com
```

## Desenvolvimento Local

1. Certifique-se de ter o Supabase configurado
2. Copie `.env.example` para `.env` e preencha as variáveis
3. Execute `npm run dev` para iniciar o servidor de desenvolvimento

## Deploy

Ao fazer deploy, certifique-se de:
1. Configurar as variáveis de ambiente no serviço de hospedagem
2. Executar as migrações no banco de dados do Supabase