import type { Difficulty, DifficultyLevel } from './types';

// Canvas dimensions
export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 600;

// Bird dimensions and starting position
export const BIRD_WIDTH = 34;
export const BIRD_HEIGHT = 24;
export const BIRD_START_X = 80;
export const BIRD_START_Y = 300;

// Physics constants
export const GRAVITY = 1200;
export const FLAP_VELOCITY = -400;
export const MAX_VELOCITY = 600;

// Pipe constants
export const PIPE_WIDTH = 52;
export const MIN_GAP_Y = 100;
export const MAX_GAP_Y = 500;

// Difficulty presets
export const DIFFICULTY_PRESETS: Record<DifficultyLevel, Difficulty> = {
  low: {
    level: 'low',
    gapHeight: 180,
    scrollSpeed: 120,
    spawnInterval: 2000,
  },
  middle: {
    level: 'middle',
    gapHeight: 140,
    scrollSpeed: 180,
    spawnInterval: 1600,
  },
  high: {
    level: 'high',
    gapHeight: 100,
    scrollSpeed: 240,
    spawnInterval: 1200,
  },
};
