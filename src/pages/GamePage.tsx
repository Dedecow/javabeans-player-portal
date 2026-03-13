import React from 'react';
import { Row, Col, Table, Badge, Button } from 'react-bootstrap';
import ScenarioLoader from '@/components/game/ScenarioLoader';
import RecipeDisplay from '@/components/game/RecipeDisplay';
import CafePreparationGame from '@/components/game/CafePreparationGame';
import { useGame } from '@/hooks/useGame';
import { formatTimestamp, formatXP } from '@/utils/formatters';

const GamePage: React.FC = () => {
  const {
    currentScenario,
    currentRecipe,
    gameHistory,
    isLoadingScenario,
    loadScenario,
    loadNextRecipe,
    isLoadingRecipe,
    clearHistory,
  } = useGame();

  return (
    <div className="animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">🎮 Jogar</h2>
          <p className="text-muted mb-0">Prepare cafés deliciosos para seus clientes</p>
        </div>
        <div className="d-flex gap-2">
          {currentRecipe && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={loadNextRecipe}
              disabled={isLoadingRecipe}
            >
              ⏭️ Próxima Receita
            </Button>
          )}
        </div>
      </div>

      <Row className="g-3">
        <Col xs={12}>
          <ScenarioLoader
            scenario={currentScenario}
            isLoading={isLoadingScenario}
            onLoad={loadScenario}
          />
        </Col>

        {currentScenario && (
          <>
            <Col xs={12} md={5}>
              <RecipeDisplay recipe={currentRecipe} />
            </Col>
            <Col xs={12} md={7}>
              <CafePreparationGame />
            </Col>
          </>
        )}

        {gameHistory.length > 0 && (
          <Col xs={12}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">📋 Histórico da Sessão</h5>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={clearHistory}
              >
                Limpar Histórico
              </Button>
            </div>
            <div className="table-responsive">
              <Table striped hover className="mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Receita</th>
                    <th>Resultado</th>
                    <th>XP Ganho</th>
                    <th>Ingredientes</th>
                    <th>Data/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((entry, idx) => (
                    <tr key={entry.id}>
                      <td className="text-muted">{idx + 1}</td>
                      <td className="fw-semibold">{entry.receitaNome}</td>
                      <td>
                        <Badge bg={entry.sucesso ? 'success' : 'danger'}>
                          {entry.sucesso ? '✅ Sucesso' : '❌ Falha'}
                        </Badge>
                      </td>
                      <td>
                        {entry.xpGanho > 0 ? (
                          <span className="text-warning fw-semibold">+{formatXP(entry.xpGanho)}</span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <span className="text-muted small">
                          {entry.ingredientesUsados.join(', ') || '—'}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {formatTimestamp(entry.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default GamePage;
