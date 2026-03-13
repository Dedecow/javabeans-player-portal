import React, { useReducer, useEffect, useRef } from 'react';
import { Card, Badge } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useHealth } from '@/hooks/useHealth';
import { formatLatency } from '@/utils/formatters';

interface LatencyDataPoint {
  time: string;
  latency: number;
}

type LatencyAction = { type: 'ADD_POINT'; point: LatencyDataPoint };

const MAX_DATA_POINTS = 20;

function latencyReducer(state: LatencyDataPoint[], action: LatencyAction): LatencyDataPoint[] {
  const next = [...state, action.point];
  return next.slice(-MAX_DATA_POINTS);
}

const LatencyMonitor: React.FC = () => {
  const { healthCheck } = useHealth();
  const [latencyData, dispatch] = useReducer(latencyReducer, []);
  const prevLatencyRef = useRef<number | null>(null);

  useEffect(() => {
    if (healthCheck?.latencyMs !== undefined && healthCheck.latencyMs !== prevLatencyRef.current) {
      prevLatencyRef.current = healthCheck.latencyMs;
      const newPoint: LatencyDataPoint = {
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        latency: healthCheck.latencyMs,
      };
      dispatch({ type: 'ADD_POINT', point: newPoint });
    }
  }, [healthCheck?.latencyMs]);

  const currentLatency = healthCheck?.latencyMs;
  const avgLatency =
    latencyData.length > 0
      ? Math.round(latencyData.reduce((sum, d) => sum + d.latency, 0) / latencyData.length)
      : null;

  const getLatencyVariant = (ms: number): string => {
    if (ms < 200) return 'success';
    if (ms < 500) return 'warning';
    return 'danger';
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold">⚡ Monitor de Latência</span>
        <div className="d-flex gap-2">
          {currentLatency !== undefined && (
            <Badge bg={getLatencyVariant(currentLatency)}>
              Atual: {formatLatency(currentLatency)}
            </Badge>
          )}
          {avgLatency !== null && (
            <Badge bg="secondary">
              Média: {formatLatency(avgLatency)}
            </Badge>
          )}
        </div>
      </Card.Header>
      <Card.Body>
        {latencyData.length < 2 ? (
          <div className="text-center text-muted py-3">
            <p className="mb-0 small">Aguardando dados de latência...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis
                tick={{ fontSize: 10 }}
                unit="ms"
                domain={['auto', 'auto']}
              />
              <Tooltip formatter={(value: number) => [`${value}ms`, 'Latência']} />
              <Line
                type="monotone"
                dataKey="latency"
                stroke="#0dcaf0"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default LatencyMonitor;
