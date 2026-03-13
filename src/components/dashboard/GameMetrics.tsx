import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useAppSelector } from '@/store/hooks';
import { formatNumber, formatXP, formatPercentage } from '@/utils/formatters';
import { calculateLevel } from '@/utils/helpers';

const GameMetrics: React.FC = () => {
  const { playerXP, recipesPrepared, successfulPreparations } = useAppSelector((s) => s.player);
  const { healthCheck } = useAppSelector((s) => s.system);
  const level = calculateLevel(playerXP);
  const successRate = recipesPrepared > 0 ? successfulPreparations / recipesPrepared : 0;

  const metrics = [
    {
      icon: '☕',
      value: formatNumber(recipesPrepared),
      label: 'Receitas Preparadas',
      variant: 'primary',
    },
    {
      icon: '⭐',
      value: formatXP(playerXP),
      label: 'XP Total',
      variant: 'warning',
    },
    {
      icon: '🏆',
      value: `Nível ${level}`,
      label: 'Nível Atual',
      variant: 'success',
    },
    {
      icon: '📊',
      value: formatPercentage(successRate),
      label: 'Taxa de Sucesso',
      variant: 'info',
    },
    {
      icon: '🎭',
      value: formatNumber(healthCheck?.metrics?.configuredScenarios ?? 0),
      label: 'Cenários Configurados',
      variant: 'secondary',
    },
    {
      icon: '📋',
      value: formatNumber(healthCheck?.metrics?.availableRecipes ?? 0),
      label: 'Receitas Disponíveis',
      variant: 'secondary',
    },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header>
        <span className="fw-semibold">📈 Métricas do Jogo</span>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {metrics.map((m) => (
            <Col xs={6} md={4} key={m.label}>
              <div className={`metric-card border rounded p-3 border-${m.variant} border-opacity-25`}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                  <span className={`metric-value text-${m.variant}`}>{m.value}</span>
                </div>
                <div className="metric-label text-muted">{m.label}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default GameMetrics;
