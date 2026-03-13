import { GAME_CONFIG } from './constants';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const calculateLevel = (totalXP: number): number => {
  return Math.min(
    Math.floor(totalXP / GAME_CONFIG.XP_PER_LEVEL) + 1,
    GAME_CONFIG.MAX_LEVEL
  );
};

export const calculateXPProgress = (totalXP: number): number => {
  return totalXP % GAME_CONFIG.XP_PER_LEVEL;
};

export const calculateXPForNextLevel = (): number => {
  return GAME_CONFIG.XP_PER_LEVEL;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getThemeFromStorage = (): 'light' | 'dark' | 'auto' => {
  const stored = localStorage.getItem('javabeans-theme');
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }
  return 'auto';
};

export const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
