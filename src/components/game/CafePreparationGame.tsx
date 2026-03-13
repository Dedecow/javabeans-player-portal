import React from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import IngredientSelector from './IngredientSelector';
import ResultFeedback from './ResultFeedback';
import { useGame } from '@/hooks/useGame';

const CafePreparationGame: React.FC = () => {
  const {
    currentRecipe,
    selectedIngredients,
    lastResult,
    isPreparing,
    toggleIngredient,
    clearIngredients,
    prepareCafe,
    loadNextRecipe,
    isLoadingRecipe,
  } = useGame();

  const availableIngredients =
    currentRecipe?.ingredientes ?? [];

  const handleNext = async () => {
    await loadNextRecipe();
  };

  const handleClose = () => {
    clearIngredients();
  };

  return (
    <div className="d-flex flex-column gap-3">
      {lastResult && (
        <ResultFeedback
          result={lastResult}
          onNext={handleNext}
          onClose={handleClose}
        />
      )}

      <IngredientSelector
        availableIngredients={availableIngredients}
        selectedIngredients={selectedIngredients}
        onToggle={toggleIngredient}
        onClear={clearIngredients}
        disabled={isPreparing || isLoadingRecipe}
      />

      <Card className="border-0 shadow-sm">
        <Card.Body className="text-center py-4">
          {isPreparing ? (
            <div className="coffee-brewing" style={{ minHeight: 100 }}>
              <div className="d-flex flex-column align-items-center gap-3">
                <Spinner animation="grow" variant="warning" style={{ width: '3rem', height: '3rem' }} />
                <p className="text-muted mb-0">Preparando seu café...</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-muted mb-3">
                {selectedIngredients.length === 0
                  ? 'Selecione os ingredientes e prepare o café'
                  : `${selectedIngredients.length} ingrediente(s) selecionado(s)`}
              </p>
              <Button
                variant="warning"
                size="lg"
                onClick={prepareCafe}
                disabled={selectedIngredients.length === 0 || !currentRecipe}
                className="px-5 fw-semibold"
              >
                ☕ Preparar Café
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CafePreparationGame;
