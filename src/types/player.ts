export interface PlayerProfile {
  sessionId: string;
  playerName?: string;
  avatarUrl?: string;
  level: number;
  totalXP: number;
  recipesPrepared: number;
  successRate: number;
  playTimeMs: number;
  joinedAt: string;
  lastActivityAt: string;
}

export interface PlayerAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface PlayerStats {
  totalXP: number;
  recipesPrepared: number;
  successfulPreparations: number;
  failedPreparations: number;
  successRate: number;
  playTimeMs: number;
  averageXPPerRecipe: number;
  longestStreak: number;
  currentStreak: number;
}

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  totalXP: number;
  recipesPrepared: number;
  successRate: number;
}
