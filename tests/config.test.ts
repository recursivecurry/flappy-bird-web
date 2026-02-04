import { describe, it, expect } from 'vitest';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BIRD_WIDTH,
  BIRD_HEIGHT,
  BIRD_START_X,
  BIRD_START_Y,
  GRAVITY,
  FLAP_VELOCITY,
  MAX_VELOCITY,
  PIPE_WIDTH,
  MIN_GAP_Y,
  MAX_GAP_Y,
  DIFFICULTY_PRESETS,
} from '../src/config';

describe('Game Configuration', () => {
  describe('Canvas Constants', () => {
    it('should have valid canvas dimensions', () => {
      expect(CANVAS_WIDTH).toBe(400);
      expect(CANVAS_HEIGHT).toBe(600);
    });
  });

  describe('Bird Constants', () => {
    it('should have valid bird dimensions', () => {
      expect(BIRD_WIDTH).toBe(34);
      expect(BIRD_HEIGHT).toBe(24);
    });

    it('should have valid bird starting position', () => {
      expect(BIRD_START_X).toBe(80);
      expect(BIRD_START_Y).toBe(300);
      expect(BIRD_START_Y).toBeLessThan(CANVAS_HEIGHT);
    });
  });

  describe('Physics Constants', () => {
    it('should have gravity as positive value (pulling down)', () => {
      expect(GRAVITY).toBe(1200);
      expect(GRAVITY).toBeGreaterThan(0);
    });

    it('should have flap velocity as negative value (upward)', () => {
      expect(FLAP_VELOCITY).toBe(-400);
      expect(FLAP_VELOCITY).toBeLessThan(0);
    });

    it('should have max velocity greater than flap velocity magnitude', () => {
      expect(MAX_VELOCITY).toBe(600);
      expect(MAX_VELOCITY).toBeGreaterThan(Math.abs(FLAP_VELOCITY));
    });
  });

  describe('Pipe Constants', () => {
    it('should have valid pipe width', () => {
      expect(PIPE_WIDTH).toBe(52);
    });

    it('should have valid gap Y range', () => {
      expect(MIN_GAP_Y).toBe(100);
      expect(MAX_GAP_Y).toBe(500);
      expect(MIN_GAP_Y).toBeLessThan(MAX_GAP_Y);
      expect(MAX_GAP_Y).toBeLessThan(CANVAS_HEIGHT);
    });
  });

  describe('Difficulty Presets', () => {
    it('should have all three difficulty levels', () => {
      expect(DIFFICULTY_PRESETS.low).toBeDefined();
      expect(DIFFICULTY_PRESETS.middle).toBeDefined();
      expect(DIFFICULTY_PRESETS.high).toBeDefined();
    });

    it('should have correct low difficulty settings', () => {
      const low = DIFFICULTY_PRESETS.low;
      expect(low.level).toBe('low');
      expect(low.gapHeight).toBe(180);
      expect(low.scrollSpeed).toBe(120);
      expect(low.spawnInterval).toBe(2000);
    });

    it('should have correct middle difficulty settings', () => {
      const middle = DIFFICULTY_PRESETS.middle;
      expect(middle.level).toBe('middle');
      expect(middle.gapHeight).toBe(140);
      expect(middle.scrollSpeed).toBe(180);
      expect(middle.spawnInterval).toBe(1600);
    });

    it('should have correct high difficulty settings', () => {
      const high = DIFFICULTY_PRESETS.high;
      expect(high.level).toBe('high');
      expect(high.gapHeight).toBe(100);
      expect(high.scrollSpeed).toBe(240);
      expect(high.spawnInterval).toBe(1200);
    });

    it('should have decreasing gap heights as difficulty increases', () => {
      expect(DIFFICULTY_PRESETS.low.gapHeight).toBeGreaterThan(DIFFICULTY_PRESETS.middle.gapHeight);
      expect(DIFFICULTY_PRESETS.middle.gapHeight).toBeGreaterThan(DIFFICULTY_PRESETS.high.gapHeight);
    });

    it('should have increasing scroll speeds as difficulty increases', () => {
      expect(DIFFICULTY_PRESETS.low.scrollSpeed).toBeLessThan(DIFFICULTY_PRESETS.middle.scrollSpeed);
      expect(DIFFICULTY_PRESETS.middle.scrollSpeed).toBeLessThan(DIFFICULTY_PRESETS.high.scrollSpeed);
    });

    it('should have decreasing spawn intervals as difficulty increases', () => {
      expect(DIFFICULTY_PRESETS.low.spawnInterval).toBeGreaterThan(DIFFICULTY_PRESETS.middle.spawnInterval);
      expect(DIFFICULTY_PRESETS.middle.spawnInterval).toBeGreaterThan(DIFFICULTY_PRESETS.high.spawnInterval);
    });
  });
});
