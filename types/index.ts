export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

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
  rgb: RgbColor;
  lab: LabColor;
  hsl: HslColor;
}
