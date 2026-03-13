import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { gameService } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setScenario,
  setRecipe,
  toggleIngredient,
  clearIngredients,
  setLastResult,
  setIsPreparing,
  setIsLoadingScenario,
  setIsLoadingRecipe,
  resetGame,
  clearHistory,
} from '@/store/gameSlice';
import { recordPreparation } from '@/store/playerSlice';

export const useGame = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((s) => s.game);

  const loadScenario = useCallback(async () => {
    dispatch(setIsLoadingScenario(true));
    try {
      const scenario = await gameService.getInitialScenario();
      dispatch(setScenario(scenario));
      if (scenario.receitaAtual) {
        dispatch(setRecipe(scenario.receitaAtual));
      }
      toast.success('Cenário carregado com sucesso!');
    } catch {
      toast.error('Erro ao carregar cenário. Tente novamente.');
    } finally {
      dispatch(setIsLoadingScenario(false));
    }
  }, [dispatch]);

  const loadNextRecipe = useCallback(async () => {
    dispatch(setIsLoadingRecipe(true));
    try {
      const recipe = await gameService.getNextRecipe();
      dispatch(setRecipe(recipe));
      dispatch(clearIngredients());
      toast.info(`Nova receita: ${recipe.nome}`);
    } catch {
      toast.error('Erro ao carregar próxima receita.');
    } finally {
      dispatch(setIsLoadingRecipe(false));
    }
  }, [dispatch]);

  const prepareCafe = useCallback(async () => {
    if (game.selectedIngredients.length === 0) {
      toast.warning('Selecione pelo menos um ingrediente!');
      return;
    }
    dispatch(setIsPreparing(true));
    try {
      const result = await gameService.prepareCafe({
        ingredientes: game.selectedIngredients,
      });
      dispatch(setLastResult(result));
      dispatch(recordPreparation({ sucesso: result.sucesso, xpGanho: result.xpGanho }));
      if (result.sucesso) {
        toast.success(`Café preparado com sucesso! +${result.xpGanho} XP`);
      } else {
        toast.error(`Café mal preparado. ${result.mensagem}`);
      }
      dispatch(clearIngredients());
    } catch {
      toast.error('Erro ao preparar café. Verifique a conexão.');
    } finally {
      dispatch(setIsPreparing(false));
    }
  }, [dispatch, game.selectedIngredients]);

  const handleToggleIngredient = useCallback(
    (ingredient: string) => {
      dispatch(toggleIngredient(ingredient));
    },
    [dispatch]
  );

  const handleResetGame = useCallback(() => {
    dispatch(resetGame());
    dispatch(clearIngredients());
    toast.info('Jogo reiniciado.');
  }, [dispatch]);

  const handleClearHistory = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  return {
    ...game,
    loadScenario,
    loadNextRecipe,
    prepareCafe,
    toggleIngredient: handleToggleIngredient,
    clearIngredients: () => dispatch(clearIngredients()),
    resetGame: handleResetGame,
    clearHistory: handleClearHistory,
  };
};
