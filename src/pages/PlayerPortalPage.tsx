import React from 'react';
import { Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import PlayerStats from '@/components/dashboard/PlayerStats';
import { usePlayer } from '@/hooks/usePlayer';
import { useAppSelector } from '@/store/hooks';
import { formatXP, formatDuration, formatPercentage } from '@/utils/formatters';

const PlayerPortalPage: React.FC = () => {
  const player = usePlayer();
  const { gameHistory } = useAppSelector((s) => s.game);

  const radarData = [
    { subject: 'XP', value: Math.min((player.playerXP / 5000) * 100, 100), fullMark: 100 },
    { subject: 'Receitas', value: Math.min((player.stats.recipesPrepared / 50) * 100, 100), fullMark: 100 },
    { subject: 'Sucesso', value: Math.round(player.stats.successRate * 100), fullMark: 100 },
    { subject: 'Sequência', value: Math.min((player.stats.longestStreak / 10) * 100, 100), fullMark: 100 },
    { subject: 'Nível', value: Math.min((player.level / 20) * 100, 100), fullMark: 100 },
  ];

  const achievements = [
    { id: '1', title: 'Primeiro Café', description: 'Prepare sua primeira receita', icon: '☕', unlocked: player.stats.recipesPrepared >= 1 },
    { id: '2', title: 'Barista Iniciante', description: 'Prepare 5 receitas', icon: '🎓', unlocked: player.stats.recipesPrepared >= 5 },
    { id: '3', title: 'Mestre do Café', description: 'Alcance nível 10', icon: '🏆', unlocked: player.level >= 10 },
    { id: '4', title: 'Precisão Perfeita', description: 'Taxa de sucesso > 80%', icon: '🎯', unlocked: player.stats.successRate > 0.8 },
    { id: '5', title: 'Sequência Quente', description: '5 sucessos seguidos', icon: '🔥', unlocked: player.stats.longestStreak >= 5 },
    { id: '6', title: 'Veterano', description: 'Jogue por mais de 1 hora', icon: '⏰', unlocked: player.stats.playTimeMs >= 3600000 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">👤 Portal do Jogador</h2>
        <p className="text-muted mb-0">Seu perfil, conquistas e estatísticas</p>
      </div>

      <Row className="g-3">
        {/* Profile Card */}
        <Col xs={12} md={4}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body className="py-4">
              <div
                className="mx-auto mb-3 rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold"
                style={{ width: 80, height: 80, fontSize: '2rem' }}
              >
                {player.playerName.charAt(0).toUpperCase()}
              </div>
              <h4 className="fw-bold mb-1">{player.playerName}</h4>
              <p className="text-muted mb-2">Barista Profissional</p>
              <div className="d-flex justify-content-center gap-2 mb-3">
                <Badge bg="primary" className="px-3 py-2">Nível {player.level}</Badge>
                <Badge bg="warning" text="dark" className="px-3 py-2">{formatXP(player.playerXP)}</Badge>
              </div>
              <ProgressBar
                now={player.xpProgressPercent}
                variant="primary"
                style={{ height: 8 }}
                className="mb-1"
              />
              <small className="text-muted">
                {formatXP(player.xpProgress)} / {formatXP(player.xpForNextLevel)} para Lv.{player.level + 1}
              </small>

              <hr />

              <Row className="text-center g-2">
                <Col xs={4}>
                  <div className="fw-bold">{player.stats.recipesPrepared}</div>
                  <small className="text-muted">Receitas</small>
                </Col>
                <Col xs={4}>
                  <div className="fw-bold">{formatPercentage(player.stats.successRate)}</div>
                  <small className="text-muted">Sucesso</small>
                </Col>
                <Col xs={4}>
                  <div className="fw-bold">{formatDuration(player.stats.playTimeMs)}</div>
                  <small className="text-muted">Tempo</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Radar Chart */}
        <Col xs={12} md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header><span className="fw-semibold">🕸️ Radar de Habilidades</span></Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Habilidades"
                    dataKey="value"
                    stroke="#6f42c1"
                    fill="#6f42c1"
                    fillOpacity={0.3}
                  />
                  <Tooltip formatter={(v: number) => [`${v}%`, '']} />
                </RadarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Stats */}
        <Col xs={12} md={4}>
          <PlayerStats />
        </Col>

        {/* Achievements */}
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header><span className="fw-semibold">🏆 Conquistas</span></Card.Header>
            <Card.Body>
              <Row className="g-2">
                {achievements.map((a) => (
                  <Col xs={6} md={4} lg={2} key={a.id}>
                    <div
                      className={`border rounded p-2 text-center h-100 ${
                        a.unlocked ? 'border-warning bg-warning bg-opacity-10' : 'opacity-40'
                      }`}
                    >
                      <div style={{ fontSize: '2rem' }} className="mb-1">
                        {a.unlocked ? a.icon : '🔒'}
                      </div>
                      <div className="fw-semibold small">{a.title}</div>
                      <div className="text-muted" style={{ fontSize: '0.7rem' }}>{a.description}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* History */}
        {gameHistory.length > 0 && (
          <Col xs={12}>
            <Card className="border-0 shadow-sm">
              <Card.Header><span className="fw-semibold">📋 Histórico Recente</span></Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Receita</th>
                        <th>Resultado</th>
                        <th>XP</th>
                        <th>Ingredientes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameHistory.slice(0, 5).map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.receitaNome}</td>
                          <td>
                            <Badge bg={entry.sucesso ? 'success' : 'danger'}>
                              {entry.sucesso ? 'Sucesso' : 'Falha'}
                            </Badge>
                          </td>
                          <td className="text-warning fw-semibold">
                            {entry.xpGanho > 0 ? `+${formatXP(entry.xpGanho)}` : '—'}
                          </td>
                          <td className="text-muted small">{entry.ingredientesUsados.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default PlayerPortalPage;
