import { CANVAS_WIDTH, CANVAS_HEIGHT } from './config';
import { GameLoop } from './game';
import { render } from './renderer';
import { getDifficultyFromClick } from './input';

function initGame(): void {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) {
    throw new Error('Canvas element not found');
  }

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get 2D context');
  }

  // Create game loop
  const gameLoop = new GameLoop(ctx, render);

  // Handle clicks based on game state
  const handleInteraction = (event: MouseEvent | TouchEvent): void => {
    const state = gameLoop.getState();

    // Get click position
    let x: number, y: number;
    if (event instanceof MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      x = (event.clientX - rect.left) * (canvas.width / rect.width);
      y = (event.clientY - rect.top) * (canvas.height / rect.height);
    } else {
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      x = (touch.clientX - rect.left) * (canvas.width / rect.width);
      y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    }

    switch (state.phase) {
      case 'menu': {
        const difficulty = getDifficultyFromClick(x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
        if (difficulty) {
          gameLoop.startGame(difficulty);
        }
        break;
      }
      case 'playing':
        gameLoop.handleFlap();
        break;
      case 'paused':
        gameLoop.resumeGame();
        break;
      case 'gameOver':
        gameLoop.restartGame();
        break;
    }
  };

  // Handle keyboard input
  const handleKeyboard = (event: KeyboardEvent): void => {
    if (event.code === 'Space' || event.code === 'Enter' || event.code === 'ArrowUp') {
      event.preventDefault();
      const state = gameLoop.getState();

      switch (state.phase) {
        case 'playing':
          gameLoop.handleFlap();
          break;
        case 'paused':
          gameLoop.resumeGame();
          break;
        case 'gameOver':
          gameLoop.restartGame();
          break;
      }
    }
  };

  // Handle window resize - pause the game
  const handleResize = (): void => {
    const state = gameLoop.getState();
    if (state.phase === 'playing') {
      gameLoop.pauseGame();
    }
  };

  // Add event listeners
  canvas.addEventListener('click', handleInteraction);
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleInteraction(e);
  }, { passive: false });
  document.addEventListener('keydown', handleKeyboard);
  window.addEventListener('resize', handleResize);

  // Start game loop
  gameLoop.start();
}

// Initialize game when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
