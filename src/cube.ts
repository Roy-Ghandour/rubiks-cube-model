export type Color = 'W' | 'Y' | 'G' | 'B' | 'R' | 'O';
export type Face = Color[][];

export type FaceName = 'U' | 'D' | 'L' | 'R' | 'F' | 'B';
export type Cube = Record<FaceName, Face>;
