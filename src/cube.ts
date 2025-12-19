/**
 * Represents a single color on the Rubik's cube.
 * - `W`: White
 * - `Y`: Yellow
 * - `G`: Green
 * - `B`: Blue
 * - `R`: Red
 * - `O`: Orange
 */
export type Color = 'W' | 'Y' | 'G' | 'B' | 'R' | 'O';

/**
 * Represents a single face of the Rubik's cube as a 2D array of colors.
 *
 * Each face is represented as a square matrix where the size depends on
 * the cube dimensions (e.g., 3x3 for a standard cube).
 *
 * @example
 * // A solved 2x2 white face
 * const face: Face = [
 *   ['W', 'W'],
 *   ['W', 'W']
 * ];
 */
export type Face = Color[][];

/**
 * Represents the name of a face on the Rubik's cube.
 * - `U`: Up face
 * - `D`: Down face
 * - `L`: Left face
 * - `R`: Right face
 * - `F`: Front face
 * - `B`: Back face
 */
export type FaceName = 'U' | 'D' | 'L' | 'R' | 'F' | 'B';

/**
 * Represents a complete Rubik's cube with all six faces.
 *
 * Each property corresponds to a face of the cube, identified by its standard
 * notation letter. All faces maintain the standard color scheme when solved.
 *
 * @example
 * const cube: Cube = solvedCube(3);
 * console.log(cube.U); // Up face - 3x3 array of 'W'
 * console.log(cube.R); // Right face - 3x3 array of 'R'
 */
export type Cube = Record<FaceName, Face>;
