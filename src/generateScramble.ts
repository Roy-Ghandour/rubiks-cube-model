import { Scrambow } from 'scrambow';

type CubeType = '2x2' | '3x3' | '4x4' | '5x5' | '6x6' | '7x7';
const validTypes = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7'];

function generateScramble(type: CubeType) {
  if (!validTypes.includes(type)) throw new Error('Invalid cube type, must be one of ' + validTypes.join(', '));

  const scrambowType: string = type[0].repeat(3);
  const scrambo = new Scrambow(scrambowType);
  const scrambleOb = scrambo.get();
  let scramble = scrambleOb[0].scramble_string;
  scramble = scramble.replace(/\s+/g, ' ').trim();
  return scramble;
}

export { generateScramble };
