import { PixelData } from "@/types";

export function identifyPeaks(roiPixels: PixelData[]): PixelData[] {
  const sortedByY = roiPixels.sort((a, b) => a.y - b.y);

  const yTHRESHOLD = 4;

  const peaks = sortedByY.filter((pixel: PixelData, index) => {
    const checkWindow = sortedByY.slice(
      Math.max(0, index - yTHRESHOLD),
      Math.min(sortedByY.length - 1, index + yTHRESHOLD),
    );

    return checkWindow.every((otherPixel) => pixel.lab.a >= otherPixel.lab.a);
  });

  return peaks;
}
