import type { Cube } from './cube';
import { validateCubeSize, type CubeSize } from './cubeUtils';

export default function solvedCube(cubeSize: CubeSize): Cube {
  validateCubeSize(cubeSize);

  return {
    U: Array(cubeSize).fill(Array(cubeSize).fill('W')),
    D: Array(cubeSize).fill(Array(cubeSize).fill('Y')),
    L: Array(cubeSize).fill(Array(cubeSize).fill('O')),
    R: Array(cubeSize).fill(Array(cubeSize).fill('R')),
    F: Array(cubeSize).fill(Array(cubeSize).fill('G')),
    B: Array(cubeSize).fill(Array(cubeSize).fill('B')),
  };
}
