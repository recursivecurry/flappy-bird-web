import type { Pipe, BoundingBox } from './types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, PIPE_WIDTH, MIN_GAP_Y, MAX_GAP_Y } from './config';

export function createPipe(gapHeight: number): Pipe {
  // Random gap Y position within valid range
  const gapY = MIN_GAP_Y + Math.random() * (MAX_GAP_Y - MIN_GAP_Y);

  return {
    x: CANVAS_WIDTH,
    gapY,
    gapHeight,
    width: PIPE_WIDTH,
    passed: false,
  };
}

export function updatePipe(pipe: Pipe, deltaTime: number, scrollSpeed: number): Pipe {
  return {
    ...pipe,
    x: pipe.x - scrollSpeed * deltaTime,
  };
}

export function isPipeOffScreen(pipe: Pipe): boolean {
  return pipe.x < -pipe.width;
}

export function getTopPipeRect(pipe: Pipe): BoundingBox {
  const gapTop = pipe.gapY - pipe.gapHeight / 2;

  return {
    x: pipe.x,
    y: 0,
    width: pipe.width,
    height: gapTop,
  };
}

export function getBottomPipeRect(pipe: Pipe): BoundingBox {
  const gapBottom = pipe.gapY + pipe.gapHeight / 2;

  return {
    x: pipe.x,
    y: gapBottom,
    width: pipe.width,
    height: CANVAS_HEIGHT - gapBottom,
  };
}
