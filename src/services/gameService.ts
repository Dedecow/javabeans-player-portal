import axiosInstance from './axiosConfig';
import { API_ENDPOINTS } from '@/utils/constants';
import type { CenarioDTO, ReceitaDTO, ResultadoPreparar, PrepararCafeRequest } from '@/types';

export const gameService = {
  async getInitialScenario(): Promise<CenarioDTO> {
    const response = await axiosInstance.get<CenarioDTO>(API_ENDPOINTS.SCENARIO_INITIAL);
    return response.data;
  },

  async getNextRecipe(): Promise<ReceitaDTO> {
    const response = await axiosInstance.get<ReceitaDTO>(API_ENDPOINTS.RECIPE_NEXT);
    return response.data;
  },

  async prepareCafe(request: PrepararCafeRequest): Promise<ResultadoPreparar> {
    const response = await axiosInstance.post<ResultadoPreparar>(
      API_ENDPOINTS.CAFE_PREPARE,
      request
    );
    return response.data;
  },
};
