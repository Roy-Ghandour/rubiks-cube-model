import { generateScramble } from '../generateScramble';
import { CubeSize } from '../cubeUtils';

describe('generateScramble', () => {
  const validCubeTypes = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7'];

  validCubeTypes.forEach((type) => {
    it(`should generate a scramble for ${type}`, () => {
      const scramble = generateScramble(type as CubeSize);
      expect(typeof scramble).toBe('string');
      expect(scramble.length).toBeGreaterThan(0);
    });
  });

  it('should throw an error for an invalid cube type', () => {
    expect(() => generateScramble('invalidType' as CubeSize)).toThrow(
      "Invalid cube size: 'invalidType'\nSupported cube sizes: 2x2, 3x3, 4x4, 5x5, 6x6, 7x7",
    );
  });
});
