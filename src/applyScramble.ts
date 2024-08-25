import { Color, CubeType } from './cube';
import { createIndexedCube, indexedCubeToCube, rotate } from './cubeRotator';
import { CubeSize, cubeSizeToNumber, validateCubeSize, validateScramble } from './cubeUtils';

const UP = 'U';
const RIGHT = 'R';
const DOWN = 'D';
const LEFT = 'L';
const FRONT = 'F';
const BACK = 'B';

const DIRECTIONS = [UP, DOWN, RIGHT, LEFT, FRONT, BACK];
type Direction = (typeof DIRECTIONS)[number];

type Move = { direction: Direction; depth: number; numOfMoves: number };

export function applyScramble(cubeSize: CubeSize, scramble: string): CubeType {
  validateCubeSize(cubeSize);
  validateScramble(cubeSize, scramble);

  const size = cubeSizeToNumber(cubeSize);
  const moves = splitScramble(scramble).map(parseMove);

  const initalCube = createIndexedCube(size);

  const modifiedCube = moves.reduce((cube, move) => {
    const { direction, depth, numOfMoves } = move;
    let scrambledCube = JSON.parse(JSON.stringify(cube));

    for (let i = 0; i < numOfMoves; i++) {
      scrambledCube = rotate(scrambledCube, direction, depth);
    }

    return scrambledCube;
  }, initalCube);

  return indexedCubeToCube(modifiedCube);
}

function splitScramble(scramble: string): string[] {
  return scramble
    .split(' ')
    .map((str) => str.trim())
    .filter(Boolean);
}

function parseMove(move: string): Move {
  const direction = DIRECTIONS.reduce((finalDirection, direction) => {
    return move.indexOf(direction) !== -1 ? direction : finalDirection;
  }, '');

  const depth = move.indexOf('w') === -1 ? 1 : Number(move[0]) || 2; // Number(move[0]) is for 3Rw' notation (ie. depth of 3+)

  const reversed = move.indexOf("'") !== -1;
  const twice = move.indexOf('2') !== -1;
  const numOfMoves = twice ? 2 : reversed ? 3 : 1;

  return { direction, depth, numOfMoves };
}
