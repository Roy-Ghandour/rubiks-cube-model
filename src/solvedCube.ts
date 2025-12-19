import type { Cube } from './cube';
import { validateCubeSize, type CubeSize } from './cubeUtils';

/**
 * Creates a solved Rubik's cube of the specified size.
 *
 * @param {CubeSize} cubeSize - The size of the cube (e.g., 3 for a 3x3x3 cube).
 *                              Must be an integer >= 2.
 * @returns {Cube} A solved cube with all faces showing their respective colors.
 * @throws {Error} If the cube size is invalid (not an integer or less than 2).
 *
 * @example
 * // Create a standard 3x3x3 solved cube
 * const cube = solvedCube(3);
 *
 * @example
 * // Create a 2x2x2 solved cube
 * const smallCube = solvedCube(2);
 *
 * @example
 * // This will throw an error
 * const invalid = solvedCube(1); // Error: Invalid cube size
 *
 * @see {@link validateCubeSize} for cube size validation details
 */
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
