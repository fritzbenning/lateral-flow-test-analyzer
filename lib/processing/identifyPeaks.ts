import { PixelData } from "@/types";
import { ChartDataPoint } from "@/types/chart";
import { log } from "@/utils/log";

export function identifyPeaks(dataPoints: ChartDataPoint[], height: number): ChartDataPoint[] {
  const sortedByY = dataPoints.sort((a, b) => a.y - b.y);

  const yTHRESHOLD = height / 10;

  const peaks = sortedByY.filter((pixel: ChartDataPoint, index) => {
    const checkWindow = sortedByY.slice(
      Math.max(0, index - yTHRESHOLD),
      Math.min(sortedByY.length - 1, index + yTHRESHOLD),
    );

    return checkWindow.every((otherPixel) => pixel.greyscaleValue >= otherPixel.greyscaleValue);
  });

  log(`🏔️ ${peaks.length} greyscale peaks were found`, "info");

  return peaks;
}
