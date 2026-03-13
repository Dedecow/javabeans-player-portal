import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';

const SystemStatusChart: React.FC = () => {
  const { gameHistory } = useAppSelector((s) => s.game);

  const chartData = useMemo(() => {
    return gameHistory.slice(0, 10).reverse().map((entry) => ({
      time: new Date(entry.timestamp).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      xp: entry.xpGanho,
      sucesso: entry.sucesso ? 1 : 0,
      falha: entry.sucesso ? 0 : 1,
    }));
  }, [gameHistory]);

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header>
        <span className="fw-semibold">📉 Histórico de Preparações</span>
      </Card.Header>
      <Card.Body>
        {gameHistory.length === 0 ? (
          <div className="text-center text-muted py-4">
            <div style={{ fontSize: '3rem' }}>📊</div>
            <p className="mb-0">Nenhum dado ainda. Jogue para ver estatísticas!</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorXP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6f42c1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6f42c1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="xp"
                stroke="#6f42c1"
                fill="url(#colorXP)"
                name="XP Ganho"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default SystemStatusChart;
