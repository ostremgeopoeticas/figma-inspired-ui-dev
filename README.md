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

## Posso conectar um domínio personalizado ao meu projeto Lovable?

Sim, você pode!

Para conectar um domínio, navegue até Project > Settings > Domains e clique em Connect Domain.

Leia mais aqui: [Configurando um domínio personalizado](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
