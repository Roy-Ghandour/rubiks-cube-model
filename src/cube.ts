import { applyScramble } from './applyScramble';

type Color = 'W' | 'Y' | 'G' | 'B' | 'R' | 'O';
type Face = Color[][];
type CubeType = {
  U: Face;
  D: Face;
  L: Face;
  R: Face;
  F: Face;
  B: Face;
};

interface CubeProps {
  type: string;
  scramble: string;
}

export class Cube {
  type: string;
  scramble: string;

  constructor(scramble = '', type = '3x3') {
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

export type { CubeType, Color, Face };
