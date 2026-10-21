# One Piece Wiki

Aplicação web de enciclopédia do universo de One Piece desenvolvida com Next.js e TypeScript, consumindo uma API externa com dados validados. Apresenta listagem de personagens e akumas no mi com busca, filtros e paginação, páginas de detalhe com recompensas, tripulações e frutas, além de feedback de carregamento com skeletons e configuração completa de SEO.

## Funcionalidades

- Listagem de personagens com busca por texto e paginação
- Cards com imagem, recompensa ativa e badges de tripulação e akuma no mi
- Dialog com detalhes do personagem (profissão, tripulação, akuma no mi)
- Página de detalhe do personagem com overview, informações e tripulação
- Listagem de akumas no mi com busca e filtros por tipo com contagens
- Dialog com detalhes da fruta (tipo, modelo e descrição)
- Skeletons animados com Suspense e loading por rota (streaming)
- SEO completo: metadata, Open Graph, Twitter Card, sitemap, robots e JSON-LD

## Decisões Técnicas

- **Server Components** com data fetching no servidor e fetch em cache (`revalidate`)
- **Suspense** e `loading.tsx` para streaming: o shell estático renderiza na hora e só o conteúdo dinâmico mostra skeleton
- **Zod** para validação das respostas da API externa
- **Radix UI Dialog** para modais acessíveis
- Componentes compostos no estilo shadcn (`Card.Root`, `Dialog.Root`) compostos com **tailwind-merge**
- **Tailwind CSS v4** com design tokens definidos no CSS (`@theme`)
- Busca e paginação via formulário GET nativo, sincronizados com a URL (navegação RSC sem estado de dados no client)
- Route Handler `/api/character-extras` com cache para dados extras do personagem
- Metadata gerada no servidor (`generateMetadata`, `metadataBase`) com JSON-LD (`WebSite` e `Person`)

## Tecnologias

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Radix UI
- lucide-react
- Zod
- tailwind-merge
- pnpm

## Como rodar o projeto

- Faça o clone do repositório
- Instale as dependências com ```pnpm install```
- Crie um arquivo .env e adicione:
```
ONE_PIECE_API_URL="sua_api_url"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```
- Execute o projeto com ```pnpm run dev```

## Resultados
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/cd7b41a2-dcc7-41ef-b3cc-cdb24b50a1a6" />
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/af97dc48-cfe2-4618-953f-4f8499ebdea4" />


## Links Úteis

- [Site deployado](https://one-piece-wiki-pink.vercel.app)
- [Linkedin](https://www.linkedin.com/in/guilherme-silva-evangelista)
- [Portfólio](https://portfolio-guilherme-evangelista.vercel.app/)
