import { solvedCube } from '../index';
import { MIN_CUBE_SIZE, RECOMMENDED_MAX_CUBE_SIZE } from '../cubeUtils';

describe('solvedCube', () => {
  for (let i = MIN_CUBE_SIZE; i <= RECOMMENDED_MAX_CUBE_SIZE; i++) {
    it(`should generate a solved ${i}x${i} cube`, () => {
      const cube = solvedCube(i);
      expect(cube.U.length).toBe(i);
      expect(cube.U[0]).toEqual(new Array(i).fill('W'));
    });
  }
});
