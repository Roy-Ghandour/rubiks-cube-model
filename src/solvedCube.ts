import type { Cube } from './cube';
import { validateCubeSize, type CubeSize, cubeSizeToNumber } from './cubeUtils';

export default function solvedCube(cubeSize: CubeSize): Cube {
  validateCubeSize(cubeSize);

  const size = cubeSizeToNumber(cubeSize);
  return {
    U: Array(size).fill(Array(size).fill('W')),
    D: Array(size).fill(Array(size).fill('Y')),
    L: Array(size).fill(Array(size).fill('O')),
    R: Array(size).fill(Array(size).fill('R')),
    F: Array(size).fill(Array(size).fill('G')),
    B: Array(size).fill(Array(size).fill('B')),
  };
}
