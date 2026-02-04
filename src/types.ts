export interface Bird {
  x: number;
  y: number;
  velocity: number;
  width: number;
  height: number;
}

export interface Pipe {
  x: number;
  gapY: number;
  gapHeight: number;
  width: number;
  passed: boolean;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type DifficultyLevel = 'low' | 'middle' | 'high';

export interface Difficulty {
  level: DifficultyLevel;
  gapHeight: number;
  scrollSpeed: number;
  spawnInterval: number;
}

export type GamePhase = 'menu' | 'playing' | 'paused' | 'gameOver';

export interface GameState {
  phase: GamePhase;
  difficulty: Difficulty;
  score: number;
  bird: Bird;
  pipes: Pipe[];
}
