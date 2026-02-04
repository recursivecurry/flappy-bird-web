import { describe, it, expect } from 'vitest';
import { createBird, flap, updateBird, getBirdBoundingBox } from '../src/bird';
import { BIRD_START_X, BIRD_START_Y, BIRD_WIDTH, BIRD_HEIGHT, FLAP_VELOCITY, GRAVITY, MAX_VELOCITY } from '../src/config';

describe('Bird', () => {
  describe('createBird', () => {
    it('should create a bird at the starting position', () => {
      const bird = createBird();

      expect(bird.x).toBe(BIRD_START_X);
      expect(bird.y).toBe(BIRD_START_Y);
      expect(bird.velocity).toBe(0);
      expect(bird.width).toBe(BIRD_WIDTH);
      expect(bird.height).toBe(BIRD_HEIGHT);
    });
  });

  describe('flap', () => {
    it('should set velocity to negative (upward) when flapping', () => {
      const bird = createBird();
      const flappedBird = flap(bird);

      expect(flappedBird.velocity).toBe(FLAP_VELOCITY);
      expect(flappedBird.velocity).toBeLessThan(0);
    });

    it('should not modify other bird properties', () => {
      const bird = createBird();
      const flappedBird = flap(bird);

      expect(flappedBird.x).toBe(bird.x);
      expect(flappedBird.y).toBe(bird.y);
      expect(flappedBird.width).toBe(bird.width);
      expect(flappedBird.height).toBe(bird.height);
    });

    it('should allow flapping even when already moving up', () => {
      const bird = { ...createBird(), velocity: -200 };
      const flappedBird = flap(bird);

      expect(flappedBird.velocity).toBe(FLAP_VELOCITY);
    });
  });

  describe('updateBird', () => {
    it('should apply gravity to velocity over time', () => {
      const bird = createBird();
      const deltaTime = 0.016; // ~60fps
      const updatedBird = updateBird(bird, deltaTime);

      const expectedVelocity = bird.velocity + GRAVITY * deltaTime;
      expect(updatedBird.velocity).toBeCloseTo(expectedVelocity, 5);
    });

    it('should update position based on velocity', () => {
      const bird = { ...createBird(), velocity: 100 };
      const deltaTime = 0.016;
      const updatedBird = updateBird(bird, deltaTime);

      // Position should change based on average velocity during the update
      expect(updatedBird.y).toBeGreaterThan(bird.y);
    });

    it('should cap velocity at MAX_VELOCITY', () => {
      const bird = { ...createBird(), velocity: MAX_VELOCITY + 100 };
      const deltaTime = 0.016;
      const updatedBird = updateBird(bird, deltaTime);

      expect(updatedBird.velocity).toBeLessThanOrEqual(MAX_VELOCITY);
    });

    it('should allow upward movement when velocity is negative', () => {
      const bird = { ...createBird(), velocity: FLAP_VELOCITY };
      const deltaTime = 0.016;
      const updatedBird = updateBird(bird, deltaTime);

      expect(updatedBird.y).toBeLessThan(bird.y);
    });

    it('should not move horizontally (x position stays fixed)', () => {
      const bird = createBird();
      const deltaTime = 0.016;
      const updatedBird = updateBird(bird, deltaTime);

      expect(updatedBird.x).toBe(bird.x);
    });
  });

  describe('getBirdBoundingBox', () => {
    it('should return correct bounding box for collision detection', () => {
      const bird = createBird();
      const box = getBirdBoundingBox(bird);

      expect(box.x).toBe(bird.x);
      expect(box.y).toBe(bird.y);
      expect(box.width).toBe(bird.width);
      expect(box.height).toBe(bird.height);
    });

    it('should update bounding box as bird position changes', () => {
      const bird = { ...createBird(), y: 400 };
      const box = getBirdBoundingBox(bird);

      expect(box.y).toBe(400);
    });
  });
});
