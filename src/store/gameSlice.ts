import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CenarioDTO, ReceitaDTO, ResultadoPreparar, GameHistoryEntry } from '@/types';
import { generateId } from '@/utils/helpers';
import { GAME_CONFIG } from '@/utils/constants';

interface GameState {
  currentScenario: CenarioDTO | null;
  currentRecipe: ReceitaDTO | null;
  selectedIngredients: string[];
  gameHistory: GameHistoryEntry[];
  lastResult: ResultadoPreparar | null;
  isPreparing: boolean;
  isLoadingScenario: boolean;
  isLoadingRecipe: boolean;
}

const initialState: GameState = {
  currentScenario: null,
  currentRecipe: null,
  selectedIngredients: [],
  gameHistory: [],
  lastResult: null,
  isPreparing: false,
  isLoadingScenario: false,
  isLoadingRecipe: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScenario(state, action: PayloadAction<CenarioDTO>) {
      state.currentScenario = action.payload;
    },
    setRecipe(state, action: PayloadAction<ReceitaDTO>) {
      state.currentRecipe = action.payload;
    },
    toggleIngredient(state, action: PayloadAction<string>) {
      const ingredient = action.payload;
      const idx = state.selectedIngredients.indexOf(ingredient);
      if (idx >= 0) {
        state.selectedIngredients.splice(idx, 1);
      } else {
        state.selectedIngredients.push(ingredient);
      }
    },
    clearIngredients(state) {
      state.selectedIngredients = [];
    },
    setLastResult(state, action: PayloadAction<ResultadoPreparar>) {
      state.lastResult = action.payload;
      if (state.currentRecipe) {
        const entry: GameHistoryEntry = {
          id: generateId(),
          timestamp: new Date().toISOString(),
          receitaNome: state.currentRecipe.nome,
          sucesso: action.payload.sucesso,
          xpGanho: action.payload.xpGanho,
          ingredientesUsados: [...state.selectedIngredients],
        };
        state.gameHistory.unshift(entry);
        if (state.gameHistory.length > GAME_CONFIG.MAX_HISTORY_ENTRIES) {
          state.gameHistory.pop();
        }
      }
    },
    setIsPreparing(state, action: PayloadAction<boolean>) {
      state.isPreparing = action.payload;
    },
    setIsLoadingScenario(state, action: PayloadAction<boolean>) {
      state.isLoadingScenario = action.payload;
    },
    setIsLoadingRecipe(state, action: PayloadAction<boolean>) {
      state.isLoadingRecipe = action.payload;
    },
    resetGame(state) {
      state.currentScenario = null;
      state.currentRecipe = null;
      state.selectedIngredients = [];
      state.lastResult = null;
    },
    clearHistory(state) {
      state.gameHistory = [];
    },
  },
});

export const {
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
} = gameSlice.actions;

export default gameSlice.reducer;
