export type CubeSize = number;

export const MIN_CUBE_SIZE = 2;
export const MAX_CUBE_SIZE = 21;

export function validateCubeSize(cubeSize: unknown): void {
  const validCubeSize = (x: unknown): x is CubeSize =>
    typeof x === 'number' && Number.isInteger(x) && x >= MIN_CUBE_SIZE && x <= MAX_CUBE_SIZE;

  if (validCubeSize(cubeSize)) return;

  const supportedCubes = `${MIN_CUBE_SIZE}x${MIN_CUBE_SIZE} -> ${MAX_CUBE_SIZE}x${MAX_CUBE_SIZE}`;
  throw new Error(
    `Invalid cube size: \'${cubeSize}x${cubeSize}\'\nSupported cube sizes: ${supportedCubes}`,
  );
}

export function validateScramble(cubeSize: CubeSize, scramble: string): void {
  const validMove = (move: string) => /^(\d+(?=.*w))?[FBRLUDxyz]w?[2']?$/.test(move);
  const validDepth = (move: string) => {
    // Not a wide move
    if (!move.includes('w')) return true;

    const match = move.match(/^(\d+)/);
    const depth = match ? Number(match[1]) : 2;

    // Valid depth if less than or equal to half the size of the cube (excluding the centre of the cube)
    if (depth <= Math.floor(cubeSize / 2)) return true;

    return false;
  };

  const moves = scramble
    .split(' ')
    .map((str) => str.trim())
    .filter(Boolean);

  for (const move of moves) {
    if (!validMove(move) || !validDepth(move))
      throw new Error(
        `Invalid move for a (${cubeSize}x${cubeSize}): --> \'${move}\'\nIn scramble:\n${scramble}`,
      );
  }
}
