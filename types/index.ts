export interface LabColor {
  l: number;
  a: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface PixelData {
  x: number;
  y: number;
  red: number;
  green: number;
  blue: number;
  lab: LabColor;
  hsl: HslColor;
}

export interface TestLineUnit {
  x: number;
  y: number;
  hsl: { h: number; s: number; l: number };
}
