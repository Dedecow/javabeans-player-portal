import axiosInstance from './axiosConfig';
import { API_ENDPOINTS } from '@/utils/constants';
import type { HealthCheckResponse } from '@/types';

export const healthService = {
  async getHealth(): Promise<HealthCheckResponse> {
    const start = Date.now();
    const response = await axiosInstance.get<HealthCheckResponse>(API_ENDPOINTS.HEALTH);
    const latencyMs = Date.now() - start;
    return { ...response.data, latencyMs };
  },
};
