import applyScramble from './applyScramble';
import { CubeSize, validateScramble } from './cubeUtils';

export type Color = 'W' | 'Y' | 'G' | 'B' | 'R' | 'O';
export type Face = Color[][];

const UP = 'U';
const RIGHT = 'R';
const DOWN = 'D';
const LEFT = 'L';
const FRONT = 'F';
const BACK = 'B';

const DIRECTIONS = [UP, DOWN, RIGHT, LEFT, FRONT, BACK];
type Direction = (typeof DIRECTIONS)[number];

export type CubeType = {
  [UP]: Face;
  [DOWN]: Face;
  [LEFT]: Face;
  [RIGHT]: Face;
  [FRONT]: Face;
  [BACK]: Face;
};

export class Cube {
  type: CubeSize;
  scramble: string;

  constructor(scramble: string = '', type: CubeSize = '3x3') {
    this.type = type;
    this.scramble = scramble;
  }

  get cube(): CubeType {
    return applyScramble(this.type, this.scramble);
  }

  move(move: string): void {
    validateScramble(this.type, move);
    this.scramble = this.scramble + move;
  }
}
