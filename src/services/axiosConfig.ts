import axios from 'axios';
import { API_URL, API_TIMEOUT, ENABLE_LOGS } from '@/utils/constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (ENABLE_LOGS) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    if (ENABLE_LOGS) {
      console.error('[API] Request error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor with exponential backoff retry logic
axiosInstance.interceptors.response.use(
  (response) => {
    if (ENABLE_LOGS) {
      console.log(`[API] Response ${response.status} from ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    const config = error.config;
    if (!config) {
      return Promise.reject(error);
    }

    config._retryCount = config._retryCount || 0;
    const MAX_RETRIES = 3;
    const isNetworkError = !error.response;
    const isServerError = error.response?.status >= 500;

    if ((isNetworkError || isServerError) && config._retryCount < MAX_RETRIES) {
      config._retryCount += 1;
      const backoffMs = Math.pow(2, config._retryCount) * 500;

      if (ENABLE_LOGS) {
        console.warn(`[API] Retry ${config._retryCount}/${MAX_RETRIES} after ${backoffMs}ms`);
      }

      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      return axiosInstance(config);
    }

    if (ENABLE_LOGS) {
      console.error('[API] Response error:', error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
