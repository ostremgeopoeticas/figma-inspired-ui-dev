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
   NOW()),
   
  ('Oficinas de arte e cultura reúnem comunidades na Bacia do Rio Doce',
   '<p>O projeto ''Os Trem'' promove oficinas de arte e cultura em diversas localidades da Bacia do Rio Doce, incentivando a participação comunitária e o intercâmbio de saberes.</p><p>As oficinas têm como objetivo fortalecer os laços comunitários e valorizar as tradições locais através da expressão artística.</p>',
   'O projeto ''Os Trem'' promove oficinas de arte e cultura em diversas localidades da Bacia do Rio Doce, incentivando a participação comunitária e o intercâmbio de saberes.',
   'Comunidade',
   'Equipe Os Trem',
   'https://api.builder.io/api/v1/image/assets/TEMP/c3a85269022b6cd0107ed67917144dfbac28d5d0?width=584',
   true,
   NOW());