import { PixelData } from "@/types";

export function checkForPeaks(group: PixelData[]): (PixelData | null)[] {
  const minLineHeight = 8;
  const sortedByY = group.sort((a, b) => a.y - b.y);

  const averagedXPosition = Math.floor(
    group.reduce((acc, pixel) => acc + pixel.x, 0) / group.length,
  );

  const uniqueSortedByY = sortedByY.reduce<number[]>(
    (unique, item) => (unique.includes(item.y) ? unique : [...unique, item.y]),
    [],
  );

  if (uniqueSortedByY.length < minLineHeight) {
    console.log("Only a few pixels present, suggesting a test line.");
    const averagedY =
      uniqueSortedByY.reduce((acc, y) => acc + y, 0) / uniqueSortedByY.length;

    const peak = [
      sortedByY.find(
        (pixel) => pixel.y === uniqueSortedByY[Math.floor(averagedY)],
      ) || null,
    ];

    return peak;
  }

  const yTHRESHOLD = Math.floor(uniqueSortedByY.length * 0.3);

  const pixelsAtY = uniqueSortedByY.map((y) => {
    const closestX = sortedByY.reduce<PixelData | null>((closest, pixel) => {
      if (
        pixel.y === y &&
        (closest === null ||
          Math.abs(pixel.x - averagedXPosition) <
            Math.abs(closest.x - averagedXPosition))
      ) {
        return pixel;
      }
      return closest;
    }, null);
    return closestX;
  });

  const peaks = pixelsAtY.filter((pixel, index) => {
    if (!pixel) return false;
    const checkWindow = pixelsAtY.slice(
      Math.max(0, index - yTHRESHOLD),
      Math.min(uniqueSortedByY.length - 1, index + yTHRESHOLD),
    );

    const peak = checkWindow.every((otherPixel) => {
      if (!otherPixel) return false;
      return pixel.lab.a >= otherPixel.lab.a;
    });

    return peak;
  });

  return peaks;
}
