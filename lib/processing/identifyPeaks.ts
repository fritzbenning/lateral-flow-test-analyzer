import { useConfigStore } from "@/stores/configStore";
import { ChartDataPoint } from "@/types/chart";
import { log } from "@/utils/log";

export function identifyPeaks(dataPoints: ChartDataPoint[], height: number): ChartDataPoint[] {
  const { pixelBinding } = useConfigStore.getState();

  const sortedByY = [...dataPoints].sort((a, b) => a.y - b.y);
  const sortedByGreyscale = [...dataPoints].sort((a, b) => a.greyscaleValue - b.greyscaleValue);
  const medianIndex = Math.floor(sortedByGreyscale.length / 2);
  const medianGreyscaleValue = sortedByGreyscale[medianIndex].greyscaleValue;

  const GREYSCALE_THRESHOLD = medianGreyscaleValue * 1.1;

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

    if (pixel.greyscaleValue <= GREYSCALE_THRESHOLD) {
      return false;
    }

    if (peak) {
      const plateauPoints = checkWindow.filter(
        (otherPixel) => Math.abs(otherPixel.greyscaleValue - pixel.greyscaleValue) === 0,
      );
      const isPlateau = plateauPoints.length > 1;

      if (plateauPoints.some((otherPixel) => otherPixel.y < pixel.y)) {
        return false;
      }

      if (isPlateau) {
        log(`Found plateau with ${plateauPoints.length} points at y=${pixel.y}`, "info");
      }
    }

    return peak;
  });

  log(`🏔️ ${peaks.length} greyscale peaks were found`, "info");

  return peaks;
}
