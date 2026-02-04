# Research: Flappy Bird Web Game

**Date**: 2026-02-04
**Feature**: 001-flappy-bird-game

## Technology Decisions

### 1. Rendering Technology

**Decision**: HTML5 Canvas API
**Rationale**:
- Native browser support, no external dependencies
- Excellent performance for 2D games
- Simple API for drawing sprites and shapes
- Well-suited for the 60fps requirement
**Alternatives Considered**:
- WebGL: Overkill for 2D pixel graphics, added complexity
- SVG: Less performant for frequent redraws, better for static graphics
- DOM manipulation: Poor performance for game loops

### 2. Build Tool

**Decision**: Vite
**Rationale**:
- Fast development server with HMR
- Native TypeScript support
- Simple configuration
- Modern ES module-based bundling
**Alternatives Considered**:
- Webpack: More configuration overhead, slower builds
- Parcel: Less control over configuration
- esbuild directly: Lacks dev server features

### 3. Testing Framework

**Decision**: Vitest
**Rationale**:
- Native TypeScript support
- Fast execution (reuses Vite's transformation pipeline)
- Jest-compatible API (familiar patterns)
- Excellent for unit testing game logic
**Alternatives Considered**:
- Jest: Slower, requires additional TypeScript configuration
- Mocha: Requires more setup, less integrated

### 4. Game Loop Pattern

**Decision**: requestAnimationFrame with delta time
**Rationale**:
- Browser-native, optimized for animations
- Automatically pauses when tab is not visible (battery saving)
- Provides timestamp for consistent physics across frame rates
**Implementation**:
```typescript
function gameLoop(timestamp: number) {
  const deltaTime = timestamp - lastTimestamp;
  update(deltaTime);
  render();
  requestAnimationFrame(gameLoop);
}
```

### 5. Physics Implementation

**Decision**: Simple Euler integration
**Rationale**:
- Sufficient for gravity and flap mechanics
- Easy to understand and debug
- Minimal computation per frame
**Formula**:
- Gravity: `velocity.y += GRAVITY * deltaTime`
- Position: `position.y += velocity.y * deltaTime`
- Flap: `velocity.y = -FLAP_STRENGTH` (instant upward velocity)

### 6. Collision Detection

**Decision**: Axis-Aligned Bounding Box (AABB)
**Rationale**:
- Simple and fast for rectangular sprites
- Sufficient accuracy for Flappy Bird gameplay
- Easy to implement and test
**Implementation**:
```typescript
function checkCollision(rect1: BoundingBox, rect2: BoundingBox): boolean {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}
```

### 7. Input Handling

**Decision**: Unified event handler for mouse, touch, and keyboard
**Rationale**:
- Single "flap" action triggered by multiple input types
- Reduces code duplication
- Ensures consistent behavior across devices
**Events to Handle**:
- Mouse: `click`, `mousedown`
- Touch: `touchstart`
- Keyboard: `keydown` (Space, Enter, ArrowUp)

### 8. Difficulty Configuration

**Decision**: Centralized config object with difficulty presets
**Rationale**:
- Single source of truth (DRY principle)
- Easy to tune and test
- Clear parameter names (human-readable code)

**Difficulty Parameters**:
| Parameter | Low | Middle | High |
|-----------|-----|--------|------|
| Pipe Gap (px) | 180 | 140 | 100 |
| Scroll Speed (px/s) | 120 | 180 | 240 |
| Pipe Spawn Interval (ms) | 2000 | 1600 | 1200 |

## Original Flappy Bird Reference

Based on the original game mechanics:
- Bird falls at constant acceleration (gravity)
- Each tap gives instant upward velocity
- Pipes have random vertical positions but consistent gaps
- Score increments when bird center passes pipe center
- Game ends on any collision (pipe, ground, ceiling)

## Browser Compatibility

**Minimum Requirements**:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

All support:
- ES2020 features
- HTML5 Canvas
- requestAnimationFrame
- Touch events

## No External Dependencies

Following KISS principle, the game will use only:
- TypeScript (compile-time only)
- Vite (development/build only)
- Vitest (testing only)
- HTML5 Canvas API (runtime)

No runtime dependencies required.
