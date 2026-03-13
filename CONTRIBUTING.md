# Contributing to JavaBeans Player Portal

Thank you for your interest in contributing! This document provides guidelines.

## Development Setup

```bash
git clone https://github.com/Dedecow/javabeans-player-portal.git
cd javabeans-player-portal
npm install
cp .env.example .env
npm run dev
```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Route pages
├── store/         # Redux Toolkit slices
├── services/      # API service layer
├── hooks/         # Custom React hooks
├── styles/        # SCSS stylesheets
├── types/         # TypeScript interfaces
└── utils/         # Utility functions
```

## Code Style

- TypeScript strict mode enabled
- Functional components with React hooks
- Redux Toolkit for state management
- Axios with interceptors for API calls
- Bootstrap 5 / React Bootstrap for UI

## Adding a New Feature

1. Create types in `src/types/`
2. Add API calls in `src/services/`
3. Update Redux slice in `src/store/` if needed
4. Create a custom hook in `src/hooks/` if reusable
5. Build the UI component in `src/components/`
6. Wire up in a page in `src/pages/`

## API Integration

The backend endpoints are defined in `src/utils/constants.ts`:

```typescript
export const API_ENDPOINTS = {
  HEALTH: '/game/health',
  SCENARIO_INITIAL: '/game/scenario/initial',
  CAFE_PREPARE: '/game/cafe/prepare',
  RECIPE_NEXT: '/game/recipe/next',
};
```

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```
