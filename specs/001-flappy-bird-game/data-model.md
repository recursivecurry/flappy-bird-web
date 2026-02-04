# Data Model: Flappy Bird Web Game

**Date**: 2026-02-04
**Feature**: 001-flappy-bird-game

## Core Entities

### Bird

The player-controlled character.

```typescript
interface Bird {
  x: number;          // Horizontal position (fixed during gameplay)
  y: number;          // Vertical position (affected by physics)
  velocity: number;   // Vertical velocity (positive = down, negative = up)
  width: number;      // Hitbox width
  height: number;     // Hitbox height
}
```

**Behaviors**:
- `flap()`: Set velocity to negative value (upward movement)
- `update(deltaTime)`: Apply gravity, update position
- `getBoundingBox()`: Return current hitbox for collision detection

**State Transitions**:
- Initial: Bird at starting position (center-left of screen)
- Playing: Position updated each frame based on velocity + gravity
- Dead: Position frozen on collision

### Pipe

An obstacle pair (top and bottom) with a gap.

```typescript
interface Pipe {
  x: number;          // Horizontal position (moves left over time)
  gapY: number;       // Center Y position of the gap
  gapHeight: number;  // Size of the gap (varies by difficulty)
  width: number;      // Pipe width
  passed: boolean;    // Whether bird has passed this pipe (for scoring)
}
```

**Behaviors**:
- `update(deltaTime, speed)`: Move left based on scroll speed
- `isOffScreen()`: Check if pipe has left the visible area
- `getTopRect()`: Return bounding box for top pipe section
- `getBottomRect()`: Return bounding box for bottom pipe section

**Derived Values**:
- Top pipe: `{ x, y: 0, width, height: gapY - gapHeight/2 }`
- Bottom pipe: `{ x, y: gapY + gapHeight/2, width, height: canvasHeight - (gapY + gapHeight/2) }`

### GameState

Current state of a game session.

```typescript
type GamePhase = 'menu' | 'playing' | 'paused' | 'gameOver';

interface GameState {
  phase: GamePhase;
  difficulty: Difficulty;
  score: number;
  bird: Bird;
  pipes: Pipe[];
}
```

**State Transitions**:
```
menu ─────(select difficulty)─────> playing
playing ──(collision detected)────> gameOver
playing ──(window resized)────────> paused
paused ───(player tap/click)──────> playing
gameOver ─(restart selected)──────> menu
```

### Difficulty

Configuration preset affecting gameplay parameters.

```typescript
type DifficultyLevel = 'low' | 'middle' | 'high';

interface Difficulty {
  level: DifficultyLevel;
  gapHeight: number;     // Pixels between top and bottom pipes
  scrollSpeed: number;   // Pixels per second pipes move left
  spawnInterval: number; // Milliseconds between pipe spawns
}
```

**Preset Values**:

| Level | Gap Height | Scroll Speed | Spawn Interval |
|-------|------------|--------------|----------------|
| low | 180px | 120px/s | 2000ms |
| middle | 140px | 180px/s | 1600ms |
| high | 100px | 240px/s | 1200ms |

### BoundingBox

Utility type for collision detection.

```typescript
interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

## Constants

Game-wide configuration values.

```typescript
interface GameConfig {
  // Canvas
  CANVAS_WIDTH: 400;
  CANVAS_HEIGHT: 600;

  // Bird
  BIRD_WIDTH: 34;
  BIRD_HEIGHT: 24;
  BIRD_START_X: 80;    // Fixed X position
  BIRD_START_Y: 300;   // Initial Y position (center)

  // Physics
  GRAVITY: 1200;       // Pixels per second squared
  FLAP_VELOCITY: -400; // Pixels per second (negative = up)
  MAX_VELOCITY: 600;   // Terminal velocity (down)

  // Pipes
  PIPE_WIDTH: 52;
  MIN_GAP_Y: 100;      // Minimum distance from top edge
  MAX_GAP_Y: 500;      // Maximum distance from top edge

  // Boundaries
  GROUND_HEIGHT: 0;
  CEILING_HEIGHT: 0;
}
```

## Validation Rules

1. **Bird Y Position**: Must stay within `[0, CANVAS_HEIGHT]`
2. **Bird Velocity**: Capped at `MAX_VELOCITY` to prevent extreme speeds
3. **Pipe Gap Y**: Must be within `[MIN_GAP_Y, MAX_GAP_Y]` to ensure playability
4. **Score**: Non-negative integer, increments only when passing pipe center
5. **Difficulty Level**: Must be one of `'low' | 'middle' | 'high'`

## Relationships

```
GameState
    ├── 1:1 ──> Bird
    ├── 1:1 ──> Difficulty
    └── 1:N ──> Pipe[]
```

- One GameState contains exactly one Bird
- One GameState uses exactly one Difficulty configuration
- One GameState manages zero or more Pipes (spawned/despawned dynamically)
