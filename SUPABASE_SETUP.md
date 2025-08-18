# Configuração do Supabase para o Projeto Os Trem

## Passo 1: Criar um projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Dê um nome ao projeto (ex: "os-trem")
5. Selecione a região mais próxima
6. Defina uma senha segura para o banco de dados
7. Clique em "Create Project"

## Passo 2: Configurar variáveis de ambiente

Após criar o projeto, você receberá as credenciais de acesso. Adicione as seguintes variáveis ao seu arquivo `.env`:

```
VITE_SUPABASE_URL=seu_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
VITE_ADMIN_EMAILS=seu_email@example.com,outro_admin@example.com
```

## Passo 3: Criar tabelas no Supabase

1. No painel do Supabase, vá para "Table Editor"
2. Clique em "New Table" e crie as tabelas conforme o arquivo `SUPABASE_SCHEMA.sql`
3. Ou execute o SQL diretamente no "SQL Editor":

```sql
-- Criar tabela de categorias do blog
CREATE TABLE blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de posts do blog
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(100) REFERENCES blog_categories(name),
  author VARCHAR(100) NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE
);
```

## Passo 4: Inserir dados de exemplo

Insira algumas categorias e posts de exemplo:

```sql
-- Inserir categorias de exemplo
INSERT INTO blog_categories (name, description) VALUES
  ('Arte', 'Posts relacionados a artes visuais, música, teatro, etc.'),
  ('Comunidade', 'Posts sobre eventos comunitários e interações sociais'),
  ('Relatos', 'Relatos pessoais e histórias da comunidade'),
  ('Memória', 'Posts sobre memória, história e tradições'),
  ('Geografia', 'Posts sobre geografia, território e paisagem'),
  ('Artigos', 'Artigos acadêmicos e ensaios');

-- Inserir posts de exemplo
INSERT INTO blog_posts (title, content, excerpt, category, author, image_url, published, published_at) VALUES
  ('Exposição ''Cores da Bacia'' celebra a diversidade artística da região', 
   '<p>Artistas locais apresentam obras inspiradas na paisagem e cultura da Bacia do Rio Doce, explorando temas como memória, identidade e sustentabilidade.</p><p>A exposição reúne trabalhos de diversos artistas da região, cada um trazendo sua perspectiva única sobre a riqueza cultural e natural da Bacia do Rio Doce.</p>',
   'Artistas locais apresentam obras inspiradas na paisagem e cultura da Bacia do Rio Doce, explorando temas como memória, identidade e sustentabilidade.',
   'Arte', 
   'Equipe Os Trem', 
   'https://api.builder.io/api/v1/image/assets/TEMP/4c9422a2946eff001efabe78043b6c7bd4a57ae1?width=584',
   true,
   NOW());
```

## Passo 5: Configurar autenticação

1. Vá para "Authentication" > "Users"
2. Crie um novo usuário com um email que esteja na lista de `VITE_ADMIN_EMAILS`
3. Este usuário terá acesso ao painel de administração

## Passo 6: Configurar políticas de segurança

Para permitir leitura pública dos posts publicados, adicione a seguinte política à tabela `blog_posts`:

```sql
-- Política para leitura pública de posts publicados
CREATE POLICY "Leitura pública de posts publicados" ON blog_posts
FOR SELECT USING (published = true);

-- Aplicar a política
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
```

Para permitir acesso de administradores ao painel, configure as políticas apropriadas no Supabase.