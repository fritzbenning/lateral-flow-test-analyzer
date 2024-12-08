export interface ChartDataPoint {
  x: number;
  y: number;
  greyscale: number;
  greyscaleValue: number;
  hsl: { h: number; s: number; l: number };
  lab: { l: number; a: number; b: number };
  labA: number;
}

export interface ChartData {
  data: ChartDataPoint[];
  referenceLines: number[];
}
