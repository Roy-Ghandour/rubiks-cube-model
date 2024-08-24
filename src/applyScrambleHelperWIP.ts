import { CubeSize, cubeSizeToNumber, numberToCubeSize, validateCubeSize, validateScramble } from './cubeUtils';
import { CubeType, Color } from './cube';
import { solvedCube } from './solvedCube';

const UP = 'U';
const RIGHT = 'R';
const DOWN = 'D';
const LEFT = 'L';
const FRONT = 'F';
const BACK = 'B';

const DIRECTIONS = [UP, DOWN, RIGHT, LEFT, FRONT, BACK];
type Direction = (typeof DIRECTIONS)[number];

interface IINITIAL_FACES {
  [key: string]: Color;
}

const INITIAL_FACES: IINITIAL_FACES = {
  [UP]: 'W',
  [DOWN]: 'Y',
  [LEFT]: 'O',
  [RIGHT]: 'R',
  [FRONT]: 'G',
  [BACK]: 'B',
};

type EdgeType = { axis: Axis; opposite: boolean };
const TOP_EDGE: EdgeType = { axis: 'y', opposite: false };
const RIGHT_EDGE: EdgeType = { axis: 'x', opposite: true };
const BOTTOM_EDGE: EdgeType = { axis: 'y', opposite: true };
const LEFT_EDGE: EdgeType = { axis: 'x', opposite: false };
const EDGES = [TOP_EDGE, RIGHT_EDGE, BOTTOM_EDGE, LEFT_EDGE];
type Edge = (typeof EDGES)[number];

type Move = { direction: Direction; reversed: boolean; depth: number; twice: boolean };

interface IFACE_EDGE_MAP {
  [key: Direction]: { face: Direction; edge: Edge; reversed?: boolean }[];
}

const FACE_EDGE_MAP: IFACE_EDGE_MAP = {
  [UP]: [
    { face: FRONT, edge: TOP_EDGE },
    { face: LEFT, edge: TOP_EDGE },
    { face: BACK, edge: TOP_EDGE },
    { face: RIGHT, edge: TOP_EDGE },
  ],
  [DOWN]: [
    { face: BACK, edge: BOTTOM_EDGE },
    { face: LEFT, edge: BOTTOM_EDGE },
    { face: FRONT, edge: BOTTOM_EDGE },
    { face: RIGHT, edge: BOTTOM_EDGE },
  ],
  [LEFT]: [
    { face: UP, edge: LEFT_EDGE, reversed: true },
    { face: FRONT, edge: LEFT_EDGE },
    { face: DOWN, edge: LEFT_EDGE },
    { face: BACK, edge: RIGHT_EDGE, reversed: true },
  ],
  [RIGHT]: [
    { face: UP, edge: RIGHT_EDGE },
    { face: BACK, edge: LEFT_EDGE, reversed: true },
    { face: DOWN, edge: RIGHT_EDGE, reversed: true },
    { face: FRONT, edge: RIGHT_EDGE },
  ],
  [FRONT]: [
    { face: UP, edge: BOTTOM_EDGE, reversed: true },
    { face: RIGHT, edge: LEFT_EDGE },
    { face: DOWN, edge: TOP_EDGE, reversed: true },
    { face: LEFT, edge: RIGHT_EDGE },
  ],
  [BACK]: [
    { face: UP, edge: TOP_EDGE },
    { face: LEFT, edge: LEFT_EDGE, reversed: true },
    { face: DOWN, edge: BOTTOM_EDGE },
    { face: RIGHT, edge: RIGHT_EDGE, reversed: true },
  ],
};

export function applyScrambleHelper(cubeSize: CubeSize, scramble: string): CubeType {
  validateCubeSize(cubeSize);
  validateScramble(cubeSize, scramble);

  const size = cubeSizeToNumber(cubeSize);
  const moves = splitScramble(scramble).map(parseMove);

  //done till here

  //using two scopes of cube here is kinda crazy
  const cube = moves.reduce((cube, move) => {
    // could replace reversed and twice with number of moves?
    const { direction, depth, reversed, twice } = move;

    // Abstract the object copy
    let scrambledCube = JSON.parse(JSON.stringify(cube));

    const numOfMoves = twice ? 2 : reversed ? 3 : 1; // will be replaced with num of moves from parse
    for (let i = 0; i < numOfMoves; i++) {
      scrambledCube = rotate(scrambledCube, direction, depth);
    }

    return scrambledCube;
  }, createCube(size));

  return convertCube(cube);
}

function splitScramble(scramble: string): string[] {
  return scramble
    .split(' ')
    .map((str) => str.trim())
    .filter(Boolean);
}

function parseMove(move: string): Move {
  const direction = DIRECTIONS.reduce((finalDirection, direction) => {
    // maybe change {return} to ()
    return move.indexOf(direction) !== -1 ? direction : finalDirection; // !== used to be >
  }, '');

  const depth = move.indexOf('w') === -1 ? 1 : Number(move[0]) || 2; // Number(move[0]) is for 3Rw' notation (ie. depth of 3+)
  const reversed = move.indexOf("'") !== -1; // !== -1 used to be > 0
  const twice = move.indexOf('2') !== -1; // !== -1 used to be > 0

  return { direction, reversed, depth, twice };
}

// strive to get rid of this if you can
//only createface uses this
function generateArr(n: number): number[] {
  let arr = new Array(n);

  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }

  return arr;
}

type Coord = number;
type IndexedFace = { x: Coord; y: Coord; color: Color }[];

type IndexedCube = {
  [UP]: IndexedFace;
  [DOWN]: IndexedFace;
  [LEFT]: IndexedFace;
  [RIGHT]: IndexedFace;
  [FRONT]: IndexedFace;
  [BACK]: IndexedFace;
};

// I know there is a more elegant way to do this than these two functions
// Will return to these when rotations is complete
function createCube(size: number): IndexedCube {
  return Object.keys(INITIAL_FACES).reduce(
    (state, face) => ({
      ...state,
      [face]: createFace(size, INITIAL_FACES[face]),
    }),
    {},
  ) as IndexedCube;
}

function createFace(size: number, color: Color): IndexedFace {
  return generateArr(size).reduce((cube: IndexedFace, y: Coord) => {
    return [...cube, ...generateArr(size).map((x: Coord) => ({ x, y, color }))] as IndexedFace;
  }, []);
}

// deal with this func after revisting createCube (group them together if we're grouping things)
function convertCube(cube: IndexedCube): CubeType {
  function convertSide(side: IndexedFace) {
    const converted = Array.from({ length: size }, () => Array(size).fill(''));

    for (let cell of side) {
      converted[cell.y][cell.x] = cell.color;
    }

    return converted;
  }

  const size = getCubeSize(cube[UP as keyof IndexedCube]);

  // don't like depending on solvedCube
  const convertedCube: CubeType = solvedCube(numberToCubeSize(size));

  for (let sideKey in cube) {
    if (!cube.hasOwnProperty(sideKey)) continue;

    convertedCube[sideKey as keyof CubeType] = convertSide(cube[sideKey as keyof IndexedCube]);
  }

  return convertedCube as CubeType;
}

function rotate(cube: IndexedCube, face: Direction, depth: number): IndexedCube {
  return {
    ...cube,
    ...cycleEdges(cube, face, depth),
    // make rotating face a seperate function
    [face]: cube[face as keyof IndexedCube].map(({ color, x, y }) => ({
      x: reverseIndex(y, getCubeSize(cube[face as keyof IndexedCube])),
      y: x,
      color,
    })),
  };
}

// Deal with  these little stragglers
function getCubeSize(face: IndexedFace): number {
  return Math.sqrt(face.length);
}

function reverseIndex(index: number, size: number): number {
  return (index - size) * -1 - 1;
}

function cycleEdges(cube: IndexedCube, face: Direction, depth: number): IndexedCube {
  const edgeMap = FACE_EDGE_MAP[face];
  const size = getCubeSize(cube[UP]);
  let nextCube = {};

  for (let i = 0; i < edgeMap.length; i++) {
    const source = i === 0 ? edgeMap[edgeMap.length - 1] : edgeMap[i - 1];
    const target = edgeMap[i];

    let face: IndexedFace = cube[target.face as keyof IndexedCube];

    for (let offset = 0; offset < depth; offset++) {
      const sourceValues = getEdgeValues(source.edge, size, offset);
      const colors = getSourceEdgeColors(
        cube[source.face as keyof IndexedCube],
        sourceValues,
        target.reversed as boolean,
      );

      const targetValues = getEdgeValues(target.edge, size, offset);
      face = setTargetEdgeColors(face, targetValues, colors);
    }

    nextCube = {
      ...nextCube,
      [target.face]: face,
    };
  }

  return nextCube as IndexedCube;
}

// I want to rename this and its type

type Axis = 'x' | 'y';
type EdgeValueType = { axis: Axis; oppositeAxis: Axis; index: number };
function getEdgeValues(edge: Edge, size: number, offset: number): EdgeValueType {
  const { axis, opposite } = edge;
  const index = opposite ? size - 1 - offset : offset;
  const oppositeAxis = axis === 'x' ? 'y' : 'x';
  return { axis, oppositeAxis, index };
}

function getSourceEdgeColors(face: IndexedFace, edgeValues: EdgeValueType, reversed: boolean): Color[] {
  const { axis, oppositeAxis, index } = edgeValues;

  const row = face
    .filter((tile) => tile[axis] === index)
    .sort((a, b) => {
      if (a[oppositeAxis] < b[oppositeAxis]) return -1;
      if (a[oppositeAxis] > b[oppositeAxis]) return 1;
      return 0;
    });

  const colors = row.map(({ color }) => color);
  return reversed ? [...colors].reverse() : colors;
}

function setTargetEdgeColors(face: IndexedFace, edgeValues: EdgeValueType, colors: Color[]): IndexedFace {
  const { axis, oppositeAxis, index } = edgeValues;
  return face.map((tile) => (tile[axis] === index ? { ...tile, color: colors[tile[oppositeAxis]] } : tile));
}
