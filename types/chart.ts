export interface ChartDataPoint {
  x: number;
  y: number;
  lightness: number;
  greyscale: number;
  greyscaleValue: number;
  labA: number;
}

export interface ChartData {
  data: ChartDataPoint[];
  referenceLines: number[];
}
