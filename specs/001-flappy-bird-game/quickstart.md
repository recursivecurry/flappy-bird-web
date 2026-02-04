# Quickstart: Flappy Bird Web Game

**Date**: 2026-02-04
**Feature**: 001-flappy-bird-game

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ (included with Node.js)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Setup

1. **Clone and navigate to project**:
   ```bash
   cd flappy_bird
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` (default Vite port)

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## How to Play

1. **Start Screen**: Select difficulty level (Low / Middle / High)
2. **Gameplay**: Click, tap, or press Space to make the bird flap
3. **Objective**: Navigate through pipe gaps without colliding
4. **Scoring**: +1 point for each pipe successfully passed
5. **Game Over**: Collision with pipe, ground, or ceiling ends the game
6. **Restart**: Click "Play Again" to return to difficulty selection

## Difficulty Levels

| Level | Description |
|-------|-------------|
| Low | Wide gaps, slow pipes - good for beginners |
| Middle | Standard gaps and speed - balanced challenge |
| High | Narrow gaps, fast pipes - for experienced players |

## Controls

| Input | Action |
|-------|--------|
| Mouse click | Flap |
| Touch tap | Flap |
| Spacebar | Flap |
| Enter | Flap |
| Arrow Up | Flap |

## File Structure

```
flappy_bird/
├── src/
│   ├── index.ts      # Entry point
│   ├── game.ts       # Game loop
│   ├── bird.ts       # Bird entity
│   ├── pipe.ts       # Pipe obstacles
│   ├── collision.ts  # Collision detection
│   ├── renderer.ts   # Canvas rendering
│   ├── input.ts      # Input handling
│   ├── config.ts     # Constants & difficulty
│   └── types.ts      # TypeScript types
├── tests/            # Unit tests
├── public/           # Static assets
└── specs/            # Feature specifications
```

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Building for Production

```bash
# Create optimized build
npm run build

# Output will be in dist/ directory
# Deploy contents of dist/ to any static hosting
```

## Troubleshooting

**Game not loading?**
- Ensure Node.js 18+ is installed: `node --version`
- Clear browser cache and refresh
- Check browser console for errors

**Touch not working on mobile?**
- Ensure you're using HTTPS in production (required for touch events)
- Try different touch areas (center of screen works best)

**Performance issues?**
- Close other browser tabs
- Disable browser extensions
- Try a different browser
