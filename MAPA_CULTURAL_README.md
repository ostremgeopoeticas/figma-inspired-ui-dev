# Mapa Cultural - Os Trem: Geopoéticas da Bacia do Rio Doce

## 📍 Visão Geral

O Mapa Cultural é uma plataforma interativa que permite visualizar, explorar e adicionar obras culturais da Bacia do Rio Doce. Inspirado no site [mapa.cultura.gov.br](https://mapa.cultura.gov.br/), oferece uma experiência rica para mapeamento cultural da região.

## ✨ Funcionalidades Principais

### 🗺️ Visualização Interativa
- **Mapa dinâmico** com tecnologia Leaflet
- **Marcadores coloridos** por categoria de obra
- **Popups informativos** ao clicar nos marcadores
- **Zoom e navegação** fluidos

### 🔍 Sistema de Filtros
- **Busca textual** por título, autor ou descrição
- **Filtros por região** (Alto Rio Doce, Vale do Aço, etc.)
- **Filtros por categoria** (Artes Visuais, Literatura, Música, etc.)
- **Filtros por tipo** específico de obra
- **Filtros por materiais** utilizados
- **Filtros avançados** com múltiplas opções

### ➕ Adição de Obras
- **Modo de adição** interativo
- **Clique no mapa** para definir localização
- **Formulário completo** com todos os campos necessários
- **Upload de imagens** via URL
- **Geocodificação reversa** automática

### 📊 Estatísticas
- **Contadores em tempo real** de obras
- **Distribuição por categoria** e região
- **Obras em destaque** na interface

## 🏗️ Arquitetura Técnica

### 📋 Banco de Dados
```sql
-- Tabelas principais:
- regions: Regiões da Bacia do Rio Doce
- cultural_categories: Categorias de obras culturais
- cultural_types: Tipos específicos de obras
- materials: Materiais utilizados nas obras
- cultural_works: Obras culturais (tabela principal)
```

### 🧩 Componentes React

#### 1. **InteractiveMap** (`src/components/map/MapContainer.tsx`)
- Componente principal do mapa
- Renderização de marcadores
- Gerenciamento de eventos (cliques, popups)
- Integração com Leaflet

#### 2. **MapFilters** (`src/components/map/MapFilters.tsx`)
- Interface de filtros avançados
- Busca em tempo real
- Filtros por categoria, região, tipo e materiais
- Indicadores visuais de filtros ativos

#### 3. **AddWorkModal** (`src/components/map/AddWorkModal.tsx`)
- Modal para adicionar novas obras
- Formulário completo com validação
- Upload de múltiplas imagens
- Geocodificação automática

#### 4. **WorkDetails** (`src/components/map/WorkDetails.tsx`)
- Modal de detalhes da obra
- Galeria de imagens
- Informações completas
- Links externos (Maps, contatos)

### 🔧 Serviços

#### **mapService.ts** (`src/services/mapService.ts`)
- **CRUD completo** para obras culturais
- **Busca geográfica** por bounds
- **Filtros avançados**
- **Estatísticas** em tempo real
- **Geocodificação reversa**

## 🎨 Design e UX

### 🎨 Paleta de Cores
- **Primary**: `#BB4514` (laranja terra)
- **Secondary**: `#004A24` (verde escuro)
- **Background**: `#FFF8F1` (bege suave)
- **Accent**: `#E8F5E9` (verde claro)

### 🏷️ Categorias e Cores dos Marcadores
- **Artes Visuais**: Vermelho (`#FF6B6B`)
- **Literatura**: Turquesa (`#4ECDC4`)
- **Música**: Azul (`#45B7D1`)
- **Teatro e Performance**: Verde (`#96CEB4`)
- **Artesanato**: Amarelo (`#FFEAA7`)
- **Patrimônio Cultural**: Lilás (`#DDA0DD`)
- **Manifestações Populares**: Verde água (`#98D8C8`)
- **Arte Digital**: Amarelo claro (`#F7DC6F`)

### 📱 Responsividade
- **Mobile first** design
- **Breakpoints** otimizados
- **Touch-friendly** controles
- **Performance otimizada**

## 🚀 Como Usar

### 👤 Para Usuários

#### 1. **Explorar o Mapa**
- Navegue pelo mapa usando mouse/touch
- Clique nos marcadores para ver detalhes
- Use os controles de zoom
- Filtre obras usando a barra lateral

#### 2. **Adicionar uma Obra**
1. Clique no botão **"Adicionar Obra"**
2. O modo de adição será ativado
3. Clique no local do mapa onde a obra está localizada
4. Preencha o formulário que aparecerá
5. Adicione imagens e informações de contato
6. Clique em **"Adicionar Obra"**

#### 3. **Filtrar Obras**
- Use a **busca textual** para encontrar obras específicas
- Selecione **região**, **categoria** e **tipo**
- Ative **filtros avançados** para mais opções
- Selecione **materiais** específicos
- Use **tags** para busca temática

### 👨‍💻 Para Desenvolvedores

#### 1. **Instalação**
```bash
# Instalar dependências
npm install

# Executar migrações do banco
# Execute os arquivos SQL em migrations/ no Supabase
```

#### 2. **Configuração**
```bash
# Configurar variáveis de ambiente
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### 3. **Desenvolvimento**
```bash
# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📊 Dados de Exemplo

O sistema inclui dados de exemplo para testar:

### 🏛️ Regiões
- Alto Rio Doce
- Médio Rio Doce  
- Baixo Rio Doce
- Vale do Aço
- Zona da Mata
- Região Metropolitana de Belo Horizonte

### 🎭 Categorias
- Artes Visuais
- Literatura
- Música
- Teatro e Performance
- Artesanato
- Patrimônio Cultural
- Manifestações Populares
- Arte Digital

### 🖼️ Obras de Exemplo
- **Mural da Memória** (Ouro Preto)
- **Poesia nos Trilhos** (Ouro Preto)
- **Cerâmicas da Tradição** (Mariana)
- **Festa de Nossa Senhora do Carmo** (Mariana)
- **Sinfonia do Aço** (Ipatinga)
- **Memorial dos Trabalhadores** (Ipatinga)
- **Rios Digitais** (Belo Horizonte)

## 🔒 Considerações de Segurança

### 📝 Validação
- **Validação client-side** em todos os formulários
- **Sanitização** de inputs
- **Verificação de URLs** de imagens

### 🛡️ Autenticação
- Sistema preparado para integração com autenticação
- **Status de aprovação** para obras submetidas
- **Moderação** de conteúdo

## 🚀 Próximos Passos

### 🎯 Melhorias Futuras
- [ ] **Sistema de avaliações** para obras
- [ ] **Comentários** dos usuários
- [ ] **Upload direto** de imagens
- [ ] **Integração com redes sociais**
- [ ] **API pública** para terceiros
- [ ] **App mobile** nativo
- [ ] **Realidade aumentada** para visualização
- [ ] **Eventos** e agenda cultural

### 🔧 Otimizações Técnicas
- [ ] **Cache** de dados geográficos
- [ ] **Lazy loading** de imagens
- [ ] **Service Worker** para offline
- [ ] **Otimização SEO**
- [ ] **Analytics** de uso

## 📚 Referências

- [Leaflet Documentation](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Mapas Culturais](https://mapa.cultura.gov.br/)
- [OpenStreetMap](https://www.openstreetmap.org/)

---

## 📞 Suporte

Para dúvidas técnicas ou sugestões, entre em contato através dos canais do projeto "Os Trem: Geopoéticas da Bacia do Rio Doce".

**Desenvolvido com ❤️ para preservar e valorizar a cultura da Bacia do Rio Doce**
