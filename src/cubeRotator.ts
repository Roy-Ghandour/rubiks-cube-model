import { Color, CubeType } from './cube';

const UP = 'U';
const RIGHT = 'R';
const DOWN = 'D';
const LEFT = 'L';
const FRONT = 'F';
const BACK = 'B';

const DIRECTIONS = [UP, DOWN, RIGHT, LEFT, FRONT, BACK];
type Direction = (typeof DIRECTIONS)[number];

type Coord = number; // is this necessary?
type IndexedFace = { x: Coord; y: Coord; color: Color }[];

type IndexedCube = {
  [UP]: IndexedFace;
  [DOWN]: IndexedFace;
  [LEFT]: IndexedFace;
  [RIGHT]: IndexedFace;
  [FRONT]: IndexedFace;
  [BACK]: IndexedFace;
};

type EdgeType = { axis: Axis; opposite: boolean };
const TOP_EDGE: EdgeType = { axis: 'y', opposite: false };
const RIGHT_EDGE: EdgeType = { axis: 'x', opposite: true };
const BOTTOM_EDGE: EdgeType = { axis: 'y', opposite: true };
const LEFT_EDGE: EdgeType = { axis: 'x', opposite: false };
const EDGES = [TOP_EDGE, RIGHT_EDGE, BOTTOM_EDGE, LEFT_EDGE];
type Edge = (typeof EDGES)[number];
// Maybe get rid of EdgeType with a validator?

// Think I can remove this right?
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

export function rotate(cube: IndexedCube, face: Direction, depth: number): IndexedCube {
  return {
    ...cube,
    ...cycleEdges(cube, face, depth),
    [face]: rotateFace(cube, face),
  };
}

function rotateFace(cube: IndexedCube, face: Direction): IndexedFace {
  return cube[face as keyof IndexedCube].map(({ color, x, y }) => ({
    x: (y - getCubeSize(cube)) * -1 - 1,
    y: x,
    color,
  }));
}

function cycleEdges(cube: IndexedCube, face: Direction, depth: number): IndexedCube {
  const edgeMap = FACE_EDGE_MAP[face];
  const size = getCubeSize(cube);
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

export function createIndexedCube(size: number): IndexedCube {
  function createIndexedFace(color: Color): IndexedFace {
    let face: IndexedFace = [];

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        face = [...face, { x, y, color }];
      }
    }

    return face;
  }

  return {
    [UP]: createIndexedFace('W'),
    [DOWN]: createIndexedFace('Y'),
    [LEFT]: createIndexedFace('O'),
    [RIGHT]: createIndexedFace('R'),
    [FRONT]: createIndexedFace('G'),
    [BACK]: createIndexedFace('B'),
  } as IndexedCube;
}

export function indexedCubeToCube(cube: IndexedCube): CubeType {
  function indexedFaceToFace(indexedFace: IndexedFace) {
    const face = Array.from({ length: size }, () => Array(size).fill(''));

    for (let sticker of indexedFace) {
      face[sticker.y][sticker.x] = sticker.color;
    }

    return face;
  }

  const size = getCubeSize(cube);

  return {
    [UP]: indexedFaceToFace(cube[UP]),
    [DOWN]: indexedFaceToFace(cube[DOWN]),
    [LEFT]: indexedFaceToFace(cube[LEFT]),
    [RIGHT]: indexedFaceToFace(cube[RIGHT]),
    [FRONT]: indexedFaceToFace(cube[FRONT]),
    [BACK]: indexedFaceToFace(cube[BACK]),
  } as CubeType;
}

// I can maybe get rid of this
function getCubeSize(cube: IndexedCube): number {
  return Math.sqrt(cube[UP].length);
}
