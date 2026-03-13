import React from 'react';
import { Card, ProgressBar, Table, Badge } from 'react-bootstrap';
import { usePlayer } from '@/hooks/usePlayer';
import { formatXP, formatDuration, formatPercentage, formatNumber } from '@/utils/formatters';

const PlayerStats: React.FC = () => {
  const player = usePlayer();

  const statRows = [
    { label: 'XP Total', value: formatXP(player.stats.totalXP), icon: '⭐' },
    { label: 'Receitas Preparadas', value: formatNumber(player.stats.recipesPrepared), icon: '☕' },
    { label: 'Preparações bem-sucedidas', value: formatNumber(player.stats.successfulPreparations), icon: '✅' },
    { label: 'Preparações falhas', value: formatNumber(player.stats.failedPreparations), icon: '❌' },
    { label: 'Taxa de Sucesso', value: formatPercentage(player.stats.successRate), icon: '📊' },
    { label: 'Tempo de Jogo', value: formatDuration(player.stats.playTimeMs), icon: '⏱️' },
    { label: 'XP Médio por Receita', value: formatXP(Math.round(player.stats.averageXPPerRecipe)), icon: '📈' },
    { label: 'Maior Sequência', value: `${player.stats.longestStreak} receitas`, icon: '🔥' },
    { label: 'Sequência Atual', value: `${player.stats.currentStreak} receitas`, icon: '⚡' },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold">👤 Estatísticas do Jogador</span>
        <Badge bg="primary" pill>Nível {player.level}</Badge>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <small className="text-muted fw-semibold">Progresso para Nível {player.level + 1}</small>
            <small className="text-muted">{Math.round(player.xpProgressPercent)}%</small>
          </div>
          <ProgressBar
            now={player.xpProgressPercent}
            variant="primary"
            label={`${Math.round(player.xpProgressPercent)}%`}
            style={{ height: 12 }}
          />
          <div className="d-flex justify-content-between mt-1">
            <small className="text-muted">{formatXP(player.xpProgress)}</small>
            <small className="text-muted">{formatXP(player.xpForNextLevel)}</small>
          </div>
        </div>

        <Table borderless hover size="sm" responsive className="mb-0">
          <tbody>
            {statRows.map((row) => (
              <tr key={row.label}>
                <td className="text-muted ps-0">
                  <span className="me-1">{row.icon}</span>
                  {row.label}
                </td>
                <td className="fw-semibold text-end pe-0">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default PlayerStats;
