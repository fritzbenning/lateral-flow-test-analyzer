import { useConfigStore } from "@/stores/configStore";
import { ChartDataPoint } from "@/types/chart";
import { log } from "@/utils/log";

export function identifyPeaks(dataPoints: ChartDataPoint[], height: number): ChartDataPoint[] {
  const { pixelBinding } = useConfigStore.getState();

  const sortedByY = dataPoints.sort((a, b) => a.y - b.y);

  const yLowerBoundary = (height * 0.2) / pixelBinding;
  const yUpperBoundary = (height * 0.8) / pixelBinding;
  const yTHRESHOLD = height / 10;

  const peaks = sortedByY.filter((pixel: ChartDataPoint, index) => {
    const checkWindow = sortedByY.slice(
      Math.max(0, index - yTHRESHOLD),
      Math.min(sortedByY.length - 1, index + yTHRESHOLD),
    );

    const peak = checkWindow.every(
      (otherPixel) => pixel.greyscaleValue >= otherPixel.greyscaleValue,
    );

    if (pixel.y < yLowerBoundary || pixel.y > yUpperBoundary) {
      return false;
    }

    return peak;
  });

  log(`🏔️ ${peaks.length} greyscale peaks were found`, "info");

  return peaks;
}
