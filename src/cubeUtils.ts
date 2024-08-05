const cubeSizes = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7'] as const;
export type CubeSize = (typeof cubeSizes)[number];
const validCubeSize = (x: any): x is CubeSize => cubeSizes.includes(x);

export function validateCubeSize(cubeSize: any) {
  if (!validCubeSize(cubeSize)) {
    const err_msg = `Invalid cube size: \'${cubeSize}\'\nSupported cube sizes: ${cubeSizes.join(', ')}`;
    throw new Error(err_msg);
  }
}
