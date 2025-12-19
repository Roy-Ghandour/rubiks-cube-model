# rubiks-cube-model

A TypeScript library for modeling and manipulating NxN Rubik's cubes of any size. Generate scrambles, apply move sequences, and work with cube states programmatically.

**Note**: This library is designed for programmatic cube manipulation and scramble generation. It does not include a solver or cube visualization.

## Features

- ✨ Support for any size NxN cubes (2x2, 3x3, 4x4, ...)
- 🎲 WCA-compliant scramble generation (up to 7x7)
- 🔄 Apply move sequences in standard notation
- 🧪 Thoroughly tested (up to 10x10 cubes)

## Installation

```bash
npm install rubiks-cube-model
```

```bash
yarn add rubiks-cube-model
```

```bash
pnpm add rubiks-cube-model
```

## Quick Start

```typescript
import { solvedCube, generateScramble, applyScramble } from 'rubiks-cube-model';

// Create a solved 3x3x3 cube
const cube = solvedCube(3);

// Generate a random scramble
const scramble = generateScramble(3);
console.log(scramble); // "R U R' U' F2 D' L2 ..."

// Apply the scramble to get a scrambled cube
const scrambledCube = applyScramble(3, scramble);
```

## API Reference

**Note:** All functions pertaining to a cube are under the assumption that it is oriented in standard position (white up and green facing towards the user) and thus follow standard face names and movement notation.

### `generateScramble(cubeSize)`

Generates a random scramble sequence for a cube.

- **2x2 - 7x7**: WCA-compliant scrambles with [scrambow](https://www.npmjs.com/package/scrambow)
- **8x8+**: Simple random move algorithm

**Parameters:**

- `cubeSize` (number): The size of the cube (e.g., 3 for a 3x3 cube). Must be an integer ≥ 2.

**Returns:** `string` - A space-separated string of random moves in standard notation.

**Throws:** `Error` for invalid cube sizes.

**Example:**

```typescript
import { generateScramble } from 'rubiks-cube-model';

// Generate a 3x3 scramble
const scramble3x3 = generateScramble(3);
console.log(scramble3x3); // "R U R' U' F2 D' L2 B2 U' R2 D L2 F' U2 R' F' U' F2 D2 F'"

// Generate a 7x7 scramble (WCA-compliant)
const scramble7x7 = generateScramble(7);

// Generate an 8x8 scramble (simple algorithm)
const scramble8x8 = generateScramble(8);
```

### `applyScramble(cubeSize, scramble)`

Applies a scramble sequence to create a scrambled cube from a solved state.

**Parameters:**

- `cubeSize` (number): The size of the cube (e.g., 3 for a 3x3 cube). Must be an integer ≥ 2.
- `scramble` (string): A space-separated string of moves in standard notation (e.g., `"R U R' U'"`).

**Returns:** `Cube` - A new cube with the scramble applied.

**Throws:** `Error` for invalid cube sizes and invalid scrambles.

**Example:**

```typescript
import { applyScramble, generateScramble } from 'rubiks-cube-model';

// Apply a specific scramble
const scrambledCube = applyScramble(3, "R U R' U' R' F R2 U' R' U' R U R' F'");

// Generate and apply a random scramble
const randomScramble = generateScramble(3);
const randomScrambledCube = applyScramble(3, randomScramble);
```

### `solvedCube(cubeSize)`

Creates a solved Rubik's cube of the specified size.

**Parameters:**

- `cubeSize` (number): The size of the cube (e.g., 3 for a 3x3 cube). Must be an integer ≥ 2.

**Returns:** `Cube` - A solved cube object.

**Throws:** `Error` for invalid cube sizes.

**Example:**

```typescript
import { solvedCube } from 'rubiks-cube-model';

// Create a 2x2 cube
const cube2x2 = solvedCube(2);

// Create a standard 3x3 cube
const cube3x3 = solvedCube(3);

// Create a 5x5 cube
const cube5x5 = solvedCube(5);

// Access individual faces
console.log(cube3x3.U); // Up face (White) - 3x3 array of 'W'
```

## Types

### `Cube`

Represents a complete Rubik's cube with all six faces.

```typescript
interface Cube {
  U: Face; // Up face (White)
  D: Face; // Down face (Yellow)
  L: Face; // Left face (Orange)
  R: Face; // Right face (Red)
  F: Face; // Front face (Green)
  B: Face; // Back face (Blue)
}
```

### `Face`

A 2D array of colors representing a single face of the cube.

```typescript
type Face = Color[][];
```

### `Color`

The six colors used on a Rubik's cube.

```typescript
type Color = 'W' | 'Y' | 'G' | 'B' | 'R' | 'O';
```

## Cube Size Support

This library supports NxN cubes of any size:

- ✅ **Fully tested**: 2x2 through 10x10
- ⚠️ **Performance warning**: Cubes larger than 10x10 will show a warning due to potential memory and performance concerns

```typescript
// Small cubes - fast and efficient
const cube3x3 = solvedCube(3);

// Medium cubes - tested and performant
const cube7x7 = solvedCube(7);

// Large cubes - tested, with performance warning
const cube10x10 = solvedCube(10);

// Very large cubes - performance may degrade
const cube15x15 = solvedCube(15); // Warning: Performance may degrade significantly
```

## License

ISC License - see the [LICENSE](LICENSE) file for details.

This project originated as a fork of the ISC-licensed package [react-rubiks-cube-utils](https://github.com/UmerKazi/react-rubiks-cube-utils) by [UmerKazi](https://github.com/UmerKazi).

## Author

Roy Ghandour
