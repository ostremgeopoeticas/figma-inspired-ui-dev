-- Inserir algumas obras de exemplo para testar o mapa cultural

-- Obras em Ouro Preto
INSERT INTO cultural_works (
  title, 
  description, 
  author, 
  region_id, 
  category_id, 
  type_id, 
  material_ids, 
  latitude, 
  longitude, 
  address, 
  image_urls, 
  contact_info, 
  tags, 
  submitted_by, 
  status
) VALUES 
(
  'Mural da Memória',
  'Um mural que retrata a história da mineração em Ouro Preto, pintado na parede de uma antiga casa colonial. A obra representa a luta dos trabalhadores e a transformação da paisagem ao longo dos séculos.',
  'Coletivo Arte Urbana OP',
  (SELECT id FROM regions WHERE name = 'Alto Rio Doce'),
  (SELECT id FROM cultural_categories WHERE name = 'Artes Visuais'),
  (SELECT id FROM cultural_types WHERE name = 'Mural'),
  ARRAY[(SELECT id FROM materials WHERE name = 'Tinta Acrílica'), (SELECT id FROM materials WHERE name = 'Papel')],
  -20.3857,
  -43.5024,
  'Rua São José, 123 - Centro, Ouro Preto - MG',
  ARRAY['https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600'],
  '{"email": "coletivo@arteurbanaop.com", "website": "https://arteurbanaop.com"}',
  ARRAY['street art', 'história', 'mineração', 'memória'],
  'Administrador',
  'active'
),
(
  'Poesia nos Trilhos',
  'Poemas escritos em placas ao longo da antiga linha férrea de Ouro Preto. Cada poema conta uma história diferente sobre a cidade e suas tradições.',
  'Maria Santos',
  (SELECT id FROM regions WHERE name = 'Alto Rio Doce'),
  (SELECT id FROM cultural_categories WHERE name = 'Literatura'),
  (SELECT id FROM cultural_types WHERE name = 'Poesia'),
  ARRAY[(SELECT id FROM materials WHERE name = 'Metal'), (SELECT id FROM materials WHERE name = 'Tinta Acrílica')],
  -20.3890,
  -43.5070,
  'Estação Ferroviária - Centro, Ouro Preto - MG',
  ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600'],
  '{"email": "maria.santos@email.com"}',
  ARRAY['poesia', 'ferrovia', 'tradição', 'urbano'],
  'maria.santos@email.com',
  'active'
);

-- Obras em Mariana
INSERT INTO cultural_works (
  title, 
  description, 
  author, 
  region_id, 
  category_id, 
  type_id, 
  material_ids, 
  latitude, 
  longitude, 
  address, 
  image_urls, 
  contact_info, 
  tags, 
  submitted_by, 
  status
) VALUES 
(
  'Cerâmicas da Tradição',
  'Coleção de cerâmicas produzidas por artesãos locais, retratando a fauna e flora da região da Bacia do Rio Doce.',
  'José Oleiro',
  (SELECT id FROM regions WHERE name = 'Alto Rio Doce'),
  (SELECT id FROM cultural_categories WHERE name = 'Artesanato'),
  (SELECT id FROM cultural_types WHERE name = 'Cerâmica'),
  ARRAY[(SELECT id FROM materials WHERE name = 'Cerâmica')],
  -20.3777,
  -43.4168,
  'Praça Gomes Freire - Centro, Mariana - MG',
  ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600'],
  '{"phone": "(31) 98765-4321", "email": "jose.oleiro@email.com"}',
  ARRAY['cerâmica', 'artesanato', 'tradição', 'fauna', 'flora'],
  'jose.oleiro@email.com',
  'active'
),
(
  'Festa de Nossa Senhora do Carmo',
  'Manifestação popular religiosa que acontece anualmente em Mariana, com música, dança e procissão pelas ruas históricas.',
  'Comunidade Marianense',
  (SELECT id FROM regions WHERE name = 'Alto Rio Doce'),
  (SELECT id FROM cultural_categories WHERE name = 'Manifestações Populares'),
  (SELECT id FROM cultural_types WHERE name = 'Festa Popular'),
  ARRAY[(SELECT id FROM materials WHERE name = 'Voz'), (SELECT id FROM materials WHERE name = 'Instrumentos Musicais')],
  -20.3777,
  -43.4159,
  'Igreja do Carmo - Centro, Mariana - MG',
  ARRAY['https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600'],
  '{"website": "https://mariana.mg.gov.br"}',
  ARRAY['festa', 'religião', 'tradição', 'música', 'dança'],
  'comunidade@mariana.mg.gov.br',
  'active'
);

-- Obras no Vale do Aço
INSERT INTO cultural_works (
  title, 
  description, 
  author, 
  region_id, 
  category_id, 
  type_id, 
  material_ids, 
  latitude, 
  longitude, 
  address, 
  image_urls, 
  contact_info, 
  tags, 
  submitted_by, 
  status
) VALUES 
(
  'Sinfonia do Aço',
  'Composição musical que retrata a vida dos trabalhadores siderúrgicos e a transformação urbana da região do Vale do Aço.',
  'Carlos Compositor',
  (SELECT id FROM regions WHERE name = 'Vale do Aço'),
  (SELECT id FROM cultural_categories WHERE name = 'Música'),
  (SELECT id FROM cultural_types WHERE name = 'Canção'),
  ARRAY[(SELECT id FROM materials WHERE name = 'Instrumentos Musicais'), (SELECT id FROM materials WHERE name = 'Voz')],
  -19.4685,
  -42.5369,
  'Teatro Municipal - Centro, Ipatinga - MG',
  ARRAY['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'],
  '{"email": "carlos.compositor@email.com", "phone": "(31) 99999-8888"}',
  ARRAY['música', 'trabalho', 'siderurgia', 'urbano'],
  'carlos.compositor@email.com',
  'active'
),
(
  'Memorial dos Trabalhadores',
  'Escultura em metal que homenageia os trabalhadores da indústria siderúrgica da região.',
  'Ana Escultora',
  (SELECT id FROM regions WHERE name = 'Vale do Aço'),
  (SELECT id FROM cultural_categories WHERE name = 'Artes Visuais'),
  (SELECT id FROM cultural_types WHERE name = 'Escultura'),
  ARRAY[(SELECT id FROM materials WHERE name = 'Metal')],
  -19.4686,
  -42.5368,
  'Praça dos Trabalhadores - Centro, Ipatinga - MG',
  ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600'],
  '{"email": "ana.escultora@email.com"}',
  ARRAY['escultura', 'memorial', 'trabalhadores', 'metal'],
  'ana.escultora@email.com',
  'active'
);

-- Obra digital
INSERT INTO cultural_works (
  title, 
  description, 
  author, 
  region_id, 
  category_id, 
  type_id, 
  material_ids, 
  latitude, 
  longitude, 
  address, 
  image_urls, 
  contact_info, 
  tags, 
  submitted_by, 
  status
) VALUES 
(
  'Rios Digitais',
  'Instalação multimídia que projeta imagens dos rios da bacia em paredes e superfícies urbanas, acompanhada de sons da natureza.',
  'Coletivo Arte Digital',
  (SELECT id FROM regions WHERE name = 'Região Metropolitana de Belo Horizonte'),
  (SELECT id FROM cultural_categories WHERE name = 'Arte Digital'),
  (SELECT id FROM cultural_types WHERE name = 'Instalação Digital'),
  ARRAY[(SELECT id FROM materials WHERE name = 'Digital')],
  -19.9191,
  -43.9386,
  'Praça da Liberdade - Funcionários, Belo Horizonte - MG',
  ARRAY['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600'],
  '{"email": "contato@artedigital.com", "website": "https://artedigital.com"}',
  ARRAY['arte digital', 'instalação', 'rios', 'natureza', 'multimídia'],
  'contato@artedigital.com',
  'active'
);
