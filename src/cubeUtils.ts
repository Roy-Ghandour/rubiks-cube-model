const cubeSizes = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7'] as const;
export type CubeSize = (typeof cubeSizes)[number];
const validCubeSize = (x: any): x is CubeSize => cubeSizes.includes(x);

export function validateCubeSize(cubeSize: any): void {
  if (validCubeSize(cubeSize)) return;

  const err_msg = `Invalid cube size: \'${cubeSize}\'\nSupported cube sizes: ${cubeSizes.join(', ')}`;
  throw new Error(err_msg);
}

export function cubeSizeToNumber(cubeSize: CubeSize): number {
  if (!validCubeSize(cubeSize)) throw new Error('Invalid Cube Size!');
  return parseInt(cubeSize[0], 10);
}

export function numberToCubeSize(size: number): CubeSize {
  const cubeSize = `${size}x${size}`;
  if (!validCubeSize(cubeSize)) throw new Error('Invalid Cube Size!');
  return cubeSize;
}

export function validateScramble(cubeSize: CubeSize, scramble: string): void {
  const validMove = (move: string) => /^([3-9](?=.*w))?[FBRLUDxyz][w]?[2']?$/.test(move);
  const validDepth = (move: string) => {
    // Not a wide move
    if (move.indexOf('w') === -1) return true;

    const depth = Number(move[0]) || 2;
    const size = cubeSizeToNumber(cubeSize);

    // Valid depth if less than or equal to half the size of the cube (excluding the centre of the cube)
    if (depth <= Math.floor(size / 2)) return true;

    return false;
  };

  const moves = scramble
    .split(' ')
    .map((str) => str.trim())
    .filter(Boolean);

  for (const move in moves) {
    if (!validMove(move) || !validDepth(move))
      new Error(`Invalid move for a (${cubeSize}): --> \'${move}\'\nIn scramble:\n${scramble}`);
  }
}
