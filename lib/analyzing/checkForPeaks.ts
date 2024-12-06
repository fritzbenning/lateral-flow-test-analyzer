import { PixelData } from "@/types";

export function checkForPeaks(group: PixelData[]): PixelData[] {
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
    const averagedY =
      uniqueSortedByY.reduce((acc, y) => acc + y, 0) / uniqueSortedByY.length;

    const pixel = sortedByY.find(
      (pixel) => pixel.y === uniqueSortedByY[Math.floor(averagedY)],
    );

    return pixel ? [pixel] : [];
  }

  const yTHRESHOLD = 4;

  const pixelsAtY = uniqueSortedByY
    .map((y) => {
      const closestX = sortedByY.reduce<PixelData>(
        (closest, pixel) => {
          if (pixel.y !== y) return closest;

          if (!closest) return pixel;

          return Math.abs(pixel.x - averagedXPosition) <
            Math.abs(closest.x - averagedXPosition)
            ? pixel
            : closest;
        },
        sortedByY.find((p) => p.y === y)!,
      );

      return closestX;
    })
    .filter((pixel): pixel is PixelData => pixel !== undefined);

  const peaks = pixelsAtY.filter((pixel: PixelData, index) => {
    const checkWindow = pixelsAtY.slice(
      Math.max(0, index - yTHRESHOLD),
      Math.min(uniqueSortedByY.length - 1, index + yTHRESHOLD),
    );

    return checkWindow.every((otherPixel) => pixel.lab.a >= otherPixel.lab.a);
  });

  return peaks;
}
