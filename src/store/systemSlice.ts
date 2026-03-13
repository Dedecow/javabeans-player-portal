import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { HealthCheckResponse } from '@/types';

interface SystemState {
  healthCheck: HealthCheckResponse | null;
  isLoading: boolean;
  lastUpdate: string | null;
  error: string | null;
  apiUrl: string;
  theme: 'light' | 'dark' | 'auto';
  notificationsEnabled: boolean;
  pollingEnabled: boolean;
}

const initialState: SystemState = {
  healthCheck: null,
  isLoading: false,
  lastUpdate: null,
  error: null,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  theme: (localStorage.getItem('javabeans-theme') as 'light' | 'dark' | 'auto') || 'auto',
  notificationsEnabled: true,
  pollingEnabled: true,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setHealthCheck(state, action: PayloadAction<HealthCheckResponse>) {
      state.healthCheck = action.payload;
      state.lastUpdate = new Date().toISOString();
      state.error = null;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setApiUrl(state, action: PayloadAction<string>) {
      state.apiUrl = action.payload;
    },
    setTheme(state, action: PayloadAction<'light' | 'dark' | 'auto'>) {
      state.theme = action.payload;
      localStorage.setItem('javabeans-theme', action.payload);
    },
    setNotificationsEnabled(state, action: PayloadAction<boolean>) {
      state.notificationsEnabled = action.payload;
    },
    setPollingEnabled(state, action: PayloadAction<boolean>) {
      state.pollingEnabled = action.payload;
    },
  },
});

export const {
  setHealthCheck,
  setIsLoading,
  setError,
  setApiUrl,
  setTheme,
  setNotificationsEnabled,
  setPollingEnabled,
} = systemSlice.actions;

export default systemSlice.reducer;
