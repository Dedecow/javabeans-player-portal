import React from 'react';
import { Card, Form, Badge, Button, Row, Col } from 'react-bootstrap';
import type { IngredienteDTO } from '@/types';

interface IngredientSelectorProps {
  availableIngredients: IngredienteDTO[];
  selectedIngredients: string[];
  onToggle: (name: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

const COMMON_INGREDIENTS = [
  { id: 100, nome: 'Café Moído', descricao: 'Grãos de café finamente moídos' },
  { id: 101, nome: 'Água Quente', descricao: 'Água filtrada a 90°C' },
  { id: 102, nome: 'Leite', descricao: 'Leite integral vaporizado' },
  { id: 103, nome: 'Açúcar', descricao: 'Açúcar refinado' },
  { id: 104, nome: 'Chocolate', descricao: 'Cacau em pó 70%' },
  { id: 105, nome: 'Caramelo', descricao: 'Calda de caramelo artesanal' },
  { id: 106, nome: 'Canela', descricao: 'Canela em pó' },
  { id: 107, nome: 'Baunilha', descricao: 'Extrato de baunilha' },
];

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  availableIngredients,
  selectedIngredients,
  onToggle,
  onClear,
  disabled = false,
}) => {
  const ingredients =
    availableIngredients.length > 0 ? availableIngredients : COMMON_INGREDIENTS;

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold">🫙 Ingredientes</span>
        <div className="d-flex align-items-center gap-2">
          {selectedIngredients.length > 0 && (
            <Badge bg="primary" pill>
              {selectedIngredients.length} selecionado(s)
            </Badge>
          )}
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onClear}
            disabled={disabled || selectedIngredients.length === 0}
          >
            Limpar
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className="g-2">
          {ingredients.map((ing) => {
            const isSelected = selectedIngredients.includes(ing.nome);
            return (
              <Col xs={6} md={4} key={ing.id}>
                <div
                  className={`ingredient-card rounded border p-2 h-100 ${
                    isSelected ? 'selected border-primary bg-primary bg-opacity-10' : ''
                  } ${disabled ? 'opacity-50' : ''}`}
                  onClick={() => !disabled && onToggle(ing.nome)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (!disabled) onToggle(ing.nome);
                    }
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    id={`ing-${ing.id}`}
                    checked={isSelected}
                    onChange={() => !disabled && onToggle(ing.nome)}
                    disabled={disabled}
                    label={
                      <span className="small fw-semibold">{ing.nome}</span>
                    }
                    className="pointer-events-none"
                  />
                  {ing.descricao && (
                    <p className="text-muted mb-0 mt-1" style={{ fontSize: '0.7rem' }}>
                      {ing.descricao}
                    </p>
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default IngredientSelector;
