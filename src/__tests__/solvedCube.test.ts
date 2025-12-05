import { solvedCube } from '../index';
import { CubeSize } from '../cubeUtils';

describe('solvedCube', () => {
  const testCases: { type: CubeSize; size: number }[] = [
    { type: '2x2', size: 2 },
    { type: '3x3', size: 3 },
    { type: '4x4', size: 4 },
    { type: '5x5', size: 5 },
    { type: '6x6', size: 6 },
    { type: '7x7', size: 7 },
  ];

  testCases.forEach((testCase) => {
    it(`should generate a solved ${testCase.type} cube`, () => {
      const cube = solvedCube(testCase.type);
      expect(cube.U.length).toBe(testCase.size);
      expect(cube.U[0]).toEqual(new Array(testCase.size).fill('W'));
    });
  });

  it('should throw an error for an invalid cube type', () => {
    expect(() => solvedCube('8x8' as CubeSize)).toThrow(
      "Invalid cube size: '8x8'\nSupported cube sizes: 2x2, 3x3, 4x4, 5x5, 6x6, 7x7",
    );
  });
});
