-- Script para popular o banco de dados com dados de exemplo para teste

-- Verificar se as tabelas existem e criar se necessário
DO $$
BEGIN
    -- Criar tabela de regiões se não existir
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'regions') THEN
        CREATE TABLE regions (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;

    -- Criar tabela de categorias se não existir
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cultural_categories') THEN
        CREATE TABLE cultural_categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;

    -- Criar tabela de tipos se não existir
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cultural_types') THEN
        CREATE TABLE cultural_types (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            category_id INTEGER REFERENCES cultural_categories(id),
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;

    -- Criar tabela de materiais se não existir
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'materials') THEN
        CREATE TABLE materials (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;

    -- Criar tabela de obras culturais se não existir
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cultural_works') THEN
        CREATE TABLE cultural_works (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            author VARCHAR(255) NOT NULL,
            region_id INTEGER REFERENCES regions(id),
            category_id INTEGER REFERENCES cultural_categories(id),
            type_id INTEGER REFERENCES cultural_types(id),
            material_ids INTEGER[],
            latitude DECIMAL(10, 8) NOT NULL,
            longitude DECIMAL(11, 8) NOT NULL,
            address TEXT,
            image_urls TEXT[],
            contact_info JSONB,
            status VARCHAR(50) DEFAULT 'active',
            submitted_by VARCHAR(255),
            submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            approved_by VARCHAR(255),
            approval_date TIMESTAMP WITH TIME ZONE,
            tags TEXT[]
        );
    END IF;
END
$$;

-- Inserir regiões
INSERT INTO regions (name, description) VALUES
  ('Alto Rio Doce', 'Região do alto curso do Rio Doce, incluindo nascentes'),
  ('Médio Rio Doce', 'Região do médio curso do Rio Doce'),
  ('Baixo Rio Doce', 'Região do baixo curso do Rio Doce, próximo ao litoral'),
  ('Vale do Aço', 'Região industrial do Vale do Aço'),
  ('Zona da Mata', 'Região da Zona da Mata Mineira'),
  ('Região Metropolitana de Belo Horizonte', 'Parte da RMBH que faz parte da bacia'),
  ('Espírito Santo', 'Região do Espírito Santo na bacia do Rio Doce')
ON CONFLICT (name) DO NOTHING;

-- Inserir categorias
INSERT INTO cultural_categories (name, description) VALUES
  ('Artes Visuais', 'Pinturas, esculturas, instalações, grafites, murais'),
  ('Literatura', 'Poesias, contos, romances, crônicas, cordel'),
  ('Música', 'Composições, performances, instrumentos tradicionais'),
  ('Teatro e Performance', 'Peças teatrais, performances, teatro de rua'),
  ('Artesanato', 'Trabalhos manuais tradicionais e contemporâneos'),
  ('Patrimônio Cultural', 'Bens culturais, arquitetura, sítios históricos'),
  ('Manifestações Populares', 'Festas, rituais, tradições orais'),
  ('Arte Digital', 'Arte digital, videoarte, instalações multimídia'),
  ('Fotografia', 'Arte fotográfica e documentação visual'),
  ('Cinema', 'Produções audiovisuais e documentários')
ON CONFLICT (name) DO NOTHING;

-- Inserir tipos (alguns exemplos)
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
  ('Documentário', (SELECT id FROM cultural_categories WHERE name = 'Cinema'), 'Filmes documentários'),
  ('Fotografia Artística', (SELECT id FROM cultural_categories WHERE name = 'Fotografia'), 'Arte fotográfica')
ON CONFLICT (name) DO NOTHING;

-- Inserir materiais
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
  ('Digital', 'Meio digital/eletrônico'),
  ('Voz', 'Voz humana'),
  ('Instrumentos Musicais', 'Diversos instrumentos'),
  ('Corpo', 'Corpo humano como instrumento artístico'),
  ('Misto', 'Técnica mista com vários materiais')
ON CONFLICT (name) DO NOTHING;

-- Inserir obras culturais de exemplo
INSERT INTO cultural_works (
  title, description, author, region_id, category_id, type_id, 
  latitude, longitude, status, material_ids, tags
) VALUES
  (
    'Mural da Resistência',
    'Mural retratando a história da Bacia do Rio Doce e as lutas das comunidades locais',
    'Ana Silva',
    (SELECT id FROM regions WHERE name = 'Alto Rio Doce'),
    (SELECT id FROM cultural_categories WHERE name = 'Artes Visuais'),
    (SELECT id FROM cultural_types WHERE name = 'Mural'),
    -19.9167, -43.9345,
    'active',
    ARRAY[(SELECT id FROM materials WHERE name = 'Acrílico')],
    ARRAY['resistência', 'comunidade', 'história']
  ),
  (
    'Poema das Águas',
    'Poema sobre a relação das comunidades com o Rio Doce',
    'Maria Santos',
    (SELECT id FROM regions WHERE name = 'Zona da Mata'),
    (SELECT id FROM cultural_categories WHERE name = 'Literatura'),
    (SELECT id FROM cultural_types WHERE name = 'Poesia'),
    -20.1500, -42.8000,
    'active',
    ARRAY[(SELECT id FROM materials WHERE name = 'Papel')],
    ARRAY['água', 'poesia', 'natureza']
  ),
  (
    'Escultura da Esperança',
    'Escultura simbolizando a esperança de recuperação do Rio Doce',
    'Lucia Ferreira',
    (SELECT id FROM regions WHERE name = 'Espírito Santo'),
    (SELECT id FROM cultural_categories WHERE name = 'Artes Visuais'),
    (SELECT id FROM cultural_types WHERE name = 'Escultura'),
    -19.4000, -40.1000,
    'active',
    ARRAY[(SELECT id FROM materials WHERE name = 'Bronze')],
    ARRAY['esperança', 'recuperação', 'meio ambiente']
  ),
  (
    'Canto do Rio',
    'Composição musical inspirada no Rio Doce e sua história',
    'Pedro Costa',
    (SELECT id FROM regions WHERE name = 'Vale do Aço'),
    (SELECT id FROM cultural_categories WHERE name = 'Música'),
    (SELECT id FROM cultural_types WHERE name = 'Canção'),
    -19.6000, -42.7000,
    'active',
    ARRAY[(SELECT id FROM materials WHERE name = 'Voz'), (SELECT id FROM materials WHERE name = 'Instrumentos Musicais')],
    ARRAY['música', 'rio', 'tradição']
  ),
  (
    'Fotografia da Memória',
    'Série fotográfica documentando a vida das comunidades ribeirinhas',
    'Roberto Lima',
    (SELECT id FROM regions WHERE name = 'Médio Rio Doce'),
    (SELECT id FROM cultural_categories WHERE name = 'Fotografia'),
    (SELECT id FROM cultural_types WHERE name = 'Fotografia Artística'),
    -19.3000, -42.9000,
    'pending',
    ARRAY[(SELECT id FROM materials WHERE name = 'Digital')],
    ARRAY['fotografia', 'comunidade', 'memória']
  ),
  (
    'Teatro das Águas',
    'Peça teatral sobre a história e cultura da região',
    'Grupo Cultural Rio Doce',
    (SELECT id FROM regions WHERE name = 'Baixo Rio Doce'),
    (SELECT id FROM cultural_categories WHERE name = 'Teatro e Performance'),
    (SELECT id FROM cultural_types WHERE name = 'Peça Teatral'),
    -19.8000, -43.2000,
    'active',
    ARRAY[(SELECT id FROM materials WHERE name = 'Corpo'), (SELECT id FROM materials WHERE name = 'Voz')],
    ARRAY['teatro', 'performance', 'cultura']
  ),
  (
    'Artesanato em Barro',
    'Trabalho artesanal em barro tradicional da região',
    'Dona Maria das Panelas',
    (SELECT id FROM regions WHERE name = 'Alto Rio Doce'),
    (SELECT id FROM cultural_categories WHERE name = 'Artesanato'),
    (SELECT id FROM cultural_types WHERE name = 'Cerâmica'),
    -19.9000, -43.1000,
    'pending',
    ARRAY[(SELECT id FROM materials WHERE name = 'Cerâmica')],
    ARRAY['artesanato', 'tradição', 'barro']
  ),
  (
    'Cinema Documentário',
    'Documentário sobre a transformação da paisagem do Rio Doce',
    'Cineasta Local',
    (SELECT id FROM regions WHERE name = 'Região Metropolitana de Belo Horizonte'),
    (SELECT id FROM cultural_categories WHERE name = 'Cinema'),
    (SELECT id FROM cultural_types WHERE name = 'Documentário'),
    -19.6000, -42.6000,
    'active',
    ARRAY[(SELECT id FROM materials WHERE name = 'Digital')],
    ARRAY['documentário', 'cinema', 'transformação']
  ),
  (
    'Literatura do Vale',
    'Coletânea de contos sobre a vida no Vale do Rio Doce',
    'Ana Paula Costa',
    (SELECT id FROM regions WHERE name = 'Vale do Aço'),
    (SELECT id FROM cultural_categories WHERE name = 'Literatura'),
    (SELECT id FROM cultural_types WHERE name = 'Prosa'),
    -19.7000, -42.3000,
    'active',
    ARRAY[(SELECT id FROM materials WHERE name = 'Papel')],
    ARRAY['literatura', 'contos', 'vale']
  ),
  (
    'Mural Experimental',
    'Obra em processo de aprovação para exposição pública',
    'Artista Emergente',
    (SELECT id FROM regions WHERE name = 'Espírito Santo'),
    (SELECT id FROM cultural_categories WHERE name = 'Artes Visuais'),
    (SELECT id FROM cultural_types WHERE name = 'Mural'),
    -19.5000, -40.5000,
    'pending',
    ARRAY[(SELECT id FROM materials WHERE name = 'Misto')],
    ARRAY['experimental', 'arte urbana']
  )
ON CONFLICT DO NOTHING;

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
