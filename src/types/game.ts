export interface DominioDTO {
  id: number;
  nome: string;
  descricao?: string;
}

export interface IngredienteDTO {
  id: number;
  nome: string;
  descricao?: string;
  quantidade?: number;
}

export interface ReceitaDTO {
  id: number;
  nome: string;
  descricao: string;
  dificuldade?: number;
  ingredientes: IngredienteDTO[];
  xpRecompensa?: number;
  tempoPreparoMs?: number;
  clienteNome?: string;
  clienteDescricao?: string;
}

export interface CenarioDTO {
  id: number;
  titulo: string;
  narrativa: string;
  dominio?: DominioDTO;
  receitaAtual?: ReceitaDTO;
  nivel?: number;
}

export interface ResultadoPreparar {
  sucesso: boolean;
  mensagem: string;
  xpGanho: number;
  feedbackIA?: string;
  proximaReceita?: ReceitaDTO;
  detalhes?: Record<string, unknown>;
}

export interface PrepararCafeRequest {
  ingredientes: string[];
  sessionId?: string;
}

export interface GameHistoryEntry {
  id: string;
  timestamp: string;
  receitaNome: string;
  sucesso: boolean;
  xpGanho: number;
  ingredientesUsados: string[];
}
