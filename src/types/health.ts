export type IAStatus = 'UP' | 'CONFIGURED_BUT_UNREACHABLE' | 'DOWN' | 'NOT_CONFIGURED';
export type DBStatus = 'UP' | 'DOWN';
export type AppStatus = 'RUNNING' | 'STOPPED';

export interface ServiceStatus {
  status: IAStatus | DBStatus | AppStatus;
  message?: string;
  details?: Record<string, unknown>;
}

export interface HealthMetrics {
  totalSessions: number;
  totalXPDistributed: number;
  configuredScenarios: number;
  availableRecipes: number;
}

export interface HealthCheckResponse {
  status: AppStatus;
  timestamp: string;
  latencyMs?: number;
  iaStatus: IAStatus;
  dbStatus: DBStatus;
  metrics?: HealthMetrics;
  components?: {
    ia?: ServiceStatus;
    database?: ServiceStatus;
    application?: ServiceStatus;
  };
}
