import type { DifficultyLevel } from './types';

export type InputCallback = () => void;
export type DifficultyCallback = (level: DifficultyLevel) => void;

export interface InputHandler {
  onFlap: InputCallback | null;
  onDifficultySelect: DifficultyCallback | null;
  onRestart: InputCallback | null;
  destroy: () => void;
}

export function createInputHandler(canvas: HTMLCanvasElement): InputHandler {
  let onFlap: InputCallback | null = null;
  let onDifficultySelect: DifficultyCallback | null = null;
  let onRestart: InputCallback | null = null;

  const handleClick = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (onFlap) {
      onFlap();
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === 'Space' || event.code === 'Enter' || event.code === 'ArrowUp') {
      event.preventDefault();
      if (onFlap) {
        onFlap();
      }
    }
  };

  // Add event listeners
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('touchstart', handleClick, { passive: false });
  document.addEventListener('keydown', handleKeydown);

  return {
    get onFlap() {
      return onFlap;
    },
    set onFlap(callback: InputCallback | null) {
      onFlap = callback;
    },
    get onDifficultySelect() {
      return onDifficultySelect;
    },
    set onDifficultySelect(callback: DifficultyCallback | null) {
      onDifficultySelect = callback;
    },
    get onRestart() {
      return onRestart;
    },
    set onRestart(callback: InputCallback | null) {
      onRestart = callback;
    },
    destroy() {
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleClick);
      document.removeEventListener('keydown', handleKeydown);
    },
  };
}

export function getDifficultyFromClick(
  x: number,
  y: number,
  canvasWidth: number,
  canvasHeight: number
): DifficultyLevel | null {
  const buttonWidth = 120;
  const buttonHeight = 40;
  const buttonSpacing = 20;
  const startY = canvasHeight / 2 - 20;

  const buttons: { level: DifficultyLevel; y: number }[] = [
    { level: 'low', y: startY },
    { level: 'middle', y: startY + buttonHeight + buttonSpacing },
    { level: 'high', y: startY + (buttonHeight + buttonSpacing) * 2 },
  ];

  const buttonX = (canvasWidth - buttonWidth) / 2;

  for (const button of buttons) {
    if (
      x >= buttonX &&
      x <= buttonX + buttonWidth &&
      y >= button.y &&
      y <= button.y + buttonHeight
    ) {
      return button.level;
    }
  }

  return null;
}
