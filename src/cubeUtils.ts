export type CubeSize = number;

export const MIN_CUBE_SIZE = 2;
export const RECOMMENDED_MAX_CUBE_SIZE = 10;

let hasWarnedAboutLargeCube = false;

const validCubeSize = (x: number): x is CubeSize => Number.isInteger(x) && x >= MIN_CUBE_SIZE;

export function validateCubeSize(cubeSize: number): void {
  if (!validCubeSize(cubeSize)) throw new Error(`Invalid cube size: \'${cubeSize}x${cubeSize}\'`);

  if (cubeSize > RECOMMENDED_MAX_CUBE_SIZE && !hasWarnedAboutLargeCube) {
    // eslint-disable-next-line no-console
    console.warn(
      `[rubiks-cube-model] Cube size \'${cubeSize}x${cubeSize}\' exceeds the recommended maximum of \'${RECOMMENDED_MAX_CUBE_SIZE}x${RECOMMENDED_MAX_CUBE_SIZE}\'.\nPerformance may degrade significantly for large cubes (memory usage and solve time).`,
    );

    hasWarnedAboutLargeCube = true;
  }
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
