import type { BoundingBox } from './types';
import { CANVAS_HEIGHT } from './config';

export function checkCollision(rect1: BoundingBox, rect2: BoundingBox): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

export function checkBoundaryCollision(bird: BoundingBox): boolean {
  // Check ceiling collision (bird above screen)
  if (bird.y < 0) {
    return true;
  }

  // Check ground collision (bird below screen)
  if (bird.y + bird.height > CANVAS_HEIGHT) {
    return true;
  }

  return false;
}
