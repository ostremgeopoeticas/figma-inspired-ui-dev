-- Criar tabela de regiões
CREATE TABLE IF NOT EXISTS regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de categorias das obras culturais
CREATE TABLE IF NOT EXISTS cultural_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de tipos de obras culturais
CREATE TABLE IF NOT EXISTS cultural_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category_id INTEGER REFERENCES cultural_categories(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de materiais
CREATE TABLE IF NOT EXISTS materials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de obras culturais
CREATE TABLE IF NOT EXISTS cultural_works (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  author VARCHAR(255) NOT NULL,
  region_id INTEGER REFERENCES regions(id),
  category_id INTEGER REFERENCES cultural_categories(id),
  type_id INTEGER REFERENCES cultural_types(id),
  material_ids INTEGER[], -- Array de IDs de materiais
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  image_urls TEXT[], -- Array de URLs de imagens
  contact_info JSONB, -- Informações de contato em formato JSON
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, pending
  submitted_by VARCHAR(255), -- Email ou nome de quem submeteu
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_by VARCHAR(255), -- Email do administrador que aprovou
  approval_date TIMESTAMP WITH TIME ZONE,
  tags TEXT[] -- Array de tags para busca
);

-- Criar índices para otimizar buscas
CREATE INDEX IF NOT EXISTS idx_cultural_works_location ON cultural_works USING GIST (ll_to_earth(latitude, longitude));
CREATE INDEX IF NOT EXISTS idx_cultural_works_region ON cultural_works(region_id);
CREATE INDEX IF NOT EXISTS idx_cultural_works_category ON cultural_works(category_id);
CREATE INDEX IF NOT EXISTS idx_cultural_works_type ON cultural_works(type_id);
CREATE INDEX IF NOT EXISTS idx_cultural_works_status ON cultural_works(status);
CREATE INDEX IF NOT EXISTS idx_cultural_works_tags ON cultural_works USING GIN(tags);

-- Inserir regiões da Bacia do Rio Doce
INSERT INTO regions (name, description) VALUES
  ('Alto Rio Doce', 'Região do alto curso do Rio Doce, incluindo nascentes'),
  ('Médio Rio Doce', 'Região do médio curso do Rio Doce'),
  ('Baixo Rio Doce', 'Região do baixo curso do Rio Doce, próximo ao litoral'),
  ('Vale do Aço', 'Região industrial do Vale do Aço'),
  ('Zona da Mata', 'Região da Zona da Mata Mineira'),
  ('Região Metropolitana de Belo Horizonte', 'Parte da RMBH que faz parte da bacia'),
  ('Outras', 'Outras regiões da bacia')
ON CONFLICT (name) DO NOTHING;

-- Inserir categorias de obras culturais
INSERT INTO cultural_categories (name, description) VALUES
  ('Artes Visuais', 'Pinturas, esculturas, instalações, grafites, murais'),
  ('Literatura', 'Poesias, contos, romances, crônicas, cordel'),
  ('Música', 'Composições, performances, instrumentos tradicionais'),
  ('Teatro e Performance', 'Peças teatrais, performances, teatro de rua'),
  ('Artesanato', 'Trabalhos manuais tradicionais e contemporâneos'),
  ('Patrimônio Cultural', 'Bens culturais, arquitetura, sítios históricos'),
  ('Manifestações Populares', 'Festas, rituais, tradições orais'),
  ('Arte Digital', 'Arte digital, videoarte, instalações multimídia')
ON CONFLICT (name) DO NOTHING;

-- Inserir tipos de obras culturais
INSERT INTO cultural_types (name, category_id, description) VALUES
  ('Pintura', (SELECT id FROM cultural_categories WHERE name = 'Artes Visuais'), 'Obras pictóricas'),
  ('Escultura', (SELECT id FROM cultural_categories WHERE name = 'Artes Visuais'), 'Obras escultóricas'),
  ('Mural', (SELECT id FROM cultural_categories WHERE name = 'Artes Visuais'), 'Arte mural e grafite'),
  ('Poesia', (SELECT id FROM cultural_categories WHERE name = 'Literatura'), 'Obras poéticas'),
  ('Prosa', (SELECT id FROM cultural_categories WHERE name = 'Literatura'), 'Contos, crônicas, romances'),
  ('Canção', (SELECT id FROM cultural_categories WHERE name = 'Música'), 'Composições musicais'),
  ('Instrumental', (SELECT id FROM cultural_categories WHERE name = 'Música'), 'Música instrumental'),
  ('Peça Teatral', (SELECT id FROM cultural_categories WHERE name = 'Teatro e Performance'), 'Obras teatrais'),
  ('Performance', (SELECT id FROM cultural_categories WHERE name = 'Teatro e Performance'), 'Arte performática'),
  ('Cerâmica', (SELECT id FROM cultural_categories WHERE name = 'Artesanato'), 'Trabalhos em cerâmica'),
  ('Tecelagem', (SELECT id FROM cultural_categories WHERE name = 'Artesanato'), 'Trabalhos têxteis'),
  ('Edificação', (SELECT id FROM cultural_categories WHERE name = 'Patrimônio Cultural'), 'Arquitetura histórica'),
  ('Festa Popular', (SELECT id FROM cultural_categories WHERE name = 'Manifestações Populares'), 'Festivais e celebrações'),
  ('Videoarte', (SELECT id FROM cultural_categories WHERE name = 'Arte Digital'), 'Arte em vídeo'),
  ('Instalação Digital', (SELECT id FROM cultural_categories WHERE name = 'Arte Digital'), 'Instalações multimídia')
ON CONFLICT (name) DO NOTHING;

-- Inserir materiais comuns
INSERT INTO materials (name, description) VALUES
  ('Tinta a Óleo', 'Tinta à base de óleo para pintura'),
  ('Acrílico', 'Tinta acrílica'),
  ('Aquarela', 'Tinta aquarela'),
  ('Bronze', 'Metal bronze para esculturas'),
  ('Mármore', 'Pedra mármore'),
  ('Madeira', 'Diferentes tipos de madeira'),
  ('Cerâmica', 'Material cerâmico'),
  ('Tecido', 'Diferentes tipos de tecidos'),
  ('Papel', 'Papel para escrita e arte'),
  ('Pedra', 'Pedras naturais'),
  ('Metal', 'Diferentes tipos de metais'),
  ('Digital', 'Meio digital/eletrônico'),
  ('Voz', 'Voz humana'),
  ('Instrumentos Musicais', 'Diversos instrumentos'),
  ('Corpo', 'Corpo humano como instrumento artístico'),
  ('Misto', 'Técnica mista com vários materiais')
ON CONFLICT (name) DO NOTHING;

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_cultural_works_updated_at ON cultural_works;
CREATE TRIGGER update_cultural_works_updated_at
  BEFORE UPDATE ON cultural_works
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
