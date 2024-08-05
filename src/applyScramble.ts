import { applyScrambleHelper } from './applyScrambleHelper.js';
import { CubeType } from './cube.js';

interface ApplyScrambleProps {
  type: string;
  scramble: string;
}

function applyScramble({ type, scramble }: ApplyScrambleProps) {
  return applyScrambleHelper({ type, scramble }) as CubeType;
}

export { applyScramble };
