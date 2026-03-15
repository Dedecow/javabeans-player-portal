import React from 'react';
import { Card, Button, Badge, Alert } from 'react-bootstrap';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import type { CenarioDTO } from '@/types';

interface ScenarioLoaderProps {
  scenario: CenarioDTO | null;
  isLoading: boolean;
  onLoad: () => void;
}

const DIFICULDADE_LABEL: Record<string, string> = {
  FACIL: 'Fácil',
  MEDIO: 'Médio',
  DIFICIL: 'Difícil',
};

const ScenarioLoader: React.FC<ScenarioLoaderProps> = ({ scenario, isLoading, onLoad }) => {
  if (!scenario) {
    return (
      <Card className="border-primary">
        <Card.Body className="text-center py-5">
          <div style={{ fontSize: '4rem' }} className="mb-3">☕</div>
          <h4 className="mb-3">Bem-vindo à Cafeteria!</h4>
          <p className="text-muted mb-4">
            Carregue um cenário para começar sua jornada como barista.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={onLoad}
            disabled={isLoading}
            className="px-5"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" message="Carregando..." />
            ) : (
              'Iniciar Cenário'
            )}
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm animate-fade-in">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span>🎭</span>
          <span className="fw-semibold">{scenario.titulo}</span>
        </div>
        <div className="d-flex gap-2">
          <Badge bg="warning" text="dark">{DIFICULDADE_LABEL[scenario.dificuldade] ?? scenario.dificuldade}</Badge>
          <Badge bg="light" text="dark">{scenario.tempoEstimado} min</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <Alert variant="info" className="mb-0">
          <p className="mb-0 fst-italic">"{scenario.contextoNarrativo}"</p>
        </Alert>
        {scenario.descricao && (
          <p className="text-muted small mt-2 mb-0">{scenario.descricao}</p>
        )}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <Button variant="outline-primary" size="sm" onClick={onLoad} disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : '🔄 Novo Cenário'}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ScenarioLoader;
