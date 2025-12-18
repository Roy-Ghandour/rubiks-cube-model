import { generateScramble } from '../index';
import { MIN_CUBE_SIZE, RECOMMENDED_MAX_CUBE_SIZE } from '../cubeUtils';
import applyScramble from '../applyScramble';

describe('generateScramble', () => {
  for (let size = MIN_CUBE_SIZE; size <= RECOMMENDED_MAX_CUBE_SIZE; size++) {
    it(`should generate a scramble for a ${size}x${size} cube`, () => {
      const scramble = generateScramble(size);
      expect(typeof scramble).toBe('string');
      expect(scramble.length).toBeGreaterThan(0);
    });
  }

  for (let size = MIN_CUBE_SIZE; size <= RECOMMENDED_MAX_CUBE_SIZE; size++) {
    it(`should generate only valid moves for a ${size}x${size} cube`, () => {
      const scramble = generateScramble(size);
      const moves = scramble.split(' ');

      const moveRegex = /^(\d+(?=.*w))?[FBRLUDxyz]w?[2']?$/;

      for (const move of moves) {
        expect(move).toMatch(moveRegex);
        if (move.includes('w')) {
          const match = move.match(/^(\d+)/);
          const depth = match ? Number(match[1]) : 2;
          expect(depth).toBeLessThanOrEqual(Math.floor(size / 2));
        }
      }
    });
  }

  for (let size = MIN_CUBE_SIZE; size <= RECOMMENDED_MAX_CUBE_SIZE; size++) {
    it(`should apply the generated scramble without throwing (${size}x${size})`, () => {
      const scramble = generateScramble(size);

      expect(() => {
        applyScramble(size, scramble);
      }).not.toThrow();
    });
  }

  it('should not generate the same face twice in a row', () => {
    const scramble = generateScramble(12);
    const moves = scramble.split(' ');

    for (let i = 1; i < moves.length; i++) {
      const prev = moves[i - 1];
      const curr = moves[i];
      expect(curr).not.toBe(prev);
    }
  });
});
