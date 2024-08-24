import { CubeType } from './cube';
import { indexedCubeToCube, createIndexedCube, rotate } from './cubeRotator';
import { CubeSize, cubeSizeToNumber, validateCubeSize, validateScramble } from './cubeUtils';

const UP = 'U';
const RIGHT = 'R';
const DOWN = 'D';
const LEFT = 'L';
const FRONT = 'F';
const BACK = 'B';

const DIRECTIONS = [UP, DOWN, RIGHT, LEFT, FRONT, BACK];
type Direction = (typeof DIRECTIONS)[number];

type Move = { direction: Direction; reversed: boolean; depth: number; twice: boolean };

export function applyScramble(cubeSize: CubeSize, scramble: string): CubeType {
  validateCubeSize(cubeSize);
  validateScramble(cubeSize, scramble);

  const size = cubeSizeToNumber(cubeSize);
  const moves = splitScramble(scramble).map(parseMove);

  const initalCube = createIndexedCube(size);

  const modifiedCube = moves.reduce((cube, move) => {
    // could replace reversed and twice with number of moves?
    const { direction, depth, reversed, twice } = move;
    let scrambledCube = JSON.parse(JSON.stringify(cube));

    const numOfMoves = twice ? 2 : reversed ? 3 : 1; // will be replaced with num of moves from parse
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
    // maybe change {return} to ()
    return move.indexOf(direction) !== -1 ? direction : finalDirection; // !== used to be >
  }, '');

  const depth = move.indexOf('w') === -1 ? 1 : Number(move[0]) || 2; // Number(move[0]) is for 3Rw' notation (ie. depth of 3+)
  const reversed = move.indexOf("'") !== -1; // !== -1 used to be > 0
  const twice = move.indexOf('2') !== -1; // !== -1 used to be > 0

  return { direction, reversed, depth, twice };
}

//diff between this and the other?
//export { applyScramble };
