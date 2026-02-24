# Marketplace de Troca de Cartas

SPA em Vue 3 + TypeScript para um marketplace de troca de cartas, desenvolvido como desafio técnico. Permite registro, login, gestão de cartas e criação/deleção de solicitações de troca.

## Requisitos

- Node.js 18+
- pnpm 10.x (recomendado)

## Instalação e execução

```bash
# Instalar dependências
pnpm install

# Variáveis de ambiente (opcional)
# A API base já tem valor padrão. Para override, crie .env:
# VITE_API_BASE_URL=https://cards-marketplace-api.onrender.com

# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Preview do build
pnpm preview
```

## Estrutura do projeto

- `src/api/` – Cliente HTTP (axios), interceptors e funções por recurso (auth, me, cards, trades).
- `src/types/` – Tipos e interfaces TypeScript alinhados à API.
- `src/stores/` – Pinia: auth, userCards, trades, cardsCatalog (com cache opcional para catálogo).
- `src/router/` – Vue Router com guards (rotas protegidas e guestOnly).
- `src/views/` – Páginas: Home (marketplace), Login, Register, MyCards, CreateTrade.
- `src/components/` – Componentes reutilizáveis (CardDisplay, CardGrid, formulários, TradeCardList, AppLayout).
- `src/composables/` – Lógica reutilizável (ex.: useApiError).
- `src/lib/` – Utilitários e constantes.

## Decisões técnicas

- **Vue 3 (Composition API) + TypeScript + Vite**: SPA moderna com tipagem forte e build rápido.
- **Pinia**: Estado global por domínio (auth, cartas do usuário, trades, catálogo) sem misturar responsabilidades.
- **VeeValidate + Yup**: Validação de formulários (registro, login) com mensagens claras.
- **Axios**: Cliente HTTP único com base URL configurável, interceptor de token e normalização de erros (ApiError, mensagem amigável para 503/5xx).
- **Cache**: Cache em memória (TTL 1 min) no catálogo de cartas para reduzir chamadas; invalidação ao adicionar cartas ao usuário.

## Funcionalidades

- Registro e login com validação.
- Adicionar cartas à conta (a partir do catálogo).
- Criar solicitação de troca (cartas que oferece + cartas que deseja receber).
- Deletar solicitações de troca criadas pelo usuário.
- Página inicial (marketplace) com listagem de trocas abertas para todos (incluindo visitantes).

## Licença

MIT
