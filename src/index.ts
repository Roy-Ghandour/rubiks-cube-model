import { CubeType, Face, Color, Cube } from './cube';
import solvedCube from './solvedCube';
import generateScramble from './generateScramble';
import applyScramble from './applyScramble';

export type { Color, Face, CubeType };
export { applyScramble, solvedCube, generateScramble, Cube };

//testing
const scramble = generateScramble('3x3');
const cube = applyScramble('3x3', scramble);

const newCube = new Cube('F');
console.log(newCube.cube);
