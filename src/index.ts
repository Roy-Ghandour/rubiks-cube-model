import { applyScramble } from './applyScramble';
import { CubeType, Face, Color, Cube } from './cube';
import { solvedCube, SolvedCubeType } from './solvedCube';
import { generateScramble } from './generateScramble';

export type { Color, Face, CubeType, SolvedCubeType };
export { applyScramble, solvedCube, generateScramble, Cube };

//testing
/*
let cube = new Cube();
console.log('First state: ', cube.cube);
cube.move("f'");
console.log('Second state: ', cube.cube);
*/
