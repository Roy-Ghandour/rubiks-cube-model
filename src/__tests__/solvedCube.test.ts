import { solvedCube } from '../index';
import { MIN_CUBE_SIZE, MAX_CUBE_SIZE } from '../cubeUtils';

describe('solvedCube', () => {
  for (let i = MIN_CUBE_SIZE; i <= MAX_CUBE_SIZE; i++) {
    it(`should generate a solved ${i}x${i} cube`, () => {
      const cube = solvedCube(i);
      expect(cube.U.length).toBe(i);
      expect(cube.U[0]).toEqual(new Array(i).fill('W'));
    });
  }

  it('should throw an error for an invalid cube type', () => {
    const size = MAX_CUBE_SIZE + 1;
    const supportedCubes = `${MIN_CUBE_SIZE}x${MIN_CUBE_SIZE} -> ${MAX_CUBE_SIZE}x${MAX_CUBE_SIZE}`;
    expect(() => solvedCube(size)).toThrow(
      `Invalid cube size: '${size}x${size}'\nSupported cube sizes: ${supportedCubes}`,
    );
  });
});
