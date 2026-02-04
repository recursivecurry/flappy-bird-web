import type { Bird, BoundingBox } from './types';
import {
  BIRD_START_X,
  BIRD_START_Y,
  BIRD_WIDTH,
  BIRD_HEIGHT,
  FLAP_VELOCITY,
  GRAVITY,
  MAX_VELOCITY,
} from './config';

export function createBird(): Bird {
  return {
    x: BIRD_START_X,
    y: BIRD_START_Y,
    velocity: 0,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
  };
}

export function flap(bird: Bird): Bird {
  return {
    ...bird,
    velocity: FLAP_VELOCITY,
  };
}

export function updateBird(bird: Bird, deltaTime: number): Bird {
  // Apply gravity to velocity
  let newVelocity = bird.velocity + GRAVITY * deltaTime;

  // Cap velocity at MAX_VELOCITY
  if (newVelocity > MAX_VELOCITY) {
    newVelocity = MAX_VELOCITY;
  }

  // Update position based on velocity
  const newY = bird.y + newVelocity * deltaTime;

  return {
    ...bird,
    y: newY,
    velocity: newVelocity,
  };
}

export function getBirdBoundingBox(bird: Bird): BoundingBox {
  return {
    x: bird.x,
    y: bird.y,
    width: bird.width,
    height: bird.height,
  };
}
