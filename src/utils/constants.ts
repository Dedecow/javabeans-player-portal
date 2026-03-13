export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;
export const ENABLE_LOGS = import.meta.env.VITE_ENABLE_LOGS === 'true';
export const POLLING_INTERVAL = Number(import.meta.env.VITE_POLLING_INTERVAL) || 5000;
export const THEME_MODE = import.meta.env.VITE_THEME_MODE || 'auto';

export const API_ENDPOINTS = {
  HEALTH: '/game/health',
  SCENARIO_INITIAL: '/game/scenario/initial',
  CAFE_PREPARE: '/game/cafe/prepare',
  RECIPE_NEXT: '/game/recipe/next',
} as const;

export const GAME_CONFIG = {
  MAX_HISTORY_ENTRIES: 50,
  XP_PER_LEVEL: 1000,
  MAX_LEVEL: 100,
} as const;

export const THEME_STORAGE_KEY = 'javabeans-theme';
export const SESSION_STORAGE_KEY = 'javabeans-session';
