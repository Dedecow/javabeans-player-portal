import React from 'react';
import { Alert, Card, Badge, Button } from 'react-bootstrap';
import type { ResultadoPreparar } from '@/types';
import { formatXP } from '@/utils/formatters';

interface ResultFeedbackProps {
  result: ResultadoPreparar | null;
  onNext?: () => void;
  onClose?: () => void;
}

const ResultFeedback: React.FC<ResultFeedbackProps> = ({ result, onNext, onClose }) => {
  if (!result) return null;

  return (
    <Card
      className={`border-0 shadow-sm animate-bounce-in ${
        result.sucesso ? 'border-success' : 'border-danger'
      }`}
    >
      <Card.Header
        className={`text-white ${result.sucesso ? 'bg-success' : 'bg-danger'}`}
      >
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '1.5rem' }}>{result.sucesso ? '✅' : '❌'}</span>
          <span className="fw-semibold">
            {result.sucesso ? 'Café Perfeito!' : 'Tente Novamente'}
          </span>
          {result.sucesso && (
            <Badge bg="warning" text="dark" className="ms-auto">
              +{formatXP(result.xpGanho)}
            </Badge>
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <p className="mb-3">{result.mensagem}</p>
        {result.feedbackIA && (
          <Alert variant="info" className="mb-3">
            <small className="fw-semibold d-block mb-1">🤖 Feedback da IA:</small>
            <p className="mb-0 fst-italic small">"{result.feedbackIA}"</p>
          </Alert>
        )}
        {result.proximaReceita && (
          <div className="border rounded p-2">
            <small className="text-muted fw-semibold d-block mb-1">Próxima Receita:</small>
            <span className="fw-semibold">{result.proximaReceita.nome}</span>
          </div>
        )}
      </Card.Body>
      <Card.Footer className="d-flex gap-2 justify-content-end">
        {onClose && (
          <Button variant="outline-secondary" size="sm" onClick={onClose}>
            Fechar
          </Button>
        )}
        {onNext && (
          <Button
            variant={result.sucesso ? 'success' : 'primary'}
            size="sm"
            onClick={onNext}
          >
            {result.sucesso ? 'Próxima Receita →' : 'Tentar Novamente'}
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ResultFeedback;
