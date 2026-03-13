import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { healthService } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setHealthCheck, setError } from '@/store/systemSlice';
import { POLLING_INTERVAL } from '@/utils/constants';

export const useHealth = () => {
  const dispatch = useAppDispatch();
  const { healthCheck, lastUpdate, error, pollingEnabled } = useAppSelector((s) => s.system);

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      try {
        const result = await healthService.getHealth();
        dispatch(setHealthCheck(result));
        dispatch(setError(null));
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Health check failed';
        dispatch(setError(message));
        throw err;
      }
    },
    refetchInterval: pollingEnabled ? POLLING_INTERVAL : false,
    retry: 1,
    staleTime: POLLING_INTERVAL / 2,
  });

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    healthCheck: data ?? healthCheck,
    isLoading,
    isFetching,
    error,
    lastUpdate,
    refresh,
  };
};
