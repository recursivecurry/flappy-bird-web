import { describe, it, expect } from 'vitest';
import { checkCollision, checkBoundaryCollision } from '../src/collision';
import type { BoundingBox } from '../src/types';
import { CANVAS_HEIGHT } from '../src/config';

describe('Collision Detection', () => {
  describe('checkCollision (AABB)', () => {
    it('should return true when two rectangles overlap', () => {
      const rect1: BoundingBox = { x: 100, y: 100, width: 50, height: 50 };
      const rect2: BoundingBox = { x: 120, y: 120, width: 50, height: 50 };

      expect(checkCollision(rect1, rect2)).toBe(true);
    });

    it('should return false when rectangles do not overlap', () => {
      const rect1: BoundingBox = { x: 100, y: 100, width: 50, height: 50 };
      const rect2: BoundingBox = { x: 200, y: 200, width: 50, height: 50 };

      expect(checkCollision(rect1, rect2)).toBe(false);
    });

    it('should return true when rectangles share an edge', () => {
      const rect1: BoundingBox = { x: 100, y: 100, width: 50, height: 50 };
      const rect2: BoundingBox = { x: 149, y: 100, width: 50, height: 50 };

      expect(checkCollision(rect1, rect2)).toBe(true);
    });

    it('should return false when rectangles are adjacent but not touching', () => {
      const rect1: BoundingBox = { x: 100, y: 100, width: 50, height: 50 };
      const rect2: BoundingBox = { x: 151, y: 100, width: 50, height: 50 };

      expect(checkCollision(rect1, rect2)).toBe(false);
    });

    it('should return true when one rectangle is inside another', () => {
      const outer: BoundingBox = { x: 100, y: 100, width: 100, height: 100 };
      const inner: BoundingBox = { x: 120, y: 120, width: 30, height: 30 };

      expect(checkCollision(outer, inner)).toBe(true);
    });

    it('should detect horizontal overlap only', () => {
      const rect1: BoundingBox = { x: 100, y: 100, width: 50, height: 50 };
      const rect2: BoundingBox = { x: 120, y: 200, width: 50, height: 50 };

      expect(checkCollision(rect1, rect2)).toBe(false);
    });

    it('should detect vertical overlap only', () => {
      const rect1: BoundingBox = { x: 100, y: 100, width: 50, height: 50 };
      const rect2: BoundingBox = { x: 200, y: 120, width: 50, height: 50 };

      expect(checkCollision(rect1, rect2)).toBe(false);
    });
  });

  describe('checkBoundaryCollision', () => {
    it('should return true when bird hits the ground (y + height > canvas height)', () => {
      const bird: BoundingBox = { x: 80, y: CANVAS_HEIGHT - 10, width: 34, height: 24 };

      expect(checkBoundaryCollision(bird)).toBe(true);
    });

    it('should return true when bird hits the ceiling (y < 0)', () => {
      const bird: BoundingBox = { x: 80, y: -5, width: 34, height: 24 };

      expect(checkBoundaryCollision(bird)).toBe(true);
    });

    it('should return false when bird is within bounds', () => {
      const bird: BoundingBox = { x: 80, y: 300, width: 34, height: 24 };

      expect(checkBoundaryCollision(bird)).toBe(false);
    });

    it('should return false when bird is at the top edge but not past it', () => {
      const bird: BoundingBox = { x: 80, y: 0, width: 34, height: 24 };

      expect(checkBoundaryCollision(bird)).toBe(false);
    });

    it('should return false when bird is at the bottom edge but not past it', () => {
      const bird: BoundingBox = { x: 80, y: CANVAS_HEIGHT - 24, width: 34, height: 24 };

      expect(checkBoundaryCollision(bird)).toBe(false);
    });
  });
});
