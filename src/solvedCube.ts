import { CubeType } from './cube';
import { validateCubeSize, CubeSize } from './cubeUtils';

type CubeFace = 'U' | 'D' | 'L' | 'R' | 'F' | 'B';

const colors = {
  U: 'W',
  D: 'Y',
  L: 'O',
  R: 'R',
  F: 'G',
  B: 'B',
};

function generateSolvedCube(n: number) {
  const cube: { [key in CubeFace]: string[][] } = {
    U: [],
    D: [],
    L: [],
    R: [],
    F: [],
    B: [],
  };

  for (const face in cube) {
    if (cube.hasOwnProperty(face)) {
      for (let i = 0; i < n; i++) {
        cube[face as CubeFace].push(Array(n).fill(colors[face as CubeFace]));
      }
    }
  }

  return cube;
}

function solvedCube(cubeSize: CubeSize) {
  validateCubeSize(cubeSize);

  const size = parseInt(cubeSize[0], 10);
  return generateSolvedCube(size) as CubeType;
}

export { solvedCube };
