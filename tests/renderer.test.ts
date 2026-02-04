import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock canvas context
function createMockContext(): CanvasRenderingContext2D {
  return {
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    font: '',
    textAlign: 'left',
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    ellipse: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

describe('Renderer', () => {
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    ctx = createMockContext();
  });

  describe('Menu Screen', () => {
    it('should render menu with title and difficulty buttons', async () => {
      const { drawMenuScreen } = await import('../src/renderer');

      drawMenuScreen(ctx);

      // Check that fillText was called (for title and buttons)
      expect(ctx.fillText).toHaveBeenCalled();
      // Check that fillRect was called (for buttons)
      expect(ctx.fillRect).toHaveBeenCalled();
    });
  });

  describe('Game Screen', () => {
    it('should render bird with body and beak', async () => {
      const { drawBird } = await import('../src/renderer');
      const bird = { x: 80, y: 300, velocity: 0, width: 34, height: 24 };

      drawBird(ctx, bird);

      // Check ellipse was called for bird body
      expect(ctx.ellipse).toHaveBeenCalled();
      // Check arc was called for eye
      expect(ctx.arc).toHaveBeenCalled();
      // Check fill was called
      expect(ctx.fill).toHaveBeenCalled();
    });

    it('should render pipe with top and bottom sections', async () => {
      const { drawPipe } = await import('../src/renderer');
      const pipe = { x: 200, gapY: 300, gapHeight: 140, width: 52, passed: false };

      drawPipe(ctx, pipe);

      // fillRect should be called for top pipe, bottom pipe, and borders
      expect(ctx.fillRect).toHaveBeenCalled();
    });

    it('should render score display', async () => {
      const { drawScore } = await import('../src/renderer');

      drawScore(ctx, 5);

      expect(ctx.fillText).toHaveBeenCalledWith('5', expect.any(Number), expect.any(Number));
    });
  });

  describe('Game Over Screen', () => {
    it('should render game over overlay with final score', async () => {
      const { drawGameOverScreen } = await import('../src/renderer');

      drawGameOverScreen(ctx, 10);

      // Check overlay was drawn
      expect(ctx.fillRect).toHaveBeenCalled();
      // Check text was drawn
      expect(ctx.fillText).toHaveBeenCalledWith('Game Over', expect.any(Number), expect.any(Number));
      expect(ctx.fillText).toHaveBeenCalledWith('Score: 10', expect.any(Number), expect.any(Number));
    });
  });

  describe('Paused Screen', () => {
    it('should render paused overlay with resume message', async () => {
      const { drawPausedScreen } = await import('../src/renderer');

      drawPausedScreen(ctx);

      // Check overlay was drawn
      expect(ctx.fillRect).toHaveBeenCalled();
      // Check paused text was drawn
      expect(ctx.fillText).toHaveBeenCalledWith('Paused', expect.any(Number), expect.any(Number));
      expect(ctx.fillText).toHaveBeenCalledWith('Tap to Resume', expect.any(Number), expect.any(Number));
    });
  });

  describe('Full Render', () => {
    it('should render menu screen when in menu phase', async () => {
      const { render } = await import('../src/renderer');
      const { createGameState } = await import('../src/game');

      const state = createGameState();
      expect(state.phase).toBe('menu');

      render(ctx, state);

      // Menu should show title
      expect(ctx.fillText).toHaveBeenCalled();
    });

    it('should render bird and pipes when playing', async () => {
      const { render } = await import('../src/renderer');
      const { createGameState, transitionToPlaying } = await import('../src/game');

      let state = createGameState();
      state = transitionToPlaying(state, 'middle');
      state.pipes = [{ x: 200, gapY: 300, gapHeight: 140, width: 52, passed: false }];

      render(ctx, state);

      // Bird should be drawn (ellipse for body)
      expect(ctx.ellipse).toHaveBeenCalled();
      // Pipes should be drawn
      expect(ctx.fillRect).toHaveBeenCalled();
    });
  });
});
