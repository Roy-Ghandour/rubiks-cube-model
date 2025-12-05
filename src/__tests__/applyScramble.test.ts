import { CubeSize } from '../cubeUtils';
import { applyScramble, Cube } from '../index';

// const resultingCube: Cube = {
//   U: [
//     ['O', 'O', 'G'],
//     ['R', 'W', 'G'],
//     ['G', 'Y', 'R'],
//   ],
//   D: [
//     ['W', 'Y', 'B'],
//     ['R', 'Y', 'W'],
//     ['O', 'O', 'W'],
//   ],
//   L: [
//     ['G', 'B', 'W'],
//     ['R', 'O', 'Y'],
//     ['W', 'W', 'R'],
//   ],
//   R: [
//     ['B', 'W', 'Y'],
//     ['G', 'R', 'B'],
//     ['Y', 'B', 'B'],
//   ],
//   F: [
//     ['O', 'B', 'Y'],
//     ['O', 'G', 'R'],
//     ['G', 'G', 'O'],
//   ],
//   B: [
//     ['R', 'W', 'Y'],
//     ['O', 'B', 'Y'],
//     ['R', 'G', 'B'],
//   ],
// };

// Tests for validating inputs
describe('applyScramble/validation', () => {
  // Validate cube size
  it('should throw an error for an invalid cube type', () => {
    expect(() => applyScramble('8x8' as CubeSize, '')).toThrow(
      "Invalid cube size: '8x8'\nSupported cube sizes: 2x2, 3x3, 4x4, 5x5, 6x6, 7x7",
    );
  });

  // Validate scramble format
  it('should throw an error for an invalid scramble', () => {
    expect(() => applyScramble('3x3', 'sdlkfjs')).toThrow(
      "Invalid move for a (3x3): --> 'sdlkfjs'\nIn scramble:\nsdlkfjs",
    );
  });

  // Validate scramble depth
  it('should throw an error for an invalid depth', () => {
    expect(() => applyScramble('3x3', "U 3Dw' B2 F")).toThrow(
      "Invalid move for a (3x3): --> '3Dw''\nIn scramble:\nU 3Dw' B2 F",
    );
  });
});

// Tests for turning each face
describe('applyScramble/turns', () => {
  it("should execute a 'U'", () => {
    const scramble = 'U';
    const expected: Cube = {
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
    const expected: Cube = {
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
    const expected: Cube = {
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
    const expected: Cube = {
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
    const expected: Cube = {
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
    const expected: Cube = {
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

// Tests for deep / wide moves
describe('applyScramble/depth', () => {
  it('should execute a 2 wide turn', () => {
    const scramble = 'Uw';
    const expected: Cube = {
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
    const expected: Cube = {
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

// Tests for full cube rotations

// Tests for full scrambles
describe('applyScramble/fullSequence', () => {
  it('should execute a 2x2 scramble', () => {
    const scramble = "F U F' R' F U2 F' U2 F'";
    const expected: Cube = {
      U: [
        ['O', 'G'],
        ['B', 'R'],
      ],
      D: [
        ['G', 'B'],
        ['Y', 'G'],
      ],
      L: [
        ['B', 'W'],
        ['O', 'O'],
      ],
      R: [
        ['G', 'O'],
        ['R', 'R'],
      ],
      F: [
        ['R', 'W'],
        ['W', 'Y'],
      ],
      B: [
        ['Y', 'W'],
        ['Y', 'B'],
      ],
    };

    const cube = applyScramble('2x2', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it('should execute a 3x3 scramble', () => {
    const scramble = "B L2 U2 B' D2 U2 F U2 B' D2 B F' L' D2 U' F R2 D2 B R' D L'";
    const expected: Cube = {
      U: [
        ['G', 'B', 'W'],
        ['G', 'W', 'G'],
        ['Y', 'O', 'W'],
      ],
      D: [
        ['W', 'O', 'O'],
        ['O', 'Y', 'Y'],
        ['R', 'G', 'Y'],
      ],
      L: [
        ['O', 'Y', 'O'],
        ['B', 'O', 'W'],
        ['Y', 'Y', 'O'],
      ],
      R: [
        ['R', 'W', 'R'],
        ['O', 'R', 'R'],
        ['Y', 'B', 'G'],
      ],
      F: [
        ['B', 'W', 'G'],
        ['R', 'G', 'B'],
        ['B', 'G', 'G'],
      ],
      B: [
        ['B', 'R', 'W'],
        ['Y', 'B', 'W'],
        ['R', 'R', 'B'],
      ],
    };

    const cube = applyScramble('3x3', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it('should execute a 4x4 scramle', () => {
    const scramble =
      "F' U2 Rw D2 R Fw D Uw2 B F Rw B2 D' Uw2 F2 U L Rw R U2 Rw B' R' Uw' Rw' F2 L D2 U' R D' Uw' U B2 Fw F2 Rw' Fw' D F";
    const expected: Cube = {
      U: [
        ['O', 'R', 'O', 'R'],
        ['W', 'W', 'G', 'G'],
        ['Y', 'O', 'W', 'Y'],
        ['O', 'O', 'B', 'Y'],
      ],
      D: [
        ['O', 'R', 'R', 'O'],
        ['W', 'Y', 'B', 'W'],
        ['O', 'Y', 'B', 'R'],
        ['B', 'O', 'B', 'R'],
      ],
      L: [
        ['Y', 'R', 'O', 'G'],
        ['Y', 'G', 'O', 'R'],
        ['O', 'O', 'W', 'Y'],
        ['W', 'B', 'G', 'G'],
      ],
      R: [
        ['G', 'B', 'R', 'Y'],
        ['W', 'O', 'W', 'Y'],
        ['W', 'R', 'G', 'B'],
        ['W', 'G', 'W', 'G'],
      ],
      F: [
        ['W', 'G', 'R', 'R'],
        ['G', 'R', 'B', 'O'],
        ['O', 'Y', 'R', 'B'],
        ['Y', 'B', 'Y', 'B'],
      ],
      B: [
        ['B', 'W', 'Y', 'B'],
        ['G', 'G', 'B', 'G'],
        ['Y', 'Y', 'R', 'G'],
        ['W', 'W', 'B', 'R'],
      ],
    };

    const cube = applyScramble('4x4', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it('should execute a 5x5 scramle', () => {
    const scramble =
      "D Dw2 Lw' Dw Fw2 F2 Rw D2 Lw2 Dw B' Uw' L Bw U2 L' D B' F2 D2 U' B L' Lw' Dw' Bw Lw2 F' R' B2 F' Rw2 Dw L U2 Rw' R Fw' Uw2 Rw D Uw U2 L' Rw' Dw2 U' L' B Fw D Lw U Rw Fw' Uw' Rw' R2 D U";
    const expected: Cube = {
      U: [
        ['G', 'R', 'O', 'Y', 'O'],
        ['G', 'Y', 'B', 'G', 'W'],
        ['Y', 'O', 'W', 'Y', 'R'],
        ['G', 'W', 'W', 'O', 'B'],
        ['Y', 'R', 'Y', 'O', 'W'],
      ],
      D: [
        ['O', 'O', 'B', 'B', 'B'],
        ['O', 'R', 'R', 'W', 'Y'],
        ['W', 'R', 'Y', 'W', 'G'],
        ['B', 'G', 'B', 'R', 'O'],
        ['B', 'R', 'R', 'W', 'G'],
      ],
      L: [
        ['R', 'Y', 'G', 'W', 'G'],
        ['W', 'W', 'G', 'Y', 'B'],
        ['O', 'B', 'O', 'B', 'Y'],
        ['G', 'G', 'O', 'G', 'Y'],
        ['R', 'Y', 'B', 'Y', 'Y'],
      ],
      R: [
        ['G', 'R', 'Y', 'G', 'W'],
        ['O', 'R', 'G', 'B', 'Y'],
        ['W', 'G', 'R', 'Y', 'R'],
        ['G', 'O', 'R', 'Y', 'G'],
        ['W', 'B', 'W', 'G', 'W'],
      ],
      F: [
        ['O', 'B', 'O', 'W', 'O'],
        ['W', 'O', 'Y', 'R', 'B'],
        ['B', 'O', 'G', 'W', 'O'],
        ['R', 'B', 'G', 'Y', 'Y'],
        ['B', 'B', 'R', 'W', 'R'],
      ],
      B: [
        ['B', 'O', 'B', 'G', 'Y'],
        ['R', 'W', 'R', 'O', 'R'],
        ['G', 'W', 'B', 'O', 'G'],
        ['O', 'B', 'Y', 'B', 'R'],
        ['R', 'O', 'W', 'W', 'Y'],
      ],
    };

    const cube = applyScramble('5x5', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it('should execute a 6x6 scramle', () => {
    const scramble =
      "D 3Uw2 Lw2 Uw' F' Uw' 3Rw2 Rw' D' 3Uw' Rw2 Fw Rw Dw2 3Rw' B Lw2 Bw' Uw2 B' Lw' 3Rw2 Dw Rw2 B2 F R2 D2 F Dw B Dw2 Rw' Fw' Lw 3Rw' D2 Dw2 B2 Fw' F2 U 3Fw' Dw Fw L Uw' Rw B' 3Fw D2 F' D' L 3Fw Uw' 3Rw 3Uw2 U2 3Rw2 Uw2 3Fw' D' Dw Lw' Bw Rw' Dw 3Uw U";
    const expected: Cube = {
      U: [
        ['R', 'Y', 'O', 'B', 'O', 'R'],
        ['R', 'O', 'O', 'R', 'Y', 'Y'],
        ['O', 'O', 'W', 'B', 'G', 'O'],
        ['W', 'W', 'R', 'W', 'W', 'R'],
        ['G', 'Y', 'R', 'G', 'Y', 'W'],
        ['B', 'Y', 'R', 'R', 'R', 'Y'],
      ],
      D: [
        ['R', 'G', 'G', 'B', 'W', 'O'],
        ['B', 'G', 'R', 'G', 'R', 'O'],
        ['W', 'G', 'G', 'W', 'W', 'R'],
        ['G', 'Y', 'G', 'B', 'R', 'Y'],
        ['Y', 'O', 'B', 'Y', 'G', 'O'],
        ['O', 'O', 'W', 'Y', 'O', 'O'],
      ],
      L: [
        ['G', 'W', 'W', 'G', 'R', 'O'],
        ['R', 'B', 'G', 'G', 'R', 'R'],
        ['Y', 'O', 'G', 'O', 'R', 'W'],
        ['Y', 'B', 'R', 'R', 'R', 'O'],
        ['W', 'Y', 'B', 'O', 'W', 'O'],
        ['G', 'G', 'O', 'B', 'W', 'W'],
      ],
      R: [
        ['R', 'B', 'Y', 'G', 'R', 'G'],
        ['W', 'G', 'R', 'B', 'G', 'R'],
        ['B', 'W', 'Y', 'Y', 'R', 'R'],
        ['G', 'B', 'O', 'O', 'W', 'W'],
        ['O', 'O', 'Y', 'O', 'R', 'Y'],
        ['Y', 'G', 'W', 'R', 'W', 'Y'],
      ],
      F: [
        ['W', 'B', 'B', 'B', 'G', 'B'],
        ['B', 'B', 'W', 'Y', 'R', 'R'],
        ['R', 'B', 'R', 'B', 'B', 'W'],
        ['B', 'B', 'W', 'O', 'Y', 'R'],
        ['B', 'B', 'O', 'O', 'W', 'B'],
        ['B', 'Y', 'Y', 'O', 'G', 'G'],
      ],
      B: [
        ['Y', 'Y', 'Y', 'Y', 'B', 'W'],
        ['Y', 'B', 'W', 'W', 'W', 'B'],
        ['G', 'O', 'B', 'Y', 'Y', 'B'],
        ['G', 'Y', 'Y', 'G', 'Y', 'O'],
        ['O', 'O', 'G', 'G', 'W', 'G'],
        ['B', 'W', 'G', 'O', 'G', 'W'],
      ],
    };

    const cube = applyScramble('6x6', scramble);
    expect(cube).toStrictEqual(expected);
  });

  it('should execute a 7x7 scramle', () => {
    const scramble =
      "3Fw Uw2 3Lw' Dw' 3Uw' Lw Rw 3Uw2 Uw2 Rw2 R' 3Uw Uw' Rw2 3Uw Uw2 U2 Bw2 D2 L2 Lw Fw 3Lw2 3Rw' R' D Bw' R Bw2 F L2 Fw' R' 3Dw2 Lw2 Rw2 Fw D' Dw2 Bw2 3Fw F' Rw2 D' Dw' Fw' R 3Fw' D L' 3Fw' Fw F2 3Uw2 U2 Bw 3Fw' R' Dw' 3Uw2 3Lw D2 3Dw 3Uw U' 3Lw U' Bw' 3Fw U2 3Bw2 Fw2 F' R F2 3Dw' 3Lw2 Dw' Bw' 3Fw2 3Dw2 U' B 3Bw2 3Uw2 Lw' D' 3Dw' U2 Fw2 L' 3Uw B' 3Lw2 Uw B L2 B' Lw Dw2";
    const expected: Cube = {
      U: [
        ['W', 'O', 'W', 'Y', 'R', 'W', 'G'],
        ['R', 'O', 'B', 'Y', 'W', 'Y', 'W'],
        ['B', 'R', 'W', 'O', 'G', 'R', 'O'],
        ['B', 'R', 'B', 'W', 'G', 'Y', 'R'],
        ['G', 'Y', 'R', 'Y', 'R', 'Y', 'B'],
        ['R', 'B', 'O', 'O', 'R', 'R', 'R'],
        ['G', 'R', 'R', 'O', 'R', 'R', 'Y'],
      ],
      D: [
        ['O', 'Y', 'Y', 'O', 'G', 'O', 'B'],
        ['G', 'G', 'G', 'B', 'W', 'B', 'G'],
        ['O', 'G', 'B', 'O', 'Y', 'O', 'O'],
        ['R', 'G', 'W', 'Y', 'R', 'O', 'W'],
        ['Y', 'W', 'O', 'G', 'B', 'G', 'Y'],
        ['Y', 'Y', 'R', 'G', 'W', 'O', 'G'],
        ['R', 'O', 'W', 'G', 'Y', 'O', 'Y'],
      ],
      L: [
        ['R', 'B', 'R', 'R', 'Y', 'W', 'O'],
        ['Y', 'W', 'B', 'Y', 'Y', 'O', 'B'],
        ['W', 'G', 'O', 'G', 'O', 'G', 'W'],
        ['W', 'Y', 'O', 'O', 'O', 'B', 'O'],
        ['G', 'B', 'W', 'B', 'G', 'B', 'G'],
        ['G', 'B', 'R', 'R', 'Y', 'R', 'G'],
        ['Y', 'O', 'G', 'W', 'B', 'Y', 'B'],
      ],
      R: [
        ['G', 'G', 'O', 'G', 'Y', 'B', 'W'],
        ['R', 'B', 'O', 'G', 'B', 'R', 'B'],
        ['O', 'O', 'R', 'R', 'W', 'Y', 'B'],
        ['Y', 'B', 'W', 'R', 'G', 'G', 'Y'],
        ['R', 'O', 'B', 'R', 'G', 'W', 'O'],
        ['B', 'Y', 'B', 'W', 'W', 'O', 'Y'],
        ['W', 'Y', 'W', 'O', 'B', 'W', 'B'],
      ],
      F: [
        ['Y', 'Y', 'W', 'B', 'Y', 'B', 'R'],
        ['W', 'Y', 'G', 'W', 'O', 'W', 'W'],
        ['G', 'B', 'G', 'Y', 'B', 'W', 'W'],
        ['G', 'R', 'Y', 'G', 'W', 'B', 'B'],
        ['O', 'O', 'O', 'Y', 'W', 'O', 'W'],
        ['R', 'G', 'G', 'O', 'R', 'W', 'Y'],
        ['W', 'B', 'R', 'Y', 'R', 'G', 'R'],
      ],
      B: [
        ['O', 'O', 'G', 'R', 'B', 'G', 'G'],
        ['O', 'G', 'B', 'W', 'W', 'R', 'O'],
        ['R', 'Y', 'Y', 'R', 'Y', 'R', 'B'],
        ['G', 'W', 'B', 'B', 'W', 'O', 'B'],
        ['Y', 'Y', 'R', 'B', 'Y', 'Y', 'O'],
        ['R', 'G', 'R', 'R', 'G', 'W', 'W'],
        ['O', 'B', 'B', 'W', 'G', 'W', 'B'],
      ],
    };

    const cube = applyScramble('7x7', scramble);
    expect(cube).toStrictEqual(expected);
  });
});
