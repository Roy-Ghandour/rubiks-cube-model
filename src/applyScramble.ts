import type { Cube, Face, Color, FaceName } from './cube';
import { validateCubeSize, validateScramble, type CubeSize } from './cubeUtils';
import solvedCube from './solvedCube';

type Move = { direction: FaceName; depth: number; numOfMoves: number };

export default function applyScramble(cubeSize: CubeSize, scramble: string): Cube {
  validateCubeSize(cubeSize);
  validateScramble(cubeSize, scramble);

  let cube = solvedCube(cubeSize);
  const moves = splitScramble(scramble).map(parseMove);

  for (const move of moves) {
    for (let i = 0; i < move.numOfMoves; i++) {
      cube = applyMove(cube, move.direction, move.depth);
    }
  }

  return cube;
}

// ----------------------------
// Move Parsing
// ----------------------------

function splitScramble(scramble: string): string[] {
  return scramble.trim().split(/\s+/);
}

function parseMove(move: string): Move {
  const direction = ['U', 'D', 'L', 'R', 'F', 'B'].find((d) => move.includes(d)) as FaceName;
  const depth = move.includes('w') ? Number(move[0]) || 2 : 1;

  const reversed = move.includes("'");
  const twice = move.includes('2');
  const numOfMoves = twice ? 2 : reversed ? 3 : 1;

  return { direction, depth, numOfMoves };
}

// ----------------------------
// Move Application
// ----------------------------

function applyMove(cube: Cube, face: FaceName, depth: number): Cube {
  let newCube = deepCopyCube(cube);

  newCube = {
    ...newCube,
    ...rotateSideSlices(newCube, face, depth), // Rotate slices
    [face]: rotateFace(newCube[face]), // Rotate face
  };

  return newCube;
}

// ----------------------------
// Face Rotation
// ----------------------------

function rotateFace(face: Face): Face {
  const N = face.length;
  const newFace = face.map((x) => [...x]);

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      newFace[col]![N - 1 - row] = face[row]![col]!;
    }
  }

  return newFace;
}

// ----------------------------
// Rotate Side Slices
// ----------------------------

function rotateSideSlices(cube: Cube, face: FaceName, depth: number): Cube {
  const size = cube.U.length;

  function getRow(face: Face, row: number): Color[] {
    return face[row]!.slice();
  }

  function setRow(face: Face, row: number, values: Color[]): Face {
    const copy = face.map((r) => r.slice());
    copy[row] = values.slice();
    return copy;
  }

  function getCol(face: Face, col: number): Color[] {
    return face.map((r) => r[col]!);
  }

  function setCol(face: Face, col: number, values: Color[]): Face {
    const copy = face.map((r) => r.slice());
    for (let i = 0; i < values.length; i++) {
      copy[i]![col] = values[i]!;
    }
    return copy;
  }

  type SliceIO = {
    face: FaceName;
    get: (cube: Cube) => Color[];
    set: (face: Face, v: Color[]) => Face;
  };

  const map: Record<FaceName, (layer: number, size: number) => SliceIO[]> = {
    U: (layer, _size) => [
      {
        face: 'B',
        get: (c) => getRow(c.B, layer),
        set: (f, v) => setRow(f, layer, v),
      },
      {
        face: 'R',
        get: (c) => getRow(c.R, layer),
        set: (f, v) => setRow(f, layer, v),
      },
      {
        face: 'F',
        get: (c) => getRow(c.F, layer),
        set: (f, v) => setRow(f, layer, v),
      },
      {
        face: 'L',
        get: (c) => getRow(c.L, layer),
        set: (f, v) => setRow(f, layer, v),
      },
    ],
    D: (layer, size) => {
      const max = size - 1;
      return [
        {
          face: 'F',
          get: (c) => getRow(c.F, max - layer),
          set: (f, v) => setRow(f, max - layer, v),
        },
        {
          face: 'R',
          get: (c) => getRow(c.R, max - layer),
          set: (f, v) => setRow(f, max - layer, v),
        },
        {
          face: 'B',
          get: (c) => getRow(c.B, max - layer),
          set: (f, v) => setRow(f, max - layer, v),
        },
        {
          face: 'L',
          get: (c) => getRow(c.L, max - layer),
          set: (f, v) => setRow(f, max - layer, v),
        },
      ];
    },

    L: (layer, size) => [
      {
        face: 'B',
        get: (c) => [...getCol(c.B, size - 1 - layer)].reverse(),
        set: (f, v) => setCol(f, size - 1 - layer, v),
      },
      {
        face: 'U',
        get: (c) => getCol(c.U, layer),
        set: (f, v) => setCol(f, layer, v),
      },
      {
        face: 'F',
        get: (c) => getCol(c.F, layer),
        set: (f, v) => setCol(f, layer, v),
      },
      {
        face: 'D',
        get: (c) => [...getCol(c.D, layer)].reverse(),
        set: (f, v) => setCol(f, layer, v),
      },
    ],

    R: (layer, size) => {
      const max = size - 1;
      return [
        {
          face: 'F',
          get: (c) => getCol(c.F, max - layer),
          set: (f, v) => setCol(f, max - layer, v),
        },
        {
          face: 'U',
          get: (c) => [...getCol(c.U, max - layer)].reverse(),
          set: (f, v) => setCol(f, max - layer, v),
        },
        {
          face: 'B',
          get: (c) => [...getCol(c.B, layer)].reverse(),
          set: (f, v) => setCol(f, layer, v),
        },
        {
          face: 'D',
          get: (c) => getCol(c.D, max - layer),
          set: (f, v) => setCol(f, max - layer, v),
        },
      ];
    },

    F: (layer, size) => {
      const max = size - 1;
      return [
        {
          face: 'U',
          get: (c) => getRow(c.U, max - layer),
          set: (f, v) => setRow(f, max - layer, v),
        },
        {
          face: 'R',
          get: (c) => [...getCol(c.R, layer)].reverse(),
          set: (f, v) => setCol(f, layer, v),
        },
        {
          face: 'D',
          get: (c) => getRow(c.D, layer),
          set: (f, v) => setRow(f, layer, v),
        },
        {
          face: 'L',
          get: (c) => [...getCol(c.L, max - layer)].reverse(),
          set: (f, v) => setCol(f, max - layer, v),
        },
      ];
    },

    B: (layer, size) => {
      const max = size - 1;
      return [
        {
          face: 'U',
          get: (c) => [...getRow(c.U, layer)].reverse(),
          set: (f, v) => setRow(f, layer, v),
        },
        {
          face: 'L',
          get: (c) => getCol(c.L, layer),
          set: (f, v) => setCol(f, layer, v),
        },
        {
          face: 'D',
          get: (c) => [...getRow(c.D, max - layer)].reverse(),
          set: (f, v) => setRow(f, max - layer, v),
        },
        {
          face: 'R',
          get: (c) => getCol(c.R, max - layer),
          set: (f, v) => setCol(f, max - layer, v),
        },
      ];
    },
  };

  let newCube: Cube = deepCopyCube(cube);

  for (let layer = 0; layer < depth; layer++) {
    const ring = map[face](layer, size);
    const values = ring.map((x) => x.get(newCube));
    const rotated = [values[3]!, values[0]!, values[1]!, values[2]!];

    ring.forEach((entry, i) => {
      const currentFace = newCube[entry.face];
      newCube = {
        ...newCube,
        [entry.face]: entry.set(currentFace, rotated[i]!),
      };
    });
  }

  return newCube;
}

// ----------------------------
// Utility
// ----------------------------

function deepCopyCube(cube: Cube): Cube {
  return {
    U: cube.U.map((r) => [...r]),
    D: cube.D.map((r) => [...r]),
    L: cube.L.map((r) => [...r]),
    R: cube.R.map((r) => [...r]),
    F: cube.F.map((r) => [...r]),
    B: cube.B.map((r) => [...r]),
  };
}
