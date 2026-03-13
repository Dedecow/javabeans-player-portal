import React from 'react';
import { Card, Badge, ProgressBar, ListGroup } from 'react-bootstrap';
import type { ReceitaDTO } from '@/types';
import { formatXP } from '@/utils/formatters';

interface RecipeDisplayProps {
  recipe: ReceitaDTO | null;
}

const getDifficultyLabel = (level: number): string => {
  if (level <= 2) return 'Fácil';
  if (level <= 4) return 'Médio';
  if (level <= 7) return 'Difícil';
  return 'Expert';
};

const getDifficultyVariant = (level: number): string => {
  if (level <= 2) return 'success';
  if (level <= 4) return 'info';
  if (level <= 7) return 'warning';
  return 'danger';
};

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  if (!recipe) {
    return (
      <Card className="border-dashed text-center py-5">
        <Card.Body>
          <div style={{ fontSize: '3rem' }} className="mb-2">📋</div>
          <p className="text-muted">Nenhuma receita carregada</p>
        </Card.Body>
      </Card>
    );
  }

  const difficulty = recipe.dificuldade ?? 1;
  const difficultyPercent = (difficulty / 10) * 100;

  return (
    <Card className="border-0 shadow-sm animate-fade-in">
      <Card.Header className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="mb-1 fw-semibold">{recipe.nome}</h5>
          {recipe.clienteNome && (
            <small className="text-muted">👤 Cliente: {recipe.clienteNome}</small>
          )}
        </div>
        <div className="d-flex flex-column align-items-end gap-1">
          <Badge bg={getDifficultyVariant(difficulty)}>
            {getDifficultyLabel(difficulty)}
          </Badge>
          {recipe.xpRecompensa && (
            <Badge bg="warning" text="dark">+{formatXP(recipe.xpRecompensa)}</Badge>
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small mb-3">{recipe.descricao}</p>
        {recipe.clienteDescricao && (
          <p className="fst-italic small border-start border-primary ps-3 mb-3">
            "{recipe.clienteDescricao}"
          </p>
        )}
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <small className="text-muted">Dificuldade</small>
            <small className="text-muted">{difficulty}/10</small>
          </div>
          <ProgressBar
            now={difficultyPercent}
            variant={getDifficultyVariant(difficulty)}
            style={{ height: 6 }}
          />
        </div>
        {recipe.ingredientes && recipe.ingredientes.length > 0 && (
          <div>
            <small className="text-muted fw-semibold d-block mb-1">
              Ingredientes ({recipe.ingredientes.length})
            </small>
            <ListGroup variant="flush" className="rounded border">
              {recipe.ingredientes.map((ing) => (
                <ListGroup.Item
                  key={ing.id}
                  className="d-flex justify-content-between align-items-center py-1 px-3"
                  style={{ fontSize: '0.875rem' }}
                >
                  <span>🫙 {ing.nome}</span>
                  {ing.quantidade && (
                    <Badge bg="secondary" pill>{ing.quantidade}x</Badge>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default RecipeDisplay;
