import { PixelData } from "@/types";
import { rgbToGrayscale } from "@/lib/preparing/rgbToGrayscale";
import { setChartData } from "@/stores/testStore";

export const createChartData = (index: number, roiPixels: PixelData[], peaks: PixelData[]) => {
  const data = roiPixels.map((pixel) => ({
    x: pixel.x,
    y: pixel.y,
    lightness: pixel.hsl.l,
    greyscale: rgbToGrayscale(pixel.rgb.r, pixel.rgb.g, pixel.rgb.b),
    greyscaleValue: 1 - rgbToGrayscale(pixel.rgb.r, pixel.rgb.g, pixel.rgb.b) / 255,
    labA: pixel.lab.a,
  }));

  const referenceLines = peaks.map((peak) => peak.y);

  const chartData = {
    data,
    referenceLines,
  };

  setChartData(index, chartData);
};
