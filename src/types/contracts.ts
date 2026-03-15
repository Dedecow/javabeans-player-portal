// CenarioDTO
export interface CenarioDTO {
  id: string;
  titulo: string;
  descricao: string;
  contextoNarrativo: string;
  objetivosPedagogicos: string[];
  dificuldade: 'FACIL' | 'MEDIO' | 'DIFICIL';
  tempoEstimado: number;
  xpRecompensa: number;
}

// AnaliseIADTO
export interface AnaliseIADTO {
  competenciaComunicativa: number; // 0-100
  feedback: string;
  sugestoes: string[];
}

// ProgressaoJogoDTO
export interface ProgressaoJogoDTO {
  xpAtual: number;
  nivelAtual: number;
}

// ResultadoTurnoDTO
export interface ResultadoTurnoDTO {
  sucesso: boolean;
  feedback: string;
  incrementoPontuacao: number;
  analiseIA: AnaliseIADTO;
  progressaoJogo: ProgressaoJogoDTO;
}

// AcaoJogadorDTO
export interface AcaoJogadorDTO {
  acao: string;
  parametros: Record<string, unknown>;
  resposta: string;
}

// SessaoDTO
export interface SessaoDTO {
  id: string;
  jogadorId: string;
  cenarioAtual: string;
  xpSessao: number;
  ativa: boolean;
  dataCriacao: string;
}
