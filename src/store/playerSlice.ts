import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PlayerStats, PlayerAchievement } from '@/types';

interface PlayerState {
  sessionId: string | null;
  playerName: string;
  playerXP: number;
  recipesPrepared: number;
  successfulPreparations: number;
  failedPreparations: number;
  playTimeMs: number;
  joinedAt: string | null;
  achievements: PlayerAchievement[];
  currentStreak: number;
  longestStreak: number;
}

const initialState: PlayerState = {
  sessionId: null,
  playerName: 'Barista',
  playerXP: 0,
  recipesPrepared: 0,
  successfulPreparations: 0,
  failedPreparations: 0,
  playTimeMs: 0,
  joinedAt: null,
  achievements: [],
  currentStreak: 0,
  longestStreak: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
      if (!state.joinedAt) {
        state.joinedAt = new Date().toISOString();
      }
    },
    setPlayerName(state, action: PayloadAction<string>) {
      state.playerName = action.payload;
    },
    addXP(state, action: PayloadAction<number>) {
      state.playerXP += action.payload;
    },
    recordPreparation(state, action: PayloadAction<{ sucesso: boolean; xpGanho: number }>) {
      state.recipesPrepared += 1;
      state.playerXP += action.payload.xpGanho;
      if (action.payload.sucesso) {
        state.successfulPreparations += 1;
        state.currentStreak += 1;
        if (state.currentStreak > state.longestStreak) {
          state.longestStreak = state.currentStreak;
        }
      } else {
        state.failedPreparations += 1;
        state.currentStreak = 0;
      }
    },
    addPlayTime(state, action: PayloadAction<number>) {
      state.playTimeMs += action.payload;
    },
    unlockAchievement(state, action: PayloadAction<string>) {
      const achievement = state.achievements.find((a) => a.id === action.payload);
      if (achievement) {
        achievement.isUnlocked = true;
        achievement.unlockedAt = new Date().toISOString();
      }
    },
    resetPlayer(state) {
      state.playerXP = 0;
      state.recipesPrepared = 0;
      state.successfulPreparations = 0;
      state.failedPreparations = 0;
      state.playTimeMs = 0;
      state.currentStreak = 0;
    },
  },
});

export const {
  setSessionId,
  setPlayerName,
  addXP,
  recordPreparation,
  addPlayTime,
  unlockAchievement,
  resetPlayer,
} = playerSlice.actions;

export const selectPlayerStats = (state: { player: PlayerState }): PlayerStats => ({
  totalXP: state.player.playerXP,
  recipesPrepared: state.player.recipesPrepared,
  successfulPreparations: state.player.successfulPreparations,
  failedPreparations: state.player.failedPreparations,
  successRate:
    state.player.recipesPrepared > 0
      ? state.player.successfulPreparations / state.player.recipesPrepared
      : 0,
  playTimeMs: state.player.playTimeMs,
  averageXPPerRecipe:
    state.player.recipesPrepared > 0
      ? state.player.playerXP / state.player.recipesPrepared
      : 0,
  longestStreak: state.player.longestStreak,
  currentStreak: state.player.currentStreak,
});

export default playerSlice.reducer;
