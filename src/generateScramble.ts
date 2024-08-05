import { Scrambow } from 'scrambow';
import { validateCubeSize, CubeSize } from './cubeUtils';

function generateScramble(cubeSize: CubeSize) {
  validateCubeSize(cubeSize);

  const scrambowType: string = cubeSize[0].repeat(3);
  const scrambo = new Scrambow(scrambowType);
  const scrambleOb = scrambo.get();
  let scramble = scrambleOb[0].scramble_string;
  scramble = scramble.replace(/\s+/g, ' ').trim();
  return scramble;
}

export { generateScramble };
