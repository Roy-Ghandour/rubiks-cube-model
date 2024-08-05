import { applyScramble } from './applyScramble';
import { CubeType, Face, Color, Cube } from './cube';
import { solvedCube } from './solvedCube';
import { generateScramble } from './generateScramble';

export type { Color, Face, CubeType };
export { applyScramble, solvedCube, generateScramble, Cube };

//testing

//generateScramble('1x1');
//solvedCube('hello');

/*
let cube = new Cube();
console.log('First state: ', cube.cube);
cube.move("f'");
console.log('Second state: ', cube.cube);
*/
