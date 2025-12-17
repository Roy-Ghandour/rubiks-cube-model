import { Scrambow } from 'scrambow';
import { validateCubeSize, type CubeSize } from './cubeUtils';
import { FaceName } from './cube';

export default function generateScramble(cubeSize: CubeSize) {
  validateCubeSize(cubeSize);

  if (cubeSize <= 7) {
    return generateWCAScramble(cubeSize);
  } else {
    return generateNxNScramble(cubeSize);
  }
}

function generateWCAScramble(size: number) {
  const scrambowType: string = size.toString().repeat(3);
  const scrambo = new Scrambow(scrambowType);
  let scramble = scrambo.get()[0]!.scramble_string;
  scramble = scramble.replace(/\s+/g, ' ').trim();

  return scramble;
}

function generateNxNScramble(size: number) {
  const faces = ['U', 'D', 'L', 'R', 'F', 'B'] as const;
  const maxDepth = Math.floor(size / 2);
  const length = size * 10;
  const moves: string[] = [];
  let lastFace: FaceName | null = null;

  for (let i = 0; i < length; i++) {
    let face: FaceName;
    do {
      face = faces[Math.floor(Math.random() * faces.length)]!;
    } while (face === lastFace);

    const depth = size >= 4 && Math.random() < 0.4 ? Math.ceil(Math.random() * maxDepth) : 1;
    const suffix = Math.random() < 0.33 ? "'" : Math.random() < 0.66 ? '2' : '';

    const move = `${depth > 1 ? depth : ''}${face}${depth > 1 ? 'w' : ''}${suffix}`;

    moves.push(move);
    lastFace = face;
  }

  return moves.join(' ');
}
