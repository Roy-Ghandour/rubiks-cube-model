import { applyScramble } from './applyScramble';
import { CubeSize, validateScramble } from './cubeUtils';

export type Color = 'W' | 'Y' | 'G' | 'B' | 'R' | 'O';
export type Face = Color[][];

export type CubeType = {
  U: Face;
  D: Face;
  L: Face;
  R: Face;
  F: Face;
  B: Face;
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
    // maybe not as lower case is could be wide moves? for now this will mess with xyz
    this.scramble = this.scramble + move.toUpperCase();
  }
}
