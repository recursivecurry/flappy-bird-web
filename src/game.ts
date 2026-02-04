import type { GameState, DifficultyLevel, Pipe } from './types';
import { DIFFICULTY_PRESETS, BIRD_START_X } from './config';
import { createBird, updateBird, flap, getBirdBoundingBox } from './bird';
import { createPipe, updatePipe, isPipeOffScreen, getTopPipeRect, getBottomPipeRect } from './pipe';
import { checkCollision, checkBoundaryCollision } from './collision';

export function createGameState(): GameState {
  return {
    phase: 'menu',
    difficulty: DIFFICULTY_PRESETS.middle,
    score: 0,
    bird: createBird(),
    pipes: [],
  };
}

export function transitionToPlaying(state: GameState, difficultyLevel: DifficultyLevel): GameState {
  return {
    ...state,
    phase: 'playing',
    difficulty: DIFFICULTY_PRESETS[difficultyLevel],
    score: 0,
    bird: createBird(),
    pipes: [],
  };
}

export function transitionToGameOver(state: GameState): GameState {
  return {
    ...state,
    phase: 'gameOver',
  };
}

export function transitionToPaused(state: GameState): GameState {
  return {
    ...state,
    phase: 'paused',
  };
}

export function transitionToMenu(state: GameState): GameState {
  return {
    ...state,
    phase: 'menu',
    score: 0,
    bird: createBird(),
    pipes: [],
  };
}

export function transitionToResumed(state: GameState): GameState {
  return {
    ...state,
    phase: 'playing',
  };
}

export function handleFlap(state: GameState): GameState {
  if (state.phase !== 'playing') {
    return state;
  }

  return {
    ...state,
    bird: flap(state.bird),
  };
}

export function spawnPipe(state: GameState): GameState {
  const newPipe = createPipe(state.difficulty.gapHeight);

  return {
    ...state,
    pipes: [...state.pipes, newPipe],
  };
}

export function updateGameState(state: GameState, deltaTime: number): GameState {
  if (state.phase !== 'playing') {
    return state;
  }

  // Update bird
  const updatedBird = updateBird(state.bird, deltaTime);
  const birdBox = getBirdBoundingBox(updatedBird);

  // Check boundary collision
  if (checkBoundaryCollision(birdBox)) {
    return transitionToGameOver({ ...state, bird: updatedBird });
  }

  // Update pipes and check collisions
  let newScore = state.score;
  const updatedPipes: Pipe[] = [];

  for (const pipe of state.pipes) {
    const updatedPipe = updatePipe(pipe, deltaTime, state.difficulty.scrollSpeed);

    // Check pipe collision
    const topPipeRect = getTopPipeRect(updatedPipe);
    const bottomPipeRect = getBottomPipeRect(updatedPipe);

    if (checkCollision(birdBox, topPipeRect) || checkCollision(birdBox, bottomPipeRect)) {
      return transitionToGameOver({ ...state, bird: updatedBird, pipes: updatedPipes });
    }

    // Check if bird passed pipe for scoring
    if (!updatedPipe.passed && updatedPipe.x + updatedPipe.width < BIRD_START_X) {
      updatedPipe.passed = true;
      newScore++;
    }

    // Keep pipe if still on screen
    if (!isPipeOffScreen(updatedPipe)) {
      updatedPipes.push(updatedPipe);
    }
  }

  return {
    ...state,
    bird: updatedBird,
    pipes: updatedPipes,
    score: newScore,
  };
}

export class GameLoop {
  private state: GameState;
  private ctx: CanvasRenderingContext2D;
  private lastTimestamp: number = 0;
  private lastPipeSpawn: number = 0;
  private animationFrameId: number | null = null;
  private renderFn: (ctx: CanvasRenderingContext2D, state: GameState) => void;

  constructor(
    ctx: CanvasRenderingContext2D,
    renderFn: (ctx: CanvasRenderingContext2D, state: GameState) => void
  ) {
    this.ctx = ctx;
    this.renderFn = renderFn;
    this.state = createGameState();
  }

  getState(): GameState {
    return this.state;
  }

  setState(state: GameState): void {
    this.state = state;
  }

  start(): void {
    this.lastTimestamp = performance.now();
    this.lastPipeSpawn = this.lastTimestamp;
    this.loop(this.lastTimestamp);
  }

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private loop = (timestamp: number): void => {
    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Convert to seconds
    this.lastTimestamp = timestamp;

    // Update game state
    if (this.state.phase === 'playing') {
      this.state = updateGameState(this.state, deltaTime);

      // Spawn pipes at intervals
      if (timestamp - this.lastPipeSpawn >= this.state.difficulty.spawnInterval) {
        this.state = spawnPipe(this.state);
        this.lastPipeSpawn = timestamp;
      }
    }

    // Render
    this.renderFn(this.ctx, this.state);

    // Continue loop
    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  handleFlap(): void {
    this.state = handleFlap(this.state);
  }

  startGame(difficulty: DifficultyLevel): void {
    this.state = transitionToPlaying(this.state, difficulty);
    this.lastPipeSpawn = performance.now();
  }

  pauseGame(): void {
    this.state = transitionToPaused(this.state);
  }

  resumeGame(): void {
    this.state = transitionToResumed(this.state);
    this.lastTimestamp = performance.now();
  }

  restartGame(): void {
    this.state = transitionToMenu(this.state);
  }
}
