import { applyScramble } from './applyScramble';
import { CubeSize } from './cubeUtils';

/*
export const cubeSizes = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7'] as const;
export type CubeSize = (typeof cubeSizes)[number];
export const validCubeSize = (x: any): x is CubeSize => cubeSizes.includes(x);
*/

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
  type: string;
  scramble: string;

  constructor(scramble: string = '', type: CubeSize = '3x3') {
    this.type = type;
    this.scramble = scramble;
  }

  get cube(): CubeType {
    return applyScramble({ type: this.type, scramble: this.scramble });
  }

  move(move: string): void {
    // validate this input
    this.scramble = this.scramble + move.toUpperCase();
  }
}
