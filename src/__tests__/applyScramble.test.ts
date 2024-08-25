import { CubeSize } from '../cubeUtils';
import { applyScramble, CubeType } from '../index';

const resultingCube: CubeType = {
  U: [
    ['O', 'O', 'G'],
    ['R', 'W', 'G'],
    ['G', 'Y', 'R'],
  ],
  D: [
    ['W', 'Y', 'B'],
    ['R', 'Y', 'W'],
    ['O', 'O', 'W'],
  ],
  L: [
    ['G', 'B', 'W'],
    ['R', 'O', 'Y'],
    ['W', 'W', 'R'],
  ],
  R: [
    ['B', 'W', 'Y'],
    ['G', 'R', 'B'],
    ['Y', 'B', 'B'],
  ],
  F: [
    ['O', 'B', 'Y'],
    ['O', 'G', 'R'],
    ['G', 'G', 'O'],
  ],
  B: [
    ['R', 'W', 'Y'],
    ['O', 'B', 'Y'],
    ['R', 'G', 'B'],
  ],
};
/*
test('Apply Scramble', () => {
  expect(applyScramble('3x3', "B' U' F2 B2 U D2 R' L U' R' U2 L D2 F' B D' B2 R L' U'")).toStrictEqual(resultingCube);
});
*/

//const validCubeTypes = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7'];

/*
  validCubeTypes.forEach((type) => {
    it(`should generate a cube for ${type}`, () => {
      const cube = applyScramble(type as CubeSize, '');
      expect(cube).toBeInstanceOf(CubeType);
    });
  });
  */

// Tests for validating inputs
describe('applyScramble/validation', () => {
  // Validate cube size
  it('should throw an error for an invalid cube type', () => {
    expect(() => applyScramble('8x8' as CubeSize, '')).toThrow(
      "Invalid cube size: '8x8'\nSupported cube sizes: 2x2, 3x3, 4x4, 5x5, 6x6, 7x7",
    );
  });

  // Validate scramble
});

// Tests for turning each face
describe('applyScramble/turns', () => {
  it("should execute a 'U'", () => {
    const scramble = 'U';
    const expected: CubeType = {
      U: [
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
      ],
      D: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      L: [
        ['G', 'G', 'G'],
        ['O', 'O', 'O'],
        ['O', 'O', 'O'],
      ],
      R: [
        ['B', 'B', 'B'],
        ['R', 'R', 'R'],
        ['R', 'R', 'R'],
      ],
      F: [
        ['R', 'R', 'R'],
        ['G', 'G', 'G'],
        ['G', 'G', 'G'],
      ],
      B: [
        ['O', 'O', 'O'],
        ['B', 'B', 'B'],
        ['B', 'B', 'B'],
      ],
    };

    const cube = applyScramble('3x3', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it("should execute a 'D'", () => {
    const scramble = 'D';
    const expected: CubeType = {
      U: [
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
      ],
      D: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      L: [
        ['O', 'O', 'O'],
        ['O', 'O', 'O'],
        ['B', 'B', 'B'],
      ],
      R: [
        ['R', 'R', 'R'],
        ['R', 'R', 'R'],
        ['G', 'G', 'G'],
      ],
      F: [
        ['G', 'G', 'G'],
        ['G', 'G', 'G'],
        ['O', 'O', 'O'],
      ],
      B: [
        ['B', 'B', 'B'],
        ['B', 'B', 'B'],
        ['R', 'R', 'R'],
      ],
    };

    const cube = applyScramble('3x3', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it("should execute a 'R'", () => {
    const scramble = 'R';
    const expected: CubeType = {
      U: [
        ['W', 'W', 'G'],
        ['W', 'W', 'G'],
        ['W', 'W', 'G'],
      ],
      D: [
        ['Y', 'Y', 'B'],
        ['Y', 'Y', 'B'],
        ['Y', 'Y', 'B'],
      ],
      L: [
        ['O', 'O', 'O'],
        ['O', 'O', 'O'],
        ['O', 'O', 'O'],
      ],
      R: [
        ['R', 'R', 'R'],
        ['R', 'R', 'R'],
        ['R', 'R', 'R'],
      ],
      F: [
        ['G', 'G', 'Y'],
        ['G', 'G', 'Y'],
        ['G', 'G', 'Y'],
      ],
      B: [
        ['W', 'B', 'B'],
        ['W', 'B', 'B'],
        ['W', 'B', 'B'],
      ],
    };

    const cube = applyScramble('3x3', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it("should execute a 'L'", () => {
    const scramble = 'L';
    const expected: CubeType = {
      U: [
        ['B', 'W', 'W'],
        ['B', 'W', 'W'],
        ['B', 'W', 'W'],
      ],
      D: [
        ['G', 'Y', 'Y'],
        ['G', 'Y', 'Y'],
        ['G', 'Y', 'Y'],
      ],
      L: [
        ['O', 'O', 'O'],
        ['O', 'O', 'O'],
        ['O', 'O', 'O'],
      ],
      R: [
        ['R', 'R', 'R'],
        ['R', 'R', 'R'],
        ['R', 'R', 'R'],
      ],
      F: [
        ['W', 'G', 'G'],
        ['W', 'G', 'G'],
        ['W', 'G', 'G'],
      ],
      B: [
        ['B', 'B', 'Y'],
        ['B', 'B', 'Y'],
        ['B', 'B', 'Y'],
      ],
    };

    const cube = applyScramble('3x3', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it("should execute a 'F'", () => {
    const scramble = 'F';
    const expected: CubeType = {
      U: [
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
        ['O', 'O', 'O'],
      ],
      D: [
        ['R', 'R', 'R'],
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
      ],
      L: [
        ['O', 'O', 'Y'],
        ['O', 'O', 'Y'],
        ['O', 'O', 'Y'],
      ],
      R: [
        ['W', 'R', 'R'],
        ['W', 'R', 'R'],
        ['W', 'R', 'R'],
      ],
      F: [
        ['G', 'G', 'G'],
        ['G', 'G', 'G'],
        ['G', 'G', 'G'],
      ],
      B: [
        ['B', 'B', 'B'],
        ['B', 'B', 'B'],
        ['B', 'B', 'B'],
      ],
    };

    const cube = applyScramble('3x3', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it("should execute a 'B'", () => {
    const scramble = 'B';
    const expected: CubeType = {
      U: [
        ['R', 'R', 'R'],
        ['W', 'W', 'W'],
        ['W', 'W', 'W'],
      ],
      D: [
        ['Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y'],
        ['O', 'O', 'O'],
      ],
      L: [
        ['W', 'O', 'O'],
        ['W', 'O', 'O'],
        ['W', 'O', 'O'],
      ],
      R: [
        ['R', 'R', 'Y'],
        ['R', 'R', 'Y'],
        ['R', 'R', 'Y'],
      ],
      F: [
        ['G', 'G', 'G'],
        ['G', 'G', 'G'],
        ['G', 'G', 'G'],
      ],
      B: [
        ['B', 'B', 'B'],
        ['B', 'B', 'B'],
        ['B', 'B', 'B'],
      ],
    };

    const cube = applyScramble('3x3', scramble);
    expect(cube).toStrictEqual(expected);
  });
});

describe('applyScramble/depth', () => {
  it('should execute a 2 wide turn', () => {
    const scramble = 'Uw';
    const expected: CubeType = {
      U: [
        ['W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W'],
      ],
      D: [
        ['Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y'],
      ],
      L: [
        ['G', 'G', 'G', 'G'],
        ['G', 'G', 'G', 'G'],
        ['O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O'],
      ],
      R: [
        ['B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B'],
        ['R', 'R', 'R', 'R'],
        ['R', 'R', 'R', 'R'],
      ],
      F: [
        ['R', 'R', 'R', 'R'],
        ['R', 'R', 'R', 'R'],
        ['G', 'G', 'G', 'G'],
        ['G', 'G', 'G', 'G'],
      ],
      B: [
        ['O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O'],
        ['B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B'],
      ],
    };

    const cube = applyScramble('4x4', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it('should execute a 3 wide turn', () => {
    const scramble = '3Uw';
    const expected: CubeType = {
      U: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
      ],
      D: [
        ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
        ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      ],
      L: [
        ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
        ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
        ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ],
      R: [
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R'],
      ],
      F: [
        ['R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
        ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
        ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
        ['G', 'G', 'G', 'G', 'G', 'G', 'G'],
      ],
      B: [
        ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
      ],
    };

    const cube = applyScramble('7x7', scramble);
    expect(cube).toStrictEqual(expected);
  });
});
