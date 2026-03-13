import { SESSION_STORAGE_KEY } from '@/utils/constants';

export const sessionService = {
  getSessionId(): string | null {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  },

  setSessionId(sessionId: string): void {
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  },

  clearSession(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  },

  exportData(): string {
    const data: Record<string, string | null> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('javabeans-')) {
        data[key] = localStorage.getItem(key);
      }
    }
    return JSON.stringify(data, null, 2);
  },

  importData(jsonData: string): void {
    const data = JSON.parse(jsonData) as Record<string, string>;
    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith('javabeans-')) {
        localStorage.setItem(key, value);
      }
    });
  },
};
