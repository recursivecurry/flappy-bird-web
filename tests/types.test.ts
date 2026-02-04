import { describe, it, expect } from 'vitest';
import type { Bird, Pipe, GameState, Difficulty, BoundingBox, GamePhase, DifficultyLevel } from '../src/types';

describe('Type Definitions', () => {
  describe('Bird', () => {
    it('should have required properties for bird entity', () => {
      const bird: Bird = {
        x: 80,
        y: 300,
        velocity: 0,
        width: 34,
        height: 24,
      };

      expect(bird.x).toBe(80);
      expect(bird.y).toBe(300);
      expect(bird.velocity).toBe(0);
      expect(bird.width).toBe(34);
      expect(bird.height).toBe(24);
    });
  });

  describe('Pipe', () => {
    it('should have required properties for pipe entity', () => {
      const pipe: Pipe = {
        x: 400,
        gapY: 300,
        gapHeight: 140,
        width: 52,
        passed: false,
      };

      expect(pipe.x).toBe(400);
      expect(pipe.gapY).toBe(300);
      expect(pipe.gapHeight).toBe(140);
      expect(pipe.width).toBe(52);
      expect(pipe.passed).toBe(false);
    });
  });

  describe('BoundingBox', () => {
    it('should have required properties for collision detection', () => {
      const box: BoundingBox = {
        x: 100,
        y: 200,
        width: 50,
        height: 60,
      };

      expect(box.x).toBe(100);
      expect(box.y).toBe(200);
      expect(box.width).toBe(50);
      expect(box.height).toBe(60);
    });
  });

  describe('Difficulty', () => {
    it('should have required properties for difficulty settings', () => {
      const difficulty: Difficulty = {
        level: 'middle',
        gapHeight: 140,
        scrollSpeed: 180,
        spawnInterval: 1600,
      };

      expect(difficulty.level).toBe('middle');
      expect(difficulty.gapHeight).toBe(140);
      expect(difficulty.scrollSpeed).toBe(180);
      expect(difficulty.spawnInterval).toBe(1600);
    });
  });

  describe('GameState', () => {
    it('should have required properties for game state', () => {
      const bird: Bird = {
        x: 80,
        y: 300,
        velocity: 0,
        width: 34,
        height: 24,
      };

      const difficulty: Difficulty = {
        level: 'middle',
        gapHeight: 140,
        scrollSpeed: 180,
        spawnInterval: 1600,
      };

      const gameState: GameState = {
        phase: 'menu',
        difficulty,
        score: 0,
        bird,
        pipes: [],
      };

      expect(gameState.phase).toBe('menu');
      expect(gameState.difficulty).toBe(difficulty);
      expect(gameState.score).toBe(0);
      expect(gameState.bird).toBe(bird);
      expect(gameState.pipes).toEqual([]);
    });

    it('should allow all valid game phases', () => {
      const phases: GamePhase[] = ['menu', 'playing', 'paused', 'gameOver'];
      phases.forEach(phase => {
        expect(['menu', 'playing', 'paused', 'gameOver']).toContain(phase);
      });
    });

    it('should allow all valid difficulty levels', () => {
      const levels: DifficultyLevel[] = ['low', 'middle', 'high'];
      levels.forEach(level => {
        expect(['low', 'middle', 'high']).toContain(level);
      });
    });
  });
});
