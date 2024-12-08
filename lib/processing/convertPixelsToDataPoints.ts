import { PixelData } from "@/types";
import { rgbToGrayscale } from "@/lib/preparing/rgbToGrayscale";
import { ChartDataPoint } from "@/types/chart";

export const convertPixelsToDataPoints = (roiPixels: PixelData[]): ChartDataPoint[] => {
  const greyscaledPixels = roiPixels.map((pixel) => ({
    x: pixel.x,
    y: pixel.y,
    greyscale: rgbToGrayscale(pixel.rgb.r, pixel.rgb.g, pixel.rgb.b),
    greyscaleValue: 1 - rgbToGrayscale(pixel.rgb.r, pixel.rgb.g, pixel.rgb.b) / 255,
    hsl: pixel.hsl,
    lab: pixel.lab,
    labA: pixel.lab.a,
  }));

  return greyscaledPixels;
};
