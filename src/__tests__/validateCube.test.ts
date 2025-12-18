import { MIN_CUBE_SIZE, RECOMMENDED_MAX_CUBE_SIZE } from '../cubeUtils';

describe('validateCubeSize', () => {
  let validateCubeSize: typeof import('../cubeUtils').validateCubeSize;
  let warnSpy: jest.SpyInstance;

  beforeEach(async () => {
    // Reset modules to clear the hasWarnedAboutLargeCube state
    jest.resetModules();

    // Re-import the module dynamically to get a fresh instance
    const module = await import('../cubeUtils');
    validateCubeSize = module.validateCubeSize;

    // Mock console.warn
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('should throw for invalid cube sizes', () => {
    expect(() => validateCubeSize(1)).toThrow("Invalid cube size: '1x1'");
    expect(() => validateCubeSize(2.5)).toThrow("Invalid cube size: '2.5x2.5'");
  });

  it('emits a warning when cube size exceeds 10', () => {
    validateCubeSize(11);

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('exceeds the recommended maximum'),
    );
  });

  it('emits the warning only once even if called multiple times', () => {
    validateCubeSize(11);
    validateCubeSize(12);
    validateCubeSize(20);

    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('does not warn for cube sizes ≤ 10', () => {
    for (let i = MIN_CUBE_SIZE; i <= RECOMMENDED_MAX_CUBE_SIZE; i++) {
      validateCubeSize(i);
    }

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
