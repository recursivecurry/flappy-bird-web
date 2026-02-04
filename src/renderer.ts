import type { GameState, Bird, Pipe, DifficultyLevel } from './types';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './config';

// Colors
const SKY_COLOR = '#70c5ce';
const BIRD_COLOR = '#f7dc6f';
const BIRD_BEAK_COLOR = '#e74c3c';
const PIPE_COLOR = '#27ae60';
const PIPE_BORDER_COLOR = '#1e8449';
const TEXT_COLOR = '#ffffff';
const SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';

export function clearCanvas(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = SKY_COLOR;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function drawBird(ctx: CanvasRenderingContext2D, bird: Bird): void {
  const { x, y, width, height } = bird;

  // Bird body (yellow oval)
  ctx.fillStyle = BIRD_COLOR;
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bird eye (white circle with black pupil)
  const eyeX = x + width * 0.65;
  const eyeY = y + height * 0.35;
  const eyeRadius = 5;

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(eyeX + 1, eyeY, eyeRadius * 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Bird beak (orange triangle)
  ctx.fillStyle = BIRD_BEAK_COLOR;
  ctx.beginPath();
  ctx.moveTo(x + width, y + height * 0.4);
  ctx.lineTo(x + width + 8, y + height * 0.5);
  ctx.lineTo(x + width, y + height * 0.6);
  ctx.closePath();
  ctx.fill();
}

export function drawPipe(ctx: CanvasRenderingContext2D, pipe: Pipe): void {
  const { x, gapY, gapHeight, width } = pipe;
  const gapTop = gapY - gapHeight / 2;
  const gapBottom = gapY + gapHeight / 2;

  // Top pipe
  ctx.fillStyle = PIPE_COLOR;
  ctx.fillRect(x, 0, width, gapTop);

  // Top pipe border
  ctx.fillStyle = PIPE_BORDER_COLOR;
  ctx.fillRect(x - 3, gapTop - 20, width + 6, 20);

  // Bottom pipe
  ctx.fillStyle = PIPE_COLOR;
  ctx.fillRect(x, gapBottom, width, CANVAS_HEIGHT - gapBottom);

  // Bottom pipe border
  ctx.fillStyle = PIPE_BORDER_COLOR;
  ctx.fillRect(x - 3, gapBottom, width + 6, 20);
}

export function drawScore(ctx: CanvasRenderingContext2D, score: number): void {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(score.toString(), CANVAS_WIDTH / 2 + 2, 62);

  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(score.toString(), CANVAS_WIDTH / 2, 60);
}

export function drawMenuScreen(ctx: CanvasRenderingContext2D): void {
  clearCanvas(ctx);

  // Title
  ctx.fillStyle = SHADOW_COLOR;
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Flappy Bird', CANVAS_WIDTH / 2 + 2, 102);

  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText('Flappy Bird', CANVAS_WIDTH / 2, 100);

  // Subtitle
  ctx.font = '20px Arial';
  ctx.fillText('Select Difficulty', CANVAS_WIDTH / 2, 150);

  // Difficulty buttons
  const buttonWidth = 120;
  const buttonHeight = 40;
  const buttonSpacing = 20;
  const startY = CANVAS_HEIGHT / 2 - 20;
  const buttonX = (CANVAS_WIDTH - buttonWidth) / 2;

  const difficulties: { label: string; level: DifficultyLevel; color: string }[] = [
    { label: 'Easy', level: 'low', color: '#2ecc71' },
    { label: 'Medium', level: 'middle', color: '#f39c12' },
    { label: 'Hard', level: 'high', color: '#e74c3c' },
  ];

  difficulties.forEach((diff, index) => {
    const y = startY + index * (buttonHeight + buttonSpacing);

    // Button background
    ctx.fillStyle = diff.color;
    ctx.fillRect(buttonX, y, buttonWidth, buttonHeight);

    // Button border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(buttonX, y, buttonWidth, buttonHeight);

    // Button text
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = 'bold 18px Arial';
    ctx.fillText(diff.label, CANVAS_WIDTH / 2, y + 27);
  });
}

export function drawGameOverScreen(ctx: CanvasRenderingContext2D, score: number): void {
  // Semi-transparent overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Game Over text
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);

  // Final score
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

  // Restart instruction
  ctx.font = '18px Arial';
  ctx.fillText('Click to Play Again', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
}

export function drawPausedScreen(ctx: CanvasRenderingContext2D): void {
  // Semi-transparent overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Paused text
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Paused', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

  // Resume instruction
  ctx.font = '18px Arial';
  ctx.fillText('Tap to Resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
}

export function render(ctx: CanvasRenderingContext2D, state: GameState): void {
  if (state.phase === 'menu') {
    drawMenuScreen(ctx);
    return;
  }

  // Clear and draw background
  clearCanvas(ctx);

  // Draw pipes
  state.pipes.forEach(pipe => drawPipe(ctx, pipe));

  // Draw bird
  drawBird(ctx, state.bird);

  // Draw score during gameplay
  if (state.phase === 'playing' || state.phase === 'paused') {
    drawScore(ctx, state.score);
  }

  // Draw overlays for paused/game over states
  if (state.phase === 'gameOver') {
    drawGameOverScreen(ctx, state.score);
  } else if (state.phase === 'paused') {
    drawPausedScreen(ctx);
  }
}
