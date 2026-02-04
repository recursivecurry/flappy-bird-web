import { describe, it, expect } from 'vitest';
import { createGameState, transitionToPlaying, transitionToGameOver, transitionToPaused, transitionToMenu } from '../src/game';
import { DIFFICULTY_PRESETS } from '../src/config';

describe('Game State Management', () => {
  describe('createGameState', () => {
    it('should create initial game state in menu phase', () => {
      const state = createGameState();

      expect(state.phase).toBe('menu');
      expect(state.score).toBe(0);
      expect(state.pipes).toEqual([]);
    });

    it('should initialize with middle difficulty by default', () => {
      const state = createGameState();

      expect(state.difficulty).toEqual(DIFFICULTY_PRESETS.middle);
    });

    it('should create bird at starting position', () => {
      const state = createGameState();

      expect(state.bird).toBeDefined();
      expect(state.bird.x).toBe(80);
      expect(state.bird.y).toBe(300);
    });
  });

  describe('transitionToPlaying', () => {
    it('should transition from menu to playing', () => {
      const state = createGameState();
      const newState = transitionToPlaying(state, 'low');

      expect(newState.phase).toBe('playing');
    });

    it('should set selected difficulty when starting game', () => {
      const state = createGameState();
      const newState = transitionToPlaying(state, 'high');

      expect(newState.difficulty).toEqual(DIFFICULTY_PRESETS.high);
    });

    it('should reset score to zero when starting', () => {
      const state = { ...createGameState(), score: 10 };
      const newState = transitionToPlaying(state, 'middle');

      expect(newState.score).toBe(0);
    });

    it('should reset bird position when starting', () => {
      const state = createGameState();
      state.bird.y = 400;
      state.bird.velocity = 200;

      const newState = transitionToPlaying(state, 'middle');

      expect(newState.bird.y).toBe(300);
      expect(newState.bird.velocity).toBe(0);
    });

    it('should clear pipes when starting', () => {
      const state = createGameState();
      state.pipes = [{ x: 200, gapY: 300, gapHeight: 140, width: 52, passed: false }];

      const newState = transitionToPlaying(state, 'middle');

      expect(newState.pipes).toEqual([]);
    });
  });

  describe('transitionToGameOver', () => {
    it('should transition from playing to gameOver', () => {
      const state = { ...createGameState(), phase: 'playing' as const };
      const newState = transitionToGameOver(state);

      expect(newState.phase).toBe('gameOver');
    });

    it('should preserve score when game ends', () => {
      const state = { ...createGameState(), phase: 'playing' as const, score: 15 };
      const newState = transitionToGameOver(state);

      expect(newState.score).toBe(15);
    });

    it('should preserve bird position when game ends', () => {
      const state = createGameState();
      state.phase = 'playing';
      state.bird.y = 450;

      const newState = transitionToGameOver(state);

      expect(newState.bird.y).toBe(450);
    });
  });

  describe('transitionToPaused', () => {
    it('should transition from playing to paused', () => {
      const state = { ...createGameState(), phase: 'playing' as const };
      const newState = transitionToPaused(state);

      expect(newState.phase).toBe('paused');
    });

    it('should preserve game state when paused', () => {
      const state = { ...createGameState(), phase: 'playing' as const, score: 5 };
      state.bird.y = 250;

      const newState = transitionToPaused(state);

      expect(newState.score).toBe(5);
      expect(newState.bird.y).toBe(250);
    });
  });

  describe('transitionToMenu', () => {
    it('should transition from gameOver to menu', () => {
      const state = { ...createGameState(), phase: 'gameOver' as const };
      const newState = transitionToMenu(state);

      expect(newState.phase).toBe('menu');
    });

    it('should reset bird to starting position', () => {
      const state = createGameState();
      state.phase = 'gameOver';
      state.bird.y = 500;

      const newState = transitionToMenu(state);

      expect(newState.bird.y).toBe(300);
      expect(newState.bird.velocity).toBe(0);
    });

    it('should reset score when returning to menu', () => {
      const state = { ...createGameState(), phase: 'gameOver' as const, score: 20 };
      const newState = transitionToMenu(state);

      expect(newState.score).toBe(0);
    });

    it('should clear pipes when returning to menu', () => {
      const state = createGameState();
      state.phase = 'gameOver';
      state.pipes = [{ x: 100, gapY: 300, gapHeight: 140, width: 52, passed: true }];

      const newState = transitionToMenu(state);

      expect(newState.pipes).toEqual([]);
    });
  });
});
