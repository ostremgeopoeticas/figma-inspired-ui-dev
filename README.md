# Projeto Os Trem

## Informações do Projeto

Projeto cultural que explora as expressões artísticas e culturais da Bacia do Rio Doce.

## Como editar este código?

Existem várias formas de editar esta aplicação.

**Usando Lovable**

Visite o [Projeto Lovable](https://lovable.dev/projects/73931ecf-1c63-4923-bc5d-291bc30397c5) e comece a fazer prompts.

Mudanças feitas via Lovable serão automaticamente commitadas para este repositório.

**Usando sua IDE preferida**

Se quiser trabalhar localmente usando sua própria IDE, você pode clonar este repositório e fazer push das mudanças. Mudanças pushadas também serão refletidas no Lovable.

O único requisito é ter o Node.js & npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone <SUA_GIT_URL>

# Passo 2: Navegue até o diretório do projeto.
cd <NOME_DO_SEU_PROJETO>

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com auto-reload e preview instantâneo.
npm run dev
```

**Editar um arquivo diretamente no GitHub**

- Navegue até o arquivo desejado.
- Clique no botão "Edit" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça suas mudanças e commite as alterações.

**Usar GitHub Codespaces**

- Navegue até a página principal do seu repositório.
- Clique no botão "Code" (botão verde) próximo ao canto superior direito.
- Selecione a aba "Codespaces".
- Clique em "New codespace" para lançar um novo ambiente Codespace.
- Edite os arquivos diretamente no Codespace e commite e faça push das suas mudanças quando terminar.

## Quais tecnologias são usadas neste projeto?

Este projeto é construído com:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion (para animações)

## Como posso implantar este projeto?

### Implantando na Netlify

1. Faça login na sua conta Netlify
2. Clique em "New site from Git"
3. Conecte seu repositório GitHub
4. Selecione este repositório
5. Configure as seguintes opções:
   - Branch to deploy: `main` (ou a branch que você deseja implantar)
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Clique em "Deploy site"

O arquivo `netlify.toml` já está configurado com as opções necessárias para o deploy.

### Implantando via Lovable

Alternativamente, você pode simplesmente abrir [Lovable](https://lovable.dev/projects/73931ecf-1c63-4923-bc5d-291bc30397c5) e clicar em Share -> Publish.

## Como configurar o Supabase para o blog

### Passo 1: Criar um projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Dê um nome ao projeto (ex: "os-trem")
5. Selecione a região mais próxima
6. Defina uma senha segura para o banco de dados
7. Clique em "Create Project"

### Passo 2: Configurar variáveis de ambiente

Após criar o projeto, você receberá as credenciais de acesso. Adicione as seguintes variáveis ao seu arquivo `.env`:

```
VITE_SUPABASE_URL=seu_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
VITE_ADMIN_EMAILS=seu_email@example.com,outro_admin@example.com
```

### Passo 3: Criar tabelas no Supabase

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

### Passo 4: Inserir dados de exemplo

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

### Passo 5: Configurar autenticação

1. Vá para "Authentication" > "Users"
2. Crie um novo usuário com um email que esteja na lista de `VITE_ADMIN_EMAILS`
3. Este usuário terá acesso ao painel de administração

### Passo 6: Configurar políticas de segurança

Para permitir leitura pública dos posts publicados, adicione a seguinte política à tabela `blog_posts`:

```sql
-- Política para leitura pública de posts publicados
CREATE POLICY "Leitura pública de posts publicados" ON blog_posts
FOR SELECT USING (published = true);

-- Aplicar a política
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
```

Para permitir acesso de administradores ao painel, configure as políticas apropriadas no Supabase.

## Posso conectar um domínio personalizado ao meu projeto Lovable?

Sim, você pode!

Para conectar um domínio, navegue até Project > Settings > Domains e clique Connect Domain.

Leia mais aqui: [Configurando um domínio personalizado](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)