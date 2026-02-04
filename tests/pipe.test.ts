import { describe, it, expect } from 'vitest';
import { createPipe, updatePipe, isPipeOffScreen, getTopPipeRect, getBottomPipeRect } from '../src/pipe';
import { CANVAS_WIDTH, CANVAS_HEIGHT, PIPE_WIDTH, MIN_GAP_Y, MAX_GAP_Y } from '../src/config';

describe('Pipe', () => {
  describe('createPipe', () => {
    it('should create a pipe at the right edge of the screen', () => {
      const pipe = createPipe(140);

      expect(pipe.x).toBe(CANVAS_WIDTH);
      expect(pipe.width).toBe(PIPE_WIDTH);
      expect(pipe.passed).toBe(false);
    });

    it('should create pipe with specified gap height', () => {
      const gapHeight = 180;
      const pipe = createPipe(gapHeight);

      expect(pipe.gapHeight).toBe(gapHeight);
    });

    it('should create pipe with random gap Y position within valid range', () => {
      // Create multiple pipes to test randomness
      const pipes = Array.from({ length: 20 }, () => createPipe(140));

      pipes.forEach(pipe => {
        expect(pipe.gapY).toBeGreaterThanOrEqual(MIN_GAP_Y);
        expect(pipe.gapY).toBeLessThanOrEqual(MAX_GAP_Y);
      });
    });
  });

  describe('updatePipe', () => {
    it('should move pipe to the left based on scroll speed and delta time', () => {
      const pipe = createPipe(140);
      const scrollSpeed = 180;
      const deltaTime = 0.016;

      const updatedPipe = updatePipe(pipe, deltaTime, scrollSpeed);

      const expectedX = pipe.x - scrollSpeed * deltaTime;
      expect(updatedPipe.x).toBeCloseTo(expectedX, 5);
    });

    it('should not modify other pipe properties during update', () => {
      const pipe = createPipe(140);
      const updatedPipe = updatePipe(pipe, 0.016, 180);

      expect(updatedPipe.gapY).toBe(pipe.gapY);
      expect(updatedPipe.gapHeight).toBe(pipe.gapHeight);
      expect(updatedPipe.width).toBe(pipe.width);
      expect(updatedPipe.passed).toBe(pipe.passed);
    });
  });

  describe('isPipeOffScreen', () => {
    it('should return false when pipe is visible', () => {
      const pipe = createPipe(140);

      expect(isPipeOffScreen(pipe)).toBe(false);
    });

    it('should return true when pipe has completely left the screen', () => {
      const pipe = { ...createPipe(140), x: -PIPE_WIDTH - 1 };

      expect(isPipeOffScreen(pipe)).toBe(true);
    });

    it('should return false when pipe is partially visible', () => {
      const pipe = { ...createPipe(140), x: -PIPE_WIDTH + 1 };

      expect(isPipeOffScreen(pipe)).toBe(false);
    });
  });

  describe('getTopPipeRect', () => {
    it('should return bounding box for top pipe section', () => {
      const pipe = { ...createPipe(140), gapY: 300 };
      const rect = getTopPipeRect(pipe);

      expect(rect.x).toBe(pipe.x);
      expect(rect.y).toBe(0);
      expect(rect.width).toBe(pipe.width);
      expect(rect.height).toBe(pipe.gapY - pipe.gapHeight / 2);
    });

    it('should have height ending at gap opening', () => {
      const pipe = { ...createPipe(140), gapY: 250 };
      const rect = getTopPipeRect(pipe);

      const gapTop = pipe.gapY - pipe.gapHeight / 2;
      expect(rect.height).toBe(gapTop);
    });
  });

  describe('getBottomPipeRect', () => {
    it('should return bounding box for bottom pipe section', () => {
      const pipe = { ...createPipe(140), gapY: 300 };
      const rect = getBottomPipeRect(pipe);

      const gapBottom = pipe.gapY + pipe.gapHeight / 2;
      expect(rect.x).toBe(pipe.x);
      expect(rect.y).toBe(gapBottom);
      expect(rect.width).toBe(pipe.width);
      expect(rect.height).toBe(CANVAS_HEIGHT - gapBottom);
    });

    it('should have y starting at gap bottom', () => {
      const pipe = { ...createPipe(140), gapY: 350 };
      const rect = getBottomPipeRect(pipe);

      const gapBottom = pipe.gapY + pipe.gapHeight / 2;
      expect(rect.y).toBe(gapBottom);
    });
  });
});
