import { useAppSelector } from '@/store/hooks';
import { selectPlayerStats } from '@/store/playerSlice';
import { calculateLevel, calculateXPProgress, calculateXPForNextLevel } from '@/utils/helpers';
import { GAME_CONFIG } from '@/utils/constants';

export const usePlayer = () => {
  const player = useAppSelector((s) => s.player);
  const stats = useAppSelector(selectPlayerStats);

  const level = calculateLevel(player.playerXP);
  const xpProgress = calculateXPProgress(player.playerXP);
  const xpForNextLevel = calculateXPForNextLevel();
  const xpProgressPercent = (xpProgress / xpForNextLevel) * 100;
  const isMaxLevel = level >= GAME_CONFIG.MAX_LEVEL;

  return {
    ...player,
    stats,
    level,
    xpProgress,
    xpForNextLevel,
    xpProgressPercent,
    isMaxLevel,
  };
};
