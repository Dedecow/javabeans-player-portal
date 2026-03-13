# JavaBeans Player Portal ☕

Professional React + Bootstrap frontend for the [javabeans-IA](https://github.com/1272528482-netizen/javabeans-IA) backend.

## Stack Tecnológico

- **React 18** + TypeScript (Hooks)
- **Vite** (build tool otimizado)
- **Bootstrap 5** + React Bootstrap (design system)
- **Redux Toolkit** (state management)
- **React Query** (data fetching + caching)
- **Axios** (HTTP client com interceptadores)
- **Recharts** (data visualization)
- **React Router v6** (navegação)
- **SASS** (estilização avançada)

## Funcionalidades

- 📊 **Dashboard** — Health check em tempo real, métricas e status do sistema
- 🎮 **Game Interface** — Gameplay completo com seleção de ingredientes e feedback visual
- 👤 **Player Portal** — Perfil, conquistas, estatísticas e gráficos
- ⚙️ **Settings** — Tema claro/escuro, URL da API, gerenciamento de dados

## Endpoints da API Integrados

| Endpoint | Uso |
|---|---|
| `GET /game/health` | Health check com polling automático (5s) |
| `GET /game/scenario/initial` | Carregamento de cenário narrativo |
| `POST /game/cafe/prepare` | Preparação de café |
| `GET /game/recipe/next` | Próxima receita disponível |

## Setup

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:8080
VITE_API_TIMEOUT=10000
VITE_ENABLE_LOGS=true
VITE_POLLING_INTERVAL=5000
VITE_THEME_MODE=auto
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── common/      # Header, Footer, Sidebar, badges, spinners
│   ├── game/        # ScenarioLoader, CafePreparationGame, etc.
│   └── dashboard/   # HealthDashboard, GameMetrics, charts
├── pages/           # HomePage, GamePage, PlayerPortalPage, etc.
├── store/           # Redux slices (game, player, system)
├── services/        # API services (Axios config, game, health)
├── hooks/           # Custom hooks (useHealth, useGame, usePlayer)
├── styles/          # SCSS (global, variables, animations)
├── types/           # TypeScript interfaces
└── utils/           # Constants, helpers, formatters, validators
```

## Licença

MIT
