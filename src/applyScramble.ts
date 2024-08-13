import { applyScrambleHelper } from './applyScrambleHelper.js';
import { CubeType } from './cube.js';

function applyScramble(type: string, scramble: string): CubeType {
  return applyScrambleHelper({ type, scramble }) as CubeType;
}

export { applyScramble };
